/* ============================================================
   پرنده‌بینی (اورنیتومانسی) — جهت پرواز و نوع پرنده
   ============================================================ */
import { falPage } from "../lib/ui.js";
import { el } from "../lib/util.js";

const meta = {
  id: "birds",
  title: "پرنده‌بینی (اورنیتومانسی)",
  emoji: "🕊️",
  category: "طبیعت و عنصرها",
  categorySlug: "nature",
  tagline: "در روم باستان از پرواز پرندگان خبر می‌گرفتند؛ پرنده‌ای را برگزین.",
  blurb: "نوع پرنده و جهت پروازش در باور کهن، خبر از سفر، پیروزی یا هشدار می‌داد.",
};

const BIRDS = [
  { e: "🕊️", n: "کبوتر", m: "صلح و محبت؛ خبری آرام‌بخش در راه است و دل‌ها به هم نزدیک می‌شود." },
  { e: "🦅", n: "شاهین/عقاب", m: "پیروزی و بلندپروازی؛ به هدفی بلند برس و بر رقیب چیره شو." },
  { e: "🦜", n: "طوطی", m: "سخن و گفت‌وگو؛ پیامی شنیده می‌شود که با سخن تو گرهی را باز می‌کند." },
  { e: "🦉", n: "جغد", m: "خرد پنهان؛ هشداری برای دقت بیشتر و پرهیز از فریب." },
  { e: "🐦", n: "گنجشک", m: "شادی‌های کوچک؛ از لحظه‌های ساده امروز لذت ببر." },
  { e: "🐧", n: "پرندهٔ ساحلی/آبی", m: "پیوند با آب و احساسات؛ به شهود و جریان دل اعتماد کن." },
  { e: "🦩", n: "پرندگان مهاجر", m: "سفر و تغییر مکان؛ کوچ به جایی بهتر در راه است." },
  { e: "🐦‍⬛", n: "کلاغ", m: "هشدار و دگرگونی؛ پیامی که باید جدی گرفته شود در راه است." },
];

const DIRECTIONS = [
  { d: "شرق", m: "آغاز تازه؛ خبری از راهِ طلوع می‌رسد و روز نو می‌شود." },
  { d: "غرب", m: "فرجام و جمع‌بندی؛ موضوعی در حال پایان و نتیجه‌گیری است." },
  { d: "شمال", m: "سختی و آزمون، اما با پاداش؛ استوار بمان." },
  { d: "جنوب", m: "گرما و شور؛ عشق و انرژی تازه به زندگی‌ات می‌آید." },
  { d: "به سمت خانه", m: "بازگشت و آرامش؛ به ریشه‌ها و خانواده‌ات نزدیک می‌شوی." },
  { d: "دور از خانه", m: "سفر یا جابه‌جایی در راه است؛ افق تازه‌ای پیش روست." },
  { d: "رو به بالا", m: "رشد و آرزو؛ نیتت به‌سوی اوج در حرکت است." },
  { d: "نزدیک زمین", m: "عمل و واقعیت؛ وقت پرواز نیست، وقت ساختن است." },
];

function page(mount) {
  const box = falPage(mount, meta, () => {});
  const pills = el("div", { class: "opt-pills center", style: "justify-content:center" });
  const result = el("div", { class: "result-box reveal", hidden: true });
  const btns = BIRDS.map((b) => el("button", {
    class: "pill", text: `${b.e} ${b.n}`,
    onclick: () => {
      btns.forEach((x) => x.classList.remove("sel"));
      btns[BIRDS.indexOf(b)].classList.add("sel");
      result.hidden = false;
      result.innerHTML = "";
      const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      result.append(el("div", { class: "center reveal" },
        el("div", { style: "font-size:70px", text: b.e, class: "breathe" }),
        el("h2", { style: "margin:4px 0", text: `${b.n} به ${dir.d}` }),
        el("p", { class: "muted", text: b.m }),
        el("div", { class: "read-item", style: "margin-top:10px;text-align:right" },
          el("h4", { text: `پیام جهت (${dir.d})` }),
          el("p", { text: dir.m }),
        ),
      ));
      result.scrollIntoView({ behavior: "smooth", block: "nearest" });
    },
  }));
  pills.append(...btns);
  box.append(el("p", { class: "lead-note muted", text: "پرنده‌ای را که این روزها بیشتر دیده‌ای (یا دلت می‌کشد) انتخاب کن؛ جهت، پیام دوم را می‌دهد." }), pills, result);
}

export default { meta, page };
