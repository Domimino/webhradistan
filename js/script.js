/* =========================================
   HRADIŠTAN – script.js
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Scroll shadow na navbar ---- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  /* ---- Hamburger menu ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Aktivní odkaz podle aktuální stránky (URL) ---- */
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkFile = link.getAttribute('href').split('#')[0];
    if (linkFile === currentFile) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  /* ---- Fade-in animace sekcí při scrollu ---- */
  const fadeElements = document.querySelectorAll(
    '.section-title, .about-text, .obstacles-list, .food-list, .info-list, .gallery-item, .partner-placeholder, .partner-card, .contact-layout, .team-section, .propozice-hero, .partners-hero, .page-hero'
  );

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  fadeElements.forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
  });

});

/* ---- Kontaktní formulář ---- */
function handleSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (success) {
    success.style.display = 'block';
  }
  const btn = form ? form.querySelector('button[type=submit]') : null;
  if (btn) btn.disabled = true;
  if (success) success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
