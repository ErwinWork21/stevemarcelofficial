document.addEventListener("DOMContentLoaded", async () => {
    // Array of components to load in order
    const components = [
        { id: "navbar-placeholder", file: "components/navbar.html" },
        { id: "hero-placeholder", file: "components/hero.html" },
        { id: "about-placeholder", file: "components/about.html" },
        { id: "schedules-placeholder", file: "components/schedules.html" },
        { id: "sermons-placeholder", file: "components/sermons.html" },
        { id: "gallery-placeholder", file: "components/gallery.html" },
        { id: "footer-placeholder", file: "components/footer.html" }
    ];

    try {
        // Load all components sequentially to maintain order and structure
        for (const comp of components) {
            const element = document.getElementById(comp.id);
            if (element) {
                const response = await fetch(comp.file);
                if (response.ok) {
                    const html = await response.text();
                    element.outerHTML = html; // Replace placeholder completely with the loaded HTML
                } else {
                    console.error(`Failed to load ${comp.file}: ${response.statusText}`);
                }
            }
        }

        // After all components are loaded, initialize functionality
        initializeAfterLoad();

    } catch (error) {
        console.error("Error loading components:", error);
    }
});

function initializeAfterLoad() {
    // 1. Re-initialize Lucide icons
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    // 2. Set the current year in the footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 3. Re-initialize scripts from script.js that depend on the DOM
    
    // Mobile Navigation Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Trigger once in case page is already scrolled
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        }
    }

    // Scroll Reveal Animations
    function reveal() {
        const reveals = document.querySelectorAll('.reveal');
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }
    
    window.addEventListener('scroll', reveal);
    // Trigger once on load
    reveal();
}
