/* ============================================================
   فال تاروت کبیر بله/خیر — پاسخ مستقیم از ۲۲ کارت بزرگ اسرار
   ============================================================ */
import { falPage } from "../lib/ui.js";
import { el, delay } from "../lib/util.js";
import { tarotZone, cardSlot, readingItem, copyBtn } from "../lib/ui.js";
import { majorDeck } from "../data/tarot-deck.js";

const meta = {
  id: "tarot-major-yesno",
  title: "فال تاروت کبیر بله/خیر",
  emoji: "🃏",
  category: "تاروت",
  categorySlug: "tarot",
  tagline: "پاسخ مستقیم و سریع به پرسش‌های دوگانه با یک کارت از تاروت کبیر.",
  blurb: "۲۲ کارت بزرگ اسرار برای پرسش‌های سرنوشت‌ساز بله/خیر.",
};

const MAP = {
  yes: new Set(["جادوگر", "امپراتریس", "عشاق", "ارابه", "قدرت", "چرخ اقبال", "ستاره", "خورشید", "قیامت", "جهان", "کاهنهٔ اعظم"]),
  no: new Set(["برج", "شیطان", "ماه", "مرد به‌دارآویخته", "دیوانه"]),
};

function polarity(card, reversed) {
  let p = 0;
  if (MAP.yes.has(card.name)) p = 4;
  else if (MAP.no.has(card.name)) p = -4;
  else if (card.name === "عدالت" || card.name === "اعتدال") p = 0;
  else if (card.name === "مرگ" || card.name === "زاهد") p = -1;
  else p = 1; // امپراتور، کشیش اعظم، هرمیت
  return reversed ? -p || -1 : p;
}

function verdict(card, reversed) {
  const p = polarity(card, reversed);
  if (p >= 3) return { v: "بله", cls: "good", note: "انرژی کارت به‌وضوح در تأیید نیت توست؛ با اطمینان پیش برو." };
  if (p >= 1) return { v: "بله، اما…", cls: "warn", note: "پاسخ به‌سوی بله است؛ ولی با دقت، صبر و برنامهٔ حساب‌شده." };
  if (p > -1) return { v: "خنثی / بستگی دارد", cls: "warn", note: "این کارت پاسخ بله/خیر قطعی نمی‌دهد؛ نتیجه به انتخاب و نگرش خودت وابسته است." };
  if (p > -3) return { v: "نه، فعلاً نه", cls: "warn", note: "انرژی‌ها فعلاً همراه نیستند؛ شاید زمان یا شکل دیگری از خواسته‌ات را باید دید." };
  return { v: "نه", cls: "bad", note: "این کارت به‌وضوح پاسخ منفی می‌دهد؛ به مسیر یا زمان دیگری فکر کن." };
}

function page(mount) {
  const box = falPage(mount, meta, () => {});
  const lead = el("p", { class: "lead-note muted", text: "پرسشت را در ذهن به‌صورت بله/خیر روشن کن (مثلاً «آیا این کار برای من درست است؟») و یک کارت بکش." });
  const btn = el("button", { class: "btn big breathe", text: "🃏 کشیدن کارت کبیر" });
  const zone = tarotZone();
  const result = el("div", { class: "result-box reveal", hidden: true });
  box.append(lead, el("div", { class: "center" }, btn), zone, result);

  btn.addEventListener("click", async () => {
    btn.disabled = true;
    btn.textContent = "در حال برهم‌زدن…";
    result.hidden = true;
    await delay(1100);
    zone.innerHTML = "";
    const deck = majorDeck();
    const card = deck[Math.floor(Math.random() * deck.length)];
    const reversed = Math.random() < 0.3;
    const slot = cardSlot({ label: "کارت کبیر تو", sub: "بزرگ اسرار" }, { card, reversed }, 500);
    zone.append(slot);
    await delay(1300);

    const v = verdict(card, reversed);
    const head = el("div", { class: "center" },
      el("div", { class: "big-answer " + v.cls, text: v.v }),
      el("p", { class: "muted", text: v.note }),
    );
    const item = readingItem(`${card.name}${reversed ? " (معکوس)" : ""} — پیام کارت`, [
      reversed ? card.reversed : card.upright,
      `کلیدواژه: ${card.key}`,
    ]);
    result.hidden = false;
    result.innerHTML = "";
    result.append(head, el("hr", { class: "divider" }), item,
      el("div", { class: "center", style: "margin-top:8px" }, copyBtn(`فال تاروت کبیر بله/خیر — پاسخ: ${v.v}\n${v.note}\nکارت: ${card.name}${reversed ? " (معکوس)" : ""}\n${reversed ? card.reversed : card.upright}`)));
    btn.disabled = false;
    btn.textContent = "کشیدن دوباره";
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

export default { meta, page };
