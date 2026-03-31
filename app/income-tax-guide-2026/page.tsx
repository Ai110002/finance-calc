import type { Metadata } from "next";
import Link from "next/link";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

export const metadata: Metadata = {
  title: "2026綜合所得稅完整試算教學｜114年度報稅懶人包 - 台灣財務試算",
  description:
    "114年度（2025年）綜合所得稅完整申報教學。稅率級距、免稅額、扣除額速查，附上班族/自由工作者/雙薪家庭三種試算範例。5月截止前30秒找出你的稅額。",
  keywords: [
    "綜合所得稅",
    "綜合所得稅計算",
    "報稅",
    "所得稅計算",
    "2026報稅",
    "114年度報稅",
    "所得稅試算",
    "個人所得稅",
    "報稅教學",
    "報稅怎麼算",
    "綜合所得稅公式",
    "個人綜合所得稅",
    "報稅懶人包2026",
    "114年所得稅",
  ],
  openGraph: {
    title: "2026綜合所得稅完整試算教學｜114年度報稅懶人包",
    description:
      "114年度綜合所得稅：稅率5%~40%，免稅額9.2萬，標準扣除額13.1萬。附上班族/接案族/雙薪家庭三種試算範例，5月截止前30秒算完。",
    url: "https://www.twtaxcalc.com/income-tax-guide-2026",
  },
};

const NAV_LINKS = [
  { href: "/", label: "財務自由" },
  { href: "/tax-calculator", label: "報稅計算" },
  { href: "/tax-checklist-2026", label: "報稅懶人包" },
  { href: "/tax-mistakes-2026", label: "報稅常見錯誤" },
  { href: "/stock-tax-2026", label: "投資稅務" },
  { href: "/amt-calculator", label: "最低稅負" },
  { href: "/joint-filing", label: "夫妻合併vs分開" },
  { href: "/income-tax-guide-2026", label: "報稅完整攻略", active: true },
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
  { href: "/expense-deduction-compare", label: "費用核實試算" },
  { href: "/supplement-premium", label: "二代健保" },
  { href: "/salary-vs-freelancer", label: "薪資vs接案" },
  { href: "/tax-filing-guide", label: "報稅攻略" },
  { href: "/dividend-tax", label: "股利申報" },
  { href: "/deduction-compare", label: "列舉vs標準" },
  { href: "/preschool-deduction", label: "幼兒學前扣除" },
  { href: "/foreign-income-tax", label: "海外所得" },
  { href: "/tax-refund", label: "退稅試算" },
];

const FAQS = [
  {
    q: "綜合所得稅怎麼計算？公式是什麼？",
    a: "公式：【應繳稅額 = （綜合所得總額 − 免稅額 − 扣除額）× 適用稅率 − 累進差額】。①先加總全年所有收入（薪資＋利息＋租賃＋股利等）得到「綜合所得總額」；②扣掉每人9.2萬免稅額；③扣掉標準扣除額（單身13.1萬或夫妻26.2萬）或列舉扣除額，再扣薪資特別扣除額（最高20.7萬）等；④剩下的「綜合所得淨額」查稅率表算稅額。全部免費用本站計算機一鍵算出。",
  },
  {
    q: "114年度稅率級距是多少？",
    a: "114年度綜合所得稅共5個級距：0~59萬課5%（累進差額0）、59萬~133萬課12%（累進差額41,300）、133萬~266萬課20%（累進差額147,700）、266萬~498萬課30%（累進差額413,700）、498萬以上課40%（累進差額911,700）。應用：所得淨額若為100萬，稅額 = 100萬×12% − 41,300 = 78,700元。",
  },
  {
    q: "5月報稅截止日是幾號？錯過怎麼辦？",
    a: "114年度所得（2025年收入）申報截止日為115年（2026年）5月31日（如遇假日順延）。錯過將被稽查補稅，並加課滯報金及怠報金。若是補報（自己主動補申報），滯報金按應補稅額10%計算，最低1,500元；若被查到才補，怠報金按40%計算。建議在5月初前完成申報。",
  },
  {
    q: "哪些所得要合併申報？哪些可以分開？",
    a: "台灣居民的全球所得原則上都要申報：薪資所得（含兼職）、執行業務所得（接案/自由工作）、利息所得、租賃所得、股利所得、財產交易所得（賣房等）。海外所得超過100萬需計入基本所得額（最低稅負制）。各類所得的計算方式不同：薪資有207,000元特別扣除額；股利可選擇合計或分開計稅（28%單一稅率）；接案收入按執行業務所得計算，有費用標準扣除比例。",
  },
  {
    q: "網路申報和紙本申報哪個比較好？",
    a: "強烈建議網路申報（eTax Portal）：①系統自動帶入雇主申報的薪資、扶養親屬等資料，不用手填；②可以用手機/平板申報；③自動計算稅額，還有試算比較功能讓你選最省的申報方式；④退稅直接匯入帳戶，比紙本快。唯一需要紙本的情況：有系統無法處理的特殊情況（如境外所得複雜、需附大量憑證）。",
  },
];

export default function IncomeTaxGuide2026Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "2026綜合所得稅完整試算教學｜114年度報稅懶人包",
        description:
          "114年度（2025年）綜合所得稅完整申報教學。稅率級距、免稅額、扣除額速查，附上班族/自由工作者/雙薪家庭三種試算範例。",
        url: "https://www.twtaxcalc.com/income-tax-guide-2026",
        author: { "@type": "Organization", name: "台灣財務試算" },
        publisher: { "@type": "Organization", name: "台灣財務試算" },
        datePublished: "2026-03-31",
        dateModified: "2026-03-31",
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Nav */}
        <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
          <div className="mx-auto max-w-4xl px-4">
            <div className="flex gap-1 overflow-x-auto py-2 text-xs">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`shrink-0 rounded-lg px-3 py-1.5 font-medium transition ${"active" in l && l.active ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <main className="mx-auto max-w-4xl px-4 py-8">
          {/* Hero */}
          <div className="mb-8 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700">
              114年度報稅完整攻略
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              2026年綜合所得稅
              <br />
              完整試算教學
            </h1>
            <p className="mt-3 text-base text-gray-500">
              從公式到試算，一頁看懂。
              <span className="font-semibold text-blue-600">5月截止前還有30天。</span>
            </p>
          </div>

          {/* Step-by-step calculation box */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              綜合所得稅計算公式（3步驟）
            </h2>
            <div className="space-y-3">
              <div className="rounded-xl bg-amber-50 p-4">
                <p className="mb-1 font-semibold text-amber-800">第一步：加總所有收入</p>
                <p className="text-sm text-gray-700">
                  薪資＋利息＋股利＋租賃＋執行業務所得＋其他 ＝ 綜合所得總額
                </p>
              </div>
              <div className="rounded-xl bg-blue-50 p-4">
                <p className="mb-1 font-semibold text-blue-800">第二步：扣掉免稅額＋扣除額</p>
                <p className="text-sm text-gray-700">
                  免稅額（每人9.2萬）＋標準扣除額（單身13.1萬｜夫妻26.2萬）＋薪資特別扣除額（最高20.7萬）
                </p>
              </div>
              <div className="rounded-xl bg-green-50 p-4">
                <p className="mb-1 font-semibold text-green-800">第三步：查級距算稅</p>
                <p className="text-sm text-gray-700">
                  綜合所得淨額 × 稅率 − 累進差額 ＝ 應繳稅額
                </p>
              </div>
            </div>
          </div>

          {/* CTA 1 */}
          <div className="mb-8">
            <TaxAffiliateCTA />
          </div>

          {/* Key figures reference */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">114年度關鍵數字速查</h2>

            {/* Subsection A: 免稅額與扣除額 */}
            <h3 className="mb-2 text-sm font-semibold text-gray-700">免稅額與扣除額</h3>
            <div className="mb-6 overflow-x-auto">
              <table className="w-full min-w-[320px] text-sm">
                <thead>
                  <tr className="bg-slate-100 text-left text-gray-600">
                    <th className="px-3 py-2 font-semibold">項目</th>
                    <th className="px-3 py-2 font-semibold">金額</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { item: "免稅額（本人/配偶）", amount: "9.2萬/人" },
                    { item: "免稅額（70歲以上）", amount: "13.8萬/人" },
                    { item: "標準扣除額（單身）", amount: "13.1萬" },
                    { item: "標準扣除額（夫妻）", amount: "26.2萬" },
                    { item: "薪資特別扣除額", amount: "最高20.7萬/人" },
                    { item: "身心障礙特別扣除額", amount: "20.7萬/人" },
                    { item: "幼兒學前扣除額（第1胎）", amount: "15萬" },
                    { item: "幼兒學前扣除額（第2胎起）", amount: "22.5萬" },
                    { item: "教育學費特別扣除額", amount: "2.5萬/人" },
                    { item: "長期照顧特別扣除額", amount: "12萬/人" },
                    { item: "儲蓄投資特別扣除額", amount: "最高27萬" },
                  ].map((row, i) => (
                    <tr key={row.item} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-3 py-2 text-gray-700">{row.item}</td>
                      <td className="px-3 py-2 font-semibold text-blue-700">{row.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Subsection B: 稅率級距 */}
            <h3 className="mb-2 text-sm font-semibold text-gray-700">綜合所得稅稅率級距</h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[400px] text-sm">
                <thead>
                  <tr className="bg-slate-100 text-left text-gray-600">
                    <th className="px-3 py-2 font-semibold">綜合所得淨額</th>
                    <th className="px-3 py-2 font-semibold">稅率</th>
                    <th className="px-3 py-2 font-semibold">累進差額</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { bracket: "0 ~ 590,000元", rate: "5%", diff: "0元" },
                    { bracket: "590,001 ~ 1,330,000元", rate: "12%", diff: "41,300元" },
                    { bracket: "1,330,001 ~ 2,660,000元", rate: "20%", diff: "147,700元" },
                    { bracket: "2,660,001 ~ 4,980,000元", rate: "30%", diff: "413,700元" },
                    { bracket: "4,980,001元以上", rate: "40%", diff: "911,700元" },
                  ].map((row, i) => (
                    <tr key={row.bracket} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-3 py-2 text-gray-700">{row.bracket}</td>
                      <td className="px-3 py-2 font-bold text-blue-700">{row.rate}</td>
                      <td className="px-3 py-2 text-gray-700">{row.diff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Case studies */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">真實案例試算</h2>

            {/* Case A: 上班族 */}
            <div className="mb-4 rounded-xl bg-amber-50 p-4">
              <p className="mb-3 font-bold text-amber-800">上班族（年薪60萬）</p>
              <div className="space-y-1 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>薪資所得</span>
                  <span>600,000</span>
                </div>
                <div className="flex justify-between">
                  <span>免稅額 (1人)</span>
                  <span>−92,000</span>
                </div>
                <div className="flex justify-between">
                  <span>標準扣除額（單身）</span>
                  <span>−131,000</span>
                </div>
                <div className="flex justify-between">
                  <span>薪資特別扣除額</span>
                  <span>−207,000</span>
                </div>
                <div className="flex justify-between border-t border-amber-200 pt-1 font-semibold">
                  <span>綜合所得淨額</span>
                  <span>170,000</span>
                </div>
                <div className="flex justify-between">
                  <span>適用稅率</span>
                  <span>5%</span>
                </div>
                <div className="flex justify-between rounded-lg bg-amber-100 px-2 py-1 font-bold text-amber-900">
                  <span>應繳稅額</span>
                  <span>8,500元</span>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                大多數上班族全年稅額不高，重點是確認有沒有多扣繳可以退稅。
              </p>
            </div>

            {/* Case B: 雙薪家庭 */}
            <div className="mb-4 rounded-xl bg-blue-50 p-4">
              <p className="mb-3 font-bold text-blue-800">雙薪家庭（夫150萬＋妻100萬）</p>
              <p className="mb-2 text-xs text-gray-600">分開計算（各類所得分開）通常最省</p>
              <div className="mb-3 space-y-1 text-sm text-gray-700">
                <p className="font-semibold text-gray-800">夫（分開）：</p>
                <p className="text-xs">
                  1,500,000 − 92,000 − 131,000 − 207,000 = 1,070,000 → 稅額 1,070,000×12% − 41,300 = 87,100
                </p>
                <p className="font-semibold text-gray-800 mt-2">妻（分開）：</p>
                <p className="text-xs">
                  1,000,000 − 92,000 − 131,000 − 207,000 = 570,000 → 稅額 570,000×5% = 28,500
                </p>
                <div className="flex justify-between rounded-lg bg-blue-100 px-2 py-1 font-bold text-blue-900 mt-2">
                  <span>分開合計稅額</span>
                  <span>115,600元</span>
                </div>
              </div>
              <div className="mt-2 space-y-1 text-sm text-gray-700">
                <p className="font-semibold text-gray-800">若合併計算：</p>
                <p className="text-xs">
                  2,500,000 − 184,000 − 262,000 − 414,000 = 1,640,000 → 稅額 1,640,000×20% − 147,700 = 180,300
                </p>
              </div>
              <div className="mt-3 rounded-lg bg-blue-600 px-3 py-2 text-center font-bold text-white">
                分開申報省：64,700元
              </div>
            </div>

            {/* Case C: 自由工作者 */}
            <div className="rounded-xl bg-green-50 p-4">
              <p className="mb-3 font-bold text-green-800">自由工作者（年收80萬）</p>
              <div className="space-y-1 text-sm text-gray-700">
                <p>執行業務所得：依職業類別有費用扣除率（如技術服務業 30%）</p>
                <div className="flex justify-between">
                  <span>實際所得</span>
                  <span>800,000 × (1 − 30%) = 560,000</span>
                </div>
                <p className="text-xs text-gray-600">再扣免稅額9.2萬＋標準扣除額13.1萬</p>
                <div className="flex justify-between border-t border-green-200 pt-1 font-semibold">
                  <span>所得淨額</span>
                  <span>337,000</span>
                </div>
                <div className="flex justify-between">
                  <span>適用稅率</span>
                  <span>5%</span>
                </div>
                <div className="flex justify-between rounded-lg bg-green-100 px-2 py-1 font-bold text-green-900">
                  <span>應繳稅額</span>
                  <span>16,850元</span>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                注意：二代健保補充保費另計（執行業務所得超過6萬/次要扣2.11%）。
              </p>
            </div>
          </div>

          {/* All tools overview */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              35 個免費計算工具 — 全部免費
            </h2>

            {/* 報稅類 */}
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 mt-5">
              報稅類（11個）
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {[
                { href: "/tax-calculator", label: "綜合所得稅計算機" },
                { href: "/tax-checklist-2026", label: "報稅懶人包" },
                { href: "/tax-mistakes-2026", label: "報稅常見錯誤" },
                { href: "/tax-filing-guide", label: "報稅攻略" },
                { href: "/deduction-compare", label: "列舉vs標準扣除" },
                { href: "/dependent-deduction", label: "扶養節稅試算" },
                { href: "/basic-living-deduction", label: "免稅天花板" },
                { href: "/preschool-deduction", label: "幼兒學前扣除" },
                { href: "/joint-filing", label: "夫妻合併vs分開" },
                { href: "/tax-refund", label: "退稅試算" },
                { href: "/expense-deduction-compare", label: "費用核實試算" },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="rounded-xl border border-gray-200 bg-white p-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-700 transition"
                >
                  {tool.label}
                </Link>
              ))}
            </div>

            {/* 投資與特殊稅務 */}
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 mt-5">
              投資與特殊稅務（4個）
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {[
                { href: "/dividend-tax", label: "股利所得申報" },
                { href: "/stock-tax-2026", label: "美股/台股稅務" },
                { href: "/amt-calculator", label: "最低稅負制AMT" },
                { href: "/foreign-income-tax", label: "海外所得申報" },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="rounded-xl border border-gray-200 bg-white p-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-700 transition"
                >
                  {tool.label}
                </Link>
              ))}
            </div>

            {/* 薪資與勞工 */}
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 mt-5">
              薪資與勞工（7個）
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {[
                { href: "/salary-calculator", label: "月薪試算" },
                { href: "/bonus-calculator", label: "年終獎金計算" },
                { href: "/overtime-calculator", label: "加班費試算" },
                { href: "/severance-calculator", label: "資遣費試算" },
                { href: "/supplement-premium", label: "二代健保補充保費" },
                { href: "/labor-insurance-rates", label: "勞健保費率表" },
                { href: "/income-tax-brackets", label: "所得稅級距表" },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="rounded-xl border border-gray-200 bg-white p-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-700 transition"
                >
                  {tool.label}
                </Link>
              ))}
            </div>

            {/* 接案與自雇 */}
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 mt-5">
              接案與自雇（3個）
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {[
                { href: "/freelancer-tax-guide", label: "接案報稅指南" },
                { href: "/salary-vs-freelancer", label: "薪資vs接案比較" },
                { href: "/expense-deduction-compare", label: "費用核實試算" },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="rounded-xl border border-gray-200 bg-white p-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-700 transition"
                >
                  {tool.label}
                </Link>
              ))}
            </div>

            {/* 退休規劃 */}
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 mt-5">
              退休規劃（2個）
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {[
                { href: "/pension-calculator", label: "退休金試算" },
                { href: "/labor-retirement", label: "勞退新制試算" },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="rounded-xl border border-gray-200 bg-white p-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-700 transition"
                >
                  {tool.label}
                </Link>
              ))}
            </div>

            {/* 房產 */}
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 mt-5">
              房產（5個）
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {[
                { href: "/mortgage", label: "房貸計算機" },
                { href: "/mortgage-full-cost", label: "買房完整費用" },
                { href: "/buy-vs-rent", label: "買vs租比較" },
                { href: "/real-estate-tax", label: "房地合一稅試算" },
                { href: "/house-tax", label: "房屋稅試算" },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="rounded-xl border border-gray-200 bg-white p-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-700 transition"
                >
                  {tool.label}
                </Link>
              ))}
            </div>

            {/* 財產規劃 */}
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 mt-5">
              財產規劃（2個）
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {[
                { href: "/inheritance-tax", label: "遺產稅試算" },
                { href: "/gift-tax", label: "贈與稅試算" },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="rounded-xl border border-gray-200 bg-white p-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-700 transition"
                >
                  {tool.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA 2 */}
          <div className="mb-8">
            <TaxAffiliateCTA />
          </div>

          {/* FAQ */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">報稅常見問題</h2>
            <div className="space-y-3">
              {FAQS.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-medium text-gray-800">
                    {faq.q}
                    <span className="ml-2 shrink-0 text-gray-400 transition group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <p className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-600">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* Footer disclaimer */}
          <p className="text-center text-xs text-gray-400">
            本頁稅務數字以財政部公告114年度資料為準。試算結果僅供參考，實際申報以財政部eTax Portal為準。
          </p>
        </main>
      </div>
    </>
  );
}
