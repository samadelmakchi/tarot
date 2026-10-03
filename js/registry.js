/* ============================================================
   ثبت‌نام همهٔ فال‌ها — هر فال یک فایل مستقل در js/faals
   برای افزودن فال جدید: یک فایل در js/faals بسازید و اینجا import کنید.
   ============================================================ */
import { el } from "./lib/util.js";
import { coverImage } from "./lib/fal-content.js";
import tarotOne from "./faals/tarot-one-card.js";
import tarotThree from "./faals/tarot-three-card.js";
import tarotFour from "./faals/tarot-four-card.js";
import tarotSix from "./faals/tarot-six-card.js";
import tarotNine from "./faals/tarot-nine-card.js";
import tarotTen from "./faals/tarot-ten-card.js";
import tarotMajorYesno from "./faals/tarot-major-yesno.js";
import tarotMajorArcana from "./faals/tarot-major-arcana.js";
import tarotMinorArcana from "./faals/tarot-minor-arcana.js";
import tarotFullDeck from "./faals/tarot-full-deck.js";
import tarotSeven from "./faals/tarot-seven-card.js";
import tarotLove from "./faals/tarot-love.js";
import tarotWork from "./faals/tarot-work.js";
import tarotMoney from "./faals/tarot-money.js";
import tarotHealth from "./faals/tarot-health.js";
import tarotSpiritual from "./faals/tarot-spiritual.js";

const MODULES = [
  tarotMajorArcana, tarotMinorArcana, tarotFullDeck,
  tarotOne, tarotThree, tarotFour, tarotSix, tarotSeven, tarotNine, tarotTen,
  tarotLove, tarotWork, tarotMoney, tarotHealth, tarotSpiritual, tarotMajorYesno,
];

export const FALS = MODULES.map((m) => m.meta);

export { coverImage } from "./lib/fal-content.js";

/** گروه‌بندی فال‌ها در خانه و صفحهٔ دسته‌ها */
export const CATEGORIES = [
  { slug: "deck-types", title: "بر اساس دستهٔ کارت", items: [tarotMajorArcana, tarotMinorArcana, tarotFullDeck].map((m) => m.meta) },
  { slug: "spreads", title: "بر اساس تعداد کارت", items: [tarotOne, tarotThree, tarotFour, tarotSix, tarotSeven, tarotNine, tarotTen].map((m) => m.meta) },
  { slug: "topics", title: "بر اساس موضوع", items: [tarotLove, tarotWork, tarotMoney, tarotHealth, tarotSpiritual].map((m) => m.meta) },
  { slug: "special", title: "فال ویژه", items: [tarotMajorYesno.meta] },
];

export function findFal(id) {
  return FALS.find((f) => f.id === id) || null;
}

/** ساخت یک کارت از فال برای صفحهٔ اصلی */
export function falCard(f) {
  return el("button", {
    class: "faal-card",
    "data-id": f.id,
    onclick: () => { location.hash = `#/fal/${f.id}`; window.scrollTo({ top: 0 }); },
  },
    el("span", { class: "faal-cover" },
      el("img", { src: coverImage(f), alt: "", loading: "lazy", width: "180", height: "236" }),
      el("span", { class: "faal-emoji", text: f.emoji }),
    ),
    el("span", { class: "faal-copy" },
      el("span", { class: "ttl", text: f.title }),
      el("span", { class: "dsc", text: f.blurb }),
      el("span", { class: "go", text: "شروع فال ←" }),
    ),
  );
}

/** یک بخش دسته‌بندی با شبکهٔ کارت‌ها */
export function categorySection(cat, showTitle = true) {
  const sec = el("div", { class: "section-block" });
  const grid = el("div", { class: "faal-grid" });
  cat.items.forEach((f) => grid.append(falCard(f)));
  if (showTitle) sec.append(el("h2", { class: "section-title", text: cat.title }));
  sec.append(grid);
  return sec;
}
