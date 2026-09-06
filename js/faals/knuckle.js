/* ============================================================
   فال انگشت (یکی بود، یکی نبود) — شمردن بند انگشتان
   ============================================================ */
import { falPage } from "../lib/ui.js";
import { el, faNum } from "../lib/util.js";

const meta = {
  id: "knuckle",
  title: "فال انگشت (رگ‌بینی)",
  emoji: "🖐️",
  category: "بخت و شانس",
  categorySlug: "chance",
  tagline: "رسم شیرین «یکی بود، یکی نبود»: با شمردن بند انگشتان، پاسخ بگیر.",
  blurb: "شمارش بند انگشتان دو دست برای تصمیم‌های سریع و بازی‌های دورهمی.",
};

function page(mount) {
  const box = falPage(mount, meta, () => {});
  const q = el("input", { type: "text", maxlength: "80", placeholder: "سوال یا نیتت را بنویس (مثلاً: این سفر خوب پیش می‌رود؟)", autocomplete: "off" });
  const note = el("p", { class: "lead-note muted", text: "در این فال، حروف سوال‌ات را روی بند انگشتان دو دست می‌شماریم؛ جایی که شمردن تمام شود، پاسخ همان‌جاست." });
  const field = el("div", { class: "field", style: "max-width:520px;margin-inline:auto" }, el("label", { text: "نیت یا سوال" }), q);
  const btn = el("button", { class: "btn big breathe", text: "🖐️ شروع شمردن" });
  const result = el("div", { class: "result-box reveal", hidden: true });
  box.append(note, field, el("div", { class: "center", style: "margin-top:14px" }, btn), result);

  btn.addEventListener("click", async () => {
    const text = (q.value || "").trim();
    if (!text) { q.focus(); return; }
    btn.disabled = true;
    result.hidden = true;
    // حروف فارسی بدون فاصله را می‌شماریم (شمارش سنتی روی بندها)
    const letters = text.replace(/\s+/g, "").length;
    const knuckles = 14; // دو دست × ۷ بند
    const end = letters % knuckles || knuckles;
    const onRight = end <= 7; // دستِ راست یا چپ
    const pools = {
      right: [
        { v: "بله", t: "شمردن روی دستِ راست تمام شد؛ نشانهٔ فال نیک و پاسخ مثبت." },
        { v: "آری، و سریع", t: "دست راست یعنی خیر و برکت؛ پاسخ نیتت مثبت و نزدیک است." },
        { v: "بله، با گشایش", t: "دست راست نشانهٔ گشایش است؛ راه باز و کارت آسان می‌شود." },
      ],
      left: [
        { v: "نه، فعلاً نه", t: "شمردن روی دستِ چپ ایستاد؛ نشانهٔ تأخیر یا پاسخ منفی در این زمان." },
        { v: "نه، اما تغییرش بده", t: "دست چپ یعنی موانع؛ نیت یا روشت را عوض کن." },
        { v: "نامشخص", t: "دست چپ گاهی نشانهٔ درون‌نگری است؛ پاسخ را در خودت بجوی." },
      ],
    };
    await new Promise((r) => setTimeout(r, 1400 + Math.random() * 900));
    const pool = onRight ? pools.right : pools.left;
    const out = pool[Math.floor(Math.random() * pool.length)];
    btn.disabled = false;
    result.hidden = false;
    result.append(
      el("div", { class: "center reveal" },
        el("p", { class: "muted", text: `«${text}»` }),
        el("p", { class: "dim", text: `${faNum(letters)} حرف، روی ${faNum(end)}اُمین بند انگشت (${onRight ? "دست راست" : "دست چپ"}) ایستاد` }),
        el("div", { class: "big-answer " + (onRight ? "good" : "warn"), text: out.v }),
        el("p", { class: "muted", text: out.t }),
      ),
    );
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

export default { meta, page };
