/* ============================================================
   کیهان‌شناسی (کازموگرام) — چارت لحظهٔ پرسش
   ============================================================ */
import { falPage } from "../lib/ui.js";
import { el, seeded, faNum } from "../lib/util.js";

const meta = {
  id: "cosmogram",
  title: "کیهان‌شناسی (کازموگرام)",
  emoji: "🌌",
  category: "ستاره و برج",
  categorySlug: "astro",
  tagline: "چارت لحظهٔ پرسش: سیارات را در لحظهٔ «همین حالا» در دوازده خانه بچین.",
  blurb: "برخلاف طالع تولد، این چارت بر پایهٔ لحظهٔ پرسیدن تو ساخته می‌شود.",
};

const HOUSES = [
  { n: "خود و شخصیت", m: "آنچه از تو دیده می‌شود و آغازهای شخصی." },
  { n: "مال و ارزش‌ها", m: "درآمد، دارایی و آنچه برایت ارزش دارد." },
  { n: "ارتباط و یادگیری", m: "گفت‌وگو، خواهران و برادران، آموزش." },
  { n: "خانه و خانواده", m: "ریشه‌ها، آرامش و بنیان‌های زندگی." },
  { n: "عشق و خلاقیت", m: "لذت، هنر، فرزند و مهرورزی." },
  { n: "کار روزانه و سلامت", m: "عادت‌ها، نظم جسم و شغل روزمره." },
  { n: "شریک و پیوند", m: "ازدواج، شراکت و رابطه‌های یک‌به‌یک." },
  { n: "تحول و سرمایهٔ مشترک", m: "دگرگونی، مالیات، ارث و وابستگی‌های عمیق." },
  { n: "سفر و فلسفه", m: "معنا، سفر دور، آموزش عالی و باورها." },
  { n: "شغل و افتخار", m: "مسیر حرفه‌ای، جایگاه و آوازه." },
  { n: "دوستان و آرزوها", m: "جمع‌ها، شبکه‌ها و امیدهای بلند." },
  { n: "ناخودآگاه", m: "رازها، رویا و هر آنچه پنهان می‌ماند." },
];

const PLANETS = [
  { s: "☉", n: "خورشید", r: "اراده و هویت را" },
  { s: "☽", n: "ماه", r: "احساسات و شهود را" },
  { s: "☿", n: "عطارد", r: "اندیشه و گفت‌وگو را" },
  { s: "♀", n: "زهره", r: "عشق و زیبایی را" },
  { s: "♂", n: "مریخ", r: "انرژی و اقدام را" },
  { s: "♃", n: "مشتری", r: "بخت و گسترش را" },
  { s: "♄", n: "زحل", r: "ساختار و صبوری را" },
  { s: "♅", n: "اورانوس", r: "تغییر ناگهانی را" },
  { s: "♆", n: "نپتون", r: "رؤیا و الهام را" },
  { s: "♇", n: "پلوتو", r: "دگرگونی عمیق را" },
];

function page(mount) {
  const box = falPage(mount, meta, () => {});
  const q = el("input", { type: "text", maxlength: "90", placeholder: "سوال یا نیتت را بنویس (اختیاری)", autocomplete: "off" });
  const btn = el("button", { class: "btn big breathe", text: "🌌 ساختن چارت لحظه" });
  const result = el("div", { class: "result-box reveal", hidden: true });
  box.append(el("p", { class: "lead-note muted", text: "این چارت از لحظهٔ پرسیدن تو (نه تولدت) ساخته می‌شود؛ پس هر بار، آینهٔ حالِ توست." }),
    el("div", { class: "row-inputs" },
      el("div", { class: "field" }, el("label", { text: "سوال یا نیت" }), q),
      el("div", { class: "center" }, btn)),
    result);

  btn.addEventListener("click", async () => {
    btn.disabled = true;
    btn.textContent = "در حال تنظیم چرخ فلکی…";
    result.hidden = true;
    await new Promise((r) => setTimeout(r, 1400));
    const now = new Date();
    const seed = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}` + (q.value || "").slice(0, 20);
    const rng = seeded(seed);
    const houses = HOUSES.map((h, i) => ({ ...h, i, planets: [] }));
    const shuffledPlanets = [...PLANETS].sort(() => rng() - 0.5);
    // چند خانه خالی می‌مانند تا چارت طبیعی باشد
    const empty = 2;
    for (let p = 0; p < shuffledPlanets.length - empty; p++) {
      houses[Math.floor(rng() * 12)].planets.push(shuffledPlanets[p]);
    }
    const asc = Math.floor(rng() * 12);
    const r = houses[asc];
    r.planets.unshift({ s: "⬆", n: "طلوع", r: "نقطهٔ آغاز چارت را" });

    result.hidden = false;
    result.innerHTML = "";
    // چرخ
    const wheel = el("div", { style: "position:relative;width:min(78vw,320px);aspect-ratio:1;margin:10px auto;border-radius:50%;border:3px solid var(--gold);overflow:hidden;box-shadow:var(--shadow), inset 0 0 60px rgba(0,0,0,.5)" });
    for (let i = 0; i < 12; i++) {
      const seg = el("div", {
        style: `position:absolute;inset-inline-start:50%;top:50%;width:50%;height:50%;transform-origin:0 0;transform:rotate(${i * 30 + 15}deg);background:${i % 2 ? "rgba(255,255,255,.055)" : "rgba(255,255,255,.02)"};border-inline-end:1px solid rgba(255,255,255,.15)`,
      });
      wheel.append(seg);
    }
    const cx = 50, cy = 50, rOut = 42, rIn = 21;
    const signEls = [];
    houses.forEach((h) => {
      const ang = ((h.i * 30 + 15) * Math.PI) / 180;
      const signEl = el("div", {
        style: `position:absolute;left:${cx + rOut * Math.cos(ang)}%;top:${cy + rOut * Math.sin(ang)}%;transform:translate(-50%,-50%);font-size:10px;color:var(--dim);pointer-events:none`,
        text: faNum(h.i + 1),
      });
      wheel.append(signEl);
    });
    // سیارات روی چرخ
    houses.forEach((h) => {
      h.planets.forEach((p, k) => {
        const base = (h.i * 30 + 15) * Math.PI / 180;
        const rr = rIn + ((k + 1) / (h.planets.length + 1)) * (rOut - rIn) - 6;
        const x = cx + rr * Math.cos(base);
        const y = cy + rr * Math.sin(base);
        const pl = el("span", {
          style: `position:absolute;left:${x}%;top:${y}%;transform:translate(-50%,-50%);font-size:15px;pointer-events:none;text-shadow:0 0 8px rgba(0,0,0,.9)`,
          text: p.s,
        });
        wheel.append(pl);
      });
    });
    wheel.append(el("div", { style: "position:absolute;inset:0;display:grid;place-items:center;text-align:center" },
      el("div", {}, el("div", { style: "color:var(--gold);font-weight:800;font-size:12px", text: "این لحظه" }), el("div", { class: "dim", style: "font-size:10.5px", text: faNum(now.getHours()) + ":" + faNum(String(now.getMinutes()).padStart(2, "0")) }))));

    const items = houses.filter((h) => h.planets.length).map((h) => {
      const title = `خانهٔ ${faNum(h.i + 1)} — ${h.n}`;
      const paras = [h.m];
      h.planets.forEach((p) => paras.push(`${p.s} ${p.n} در این خانه ${p.r} برجسته می‌کند.`));
      return el("div", { class: "read-item" }, el("h4", { text: title }), paras.map((t) => el("p", { text: t })));
    });
    const main = houses.filter((h) => h.planets.some((p) => p.s === "☉" || p.s === "☽"));
    const summary = main.length
      ? `نقطهٔ کانونی چارت: ${main.map((h) => `خانهٔ ${faNum(h.i + 1)} (${h.n})`).join(" و ")} — انرژی اصلی این لحظهٔ تو آن‌جاست.`
      : "";
    result.append(el("div", { class: "reveal" }, wheel,
      summary ? el("p", { class: "center gold", text: summary }) : null),
      el("hr", { class: "divider" }),
      el("div", { class: "reading reveal" }, ...items),
      el("p", { class: "footer-note", text: "کازموگرام نمادین است: چارت هر لحظه بازسازی می‌شود و پاسخ را در آینهٔ حالِ تو نشان می‌دهد." }),
    );
    btn.disabled = false;
    btn.textContent = "چارت لحظهٔ جدید";
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

export default { meta, page };
