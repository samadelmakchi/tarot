import { makeTarotPage } from "../lib/reading-page.js";

const meta = {
  id: "tarot-minor-arcana", title: "فال تاروت صغیر", emoji: "🃏", category: "دستهٔ کارت", categorySlug: "deck-types",
  tagline: "یک کارت از ۵۶ آرکانای کوچک برای توجه به کارها، احساسات و موقعیت‌های روزمره.",
  blurb: "فقط از ۵۶ کارت صغیر؛ نگاهی نمادین به اتفاق‌های روزمره.",
};

const page = makeTarotPage(meta, {
  deck: "minor", positions: [{ label: "پیام تاروت صغیر", hint: "نمادی برای روشن‌تر دیدن شرایط و انتخاب‌های روزمره." }],
  focusLabel: "به یک موقعیت روزمره فکر کن و یک کارت از ۵۶ کارت صغیر بکش.",
  drawLabel: "کشیدن از تاروت صغیر",
});

export default { meta, page };
