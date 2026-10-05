// ============================================================
// 技術服務工具箱 - Service Worker
//
// 策略：
// - 頁面本體 (index.html)、CSS、JS：一律「網路優先」，能連網就一定拿最新版，
//   只有離線時才退回快取
// - 四份 PDF 手冊、App 圖示：安裝時預先下載進快取，離線也能開，
//   但平常還是先試著連網抓最新檔案，抓不到才用快取版本
//
// 重要：每次你更新這份 sw.js 或改動下面的 PRECACHE_URLS，
// 記得把 CACHE_NAME 的版本號 +1（例如 v1 → v2），
// 這樣瀏覽器才會認得「這是新版本」，觸發更新流程。
// 沒有改版本號，就算檔案內容不同，瀏覽器也可能誤判成沒變化。
// ============================================================

const CACHE_NAME = "toolbox-cache-v5";

const CORE_URLS = [
  "./",
  "./index.html",
  "./data.js",
  "./app.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
];
const PDF_URLS = [
  "./everzol-manual.pdf",
  "./everzol-erc-solution.pdf",
  "./everacid-everset-manual.pdf",
  "./everzol-continuous-dyeing-manual.pdf",
];

// 安裝階段：核心檔案必須成功；PDF 逐一下載、失敗就略過，
// 不讓單一大檔失敗拖垮整個安裝
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll(CORE_URLS);
      await Promise.all(PDF_URLS.map((u) => cache.add(u).catch(() => {})));
    })
  );
  self.skipWaiting();
});

// 啟用階段：清掉舊版本的快取，並立刻接管所有分頁
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// 攔截請求
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  if (new URL(req.url).origin !== self.location.origin) return;
  // 分段讀取（Range）請求不攔截，交給瀏覽器直接處理，
  // 否則手機的 PDF 檢視器會卡住或空白
  if (req.headers.has("range")) return;

  const isPdf = /\.pdf$/i.test(new URL(req.url).pathname);

  if (isPdf) {
    // PDF：有快取就直接秒開，沒有才連網；不在這裡等網路
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, copy));
          }
          return res;
        });
      })
    );
    return;
  }

  // 其他檔案：網路優先，但 4 秒沒回應就退回快取，避免訊號差時整頁卡住
  event.respondWith(
    new Promise((resolve) => {
      let done = false;
      const fallback = () =>
        caches.match(req).then((cached) => cached || Response.error());
      const timer = setTimeout(() => {
        if (done) return;
        fallback().then((r) => { if (!done) { done = true; resolve(r); } });
      }, 4000);
      fetch(req).then((res) => {
        clearTimeout(timer);
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy));
        }
        if (!done) { done = true; resolve(res); }
      }).catch(() => {
        clearTimeout(timer);
        fallback().then((r) => { if (!done) { done = true; resolve(r); } });
      });
    })
  );
});
