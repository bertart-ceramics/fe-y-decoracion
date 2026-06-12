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

// Resalta en el menú la sección visible (scroll-spy) según la sección en pantalla.
// Asocia cada enlace con su sección: por ancla interna (#id) o por página (productos.html -> #productos).
const sectionIdForLink = (link) => {
    const href = link.getAttribute("href") || "";

    if (href.startsWith("#")) {
        return href.slice(1);
    }

    const pageMatch = href.match(/^([^/#?]+)\.html(?:#.*)?$/);
    return pageMatch ? pageMatch[1] : "";
};

const anchorLinks = Array.from(navLinks);
const sectionLinkMap = new Map();
const spiedSections = [];

anchorLinks.forEach((link) => {
    const id = sectionIdForLink(link);
    const section = id && document.getElementById(id);

    if (section) {
        sectionLinkMap.set(section, link);
        spiedSections.push(section);
    }
});

if (spiedSections.length) {
    const setActiveLink = (link) => {
        anchorLinks.forEach((other) => other.classList.remove("active"));

        if (link) {
            link.classList.add("active");
        }
    };

    const spyObserver = new IntersectionObserver(
        (entries) => {
            entries
                .filter((entry) => entry.isIntersecting)
                .forEach((entry) => setActiveLink(sectionLinkMap.get(entry.target)));
        },
        { rootMargin: "-45% 0px -55% 0px" }
    );

    spiedSections.forEach((section) => spyObserver.observe(section));
}
