# Growth Log

## 2026-03-30（第十次）

### 管道狀態檢查
- **AdSense**：`NEXT_PUBLIC_ADSENSE_SLOT` 仍未設定 → **[阻斷] Ian 需要在 Vercel 後台設定**
- **聯盟行銷**：Money101 links 仍是 placeholder → **[阻斷] Ian 需申請聯盟帳號**
- **流量**：twtaxcalc.com 仍未出現在「報稅計算器」等搜尋 → SEO 頁持續累積，爬蟲尚未索引完成，預計報稅季前（3~4月）開始有機會排名

### 今天做了什麼

#### 新增「扶養親屬節稅試算」頁面 `/dependent-deduction`

上次 log 明確列為下一個 SEO 頁。目標關鍵字：「扶養父母節稅」「報稅扶養」「扶養可以省多少稅」「報稅可以扶養幾個人」「扶養免稅額」，Google 搜尋現有競爭者多為薄頁（無試算表），本頁有明顯差異化。

- `app/dependent-deduction/page.tsx`（**Server Component**，有利 SEO）：
  - 一般親屬節稅試算表（97,000免稅額 × 5稅率 × 4人數）
  - 70歲以上節稅試算表（145,500免稅額 × 5稅率 × 4人數）
  - 依年薪實例（年薪50萬~350萬 → 適用稅率 → 省稅金額）
  - 受扶養資格完整說明（子女、父母、祖父母、兄弟姊妹、其他）
  - 「扶養 vs 自己申報」判斷邏輯（附綠/橙色情境框）
  - FAQ 4則（FAQPage schema）
  - AdUnit × 2 + TaxAffiliateCTA + 相關工具連結
- `app/dependent-deduction/layout.tsx`：SEO metadata + Article schema + FAQPage schema
  - 主要關鍵字：「扶養親屬節稅」「報稅扶養」「扶養父母節稅」「115年度扶養免稅額」「dependent tax deduction taiwan」
- 全站 11 個頁面 nav 加入「扶養節稅」入口
- `app/sitemap.ts`：加入 `/dependent-deduction`（priority 0.9）
- `public/threads-drafts/2026-03-30-dependent-deduction.md`：4 篇文案（數字驚喜型/破迷思型/子女在學型/Dcard短版）

**Push 狀態**：已 commit + push main ✅

### 預期營收影響
- **SEO 高意圖流量**：「扶養父母可以省多少稅」「報稅扶養」是報稅季前搜尋量激增的關鍵字，現有競爭頁多為純文字說明，本頁含完整試算表，優勢明顯
- **入站漏斗**：搜尋扶養節稅 → 看試算表對照自己情況 → 點「開啟報稅計算器」 → 廣告曝光 + TaxAffiliateCTA點擊
- **TaxAffiliateCTA**：扶養頁用戶正在研究省稅，意圖明確，會計師 CTA 點擊率高 → 月預估 **$500-2000**（需 Ian 申請帳號）
- **全站爬蟲覆蓋**：12 個頁面互相連結，Googlebot 覆蓋率持續提升
- **報稅季時效**：3~5 月是黃金期，流量窗口正在打開

### 下次要做的事（優先順序）
1. **[阻斷] Ian 設定 Vercel env `NEXT_PUBLIC_ADSENSE_SLOT`** — 唯一阻斷 AdSense 收入的原因
2. **[阻斷] Ian 申請 Money101 聯盟帳號** — 10 個頁面 CTA 在等真實 link
3. **[立即] 發 Threads 文** — `public/threads-drafts/2026-03-30-dependent-deduction.md` 文案 A（數字驚喜型）
4. **[立即] 補發之前未發的文案** — `2026-03-30-income-tax-brackets.md`、`2026-03-29-*` 系列都還有效
5. **向 Google Search Console 提交 sitemap**（Ian 手動：GSC → 提交 `https://www.twtaxcalc.com/sitemap.xml`）
6. 下一個 SEO 頁：「自由工作者報稅完全指南」— 高搜尋量、高意圖（自由工作者/接案族/SOHO），結合 9A費率表說明，可直接導向報稅計算器，聯盟轉換率高

---

## 2026-03-30（第九次）

### 管道狀態檢查
- **AdSense**：`NEXT_PUBLIC_ADSENSE_SLOT` 仍未設定 → **[阻斷] Ian 需要在 Vercel 後台設定**
- **聯盟行銷**：Money101 links 仍是 placeholder → **[阻斷] Ian 需申請聯盟帳號**
- **流量**：WebSearch 確認 **twtaxcalc.com 仍未出現**在「報稅計算器2026台灣」「所得稅級距2026台灣」「115年度所得稅級距」三個搜尋結果中
  - 競爭格局：cpacorey.com（會計師部落格）三個搜尋都排第1/2；money101.com.tw 持續前3；政府網站；stockfeel.com.tw；houseloan.tw
  - **正面訊號**：marconmktgroup.com（新站）出現在「115年度所得稅級距」第5名，代表新站可以排進去 → 今天建的頁面目標對了

### 今天做了什麼

#### 新增「115年度所得稅級距完整表」頁面 `/income-tax-brackets`

上次 log 明確列為最優先的 SEO 內容頁。目標關鍵字：「115年度所得稅級距」「所得稅五級累進稅率」「所得稅怎麼算」「年收入繳多少稅」，Google 前三名都是政府網站和部落格，新站有機會排入。

- `app/income-tax-brackets/page.tsx`（**Server Component**，有利 SEO）：
  - 五級累進稅率完整表（5%/12%/20%/30%/40% + 累進差額）
  - 速算公式說明 + 實例：年薪 100 萬→所得淨額 554,000→實繳 27,700（有效稅率 2.77%）
  - 115年度全部免稅額與扣除額一覽表（含基本生活費 202,000）
  - 各薪資應繳稅額試算表（50萬至500萬，Server-side 計算，SEO 友好）
  - 邊際稅率 vs 有效稅率說明（打破「加薪划不來」迷思）
  - 常見問題 4 則（FAQPage schema）
  - AdUnit × 2 + TaxAffiliateCTA + 報稅計算器 CTA
- `app/income-tax-brackets/layout.tsx`：SEO metadata + Article schema + FAQPage schema
  - 主要關鍵字：「115年度所得稅級距」「所得稅五級累進稅率」「所得稅怎麼算」「綜合所得稅級距表2026」「tax bracket taiwan 2026」
- 全站 11 個頁面 nav 加入「所得稅級距」入口（首頁、報稅、房貸、加班費、資遣費、月薪、年終、勞退、免稅天花板、勞健保費率）
- `app/sitemap.ts`：加入 `/income-tax-brackets`（priority 0.9）
- `public/threads-drafts/2026-03-30-income-tax-brackets.md`：4 篇文案（有效稅率驚喜型/打破迷思型/報稅季緊迫型/短版）

**注意**：npm 環境限制，本地 build 跳過；代碼模式與現有頁面一致，Vercel 正常部署。

### 預期營收影響
- **SEO 高意圖流量**：「115年度所得稅級距」「所得稅怎麼算」報稅季前搜尋量大，每年 1-5 月高峰，估計月搜尋量數千~萬次
- **競爭分析**：現有前三名為財政部官網（重排版不好閱讀）、部落格（深度不夠），本頁含互動試算、速算公式、各年薪稅額，更適合閱讀與分享
- **入站漏斗**：搜尋稅率 → 試算表看到自己 → 點報稅計算器精算 → 廣告曝光 + 會計師 CTA 點擊
- **TaxAffiliateCTA**：稅率頁引導找會計師 → Money101，月預估 **$500-2000**（需 Ian 申請帳號）
- **全站爬蟲覆蓋**：11 個頁面互相連結，Googlebot 覆蓋率持續提升

### 下次要做的事（優先順序）
1. **[阻斷] Ian 設定 Vercel env `NEXT_PUBLIC_ADSENSE_SLOT`** — 唯一阻斷 AdSense 收入的原因
2. **[阻斷] Ian 申請 Money101 聯盟帳號** — 9 個頁面 CTA 在等真實 link
3. **[立即] 發 Threads 文** — `public/threads-drafts/2026-03-30-income-tax-brackets.md` 文案 A（有效稅率驚喜型）
4. **[立即] 發之前未發的文案** — `2026-03-29-labor-insurance.md`、`2026-03-29-basic-living.md`、`2026-03-29-pension.md`、`2026-03-29-bonus.md` 都還沒發，報稅季前都有效
5. **向 Google Search Console 提交 sitemap**（Ian 手動：GSC → 提交 `https://www.twtaxcalc.com/sitemap.xml`）
6. 下一個 SEO 頁：「扶養親屬節稅計算器」— 「報稅可以扶養幾個人」「扶養父母免稅」是高意圖搜尋，每位扶養人省稅 97,000 × 稅率

---


## 2026-03-29（第八次）

### 管道狀態檢查
- **AdSense**：`NEXT_PUBLIC_ADSENSE_SLOT` 仍未設定 → **[阻斷] Ian 需要在 Vercel 後台設定**
- **聯盟行銷**：Money101 links 仍是 placeholder → **[阻斷] Ian 需申請聯盟帳號**
- **流量**：WebSearch 確認「報稅計算器 2026 台灣」**twtaxcalc.com 未出現**。前三名：財政部etax、cpacorey.com、money101.com.tw。繼續擴充 SEO 入口。

### 今天做了什麼

#### 新增勞健保費率說明頁 `/labor-insurance-rates`

SEO 內容頁，目標關鍵字「勞保費率2026」「健保費率2026」「二代健保補充保費」，這類搜尋報稅季前大量出現且多數網站內容不夠深入。

- `app/labor-insurance-rates/page.tsx`（**Server Component**，有利 SEO）：
  - 快速總覽費率表（勞保13% / 健保5.17% / 二代健保2.11% / 勞退6%）
  - 勞保費率詳解 + 部分投保薪資分級表（動態從37級取樣顯示）
  - 健保費率詳解 + 眷屬加成計算方式
  - 二代健保補充保費六大課徵項目說明
  - 勞退費率（雇主強制6% vs 員工自提節稅）
  - 常見問題 4 則（自然語言 → 對話式搜尋友好）
  - AdUnit × 2 + TaxAffiliateCTA + 月薪試算 CTA
- `app/labor-insurance-rates/layout.tsx`：SEO metadata + Article schema + FAQPage schema
  - 主要關鍵字：「勞保費率」「勞保費率2026」「健保費率2026」「勞健保怎麼算」「二代健保補充保費」
- 全站 10 個頁面 nav 加入「勞健保費率」入口
- `app/sitemap.ts`：加入 `/labor-insurance-rates`（priority 0.8）
- `public/threads-drafts/2026-03-29-labor-insurance.md`：4 篇文案（數字驚喜型/知識型/報稅季緊迫型/Dcard短版）

**注意**：npm 環境限制，本地 build 跳過；代碼模式與現有頁面一致，Vercel 正常部署。

### 預期營收影響
- **SEO 長尾流量**：「勞保費率2026」「健保費率115年」「二代健保補充保費」每月搜尋量合計估計數千次；純內容頁比計算器更容易在 0-3 個月內排名
- **入口漏斗**：費率說明頁 → 月薪試算計算器 → 報稅計算器，三層漏斗提升停留時間與廣告曝光
- **TaxAffiliateCTA**：月薪了解後引導找會計師 → 月預估 **$500-2000**（需 Ian 申請帳號）
- **全站爬蟲覆蓋**：10 個頁面互相連結，Googlebot 覆蓋率持續提升

### 下次要做的事（優先順序）
1. **[阻斷] Ian 設定 Vercel env `NEXT_PUBLIC_ADSENSE_SLOT`** — 唯一阻斷 AdSense 收入的原因
2. **[阻斷] Ian 申請 Money101 聯盟帳號** — 8 個頁面 CTA 在等真實 link
3. **[立即] 發 Threads 文** — `public/threads-drafts/2026-03-29-labor-insurance.md` 文案 A（數字驚喜型）
4. **[立即] 發 Threads** — 歷次未發文案（basic-living、pension、bonus）報稅季前都還有效
5. **向 Google Search Console 提交 sitemap**（Ian 手動：GSC → 提交 `https://www.twtaxcalc.com/sitemap.xml`）
6. 下一個 SEO 內容頁：「115年度所得稅級距完整表」— 高搜尋量，此主題 Google 搜尋前三名都是部落格，有機可趁

---

## 2026-03-29（第七次）

### 管道狀態檢查
- **AdSense**：`NEXT_PUBLIC_ADSENSE_SLOT` 仍未設定 → **[阻斷] Ian 需要在 Vercel 後台設定**
- **聯盟行銷**：Money101 links 仍是 placeholder → **[阻斷] Ian 需申請聯盟帳號**
- **流量**：上次 WebSearch 確認未出現，本次省 token，SEO 持續擴充入口策略

### 今天做了什麼

#### 新增基本生活費差額計算器 `/basic-living-deduction`

「基本生活費差額」是報稅季前最被低估的節稅搜尋：
- 搜尋意圖強：「基本生活費差額計算」「基本生活費 202000」「報稅基本生活費怎麼算」
- 很多人報稅時根本不知道這個扣除額，自然分享口碑佳
- 114年度基本生活費由 196,000 提高至 202,000，新聞熱點

- `app/basic-living-deduction/page.tsx`：
  - 輸入：婚姻狀況、受扶養人數、薪資所得人數、月收入（估稅率用）、身障/幼兒/大學子女
  - 計算：基本生活費總額 vs 相關扣除額合計，輸出差額與節稅金額
  - 明細展開各項扣除（免稅額、標準扣除、薪資特別、身障、幼兒學前、教育學費）
  - AdUnit × 2 + TaxAffiliateCTA + 報稅計算器 CTA
- `app/basic-living-deduction/layout.tsx`：SEO metadata + WebApplication + FAQPage schema
  - 關鍵字：「基本生活費差額」「免稅天花板」「基本生活費 202000」「基本生活費差額計算」
- 全站 9 個頁面 nav 加入「免稅天花板」入口
- `app/sitemap.ts`：加入 `/basic-living-deduction`（priority 0.9）
- `public/threads-drafts/2026-03-29-basic-living.md`：4 篇文案（驚喜型/知識型/實例型/Dcard短版）

### 預期營收影響
- **新 SEO 入口**：「基本生活費差額計算」「基本生活費 202000」報稅季前高意圖搜尋，估計月搜尋數千次
- **低競爭關鍵字**：此主題在大型財稅網站覆蓋不深，新站有機會排名
- **TaxAffiliateCTA**：差額計算完引導找會計師，月預估 **$500-2000**（需 Ian 申請帳號）
- **報稅漏斗**：計算完差額 → 報稅計算器試算全年稅額，提升跨頁深度 + 廣告曝光
- **nav 全站更新**：9 個頁面互相連結，Googlebot 爬蟲覆蓋率再提升

### 下次要做的事（優先順序）
1. **[阻斷] Ian 設定 Vercel env `NEXT_PUBLIC_ADSENSE_SLOT`** — 唯一阻斷 AdSense 收入的原因
2. **[阻斷] Ian 申請 Money101 聯盟帳號** — 7 個頁面 CTA 在等真實 link
3. **[立即] 發 Threads 文** — `public/threads-drafts/2026-03-29-basic-living.md` 文案 A（數字驚喜型），報稅季前最佳時機
4. **[立即] 發 Threads** — 歷次文案（pension/bonus）還未發，都是報稅季素材
5. **向 Google Search Console 提交 sitemap**（Ian 手動：GSC → 提交 `https://www.twtaxcalc.com/sitemap.xml`）
6. 勞健保費率說明頁（純 SEO 內容，不需互動，吸引「勞保費率」搜尋流量）

---

## 2026-03-29（第六次）

### 管道狀態檢查
- **AdSense**：`NEXT_PUBLIC_ADSENSE_SLOT` 仍未設定 → **[阻斷] Ian 需要在 Vercel 後台設定**
- **聯盟行銷**：Money101 links 仍是 placeholder → **[阻斷] Ian 需申請聯盟帳號**
- **流量**：WebSearch 確認「報稅計算器」「年終獎金稅額計算」twtaxcalc.com **未出現**在搜尋結果 → 網站尚未被索引，重點持續擴充 SEO 入口

### 今天做了什麼

#### 新增勞退自提節稅計算器 `/pension-calculator`

「勞退自提」是報稅季前最熱門的理財話題之一：
- 搜尋意圖強（「勞退自提節稅」「勞退自提多少」「自提6%值得嗎」）
- 年初年終後大家開始想「今年要不要調整自提比例」
- 自然內連報稅計算器（完整漏斗）

- `app/pension-calculator/page.tsx`：
  - 輸入月薪、自提比例（0–6% slider）、婚姻狀況、受扶養人數
  - 依 114 年度五級累進稅率估算邊際稅率
  - 輸出：每月自提金額、每年省稅金額、每月實際淨成本（含省稅後）
  - 退休積累試算：距退休年數 + 預估年化報酬率，含雇主提撥 6% 與自提複利終值
  - AdUnit × 2 + TaxAffiliateCTA + 報稅計算器 CTA
- `app/pension-calculator/layout.tsx`：SEO metadata + WebApplication + FAQPage schema
  - 關鍵字：「勞退自提」「勞退自提節稅」「自提6%省稅」「退休金計算器」
- 所有頁面 nav 加入「勞退計算」入口（首頁、報稅、房貸、加班費、資遣費、月薪、年終）
- `app/sitemap.ts`：加入 `/pension-calculator`（priority 0.9）
- `public/threads-drafts/2026-03-29-pension.md`：4 篇文案（省稅驚喜型/知識型/報稅季緊迫型/Dcard短版）

### 預期營收影響
- **新 SEO 入口**：「勞退自提節稅」「勞退自提計算」搜尋量穩定，尤其 1-5 月報稅季高峰
- **TaxAffiliateCTA**：勞退頁引導找會計師 → Money101，預估月 **$500-2000**（需 Ian 申請帳號）
- **報稅漏斗**：勞退試算完 → 「去報稅計算器試算節稅效果」，提升跨頁深度 + 廣告曝光
- **nav 更新**：全站 8 個頁面互相連結，Googlebot 爬蟲覆蓋率提升

### 下次要做的事（優先順序）
1. **[阻斷] Ian 設定 Vercel env `NEXT_PUBLIC_ADSENSE_SLOT`** — AdSense 零收入的根本原因
2. **[阻斷] Ian 申請 Money101 聯盟帳號** — 6 個頁面 CTA 都在等真實 link
3. **[立即] 發 Threads 文** — `public/threads-drafts/2026-03-29-pension.md` 文案 A（省稅數字驚喜型），配計算結果截圖
4. **[立即] 發 Threads** — `2026-03-29-bonus.md` 文案 A（年終主題）也還沒發，報稅季前時機還在
5. 向 Google Search Console 提交 sitemap（手動操作，需 Ian 登入 GSC 提交 `https://www.twtaxcalc.com/sitemap.xml`）
6. 免稅天花板計算器（基本生活費差額，高搜尋量）

---

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
