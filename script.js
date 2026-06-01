/* ─── STICKY HEADER ──────────────────────────────────── */
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 60);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ─── ACTIVE NAV ─────────────────────────────────────── */
const navLinks = document.querySelectorAll('#nav a');
const sections = document.querySelectorAll('section[id]');
const activateNav = () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 90) current = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
};
window.addEventListener('scroll', activateNav, { passive: true });

/* ─── MOBILE MENU ────────────────────────────────────── */
const toggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const overlay = document.getElementById('overlay');
const openMenu = () => {
  toggle.classList.add('open'); mobileMenu.classList.add('open'); overlay.classList.add('active');
  toggle.setAttribute('aria-expanded', 'true'); mobileMenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};
const closeMenu = () => {
  toggle.classList.remove('open'); mobileMenu.classList.remove('open'); overlay.classList.remove('active');
  toggle.setAttribute('aria-expanded', 'false'); mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};
toggle.addEventListener('click', () => toggle.classList.contains('open') ? closeMenu() : openMenu());
overlay.addEventListener('click', closeMenu);
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

/* ─── SMOOTH SCROLL ──────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
  });
});

/* ─── SCROLL REVEAL ──────────────────────────────────── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ─── GALLERY FILTER ─────────────────────────────────── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.classList.toggle('hidden', filter !== 'all' && item.dataset.cat !== filter);
    });
  });
});

/* ─── FAQ ACCORDION ──────────────────────────────────── */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ─── WHATSAPP CONTACT FORM ──────────────────────────── */
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const name    = document.getElementById('cf-name').value.trim();
  const phone   = document.getElementById('cf-phone').value.trim();
  const service = document.getElementById('cf-service').value;
  const message = document.getElementById('cf-message').value.trim();
  if (!name) { document.getElementById('cf-name').focus(); return; }
  const parts = ['Hello, Brincy Tax & Business Consults!'];
  parts.push(`My name is ${name}.`);
  if (phone) parts.push(`Phone: ${phone}.`);
  if (service) parts.push(`Service needed: ${service}.`);
  if (message) parts.push(`Details: ${message}`);
  window.open(`https://wa.me/255774203197?text=${encodeURIComponent(parts.join('\n'))}`, '_blank');
});

/* ─── COPYRIGHT YEAR ─────────────────────────────────── */
document.getElementById('year').textContent = new Date().getFullYear();
