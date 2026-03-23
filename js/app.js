document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('menu');
  if (!menu) return;

  const navbar = menu.closest('.navbar');

  // Add/remove overlay-open class to swap logo, toggler icon, z-index
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
});