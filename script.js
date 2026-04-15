        // ========== HAMBURGER MENU ==========
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // ========== SMOOTH SCROLLING ==========
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // ========== ACTIVE NAV ON SCROLL ==========
        const sections = document.querySelectorAll('section[id]');
        const navLinkElements = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });
            navLinkElements.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });

        // ========== TERMINAL TYPING ANIMATION ==========
        const terminalLines = document.querySelectorAll('.terminal-line');

        function revealTerminalLines() {
            terminalLines.forEach((line, index) => {
                const delay = parseInt(line.dataset.delay) || index * 400;
                setTimeout(() => {
                    line.classList.add('visible');
                }, delay);
            });
        }

        // Start terminal animation when page loads
        window.addEventListener('load', () => {
            setTimeout(revealTerminalLines, 500);
        });

        // ========== STAT COUNTER ANIMATION ==========
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number[data-count]');
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.count);
                const duration = 1500;
                const start = performance.now();

                function update(currentTime) {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.round(eased * target);
                    counter.textContent = current + '+';
                    if (progress < 1) {
                        requestAnimationFrame(update);
                    }
                }
                requestAnimationFrame(update);
            });
        }

        // ========== SCROLL REVEAL ==========
        const revealElements = document.querySelectorAll('.reveal');

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');

                    // Trigger counter animation when stats section is visible
                    if (entry.target.classList.contains('hero-stats') ||
                        entry.target.querySelector('.stat-number')) {
                        animateCounters();
                    }
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));

        // ========== TOAST NOTIFICATION ==========
        let toastTimeout;

        function showToast(message) {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toastMessage');
            toastMessage.textContent = message;
            toast.classList.add('show');

            clearTimeout(toastTimeout);
            toastTimeout = setTimeout(() => {
                toast.classList.remove('show');
            }, 2500);
        }

        // ========== FORM HANDLING ==========
        const contactForm = document.getElementById('contactForm');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const inputs = contactForm.querySelectorAll('input, textarea');
            let valid = true;

            inputs.forEach(input => {
                if (input.required && input.value.trim() === '') {
                    valid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });

            // Email validation
            const emailInput = contactForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                valid = false;
                emailInput.classList.add('error');
            }

            if (valid) {
                showToast('Message sent successfully! ✓');
                contactForm.reset();
            } else {
                showToast('Please fill in all required fields.');
            }
        });

        // Remove error class on input
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('error');
            });
        });
