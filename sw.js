/* فال‌بین — سرویس‌ورکر برای کارکرد آفلاین و نصب PWA */
const CACHE = "faalbin-v1";
const CORE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/style.css",
  "./js/app.js",
  "./js/registry.js",
  "./js/lib/util.js",
  "./js/lib/ui.js",
  "./js/lib/tarot.js",
  "./js/data/tarot-deck.js",
  "./00/android-chrome-192x192.png",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
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
        "hafez.js", "daily.js", "tarot-one-card.js", "tarot-three-card.js", "tarot-four-card.js",
        "tarot-six-card.js", "tarot-nine-card.js", "tarot-ten-card.js", "tarot-major-yesno.js",
        "playing-cards.js", "oracle.js", "runes.js", "numerology.js", "abjad.js",
        "dice.js", "coin.js", "chickpea.js", "oracle-yesno.js", "book.js", "knuckle.js",
        "coffee.js", "tea.js", "candle.js", "eggwhite.js", "water.js", "flame.js", "aeromancy.js",
        "palmistry.js", "face.js", "phrenology.js", "iridology.js", "stones.js", "totem.js",
        "zodiac.js", "chinese.js", "vedic.js", "cosmogram.js", "heliobiology.js",
        "geomancy.js", "iching.js", "birds.js",
      ];
      faals.forEach((f) => moduleUrls.push(`./js/faals/${f}`));
      await cache.addAll(moduleUrls);
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
