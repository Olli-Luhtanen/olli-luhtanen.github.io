const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    const IsOpen = hamburger.classList.toggle('open');
    navLinks.classList.toggle("open");
    hamburger.setAttribute('aria-expanded', IsOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove("open");
        navLinks.classList.remove("open");
        hamburger.setAttribute('aria-expanded', false);
    });
});