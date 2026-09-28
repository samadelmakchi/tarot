/* ============================================================
   فال تاروت چهار کارتی — چشم‌انداز هفته
   ============================================================ */
import { falPage } from "../lib/ui.js";
import { runSpread } from "../lib/tarot.js";

const meta = {
  id: "tarot-four-card",
  title: "فال تاروت چهار کارتی هفته",
  emoji: "🔮",
  category: "تعداد کارت",
  categorySlug: "spreads",
  tagline: "چشم‌انداز هفته با چهار کارت: موضوع، تمرکز، هشدار و هدیه.",
  blurb: "برای برنامه‌ریزی هفته و توجه به فرصت‌ها و نکته‌های مهم.",
};

function page(mount) {
  const box = falPage(mount, meta, () => {});
  runSpread(box, {
    deck: "full",
    positions: [
      { label: "موضوع هفته", hint: "انرژی یا موضوع کلی که این هفته با آن روبه‌رو هستی." },
      { label: "تمرکز", hint: "جایی که بهتر است وقت و توجهت را بگذاری." },
      { label: "هشدار", hint: "نکته‌ای که با کمی دقت می‌توانی از دشواری آن کم کنی." },
      { label: "هدیهٔ هفته", hint: "فرصت یا تجربهٔ خوبی که می‌توانی از آن بهره ببری." },
    ],
    focusLabel: "با نیت برنامه‌ریزی برای هفتهٔ پیش رو چهار کارت بکش.",
    drawLabel: "🃏 دیدن چشم‌انداز هفته",
    againLabel: "کشیدن دوباره",
    title: meta.title,
  });
}

export default { meta, page };
