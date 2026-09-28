/* ============================================================
   فال‌بین — مسیریاب و صفحهٔ اصلی
   ============================================================ */
import { el, faToday } from "./lib/util.js";
import { CATEGORIES, categorySection, findFal } from "./registry.js";

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
  const hero = el("div", { class: "hero" },
    el("h1", { text: "فال تاروت" }),
    el("p", { text: "۱۵ روش فال تاروت بر پایهٔ دستهٔ کارت، تعداد کارت و موضوع، به‌همراه فال ویژهٔ بله/خیر؛ رایگان و بدون نیاز به اینترنت." }),
    el("p", { class: "dim", text: `امروز: ${faToday()}` }),
  );
  m.append(hero);

  CATEGORIES.forEach((c) => {
    m.append(categorySection(c));
  });

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
    el("div", { class: "page-head" },
      el("div", {}, el("h1", { text: cat.title }), el("p", { class: "tagline", text: `${cat.items.length} روش فال` })),
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
