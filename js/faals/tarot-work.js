import { makeTarotPage } from "../lib/reading-page.js";

const meta = {
  id: "tarot-work", title: "فال شغل و کار", emoji: "🧭", category: "موضوع", categorySlug: "topics",
  tagline: "چهار جایگاه برای مرور توانایی‌ها، مانع‌ها و گام بعدی در کار.",
  blurb: "برای روشن کردن اولویت‌ها و فکر کردن به انتخاب‌ها و مسیر پیشرفت شغلی.",
};

const page = makeTarotPage(meta, {
  deck: "full", positions: [
    { label: "وضعیت کاری", hint: "شرایطی که اکنون بیشترین اثر را بر کار تو دارد." },
    { label: "توانایی و منبع", hint: "مهارت یا پشتیبانی‌ای که می‌توانی به آن تکیه کنی." },
    { label: "چالش", hint: "مانعی که با برنامه‌ریزی می‌توانی بهتر مدیریت کنی." },
    { label: "گام بعدی", hint: "اقدامی واقع‌بینانه برای حرکت رو به جلو." },
  ],
  focusLabel: "به یک پرسش کاری مشخص فکر کن و چهار کارت بکش.",
});

export default { meta, page };
