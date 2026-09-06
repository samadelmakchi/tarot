/* ============================================================
   فال نخود — رسم ایرانی شمردن دانه‌های نخود برای بله/خیر
   ============================================================ */
import { falPage, actionFlow } from "../lib/ui.js";
import { el, delay } from "../lib/util.js";

const meta = {
  id: "chickpea",
  title: "فال نخود",
  emoji: "🫘",
  category: "بخت و شانس",
  categorySlug: "chance",
  tagline: "رسم کهن ایرانی: با شمردن دانه‌های نخود، پاسخ نیتت را بپرس.",
  blurb: "فال محبوب شب‌های ایرانی برای سوال‌های بله/خیر و حال‌وهوای ساده.",
};

function countAndAnswer() {
  // سه دستهٔ تصادفی از دانه‌ها، باقی‌ماندهٔ هر دسته تعیین‌کنندهٔ پاسخ است
  const heaps = [3 + Math.floor(Math.random() * 18), 3 + Math.floor(Math.random() * 18), 3 + Math.floor(Math.random() * 18)];
  const remainders = heaps.map((h) => h % 2);
  const ones = remainders.filter((x) => x === 1).length;
  if (ones >= 2) {
    return {
      v: "بله",
      cls: "good",
      t: "دانه‌ها به نفع تو نشستند؛ خیال‌ات راحت، راهت باز و مقصودت در دسترس است.",
      heaps,
    };
  }
  if (ones === 1) {
    return {
      v: "نامشخص — دوباره بپرس",
      cls: "warn",
      t: "پاسخ روشن نیست؛ یعنی نیتت هنوز شکل نگرفته یا زمانش نرسیده. چند روز صبر کن.",
      heaps,
    };
  }
  return {
    v: "نه",
    cls: "bad",
    t: "دانه‌ها پاسخ منفی دادند؛ اما بدان که هر نه، درِ بهتری باز می‌کند. نیت را عوض کن و دوباره بپرس.",
    heaps,
  };
}

function page(mount) {
  const box = falPage(mount, meta, () => {});
  const note = el("p", { class: "lead-note muted", text: "در فال سنتی، مشتی نخود را سه بار می‌شمارند؛ اینجا همان رسم را برایت اجرا می‌کنیم. نیت کن و شروع کن." });
  const btn = el("button", { class: "btn big breathe", text: "🫘 شروع فال نخود" });
  const status = el("p", { class: "center dim", text: "" });
  const result = el("div", { class: "result-box reveal", hidden: true });
  box.append(note, el("div", { class: "center" }, btn), status, result);

  btn.addEventListener("click", async () => {
    btn.disabled = true;
    result.hidden = true;
    const ans = countAndAnswer();
    status.textContent = "در حال شمردن دانه‌ها…";
    const lines = [];
    for (let r = 0; r < 3; r++) {
      status.textContent = `دستهٔ ${["اول", "دوم", "سوم"][r]} را می‌شمارم…`;
      await delay(800 + Math.random() * 600);
      lines.push(ans.heaps[r]);
    }
    status.textContent = "";
    btn.disabled = false;
    btn.textContent = "فال دوباره";

    const countLine = el("div", { class: "center muted reveal", text: `دانه‌ها: ${lines.join(" ، ")}` });
    const verdict = el("div", { class: "center reveal" },
      el("div", { class: "big-answer " + ans.cls, text: ans.v }),
      el("p", { class: "muted", text: ans.t }),
    );
    result.hidden = false;
    result.append(countLine, verdict);
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

export default { meta, page };
