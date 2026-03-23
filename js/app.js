document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar overlay ─────────────────────────────────────────────────────────

  const menu = document.getElementById('menu');
  if (menu) {
    const navbar = menu.closest('.navbar');

    menu.addEventListener('show.bs.collapse', (e) => {
      if (e.target !== menu) return;
      navbar.classList.remove('overlay-closing');
      navbar.classList.add('overlay-open');
      document.body.style.overflow = 'hidden';
    });

    menu.addEventListener('hide.bs.collapse', (e) => {
      if (e.target !== menu) return;
      navbar.classList.add('overlay-closing');
      navbar.classList.remove('overlay-open');
      document.body.style.overflow = '';
    });

    menu.addEventListener('hidden.bs.collapse', (e) => {
      if (e.target !== menu) return;
      navbar.classList.remove('overlay-closing');
    });

    // Close overlay when an anchor nav link is clicked
    menu.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => {
        bootstrap.Collapse.getInstance(menu)?.hide();
      });
    });
  }

  // ── Scroll reveal ───────────────────────────────────────────────────────────

  // Single elements — reveal individually
  const singleSelectors = [
    '.section-label',
    'section h2',
    'section h3',
    '.contact-form',
    '.section-subtitle',
  ];

  // Groups — siblings within the same parent get staggered delays
  const staggerSelectors = [
    '.profile-card',
    '#services .col-12',
    '.stat-card',
    '.price-card',
    '.testimonial-card',
    '.client-logos-grid img',
    '#benefits ul li',
  ];

  singleSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      // Skip anything already inside #hero (handled by CSS keyframes)
      if (!el.closest('#hero')) {
        el.dataset.reveal = '';
      }
    });
  });

  staggerSelectors.forEach(sel => {
    // Group by parent so each row/list staggers independently
    const groups = new Map();
    document.querySelectorAll(sel).forEach(el => {
      if (el.closest('#hero')) return;
      const parent = el.parentElement;
      if (!groups.has(parent)) groups.set(parent, []);
      groups.get(parent).push(el);
    });

    groups.forEach(children => {
      children.forEach((el, i) => {
        el.dataset.reveal = '';
        el.style.transitionDelay = Math.min(i * 0.12, 0.36) + 's';
      });
    });
  });

  // Observe all marked elements
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  });

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

});