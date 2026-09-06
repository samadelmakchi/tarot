/* ============================================================
   فال عود (ئی چینگ) — کتاب دگرگونی‌ها با روش سه سکه
   ============================================================ */
import { falPage } from "../lib/ui.js";
import { el, delay, faNum } from "../lib/util.js";

const meta = {
  id: "iching",
  title: "فال عود (ئی چینگ)",
  emoji: "☯️",
  category: "طبیعت و عنصرها",
  categorySlug: "nature",
  tagline: "با سه سکه، هگزاگرام لحظه‌ات را بساز و حکمت «کتاب دگرگونی‌ها» را بخوان.",
  blurb: "ئی چینگ کهن‌ترین کتاب حکمت چین: تعادل یین و یانگ و تصمیم‌های کلان.",
};

// هشت نماد (تری‌گرام) — یانگ = ۱ (خط پیوسته)، یین = ۰ (خط شکسته)
const TRIGRAMS = {
  0b111: { n: "آسمان", s: "☰", el: "خلاق، نیرومند", d: "آغاز آفرینش و انرژیِ پیش‌رو" },
  0b000: { n: "زمین", s: "☷", el: "پذیرا، نرم", d: "پذیرش و پرورش؛ پاسخ به آسمان" },
  0b010: { n: "آب", s: "☵", el: "ژرفا، خطر", d: "جریان در دل خطر؛ دانایی پنهان" },
  0b101: { n: "آتش", s: "☲", el: "روشنایی، وابستگی", d: "نورِ وابسته به سوخت؛ آگاهی" },
  0b001: { n: "رعد", s: "☳", el: "جنبش، برانگیختن", d: "تکان و بیداریِ ناگهانی" },
  0b110: { n: "باد", s: "☴", el: "نفوذ، آرام", d: "نرم اما فراگیر؛ نفوذ تدریجی" },
  0b100: { n: "کوه", s: "☶", el: "ایستایی، آرامش", d: "توقف و تأمل؛ رسیدن به مرز" },
  0b011: { n: "دریاچه", s: "☱", el: "شادمانی، گفت‌وگو", d: "لذت و پیوندِ دلها" },
};

function trigName(bits) {
  return TRIGRAMS[bits] || { n: "؟", s: "؟", el: "", d: "" };
}

function page(mount) {
  const box = falPage(mount, meta, () => {});
  const note = el("p", { class: "lead-note muted", text: "ئی چینگ را با سوالی روشن بپرس (ترجیحاً دربارهٔ مسیر، نه بله/خیر قطعی) و شش بار سه سکه بینداز." });
  const btn = el("button", { class: "btn big breathe", text: "☯️ انداختن سکه‌ها" });
  const linesEl = el("div", { class: "center", style: "margin-top:10px" });
  const result = el("div", { class: "result-box reveal", hidden: true });
  box.append(note, el("div", { class: "center" }, btn), linesEl, result);

  function lineEl(isYang, changing) {
    const bar = el("div", { style: `height:8px;border-radius:3px;background:${isYang ? "var(--gold)" : "var(--violet)"};${isYang ? "" : "background:linear-gradient(90deg,var(--violet) 0 42%,transparent 42% 58%,var(--violet) 58% 100%)"};opacity:${changing ? 0.85 : 1}` });
    return el("div", { style: "width:150px;margin:7px auto" }, bar);
  }

  btn.addEventListener("click", async () => {
    btn.disabled = true;
    btn.textContent = "در حال انداختن سکه‌ها…";
    result.hidden = true;
    linesEl.innerHTML = "";
    const lines = []; // از پایین به بالا
    for (let i = 0; i < 6; i++) {
      await delay(500);
      let heads = 0;
      for (let c = 0; c < 3; c++) heads += Math.random() < 0.5 ? 1 : 0;
      // سر = یانگ (۳)؛ رسم چینی: ۳ سر = یانگ متغیر، ۲ سر = یین، ۱ سر = یین متغیر؟ اینجا ساده: فرد = یانگ
      const isYang = heads % 2 === 1;
      const changing = heads === 3 || heads === 0;
      lines.push({ isYang, changing });
      linesEl.append(el("div", { class: "reveal" }, lineEl(isYang, changing)));
    }
    const bottom = lines[0], top = lines[5];
    // هگزاگرام: از پایین به بالا؛ تری‌گرام پایین = سه خط اول (پایین‌ترین)، بالا = سه خط آخر
    const lowerBits = (lines[0].isYang ? 4 : 0) + (lines[1].isYang ? 2 : 0) + (lines[2].isYang ? 1 : 0);
    const upperBits = (lines[3].isYang ? 4 : 0) + (lines[4].isYang ? 2 : 0) + (lines[5].isYang ? 1 : 0);
    const lower = trigName(lowerBits);
    const upper = trigName(upperBits);
    const num = (lowerBits * 8) + upperBits; // ۶۴ حالت
    const changingCount = lines.filter((l) => l.changing).length;

    btn.disabled = false;
    btn.textContent = "پرتاب دوباره";
    result.hidden = false;
    result.innerHTML = "";
    result.append(el("div", { class: "center reveal" },
      el("div", { style: "font-size:56px;letter-spacing:8px", text: `${lower.s}${upper.s}` }),
      el("h2", { style: "margin:6px 0 2px", text: `هگزاگرام ${faNum(num)}` }),
      el("p", { class: "muted", text: `پایین: ${lower.n} (${lower.el}) — بالا: ${upper.n} (${upper.el})` }),
    ),
    el("div", { class: "reading reveal" },
      el("div", { class: "read-item" }, el("h4", { text: "حکمت این هگزاگرام" }),
        el("p", { text: `در زیر، ${lower.n} با نیروی ${lower.el} قرار دارد و در بالا، ${upper.n} با نیروی ${upper.el}.` }),
        el("p", { text: `${lower.d}، و ${upper.d}؛ پیام نیت تو از پیوند این دو نیرو خوانده می‌شود.` }),
      ),
      changingCount
        ? el("div", { class: "read-item" }, el("h4", { text: `خطوط متغیر (${faNum(changingCount)} خط)` }),
          el("p", { text: "وجود خط متغیر یعنی این هگزاگرام در حال دگرگونی است؛ پاسخ نهایی تو شکلِ پس از تغییر است، نه وضعیت فعلی. به تغییرات در راه، به‌عنوان بخشی از پاسخ نگاه کن." }))
        : null,
      el("div", { class: "read-item" }, el("h4", { text: "راهنمای عمل" }),
        el("p", { text: changingCount ? "در این وضعیت، صبور باش و اجازه بده تغییر به‌تدریج رخ دهد؛ مقاومت، پاسخ را به تأخیر می‌اندازد." : "وضعیت پایداری دارد؛ با آرامش و پیوستگی پیش برو، چرخ را بی‌جهت نجندان." }),
      ),
    ),
    el("p", { class: "footer-note", text: "ئی چینگ نقشهٔ راه می‌دهد، نه حکم قطعی؛ نتیجه به انتخاب تو بستگی دارد." }),
    );
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

export default { meta, page };
