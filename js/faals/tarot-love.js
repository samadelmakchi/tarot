import { makeTarotPage } from "../lib/reading-page.js";

const meta = {
  id: "tarot-love", title: "فال عشق و رابطه", emoji: "💞", category: "موضوع", categorySlug: "topics",
  tagline: "چهار جایگاه برای تأمل در احساسات، نیازها و مسیر رابطه.",
  blurb: "نگاهی نمادین به رابطه، گفت‌وگو و نیازهای عاطفی؛ نه ادعایی دربارهٔ ذهن قطعی فرد دیگر.",
};

const page = makeTarotPage(meta, {
  deck: "full", positions: [
    { label: "تو در رابطه", hint: "احساس یا نیاز تو که اکنون پررنگ است." },
    { label: "فضای رابطه", hint: "الگوی ارتباط و چیزی که میان شما جریان دارد." },
    { label: "چالش", hint: "موضوعی که شاید به گفت‌وگو یا مرزبندی روشن نیاز داشته باشد." },
    { label: "گام سازنده", hint: "کاری که می‌توانی برای ارتباط سالم‌تر انجام دهی." },
  ],
  focusLabel: "به کیفیت رابطه و آنچه خودت می‌خواهی توجه کن؛ چهار کارت بکش.",
});

export default { meta, page };
