/* ============================================================
   کف‌بینی (پالمیستری) — شناخت خطوط و تپه‌های کف دست
   ============================================================ */
import { falPage } from "../lib/ui.js";
import { el } from "../lib/util.js";

const meta = {
  id: "palmistry",
  title: "کف‌بینی (پالمیستری)",
  emoji: "🖐️",
  category: "بدن و چهره",
  categorySlug: "body",
  tagline: "کف دستت آینهٔ شخصیت و مسیر توست؛ خطوطت را بشناس.",
  blurb: "هنر کهن هند و یونان: خواندن خطوط، تپه‌ها و نشانه‌های کف دست.",
};

const LINES = [
  {
    id: "life", name: "خط زندگی", emoji: "🌱", intro: "خطی که دور برآمدگی انگشت شست می‌پیچد.",
    items: [
      { c: "بلند و روشن", t: "سرزندگی و انرژی پایدار داری؛ زندگی‌ات پر از سفرها و تجربه‌های تازه است." },
      { c: "کوتاه", t: "خط کوتاه یعنی عمر کوتاه نیست! یعنی انرژی را متمرکز و پرشور زندگی می‌کنی." },
      { c: "نزدیک به شست", t: "محافظه‌کار و خانواده‌دوست هستی؛ برای تجربه‌های تازه هم جا باز کن." },
      { c: "منحنی و باز", t: "ماجراجو و آزاداندیشی؛ به‌دنبال افق‌های دور و تجربه‌های تازه‌ای." },
    ],
  },
  {
    id: "head", name: "خط سر", emoji: "🧠", intro: "خط افقی میان کف دست، زیر انگشتان.",
    items: [
      { c: "بلند", t: "تفکر عمیق و برنامه‌ریزی قوی داری؛ تحلیل‌گر و دقیق هستی." },
      { c: "کوتاه", t: "عملی و مستقیم فکر می‌کنی؛ سریع به اصل مطلب می‌رسی." },
      { c: "مستقیم", t: "ذهن منطقی و واقع‌بین داری؛ تصمیم‌هایت سنجیده است." },
      { c: "متمایل به پایین", t: "خلاقیت و تخیل قوی داری؛ به هنر و ایده‌های نو علاقه‌مندی." },
    ],
  },
  {
    id: "heart", name: "خط قلب", emoji: "❤️", intro: "خط بالایی کف دست، زیر انگشتان.",
    items: [
      { c: "بلند و پیوسته", t: "عاطفه‌ای عمیق و وفادار هستی؛ عشق برایت تعهد است نه بازی." },
      { c: "کوتاه", t: "احساساتت را سنجیده نشان می‌دهی؛ اما در درون، قلبی گرم داری." },
      { c: "صاف و کم‌انحنا", t: "در عشق منطقی و باثباتی؛ تعادل بین عقل و احساس را بلدی." },
      { c: "انحنادار", t: "عاشق‌پیشه و رمانتیکی؛ احساساتت را آزادانه ابراز می‌کنی." },
    ],
  },
  {
    id: "fate", name: "خط سرنوشت", emoji: "✨", intro: "خط عمودی وسط کف دست (ممکن است ناقص باشد).",
    items: [
      { c: "کاملاً پیدا", t: "مسیر زندگی‌ات روشن و با هدف است؛ شغل و سرنوشتت را خودت می‌سازی." },
      { c: "ناپیدا یا ناقص", t: "آزادی‌ات را دوست داری و دیرتر مسیرت را می‌یابی؛ این عیب نیست، تنوع است." },
      { c: "از خط زندگی شروع می‌شود", t: "خانواده و ریشه‌هایت در مسیر شغلی‌ات اثرگذارند." },
      { c: "از وسط کف دست", t: "مستقل راه خودت را می‌سازی؛ سرنوشتت را خودت رقم می‌زنی." },
    ],
  },
];

function page(mount) {
  const box = falPage(mount, meta, () => {});
  const note = el("p", { class: "lead-note muted", text: "کف دست غیر غالب (یا دستی که می‌خوانی) را باز کن و از هر خط، حالتی را که به تو نزدیک‌تر است انتخاب کن." });
  box.append(note);
  const result = el("div", { class: "result-box reveal", hidden: true });
  const doneBtn = el("button", { class: "btn big", text: "🔮 کامل کردن کف‌بینی", hidden: true });
  const sel = new Map();

  LINES.forEach((line) => {
    const holder = el("div", { class: "panel" },
      el("h3", { text: `${line.emoji} ${line.name}` }),
      el("p", { class: "dim", text: line.intro }),
    );
    const pills = el("div", { class: "opt-pills" });
    const btns = line.items.map((it) => el("button", {
      class: "pill", text: it.c,
      onclick: () => {
        btns.forEach((b) => b.classList.remove("sel"));
        it._b.classList.add("sel");
        sel.set(line.id, it);
        doneBtn.hidden = false;
      },
    }));
    line.items.forEach((it, i) => { it._b = btns[i]; });
    pills.append(...btns);
    holder.append(pills);
    box.append(holder);
  });

  box.append(el("div", { class: "center" }, doneBtn), result);
  doneBtn.addEventListener("click", () => {
    const items = LINES.filter((l) => sel.has(l.id)).map((l) => {
      const it = sel.get(l.id);
      return el("div", { class: "read-item" },
        el("h4", { text: `${l.emoji} ${l.name} — ${it.c}` }),
        el("p", { text: it.t }),
      );
    });
    if (!items.length) return;
    result.hidden = false;
    result.innerHTML = "";
    const head = el("div", { class: "center" }, el("h3", { text: "🌿 خوانش کف دست تو" }));
    result.append(head, ...items,
      el("p", { class: "footer-note", text: "کف‌بینی ابزار خودشناسی و سرگرمی است؛ سرنوشت را ارادهٔ خودت می‌سازد." }),
    );
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
    doneBtn.textContent = "خوانش دوباره";
    window.scrollTo({ top: box.offsetTop + box.offsetHeight - 100, behavior: "smooth" });
  });
}

export default { meta, page };
