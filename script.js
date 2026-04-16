const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

menuToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinkItems.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

window.addEventListener('scroll', () => {
  let current = 'home';

  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.id;
    }
  });

  navLinkItems.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  showToast('Thanks! Your message is noted.');
  contactForm.reset();
});
