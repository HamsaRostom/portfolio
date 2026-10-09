const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const cursorGlow = document.querySelector(".cursor-glow");

// Theme
const savedTheme = localStorage.getItem("hamsa-theme");
if (savedTheme === "light") body.classList.add("light");

function updateThemeIcon() {
  const isLight = body.classList.contains("light");
  themeIcon.textContent = isLight ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
}
updateThemeIcon();

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  localStorage.setItem("hamsa-theme", body.classList.contains("light") ? "light" : "dark");
  updateThemeIcon();
});

// Mobile menu
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Active navigation
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".main-nav a");

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove("active"));
      const active = document.querySelector(`.main-nav a[href="#${entry.target.id}"]`);
      if (active) active.classList.add("active");
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => navObserver.observe(section));

// Generic slider factory
function createSlider(slides, dotsContainer, prevBtn, nextBtn, interval = 0) {
  let index = 0;
  let timer;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "slider-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dot.addEventListener("click", () => show(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".slider-dot");

  function show(newIndex) {
    index = (newIndex + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  }

  prevBtn.addEventListener("click", () => show(index - 1));
  nextBtn.addEventListener("click", () => show(index + 1));
  show(0);

  if (interval > 0) {
    const start = () => timer = setInterval(() => show(index + 1), interval);
    const stop = () => clearInterval(timer);
    start();
    const parent = slides[0].closest(".slider-shell, .testimonial-slider");
    parent.addEventListener("mouseenter", stop);
    parent.addEventListener("mouseleave", start);
  }
}

createSlider(
  document.querySelectorAll(".skill-slide"),
  document.querySelector(".skills-dots"),
  document.querySelector(".skills-prev"),
  document.querySelector(".skills-next"),
  5000
);

createSlider(
  document.querySelectorAll(".testimonial"),
  document.querySelector(".testimonials-dots"),
  document.querySelector(".testimonials-prev"),
  document.querySelector(".testimonials-next"),
  6000
);

// Mouse interaction
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let currentX = mouseX;
let currentY = mouseY;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateGlow() {
  currentX += (mouseX - currentX) * 0.08;
  currentY += (mouseY - currentY) * 0.08;
  cursorGlow.style.left = `${currentX}px`;
  cursorGlow.style.top = `${currentY}px`;
  requestAnimationFrame(animateGlow);
}
animateGlow();

const visualCard = document.querySelector(".visual-card");
if (visualCard && window.matchMedia("(pointer:fine)").matches) {
  visualCard.addEventListener("mousemove", (e) => {
    const rect = visualCard.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    visualCard.style.transform = `rotateY(${x * 8}deg) rotateX(${y * -8}deg) rotate(3deg)`;
  });
  visualCard.addEventListener("mouseleave", () => {
    visualCard.style.transform = "rotate(5deg)";
  });
}

// Keyboard-friendly disabled CV
document.querySelector(".disabled-link")?.addEventListener("click", (e) => e.preventDefault());
