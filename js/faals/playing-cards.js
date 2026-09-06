/* ============================================================
   فال ورق (پاسور) — سه ورق از دستهٔ ۵۲ کارتی
   ============================================================ */
import { falPage } from "../lib/ui.js";
import { el, delay } from "../lib/util.js";
import { tarotZone, cardSlot, readingItem, readingSection, copyBtn } from "../lib/ui.js";

const meta = {
  id: "playing-cards",
  title: "فال ورق (پاسور)",
  emoji: "🂠",
  category: "کارت و ورق",
  categorySlug: "cards",
  tagline: "سه ورق پاسور برای عشق، کار و زندگی روزمره‌ات بکش.",
  blurb: "فال سنتی با ورق‌های بازی؛ هر خال و رتبه، پیام خودش را دارد.",
};

const SUITS = {
  hearts: { fa: "دل", sym: "♥️", pos: "عشق و احساسات", posTxt: "در قلمروی دل و روابط", yes: 2 },
  diamonds: { fa: "خشت", sym: "♦️", pos: "پول و خبر", posTxt: "در قلمروی مال و پیام", yes: 2 },
  spades: { fa: "پیک", sym: "♠️", pos: "غم، تلاش و کار", posTxt: "در قلمروی کار و کوشش", yes: -1 },
  clubs: { fa: "گشنیز", sym: "♣️", pos: "خیر و موفقیت", posTxt: "در قلمروی بخت و گشایش", yes: 1 },
};
const RANKS = {
  "A": { fa: "آس", m: "آغاز تازه و خبر مهم" },
  "2": { fa: "دو", m: "پیوند و همکاری" },
  "3": { fa: "سه", m: "رشد و شادمانی" },
  "4": { fa: "چهار", m: "ثبات و استواری" },
  "5": { fa: "پنج", m: "تغییر و بی‌قراری" },
  "6": { fa: "شش", m: "هماهنگی و مسیر هموار" },
  "7": { fa: "هفت", m: "موفقیت در تلاش" },
  "8": { fa: "هشت", m: "حرکت و خبر" },
  "9": { fa: "نه", m: "آرزو و میل درونی" },
  "10": { fa: "ده", m: "کمال و جمع‌بندی" },
  "J": { fa: "سرباز", m: "پیام و پیشنهاد" },
  "Q": { fa: "بی‌بی", m: "زنی مهربان و تأثیرگذار" },
  "K": { fa: "شاه", m: "مردی قدرتمند یا اقتدار" },
};
const SLOTS = [
  { l: "گذشته", h: "ریشهٔ نیتت در گذشته" },
  { l: "حال", h: "وضعیت کنونی نیت" },
  { l: "آینده", h: "آنچه در انتظار توست" },
];

function page(mount) {
  const box = falPage(mount, meta, () => {});
  const note = el("p", { class: "lead-note muted", text: "ورق‌ها را بر بزن، نیت کن و سه ورق بکش." });
  const btn = el("button", { class: "btn big breathe", text: "🂠 کشیدن سه ورق" });
  const zone = tarotZone();
  const result = el("div", { class: "result-box reveal", hidden: true });
  box.append(note, el("div", { class: "center" }, btn), zone, result);

  btn.addEventListener("click", async () => {
    btn.disabled = true;
    btn.textContent = "در حال بر زدن ورق‌ها…";
    result.hidden = true;
    await delay(1100);
    zone.innerHTML = "";
    const keys = Object.keys(SUITS);
    const picks = SLOTS.map(() => {
      const sKey = keys[Math.floor(Math.random() * 4)];
      const rKeys = Object.keys(RANKS);
      const rKey = rKeys[Math.floor(Math.random() * rKeys.length)];
      const suit = SUITS[sKey];
      const rank = RANKS[rKey];
      return {
        card: { name: `${rank.fa} ${suit.fa}`, sym: suit.sym, no: "" },
        suit, rank, up: true,
        pos: 0,
      };
    });
    picks.forEach((p, i) => {
      const slot = cardSlot({ label: SLOTS[i].l, sub: SLOTS[i].h }, { card: p.card, reversed: false }, 500 + i * 550);
      zone.append(slot);
    });
    await delay(500 + 2 * 550 + 800);
    const items = picks.map((p, i) => readingItem(`${SLOTS[i].l} — ${p.card.name} ${p.suit.sym}`, [SLOTS[i].h, `معنای کارت: ${p.rank.m}؛ این ورق ${p.suit.posTxt} پیامی دارد.`]));
    const text = ["فال ورق — فال‌بین", "", ...picks.map((p, i) => `${SLOTS[i].l}: ${p.card.name} ${p.suit.sym} — ${p.rank.m} (${p.suit.pos})`)].join("\n");
    result.hidden = false;
    result.innerHTML = "";
    result.append(readingSection("تفسیر ورق‌ها", items), el("div", { class: "center" }, copyBtn(text)));
    btn.disabled = false;
    btn.textContent = "کشیدن دوباره";
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

export default { meta, page };
