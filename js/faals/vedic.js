/* ============================================================
   طالع‌بینی هندی (ودیک) — نمایهٔ نمادین راشی
   ============================================================ */
import { falPage } from "../lib/ui.js";
import { el, faNum } from "../lib/util.js";

const meta = {
  id: "vedic",
  title: "طالع‌بینی هندی (ودیک)",
  emoji: "🕉️",
  category: "ستاره و برج",
  categorySlug: "astro",
  tagline: "طبق سنت ودیک، راشی (برج ماه) تو را بشناس و مسیر کارما را بخوان.",
  blurb: "نسخهٔ ساده‌شدهٔ نمادین از طالع‌بینی ودیک هند برای خودشناسی.",
};

const RASHIS = [
  { e: "🐏", n: "میشا Mesha", en: "بره", el: "آتش", lord: "مریخ", per: "پیشگام و جسور؛ در ودیک، کارما و شهامت تو در هم گره خورده‌اند.", focus: "مسیر تو: آغازگری و شکستن بن‌بست‌ها." },
  { e: "🐂", n: "ورشابا Vrishabha", en: "گاو", el: "خاک", lord: "زهره", per: "پایدار و هنرمند؛ ارزش‌ها و آرامش برایت مقدس است.", focus: "مسیر تو: ساختن امنیت پایدار از دل تلاش آرام." },
  { e: "👥", n: "میتونا Mithuna", en: "دوقلو", el: "باد", lord: "عطارد", per: "ارتباط‌گر و کنجکاو؛ در ودیک، سخن و دانش تو ابزار کارماست.", focus: "مسیر تو: آموختن و آموزاندن با زبان نرم." },
  { e: "🦀", n: "کارکاتا Karkata", en: "خرچنگ", el: "آب", lord: "ماه", per: "شهودی و پرورش‌دهنده؛ پیوند با مادر و خانه در نهاد توست.", focus: "مسیر تو: شفای ریشه‌ها و مراقبت از عزیزان." },
  { e: "🦁", n: "سیمها Simha", en: "شیر", el: "آتش", lord: "خورشید", per: "باوقار و درخشان؛ در ودیک، قلب شیر تو منزلگاه خورشید است.", focus: "مسیر تو: رهبری با نور، نه با زور." },
  { e: "🧘", n: "کانیا Kanya", en: "دوشیزه", el: "خاک", lord: "عطارد", per: "دقیق و خدمتگزار؛ پاکی نیت و عمل برایت اصل است.", focus: "مسیر تو: خدمت خالصانه و نظم درونی." },
  { e: "⚖️", n: "تولا Tula", en: "ترازو", el: "باد", lord: "زهره", per: "متعادل و زیبایی‌دوست؛ عدالت برایت یک عبادت است.", focus: "مسیر تو: برقراری توازن در زندگی خود و دیگران." },
  { e: "🦂", n: "ورشیکا Vrishchika", en: "عقرب", el: "آب", lord: "پلوتون/مریخ", per: "عمیق و دگرگون‌کننده؛ در ودیک، تو مار نیروی کندالینی هستی.", focus: "مسیر تو: دگرگونی شخصی و کشف قدرت پنهان." },
  { e: "🏹", n: "دهانوس Dhanus", en: "کمان", el: "آتش", lord: "مشتری", per: "آزاد و حق‌جو؛ آموزگار و جستجوگر حقیقت.", focus: "مسیر تو: گسترش خرد و نیکی در جهان." },
  { e: "🐊", n: "ماکارا Makara", en: "بزغاله", el: "خاک", lord: "زحل", per: "مستقل و پرتلاش؛ در ودیک، صعود تو از دل سختی‌هاست.", focus: "مسیر تو: صبر و انضباط برای رسیدن به قله." },
  { e: "🏺", n: "کومبا Kumbha", en: "دلو", el: "باد", lord: "زحل/کیوان", per: "نوآور و انسان‌دوست؛ آب‌دانِ خرد که برای همه می‌ریزد.", focus: "مسیر تو: آوردن اندیشهٔ نو به جمع بشری." },
  { e: "🐟", n: "مینا Meena", en: "ماهی", el: "آب", lord: "مشتری", per: "مهربان و معنوی؛ در ودیک، تو اقیانوس همدلی هستی.", focus: "مسیر تو: شفابخشی و پیوند با والاترین." },
];

function page(mount) {
  const box = falPage(mount, meta, () => {});
  const g = el("p", { class: "lead-note muted", text: "برای محاسبهٔ دقیق راشی (برج ماه) به ساعت و مکان تولد نیاز است؛ اینجا بر پایهٔ برج خورشیدی، خوانشی نمادین از راشی ارائه می‌شود." });
  box.append(g);
  const mSel = el("select");
  ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"].forEach((n, i) => mSel.append(el("option", { value: i + 1, text: n })));
  const dSel = el("select");
  for (let d = 1; d <= 31; d++) dSel.append(el("option", { value: d, text: faNum(d) }));
  const btn = el("button", { class: "btn big", text: "🕉️ محاسبهٔ راشی" });
  const result = el("div", { class: "result-box reveal", hidden: true });
  box.append(el("div", { class: "row-inputs" },
    el("div", { class: "grid2" },
      el("div", { class: "field" }, el("label", { text: "ماه تولد" }), mSel),
      el("div", { class: "field" }, el("label", { text: "روز تولد" }), dSel),
    ),
    el("div", { class: "center" }, btn)),
    result);

  function monthIndex(pm, pd) {
    // برج خورشیدی به‌صورت تقریبی
    const cutoffs = [21, 20, 21, 21, 22, 22, 23, 23, 23, 22, 22, 21];
    const sign = pd >= cutoffs[pm - 1] ? pm : ((pm + 10) % 12) + 1;
    return sign - 1;
  }

  btn.addEventListener("click", () => {
    const pm = Number(mSel.value);
    const pd = Number(dSel.value);
    const r = RASHIS[monthIndex(pm, pd)];
    result.hidden = false;
    result.innerHTML = "";
    result.append(el("div", { class: "center reveal" },
      el("div", { style: "font-size:64px", text: r.e }),
      el("h2", { style: "margin:4px 0", text: `${r.n} (${r.en})` }),
      el("p", { class: "dim", text: `عنصر: ${r.el} — فرمانروای سیاره‌ای: ${r.lord}` }),
    ),
    el("div", { class: "reading reveal" },
      el("div", { class: "read-item" }, el("h4", { text: "طبیعت ودیک" }), el("p", { text: r.per })),
      el("div", { class: "read-item" }, el("h4", { text: "🎯 رسالت کارما" }), el("p", { text: r.focus })),
    ),
    el("p", { class: "footer-note", text: "در طالع‌بینی ودیک، ماه و لحظهٔ دقیق تولد اهمیت دارد؛ اینجا صرفاً خوانشی نمادین است." }),
    );
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

export default { meta, page };
