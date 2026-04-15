// hamburger.js

// Function to toggle hamburger menu
const hamburger = document.querySelector('.hamburger');
hamburger.addEventListener('click', () => {
    document.querySelector('.nav-menu').classList.toggle('active');
});

// Smooth scrolling
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Form validation
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    const inputs = form.querySelectorAll('input');
    let valid = true;

    inputs.forEach((input) => {
        if (input.value === '') {
            valid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    if (!valid) {
        e.preventDefault();
    }
});

// Interactive features
const buttons = document.querySelectorAll('.interactive-btn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Button clicked!');
    });
});