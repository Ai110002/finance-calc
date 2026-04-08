import type { Metadata } from "next";
import Link from "next/link";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

export const metadata: Metadata = {
  title: "台股當沖稅費計算器 2026｜當沖稅率0.15%、手續費、損益平衡點完整說明",
  description:
    "2026年台股當沖（當日沖銷）稅費說明：證券交易稅0.15%優惠稅率延長至2027年底、手續費折扣試算、損益平衡點計算。資本利得免稅、補充保費不適用。完整費用結構與各股價區間試算表。",
  keywords: [
    "當沖稅",
    "當沖手續費",
    "當沖稅率",
    "當沖損益平衡",
    "台股當沖",
    "當沖費用計算",
    "證券交易稅",
    "當沖幾%",
    "當沖breakeven",
    "當沖0.15%",
    "股票當沖費用",
    "當沖成本",
    "當沖幾跳",
    "114年度當沖",
    "2026當沖稅費",
    "當沖資本利得",
    "當沖補充保費",
  ],
  openGraph: {
    title: "台股當沖稅費計算 2026｜0.15%交易稅＋手續費損益平衡點",
    description:
      "當沖稅率0.15%（優惠至2027底）、手續費最低1折、資本利得免稅、補充保費不適用。含各股價區間費用試算表與損益平衡跳數分析。",
    url: "https://www.twtaxcalc.com/day-trading-tax",
  },
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
  { href: "/joint-filing", label: "夫妻合併vs分開" },
  { href: "/income-tax-guide-2026", label: "報稅完整攻略" },
  { href: "/tax-filing-steps", label: "報稅流程" },
  { href: "/tax-refund-timeline", label: "退稅時程" },
  { href: "/day-trading-tax", label: "當沖稅費", active: true },
  { href: "/ira-vs-labor-retirement", label: "勞退vs ETF" },
  { href: "/legal-tax-savings-2026", label: "省稅10招" },
  { href: "/rental-income-tax-2026", label: "出租報稅" },
];

// Pre-computed scenarios: price × 1張 (1000 shares)
// Brokerage rates: 無折扣 0.1425%, 6折 0.0855%, 3折 0.04275%
// 當沖交易稅: 0.15% of sell value
// 普通交易稅: 0.3% of sell value

function getTickSize(price: number): number {
  if (price < 10) return 0.01;
  if (price < 50) return 0.05;
  if (price < 100) return 0.1;
  if (price < 500) return 0.5;
  return 1;
}

const STOCK_PRICES = [20, 50, 100, 200, 500];

const SCENARIOS = STOCK_PRICES.map((price) => {
  const shares = 1000;
  const value = price * shares;
  const brokerFull = Math.round(value * 0.001425 * 2);   // buy+sell, no discount
  const broker6 = Math.round(value * 0.000855 * 2);       // 6折
  const broker3 = Math.round(value * 0.0004275 * 2);      // 3折
  const broker1 = Math.round(value * 0.0001425 * 2);      // 1折
  const taxDayTrade = Math.round(value * 0.0015);          // 當沖 0.15%
  const taxNormal = Math.round(value * 0.003);             // 普通 0.3%
  const totalFull = brokerFull + taxDayTrade;
  const total6 = broker6 + taxDayTrade;
  const total3 = broker3 + taxDayTrade;
  const total1 = broker1 + taxDayTrade;
  const tick = getTickSize(price);
  // Breakeven ticks = ceil(totalCost / (tick * shares))
  const breakevenTicksFull = Math.ceil(totalFull / (tick * shares));
  const breakevenTicks6 = Math.ceil(total6 / (tick * shares));
  const breakevenTicks3 = Math.ceil(total3 / (tick * shares));
  return {
    price,
    value,
    brokerFull,
    broker6,
    broker3,
    broker1,
    taxDayTrade,
    taxNormal,
    totalFull,
    total6,
    total3,
    total1,
    tick,
    breakevenTicksFull,
    breakevenTicks6,
    breakevenTicks3,
  };
});

const FAQS = [
  {
    q: "當沖要繳所得稅嗎？",
    a: "不需要。台灣上市上櫃股票的資本利得（買賣價差）目前停徵所得稅，當沖的買低賣高獲利不列入綜合所得稅申報。當沖的主要費用是「證券交易稅」（賣出時扣0.15%）和「手續費」（買進賣出各一次），這兩項都不是所得稅。",
  },
  {
    q: "當沖0.15%的證券交易稅是怎麼扣的？",
    a: "證券交易稅在賣出時由券商自動扣繳，你不需要額外申報。當沖優惠稅率0.15%是賣出成交金額的0.15%（普通交易是0.3%）。例如：以20元賣出1張（1000股）= 成交金額20,000元，扣30元交易稅。此優惠延長至2027年12月31日。",
  },
  {
    q: "當沖手續費怎麼算？",
    a: "手續費每次買賣各收一次，標準費率是成交金額×0.1425%，但大多數券商提供折扣。常見折扣：6折（0.0855%）、3折（0.04275%）、1折（0.01425%，多為線上下單）。注意：手續費有最低收費門檻（通常20元），低於門檻按最低收費。當沖的費用=買進手續費＋賣出手續費＋賣出交易稅，沒有另外收取「當沖費」。",
  },
  {
    q: "當沖需要繳補充保費嗎？",
    a: "不需要。補充保費（二代健保附加保費）只對「股利所得」課徵，且單筆股利金額達20,000元以上才需繳納。股票買賣的價差（資本利得）不是股利，完全不適用補充保費。當沖的費用只有手續費和證券交易稅，沒有補充保費。",
  },
  {
    q: "當沖損益平衡點怎麼算？需要漲幾跳才不虧？",
    a: "損益平衡點 = 總費用 ÷ 持有張數 ÷ 最小升降單位（跳動點）。以100元股票1張（3折手續費）為例：手續費≈86元、交易稅150元，總費用≈236元。每跳=0.1元×1000股=100元，需要ceil(236/100)=3跳才能打平。手續費折扣越高，損益平衡點越低，這也是當沖獲利的關鍵控制點。",
  },
];

export default function DayTradingTaxPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "台股當沖稅費計算器 2026｜當沖稅率0.15%、手續費、損益平衡點完整說明",
        description:
          "2026年台股當沖費用完整說明：證券交易稅0.15%優惠（至2027底）、手續費折扣比較、損益平衡跳數試算。資本利得免稅、補充保費不適用。",
        url: "https://www.twtaxcalc.com/day-trading-tax",
        author: { "@type": "Organization", name: "台灣財務試算" },
        publisher: { "@type": "Organization", name: "台灣財務試算" },
        datePublished: "2026-04-01",
        dateModified: "2026-04-01",
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
                  key={l.href + (("active" in l && l.active) ? "-active" : "")}
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
              114年度・當沖優惠稅率0.15%延長至2027年底
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              股票當沖稅費計算器
              <br />
              <span className="text-blue-600">2026年完整費用說明</span>
            </h1>
            <p className="mt-3 text-base text-gray-500">
              當沖費用 = 手續費（買＋賣）＋ 證券交易稅（賣出0.15%）。
              <span className="font-semibold text-blue-700">資本利得免稅、補充保費不適用。</span>
            </p>
          </div>

          {/* Quick fact card */}
          <div className="mb-8 rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <h2 className="mb-3 text-base font-bold text-blue-900">當沖關鍵費用一覽</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  label: "當沖交易稅率",
                  value: "0.15%",
                  note: "賣出金額×0.15%，優惠至2027底",
                  color: "bg-blue-600",
                },
                {
                  label: "資本利得稅",
                  value: "免稅",
                  note: "上市上櫃股票停徵，不申報所得稅",
                  color: "bg-green-600",
                },
                {
                  label: "補充保費",
                  value: "不適用",
                  note: "買賣價差非股利，不需繳納",
                  color: "bg-slate-500",
                },
              ].map((item) => (
                <div key={item.label} className="rounded-xl bg-white p-4 shadow-sm">
                  <div className={`mb-2 inline-block rounded-full ${item.color} px-3 py-0.5 text-xs font-bold text-white`}>
                    {item.label}
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                  <p className="mt-1 text-xs text-gray-500">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 費用結構說明 */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">當沖費用結構說明</h2>
            <div className="space-y-4">
              <div className="rounded-xl bg-blue-50 p-4">
                <p className="font-bold text-blue-900">1. 證券交易稅（交易稅）</p>
                <p className="mt-1 text-sm text-gray-700">
                  賣出時自動扣繳，<span className="font-semibold">當沖優惠稅率 0.15%</span>（正常為0.3%），延長適用至 2027 年 12 月 31 日。
                  例：賣出 100 元 × 1,000 股 = 成交值 100,000 元，扣交易稅 150 元。
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="font-bold text-slate-900">2. 手續費（經紀費）</p>
                <p className="mt-1 text-sm text-gray-700">
                  買進和賣出各收一次，標準費率 <span className="font-semibold">0.1425%</span>。
                  多數券商提供折扣：
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[
                    { label: "無折扣", rate: "0.1425%" },
                    { label: "6折", rate: "0.0855%" },
                    { label: "3折", rate: "0.04275%" },
                    { label: "1折（線上）", rate: "0.01425%" },
                  ].map((r) => (
                    <div key={r.label} className="rounded-lg bg-white p-2 text-center shadow-sm">
                      <p className="text-xs font-semibold text-gray-500">{r.label}</p>
                      <p className="font-bold text-gray-900">{r.rate}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl bg-green-50 p-4">
                <p className="font-bold text-green-900">3. 資本利得（買賣價差）</p>
                <p className="mt-1 text-sm text-gray-700">
                  台灣上市上櫃股票資本利得目前<span className="font-semibold">停徵所得稅</span>，
                  不需申報綜合所得稅，也不適用補充保費（補充保費僅針對股利所得）。
                </p>
              </div>
            </div>
          </div>

          {/* Pre-computed scenarios table */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-xl font-bold text-gray-900">各股價區間費用試算（1張＝1,000股）</h2>
            <p className="mb-4 text-xs text-gray-500">費用單位：新台幣元。手續費含買進＋賣出兩筆，均已四捨五入至整數元。</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-xs text-gray-500">
                    <th className="pb-2 pr-4 font-semibold">股價</th>
                    <th className="pb-2 pr-4 font-semibold">交易總值</th>
                    <th className="pb-2 pr-4 font-semibold">交易稅(當沖)</th>
                    <th className="pb-2 pr-4 font-semibold">手續費無折扣</th>
                    <th className="pb-2 pr-4 font-semibold">手續費6折</th>
                    <th className="pb-2 pr-4 font-semibold">手續費3折</th>
                    <th className="pb-2 pr-4 font-semibold">總費用(無折扣)</th>
                    <th className="pb-2 pr-4 font-semibold">總費用(6折)</th>
                    <th className="pb-2 font-semibold">總費用(3折)</th>
                  </tr>
                </thead>
                <tbody>
                  {SCENARIOS.map((s) => (
                    <tr key={s.price} className="border-b border-gray-100 last:border-0">
                      <td className="py-2.5 pr-4 font-bold text-blue-700">{s.price}元</td>
                      <td className="py-2.5 pr-4 text-gray-700">{s.value.toLocaleString()}</td>
                      <td className="py-2.5 pr-4 text-gray-700">{s.taxDayTrade}</td>
                      <td className="py-2.5 pr-4 text-gray-700">{s.brokerFull}</td>
                      <td className="py-2.5 pr-4 text-gray-700">{s.broker6}</td>
                      <td className="py-2.5 pr-4 text-gray-700">{s.broker3}</td>
                      <td className="py-2.5 pr-4 font-semibold text-red-700">{s.totalFull}</td>
                      <td className="py-2.5 pr-4 font-semibold text-orange-700">{s.total6}</td>
                      <td className="py-2.5 font-semibold text-green-700">{s.total3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 損益平衡點分析 */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-xl font-bold text-gray-900">損益平衡點（需漲幾跳才不虧？）</h2>
            <p className="mb-4 text-xs text-gray-500">
              最小升降單位（跳動）：10元以下=0.01元；10-50元=0.05元；50-100元=0.1元；100-500元=0.5元；500元以上=1元。
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-xs text-gray-500">
                    <th className="pb-2 pr-4 font-semibold">股價</th>
                    <th className="pb-2 pr-4 font-semibold">最小跳動</th>
                    <th className="pb-2 pr-4 font-semibold">每跳金額(1張)</th>
                    <th className="pb-2 pr-4 font-semibold">損益平衡跳數(無折扣)</th>
                    <th className="pb-2 pr-4 font-semibold">損益平衡跳數(6折)</th>
                    <th className="pb-2 font-semibold">損益平衡跳數(3折)</th>
                  </tr>
                </thead>
                <tbody>
                  {SCENARIOS.map((s) => (
                    <tr key={s.price} className="border-b border-gray-100 last:border-0">
                      <td className="py-2.5 pr-4 font-bold text-blue-700">{s.price}元</td>
                      <td className="py-2.5 pr-4 text-gray-700">{s.tick}元</td>
                      <td className="py-2.5 pr-4 text-gray-700">{Math.round(s.tick * 1000)}元</td>
                      <td className="py-2.5 pr-4 font-semibold text-red-700">{s.breakevenTicksFull} 跳</td>
                      <td className="py-2.5 pr-4 font-semibold text-orange-700">{s.breakevenTicks6} 跳</td>
                      <td className="py-2.5 font-semibold text-green-700">{s.breakevenTicks3} 跳</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-blue-700">
              提示：手續費折扣越高（倍數越低），損益平衡跳數越少，當沖獲利空間越大。向券商申請手續費折扣是控制當沖成本的關鍵。
            </p>
          </div>

          {/* 當沖 vs 普通交易費用比較 */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-xl font-bold text-gray-900">當沖 vs 普通交易：費用比較</h2>
            <p className="mb-4 text-xs text-gray-500">手續費以無折扣（0.1425%）計算，1張（1,000股）。</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-xs text-gray-500">
                    <th className="pb-2 pr-4 font-semibold">股價</th>
                    <th className="pb-2 pr-4 font-semibold">交易稅(當沖 0.15%)</th>
                    <th className="pb-2 pr-4 font-semibold">交易稅(普通 0.3%)</th>
                    <th className="pb-2 pr-4 font-semibold">交易稅差額</th>
                    <th className="pb-2 font-semibold">節省比例</th>
                  </tr>
                </thead>
                <tbody>
                  {SCENARIOS.map((s) => (
                    <tr key={s.price} className="border-b border-gray-100 last:border-0">
                      <td className="py-2.5 pr-4 font-bold text-blue-700">{s.price}元</td>
                      <td className="py-2.5 pr-4 font-semibold text-green-700">{s.taxDayTrade}元</td>
                      <td className="py-2.5 pr-4 text-gray-700">{s.taxNormal}元</td>
                      <td className="py-2.5 pr-4 text-red-600">省{s.taxNormal - s.taxDayTrade}元</td>
                      <td className="py-2.5 font-semibold text-blue-700">省50%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              當沖優惠稅率（0.15%）是普通交易稅（0.3%）的一半，每次賣出可節省50%的交易稅。
            </p>
          </div>

          {/* Key facts */}
          <div className="mb-8 rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-blue-900">當沖稅費5大重點</h2>
            <div className="space-y-3">
              {[
                {
                  num: "01",
                  title: "當沖扣的是交易稅，不是所得稅",
                  desc: "當沖的0.15%是「證券交易稅」（賣出時扣），與綜合所得稅完全無關，不影響報稅申報。",
                },
                {
                  num: "02",
                  title: "台灣上市上櫃股票資本利得免稅",
                  desc: "買低賣高的差價（資本利得）目前停徵所得稅，不需申報綜合所得稅，當沖獲利不課個人所得稅。",
                },
                {
                  num: "03",
                  title: "當沖0.15%優惠稅率延長至2027年底",
                  desc: "證券交易稅當沖優惠（原0.3%減半為0.15%）已延長適用至2027年12月31日，2028年是否繼續待立法院審議。",
                },
                {
                  num: "04",
                  title: "補充保費不適用於買賣價差",
                  desc: "二代健保補充保費只對「股利所得」單筆達2萬元以上課徵，股票買賣的資本利得（當沖差價）完全不適用。",
                },
                {
                  num: "05",
                  title: "手續費折扣才是當沖最大成本控制點",
                  desc: "交易稅率固定，手續費折扣卻可以協商。從無折扣到1折，可大幅降低損益平衡門檻，建議與券商確認折扣方案。",
                },
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm">
                  <div className="shrink-0 rounded-full bg-blue-600 px-2.5 py-0.5 text-sm font-bold text-white">
                    {item.num}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Affiliate CTA 1 */}
          <div className="mt-8">
            <TaxAffiliateCTA />
          </div>

          {/* 相關工具 */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">相關計算工具</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { href: "/stock-tax-2026", label: "股票稅務完整指南", desc: "2026年台股投資稅務完整說明" },
                { href: "/dividend-tax", label: "股利所得申報試算", desc: "合併計稅vs分開課稅28%比較" },
                { href: "/supplement-premium", label: "二代健保試算", desc: "股利補充保費計算" },
                { href: "/amt-calculator", label: "最低稅負試算", desc: "海外所得與AMT計算" },
                { href: "/foreign-income-tax", label: "海外所得申報", desc: "海外投資所得稅務說明" },
                { href: "/tax-calculator", label: "綜合所得稅試算", desc: "2026年報稅金額估算" },
                { href: "/tax-strategy-2026", label: "省稅策略", desc: "投資人節稅5大方法" },
                { href: "/income-tax-brackets", label: "所得稅級距", desc: "2026年稅率級距一覽" },
                { href: "/tax-filing-guide", label: "報稅完整攻略", desc: "投資人報稅全指南" },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="flex flex-col rounded-xl border border-gray-200 p-4 transition hover:border-blue-400 hover:bg-blue-50"
                >
                  <p className="font-semibold text-gray-900">{tool.label}</p>
                  <p className="mt-1 text-xs text-gray-500">{tool.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Affiliate CTA 2 */}
          <div className="mt-6">
            <TaxAffiliateCTA />
          </div>

          {/* FAQ */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">當沖稅費常見問題</h2>
            <div className="space-y-4">
              {FAQS.map((f) => (
                <div key={f.q} className="rounded-xl bg-gray-50 p-4">
                  <p className="font-semibold text-gray-900">Q：{f.q}</p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <p className="mt-8 text-center text-xs text-gray-400">
            資料來源：財政部、臺灣證券交易所、金管會相關規定。當沖優惠稅率以主管機關最新公告為準，手續費折扣依各券商方案不同，本頁提供參考性說明。
          </p>
        </main>
      </div>
    </>
  );
}
