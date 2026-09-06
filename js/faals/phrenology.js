/* ============================================================
   جمجمه‌خوانی (فرنولوژی) — نمادین و سرگرم‌کننده
   ============================================================ */
import { falPage } from "../lib/ui.js";
import { el } from "../lib/util.js";

const meta = {
  id: "phrenology",
  title: "جمجمه‌خوانی (فرنولوژی)",
  emoji: "💀",
  category: "بدن و چهره",
  categorySlug: "body",
  tagline: "نقشهٔ کهن استعدادها: هر ناحیه از سر، توانایی‌ای را نشان می‌دهد.",
  blurb: "مکتب قرن نوزدهم اروپا؛ امروز به‌عنوان سرگرمی و خودشناسی نمادین.",
};

const AREAS = [
  { n: "پیشانی (استدلال)", m: "توانایی تحلیل، برنامه‌ریزی و سنجش منطقی داری؛ قدرتت در تصمیم‌های عقلانی است." },
  { n: "گیجگاه (نوآوری)", m: "ذهن خلاق و نوآوری‌داری؛ ایده‌های تازه به‌سراغت می‌آیند." },
  { n: "فرق سر (وجدان)", m: "انسان وظیفه‌شناسی هستی؛ وجدان اخلاقی‌ات راهنمای خوبی است." },
  { n: "پشت سر (محبت)", m: "دل پر از مهر داری؛ عشق ورزیدن و پیوند با دیگران برایت طبیعی است." },
  { n: "بالای گوش (شجاعت)", m: "جرئت و جسارت داری؛ در خطرها آرام و محکم می‌ایستی." },
  { n: "کنار گوش (وسعت اندیشه)", m: "ذهن باز و همه‌جانبه‌نگری؛ دید وسیعی به مسائل داری." },
  { n: "پس سر (خانواده)", m: "به ریشه و خانواده دلبسته‌ای؛ تعلق، نیروی توست." },
  { n: "ناحیهٔ بینایی (تخیل)", m: "تصویرسازی و رؤیاپردازی قوی داری؛ آینده را می‌بینی." },
];

function page(mount) {
  const box = falPage(mount, meta, () => {});
  box.append(el("p", { class: "lead-note muted", text: "در نقشهٔ کهن فرنولوژی، هر برجستگی ناحیه‌ای از سر، نشانهٔ توانایی‌ای بود. ناحیه‌ای را که حس می‌کنی در تو برجسته‌تر است انتخاب کن." }));
  const pills = el("div", { class: "opt-pills" });
  const result = el("div", { class: "result-box reveal", hidden: true });
  const btn = el("button", { class: "btn big breathe", text: "💀 خواندن برجستگی‌هایم", hidden: true });
  const btns = AREAS.map((a) => el("button", {
    class: "pill", text: a.n,
    onclick: () => {
      btns.forEach((b) => b.classList.remove("sel"));
      btns[AREAS.indexOf(a)].classList.add("sel");
      btn.hidden = false;
      btn._area = a;
    },
  }));
  pills.append(...btns);
  box.append(pills, el("div", { class: "center", style: "margin-top:16px" }, btn), result);
  btn.addEventListener("click", () => {
    const a = btn._area;
    if (!a) return;
    result.hidden = false;
    result.innerHTML = "";
    result.append(el("div", { class: "center reveal" },
      el("div", { style: "font-size:60px", text: "🧠" }),
      el("div", { class: "big-answer", text: a.n }),
      el("p", { class: "muted", text: a.m }),
    ),
    el("p", { class: "footer-note", text: "⚠️ فرنولوژی از نظر علمی اعتبار ندارد و امروزه تنها به‌عنوان یک بازی خودشناسی استفاده می‌شود." }));
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

export default { meta, page };
