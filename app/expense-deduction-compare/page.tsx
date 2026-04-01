import type { Metadata } from "next";
import Link from "next/link";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

export const metadata: Metadata = {
  title:
    "費用核實 vs 必要費用率9A｜自由工作者選哪個省稅？2026 - 台灣財務試算",
  description:
    "接案族報稅關鍵決策：必要費用率（9A，20%）vs 費用核實。試算你的損益平衡點——年收多少、實際費用多少，選費用核實才划算。114年度（2026年5月申報）。",
};

const NAV_LINKS = [
  { href: "/", label: "財務自由" },
  { href: "/tax-calculator", label: "報稅計算" },
  { href: "/tax-checklist-2026", label: "報稅懶人包" },
  { href: "/tax-mistakes-2026", label: "報稅常見錯誤" },
  { href: "/stock-tax-2026", label: "投資稅務" },
  { href: "/amt-calculator", label: "最低稅負" },
  { href: "/mortgage", label: "房貸計算" },
  { href: "/mortgage-full-cost", label: "買房費用" },
  { href: "/buy-vs-rent", label: "買vs租" },
  { href: "/real-estate-tax", label: "房地合一稅" },
  { href: "/house-tax", label: "房屋稅" },
  { href: "/inheritance-tax", label: "遺產稅" },
  { href: "/gift-tax", label: "贈與稅" },
  { href: "/overtime-calculator", label: "加班費" },
  { href: "/severance-calculator", label: "資遣費" },
  { href: "/salary-calculator", label: "月薪試算" },
  { href: "/bonus-calculator", label: "年終獎金" },
  { href: "/pension-calculator", label: "退休試算" },
  { href: "/labor-retirement", label: "勞退新制" },
  { href: "/basic-living-deduction", label: "免稅天花板" },
  { href: "/labor-insurance-rates", label: "勞健保費率" },
  { href: "/income-tax-brackets", label: "所得稅級距" },
  { href: "/dependent-deduction", label: "扶養節稅" },
  { href: "/freelancer-tax-guide", label: "接案報稅" },
  { href: "/side-income-tax", label: "副業所得申報" },
  { href: "/tax-strategy-2026", label: "省稅策略" },
  {
    href: "/expense-deduction-compare",
    label: "費用核實試算",
    active: true,
  },
  { href: "/supplement-premium", label: "二代健保" },
  { href: "/salary-vs-freelancer", label: "薪資vs接案" },
  { href: "/tax-filing-guide", label: "報稅攻略" },
  { href: "/dividend-tax", label: "股利申報" },
  { href: "/stock-tax-2026", label: "股票稅務" },
  { href: "/deduction-compare", label: "列舉vs標準" },
  { href: "/preschool-deduction", label: "幼兒學前扣除" },
  { href: "/foreign-income-tax", label: "海外所得" },
  { href: "/tax-refund", label: "退稅試算" },
  { href: "/tax-filing-steps", label: "報稅流程" },
  { href: "/joint-filing", label: "夫妻合併vs分開" },
  { href: "/income-tax-guide-2026", label: "報稅完整攻略" },
];

// ── 114年度 費用率標準（財政部公告）───────────────────────────────────────
const EXPENSE_RATES = [
  {
    type: "一般接案／設計／工程／顧問",
    rate: 20,
    examples: "UI設計師、工程師、行銷顧問、文案、翻譯、程式外包",
    color: "blue",
  },
  {
    type: "稿費、版稅、樂譜、作曲、編劇",
    rate: 20,
    examples: "作家、自媒體創作、歌手詞曲、劇本",
    color: "blue",
  },
  {
    type: "演講費（每次 ≤ 5,000 元）",
    rate: 30,
    examples: "講師、顧問演講、企業培訓（單次5千以下）",
    color: "green",
  },
  {
    type: "演講費（每次 > 5,000 元）",
    rate: 20,
    examples: "講師、顧問演講、企業培訓（單次超5千）",
    color: "blue",
  },
  {
    type: "執行業務（醫師、律師、會計師等）",
    rate: "依業別公告",
    examples: "各專業業別費用率不同，請查財政部公告",
    color: "gray",
  },
];

// ── 損益平衡試算表（費用率20%）─────────────────────────────────────────────
const BREAKEVEN_20 = [
  { income: "30萬", threshold: "6萬", tax5pct: 0, note: "稅率5%" },
  { income: "50萬", threshold: "10萬", tax5pct: 0, note: "稅率5%" },
  { income: "80萬", threshold: "16萬", tax5pct: 0, note: "稅率12%" },
  { income: "100萬", threshold: "20萬", tax5pct: 0, note: "稅率12%" },
  { income: "150萬", threshold: "30萬", tax5pct: 0, note: "稅率20%" },
  { income: "200萬", threshold: "40萬", tax5pct: 0, note: "稅率20%" },
  { income: "300萬", threshold: "60萬", tax5pct: 0, note: "稅率30%" },
];

// ── 可核實費用清單 ─────────────────────────────────────────────────────────
const DEDUCTIBLE_ITEMS = [
  {
    category: "硬體設備",
    icon: "💻",
    items: [
      "電腦、筆電、平板（工作專用）",
      "攝影器材、錄音設備",
      "顯示器、鍵盤、滑鼠、週邊",
      "外接硬碟、NAS 儲存設備",
    ],
    tip: "超過8萬元的設備可按折舊年限攤提，未達8萬可一次費用化",
  },
  {
    category: "軟體與訂閱服務",
    icon: "📱",
    items: [
      "Adobe Creative Cloud",
      "Figma、Sketch、設計工具",
      "GitHub Copilot、開發工具",
      "雲端儲存（Dropbox、Google Workspace）",
      "AI 工具訂閱（ChatGPT、Midjourney 等）",
      "專案管理工具（Notion、Asana）",
    ],
    tip: "年訂費或月訂費均可申報，需保留付款紀錄",
  },
  {
    category: "辦公空間",
    icon: "🏠",
    items: [
      "辦公室租金（工作專用空間）",
      "共同工作空間（coworking space）會費",
      "家庭辦公室：按工作使用面積比例申報水電、租金",
    ],
    tip: "家庭辦公室需能區分工作與私人使用空間，比例需合理",
  },
  {
    category: "通訊費",
    icon: "📡",
    items: [
      "網路費（工作比例）",
      "手機費（工作比例）",
      "視訊會議服務（Zoom、Teams 等）",
    ],
    tip: "家庭共用的網路、電話費，按工作使用比例申報（通常50%~80%）",
  },
  {
    category: "交通費",
    icon: "🚗",
    items: [
      "前往客戶處、拍攝地點的交通費",
      "計程車、高鐵票（工作相關）",
      "停車費（工作相關）",
    ],
    tip: "通勤費不算，工作相關的拜訪客戶、出差等才可申報",
  },
  {
    category: "進修與學習",
    icon: "📚",
    items: [
      "線上課程（Udemy、Hahow、Coursera）",
      "研討會、工作坊報名費",
      "專業書籍、訂閱業界報告",
      "考取專業證照費用",
    ],
    tip: "需與現有業務性質相關，全新領域的進修較難申報",
  },
  {
    category: "業務推廣費",
    icon: "📣",
    items: [
      "作品集網站建置費、網域費",
      "名片印製費",
      "社群廣告費（Facebook、Instagram）",
      "平台手續費（Freelancer、Upwork 等）",
    ],
    tip: "直接為接案業務服務的推廣費用均可申報",
  },
];

export default function ExpenseDeductionComparePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-10 overflow-x-auto bg-white shadow-sm">
        <div className="flex gap-1 px-3 py-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                link.active
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-4 py-8">
        {/* Hero */}
        <div className="mb-8 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white shadow-lg">
          <div className="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
            114年度 · 2026年5月申報
          </div>
          <h1 className="mb-3 text-2xl font-bold leading-tight">
            費用核實 vs 必要費用率（9A）
            <br />
            自由工作者選哪個省稅？
          </h1>
          <p className="text-sm leading-relaxed text-indigo-100">
            接案族每年報稅都要做一個決定：用政府公告的費用率（最省事），
            還是把你買的設備、訂的軟體全部核實申報（可能更省稅）？
            <br className="hidden sm:block" />
            這頁幫你算清楚損益平衡點。
          </p>
        </div>

        {/* Quick Decision Box */}
        <div className="mb-8 rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-5">
          <h2 className="mb-4 text-base font-bold text-indigo-900">
            ⚡ 30秒判斷你該選哪個
          </h2>
          <div className="space-y-3 text-sm">
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="font-semibold text-gray-800">
                第一步：查你的費用率（大多數人是20%）
              </p>
              <p className="mt-1 text-gray-600">
                設計師、工程師、行銷、文案、顧問 → 20%
                <br />
                演講費每次≤5,000元 → 30%
              </p>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="font-semibold text-gray-800">
                第二步：算你的損益平衡點
              </p>
              <p className="mt-1 font-mono text-indigo-700">
                損益平衡費用 = 年收入 × 費用率%
              </p>
              <p className="mt-1 text-gray-600">
                例：年收80萬 × 20% = <strong>16萬</strong>
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 rounded-xl bg-green-100 p-4">
                <p className="font-bold text-green-800">
                  ✅ 選費用核實（更省稅）
                </p>
                <p className="mt-1 text-sm text-green-700">
                  你的實際費用單據 &gt; 損益平衡費用
                </p>
              </div>
              <div className="flex-1 rounded-xl bg-blue-100 p-4">
                <p className="font-bold text-blue-800">✅ 選必要費用率9A</p>
                <p className="mt-1 text-sm text-blue-700">
                  你的實際費用單據 ≤ 損益平衡費用
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Side-by-side comparison */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            兩種方式完整比較
          </h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="grid grid-cols-3 gap-0">
              {/* Header */}
              <div className="border-b border-r border-gray-200 bg-gray-50 p-3 text-xs font-semibold text-gray-600" />
              <div className="border-b border-r border-gray-200 bg-blue-50 p-3 text-center text-sm font-bold text-blue-800">
                必要費用率（9A）
              </div>
              <div className="border-b border-gray-200 bg-purple-50 p-3 text-center text-sm font-bold text-purple-800">
                費用核實
              </div>

              {/* Row 1 */}
              <div className="border-b border-r border-gray-100 bg-gray-50 p-3 text-xs font-medium text-gray-600">
                費用計算方式
              </div>
              <div className="border-b border-r border-gray-100 p-3 text-sm text-gray-700">
                年收入 × 固定費用率（20%或30%）
              </div>
              <div className="border-b border-gray-100 p-3 text-sm text-gray-700">
                實際費用支出（有憑證才算）
              </div>

              {/* Row 2 */}
              <div className="border-b border-r border-gray-100 bg-gray-50 p-3 text-xs font-medium text-gray-600">
                需要憑證嗎？
              </div>
              <div className="border-b border-r border-gray-100 p-3 text-sm font-semibold text-green-700">
                ❌ 完全不需要
              </div>
              <div className="border-b border-gray-100 p-3 text-sm font-semibold text-orange-700">
                ✅ 需保留發票/收據
              </div>

              {/* Row 3 */}
              <div className="border-b border-r border-gray-100 bg-gray-50 p-3 text-xs font-medium text-gray-600">
                申報難度
              </div>
              <div className="border-b border-r border-gray-100 p-3 text-sm text-green-700 font-medium">
                最簡單，直接填收入就好
              </div>
              <div className="border-b border-gray-100 p-3 text-sm text-orange-700 font-medium">
                需整理費用憑證，逐項填寫
              </div>

              {/* Row 4 */}
              <div className="border-b border-r border-gray-100 bg-gray-50 p-3 text-xs font-medium text-gray-600">
                省稅上限
              </div>
              <div className="border-b border-r border-gray-100 p-3 text-sm text-gray-700">
                固定比例，費用認列有上限
              </div>
              <div className="border-b border-gray-100 p-3 text-sm text-gray-700">
                無上限，費用愈多省愈多
              </div>

              {/* Row 5 */}
              <div className="border-b border-r border-gray-100 bg-gray-50 p-3 text-xs font-medium text-gray-600">
                被稽查風險
              </div>
              <div className="border-b border-r border-gray-100 p-3 text-sm text-green-700">
                幾乎為零
              </div>
              <div className="border-b border-gray-100 p-3 text-sm text-orange-700">
                費用大幅超過業別常態時機率較高
              </div>

              {/* Row 6 */}
              <div className="border-r border-gray-100 bg-gray-50 p-3 text-xs font-medium text-gray-600">
                適合誰
              </div>
              <div className="border-r border-gray-100 p-3 text-sm text-gray-700">
                費用少、懶得整理單據的接案族
              </div>
              <div className="p-3 text-sm text-gray-700">
                買了大量設備、有辦公室、訂閱費多的接案族
              </div>
            </div>
          </div>
        </section>

        {/* 費用率表 */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            114年度各業別必要費用率
          </h2>
          <div className="space-y-3">
            {EXPENSE_RATES.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div
                  className={`min-w-16 rounded-xl py-2 text-center text-lg font-bold ${
                    item.color === "green"
                      ? "bg-green-100 text-green-700"
                      : item.color === "blue"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {typeof item.rate === "number" ? `${item.rate}%` : item.rate}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{item.type}</p>
                  <p className="mt-0.5 text-sm text-gray-500">{item.examples}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 rounded-xl bg-amber-50 p-3 text-xs text-amber-700">
            ⚠️ 醫師、律師、建築師、技師、藥師、助產士、著作人等專業業別費用率另有規定，
            請查詢財政部公告「執行業務所得費用標準」。
          </p>
        </section>

        {/* Breakeven Table */}
        <section className="mb-8">
          <h2 className="mb-2 text-lg font-bold text-gray-900">
            損益平衡試算表（費用率20%適用）
          </h2>
          <p className="mb-4 text-sm text-gray-600">
            你的實際費用單據金額 &gt; 下表「損益平衡費用」→ 選費用核實更省稅
          </p>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-indigo-800">
                    年收入
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-indigo-800">
                    損益平衡費用
                    <br />
                    <span className="text-xs font-normal">(= 年收 × 20%)</span>
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-indigo-800">
                    超過此金額
                    <br />
                    <span className="text-xs font-normal">選費用核實省稅</span>
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-indigo-800">
                    適用稅率
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    income: "30 萬",
                    threshold: "6 萬",
                    exceed: "> 6 萬",
                    rate: "5%",
                  },
                  {
                    income: "50 萬",
                    threshold: "10 萬",
                    exceed: "> 10 萬",
                    rate: "5%",
                  },
                  {
                    income: "80 萬",
                    threshold: "16 萬",
                    exceed: "> 16 萬",
                    rate: "12%",
                  },
                  {
                    income: "100 萬",
                    threshold: "20 萬",
                    exceed: "> 20 萬",
                    rate: "12%",
                  },
                  {
                    income: "150 萬",
                    threshold: "30 萬",
                    exceed: "> 30 萬",
                    rate: "20%",
                  },
                  {
                    income: "200 萬",
                    threshold: "40 萬",
                    exceed: "> 40 萬",
                    rate: "20%",
                  },
                  {
                    income: "300 萬",
                    threshold: "60 萬",
                    exceed: "> 60 萬",
                    rate: "30%",
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {row.income}
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-indigo-700">
                      {row.threshold}
                    </td>
                    <td className="px-4 py-3 text-center font-semibold text-green-700">
                      {row.exceed}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600">
                      {row.rate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-gray-400">
            ＊ 稅率基於單身、標準扣除額申報、無扶養之概估，實際因個人情況不同。
          </p>
        </section>

        {/* Deductible Items */}
        <section className="mb-8">
          <h2 className="mb-2 text-lg font-bold text-gray-900">
            費用核實可申報項目清單
          </h2>
          <p className="mb-4 text-sm text-gray-600">
            整理這些費用的發票收據，加總後與損益平衡費用比較，超過就值得選費用核實。
          </p>
          <div className="space-y-3">
            {DEDUCTIBLE_ITEMS.map((category, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xl">{category.icon}</span>
                  <h3 className="font-bold text-gray-800">{category.category}</h3>
                </div>
                <ul className="mb-2 space-y-1">
                  {category.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-0.5 text-indigo-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
                  💡 {category.tip}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Affiliate CTA */}
        <div className="mb-8">
          <TaxAffiliateCTA />
        </div>

        {/* FAQ */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-gray-900">常見問題</h2>
          <div className="space-y-4">
            {[
              {
                q: "必要費用率（9A）和費用核實有什麼差別？",
                a: "必要費用率是政府公告的固定費用比例，一般接案族20%，演講費（≤5,000元/次）30%，不需任何憑證最省事。費用核實是以實際支出的費用申報，需保留發票收據，適合實際費用高於費用率認列金額的人。",
              },
              {
                q: "我有設備可以折舊，費用核實怎麼算？",
                a: "耐用年數超過2年、金額超過8萬的設備（如高階相機、伺服器）需按折舊年限攤提，不能一次費用化。未達8萬的設備（如筆電、顯示器）則可以直接一次性費用申報。折舊計算較複雜，建議諮詢會計師。",
              },
              {
                q: "同一年度內可以部分用費用率、部分用費用核實嗎？",
                a: "不行。同一業別必須一致選擇費用率或費用核實，不能混用。但如果你同時有「設計接案」和「演講費」兩種業別收入，兩者可以分別選擇不同方式。",
              },
              {
                q: "費用核實申報了，稅局真的會查嗎？",
                a: "稅務機關可能抽查，費用金額顯著高於業別常態時機率較高。建議將所有憑證分類保存至少5年，包括發票、刷卡紀錄、合約等。費用合理且有單據，一般不會有問題。",
              },
              {
                q: "去年選9A，今年可以換費用核實嗎？",
                a: "可以，每年獨立選擇，不受前一年限制。建議設備採購大年（剛買了電腦設備）評估費用核實，其他年份若費用少則繼續用費用率，每年算一次損益平衡點。",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <p className="font-semibold text-gray-900">Q：{faq.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Tools */}
        <section className="mb-8">
          <h2 className="mb-4 text-base font-bold text-gray-800">
            接案族常用工具
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { href: "/freelancer-tax-guide", label: "接案報稅完整指南", desc: "費用率20%說明 + 試算表" },
              { href: "/salary-vs-freelancer", label: "薪資 vs 接案比較", desc: "同收入誰繳稅少？" },
              { href: "/tax-calculator", label: "報稅計算器", desc: "計算你的綜所稅" },
              { href: "/supplement-premium", label: "二代健保試算", desc: "接案收入補充保費" },
              { href: "/deduction-compare", label: "列舉vs標準扣除", desc: "哪種扣除方式省更多" },
              { href: "/tax-mistakes-2026", label: "報稅常見錯誤", desc: "5大錯誤你中了嗎？" },
              { href: "/dependent-deduction", label: "扶養節稅試算", desc: "每人節稅最多近2萬" },
              { href: "/tax-checklist-2026", label: "報稅懶人包", desc: "申報流程 + 截止日期" },
              { href: "/income-tax-brackets", label: "所得稅率級距", desc: "114年度稅率一覽" },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
              >
                <p className="text-sm font-semibold text-indigo-700">
                  {tool.label}
                </p>
                <p className="mt-0.5 text-xs text-gray-500">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom CTA repeat */}
        <TaxAffiliateCTA />

        {/* Footer */}
        <footer className="mt-8 border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
          <p>
            資料來源：財政部114年度執行業務所得費用標準公告。
            本頁試算僅供參考，實際申報請依財政部最新公告或諮詢專業會計師。
          </p>
          <p className="mt-2">
            © 2026 twtaxcalc.com ·{" "}
            <Link href="/" className="hover:underline">
              回首頁
            </Link>
          </p>
        </footer>
      </main>
    </div>
  );
}
