

// ---- Custom Cursor ----
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX - 5 + 'px';
  cursor.style.top = e.clientY - 5 + 'px';
  setTimeout(() => {
    follower.style.left = e.clientX - 18 + 'px';
    follower.style.top = e.clientY - 18 + 'px';
  }, 80);
});

document.addEventListener('mousedown', () => cursor.style.transform = 'scale(2)');
document.addEventListener('mouseup',   () => cursor.style.transform = 'scale(1)');

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ---- Hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---- Scroll reveal ----
const revealEls = document.querySelectorAll('.reveal');
const observer  = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));

// ---- Contact form (Web3Forms) ----
const form       = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    try {
      const res  = await fetch(form.action, { method:'POST', body: new FormData(form) });
      const data = await res.json();
      if (data.success) {
        formStatus.textContent = '✅ Message sent! I\'ll get back to you soon.';
        formStatus.style.color = '#4ecdc4';
        form.reset();
      } else {
        throw new Error('Failed');
      }
    } catch {
      formStatus.textContent = '❌ Oops! Something went wrong. Please try again.';
      formStatus.style.color = '#ff6b6b';
    }

    submitBtn.textContent = 'Send Message ✈';
    submitBtn.disabled = false;
  });
}

// ---- Smooth active nav highlight ----
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.style.color = (scrollY >= top && scrollY < top + height)
        ? 'var(--accent)' : '';
    }
  });
});
