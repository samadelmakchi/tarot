/* ============================================================
   فال سکه — قرعه با انداختن سکه برای پاسخ دوگانه
   ============================================================ */
import { falPage, actionFlow } from "../lib/ui.js";
import { el } from "../lib/util.js";

const meta = {
  id: "coin",
  title: "فال سکه",
  emoji: "🪙",
  category: "بخت و شانس",
  categorySlug: "chance",
  tagline: "سکه‌ای بینداز؛ رسمی کهن از روم باستان برای تصمیم‌های دوگانه.",
  blurb: "پاسخ سریع بله/خیر و انتخاب‌های دوگانه با انداختن سکه.",
};

const NO = [
  { v: "نه", t: "سکه پاسخ منفی داد؛ اما این پایان راه نیست، فقط مسیر دیگری را نشانت می‌دهد." },
  { v: "فعلاً نه", t: "زمان آن نرسیده. اگر واقعاً می‌خواهی، بعداً دوباره بپرس." },
  { v: "نه، اما فرصت دیگری هست", t: "این درِ بسته می‌شود تا درِ بهتری باز شود؛ هوشیار باش." },
];
const YES = [
  { v: "بله", t: "سکه پاسخ مثبت داد؛ با اطمینان و آرامش به راهت ادامه بده." },
  { v: "بله، قاطعانه", t: "شانس با توست! همین امروز قدم اول را بردار." },
  { v: "بله، اما با صبر", t: "پاسخ مثبت است اما عجله نکن؛ نتیجه در زمان خودش می‌رسد." },
];
const EDGE = { v: "دوباره بینداز", t: "سکه روی لبه نماند اما سرنوشت مردد بود؛ نفسی تازه کن و دوباره بپرس." };

function page(mount) {
  const box = falPage(mount, meta, () => {});
  actionFlow(box, {
    note: "سوال بله/خیری را در ذهن روشن کن و سکه را بینداز. رو = بله، پشت = نه.",
    btnLabel: "🪙 انداختن سکه",
    againLabel: "پرتاب دوباره",
    busyLabel: "در حال چرخش سکه…",
    suspense: [900, 1700],
  }, (result) => {
    const r = Math.random();
    const out = r < 0.02 ? EDGE : r < 0.5 ? YES[Math.floor(Math.random() * YES.length)] : NO[Math.floor(Math.random() * NO.length)];
    const coin = el("div", { class: "center reveal" },
      el("div", { style: "font-size:80px;line-height:1.2", text: r < 0.5 ? "🪙" : "🪙", class: "breathe" }),
      el("div", { style: "font-size:18px;color:var(--muted)", text: r < 0.5 ? "روی سکه (بله)" : "پشت سکه (نه)" }),
    );
    result.append(coin,
      el("div", { class: "center" },
        el("div", { class: "big-answer " + (out.v.startsWith("بله") ? "good" : out.v === "نه" ? "bad" : "warn"), text: out.v }),
        el("p", { class: "muted", text: out.t }),
      ),
    );
  });
}

export default { meta, page };
