/* ============================================================
   فال‌بین — مسیریاب و صفحهٔ اصلی
   ============================================================ */
import { el, faToday } from "./lib/util.js";
import { CATEGORIES, categorySection, coverImage, findFal } from "./registry.js";
import { categoryDescription } from "./lib/fal-content.js";

const main = document.getElementById("main");
const homeBtn = document.getElementById("homeBtn");

/* ---------- تم روشن/تاریک ---------- */
const THEME_KEY = "faalbin-theme";

function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem(THEME_KEY, t); } catch { /* noop */ }
}

function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem(THEME_KEY); } catch { /* noop */ }
  const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)").matches;
  applyTheme(saved === "light" || saved === "dark" ? saved : prefersLight ? "light" : "dark");
}

initTheme();
document.getElementById("themeToggle").addEventListener("click", () => {
  const cur = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(cur);
});

/* ---------- صفحهٔ اصلی ---------- */
function renderHome() {
  const m = el("div", { class: "home" });
  const featured = findFal("tarot-one-card");
  const hero = el("section", { class: "hero" },
    el("div", { class: "hero-copy" },
      el("span", { class: "eyebrow", text: `راهنمای امروز · ${faToday()}` }),
      el("h1", { text: "یک لحظه برای خودت" }),
      el("p", { text: "کارت‌ها را بکش، نشانه‌ها را ببین و با ذهنی آرام به مسیرت فکر کن." }),
      el("button", { class: "btn hero-cta", onclick: () => { location.hash = "#/fal/tarot-one-card"; }, text: "کارت امروز من ✦" }),
    ),
    el("div", { class: "hero-deck", "aria-hidden": "true" },
      el("img", { class: "hero-card hero-card-back", src: "./img/17the-star.jpg", alt: "" }),
      el("img", { class: "hero-card hero-card-main", src: coverImage(featured), alt: "" }),
      el("span", { class: "hero-glow" }),
    ),
  );
  m.append(hero);

  const shortcuts = el("nav", { class: "category-shortcuts", "aria-label": "دسته‌بندی فال‌ها" });
  CATEGORIES.forEach((category) => shortcuts.append(el("a", {
    href: `#/category/${category.slug}`,
    text: category.title.replace("بر اساس ", ""),
  })));
  m.append(shortcuts);

  CATEGORIES.forEach((c) => m.append(categorySection(c)));

  m.append(el("p", { class: "home-note", text: "فال‌ها برای سرگرمی، الهام و تأمل شخصی طراحی شده‌اند." }));

  main.replaceChildren(m);
}

function renderFal(id) {
  const fal = findFal(id);
  if (!fal) { renderHome(); return; }
  const mount = el("div", { class: "fal-view" });
  main.replaceChildren(mount);
  // ماژول فال را پویا بار می‌کنیم تا هر فال واقعاً مستقل و سبک باشد
  import(`./faals/${id}.js`).then((mod) => {
    mod.default.page(mount);
    document.title = `${fal.title} — فال‌بین`;
    window.scrollTo({ top: 0 });
  }).catch(() => {
    mount.append(el("p", { class: "muted", text: "بارگذاری فال با خطا مواجه شد." }));
  });
}

function renderCategory(slug) {
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) { renderHome(); return; }
  const m = el("div", {});
  m.append(
    el("div", { class: "crumb" }, el("a", { href: "#/", text: "خانه" }), " / ", cat.title),
    el("section", { class: "category-showcase" },
      el("div", { class: "category-showcase-copy" },
        el("span", { class: "intro-chip", text: `${cat.items[0].emoji}  مجموعهٔ فال‌ها` }),
        el("h1", { text: cat.title }),
        el("p", { class: "tagline", text: `${cat.items.length} روش برای یک تجربهٔ تصویری و آرام` }),
        el("p", { class: "category-description", text: categoryDescription(cat.slug) }),
      ),
      el("div", { class: "category-showcase-art", "aria-hidden": "true" },
        el("img", { class: "category-art-back", src: coverImage(cat.items.at(-1)), alt: "" }),
        el("img", { class: "category-art-main", src: coverImage(cat.items[0]), alt: "" }),
      ),
    ),
  );
  m.append(categorySection(cat, false));
  main.replaceChildren(m);
  document.title = `${cat.title} — فال‌بین`;
  window.scrollTo({ top: 0 });
}

function route() {
  const hash = location.hash || "#/";
  if (hash.startsWith("#/fal/")) {
    const id = decodeURIComponent(hash.slice(6));
    renderFal(id);
  } else if (hash.startsWith("#/category/")) {
    const slug = decodeURIComponent(hash.slice(11));
    renderCategory(slug);
  } else {
    renderHome();
    document.title = "فال‌بین | فال تاروت";
  }
  window.scrollTo({ top: 0 });
}

window.addEventListener("hashchange", route);
homeBtn.addEventListener("click", () => { location.hash = "#/"; });

/* نصب PWA */
let deferredPrompt = null;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const btn = document.getElementById("installBtn");
  btn.hidden = false;
  btn.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    btn.hidden = true;
  });
});

/* ثبت سرویس‌ورکر برای آفلاین */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

route();
