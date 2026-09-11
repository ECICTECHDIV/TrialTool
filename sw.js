// 技術服務工具箱 — Service Worker
// 策略：網路優先（online 時一定抓最新版本），只有離線時才退回使用快取。
const CACHE_NAME = "dye-tools-hub-v3";
const CORE_ASSETS = [
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./cpb-icon-192.png"
];
// 技術手冊，安裝時就直接快取起來，不用等使用者手動點開過一次才存
const HEAVY_ASSETS = [
  "./everzol-manual.pdf",
  "./everzol-erc-solution.pdf",
  "./everacid-everset-manual.pdf",
  "./everzol-continuous-dyeing-manual.pdf"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll(CORE_ASSETS);
      await Promise.all(
        HEAVY_ASSETS.map((url) =>
          cache.add(url).catch((err) => console.warn("Pre-cache failed, will retry later:", url, err))
        )
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  let sameOrigin = false;
  try { sameOrigin = new URL(req.url).origin === self.location.origin; } catch (e) {}
  if (!sameOrigin) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req))
  );
});
