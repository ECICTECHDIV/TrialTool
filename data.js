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
  { url: "./everzol-continuous-dyeing-manual.pdf", label: "Everzol 冷壓染與連續染色技術手冊" },
  { url: "./everzol-erc-solution.pdf", label: "Everzol ERC Solution（永續染整解決方案）" },
  { url: "./evercion-manual.pdf", label: "Evercion 技術手冊" },
  { url: "./everdirect-manual.pdf", label: "Everdirect 技術手冊" },
  { url: "./everacid-everset-manual.pdf", label: "Everacid／Everset 技術手冊" }
];

/* ---- 產品 DM（依品牌分小類；點開時才下載，不預先快取） ---- */
const DM_GROUPS = [
  {
    title: "Everzol",
    items: [
      { url: "./everzol-black-mwf.pdf", label: "Everzol Black MWF" },
      { url: "./everzol-mx.pdf", label: "Everzol MX" },
      { url: "./everzol-ed.pdf", label: "Everzol ED" },
      { url: "./everzol-lx-lf.pdf", label: "Everzol LX & LF" },
      { url: "./everzol-fc.pdf", label: "Everzol FC" },
      { url: "./everzol-cs.pdf", label: "Everzol CS" },
      { url: "./everzol-kmno4-discharge.pdf", label: "Everzol for Potassium Permanganate Discharge" },
      { url: "./everzol-non-photochromism.pdf", label: "Everzol 無光致變色解決方案（Non-photochromism）" },
      { url: "./everzol-go-green.pdf", label: "Everzol GO GREEN" },
      { url: "./everzol-erc-solution-dm.pdf", label: "Everzol ERC Solution" },
      { url: "./everzol-emerized-fabrics.pdf", label: "Everzol for Emerized Fabrics" },
      { url: "./everzol-gas-fading.pdf", label: "Everzol Best Solution for Gas Fading" }
    ]
  },
  {
    title: "Everacid／Everset",
    items: [
      { url: "./everacid-x-bw.pdf", label: "Everacid X-BW" },
      { url: "./everacid-s.pdf", label: "Everacid S" },
      { url: "./everacid-metal-free.pdf", label: "Everacid Metal-Free Range" },
      { url: "./everset-pa.pdf", label: "Everset PA" }
    ]
  },
  {
    title: "Evertex",
    items: [
      { url: "./evertex-plf-03.pdf", label: "Evertex PLF-03" },
      { url: "./evertex-nlf-01.pdf", label: "Evertex NLF-01" },
      { url: "./evertex-wrf-01.pdf", label: "Evertex WRF-01" },
      { url: "./evertex-cfix-t.pdf", label: "Evertex CFIX-T" },
      { url: "./evertex-nfix-bpf.pdf", label: "Evertex NFIX-BPF" },
      { url: "./evertex-cf.pdf", label: "Evertex CF" }
    ]
  },
  {
    title: "其他",
    items: [
      { url: "./everclear-dyeing-solution.pdf", label: "Everclear Dyeing Solution" },
      { url: "./zdhc-roadmap-to-zero.pdf", label: "ZDHC Roadmap to Zero" }
    ]
  }
];

/* ---- 常用連結 ---- */
const COMMON_LINKS = [
  { url: "https://cse.ecic.com.tw/", label: "CSE 色彩查詢系統（需登入）", icon: "search", external: true },
  { url: "https://everlight-ccbu.com/", label: "永光色料官網", icon: "globe", external: true }
];
