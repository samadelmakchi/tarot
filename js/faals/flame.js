/* ============================================================
   شعله‌بینی (پایرومانسی) — خواندن پیام از رفتار شعله
   ============================================================ */
import { falPage, actionFlow } from "../lib/ui.js";
import { el, delay } from "../lib/util.js";

const meta = {
  id: "flame",
  title: "شعله‌بینی (پایرومانسی)",
  emoji: "🔥",
  category: "طبیعت و عنصرها",
  categorySlug: "nature",
  tagline: "به شعلهٔ شمع یا آتش نگاه کن؛ رفتارش پیام‌آور است.",
  blurb: "هنر کهن آتشکده‌ها و سلت‌ها برای دریافت پیام از شعله و دود.",
};

const FLAMES = [
  { n: "شعلهٔ بلند و روشن", m: "انرژی و شور فراوان؛ آرزویت در حال اوج‌گرفتن است." },
  { n: "شعلهٔ آرام و پایدار", m: "تعادل و آرامش؛ اوضاع طبق برنامه پیش می‌رود، نگران نباش." },
  { n: "شعلهٔ کوتاه", m: "انرژی‌ات کم است؛ این روزها بیشتر استراحت کن و نیرو جمع کن." },
  { n: "شعله با دود سیاه", m: "انرژی منفی یا وسوسه‌ای پیرامون توست؛ با دوری از تنش، پاکش کن." },
  { n: "شعلهٔ آبی", m: "ارتباط معنوی قوی؛ دعا و نیّتت در حال شنیده شدن است." },
  { n: "دو شعله در کنار هم", m: "پیوند و همکاری؛ کسی در مسیر تو همراه می‌شود." },
  { n: "ترق و جرقه", m: "خبری ناگهانی یا فرصتی غیرمنتظره؛ هوشیار باش تا از دست نرود." },
  { n: "شعله به سوی تو متمایل", m: "پیام مستقیم برای توست؛ به آنچه در دلت می‌گذرد توجه کن." },
  { n: "شعله در حال خاموشی", m: "پایان یک مرحله؛ رها کردن لازم است تا آتش تازه‌ای روشن شود." },
  { n: "شعلهٔ روشن پس از لحظه‌ای تیرگی", m: "پس از سختی، گشایش؛ صبر کن، روشنایی دارد می‌آید." },
];

function page(mount) {
  const box = falPage(mount, meta, () => {});
  actionFlow(box, {
    note: "در برابر شعله‌ای (شمع یا آتش) بنشین و نیت کن؛ سپس رفتار شعله را برایت می‌خوانیم.",
    btnLabel: "🔥 مشاهدهٔ شعله",
    againLabel: "نگاه دوباره به آتش",
    busyLabel: "در حال تماشای شعله…",
    suspense: [1800, 3000],
  }, async (result) => {
    // شبیه‌سازی جان‌دار شعله
    const fire = el("span", { style: "display:inline-block;font-size:70px;transition:transform .18s,filter .18s", text: "🔥" });
    result.append(el("div", { class: "center" }, fire));
    let done = false;
    const flicker = setInterval(() => {
      fire.style.transform = `scale(${0.9 + Math.random() * 0.3}) rotate(${(Math.random() - 0.5) * 14}deg)`;
      fire.style.filter = `hue-rotate(${(Math.random() - 0.5) * 30}deg) brightness(${0.9 + Math.random() * 0.35})`;
    }, 160);
    await delay(2600);
    clearInterval(flicker);
    const s = FLAMES[Math.floor(Math.random() * FLAMES.length)];
    fire.style.transform = "scale(1)";
    fire.style.filter = "none";
    result.append(el("div", { class: "center reveal" },
      el("div", { class: "big-answer", text: s.n }),
      el("p", { class: "muted", text: s.m }),
    ));
  });
}

export default { meta, page };
