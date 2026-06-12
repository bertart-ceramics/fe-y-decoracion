const navbar = document.querySelector(".navbar");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a");
const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let activeSlide = 0;
let slideTimer;

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

const showSlide = (index) => {
    if (!heroSlides.length) {
        return;
    }

    activeSlide = (index + heroSlides.length) % heroSlides.length;

    heroSlides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === activeSlide;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
    });

    heroDots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === activeSlide;
        dot.classList.toggle("is-active", isActive);

        if (isActive) {
            dot.setAttribute("aria-current", "true");
        } else {
            dot.removeAttribute("aria-current");
        }
    });
};

const startSlideTimer = () => {
    if (reduceMotion || heroSlides.length < 2) {
        return;
    }

    window.clearInterval(slideTimer);
    slideTimer = window.setInterval(() => {
        showSlide(activeSlide + 1);
    }, 4200);
};

heroDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        showSlide(index);
        startSlideTimer();
    });
});

showSlide(0);
startSlideTimer();
