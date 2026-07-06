const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links a");
const yearEl = document.getElementById("year");
const form = document.getElementById("contactForm");
const formMessage = document.querySelector(".form-message");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const sections = document.querySelectorAll("main section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((link) => {
          const targetId = link.getAttribute("href")?.replace("#", "");
          link.classList.toggle("active", targetId === entry.target.id);
        });
      }
    });
  },
  { threshold: 0.4 },
);

sections.forEach((section) => observer.observe(section));

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get("name")?.toString().trim() || "there";
    formMessage.textContent = `Thanks, ${name}! Your message is ready to be sent.`;
    form.reset();
  });
}
