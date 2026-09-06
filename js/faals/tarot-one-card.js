/* ============================================================
   فال تاروت تک کارتی — پاسخ امروز در یک کارت از تاروت کبیر
   ============================================================ */
import { falPage } from "../lib/ui.js";
import { runSpread } from "../lib/tarot.js";

const meta = {
  id: "tarot-one-card",
  title: "فال تاروت تک کارتی",
  emoji: "🔮",
  category: "تاروت",
  categorySlug: "tarot",
  tagline: "با کشیدن تنها یک کارت از تاروت کبیر، پیام امروزت را دریافت کن.",
  blurb: "سریع و قدرتمند؛ یک کارت از ۲۲ کارت بزرگ اسرار برای راهنمایی لحظه‌ای.",
};

function page(mount) {
  const box = falPage(mount, meta, () => {});
  runSpread(box, {
    deck: "major",
    positions: [
      { label: "کارت امروز تو", hint: "این کارت آینه‌ای از انرژی و تمرکز امروز توست." },
    ],
    focusLabel: "چند نفس عمیق بکش، بر نیتت متمرکز شو و کارتت را بکش.",
    drawLabel: "🃏 کشیدن کارت",
    againLabel: "کشیدن کارت دیگر",
    title: "فال تاروت تک کارتی",
  });
}

export default { meta, page };
