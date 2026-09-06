/* ============================================================
   اختربینی (هلیوبیوس) — مأموریت روح از خورشید کهکشانی
   ============================================================ */
import { falPage } from "../lib/ui.js";
import { el, faNum } from "../lib/util.js";

const meta = {
  id: "heliobiology",
  title: "اختربینی (هلیوبیوس)",
  emoji: "🌞",
  category: "ستاره و برج",
  categorySlug: "astro",
  tagline: "جایگاه خورشید در چرخهٔ کهکشانی و مأموریت روح تو.",
  blurb: "مکتب نوین: کشف هدف عالی زندگی از پیوند خورشید با مرکز کهکشان.",
};

const SECTORS = [
  { n: "بیداری کهکشانی", m: "روح تو برای آغاز آگاهانه آمده است؛ رسالتت روشن کردن مسیر برای دیگران است.", k: "رهبریِ نرم" },
  { n: "پیام‌آور نور", m: "کلام و ارتباط تو ابزار اصلی روح است؛ پیامی داری که باید گفته شود.", k: "بیان حقیقت" },
  { n: "معمار آرامش", m: "رسالت تو ساختن فضاهای امن است؛ در کار و خانه، پناهگاه بساز.", k: "آفرینش امنیت" },
  { n: "شفادهندهٔ قلب", m: "روح تو برای ترمیم زخم‌های عاطفیِ خود و دیگران آمده است.", k: "شفای احساس" },
  { n: "جرقهٔ خلاق", m: "مأموریت تو آفرینش است؛ از هر رنجی، زیبایی بیافرین.", k: "خلاقیت" },
  { n: "ستون خرد", m: "رسالت تو یادگیری عمیق و انتقال دانش به نسل‌های بعد است.", k: "حکمت" },
  { n: "پل میان‌فرهنگ‌ها", m: "روح تو برای پیوند دادن آدم‌ها و ایده‌های دور از هم آمده است.", k: "اتصال" },
  { n: "دگرگون‌ساز", m: "هرجا می‌روی، تحول می‌آوری؛ رسالتت شکستن ساختارهای کهنه است.", k: "تغییر" },
  { n: "سفیر کهکشان", m: "روح تو به سیر و سفر و تجربه‌های گسترده نیاز دارد تا پیام بیاورد.", k: "گسترش" },
  { n: "نگهبان آستانه", m: "رسالت تو محافظت از مرزها و آغازهای نو است؛ دروازه‌بان تحول باشی.", k: "حفاظت" },
  { n: "روشنگر شب", m: "در تاریکی‌ها می‌بینی و به دیگران نشان می‌دهی؛ رسالتت امید در دل شب است.", k: "امید" },
  { n: "آیینهٔ کیهان", m: "روح تو بازتاب تمامیت است؛ با یکپارچه‌سازی اضداد، کامل می‌شوی.", k: "یکپارچگی" },
];

function dayOfYear(m, d) {
  const days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return days.slice(0, m).reduce((a, b) => a + b, 0) + d;
}

function page(mount) {
  const box = falPage(mount, meta, () => {});
  const mSel = el("select");
  ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"].forEach((n, i) => mSel.append(el("option", { value: i + 1, text: n })));
  const dSel = el("select");
  for (let d = 1; d <= 31; d++) dSel.append(el("option", { value: d, text: faNum(d) }));
  const btn = el("button", { class: "btn big", text: "🌞 یافتن مأموریت روح" });
  const result = el("div", { class: "result-box reveal", hidden: true });
  box.append(el("p", { class: "lead-note muted", text: "تاریخ تولدت را وارد کن تا جایگاه نمادین خورشید کهکشانی تو و مأموریت روحت را بخوانیم." }),
    el("div", { class: "row-inputs" },
      el("div", { class: "grid2" },
        el("div", { class: "field" }, el("label", { text: "ماه تولد" }), mSel),
        el("div", { class: "field" }, el("label", { text: "روز تولد" }), dSel),
      ),
      el("div", { class: "center" }, btn)),
    result);

  btn.addEventListener("click", () => {
    const pm = Number(mSel.value);
    const pd = Number(dSel.value);
    const doy = dayOfYear((pm <= 6 ? pm + 8 : pm - 4), pd); // تقریب شمسی→میلادی برای روز سال
    const sector = SECTORS[(doy * 7) % 12];
    const angle = faNum((doy * 0.986) % 360);
    result.hidden = false;
    result.innerHTML = "";
    result.append(el("div", { class: "center reveal" },
      el("div", { style: "font-size:66px", text: "🌞", class: "breathe" }),
      el("h2", { style: "margin:4px 0", text: sector.n }),
      el("p", { class: "dim", text: `موقعیت نمادین خورشید کهکشانی: ${angle} درجه` }),
    ),
    el("div", { class: "reading reveal" },
      el("div", { class: "read-item" }, el("h4", { text: "مأموریت روح" }), el("p", { text: sector.m })),
      el("div", { class: "read-item" }, el("h4", { text: "کلیدواژه" }), el("p", { text: sector.k })),
    ),
    el("p", { class: "footer-note", text: "هلیوبیوس مکتبی نوین و نمادین است؛ مأموریت واقعی را خودت با انتخاب‌هایت می‌سازی." }),
    );
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

export default { meta, page };
