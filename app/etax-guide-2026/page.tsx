import type { Metadata } from "next";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

export const metadata: Metadata = {
  title: "eTax 電子報稅手把手教學 2026｜114年度網路申報完整攻略 - 台灣財務試算",
  description:
    "2026年（114年度）eTax 電子報稅完整教學。網路申報 vs 行動裝置申報怎麼選？健保卡登入、自動帶入薪資、選扣除額、送出申報，10分鐘報完。附常見錯誤排查。",
  keywords: [
    "eTax報稅",
    "電子報稅",
    "網路報稅2026",
    "eTax教學",
    "114年度報稅",
    "手機報稅",
    "健保卡報稅",
    "財政部報稅",
    "eTax Portal",
    "線上報稅教學",
    "報稅APP",
    "電腦報稅教學",
    "行動裝置報稅",
    "eTax怎麼用",
  ],
  openGraph: {
    title: "eTax 電子報稅手把手教學 2026｜114年度網路申報完整攻略",
    description:
      "2026年（114年度）eTax 電子報稅完整教學。網路申報 vs 行動裝置申報怎麼選？健保卡登入、自動帶入薪資、選扣除額、送出申報，10分鐘報完。附常見錯誤排查。",
    url: "https://www.twtaxcalc.com/etax-guide-2026",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/etax-guide-2026",
  },
};

const NAV_LINKS = [
  { href: "/etax-guide-2026", label: "eTax 報稅教學", active: true },
  { href: "/", label: "財務自由" },
  { href: "/tax-calculator", label: "報稅計算" },
  { href: "/tax-checklist-2026", label: "報稅懶人包" },
  { href: "/tax-mistakes-2026", label: "報稅常見錯誤" },
  { href: "/stock-tax-2026", label: "投資稅務" },
  { href: "/amt-calculator", label: "最低稅負" },
  { href: "/joint-filing", label: "夫妻合併vs分開" },
  { href: "/income-tax-guide-2026", label: "報稅完整攻略" },
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
  { href: "/retirement-planning", label: "退休規劃" },
  { href: "/basic-living-deduction", label: "免稅天花板" },
  { href: "/labor-insurance-rates", label: "勞健保費率" },
  { href: "/income-tax-brackets", label: "所得稅級距" },
  { href: "/dependent-deduction", label: "扶養節稅" },
  { href: "/freelancer-tax-guide", label: "接案報稅" },
  { href: "/side-income-tax", label: "副業所得申報" },
  { href: "/tax-strategy-2026", label: "省稅策略" },
  { href: "/expense-deduction-compare", label: "費用核實試算" },
  { href: "/supplement-premium", label: "二代健保" },
  { href: "/salary-vs-freelancer", label: "薪資vs接案" },
  { href: "/tax-filing-guide", label: "報稅攻略" },
  { href: "/dividend-tax", label: "股利申報" },
  { href: "/deduction-compare", label: "列舉vs標準" },
  { href: "/preschool-deduction", label: "幼兒學前扣除" },
  { href: "/foreign-income-tax", label: "海外所得" },
  { href: "/tax-refund", label: "退稅試算" },
  { href: "/tax-filing-steps", label: "報稅流程" },
  { href: "/tax-refund-timeline", label: "退稅時程" },
  { href: "/day-trading-tax", label: "當沖稅費" },
  { href: "/ira-vs-labor-retirement", label: "勞退vs ETF" },
  { href: "/legal-tax-savings-2026", label: "省稅10招" },
  { href: "/rental-income-tax-2026", label: "出租報稅" },
];

const FAQS = [
  {
    q: "eTax 電子報稅和紙本報稅有什麼差別？",
    a: "eTax 電子申報有三大優點：①系統自動帶入雇主申報的薪資、扶養資料，不需手動填寫；②可用「分開計稅試算」功能，讓系統自動幫你選最省方案；③退稅直接匯入銀行帳戶，比紙本快約1~2個月。建議所有人都用 eTax，唯一例外是有系統無法處理的複雜海外所得情況。",
  },
  {
    q: "eTax 報稅要如何登入？沒有自然人憑證怎麼辦？",
    a: "eTax 提供四種登入方式：①自然人憑證（IC卡，需讀卡機）；②健保卡（需讀卡機）；③行動自然人憑證（手機APP）；④健保卡免讀卡機（輸入健保卡號+手機OTP驗證）。其中「健保卡免讀卡機」最方便，只需健保卡卡號和手機，無需任何硬體設備。",
  },
  {
    q: "eTax 系統帶入的薪資金額不對怎麼辦？",
    a: "若系統帶入的薪資與扣繳憑單不符，有兩種情況：①雇主尚未完成申報 → 等雇主更正後重新登入；②系統帶入有誤 → 可手動修改金額，但需保留扣繳憑單備查。若故意漏報或少報，被查到將補稅加罰。建議先確認後再送出。",
  },
  {
    q: "eTax 報稅截止日是幾號？逾期怎麼辦？",
    a: "114年度所得（2025年收入）網路申報期間為 2026年5月1日 至 5月31日。逾期未申報將被課「滯報金」（應補稅額10%，最低1,500元）；被查到才申報則課「怠報金」（應補稅額40%，最低1,500元）。建議至少5月25日前完成，保留緩衝。",
  },
  {
    q: "eTax 申報完成後什麼時候退稅？",
    a: "如有退稅，需在 eTax 申報時填入銀行帳戶。退稅時程：①5月底前申報 + 帳號正確 → 約6月中至7月初匯入；②6月申報（補報） → 約6~9月內處理。若已過7月仍未收到，可持申報序號至國稅局查詢。第一次退稅建議用「自動存入」，比等支票快。",
  },
];

const STEPS = [
  {
    num: 1,
    title: "進入 eTax Portal",
    desc: "前往財政部電子申報繳稅服務網，選「綜合所得稅網路申報」。",
  },
  {
    num: 2,
    title: "登入",
    desc: "可用「自然人憑證」「健保卡（需讀卡機）」「行動自然人憑證（手機）」或「健保卡免讀卡機（手機OTP）」。其中「健保卡＋手機OTP」最方便。",
  },
  {
    num: 3,
    title: "系統自動帶入",
    desc: "薪資所得、利息所得、扶養親屬等已由雇主/機構申報到國稅局，系統會自動填入。仔細核對金額是否正確。",
    highlight: true,
  },
  {
    num: 4,
    title: "選擇申報方式",
    desc: "夫妻選「合併申報」或「分開計稅」（系統會幫你試算哪個省）；單身跳過。",
  },
  {
    num: 5,
    title: "選扣除額",
    desc: "標準扣除額（單身13.1萬／夫妻26.2萬）或列舉扣除額（自己填捐款、醫療、房貸利息等）。系統通常會提示哪個比較划算。",
  },
  {
    num: 6,
    title: "確認並送出",
    desc: "最後畫面顯示預估稅額（或退稅金額），確認無誤後按送出，系統給你申報完成序號。",
  },
  {
    num: 7,
    title: "設定退稅帳戶",
    desc: "如果有退稅，在「退稅資料」填入銀行帳號，約6月份匯入。",
  },
];

const CHECKLIST = [
  "健保卡（登入用）",
  "扣繳憑單（雇主會給，或在自然人憑證入口網查詢）",
  "捐款收據（若要列舉）",
  "醫療費用收據（自費、未保險給付部分）",
  "房貸利息證明（若要列舉）",
  "身心障礙手冊（若有扶養殘障親屬）",
];

const TROUBLESHOOT = [
  {
    q: "薪資金額和扣繳憑單不一樣怎麼辦？",
    a: "聯繫雇主確認是否已向國稅局更正申報，若未更正需手動修改。",
  },
  {
    q: "沒有自然人憑證怎麼辦？",
    a: "可用健保卡＋手機OTP，免讀卡機，大多數人最方便的選項。",
  },
  {
    q: "eTax 報稅截止日是幾號？",
    a: "115年5月31日（2026/5/31），逾期有滯報金。",
  },
  {
    q: "報稅後要多久才能退稅？",
    a: "6月底到7月中陸續匯入，最快6/16。",
  },
];

export default function EtaxGuide2026Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "eTax 電子報稅手把手教學 2026｜114年度網路申報完整攻略",
        description:
          "2026年（114年度）eTax 電子報稅完整教學。網路申報 vs 行動裝置申報怎麼選？健保卡登入、自動帶入薪資、選扣除額、送出申報，10分鐘報完。",
        url: "https://www.twtaxcalc.com/etax-guide-2026",
        author: { "@type": "Organization", name: "台灣財務試算" },
        publisher: { "@type": "Organization", name: "台灣財務試算" },
        datePublished: "2026-04-09",
        dateModified: "2026-04-09",
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
              114年度 eTax 電子申報教學
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              eTax 網路報稅
              <br />
              完整手把手教學
            </h1>
            <p className="mt-3 text-base text-gray-500">
              5月1日開放申報・5月31日截止・
              <span className="font-semibold text-blue-600">線上10分鐘搞定</span>
            </p>
          </div>

          {/* 三種申報方式比較 */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">三種申報方式比較</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] text-sm">
                <thead>
                  <tr className="bg-slate-100 text-left text-gray-600">
                    <th className="px-3 py-2 font-semibold">申報方式</th>
                    <th className="px-3 py-2 font-semibold">適合對象</th>
                    <th className="px-3 py-2 font-semibold">建議</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-white">
                    <td className="px-3 py-3 font-medium text-gray-800">
                      eTax Portal（電腦網頁）
                    </td>
                    <td className="px-3 py-3 text-gray-600">最彈性、支援複雜情況</td>
                    <td className="px-3 py-3">
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                        建議大多數人使用 ✅
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-3 py-3 font-medium text-gray-800">
                      行動裝置申報（手機APP）
                    </td>
                    <td className="px-3 py-3 text-gray-600">適合薪資單純族，更快更方便</td>
                    <td className="px-3 py-3">
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                        ✅
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-3 py-3 font-medium text-gray-800">紙本申報</td>
                    <td className="px-3 py-3 text-gray-600">僅適合系統無法處理的特殊情況</td>
                    <td className="px-3 py-3">
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                        ⚠️ 非必要不建議
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 電腦版 eTax Portal 申報步驟 */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-gray-900">
              電腦版 eTax Portal 申報步驟
            </h2>
            <div className="space-y-4">
              {STEPS.map((step) => (
                <div
                  key={step.num}
                  className={`flex gap-4 rounded-xl p-4 ${step.highlight ? "bg-amber-50" : "bg-slate-50"}`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${step.highlight ? "bg-amber-400 text-white" : "bg-blue-600 text-white"}`}
                  >
                    {step.num}
                  </div>
                  <div>
                    <p
                      className={`font-semibold ${step.highlight ? "text-amber-800" : "text-gray-800"}`}
                    >
                      {step.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 手機 APP 申報步驟 */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">手機 APP 申報步驟</h2>
            <div className="rounded-xl bg-blue-50 p-4">
              <ol className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="font-bold text-blue-700">1.</span>
                  下載「財政部電子申報繳稅服務」APP（iOS / Android）
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-blue-700">2.</span>
                  選「綜合所得稅申報」
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-blue-700">3.</span>
                  用「健保卡」或「行動自然人憑證」登入
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-blue-700">4.</span>
                  其他流程與電腦版相同（核對資料 → 選扣除額 → 送出）
                </li>
              </ol>
            </div>
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-800">注意</p>
              <p className="mt-1 text-sm text-gray-700">
                手機版功能與電腦版相同，但列舉扣除額輸入在手機上較繁瑣。建議有複雜情況（捐款、醫療、房貸利息等列舉項目）的人改用電腦版。
              </p>
            </div>
          </div>

          {/* 廣告 1 */}
          <div className="mb-8">
            <AdUnit />
          </div>

          {/* 報稅前必備清單 */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">報稅前必備清單</h2>
            <ul className="space-y-3">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                    ✓
                  </span>
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 常見 eTax 報稅問題（Troubleshoot） */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">常見 eTax 報稅問題</h2>
            <div className="space-y-4">
              {TROUBLESHOOT.map((item) => (
                <div key={item.q} className="rounded-xl bg-slate-50 p-4">
                  <p className="font-semibold text-gray-800">Q：{item.q}</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">A：{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 廣告 2 */}
          <div className="mb-8">
            <AdUnit />
          </div>

          {/* TaxAffiliateCTA */}
          <div className="mb-8">
            <TaxAffiliateCTA />
          </div>

          {/* 先試算再申報 CTA */}
          <div className="mb-8 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
            <h2 className="mb-2 text-lg font-bold text-gray-900">先試算再申報，確保沒多繳</h2>
            <p className="mb-4 text-sm text-gray-600">
              送出前用計算機確認一次，標準扣除額 vs 列舉扣除額到底哪個省？
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tax-calculator"
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                綜合所得稅計算機 →
              </Link>
              <Link
                href="/joint-filing"
                className="rounded-xl border border-blue-300 bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
              >
                夫妻合併 vs 分開試算 →
              </Link>
            </div>
          </div>

          {/* 廣告 3 */}
          <div className="mb-8">
            <AdUnit />
          </div>

          {/* FAQ */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">eTax 報稅常見問題</h2>
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
            本頁資訊以財政部公告114年度資料為準。申報流程說明僅供參考，實際操作以財政部eTax Portal為準。
          </p>
        </main>
      </div>
    </>
  );
}
