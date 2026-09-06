/* ============================================================
   ثبت‌نام همهٔ فال‌ها — هر فال یک فایل مستقل در js/faals
   برای افزودن فال جدید: یک فایل در js/faals بسازید و اینجا import کنید.
   ============================================================ */
import { el } from "./lib/util.js";
import hafez from "./faals/hafez.js";
import daily from "./faals/daily.js";
import tarotOne from "./faals/tarot-one-card.js";
import tarotThree from "./faals/tarot-three-card.js";
import tarotFour from "./faals/tarot-four-card.js";
import tarotSix from "./faals/tarot-six-card.js";
import tarotNine from "./faals/tarot-nine-card.js";
import tarotTen from "./faals/tarot-ten-card.js";
import tarotMajorYesno from "./faals/tarot-major-yesno.js";
import playingCards from "./faals/playing-cards.js";
import oracle from "./faals/oracle.js";
import runes from "./faals/runes.js";
import numerology from "./faals/numerology.js";
import abjad from "./faals/abjad.js";
import dice from "./faals/dice.js";
import coin from "./faals/coin.js";
import chickpea from "./faals/chickpea.js";
import oracleYesno from "./faals/oracle-yesno.js";
import book from "./faals/book.js";
import knuckle from "./faals/knuckle.js";
import coffee from "./faals/coffee.js";
import tea from "./faals/tea.js";
import candle from "./faals/candle.js";
import eggwhite from "./faals/eggwhite.js";
import water from "./faals/water.js";
import flame from "./faals/flame.js";
import aeromancy from "./faals/aeromancy.js";
import palmistry from "./faals/palmistry.js";
import face from "./faals/face.js";
import phrenology from "./faals/phrenology.js";
import iridology from "./faals/iridology.js";
import stones from "./faals/stones.js";
import totem from "./faals/totem.js";
import zodiac from "./faals/zodiac.js";
import chinese from "./faals/chinese.js";
import vedic from "./faals/vedic.js";
import cosmogram from "./faals/cosmogram.js";
import heliobiology from "./faals/heliobiology.js";
import geomancy from "./faals/geomancy.js";
import iching from "./faals/iching.js";
import birds from "./faals/birds.js";

export const FALS = [
  hafez, daily, tarotOne, tarotThree, tarotFour, tarotSix, tarotNine, tarotTen, tarotMajorYesno,
  playingCards, oracle, runes, numerology, abjad,
  dice, coin, chickpea, oracleYesno, book, knuckle,
  coffee, tea, candle, eggwhite, water, flame, aeromancy,
  palmistry, face, phrenology, iridology, stones, totem,
  zodiac, chinese, vedic, cosmogram, heliobiology,
  geomancy, iching, birds,
].map((m) => m.meta);

const CAT_TITLES = {
  tarot: "تاروت",
  hafez: "حافظ",
  daily: "روزانه",
  cards: "کارت و ورق",
  numbers: "عدد و حرف",
  chance: "بخت و شانس",
  cup: "فنجان و تفاله",
  body: "بدن و چهره",
  astro: "ستاره و برج",
  nature: "طبیعت و عنصرها",
};

export const CATEGORIES = (() => {
  const map = new Map();
  for (const f of FALS) {
    const slug = f.categorySlug || "other";
    if (!map.has(slug)) map.set(slug, { slug, title: CAT_TITLES[slug] || f.category, emoji: null, items: [] });
    map.get(slug).items.push(f);
  }
  return [...map.values()].filter((c) => c.items.length);
})();

export const CAT_ORDER = ["daily", "hafez", "tarot", "cards", "cup", "chance", "numbers", "body", "astro", "nature"];
CATEGORIES.sort((a, b) => {
  const ia = CAT_ORDER.indexOf(a.slug);
  const ib = CAT_ORDER.indexOf(b.slug);
  return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
});

export function findFal(id) {
  return FALS.find((f) => f.id === id) || null;
}

const CAT_EMOJI = {
  daily: "☀️", hafez: "🌹", tarot: "🔮", cards: "🃏", cup: "☕",
  chance: "🎲", numbers: "🔢", body: "🖐️", astro: "⭐", nature: "🌿",
};

export function catEmoji(slug) {
  return CAT_EMOJI[slug] || "✦";
}

/** ساخت یک کارت از فال برای صفحهٔ اصلی/جستجو */
export function falCard(f) {
  return el("button", {
    class: "faal-card",
    role: "link",
    "data-id": f.id,
    onclick: () => { location.hash = `#/fal/${f.id}`; window.scrollTo({ top: 0 }); },
  },
    el("span", { class: "cat", text: f.category }),
    el("span", { class: "em", text: f.emoji }),
    el("span", { class: "ttl", text: f.title }),
    el("span", { class: "dsc", text: f.blurb }),
    el("span", { class: "go", text: "شروع فال ←" }),
  );
}

/** یک بخش دسته‌بندی با شبکهٔ کارت‌ها */
export function categorySection(cat, limit) {
  const sec = el("div", { class: "section-block" });
  const grid = el("div", { class: "faal-grid" });
  const items = limit ? cat.items.slice(0, limit) : cat.items;
  items.forEach((f) => grid.append(falCard(f)));
  if (limit && cat.items.length > limit) {
    grid.append(el("button", {
      class: "faal-card", style: "justify-content:center;align-items:center;border-style:dashed",
      onclick: () => { location.hash = `#/category/${cat.slug}`; window.scrollTo({ top: 0 }); },
    },
      el("span", { class: "ttl", text: `همهٔ ${cat.title}‌ها` }),
      el("span", { class: "dsc", text: `+${cat.items.length - limit} فال دیگر` }),
    ));
  }
  const title = el("div", { class: "section-title" },
    el("span", { text: `${catEmoji(cat.slug)} ${cat.title}` }),
    el("span", { class: "dim", style: "font-weight:400", text: ` (${cat.items.length})` }),
  );
  sec.append(title, grid);
  return sec;
}
