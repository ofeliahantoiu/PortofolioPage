// Initialize AOS (Animate On Scroll)
AOS.init({ 
    duration: 800, 
    easing: 'ease-out', 
    once: true,
    offset: 100
});

// Theme Switch Functionality
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

// Apply saved theme on load
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.documentElement.classList.add("dark-theme");
        toggleSwitch.checked = true;
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navList = document.querySelector("#navbar ul");
menuToggle.addEventListener("click", () => {
    navList.classList.toggle("show");
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navList.classList.remove('show');
        }
    });
});

// University Projects Expand/Collapse
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.university-project-card');
    
    projectCards.forEach(card => {
        const header = card.querySelector('.project-header');
        const expandBtn = card.querySelector('.expand-btn');
        const content = card.querySelector('.project-content');
        
        // Function to toggle content
        const toggleContent = () => {
            const isExpanded = content.classList.contains('expanded');
            
            // Close all other cards first
            projectCards.forEach(otherCard => {
                if (otherCard !== card) {
                    const otherContent = otherCard.querySelector('.project-content');
                    const otherBtn = otherCard.querySelector('.expand-btn');
                    const otherIcon = otherBtn.querySelector('i');
                    
                    otherContent.classList.remove('expanded');
                    otherContent.style.maxHeight = '0';
                    otherBtn.classList.remove('active');
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Update button state
            expandBtn.classList.toggle('active');
            
            // Update content state with smooth transition
            if (!isExpanded) {
                content.style.maxHeight = '0';
                content.classList.add('expanded');
                // Force reflow
                content.offsetHeight;
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                // Force reflow
                content.offsetHeight;
                content.style.maxHeight = '0';
                setTimeout(() => {
                    content.classList.remove('expanded');
                }, 400); // Match transition duration
            }
            
            // Update button icon with smooth rotation
            const icon = expandBtn.querySelector('i');
            icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
        };
        
        // Add click handlers
        header.addEventListener('click', (e) => {
            // Don't trigger if clicking the expand button (it has its own handler)
            if (!e.target.closest('.expand-btn')) {
                toggleContent();
            }
        });
        
        expandBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent header click from firing
            toggleContent();
        });
    });
}); 