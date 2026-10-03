/* فال‌بین — سرویس‌ورکر برای کارکرد آفلاین و نصب PWA */
const CACHE = "faalbin-v8";
const CORE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/style.css",
  "./js/app.js",
  "./js/registry.js",
  "./js/lib/util.js",
  "./js/lib/fal-content.js",
  "./js/lib/ui.js",
  "./js/lib/tarot.js",
  "./js/lib/reading-page.js",
  "./js/data/tarot-deck.js",
  "./favicon.ico",
  "./logo.png",
];

const majorImages = [
  "00-the-fool", "01-the-magician", "02-the-high-priestess", "03-the-empress",
  "04-the-emperor", "05-the-hierophant", "06-the-lovers", "07-the-chariot",
  "08-strength", "09-the-hermit", "10-wheel-of-fortune", "11-justice",
  "12-the-hanged-man", "13-death", "14-temperance", "15-the-devil",
  "16-the-tower", "17the-star", "18-the-moon", "19-the-sun",
  "20-judgement", "21-the-world",
];
const ranks = ["ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "page", "knight", "queen", "king"];
const suits = ["wands", "cups", "swords", "pentacles"];
const cardImages = [
  ...majorImages.map((name) => `./img/${name}.jpg`),
  ...suits.flatMap((suit) => ranks.map((rank) => `./img/${rank}-of-${suit}.jpg`)),
];

/* همهٔ فایل‌های js/faals و js/* به‌صورت خودکار پیش‌کش می‌شوند */
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      await cache.addAll(CORE);
      // پیش‌کش ماژول‌های فال تا آفلاین کامل باشد
      const moduleUrls = [];
      const faals = [
        "tarot-one-card.js", "tarot-three-card.js", "tarot-four-card.js",
        "tarot-six-card.js", "tarot-nine-card.js", "tarot-ten-card.js", "tarot-major-yesno.js",
        "tarot-major-arcana.js", "tarot-minor-arcana.js", "tarot-full-deck.js",
        "tarot-seven-card.js", "tarot-love.js", "tarot-work.js", "tarot-money.js",
        "tarot-health.js", "tarot-spiritual.js",
      ];
      faals.forEach((f) => moduleUrls.push(`./js/faals/${f}`));
      await cache.addAll(moduleUrls);
      await cache.addAll(cardImages);
      self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // ناوبری: شبکه اول، در آفلاین کش
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put("./index.html", copy));
        return res;
      }).catch(() => caches.match("./index.html")),
    );
    return;
  }

  // منابع: کش اول، به‌روزرسانی در پس‌زمینه
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    }),
  );
});
