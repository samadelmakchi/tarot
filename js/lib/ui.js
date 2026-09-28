/* ============================================================
   ui — اجزای مشترک رابط کاربری برای همهٔ فال‌ها
   ============================================================ */
import { el, delay } from "./util.js";

/**
 * قالب استاندارد صفحهٔ یک فال
 * @param {HTMLElement} mount
 * @param {{id:string,title:string,tagline?:string,emoji:string,category:string,crumb?:string}} meta
 * @param {(box:HTMLElement, step:(html:string)=>void)=>void} build  — ساخت بدنه
 */
export function falPage(mount, meta, build) {
  mount.innerHTML = "";
  const crumbs = el("div", { class: "crumb" },
    el("a", { href: "#/", text: "خانه" }), " / ",
    el("a", { href: `#/category/${meta.categorySlug || "all"}`, text: meta.category }), " / ",
    meta.title,
  );
  const head = el("div", { class: "page-head" },
    el("span", { class: "big-em", text: meta.emoji }),
    el("div", {},
      el("h1", { text: meta.title }),
      meta.tagline ? el("p", { class: "tagline", text: meta.tagline }) : null,
    ),
  );
  const box = el("div", { class: "box-inner" });
  mount.append(crumbs, head, box);
  build(box, (html) => { box.innerHTML = html; });
  return box;
}

/** دکمهٔ آغاز با استایل استاندارد */
export function startBtn(label, onClick, big = true) {
  return el("button", { class: big ? "btn big breathe" : "btn", onclick: onClick, text: label });
}

/** بخش «نتیجه» */
export function resultWrap() {
  return el("div", { class: "result-box reveal", hidden: true });
}

export function showResult(wrap, html) {
  wrap.hidden = false;
  wrap.innerHTML = html;
  wrap.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* ---------- کارت تاروت ---------- */

/** صورت یک کارت تاروت (سمت رویی) */
export function tarotFace(card) {
  return el("div", { class: "card-face card-front" },
    el("img", { class: "card-image", src: card.image, alt: card.name, width: "398", height: "623" }),
    el("div", { class: "cname", text: card.name }),
  );
}

/**
 * اسلات کارت با انیمیشن برگشتن
 * @param {{label:string, sub?:string}} slot
 * @param {{card:object, reversed:boolean}} pick
 */
export function cardSlot(slot, pick, delayMs) {
  const front = tarotFace(pick.card);
  if (pick.reversed) front.append(el("div", { class: "crev", text: "معکوس ⤵" }));
  const inner = el("div", { class: "card-inner" },
    el("div", { class: "card-face card-back" }),
    front,
  );
  const wrap = el("div", { class: "card-wrap" }, inner);
  const label = el("div", { class: "slot-label" },
    el("b", { text: slot.label }),
    slot.sub ? el("div", { text: slot.sub }) : null,
  );
  const zone = el("div", { class: "tarot-slot" }, wrap, label);
  // تأخیر برای جلوهٔ کشیدن واقعی کارت
  setTimeout(() => inner.classList.add("flip"), delayMs ?? 150 + Math.random() * 400);
  return zone;
}

/** ناحیهٔ نمایش کارت‌ها (خانهٔ کارت‌ها) */
export function tarotZone() {
  return el("div", { class: "tarot-zone" });
}

/* ---------- متن‌های نتیجه ---------- */
export function readingItem(title, paragraphs) {
  const p = (Array.isArray(paragraphs) ? paragraphs : [paragraphs]).filter(Boolean)
    .map((t) => el("p", { text: t }));
  return el("div", { class: "read-item" }, el("h4", { text: title }), ...p);
}

export function readingSection(title, itemEls) {
  return el("div", { class: "reading" }, itemEls);
}

export function copyBtn(text, label = "کپی نتیجه") {
  return el("button", { class: "btn ghost", style: "padding:9px 18px;font-size:14px;", onclick: async () => {
    const { copyText } = await import("./util.js");
    copyText(text, "نتیجه کپی شد ✓");
  }, text: label });
}

export function shareBtn(text, title, label = "اشتراک‌گذاری") {
  return el("button", { class: "btn ghost", style: "padding:9px 18px;font-size:14px;", onclick: async () => {
    const { shareText } = await import("./util.js");
    shareText(title, text);
  }, text: label });
}

/* ---------- فرم‌های ساده ---------- */
export function fieldWrap(labelText, input) {
  return el("div", { class: "field" }, el("label", { text: labelText }), input);
}

export function pills(options, onChange) {
  const holder = el("div", { class: "opt-pills" });
  const btns = options.map((o) => el("button", {
    type: "button", class: "pill", text: o.label,
    onclick: () => {
      btns.forEach((b) => b.classList.remove("sel"));
      btns[options.indexOf(o)].classList.add("sel");
      onChange?.(o.value);
    },
  }));
  holder.append(...btns);
  return holder;
}

export function selectBox(options, onChange) {
  const sel = el("select", { onchange: (e) => onChange(e.target.value) });
  for (const o of options) sel.append(el("option", { value: o.value, text: o.label }));
  return sel;
}

export function spin(ms) {
  return delay(ms);
}

export function setBusy(btn, busy, busyLabel = "در حال کشیدن…") {
  if (!btn) return;
  if (busy) {
    btn.dataset.rest = btn.textContent;
    btn.disabled = true;
    btn.textContent = busyLabel;
  } else {
    btn.disabled = false;
    btn.textContent = btn.dataset.rest || btn.textContent;
  }
}

/**
 * جریان استاندارد «دکمهٔ شروع → تأخیر → نتیجه» برای فال‌های ساده
 * @param {HTMLElement} box بدنهٔ صفحه
 * @param {object} o { note, btnLabel, againLabel, suspenseMin, suspenseMax }
 * @param {(result:HTMLElement)=>Promise<HTMLElement|void>} draw خروجیِ نتیجه را برمی‌گرداند
 */
export function actionFlow(box, o, draw) {
  const lead = o.note ? el("p", { class: "lead-note muted", text: o.note }) : null;
  const btn = el("button", { class: "btn big breathe", text: o.btnLabel });
  const result = resultWrap();
  if (lead) box.append(lead);
  box.append(el("div", { class: "center" }, btn), result);

  btn.addEventListener("click", async () => {
    btn.disabled = true;
    btn.textContent = o.busyLabel || "در حال آماده‌سازی…";
    result.hidden = true;
    if (o.suspense) await delay(o.suspense[0] + Math.random() * (o.suspense[1] - o.suspense[0]));
    result.hidden = false;
    result.innerHTML = "";
    await draw(result);
    btn.disabled = false;
    btn.textContent = o.againLabel || o.btnLabel;
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}
