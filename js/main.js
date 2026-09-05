// Minimal, purposeful JS — no framework needed for a static portfolio.

document.addEventListener("DOMContentLoaded", () => {
  // ---- Theme toggle -------------------------------------------------
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");

  const applyTheme = (dark) => {
    if (dark) root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch (e) {}
  };

  if (toggle) {
    const isDark = () => root.getAttribute("data-theme") === "dark";
    toggle.addEventListener("click", () => applyTheme(!isDark()));
  }

  // ---- Scroll spy: highlight active nav link ------------------------
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".site-header nav .nav-links a");

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
            });
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
  }

  // ---- Reveal on scroll (progressive enhancement) -------------------
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  // ---- Footer year --------------------------------------------------
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
