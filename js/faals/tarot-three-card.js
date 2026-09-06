/* ============================================================
   فال تاروت سه کارتی — گذشته، حال، آینده
   ============================================================ */
import { falPage } from "../lib/ui.js";
import { runSpread } from "../lib/tarot.js";

const meta = {
  id: "tarot-three-card",
  title: "فال تاروت سه کارتی",
  emoji: "🔮",
  category: "تاروت",
  categorySlug: "tarot",
  tagline: "نگاهی سریع به گذشته، حال و آیندهٔ نیتت با سه کارت.",
  blurb: "ساده‌ترین و رایج‌ترین چیدمان برای تحلیل یک موقعیت خاص.",
};

function page(mount) {
  const box = falPage(mount, meta, () => {});
  runSpread(box, {
    deck: "full",
    positions: [
      { label: "گذشته", hint: "رویدادها و جریان‌هایی که وضعیت کنونی نیتت را رقم زده‌اند." },
      { label: "حال", hint: "وضعیت کنونی و انرژی‌ای که اکنون پیرامون نیتت جاری است." },
      { label: "آینده", hint: "مسیری که اگر با جریان پیش بروی، نیتت به کجا می‌رسد." },
    ],
    focusLabel: "بر نیتت متمرکز شو و سه کارت گذشته، حال و آینده را بکش.",
    drawLabel: "🃏 کشیدن سه کارت",
    againLabel: "کشیدن دوباره",
    title: "فال تاروت سه کارتی",
  });
}

export default { meta, page };
