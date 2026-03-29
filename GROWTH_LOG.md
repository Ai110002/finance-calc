# Growth Log

## 2026-03-29

### 今天做了什麼
**建立加班費計算器頁面** — `/overtime-calculator`

### 做了哪些事
- 新增 `app/overtime-calculator/page.tsx`：完整的加班費計算器，依勞基法 §24 計算平日（1.34x/1.67x）、休息日（4/8/12小時進位）、國定假日（2x）的加班費
- 新增 `app/overtime-calculator/layout.tsx`：SEO metadata + structured data（WebApplication + FAQPage schema）
- 新增 `app/sitemap.ts`：讓 Google 更快索引三個頁面
- 更新首頁與報稅計算器的工具切換 nav，加入加班費計算器入口（改為 scrollable pill style）

### 為什麼選這個
- 距離 5 月報稅季 6 週，加班費屬薪資所得、需計入報稅，搜尋意圖強
- 每個新頁面 = 新的 SEO 入口，直接內連報稅計算器形成漏斗
- 實作簡單、法規明確、資料正確性高

### 下次可以做
- 資遣費計算器（資遣費有特殊稅務處理，報稅季高意圖搜尋）
- 房貸計算器（常年高搜尋量，內連房貸利息扣除額）
- Threads 推廣文案（加班費計算器上線，發一篇教大家加班費怎麼算）
- 首頁 SEO meta 更新（加入加班費、計算器相關 keywords）
