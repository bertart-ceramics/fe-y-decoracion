const navbar = document.querySelector(".navbar");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a");

const updateNavbar = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
};

const closeMenu = () => {
    navbar.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
};

window.addEventListener("scroll", updateNavbar);
updateNavbar();

navToggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});
