import { makeTarotPage } from "../lib/reading-page.js";

const meta = {
  id: "tarot-major-arcana", title: "فال تاروت کبیر", emoji: "🔮", category: "دستهٔ کارت", categorySlug: "deck-types",
  tagline: "یک کارت از ۲۲ آرکانای بزرگ برای تأمل دربارهٔ چرخه‌های مهم زندگی و رشد درونی.",
  blurb: "فقط از ۲۲ کارت کبیر؛ مناسب موضوع‌های مهم و مسیر رشد شخصی.",
};

const page = makeTarotPage(meta, {
  deck: "major", positions: [{ label: "پیام تاروت کبیر", hint: "نمادی برای اندیشیدن به مسیر و دگرگونی‌های بزرگ زندگی." }],
  focusLabel: "بر یک موضوع مهم یا مسیر رشد درونی تمرکز کن و یک کارت از ۲۲ کارت کبیر بکش.",
  drawLabel: "کشیدن از تاروت کبیر",
});

export default { meta, page };
