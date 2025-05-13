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