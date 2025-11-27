document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.getElementById('primary-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        mainNav.addEventListener('click', (event) => {
            if (event.target.matches('a') && mainNav.classList.contains('is-open')) {
                mainNav.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    const signupBtn = document.getElementById("signupBtn");
    if (signupBtn) {
        signupBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    const audio = document.getElementById("myaudio");
    if (audio) {
        audio.addEventListener('play', () => {
            // Audio play handler if needed
        });
    }

    // Contact Form
    const form = document.querySelector('.contact-form');
    if (form) {
        let msgEl = form.querySelector('.form-message');
        if (!msgEl) {
            msgEl = document.createElement('div');
            msgEl.className = 'form-message';
            msgEl.style.margin = '8px 0';
            form.insertBefore(msgEl, form.firstChild);
        }

        const validateEmail = (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
        };

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = (form.querySelector('#name')?.value || '').trim();
            const email = (form.querySelector('#email')?.value || '').trim();
            const message = (form.querySelector('#message')?.value || '').trim();

            if (!name) {
                msgEl.textContent = 'Please enter your name.';
                msgEl.className = 'form-message error';
                return;
            }
            if (!email || !validateEmail(email)) {
                msgEl.textContent = 'Please enter a valid email address.';
                msgEl.className = 'form-message error';
                return;
            }
            if (!message) {
                msgEl.textContent = 'Please enter a message.';
                msgEl.className = 'form-message error';
                return;
            }

            const payload = { name, email, message, savedAt: new Date().toISOString() };
            try {
                localStorage.setItem('contactForm', JSON.stringify(payload));
                msgEl.textContent = 'Message saved. Redirecting…';
                msgEl.className = 'form-message success';

                setTimeout(() => {
                    window.location.href = 'form-details.html';
                }, 700);
            } catch (err) {
                msgEl.textContent = 'Unable to save message locally.';
                msgEl.className = 'form-message error';
            }
        });
    }

    // Image Slider Functionality
    const sliderImages = document.querySelectorAll('.slider-image');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (sliderImages.length > 0 && dots.length > 0) {
        let currentSlide = 0;

        function showSlide(index) {
            sliderImages.forEach(img => img.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            sliderImages[index].classList.add('active');
            dots[index].classList.add('active');
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % sliderImages.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + sliderImages.length) % sliderImages.length;
            showSlide(currentSlide);
        }

        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                currentSlide = parseInt(e.target.dataset.index);
                showSlide(currentSlide);
            });
        });
    }

    // Theme toggle — persist preference and apply on load
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');

    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('light-mode');
            document.documentElement.classList.add('light-mode'); // ensure <html> gets it too
            if (themeToggle) {
                themeToggle.textContent = '☀️';
                themeToggle.setAttribute('aria-pressed', 'true');
                themeToggle.setAttribute('title', 'Switch to dark mode');
            }
        } else {
            document.body.classList.remove('light-mode');
            document.documentElement.classList.remove('light-mode');
            if (themeToggle) {
                themeToggle.textContent = '🌙';
                themeToggle.setAttribute('aria-pressed', 'false');
                themeToggle.setAttribute('title', 'Switch to light mode');
            }
        }
    }

    // initialize theme: saved -> default light
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme('light');
        localStorage.setItem('theme', 'light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-mode');
            document.documentElement.classList.toggle('light-mode', isLight);
            themeToggle.textContent = isLight ? '☀️' : '🌙';
            themeToggle.setAttribute('aria-pressed', String(isLight));
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // Canvas demo: simple drawing and resize handling
    (function initLayoutCanvas() {
        const canvas = document.getElementById('layoutCanvas');
        if (!canvas || !canvas.getContext) return;
        const ctx = canvas.getContext('2d');

        function resizeCanvasToDisplaySize(c) {
            const dpr = window.devicePixelRatio || 1;
            const rect = c.getBoundingClientRect();
            const w = Math.round(rect.width * dpr);
            const h = Math.round(rect.height * dpr);
            if (c.width !== w || c.height !== h) {
                c.width = w;
                c.height = h;
                return true;
            }
            return false;
        }

        let mouseX = 0, mouseY = 0;

        // Track mouse movement
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });

        canvas.addEventListener('mouseleave', () => {
            mouseX = -999;
            mouseY = -999;
        });

        function draw() {
            if (!canvas) return;
            resizeCanvasToDisplaySize(canvas);
            const dpr = window.devicePixelRatio || 1;
            const width = canvas.width / dpr;
            const height = canvas.height / dpr;

            // clear
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // scale for CSS pixels
            ctx.save();
            ctx.scale(dpr, dpr);

            // subtle background
            ctx.fillStyle = window.getComputedStyle(document.documentElement).getPropertyValue('--layout-bg') || 'rgba(0,0,0,0.02)';
            ctx.fillRect(0, 0, width, height);

            // grid lines
            ctx.strokeStyle = 'rgba(0,0,0,0.06)';
            ctx.lineWidth = 1;
            const step = 30;
            for (let x = 0; x <= width; x += step) {
                ctx.beginPath();
                ctx.moveTo(x + 0.5, 0);
                ctx.lineTo(x + 0.5, height);
                ctx.stroke();
            }
            for (let y = 0; y <= height; y += step) {
                ctx.beginPath();
                ctx.moveTo(0, y + 0.5);
                ctx.lineTo(width, y + 0.5);
                ctx.stroke();
            }

            // highlight band + label
            ctx.globalAlpha = 0.12;
            ctx.fillStyle = '#6ee7b7';
            ctx.fillRect(width * 0.08, height * 0.12, width * 0.84, height * 0.36);
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#6ee7b7';
            ctx.font = '600 14px system-ui, -apple-system, "Segoe UI", Roboto, Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Grid demo — CSS Grid', width / 2, height * 0.32);

            // Draw cursor circle that follows mouse
            if (mouseX > -100 && mouseY > -100) {
                ctx.beginPath();
                ctx.arc(mouseX, mouseY, 8, 0, Math.PI * 2);
                ctx.strokeStyle = '#6ee7b7';
                ctx.lineWidth = 2;
                ctx.stroke();

                // inner dot
                ctx.beginPath();
                ctx.arc(mouseX, mouseY, 3, 0, Math.PI * 2);
                ctx.fillStyle = '#6ee7b7';
                ctx.fill();
            }

            ctx.restore();
        }

        // initial draw
        draw();

        // animation loop for smooth cursor tracking
        function animate() {
            draw();
            requestAnimationFrame(animate);
        }
        animate();

        // redraw on resize (debounced)
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => draw(), 100);
        });
    })();
});