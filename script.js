document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Sticky & Blurred Navigation Bar
    // ==========================================
    const header = document.querySelector('.navbar-header');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once in case page starts scrolled

    // ==========================================
    // 2. Mobile Menu Toggle Drawer
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const menuIcon = menuToggle.querySelector('i');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Toggle Icon between Burger and Close
        if (navLinks.classList.contains('active')) {
            menuIcon.className = 'ri-close-line';
        } else {
            menuIcon.className = 'ri-menu-line';
        }
    });

    // Close mobile nav when clicking a link
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuIcon.className = 'ri-menu-line';
        });
    });

    // ==========================================
    // 3. Interactive Phone Mockup Tab Switcher
    // ==========================================
    const featureTabs = document.querySelectorAll('.feature-tab');
    const interactiveMockupImg = document.getElementById('interactiveMockupImg');
    const screenLoader = document.querySelector('.screen-loader');

    featureTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // If already active, do nothing
            if (tab.classList.contains('active')) return;

            // Remove active from all tabs
            featureTabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked tab
            tab.classList.add('active');

            // Retrieve image path from data attribute
            const newImgSrc = tab.getAttribute('data-img');

            // Show loader, start image fade-out transition
            screenLoader.classList.add('loading');
            interactiveMockupImg.classList.remove('active');

            // Preload new image
            const tempImg = new Image();
            tempImg.src = newImgSrc;

            tempImg.onload = () => {
                interactiveMockupImg.src = newImgSrc;
                interactiveMockupImg.classList.add('active');
                screenLoader.classList.remove('loading');
            };

            tempImg.onerror = () => {
                screenLoader.classList.remove('loading');
                interactiveMockupImg.classList.add('active');
            };
        });
    });

    // ==========================================
    // 4. Smooth FAQ Accordion Transition
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');

        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Collapse all other FAQ items first
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-content').style.maxHeight = '0px';
                }
            });

            // Toggle active state on current item
            item.classList.toggle('active');

            if (!isActive) {
                // Set max-height to scroll height to expand smoothly
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                // Collapse back to 0
                content.style.maxHeight = '0px';
            }
        });
    });

    // ==========================================
    // 5. Scroll Reveal Intersection Observer
    // ==========================================
    const revealElements = document.querySelectorAll('.benefit-card, .step-card, .faq-item, .feature-tab, .download-card');

    // Add base reveal transition class to all elements dynamically
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Unobserve once revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});
