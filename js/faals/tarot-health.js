import { makeTarotPage } from "../lib/reading-page.js";

const meta = {
  id: "tarot-health", title: "فال تن و روان", emoji: "🌿", category: "موضوع", categorySlug: "topics",
  tagline: "سه جایگاه برای تأمل در آرامش، منابع حمایت و عادت‌های مراقبت از خود.",
  blurb: "فقط برای خوداندیشی و سرگرمی؛ کارت‌ها تشخیص یا پیش‌بینی سلامت ارائه نمی‌کنند.",
};

const page = makeTarotPage(meta, {
  deck: "full", positions: [
    { label: "حال و نیاز", hint: "چه چیزی در احساس آرامش و تعادل روزمره‌ات توجه می‌خواهد؟" },
    { label: "منبع حمایت", hint: "چه کسی یا چه عادتی می‌تواند در مراقبت از خود پشتیبانت باشد؟" },
    { label: "گام مراقبتی", hint: "یک کار کوچک و امن برای رسیدگی بهتر به خودت." },
  ],
  focusLabel: "این فال جایگزین ارزیابی یا درمان پزشکی نیست؛ برای خوداندیشی سه کارت بکش.",
});

export default { meta, page };
