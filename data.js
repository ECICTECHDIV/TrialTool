/* ============================================================
 * data.js — 技術服務工具箱（入口頁）：工具清單 / 參考資料連結 / 常用連結
 * 這個檔案只放「資料」，不放邏輯。之後要新增/調整工具、參考手冊、
 * 常用連結，改這裡的陣列就好，不用去動 HTML 或 app.js。
 * 載入順序要排在 app.js 之前（app.js 會直接使用這裡定義的常數）。
 * ============================================================ */

/* ---- 工具清單（分類 → 工具） ---- */
const TOOL_CATEGORIES = [
  {
    title: "試染與配方工具",
    tools: [
      { name: "CPB試染工具", url: "https://ecictechdiv.github.io/CPB-Recipe-Calculator/", accent: "var(--cpb)", iconLabel: "CPB" },
      { name: "浸染試染工具", url: "https://ecictechdiv.github.io/Exhaust-Production/", accent: "var(--exhaust)", iconLabel: "Exhaust" }
    ]
  },
  {
    title: "能耗與節能計算",
    tools: [
      { name: "浸染能耗計算", url: "https://ecictechdiv.github.io/exhaust/", accent: "var(--dye-energy)", iconLabel: "Energy" },
      { name: "連續水洗能耗計算", url: "https://ecictechdiv.github.io/Continuous-Washing/", accent: "var(--wash-energy)", iconLabel: "Energy" }
    ]
  }
];

/* ---- 技術資料（PDF 手冊） ---- */
const DOC_LINKS = [
  { url: "./everzol-manual.pdf", label: "Everzol 技術手冊" },
  { url: "./everzol-erc-solution.pdf", label: "Everzol ERC Solution（永續染整解決方案）" },
  { url: "./everacid-everset-manual.pdf", label: "Everacid／Everset 技術手冊" },
  { url: "./everzol-continuous-dyeing-manual.pdf", label: "Everzol 連染技術手冊" }
];

/* ---- 常用連結 ---- */
const COMMON_LINKS = [
  { url: "https://cse.ecic.com.tw/", label: "CSE 色彩查詢系統（需登入）", icon: "search", external: true },
  { url: "https://everlight-ccbu.com/", label: "永光色料官網", icon: "globe", external: true }
];
