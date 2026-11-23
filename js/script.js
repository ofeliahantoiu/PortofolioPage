// Shared interactions for the home, university and practice pages.
// Every handler checks that its target exists so one page cannot break another.
document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, easing: 'ease-out', once: true, offset: 100 });
    }

    // Persist the original light/dark palette across all pages.
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') document.documentElement.classList.add('dark-theme');
    if (themeToggle) {
        themeToggle.checked = document.documentElement.classList.contains('dark-theme');
        themeToggle.addEventListener('change', () => {
            const dark = themeToggle.checked;
            document.documentElement.classList.toggle('dark-theme', dark);
            localStorage.setItem('theme', dark ? 'dark' : 'light');
        });
    }

    // Accessible mobile navigation.
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.querySelector('#navbar ul');
    const closeMenu = () => {
        if (!navList || !menuToggle) return;
        navList.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
    };
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navList.classList.toggle('show');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });
        navList.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') closeMenu();
        });
    }

    // Use native fragment links for cross-page navigation.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', event => {
            const fragment = anchor.getAttribute('href');
            if (!fragment || fragment === '#') return;
            const target = document.getElementById(fragment.slice(1));
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.replaceState(null, '', fragment);
            closeMenu();
        });
    });

    // Home-page accordion only (detail-page cards have a different structure).
    const overviewCards = [...document.querySelectorAll('#university-projects .university-project-card')];
    overviewCards.forEach(card => {
        const button = card.querySelector('.expand-btn');
        const content = card.querySelector('.project-content');
        if (!button || !content) return;
        const close = () => {
            button.classList.remove('active');
            button.setAttribute('aria-expanded', 'false');
            content.classList.remove('expanded');
            content.style.maxHeight = '0px';
        };
        const toggle = () => {
            const wasExpanded = button.getAttribute('aria-expanded') === 'true';
            overviewCards.forEach(other => {
                const otherButton = other.querySelector('.expand-btn');
                const otherContent = other.querySelector('.project-content');
                if (!otherButton || !otherContent) return;
                otherButton.classList.remove('active');
                otherButton.setAttribute('aria-expanded', 'false');
                otherContent.classList.remove('expanded');
                otherContent.style.maxHeight = '0px';
            });
            if (!wasExpanded) {
                button.classList.add('active');
                button.setAttribute('aria-expanded', 'true');
                content.classList.add('expanded');
                content.style.maxHeight = content.scrollHeight + 'px';
            } else close();
        };
        button.addEventListener('click', toggle);
        const header = card.querySelector('.project-header');
        if (header) header.addEventListener('click', event => {
            if (!event.target.closest('.expand-btn')) toggle();
        });
    });
    // Keep the expanded card sized correctly if text wraps after resizing or translating.
    window.addEventListener('resize', () => {
        overviewCards.forEach(card => {
            const content = card.querySelector('.project-content.expanded');
            if (content) content.style.maxHeight = content.scrollHeight + 'px';
        });
    });

    // Detail-page filters. A project can belong to more than one category.
    const filterButtons = [...document.querySelectorAll('.project-filters .filter-btn')];
    const detailCards = [...document.querySelectorAll('.university-details .university-project-card')];
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            filterButtons.forEach(btn => {
                const selected = btn === button;
                btn.classList.toggle('active', selected);
                btn.setAttribute('aria-pressed', String(selected));
            });
            detailCards.forEach(card => {
                const categories = (card.dataset.category || '').split(/\s+/);
                card.hidden = filter !== 'all' && !categories.includes(filter);
            });
        });
    });
});
