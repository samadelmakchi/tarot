/* ============================================================
   فال تاروت چهار کارتی — بله/خیر با گذشته، حال، آینده و نتیجه
   ============================================================ */
import { falPage } from "../lib/ui.js";
import { el, delay, faNum } from "../lib/util.js";
import { tarotZone, cardSlot, readingItem, readingSection, copyBtn } from "../lib/ui.js";
import { fullDeck } from "../data/tarot-deck.js";

const meta = {
  id: "tarot-four-card",
  title: "فال تاروت چهار کارتی (بله/خیر)",
  emoji: "🔮",
  category: "تاروت",
  categorySlug: "tarot",
  tagline: "چهار کارت برای پاسخ روشن: گذشته، حال، آینده و نتیجهٔ نهایی نیتت.",
  blurb: "یکی از بهترین چیدمان‌های تاروت برای گرفتن پاسخ بله/خیر.",
};

const POS_MAJOR = new Set([3, 6, 7, 8, 10, 17, 19, 21, 1]);
const NEG_MAJOR = new Set([15, 16, 18, 12, 5]);
const SUIT_LEAN = { "عصا": 1, "جام": 2, "سکه": 1, "شمشیر": -2 };

function polarity(card, reversed) {
  let p = 0;
  if (card.kind === "major") {
    p = POS_MAJOR.has(card._rank) ? 3 : NEG_MAJOR.has(card._rank) ? -3 : 0;
  } else {
    p = SUIT_LEAN[card.suit] ?? 0;
  }
  return reversed ? -Math.max(1, Math.abs(p)) * Math.sign(p || 1) : p;
}

function verdictOf(cards) {
  let sum = 0;
  cards.forEach((c) => (sum += polarity(c.card, c.reversed)));
  const strongest = cards[cards.length - 1];
  const endP = polarity(strongest.card, strongest.reversed);
  const finalP = sum * 0.6 + endP * 0.9;
  if (finalP >= 1.6) return { v: "بله", cls: "good", why: "نشانه‌ها به‌وضوح در جهت تأیید نیتت هستند." };
  if (finalP >= 0.3) return { v: "بله، اما با احتیاط", cls: "warn", why: "پاسخ به‌سوی بله است اما موانع یا نکاتی برای توجه وجود دارد." };
  if (finalP > -0.3) return { v: "نامشخص", cls: "warn", why: "کائنات هنوز پاسخ روشنی نمی‌دهد؛ زمان یا تغییر نیت لازم است." };
  if (finalP > -1.6) return { v: "نه، فعلاً نه", cls: "warn", why: "انرژی‌ها در جهت مخالف هستند؛ شاید زمان یا مسیر دیگری را باید انتخاب کنی." };
  return { v: "نه", cls: "bad", why: "نشانه‌ها قویاً برخلاف نیتت هستند؛ به مسیر دیگری فکر کن." };
}

function page(mount) {
  const box = falPage(mount, meta, () => {});
  const lead = el("p", { class: "lead-note muted", text: "نیتت را روشن کن (یک پرسش بله/خیر) و چهار کارت را بکش." });
  const btn = el("button", { class: "btn big breathe", text: "🃏 کشیدن چهار کارت" });
  const zone = tarotZone();
  const result = el("div", { class: "result-box reveal", hidden: true });
  box.append(lead, el("div", { class: "center" }, btn), zone, result);

  const positions = [
    { label: "گذشته", hint: "تاریخچه و ریشه‌های نیتت." },
    { label: "حال", hint: "آنچه اکنون در جریان است." },
    { label: "آینده", hint: "اتفاقات برآمده از این نیت." },
    { label: "نتیجه", hint: "نزدیک‌ترین پاسخ به آنچه رخ خواهد داد." },
  ];

  btn.addEventListener("click", async () => {
    btn.disabled = true;
    btn.textContent = "در حال برهم‌زدن کارت‌ها…";
    result.hidden = true;
    await delay(1000);
    zone.innerHTML = "";

    const shuffled = fullDeck().sort(() => Math.random() - 0.5);
    const cards = positions.map(() => ({ card: shuffled.pop(), reversed: Math.random() < 0.32 }));

    cards.forEach((pick, i) => {
      const slot = cardSlot({ label: positions[i].label, sub: positions[i].hint }, pick, 400 + i * 550);
      zone.append(slot);
    });
    await delay(400 + (cards.length - 1) * 550 + 750);

    const v = verdictOf(cards);
    const items = cards.map((pick, i) => {
      const c = pick.card;
      const meaning = pick.reversed ? c.reversed : c.upright;
      return readingItem(`${positions[i].label} — ${c.name}${pick.reversed ? " (معکوس)" : ""}`, [positions[i].hint, meaning]);
    });
    const verdictHtml = el("div", { class: "center reveal" },
      el("div", { class: "verdict " + v.cls, text: `پاسخ نهایی: ${v.v}` }),
      el("p", { class: "muted", text: v.why }),
    );
    const section = readingSection("تفسیر کارت‌ها", items);
    const text = [
      `فال تاروت چهار کارتی — فال‌بین`, "",
      `پاسخ نهایی: ${v.v}`,
      v.why, "",
      ...cards.map((p, i) => `${faNum(i + 1)}. ${positions[i].label}: ${p.card.name}${p.reversed ? " (معکوس)" : ""} — ${p.reversed ? p.card.reversed : p.card.upright}`),
    ].join("\n");
    result.hidden = false;
    result.innerHTML = "";
    result.append(verdictHtml, el("hr", { class: "divider" }), section, el("div", { class: "center" }, copyBtn(text)));
    btn.disabled = false;
    btn.textContent = "کشیدن دوباره";
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

export default { meta, page };
