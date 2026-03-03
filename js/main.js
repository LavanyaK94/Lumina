/* =========================================
   LUMINA ACADEMY — JavaScript
   ========================================= */

// ---- Navbar: Scroll Effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveNav();
});

// ---- Hamburger Menu ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
    }
});

// ---- Active Nav Link on Scroll ----
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);

        if (link) {
            link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
        }
    });
}

// ---- Reveal on Scroll (Intersection Observer) ----
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- Animated Stat Counters ----
function animateCounter(el) {
    const target = +el.getAttribute('data-target');
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            animateCounter(el);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ---- Smooth Scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ---- Contact Form Submission ----
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

// ⚠️ Replace with your Web3Forms access key from https://web3forms.com
const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE';

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const required = ['fname', 'lname', 'email', 'message'];
    let valid = true;

    required.forEach(id => {
        const field = document.getElementById(id);
        if (!field.value.trim()) {
            field.style.borderColor = '#ef4444';
            field.addEventListener('input', () => {
                field.style.borderColor = '';
            }, { once: true });
            valid = false;
        }
    });

    if (!valid) return;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();

    const formData = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New Contact Form: ${subject || 'General Enquiry'} — Laugh And Learn Pre-School`,
        name: `${fname} ${lname}`,
        email: email,
        phone: phone || 'Not provided',
        topic: subject || 'General Enquiry',
        message: message
    };

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            contactForm.reset();
            formSuccess.textContent = '✅ Thank you! We\'ll get back to you within 24 hours.';
            formSuccess.style.background = 'rgba(34, 197, 94, 0.1)';
            formSuccess.style.borderColor = 'rgba(34, 197, 94, 0.3)';
            formSuccess.style.color = '#16a34a';
        } else {
            formSuccess.textContent = '❌ Oops! Something went wrong. Please try again.';
            formSuccess.style.background = 'rgba(239, 68, 68, 0.1)';
            formSuccess.style.borderColor = 'rgba(239, 68, 68, 0.3)';
            formSuccess.style.color = '#dc2626';
        }
    } catch (error) {
        formSuccess.textContent = '❌ Network error. Please check your connection and try again.';
        formSuccess.style.background = 'rgba(239, 68, 68, 0.1)';
        formSuccess.style.borderColor = 'rgba(239, 68, 68, 0.3)';
        formSuccess.style.color = '#dc2626';
    } finally {
        submitBtn.textContent = 'Send Message ✉️';
        submitBtn.disabled = false;
        formSuccess.classList.add('show');
        setTimeout(() => formSuccess.classList.remove('show'), 6000);
    }
});

// ---- Gallery hover enhancement ----
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.zIndex = '2';
    });
    item.addEventListener('mouseleave', () => {
        item.style.zIndex = '';
    });
});

// ---- Scroll to top on logo click ----
document.querySelectorAll('.nav-logo').forEach(logo => {
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// ---- Trigger initial nav state ----
updateActiveNav();
