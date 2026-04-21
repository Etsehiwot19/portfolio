document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Smooth Scrolling for Anchor Links
    const navLinks = document.querySelectorAll('.nav-links a, .hero-buttons a, .footer-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Only apply behavior if the href starts with # and is not just "#"
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // 3. Scroll Reveal Animation using IntersectionObserver
    const revealElements = document.querySelectorAll('.section-container, .hero-content, .hero-avatar');
    // Add the initial reveal class to apply initial hidden state
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 4. Contact Form Submission (Mock)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Mock submission effect
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = 'Message Sent!';
                btn.style.background = '#059669'; // Green success color
                btn.style.borderColor = '#059669';
                btn.style.opacity = '1';
                
                contactForm.reset();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = ''; // reset to CSS default
                    btn.style.borderColor = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
