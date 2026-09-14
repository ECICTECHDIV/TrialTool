/* ============================================================
 * app.js — 技術服務工具箱（入口頁）：邏輯（畫面渲染 / 收合 / PWA 註冊）
 * 這個檔案依賴 data.js 先載入（用到 TOOL_CATEGORIES、DOC_LINKS、
 * COMMON_LINKS 等常數）。
 * ============================================================ */

const ICONS = {
  doc: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z"/></svg>`
};

// 圖示框固定 56px，字太多會塞不下——依字數給不同字級，短的（CPB）維持大字好認，
// 長的（Exhaust）自動縮小到塞得下一行，不用大家將就同一個尺寸
function iconFontSize(label){
  const len = (label || "").length;
  if(len <= 3) return "1rem";
  if(len <= 4) return "0.88rem";
  if(len <= 5) return "0.8rem";
  if(len <= 6) return "0.72rem";
  return "0.62rem";
}

/* ---- 渲染工具分類清單 ---- */
function renderToolCategories(){
  const container = document.getElementById("toolCategories");
  container.innerHTML = TOOL_CATEGORIES.map(cat => `
    <div class="category-title">${cat.title}</div>
    <div class="tool-grid">
      ${cat.tools.map(t => `
        <a class="tool-tile" style="--accent:${t.accent}" href="${t.url}">
          <div class="tile-icon" style="font-size:${iconFontSize(t.iconLabel)}">${t.iconLabel}</div>
          <div class="tile-content">
            <div class="tile-name">${t.name}</div>
          </div>
        </a>
      `).join("")}
    </div>
  `).join("");
}

/* ---- 渲染文件/連結列表（技術資料、常用連結共用） ---- */
function renderLinkShelf(containerId, items){
  const container = document.getElementById(containerId);
  container.innerHTML = items.map(item => `
    <a href="${item.url}" class="doc-link"${item.external ? ' target="_blank" rel="noopener"' : ""}>
      <span class="doc-icon">${ICONS[item.icon || "doc"]}</span>
      <span class="doc-label">${item.label}</span>
    </a>
  `).join("");
}

renderToolCategories();
renderLinkShelf("docLinksShelf", DOC_LINKS);
renderLinkShelf("commonLinksShelf", COMMON_LINKS);

/* ---- 收合區塊（技術資料／常用連結） ---- */
document.querySelectorAll(".collapsible-toggle").forEach(btn=>{
  const key = btn.dataset.toggle;
  const body = document.querySelector(`.collapsible-body[data-body="${key}"]`);
  btn.addEventListener("click", ()=>{
    const willOpen = body.style.display === "none";
    body.style.display = willOpen ? "block" : "none";
    btn.classList.toggle("open", willOpen);
  });
});

/* ---- PWA：Service Worker 註冊，自動偵測新版並刷新 ---- */
if("serviceWorker" in navigator){
  window.addEventListener("load", ()=>{
    navigator.serviceWorker.register("./sw.js").then(reg=>{
      // 每次載入都主動檢查有沒有新版 sw.js／快取內容
      reg.update();
    }).catch(err=>{
      console.error("Service worker registration failed:", err);
    });
  });

  // 新的 Service Worker 一旦接管頁面，代表已經套用新版，
  // 自動刷新一次讓桌面板拿到最新內容，不用手動清快取
  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", ()=>{
    if(refreshing) return;
    refreshing = true;
    window.location.reload();
  });
}
