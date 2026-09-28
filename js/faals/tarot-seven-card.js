import { makeTarotPage } from "../lib/reading-page.js";

const meta = {
  id: "tarot-seven-card", title: "فال تاروت هفت کارتی هفته", emoji: "🔮", category: "تعداد کارت", categorySlug: "spreads",
  tagline: "یک کارت برای هر روز هفته، از شنبه تا جمعه.",
  blurb: "چشم‌انداز نمادین هفته، روزبه‌روز؛ برای برنامه‌ریزی و تأمل.",
};

const days = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];
const page = makeTarotPage(meta, {
  deck: "full", positions: days.map((day) => ({ label: day, hint: `موضوعی برای توجه و تأمل در روز ${day}.` })),
  focusLabel: "یک نیت کلی برای هفته انتخاب کن و کارت‌های هر روز را به ترتیب بکش.",
  drawLabel: "کشیدن چشم‌انداز هفتگی",
  flipGap: 220,
});

export default { meta, page };
