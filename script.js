// ===== Tema =====
// Varsayılan olarak sistem temasını izler; butona basılınca seçim hatırlanır.
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

function currentTheme() {
  return root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}

function syncThemeButton() {
  themeToggle.textContent = currentTheme() === "dark" ? "☀" : "☾";
}

try {
  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;
} catch (e) {}
syncThemeButton();

themeToggle.addEventListener("click", () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  syncThemeButton();
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
});

// ===== Nav kenarlığı =====
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("scrolled", scrollY > 8);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ===== Ürünler görünür olunca belirsin =====
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        observer.unobserve(e.target);
      }
    }),
  { threshold: 0.2 }
);
document.querySelectorAll(".product").forEach((el) => observer.observe(el));

// ===== Yıl =====
document.getElementById("year").textContent = new Date().getFullYear();
