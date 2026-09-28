import { makeTarotPage } from "../lib/reading-page.js";

const meta = {
  id: "tarot-money", title: "فال مال و پول", emoji: "🪙", category: "موضوع", categorySlug: "topics",
  tagline: "سه جایگاه برای بازبینی منابع، اولویت‌ها و انتخاب مالی پیش رو.",
  blurb: "تمرینی نمادین برای فکر کردن به عادت‌ها و اولویت‌های مالی؛ نه توصیهٔ سرمایه‌گذاری.",
};

const page = makeTarotPage(meta, {
  deck: "full", positions: [
    { label: "وضعیت منابع", hint: "چه چیزی در مدیریت منابع مالی‌ات نیاز به توجه دارد؟" },
    { label: "فرصت یا انتخاب", hint: "کدام امکان یا تصمیم را بهتر است با دقت بررسی کنی؟" },
    { label: "گام سنجیده", hint: "یک اقدام محتاطانه و واقع‌بینانه برای بهتر شدن اوضاع." },
  ],
  focusLabel: "به یک پرسش کلی دربارهٔ اولویت‌های مالی‌ات فکر کن و سه کارت بکش.",
});

export default { meta, page };
