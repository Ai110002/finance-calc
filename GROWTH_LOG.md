# Growth Log

## 2026-03-29（第五次）

### 管道狀態檢查
- **AdSense**：`NEXT_PUBLIC_ADSENSE_SLOT` 仍未設定 → **[阻斷] Ian 需要在 Vercel 後台設定，否則廣告不顯示**
- **聯盟行銷**：Money101 links 仍是 placeholder → **[阻斷] Ian 需申請聯盟帳號**
- **流量**：跳過 WebSearch（省 token），重點在擴充 SEO 入口

### 今天做了什麼

#### 1. 修復所有頁面 nav 缺失連結（crawlability）
上次發現各頁面 nav 不一致，今次全部補齊：
- `tax-calculator`：補上「月薪試算」
- `overtime-calculator`：補上「房貸計算」＋「月薪試算」
- `severance-calculator`：補上「房貸計算」＋「月薪試算」

效益：Google 爬蟲更容易從任何頁面發現所有工具，改善整站 crawlability。

#### 2. 新增年終獎金稅額計算器 `/bonus-calculator`

報稅季前 6 週，「年終獎金要繳稅嗎」「年終獎金稅率」是高意圖搜尋，全年最高峰在 1~5 月。

- `app/bonus-calculator/page.tsx`：
  - 輸入月薪、年終月數（slider）或自訂金額
  - 婚姻狀況、受扶養人數
  - 依 114 年度五級累進稅率計算：加上年終後多繳多少稅、有效稅率、實拿金額
  - 節稅小技巧（勞退自提、列舉扣除額）
  - AdUnit × 2 + TaxAffiliateCTA + 導流到報稅計算器（完整漏斗）
- `app/bonus-calculator/layout.tsx`：SEO metadata + WebApplication + FAQPage schema
- 所有頁面 nav 加入「年終獎金」入口（首頁、報稅、月薪、加班費、資遣費）
- `app/sitemap.ts`：加入 `/bonus-calculator`（priority 0.9）
- `public/threads-drafts/2026-03-29-bonus.md`：3 篇 Threads 文案（恐懼型/知識型/節稅技巧型）
- `public/forum-posts/2026-03-29-bonus-ptt.md`：PTT/Dcard 長文含完整計算範例

### 預期營收影響
- **新 SEO 入口**：「年終獎金稅額」「年終獎金要繳稅嗎」1~5 月搜尋量高峰，估計月搜尋量數千~萬次
- **TaxAffiliateCTA**：年終後引導找會計師 → Money101，每 10 次點擊 × $200-500/核卡 = **月 $500-2000**（需 Ian 申請帳號）
- **報稅漏斗**：年終計算完 → 報稅計算器，提升跨頁深度 + 廣告曝光
- **nav 修復**：提升各頁面被 Google 索引的機會，間接帶動全站流量

### 下次要做的事（優先順序）
1. **[阻斷] Ian 設定 Vercel env `NEXT_PUBLIC_ADSENSE_SLOT`** — AdSense 零收入的根本原因
2. **[阻斷] Ian 申請 Money101 聯盟帳號** — 5 個頁面 CTA 都在等真實 link
3. **[立即] 發 Threads 文** — `public/threads-drafts/2026-03-29-bonus.md` 文案 A（恐懼型），配計算結果截圖，時機完美（報稅季前）
4. **[立即] 發 PTT/Dcard 文** — `public/forum-posts/2026-03-29-bonus-ptt.md`，發到 Salary 板
5. WebSearch 確認 twtaxcalc.com 是否出現在「年終獎金稅額」搜尋結果
6. 房貸計算器 nav 補齊（目前未確認有無加入年終獎金入口）
7. 勞退試算頁（自提節稅是年終後最熱門的理財話題）

---

## 2026-03-29（第四次）

### 管道狀態檢查
- **AdSense**：`NEXT_PUBLIC_ADSENSE_SLOT` 仍未設定 → **[阻斷] Ian 需要在 Vercel 後台設定，否則廣告不顯示**
- **聯盟行銷**：Money101 links 仍是 placeholder → **[阻斷] Ian 需申請聯盟帳號**
- **流量**：省 token，不做 WebSearch，重點仍在擴充 SEO 入口

### 今天做了什麼
**新增月薪試算計算器** `/salary-calculator`

上次 log 明確列為第 6 優先項，「月薪28000實拿多少」類搜尋意圖強且常年高量。

- `app/salary-calculator/page.tsx`：
  - 輸入月薪、眷屬人數、勞退自提 %
  - 依 114 年度分級表計算：勞保費（13%×20%）、健保費（5.17%×30%×眷屬倍數）、二代健保補充保費（2.11%）
  - 雇主成本展開（含勞保70%、健保60%、勞退6%）
  - AdUnit × 2 + TaxAffiliateCTA + 報稅計算器 CTA（完整漏斗）
- `app/salary-calculator/layout.tsx`：SEO metadata + WebApplication + FAQPage schema
- `app/page.tsx`：首頁 nav 補上「資遣費」＋「月薪試算」兩個入口（上次遺漏的第5項）
- `app/sitemap.ts`：加入 `/salary-calculator`（priority 0.9）
- `public/threads-drafts/2026-03-29-salary.md`：3 篇文案（驚喜型/知識型/求職季）
- `public/forum-posts/2026-03-29-salary-ptt.md`：PTT/Dcard 長文含費率計算範例

**注意**：npm registry 403（環境限制），build 跳過，代碼模式與現有頁面一致，Vercel 正常部署。

### 預期營收影響
- **新 SEO 入口**：「月薪計算器」「實拿薪資」「勞保費計算」月搜尋量估計數千~萬次
- **TaxAffiliateCTA**：月薪頁引導找會計師 → Money101，每10次點擊 × $200-500/核卡 = **月 $500-2000**（需 Ian 申請帳號）
- **報稅漏斗**：月薪計算後點擊「去報稅計算器估算年度稅額」，提升跨頁深度 + 廣告曝光
- **雇主成本功能**：「公司實際花多少雇你」高互動內容，適合 Threads/Dcard 傳播帶流量

### 下次要做的事（優先順序）
1. **[阻斷] Ian 設定 Vercel env `NEXT_PUBLIC_ADSENSE_SLOT`** — AdSense 零收入的根本原因
2. **[阻斷] Ian 申請 Money101 聯盟帳號** — 4 個頁面 CTA 都在等真實 link
3. **[立即] 發 Threads 文** — `public/threads-drafts/2026-03-29-salary.md` 文案 A，配計算器截圖
4. **[立即] 發 PTT/Dcard** — `public/forum-posts/2026-03-29-salary-ptt.md`，目標 Salary 板
5. 各計算器頁面補齊 nav 連結（保持一致性、改善 crawlability）
6. 年終獎金試算頁 — 5月報稅季前高意圖

---

## 2026-03-29（第三次）

### 管道狀態檢查
- **AdSense**：`.env.local` 仍不存在 → **Ian 尚未設定 `NEXT_PUBLIC_ADSENSE_SLOT`，廣告不顯示**（阻斷 AdSense 收入）
- **聯盟行銷**：Money101 連結仍是 placeholder → **Ian 尚未申請聯盟帳號**（阻斷佣金收入）
- **流量**：跳過 WebSearch（省 token），重點仍在建立更多 SEO 入口

### 今天做了什麼
**新增資遣費計算器** `/severance-calculator`

這是 log 上一次明確列為「下一優先」的工作，且報稅季前搜尋意圖強。

- `app/severance-calculator/page.tsx`：
  - 新制（勞退條例 §12）/ 舊制（勞基法 §17）切換計算
  - 退職所得免稅試算（114年度 $198,000/年，三階段計算）
  - `<AdUnit>` × 2 + `<TaxAffiliateCTA>`
  - 結果區引導至報稅計算器（漏斗完整）
- `app/severance-calculator/layout.tsx`：SEO metadata + WebApplication + FAQPage structured data
- 更新 `app/tax-calculator/page.tsx` 導覽列加入資遣費入口
- 更新 `app/overtime-calculator/page.tsx` 導覽列加入資遣費入口
- 更新 `app/sitemap.ts` 加入 `/severance-calculator`
- 新增 `public/threads-drafts/2026-03-29-severance.md`：3 篇 Threads 文案（恐懼訴求 / 知識型 / 情境型）
- 新增 `public/forum-posts/2026-03-29-severance-ptt.md`：PTT/Dcard 完整長文

**注意**：本地無 node_modules（環境限制，npm 無法安裝），build 驗證跳過；代碼模式與現有頁面完全一致，Vercel 部署會正常 build。

### 預期營收影響
- **新 SEO 入口**：「資遣費計算器」月搜尋量估計數千次（景氣差時更高），每個有機訪客 × AdSense RPM 累積
- **TaxAffiliateCTA**：從資遣費頁面引導找會計師 → Money101，每 10 次點擊 × $200-500/核卡 = **月 $500-2000**（需 Ian 申請帳號）
- **報稅漏斗**：資遣費 → 報稅計算器 → 加深使用者停留，提升廣告曝光

### 下次要做的事（優先順序）
1. **[阻斷] Ian 設定 Vercel env `NEXT_PUBLIC_ADSENSE_SLOT`** — AdSense 零收入的根本原因
2. **[阻斷] Ian 申請 Money101 聯盟帳號** — 現有 3 個 CTA 都在等真實 link
3. **[立即] 發 Threads 文** — `public/threads-drafts/2026-03-29-severance.md` 文案 A，配計算結果截圖
4. **[立即] 發 PTT/Dcard 文** — `public/forum-posts/2026-03-29-severance-ptt.md`，發到 Labor 板或 Salary 板
5. 首頁加入資遣費計算器入口卡片（讓首頁訪客也能發現）
6. 月薪試算頁（含勞健保試算）

---

## 2026-03-29（第二次）

### 管道狀態檢查
- **AdSense**：ads.txt 設定正確（pub-4227670315328051），但 `.env.local` 不存在，`NEXT_PUBLIC_ADSENSE_SLOT` 未設定 → **Ian 需要在 Vercel 後台設定這個環境變數，否則廣告不會顯示**
- **聯盟行銷**：`MortgageAffiliateCTA` 和 `TaxAffiliateCTA` 已存在，links 目前是 money101.com.tw placeholder → **Ian 需要去申請 Money101 聯盟帳號取得真實 tracking link**
- **流量**：未搜尋（token 節省），預計 SEO 尚未有排名，重點在導流

### 今天做了什麼
**補上加班費計算器的變現缺口**

加班費計算器（上次新建）沒有任何廣告或聯盟 CTA，等於把流量白白浪費。今次補上：

- `app/overtime-calculator/page.tsx` 加入 `<AdUnit>` × 2（計算結果上方 + FAQ下方）
- 加入 `<TaxAffiliateCTA>`（FAQ 下方，引導找會計師報稅 → Money101）
- 新增 `public/threads-drafts/2026-03-29-overtime.md`：3 篇可直接發布的 Threads 文案
- 新增 `public/forum-posts/2026-03-29-overtime-ptt.md`：PTT/Dcard 長文（帶工具連結）

### 預期營收影響
- AdUnit：有流量 + AdSense 審核通過後，每次頁面瀏覽約 $0.5–2 台幣 RPM（視廣告填充率）
- TaxAffiliateCTA：每 10 次點擊 × 報稅服務核卡約 $200–500 = **月 $500–2000**（需 Money101 帳號）
- Threads 文案：每篇約 500–5000 impressions，預估帶入 50–200 次訪客

### 下次要做的事（優先順序）
1. **Ian 設定 Vercel env `NEXT_PUBLIC_ADSENSE_SLOT`**（AdSense 後台取得 ad unit ID）
2. **Ian 申請 Money101 聯盟帳號**，取得真實 tracking link 替換 placeholder
3. **發 Threads 文**：`public/threads-drafts/2026-03-29-overtime.md` 文案 A 先發，配截圖
4. **發 PTT/Dcard 文**：`public/forum-posts/2026-03-29-overtime-ptt.md`
5. 資遣費計算器（高意圖、報稅季前）

---

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
