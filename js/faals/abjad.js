/* ============================================================
   آبجد (جفر) — حساب ابجد نام‌ها و سازگاری
   ============================================================ */
import { falPage } from "../lib/ui.js";
import { el, faNum } from "../lib/util.js";

const meta = {
  id: "abjad",
  title: "آبجد (جفر)",
  emoji: "🕎",
  category: "عدد و حرف",
  categorySlug: "numbers",
  tagline: "حروف نامت را به عدد ابجد بکشان و راز سازگاری‌ها را کشف کن.",
  blurb: "حساب جمل و ابجد در فرهنگ ایرانی و اسلامی برای رمزگشایی از نام‌ها.",
};

const ABJAD = {
  "ا": 1, "آ": 1, "ب": 2, "پ": 2, "ج": 3, "چ": 3, "د": 4, "ه": 5, "و": 6, "ز": 7, "ژ": 7,
  "ح": 8, "ط": 9, "ی": 10, "ک": 20, "گ": 20, "ل": 30, "م": 40, "ن": 50, "س": 60, "ع": 70,
  "ف": 80, "ص": 90, "ق": 100, "ر": 200, "ش": 300, "ت": 400, "ث": 500, "خ": 600, "ذ": 700,
  "ض": 800, "ظ": 900, "غ": 1000,
};

function abjadSum(name) {
  return name.replace(/[^آ-ی]/g, "").split("").reduce((a, c) => a + (ABJAD[c] || 0), 0);
}

const ELEMENTS = [
  { e: "آتش", d: "شور، اراده و پویایی", p: ["باد", "آتش"], n: ["آب", "خاک"] },
  { e: "خاک", d: "ثبات، صبر و عمل", p: ["آب", "خاک"], n: ["باد", "آتش"] },
  { e: "باد", d: "اندیشه، ارتباط و حرکت", p: ["آتش", "باد"], n: ["خاک", "آب"] },
  { e: "آب", d: "احساس، شفا و جریان", p: ["خاک", "آب"], n: ["آتش", "باد"] },
];
const VERDICTS = [
  { l: 80, v: "سازگاری چشمگیر", t: "این دو نام از نظر حساب ابجد هم‌صدایند؛ پیوندشان سرشار از هماهنگی و برکت است.", c: "good" },
  { l: 60, v: "سازگاری خوب", t: "هماهنگی خوبی میان این دو هست؛ با گفت‌وگو و مدارا، بهترین‌ها شکوفا می‌شود.", c: "good" },
  { l: 40, v: "سازگاری متوسط", t: "تفاوت‌هایی هست اما هیچ چیز با محبت حل‌نشدنی نیست؛ نقطه‌های مشترک را پرورش بده.", c: "warn" },
  { l: 0, v: "نیازمند تلاش", t: "انرژی این دو نام بسیار متفاوت است؛ اگر هر دو بخواهید، تفاوت‌ها می‌تواند مکمل شود نه مانع.", c: "warn" },
];

function elementOf(sum) {
  return ELEMENTS[(sum - 1 + 4) % 4]; // نگاشت نمادین عدد به عنصر
}

function page(mount) {
  const box = falPage(mount, meta, () => {});
  const nameA = el("input", { type: "text", maxlength: "30", placeholder: "نام اول (مثلاً: مریم)", autocomplete: "off" });
  const nameB = el("input", { type: "text", maxlength: "30", placeholder: "نام دوم (مثلاً: علی)", autocomplete: "off" });
  const single = el("input", { type: "text", maxlength: "30", placeholder: "یا نام خودت برای کشف عدد…", autocomplete: "off" });
  const btn = el("button", { class: "btn big", text: "🕎 محاسبهٔ ابجد" });
  const result = el("div", { class: "result-box reveal", hidden: true });
  box.append(el("p", { class: "lead-note muted", text: "برای سنجش سازگاری دو نام، هر دو را بنویس؛ یا نام خودت را برای دیدن عدد و عنصرت وارد کن." }),
    el("div", { class: "row-inputs" },
      el("div", { class: "field" }, el("label", { text: "نام اول" }), nameA),
      el("div", { class: "field" }, el("label", { text: "نام دوم" }), nameB),
      el("div", { class: "field" }, el("label", { text: "نام تنها (اختیاری)" }), single),
      el("div", { class: "center" }, btn)),
    result);

  btn.addEventListener("click", () => {
    const a = (nameA.value || "").trim();
    const b = (nameB.value || "").trim();
    const s = (single.value || "").trim();
    if (!a && !b && !s) { nameA.focus(); return; }
    result.hidden = false;
    result.innerHTML = "";

    if (s && !b) {
      const sum = abjadSum(s);
      const elm = elementOf(sum);
      result.append(el("div", { class: "center reveal" },
        el("div", { class: "stat-card", style: "max-width:300px;margin-inline:auto" },
          el("div", { class: "n", text: faNum(sum) }),
          el("div", { class: "l", text: `عدد ابجد «${s}»` }),
        ),
        el("div", { class: "read-item", style: "margin-top:12px" },
          el("h4", { text: `عنصر نمادین: ${elm.e}` }),
          el("p", { text: `«${s}» به عنصر ${elm.e} پیوند خورده است: ${elm.d}.` }),
        ),
        el("p", { class: "dim", style: "margin-top:10px", text: "در جفر سنتی، عدد هر نام با مضامین دینی و اسرار تطبیق داده می‌شود؛ اینجا خوانشی نمادین و سرگرم‌کننده ارائه می‌شود." }),
      ));
    } else if (a && b) {
      const sumA = abjadSum(a);
      const sumB = abjadSum(b);
      const elmA = elementOf(sumA);
      const elmB = elementOf(sumB);
      const friendly = elmA.p.includes(elmB.e);
      const diff = Math.abs(sumA - sumB) % 90;
      let pct = Math.round(friendly ? 95 - diff * 0.5 : 55 - diff * 0.6);
      pct = Math.max(25, Math.min(98, pct));
      const v = VERDICTS.find((x) => pct >= x.l) || VERDICTS[3];
      result.append(el("div", { class: "center reveal" },
        el("div", { class: "stat-card", style: "max-width:300px;margin-inline:auto" },
          el("div", { class: "n", text: faNum(pct) + "٪" }),
          el("div", { class: "l", text: "سازگاری ابجد" }),
        ),
        el("div", { class: "verdict " + v.c, text: v.v }),
        el("p", { class: "muted", text: v.t }),
        el("div", { class: "grid2", style: "margin-top:14px" },
          el("div", { class: "stat-card" }, el("div", { class: "n", text: faNum(sumA) }), el("div", { class: "l", text: `عدد «${a}» — ${elmA.e}` })),
          el("div", { class: "stat-card" }, el("div", { class: "n", text: faNum(sumB) }), el("div", { class: "l", text: `عدد «${b}» — ${elmB.e}` })),
        ),
        el("p", { class: "dim", style: "margin-top:10px", text: "این خوانش نمادین و سرگرم‌کننده است؛ سرنوشت رابطه را محبت و ارادهٔ دو نفر می‌سازد." }),
      ));
    }
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

export default { meta, page };
