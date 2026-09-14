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

const CACHE_NAME = "toolbox-cache-v4";

const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./data.js",
  "./app.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./everzol-manual.pdf",
  "./everzol-erc-solution.pdf",
  "./everacid-everset-manual.pdf",
  "./everzol-continuous-dyeing-manual.pdf",
];

// 安裝階段：把上面列的檔案先抓下來放進快取
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  // 不等舊分頁關閉，新版 SW 馬上準備接管
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

// 攔截請求：網路優先，失敗才退回快取
self.addEventListener("fetch", (event) => {
  // 只處理 GET，且只處理自己網域內的請求
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // 拿到新的回應就順手更新快取，下次離線也是相對新的版本
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return networkResponse;
      })
      .catch(() => {
        // 離線或連線失敗時，退回快取版本
        return caches.match(event.request).then((cached) => {
          if (cached) return cached;
          // 沒快取又離線的情況（例如第一次造訪就斷線），直接讓它失敗
          throw new Error("網路離線，且此檔案沒有快取版本");
        });
      })
  );
});
