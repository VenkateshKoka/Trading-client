const navbar = document.getElementById("navbar");
const navbarToggle = navbar.querySelector("#navbar-toggle");
const navbarMenu = document.querySelector("#navbar-menu");
const navbarLinksContainer = navbarMenu.querySelector(".navbar-links");
let isNavbarExpanded = navbarToggle.getAttribute("aria-expanded") === "true";

const toggleNavbarVisibility = () => {
    isNavbarExpanded = !isNavbarExpanded;
    navbarToggle.setAttribute("aria-expanded", isNavbarExpanded);
};
const toggleNavbarBoxShadow = () => {
    if (window.pageYOffset > 0) {
        navbar.classList.add("add-shadow");
    } else {
        navbar.classList.remove("add-shadow");
    }
};

navbarToggle.addEventListener("click", toggleNavbarVisibility);
navbarLinksContainer.addEventListener("click", (e) => e.stopPropagation());
navbarMenu.addEventListener("click", toggleNavbarVisibility);

window.addEventListener("scroll", toggleNavbarBoxShadow);
