/* ============================================================
   عنبیه‌خوانی (ایریدولوژی) — رنگ و نقش عنبیه
   ============================================================ */
import { falPage } from "../lib/ui.js";
import { el } from "../lib/util.js";

const meta = {
  id: "iridology",
  title: "عنبیه‌خوانی (ایریدولوژی)",
  emoji: "👁️",
  category: "بدن و چهره",
  categorySlug: "body",
  tagline: "چشم، آیینهٔ درون است؛ رنگ و نقش عنبیه‌ات را بخوان.",
  blurb: "بر پایهٔ باور کهن مصر و اروپا دربارهٔ بازتاب حالات درون در چشم.",
};

const IRIS = [
  { c: "قهوه‌ای پررنگ", m: "طبیعت زمینی و استوار داری؛ گرم، وفادار و پرانرژی هستی. در سختی‌ها تکیه‌گاه دیگرانی." },
  { c: "فندقی", m: "ترکیبی از ثبات خاک و انعطاف؛ تعادل را خوب می‌فهمی و در تغییرات خونسرد می‌مانی." },
  { c: "سبز", m: "قلب خلاق و روحیهٔ آزاد داری؛ حس‌است و به زیبایی‌ها حساسی." },
  { c: "آبی", m: "ذهن روشن و روح حساس داری؛ آرامش و ژرفای درونت مانند آب است." },
  { c: "خاکستری", m: "درون‌نگر و تحلیلگر هستی؛ آرامش و رازداریات برایت ارزشمند است." },
  { c: "نقره‌ای روشن", m: "حساسیت بالا و شهود قوی داری؛ تغییرات محیط را زود حس می‌کنی." },
  { c: "با حلقهٔ طلایی دور مردمک", m: "در باور ایریدولوژی نماد انرژی و اراده است؛ اراده‌ای قوی و قلبی پرشور داری." },
  { c: "با لکه‌های ریز", m: "زندگی پر از تجربه‌های متنوع داری؛ هر لکه، داستانی از مسیر پررنگ توست." },
];

function page(mount) {
  const box = falPage(mount, meta, () => {});
  box.append(el("p", { class: "lead-note muted", text: "در آینه به عنبیه‌ات نگاه کن؛ رنگی را که می‌بینی انتخاب کن." }));
  const pills = el("div", { class: "opt-pills" });
  const result = el("div", { class: "result-box reveal", hidden: true });
  const btn = el("button", { class: "btn big breathe", text: "👁️ خواندن عنبیه‌ام", hidden: true });
  const btns = IRIS.map((it) => el("button", {
    class: "pill", text: it.c,
    onclick: () => {
      btns.forEach((b) => b.classList.remove("sel"));
      btns[IRIS.indexOf(it)].classList.add("sel");
      btn.hidden = false;
      btn._it = it;
    },
  }));
  pills.append(...btns);
  box.append(pills, el("div", { class: "center", style: "margin-top:16px" }, btn), result);
  btn.addEventListener("click", () => {
    const it = btn._it;
    if (!it) return;
    result.hidden = false;
    result.innerHTML = "";
    result.append(el("div", { class: "center reveal" },
      el("div", { style: "font-size:60px", text: "👁️" }),
      el("div", { class: "big-answer", text: it.c }),
      el("p", { class: "muted", text: it.m }),
    ),
    el("p", { class: "footer-note", text: "⚠️ ایریدولوژی روشی علمی برای تشخیص بیماری نیست؛ این خوانش صرفاً نمادین و برای سرگرمی است." }),
    );
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

export default { meta, page };
