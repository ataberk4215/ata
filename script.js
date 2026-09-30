// ===== Tema (karanlık / aydınlık) =====
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "light" ? "🌙" : "☀️";
}

let savedTheme = null;
try {
  savedTheme = localStorage.getItem("theme");
} catch (e) {}
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
applyTheme(savedTheme || (prefersLight ? "light" : "dark"));

themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  applyTheme(next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
});

// ===== Mobil menü =====
const navLinks = document.getElementById("navLinks");
const navBurger = document.getElementById("navBurger");

navBurger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navBurger.textContent = open ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navBurger.textContent = "☰";
  })
);

// ===== Daktilo efekti =====
const roles = ["Web Geliştirici", "Frontend Meraklısı", "Bot Yapımcısı", "Oyun Sever 🎮"];
const typedEl = document.getElementById("typed");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const current = roles[roleIndex];
  typedEl.textContent = current.slice(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex++;
    setTimeout(type, 90);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 45);
  } else {
    deleting = !deleting;
    if (!deleting) roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, deleting ? 1600 : 300);
  }
}
type();

// ===== Kaydırma: nav gölgesi, aktif link, yukarı butonu =====
const nav = document.querySelector(".nav");
const toTop = document.getElementById("toTop");
const sections = document.querySelectorAll("main section[id]");

function onScroll() {
  const y = window.scrollY;
  nav.classList.toggle("scrolled", y > 10);
  toTop.classList.toggle("show", y > 500);

  let currentId = "";
  sections.forEach((s) => {
    if (y >= s.offsetTop - 120) currentId = s.id;
  });
  navLinks.querySelectorAll("a").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === `#${currentId}`);
  });
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

toTop.addEventListener("click", () => window.scrollTo({ top: 0 }));

// ===== Görünür olunca animasyon (reveal, sayaç, beceri çubukları) =====
function countUp(el) {
  const target = +el.dataset.count;
  const duration = 1200;
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * p);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add("visible");
      el.querySelectorAll("[data-count]").forEach(countUp);
      el.querySelectorAll(".bar__fill").forEach((b) => (b.style.width = b.dataset.width + "%"));
      observer.unobserve(el);
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ===== Proje filtreleme =====
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");

filters.forEach((btn) =>
  btn.addEventListener("click", () => {
    filters.forEach((f) => f.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.filter;
    projects.forEach((p) => {
      p.classList.toggle("hidden", cat !== "all" && p.dataset.cat !== cat);
    });
  })
);

// ===== İletişim formu =====
// Not: Şu an sadece tarayıcıda doğrulama yapıyor. Gerçekten e-posta almak için
// Formspree (https://formspree.io) gibi bir servis bağlanabilir.
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;
  form.querySelectorAll("input, textarea").forEach((field) => {
    const ok = field.checkValidity() && field.value.trim() !== "";
    field.classList.toggle("invalid", !ok);
    if (!ok) valid = false;
  });

  if (!valid) {
    statusEl.textContent = "Lütfen tüm alanları doğru şekilde doldur.";
    statusEl.className = "form__status err";
    return;
  }

  const name = form.elements.name.value.trim();
  statusEl.textContent = `Teşekkürler ${name}! Mesajın alındı, en kısa sürede dönüş yapacağım. 🙌`;
  statusEl.className = "form__status ok";
  form.reset();
});

// ===== Yıl =====
document.getElementById("year").textContent = new Date().getFullYear();
