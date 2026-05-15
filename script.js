/* ─── HEADER SCROLL ───────────────────────────────────────── */
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 60);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ─── ACTIVE NAV LINK ─────────────────────────────────────── */
const navLinks = document.querySelectorAll('#nav a');
const sections = document.querySelectorAll('section[id]');

const activateNav = () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 80) current = s.getAttribute('id');
  });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
};
window.addEventListener('scroll', activateNav, { passive: true });

/* ─── MOBILE MENU ─────────────────────────────────────────── */
const toggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const overlay = document.getElementById('overlay');

const openMenu = () => {
  toggle.classList.add('open');
  mobileMenu.classList.add('open');
  overlay.classList.add('active');
  toggle.setAttribute('aria-expanded', 'true');
  mobileMenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};
const closeMenu = () => {
  toggle.classList.remove('open');
  mobileMenu.classList.remove('open');
  overlay.classList.remove('active');
  toggle.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

toggle.addEventListener('click', () => toggle.classList.contains('open') ? closeMenu() : openMenu());
overlay.addEventListener('click', closeMenu);
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

/* ─── SMOOTH SCROLL ───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─── SCROLL REVEAL ───────────────────────────────────────── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ─── GALLERY FILTER ──────────────────────────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      const show = filter === 'all' || item.dataset.cat === filter;
      item.classList.toggle('hidden', !show);
    });
  });
});

/* ─── WHATSAPP CONTACT FORM ───────────────────────────────── */
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const name    = document.getElementById('cf-name').value.trim();
  const phone   = document.getElementById('cf-phone').value.trim();
  const service = document.getElementById('cf-service').value;
  const message = document.getElementById('cf-message').value.trim();

  if (!name) {
    document.getElementById('cf-name').focus();
    return;
  }

  const parts = ['Hello, Brincy Tax & Business Consults!'];
  parts.push(`My name is ${name}.`);
  if (phone) parts.push(`My phone number is ${phone}.`);
  if (service) parts.push(`I need help with: ${service}.`);
  if (message) parts.push(`Additional details: ${message}`);

  const text = encodeURIComponent(parts.join('\n'));
  window.open(`https://wa.me/255774203197?text=${text}`, '_blank');
});

/* ─── COPYRIGHT YEAR ──────────────────────────────────────── */
document.getElementById('year').textContent = new Date().getFullYear();
