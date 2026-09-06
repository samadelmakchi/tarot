/* ============================================================
   اراکل بله/خیر — چرخ شانس با پاسخ‌های آماده
   ============================================================ */
import { falPage } from "../lib/ui.js";
import { el, delay } from "../lib/util.js";

const meta = {
  id: "oracle-yesno",
  title: "اراکل بله/خیر",
  emoji: "🎡",
  category: "بخت و شانس",
  categorySlug: "chance",
  tagline: "چرخ اراکل را بچرخان و پاسخ ساده و روشن نیتت را بگیر.",
  blurb: "چرخ قرون وسطایی پاسخ‌های آماده برای پرسش‌های دوگانه و تصمیم‌های سریع.",
};

const ANSWERS = [
  "بله", "نه", "قطعاً بله", "بعید است", "بله، اما بعداً", "نه، فعلاً نه",
  "شانس با توست", "مشورت کن و بپرس", "آری، بی‌درنگ", "هرگز نه، همیشه آری نیست",
  "دوباره بپرس", "همه‌چیز به نفع توست", "شاید؛ به قلبت رجوع کن", "بله، با صبر",
  "نشانه‌ها روشن است: بله", "سایه‌ها می‌گویند نه", "کائنات می‌گوید آری", "زمان را رعایت کن؛ نه",
];

const NOTES = {
  "بله": "انرژی در جهت نیت توست؛ پیش برو.",
  "نه": "مسیر فعلی پشتیبانی نمی‌شود؛ راه دیگری بیندیش.",
  "قطعاً بله": "پاسخی قاطع؛ شکی به خود راه نده.",
  "بعید است": "احتمالش کم است؛ به گزینه‌های دیگر فکر کن.",
  "بله، اما بعداً": "مقصد درست است، زمانش نیست. صبر کن.",
  "نه، فعلاً نه": "اکنون نه؛ شاید بعد از تغییر شرایط.",
  "شانس با توست": "اقبال به تو روی کرده؛ غنیمت بشمار.",
  "مشورت کن و بپرس": "پاسخ را با مشورت با آگاه‌تر از خودت بیاب.",
  "آری، بی‌درنگ": "همین حالا اقدام کن؛ لحظه طلایی است.",
  "دوباره بپرس": "نیتت شفاف نیست؛ تمرکز کن و دوباره بپرس.",
  "همه‌چیز به نفع توست": "ستاره‌ها هم‌راستا شده‌اند؛ امیدوار باش.",
  "شاید؛ به قلبت رجوع کن": "خرد و دل را هم‌نظر کن؛ پاسخ در توست.",
  "بله، با صبر": "آری، اما با حوصله؛ عجله نتیجه را خراب می‌کند.",
  "نشانه‌ها روشن است: بله": "همهٔ نشانه‌ها تأیید می‌کنند؛ برو.",
  "سایه‌ها می‌گویند نه": "مراقب باش؛ این تصمیم را جدی‌تر بازبینی کن.",
  "کائنات می‌گوید آری": "هماهنگی کاملی با خواسته‌ات دیده می‌شود.",
  "زمان را رعایت کن؛ نه": "عجله دشمن توست؛ چند روزی صبر کن.",
};

const COLORS = ["#8b5cf6", "#e9c46a", "#38bdf8", "#f472b6", "#34d399", "#fb923c", "#a78bfa", "#f87171"];

function page(mount) {
  const box = falPage(mount, meta, () => {});
  const note = el("p", { class: "lead-note muted center", text: "سوال دوگانه‌ات را در ذهن روشن کن و چرخ را بچرخان." });
  const wheelWrap = el("div", { class: "wheel-wrap" });
  const wheel = el("div", { class: "wheel" });
  const pin = el("div", { class: "wheel-pin", text: "▼" });
  const n = ANSWERS.length;
  const seg = 360 / n;
  ANSWERS.forEach((a, i) => {
    const rot = i * seg;
    const s = el("div", {
      class: "seg",
      style: `transform: rotate(${rot}deg); --rot:${rot}deg; background: linear-gradient(180deg, ${COLORS[i % COLORS.length]}, ${COLORS[(i + 3) % COLORS.length]})`,
    });
    s.append(el("span", { text: a }));
    wheel.append(s);
  });
  wheelWrap.append(wheel);
  const btn = el("button", { class: "btn big breathe", text: "🎡 چرخاندن چرخ" });
  const result = el("div", { class: "result-box reveal", hidden: true });
  box.append(note, wheelWrap, el("div", { class: "center" }, btn), result);

  btn.addEventListener("click", async () => {
    btn.disabled = true;
    result.hidden = true;
    const idx = Math.floor(Math.random() * n);
    const extraTurns = 5;
    const target = 360 * extraTurns - (idx * seg + seg / 2);
    wheel.style.transform = `rotate(${target}deg)`;
    await delay(3600);
    const answer = ANSWERS[idx];
    const good = answer.startsWith("بله") || answer.startsWith("آری") || answer.startsWith("قطعاً") || answer.startsWith("شانس") || answer.startsWith("همه‌") || answer.startsWith("نشانه") || answer.startsWith("کائنات");
    const cls = good ? "good" : answer.startsWith("نه") || answer.startsWith("بعید") || answer.startsWith("سایه") ? "bad" : "warn";
    result.hidden = false;
    result.append(
      el("div", { class: "center reveal" },
        el("div", { class: "big-answer " + cls, text: answer }),
        el("p", { class: "muted", text: NOTES[answer] || "" }),
      ),
    );
    btn.disabled = false;
    btn.textContent = "چرخش دوباره";
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

export default { meta, page };
