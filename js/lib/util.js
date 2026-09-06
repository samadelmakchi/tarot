/* ============================================================
   util — random, shuffle, Persian date & numerals, helpers
   ============================================================ */

/** شانس تصادفی ساده */
export function rnd() {
  const a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return a[0] / 4294967296;
}

export function pick(arr) {
  return arr[Math.floor(rnd() * arr.length)];
}

export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** دترمینیستیک (برای تغییر روزانهٔ محتوا) */
export function seeded(seedStr) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return function () {
    h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0;
    h = Math.imul(h ^ (h >>> 13), 3266489909) >>> 0;
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

export function pickSeeded(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

/* ---------- Persian date / numerals ---------- */
const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
export function faNum(n) {
  return String(n).replace(/[0-9]/g, (d) => FA_DIGITS[+d]);
}

const JALALI_MONTHS = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند",
];
const WEEKDAYS = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"];

/** عدد روز سال میلادی → جلالی (الگوریتم استاندارد تبدیل) */
function g2j(gy, gm, gd) {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let jy = gy <= 1600 ? 0 : 979;
  gy -= gy <= 1600 ? 621 : 1600;
  const gy2 = gm > 2 ? gy + 1 : gy;
  let days = 365 * gy + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) - 80 + gd + g_d_m[gm - 1];
  jy += 33 * Math.floor(days / 12053);
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  jy += Math.floor((days - 1) / 365);
  if (days > 365) days = (days - 1) % 365;
  const jm = days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);
  return [jy, jm, jd];
}

/** تاریخ امروز به صورت جلالی: {year, month, monthName, day, weekday, weekDayName} */
export function todayJalali() {
  const d = new Date();
  const [y, m, dd] = g2j(d.getFullYear(), d.getMonth() + 1, d.getDate());
  const wd = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getDay(); // 0=Sunday
  const weekDayName = wd === 6 ? "شنبه" : WEEKDAYS[(wd + 1) % 7];
  return { year: y, month: m, monthName: JALALI_MONTHS[m - 1], day: dd, weekDayName };
}

/** «شنبه ۱۵ شهریور ۱۴۰۵» */
export function faToday() {
  const t = todayJalali();
  return `${t.weekDayName} ${faNum(t.day)} ${t.monthName} ${faNum(t.year)}`;
}

/** برج فلکی (طالع غربی) از روی روز میلادی تولد */
export function zodiacFromMD(month, day) {
  const signs = [
    { name: "برج حمل", en: "Aries", m: 3, d: 21, next: 4, nd: 20, monthLabel: "فروردین" },
    { name: "برج ثور", en: "Taurus", m: 4, d: 21, next: 5, nd: 21, monthLabel: "اردیبهشت" },
    { name: "برج جوزا", en: "Gemini", m: 5, d: 22, next: 6, nd: 21, monthLabel: "خرداد" },
    { name: "برج سرطان", en: "Cancer", m: 6, d: 22, next: 7, nd: 22, monthLabel: "تیر" },
    { name: "برج اسد", en: "Leo", m: 7, d: 23, next: 8, nd: 23, monthLabel: "مرداد" },
    { name: "برج سنبله", en: "Virgo", m: 8, d: 24, next: 9, nd: 23, monthLabel: "شهریور" },
    { name: "برج میزان", en: "Libra", m: 9, d: 24, next: 10, nd: 23, monthLabel: "مهر" },
    { name: "برج عقرب", en: "Scorpio", m: 10, d: 24, next: 11, nd: 22, monthLabel: "آبان" },
    { name: "برج قوس", en: "Sagittarius", m: 11, d: 23, next: 12, nd: 22, monthLabel: "آذر" },
    { name: "برج جدی", en: "Capricorn", m: 12, d: 22, next: 1, nd: 20, monthLabel: "دی" },
    { name: "برج دلو", en: "Aquarius", m: 1, d: 21, next: 2, nd: 19, monthLabel: "بهمن" },
    { name: "برج حوت", en: "Pisces", m: 2, d: 20, next: 3, nd: 20, monthLabel: "اسفند" },
  ];
  for (const s of signs) {
    const inSpan = (month === s.m && day >= s.d) || (month === s.next && day <= s.nd);
    if (inSpan) return { ...s };
  }
  return signs[9]; // fallback جدی
}

export function normNum(s) {
  const faMap = { "۰": 0, "۱": 1, "۲": 2, "۳": 3, "۴": 4, "۵": 5, "۶": 6, "۷": 7, "۸": 8, "۹": 9 };
  return String(s).split("").map((c) => (faMap[c] ?? c)).join("");
}

/* ---------- misc ---------- */
export function el(tag, attrs = {}, ...kids) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") n.className = v;
    else if (k === "text") n.textContent = v;
    else if (k === "html") n.innerHTML = v;
    else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
    else if (v !== null && v !== undefined) n.setAttribute(k, v);
  }
  for (const kid of kids.flat()) {
    if (kid == null) continue;
    n.appendChild(typeof kid === "string" ? document.createTextNode(kid) : kid);
  }
  return n;
}

export function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export function copyText(txt, okMsg) {
  const done = () => toast(okMsg || "کپی شد ✓");
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(txt).then(done).catch(() => fallbackCopy(txt, done));
  } else fallbackCopy(txt, done);
}

function fallbackCopy(txt, done) {
  const ta = document.createElement("textarea");
  ta.value = txt;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); } catch { /* noop */ }
  ta.remove();
  done();
}

export function toast(msg) {
  let t = document.getElementById("toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove("show"), 2400);
}

export function shareText(title, text) {
  const data = { title, text };
  if (navigator.share) {
    navigator.share(data).catch(() => {});
  } else {
    copyText(`${title}\n\n${text}`);
  }
}
