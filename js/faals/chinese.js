/* ============================================================
   طالع‌بینی چینی — ۱۲ حیوان و عناصر پنج‌گانه
   ============================================================ */
import { falPage } from "../lib/ui.js";
import { el, faNum } from "../lib/util.js";

const meta = {
  id: "chinese",
  title: "طالع‌بینی چینی",
  emoji: "🐉",
  category: "ستاره و برج",
  categorySlug: "astro",
  tagline: "سال تولدت را بگو تا حیوان و عنصر سالِ تو را بخوانیم.",
  blurb: "۱۲ حیوان چرخهٔ چینی و ۵ عنصر، شخصیت و سال اقبال تو را می‌سازند.",
};

const ANIMALS = [
  { e: "🐀", n: "موش", y: "1900", per: "زیرک، اجتماعی و آینده‌نگر؛ فرصت‌ها را زود می‌بینی و هوشمندانه حرکت می‌کنی.", love: "در عشق باهوش و وفادار؛ به امنیت اهمیت می‌دهی." },
  { e: "🐂", n: "گاو", y: "1901", per: "صبور، سخت‌کوش و قابل‌اعتماد؛ با پشتکار به هر هدفی می‌رسی.", love: "در عشق آرام، محکم و بی‌ادعایی؛ قولت را نگه می‌داری." },
  { e: "🐅", n: "ببر", y: "1902", per: "شجاع، مستقل و پرشور؛ رهبر متولد شده‌ای که از چالش نمی‌ترسد.", love: "در عشق پرشور و ماجراجو؛ هیجان برایت مهم است." },
  { e: "🐇", n: "خرگوش", y: "1903", per: "خوش‌خلق، ظریف و خوش‌شانس؛ آرامش و هنر را به زندگی می‌آوری.", love: "رمانتیک و مهربان؛ صلح را به رابطه می‌آوری." },
  { e: "🐉", n: "اژدها", y: "1904", per: "باوقار، خلاق و قدرتمند؛ در چینی باستان نماد امپراتور و اقبال.", love: "پرشور و جذاب؛ به تحسین و فضای درخشان نیاز داری." },
  { e: "🐍", n: "مار", y: "1905", per: "عمیق، دانا و شهودی؛ رازداری و جذابیت طبیعی داری.", love: "در عشق فداکار و تمام‌عیار؛ عشقت عمیق و پنهان است." },
  { e: "🐴", n: "اسب", y: "1906", per: "آزاد، پرانرژی و اجتماعی؛ عاشق حرکت و سفر و جمع هستی.", love: "پرشور و خونگرم؛ به آزادی و احترام در رابطه نیاز داری." },
  { e: "🐐", n: "بز", y: "1907", per: "هنرمند، مهربان و آرام‌طلب؛ ذوق و خلاقیت داری.", love: "رمانتیک و حساس؛ به امنیت عاطفی نیاز داری." },
  { e: "🐵", n: "میمون", y: "1908", per: "باهوش، شوخ و مبتکر؛ هر مسئله‌ای را بازی می‌کنی و برنده می‌شوی.", love: "سرزنده و بامزه؛ تحرک فکری برایت ضروری است." },
  { e: "🐓", n: "خروس", y: "1909", per: "منظم، صریح و خوش‌بیان؛ در جمع می‌درخشی.", love: "در عشق صادق و صریح؛ وفاداری برایت مهم است." },
  { e: "🐕", n: "سگ", y: "1910", per: "وفادار، راستگو و محافظ؛ بهترین دوست و همکار.", love: "در عشق بی‌نهایت وفادار؛ اعتماد، پایهٔ رابطه‌ات است." },
  { e: "🐖", n: "خوک", y: "1911", per: "خوش‌قلب، سخاوتمند و صادق؛ زندگی را ساده و شاد می‌گیری.", love: "در عشق مهربان و فداکار؛ به آرامش و راحتی اهمیت می‌دهی." },
];

const ELEMENTS = {
  wood: { n: "چوب", em: "🌳", d: "رشد، مهربانی و انعطاف؛ چون بهار، در حال گسترشی.", adv: "امسال روی یادگیری و رشد شخصی سرمایه‌گذاری کن." },
  fire: { n: "آتش", em: "🔥", d: "شور، شهرت و پویایی؛ چون تابستان، درخشان و پرانرژی.", adv: "امسال زمان رهبری و دیده‌شدن است." },
  earth: { n: "خاک", em: "⛰️", d: "ثبات، تغذیه و عمل؛ چون پاییزِ برداشت، پربار.", adv: "امسال روی ریشه‌ها، سلامت و بنیان‌ها تمرکز کن." },
  metal: { n: "فلز", em: "⚙️", d: "اراده، نظم و پالایش؛ چون زمستانِ سخت اما روشن.", adv: "امسال زمان نظم‌بخشی و بریدن از اضافه‌هاست." },
  water: { n: "آب", em: "💧", d: "حکمت، انعطاف و ژرفا؛ آرام اما نافذ.", adv: "امسال به درون، شهود و جریان زندگی اعتماد کن." },
};

function page(mount) {
  const box = falPage(mount, meta, () => {});
  const yearInput = el("input", { type: "number", min: "1900", max: "2031", value: "1995", placeholder: "سال تولد (میلادی)" });
  const btn = el("button", { class: "btn big", text: "🐉 محاسبهٔ طالع چینی" });
  const result = el("div", { class: "result-box reveal", hidden: true });
  box.append(el("p", { class: "lead-note muted", text: "سال تولد میلادی‌ات را وارد کن؛ حیوان و عنصر سالِ تو نمایش داده می‌شود." }),
    el("div", { class: "row-inputs" },
      el("div", { class: "field" }, el("label", { text: "سال تولد" }), yearInput),
      el("div", { class: "center" }, btn)),
    result);

  function calc(year) {
    const idx = ((year - 1900) % 12 + 12) % 12;
    const animal = ANIMALS[idx];
    const stem = (((year - 4) % 10) + 10) % 10; // ۰و۱: چوب، ۲و۳: آتش، ۴و۵: خاک، ۶و۷: فلز، ۸و۹: آب
    const e = Math.floor(stem / 2);
    const elem = [ELEMENTS.wood, ELEMENTS.fire, ELEMENTS.earth, ELEMENTS.metal, ELEMENTS.water][e];
    return { animal, elem };
  }

  btn.addEventListener("click", () => {
    const y = Number(yearInput.value);
    if (!y || y < 1900 || y > 2100) { yearInput.focus(); return; }
    const { animal, elem } = calc(y);
    result.hidden = false;
    result.innerHTML = "";
    result.append(el("div", { class: "center reveal" },
      el("div", { style: "font-size:70px", text: animal.e }),
      el("h2", { style: "margin:4px 0", text: `سال ${animal.n}` }),
      el("p", { class: "dim", text: `عنصر سال: ${elem.em} ${elem.n}` }),
    ),
    el("div", { class: "reading reveal", style: "margin-top:10px" },
      el("div", { class: "read-item" }, el("h4", { text: `شخصیت ${animal.n}` }), el("p", { text: animal.per })),
      el("div", { class: "read-item" }, el("h4", { text: "💞 در عشق" }), el("p", { text: animal.love })),
      el("div", { class: "read-item" }, el("h4", { text: `${elem.em} عنصر ${elem.n}` }), el("p", { text: elem.d })),
      el("div", { class: "read-item" }, el("h4", { text: "🎯 پیام سال" }), el("p", { text: elem.adv })),
    ),
    );
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

export default { meta, page };
