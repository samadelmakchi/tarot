/* ============================================================
   چهره‌خوانی (فیزیوگنومی) — شناخت منش از ویژگی‌های چهره
   ============================================================ */
import { falPage } from "../lib/ui.js";
import { el } from "../lib/util.js";

const meta = {
  id: "face",
  title: "چهره‌خوانی (فیزیوگنومی)",
  emoji: "🧑",
  category: "بدن و چهره",
  categorySlug: "body",
  tagline: "هر چهره، داستانی از منش می‌گوید؛ پیشانی، چشم و چانه‌ات را بشناس.",
  blurb: "سنت چین و یونان باستان: پیوند ویژگی‌های چهره با اخلاق و سرنوشت.",
};

const FEATURES = [
  {
    id: "brow", name: "پیشانی", emoji: "🌗",
    items: [
      { c: "بلند و گشاده", t: "نشان‌دهندهٔ خرد و آینده‌نگری؛ ذهن تو به دنبال معنا و دانش است." },
      { c: "کوتاه و جمع", t: "عملی و حاضر‌جواب؛ سریع به اصل کار می‌رسی و تصمیم می‌گیری." },
      { c: "مایل به عقب", t: "سرعت انتقال بالا و حافظهٔ خوب داری؛ در بحران‌ها خونسردی." },
    ],
  },
  {
    id: "eye", name: "چشم", emoji: "👁️",
    items: [
      { c: "درشت", t: "دل باز و احساساتی؛ پذیرای مردم و جهان هستی." },
      { c: "بادامی", t: "تیزبین و باهوش؛ جزئیات را خوب می‌بینی و ارزیابی می‌کنی." },
      { c: "نافذ", t: "اراده قوی و شخصیت تأثیرگذار داری؛ نگاهت سخن می‌گوید." },
    ],
  },
  {
    id: "nose", name: "بینی", emoji: "👃",
    items: [
      { c: "مستقیم و کشیده", t: "متعادل و منظم؛ در کار و زندگی نظم و قاطعیت داری." },
      { c: "نرم و گرد", t: "مهربان و خونگرم؛ مردم به تو اعتماد می‌کنند." },
      { c: "برجسته", t: "اراده و جاه‌طلبی؛ هدف‌های بزرگ را محکم دنبال می‌کنی." },
    ],
  },
  {
    id: "chin", name: "چانه و فک", emoji: "🦴",
    items: [
      { c: "مکعب و محکم", t: "ارادهٔ استوار و پایداری؛ در سختی‌ها نمی‌شکنی." },
      { c: "گرد و نرم", t: "انعطاف‌پذیر و صلح‌جو؛ با ملایمت به هدف می‌رسی." },
      { c: "کشیده", t: "صبور و باگذشت؛ تحملت در برابر مشکلات بالاست." },
    ],
  },
  {
    id: "mouth", name: "لب‌ها", emoji: "👄",
    items: [
      { c: "پر و خندان", t: "سخاوتمند و خوش‌بیان؛ شادی را به جمع می‌آوری." },
      { c: "باریک", t: "خوددار و دقیق؛ کم حرف اما حساب‌شده حرف می‌زنی." },
      { c: "با گوشهٔ رو به بالا", t: "خوش‌بین و شوخ‌طبع؛ سختی را به لبخند بدل می‌کنی." },
    ],
  },
];

function page(mount) {
  const box = falPage(mount, meta, () => {});
  box.append(el("p", { class: "lead-note muted", text: "هر ویژگی که به تو نزدیک‌تر است را انتخاب کن؛ در پایان، خوانش چهره‌ات را می‌بینی." }));
  const sel = new Map();
  const result = el("div", { class: "result-box reveal", hidden: true });
  const doneBtn = el("button", { class: "btn big", text: "🔮 خوانش چهرهٔ من", hidden: true });

  FEATURES.forEach((f) => {
    const holder = el("div", { class: "panel" },
      el("h3", { text: `${f.emoji} ${f.name}` }),
    );
    const pills = el("div", { class: "opt-pills" });
    const btns = f.items.map((it) => el("button", {
      class: "pill", text: it.c,
      onclick: () => {
        btns.forEach((b) => b.classList.remove("sel"));
        btns[f.items.indexOf(it)].classList.add("sel");
        sel.set(f.id, it);
        doneBtn.hidden = false;
      },
    }));
    pills.append(...btns);
    holder.append(pills);
    box.append(holder);
  });
  box.append(el("div", { class: "center" }, doneBtn), result);

  doneBtn.addEventListener("click", () => {
    const picked = FEATURES.filter((f) => sel.has(f.id)).map((f) => ({ f, it: sel.get(f.id) }));
    if (!picked.length) return;
    result.hidden = false;
    result.innerHTML = "";
    const items = picked.map(({ f, it }) => el("div", { class: "read-item" },
      el("h4", { text: `${f.emoji} ${f.name} — ${it.c}` }),
      el("p", { text: it.t }),
    ));
    result.append(el("div", { class: "center reveal" }, el("h3", { text: "🧑 خوانش چهرهٔ تو" })), ...items,
      el("p", { class: "footer-note", text: "چهره‌خوانی هنری نمادین و سرگرم‌کننده است؛ شخصیت واقعی تو را رفتارهایت می‌سازد." }),
    );
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
    doneBtn.textContent = "خوانش دوباره";
  });
}

export default { meta, page };
