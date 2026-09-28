import { makeTarotPage } from "../lib/reading-page.js";

const meta = {
  id: "tarot-spiritual", title: "فال رشد روحی", emoji: "✨", category: "موضوع", categorySlug: "topics",
  tagline: "سه کارت از آرکانای بزرگ برای مرور درس زندگی و مسیر درونی.",
  blurb: "چیدمانی تأملی با تمرکز بر رشد شخصی، آگاهی و گام درونی بعدی.",
};

const page = makeTarotPage(meta, {
  deck: "major", positions: [
    { label: "درس این دوره", hint: "چه موضوعی از تجربه‌های کنونی‌ات می‌توانی بیاموزی؟" },
    { label: "کار درونی", hint: "کدام نگرش یا عادت درونی سزاوار توجه است؟" },
    { label: "گام رشد", hint: "چه انتخابی می‌تواند به رشد و آگاهی بیشتر کمک کند؟" },
  ],
  focusLabel: "با نیت شناخت بهتر خودت، سه کارت از آرکانای بزرگ بکش.",
});

export default { meta, page };
