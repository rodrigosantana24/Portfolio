document.addEventListener('DOMContentLoaded', () => {

    function init() {
        initMobileMenu();
        initSmoothScrolling();
        initScrollAnimations();
        initTypingAnimation();
        initEmailCopy();
    }

    function initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        if (!menuToggle || !navLinks) return;
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href.length > 1) {
                    e.preventDefault();
                    document.querySelector(href).scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        if (!animatedElements.length) return;
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = parseInt(entry.target.dataset.animationDelay) || 0;
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, delay * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedElements.forEach(el => observer.observe(el));
    }
    
    async function initTypingAnimation() {
        const typedTextSpan = document.getElementById('typed-text');
        if (!typedTextSpan) return; 
        const phrases = [
            "Olá, eu sou Rodrigo Santana!",
            "Desenvolvedor Full-Stack."
        ];
        let phraseIndex = 0;

        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        while (true) {
            const currentPhrase = phrases[phraseIndex];
            for (let i = 0; i < currentPhrase.length; i++) {
                typedTextSpan.textContent += currentPhrase[i];
                await sleep(100);
            }
            await sleep(1500);

            for (let i = 0; i < currentPhrase.length; i++) {
                typedTextSpan.textContent = typedTextSpan.textContent.slice(0, -1);
                await sleep(50);
            }
            await sleep(200);

            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
    }

    function initEmailCopy() {
        const emailLink = document.getElementById('email-link');
        const feedback = document.getElementById('copy-feedback');
        if (!emailLink || !feedback) return;

        emailLink.addEventListener('click', (event) => {
            event.preventDefault();
            const email = emailLink.dataset.email;          
            navigator.clipboard.writeText(email).then(() => {
                feedback.classList.add('show');
                setTimeout(() => {
                    feedback.classList.remove('show');
                }, 2000);
            }).catch(err => {
                console.error('Falha ao copiar e-mail: ', err);
            });
        });
    }
    init();
});