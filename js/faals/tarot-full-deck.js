import { makeTarotPage } from "../lib/reading-page.js";

const meta = {
  id: "tarot-full-deck", title: "فال با کل دستهٔ تاروت", emoji: "🃏", category: "دستهٔ کارت", categorySlug: "deck-types",
  tagline: "یک کارت از دستهٔ کامل ۷۸تایی؛ ترکیبی از آرکانای بزرگ و کوچک.",
  blurb: "یک برداشت سریع از کل ۷۸ کارت برای پیوند دادن تصویر کلی و جزئیات روزمره.",
};

const page = makeTarotPage(meta, {
  deck: "full", positions: [{ label: "پیام کل دسته", hint: "نمادی از پیوند میان مسیر کلی و جزئیات این روزها." }],
  focusLabel: "نیتت را در ذهن نگه دار و یک کارت از کل دستهٔ ۷۸تایی بکش.",
  drawLabel: "کشیدن از کل دسته",
});

export default { meta, page };
