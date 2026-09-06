/* ============================================================
   فال کارت‌های اوراکل — پیام‌های مثبت روزانه
   ============================================================ */
import { falPage } from "../lib/ui.js";
import { el, delay } from "../lib/util.js";
import { tarotZone, cardSlot, copyBtn } from "../lib/ui.js";

const meta = {
  id: "oracle",
  title: "فال کارت‌های اوراکل",
  emoji: "😇",
  category: "کارت و ورق",
  categorySlug: "cards",
  tagline: "یک کارت اوراکل برای پیام روشن و امیدبخش امروزت بکش.",
  blurb: "کارت‌های راهنمای معنوی با پیام‌های مثبت برای شروع روز.",
};

const CARDS = [
  { name: "شکرگزاری", m: "آنچه داری را بشمار؛ شکر، درِ برکت‌های بعدی را باز می‌کند." },
  { name: "اعتماد به مسیر", m: "قدم بعدی را با اطمینان بردار؛ مسیر درست در حال روشن شدن است." },
  { name: "شجاعت", m: "ترس را به‌جانب می‌گذاری و پیش می‌روی؛ شجاعت تو الهام‌بخش است." },
  { name: "بخشش", m: "گذشت از خود و دیگران، بار سنگینی را از دوشت برمی‌دارد." },
  { name: "گشایش", m: "دری که منتظرش بودی در حال باز شدن است؛ به نشانه‌ها توجه کن." },
  { name: "شفا", m: "زخم کهنه‌ات دارد التیام می‌یابد؛ به خودت فرصت بهبود بده." },
  { name: "آغاز نو", m: "فصل تازه‌ای آغاز می‌شود؛ هر روز، فرصت دوباره است." },
  { name: "پیوند", m: "ارتباط‌هایت عمیق‌تر می‌شود؛ با عزیزانت گفت‌وگو کن." },
  { name: "روشن‌بینی", m: "پاسخ سوالی که ذهنت را مشغول کرده، به‌زودی روشن می‌شود." },
  { name: "آرامش", m: "درون خودت پناه بگیر؛ آرامش تو بر بیرون هم اثر می‌گذارد." },
  { name: "فراوانی", m: "نعمت‌ها در جریان‌اند؛ پذیرا باش و ببخش." },
  { name: "خودباوری", m: "به توانایی‌هایت ایمان بیاور؛ تو آماده‌تر از آنی که فکر می‌کنی." },
  { name: "هدایت", m: "نشانه‌ها و هم‌زمانی‌ها تو را راهنمایی می‌کنند؛ دنبالشان کن." },
  { name: "صبوری", m: "گل‌ها به وقت خود می‌شکفند؛ عجله نکن." },
  { name: "محبت به خود", m: "امروز با خودت مهربان باش؛ همان‌قدر که با دیگران مهربانی." },
  { name: "الهام", m: "ایده‌ای تازه در راه است؛ آن را بنویس و جدی بگیر." },
  { name: "پاک‌سازی", m: "آنچه دیگر به‌کارت نمی‌آید را رها کن؛ سبک‌بار شو." },
  { name: "پیروزی", m: "تلاش‌هایت نتیجه می‌دهد؛ لحظهٔ موفقیت نزدیک است." },
  { name: "دوستی", m: "دوستی صادقانه‌ای در زندگی‌ات حضور دارد؛ قدرش را بدان." },
  { name: "امید", m: "حتی در ابری‌ترین روز، خورشید پشت ابر است؛ امیدت را نگه دار." },
  { name: "گوش دادن", m: "بیشتر گوش کن تا سخن بگویی؛ پاسخ در سکوت است." },
  { name: "قدردانی از سفر", m: "از مسیری که آمده‌ای درس گرفته‌ای؛ این‌کجا، همان چیزی است که باید باشی." },
];

function page(mount) {
  const box = falPage(mount, meta, () => {});
  const note = el("p", { class: "lead-note muted", text: "در سکوت، نیت یا سوال امروزت را روشن کن و یک کارت اوراکل بکش." });
  const btn = el("button", { class: "btn big breathe", text: "😇 کشیدن کارت اوراکل" });
  const zone = tarotZone();
  const result = el("div", { class: "result-box reveal", hidden: true });
  box.append(note, el("div", { class: "center" }, btn), zone, result);

  btn.addEventListener("click", async () => {
    btn.disabled = true;
    btn.textContent = "در حال هماهنگی با پیام…";
    result.hidden = true;
    await delay(1400);
    zone.innerHTML = "";
    const c = CARDS[Math.floor(Math.random() * CARDS.length)];
    zone.append(cardSlot({ label: "پیام امروز تو", sub: "کارت اوراکل" }, { card: { name: c.name, sym: "✨", no: "☾" }, reversed: false }, 600));
    await delay(1600);
    result.hidden = false;
    result.append(el("div", { class: "center reveal" },
      el("div", { class: "big-answer", text: c.name }),
      el("p", { class: "muted", text: c.m }),
    ));
    const copy = copyBtn(`پیام اوراکل امروز: ${c.name}\n${c.m}`);
    result.append(el("div", { class: "center" }, copy));
    btn.disabled = false;
    btn.textContent = "کشیدن دوباره";
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

export default { meta, page };
