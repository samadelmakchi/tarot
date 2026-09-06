/* ============================================================
   فال‌بین — مسیریاب و صفحهٔ اصلی
   ============================================================ */
import { el, faToday } from "./lib/util.js";
import { FALS, CATEGORIES, categorySection, falCard, findFal, catEmoji } from "./registry.js";

const main = document.getElementById("main");
const searchBar = document.getElementById("searchbar");
const searchInput = document.getElementById("searchInput");
const searchToggle = document.getElementById("searchToggle");
const homeBtn = document.getElementById("homeBtn");

let lastQuery = "";

function setActiveNav(route) {
  document.querySelectorAll(".topnav a").forEach((a) => a.classList.toggle("active", a.dataset.nav === route || (route === "home" && !a.dataset.nav)));
}

function renderHome(query) {
  const m = el("div", { class: "home" });
  const hero = el("div", { class: "hero" },
    el("h1", { text: "فال" }, el("span", { class: "se", text: "‌بین" }), el("span", { text: " ✦" })),
    el("p", { text: "جامع‌ترین فال‌های آنلاین؛ تاروت، حافظ، فال روزانه و ده‌ها فال دیگر — همه رایگان، آفلاین و در جیب تو." }),
    el("p", { class: "dim", text: `امروز: ${faToday()}` }),
    el("div", { class: "quick-actions" },
      el("button", { class: "hot", text: "☀️ فال روزانه", onclick: () => { location.hash = "#/fal/daily"; } }),
      el("button", { class: "hot", text: "🌹 فال حافظ", onclick: () => { location.hash = "#/fal/hafez"; } }),
      el("button", { class: "hot", text: "🔮 تاروت تک‌کارتی", onclick: () => { location.hash = "#/fal/tarot-one-card"; } }),
      el("button", { class: "hot", text: "🃏 تاروت بله/خیر", onclick: () => { location.hash = "#/fal/tarot-major-yesno"; } }),
    ),
    el("div", { class: "opt-pills", style: "justify-content:center;margin-top:14px" },
      CATEGORIES.map((c) => el("a", { class: "pill", href: `#/category/${c.slug}`, text: `${catEmoji(c.slug)} ${c.title}` })),
    ),
  );
  m.append(hero);
  const q = (query || "").trim();
  if (q) {
    const norm = q.toLowerCase();
    const hits = FALS.filter((f) => (f.title + " " + f.blurb + " " + f.category + " " + f.tagline).toLowerCase().includes(norm));
    const sec = el("div", { class: "section-block" });
    sec.append(el("div", { class: "section-title" }, el("span", { text: `🔎 نتیجهٔ جستجو برای «${query.trim()}»` })));
    if (hits.length) {
      const grid = el("div", { class: "faal-grid" });
      hits.forEach((f) => grid.append(falCard(f)));
      sec.append(grid);
    } else {
      sec.append(el("p", { class: "muted", text: "چیزی پیدا نشد. املای کلمه را بررسی کن یا عبارت دیگری بپرس." }));
    }
    m.append(sec);
  } else {
    CATEGORIES.forEach((c) => m.append(categorySection(c)));
  }
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
      el("span", { class: "big-em", text: catEmoji(slug) }),
      el("div", {}, el("h1", { text: cat.title }), el("p", { class: "tagline", text: `همهٔ فال‌های دستهٔ ${cat.title} (${cat.items.length} فال)` })),
    ),
  );
  m.append(categorySection(cat));
  main.replaceChildren(m);
  window.scrollTo({ top: 0 });
}

function route() {
  const hash = location.hash || "#/";
  setActiveNav("home");
  if (hash.startsWith("#/fal/")) {
    const id = decodeURIComponent(hash.slice(6));
    renderFal(id);
    setActiveNav(null);
    document.title = "فال‌بین | جامع‌ترین فال‌های آنلاین";
  } else if (hash.startsWith("#/category/")) {
    const slug = decodeURIComponent(hash.slice(11));
    renderCategory(slug);
    setActiveNav("cat-" + slug);
    document.title = `${slug} — فال‌بین`;
  } else {
    renderHome(lastQuery);
    searchBar.hidden = true;
    searchInput.value = "";
    document.title = "فال‌بین | جامع‌ترین فال‌های آنلاین";
  }
  window.scrollTo({ top: 0 });
}

function doSearch(query) {
  lastQuery = query;
  if (query.trim()) {
    renderHome(query);
  } else {
    route();
  }
}

window.addEventListener("hashchange", () => {
  searchBar.hidden = true;
  lastQuery = "";
  route();
});

homeBtn.addEventListener("click", () => { location.hash = "#/"; });
document.getElementById("brand").addEventListener("click", () => { location.hash = "#/"; });
searchToggle.addEventListener("click", () => {
  const show = searchBar.hidden;
  searchBar.hidden = !show;
  if (show) searchInput.focus();
});
searchInput.addEventListener("input", () => doSearch(searchInput.value));

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
