/* ============================================================
   خاک و شن (ژئومانسی / رمالی) — رمل‌اندازی مدرن
   ============================================================ */
import { falPage } from "../lib/ui.js";
import { el, delay, faNum } from "../lib/util.js";

const meta = {
  id: "geomancy",
  title: "خاک و شن (ژئومانسی)",
  emoji: "🏜️",
  category: "طبیعت و عنصرها",
  categorySlug: "nature",
  tagline: "رمل‌اندازی با نقطه‌های شن؛ روش کهن آفریقا و عربستان برای بله/خیر.",
  blurb: "نقشه‌برداری انرژی زمین با نقطه‌ها و خطوط؛ ساده‌شدهٔ رمالی سنتی.",
};

// ۱۶ شکل رمل — هر شکل ۴ ردیف (۱ = تک‌نقطه، ۰ = جفت‌نقطه)
const FIGURES = [
  { bits: [0, 0, 0, 0], n: "صحرا", lean: 0, m: "سکون و انتظار؛ زمین خالی است، هر چه بکاری خودت باید آبیاری کنی." },
  { bits: [1, 0, 0, 0], n: "چشمه", lean: 1, m: "جوشش تازه؛ نیرویی از درون در حال بیرون زدن است." },
  { bits: [0, 1, 0, 0], n: "ریگ‌زار", lean: -1, m: "پراکندگی و بی‌ثباتی؛ تمرکز لازم است." },
  { bits: [1, 1, 0, 0], n: "کوه", lean: 1, m: "استواری و مانعِ رفیع؛ با پایداری از آن بالا می‌روی." },
  { bits: [0, 0, 1, 0], n: "رود", lean: 1, m: "جریان و حرکت؛ با رودِ زندگی همراه شو." },
  { bits: [1, 0, 1, 0], n: "باغ", lean: 1, m: "ثمر و برکت؛ تلاش‌هایت در حال بارور شدن است." },
  { bits: [0, 1, 1, 0], n: "ابر", lean: -1, m: "ابهام و انتظار؛ هنوز زمان قضاوت نیست." },
  { bits: [1, 1, 1, 0], n: "آفتاب", lean: 1, m: "پیروزی و روشنی؛ بهترین نشانه‌ها برای نیت تو." },
  { bits: [0, 0, 0, 1], n: "سایه", lean: -1, m: "تردید و ناپیدایی؛ موضوعی پنهان مانده است." },
  { bits: [1, 0, 0, 1], n: "گنج", lean: 1, m: "ارزش پنهان؛ چیزی گرانبها در حال آشکار شدن است." },
  { bits: [0, 1, 0, 1], n: "صخره", lean: -1, m: "مانع سخت؛ اما صخره برای شکستن نیست، برای دور زدن است." },
  { bits: [1, 1, 0, 1], n: "دریا", lean: 1, m: "وسعت و فرصت؛ افق‌های تازه‌ای باز می‌شود." },
  { bits: [0, 0, 1, 1], n: "باد", lean: -1, m: "تغییر بی‌قرار؛ موضوعی که زود می‌آید و می‌رود." },
  { bits: [1, 0, 1, 1], n: "درخت", lean: 1, m: "رشد و ریشه؛ از دل خاک، تنه‌ای استوار برمی‌آید." },
  { bits: [0, 1, 1, 1], n: "آتش", lean: -1, m: "سوختن و آزمون؛ اما خاکستر، بسترِ تولد دوباره است." },
  { bits: [1, 1, 1, 1], n: "سپیده", lean: 1, m: "بیداری کامل؛ شب تمام شده و نور از همه‌جا می‌تابد." },
];

function fig(bits) {
  return FIGURES.find((f) => f.bits.join() === bits.join());
}
const xor = (a, b) => a.map((v, i) => v ^ b[i]);

function page(mount) {
  const box = falPage(mount, meta, () => {});
  box.append(el("p", { class: "lead-note muted", text: "در رمل سنتی، روی شن چهار بار نقطه می‌گذارند و از زوج/فرد بودن هر ردیف، شکل‌ها را می‌سازند. نیت کن و نقطه‌ها را بینداز." }));
  const btn = el("button", { class: "btn big breathe", text: "🏜️ انداختن رمل" });
  const status = el("p", { class: "center dim", text: "" });
  const result = el("div", { class: "result-box reveal", hidden: true });
  box.append(el("div", { class: "center" }, btn), status, result);

  function renderFigure(bits, label) {
    const f = fig(bits);
    const dots = bits.map((b) => el("div", { style: "font-size:11px;line-height:1.15", text: b ? "●" : "● ●" }));
    const cell = el("div", { style: "text-align:center" },
      el("div", { style: "font-size:11px;color:var(--dim)", text: label }),
      el("div", { style: "margin:2px 0 0", text: f.n, class: "gold" }),
    );
    const holder = el("div", { style: "text-align:center;background:rgba(0,0,0,.2);border:1px solid var(--card-border);border-radius:10px;padding:8px" }, dots[0], dots[1], dots[2], dots[3], cell);
    return { holder, f };
  }

  btn.addEventListener("click", async () => {
    btn.disabled = true;
    status.textContent = "در حال انداختن نقطه‌ها روی شن…";
    result.hidden = true;
    await delay(1200 + Math.random() * 800);

    const mothers = [];
    for (let i = 0; i < 4; i++) {
      const bits = Array.from({ length: 4 }, () => (Math.random() < 0.5 ? 1 : 0));
      mothers.push(bits);
      status.textContent = `مادر ${faNum(i + 1)}: ${fig(bits).n}…`;
      await delay(650);
    }
    const d0 = mothers.map((m) => m[0]);
    const d1 = mothers.map((m) => m[1]);
    const d2 = mothers.map((m) => m[2]);
    const d3 = mothers.map((m) => m[3]);
    const nieces = [xor(mothers[0], mothers[1]), xor(mothers[2], mothers[3]), xor(d0, d1), xor(d2, d3)];
    const w1 = xor(nieces[0], nieces[1]);
    const w2 = xor(nieces[2], nieces[3]);
    const judge = xor(w1, w2);
    status.textContent = "";

    const grid = el("div", { class: "grid2", style: "margin-bottom:8px" });
    const m0 = renderFigure(mothers[0], "مادر ۱");
    const m1 = renderFigure(mothers[1], "مادر ۲");
    const m2 = renderFigure(mothers[2], "مادر ۳");
    const m3 = renderFigure(mothers[3], "مادر ۴");
    [m0, m1, m2, m3].forEach((x) => grid.append(x.holder));
    const j = renderFigure(judge, "داور");
    const yesCount = [m0, m1, m2, m3].filter((x) => x.f.lean > 0).length + (j.f.lean > 0 ? 0.5 : 0);
    const score = yesCount / 4.5;
    let v, cls;
    if (score >= 0.72) { v = "بله — رمل خیر است"; cls = "good"; }
    else if (score >= 0.42) { v = "مایل به بله — اما با رعایت احتیاط"; cls = "warn"; }
    else if (score >= 0.2) { v = "مایل به نه — موضوع را بازبینی کن"; cls = "warn"; }
    else { v = "نه — این زمان و مسیر مناسب نیست"; cls = "bad"; }

    result.hidden = false;
    result.innerHTML = "";
    result.append(grid,
      el("div", { class: "center reveal" },
        el("div", { class: "stat-card", style: "max-width:340px;margin-inline:auto" },
          el("div", { class: "l", text: "شکل داور (نتیجه)" }), j.holder,
          el("div", { class: "verdict " + cls, text: v },),
          el("p", { class: "muted", text: j.f.m }),
        ),
      ),
    );
    btn.disabled = false;
    btn.textContent = "رمل دوباره";
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

export default { meta, page };
