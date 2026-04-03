import type { Metadata } from "next";
import Link from "next/link";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

export const metadata: Metadata = {
  title: "勞退自提 vs 自己買ETF 2026｜節稅試算＋30年複利比較，哪個比較划算？",
  description:
    "2026年勞退自提 vs 自行投資ETF完整比較：節稅效果試算表（各月薪 × 稅率）、30年複利終值比較、勞退保本機制說明。稅率20%的人等於打8折存退休金，試算你的節稅金額。",
  keywords: [
    "勞退自提",
    "勞退自提划算嗎",
    "勞退vs ETF",
    "勞退自提節稅",
    "勞退自提計算",
    "勞退自提6%",
    "勞退還是ETF",
    "自提勞退划算",
    "退休金試算",
    "勞退報酬率",
    "勞退基金績效",
    "0050 vs 勞退",
    "勞退自提試算",
    "2026勞退自提",
  ],
  openGraph: {
    title: "勞退自提 vs ETF 2026｜節稅+報酬率完整比較",
    description:
      "稅率20%的人用打8折的錢存退休金。但30年後ETF績效是否更好？含各月薪節稅試算表、30年複利終值比較、保本機制說明。",
    url: "https://www.twtaxcalc.com/ira-vs-labor-retirement",
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
  { href: "/day-trading-tax", label: "當沖稅費" },
  { href: "/ira-vs-labor-retirement", label: "勞退vs ETF", active: true },
];

// 表1: 各月薪自提6%節稅試算
const TAX_SCENARIOS = [
  { salary: 30000,  contrib: 1800, rate: 5,  savings: 90,   cost: 1710, discount: 95 },
  { salary: 30000,  contrib: 1800, rate: 12, savings: 216,  cost: 1584, discount: 88 },
  { salary: 40000,  contrib: 2400, rate: 5,  savings: 120,  cost: 2280, discount: 95 },
  { salary: 40000,  contrib: 2400, rate: 12, savings: 288,  cost: 2112, discount: 88 },
  { salary: 40000,  contrib: 2400, rate: 20, savings: 480,  cost: 1920, discount: 80 },
  { salary: 50000,  contrib: 3000, rate: 5,  savings: 150,  cost: 2850, discount: 95 },
  { salary: 50000,  contrib: 3000, rate: 12, savings: 360,  cost: 2640, discount: 88 },
  { salary: 50000,  contrib: 3000, rate: 20, savings: 600,  cost: 2400, discount: 80 },
  { salary: 60000,  contrib: 3600, rate: 12, savings: 432,  cost: 3168, discount: 88 },
  { salary: 60000,  contrib: 3600, rate: 20, savings: 720,  cost: 2880, discount: 80 },
  { salary: 60000,  contrib: 3600, rate: 30, savings: 1080, cost: 2520, discount: 70 },
  { salary: 80000,  contrib: 4800, rate: 20, savings: 960,  cost: 3840, discount: 80 },
  { salary: 80000,  contrib: 4800, rate: 30, savings: 1440, cost: 3360, discount: 70 },
  { salary: 100000, contrib: 6000, rate: 20, savings: 1200, cost: 4800, discount: 80 },
  { salary: 100000, contrib: 6000, rate: 30, savings: 1800, cost: 4200, discount: 70 },
  { salary: 100000, contrib: 6000, rate: 40, savings: 2400, cost: 3600, discount: 60 },
];

// 表2: 30年複利終值（月投3,000元，不同年化報酬率）
const FV_SCENARIOS = [
  { rate: 3,  label: "3%",  fv: 1748040, note: "保守/定存水準" },
  { rate: 4,  label: "4%",  fv: 2082300, note: "勞退基金近10年均約4-5%" },
  { rate: 5,  label: "5%",  fv: 2496300, note: "中性估計" },
  { rate: 6,  label: "6%",  fv: 3013500, note: "穩健" },
  { rate: 7,  label: "7%",  fv: 3659100, note: "積極" },
  { rate: 8,  label: "8%",  fv: 4470900, note: "0050歷史年化約10-12%" },
  { rate: 10, label: "10%", fv: 6782400, note: "樂觀估計" },
];

const FAQS = [
  {
    q: "勞退自提真的划算嗎？",
    a: "取決於你的所得稅率。稅率12%以上的人，自提相當於以88折或更低的成本存入退休帳戶，節稅效果立即且確定。稅率5%的人節稅效果有限（每月自提3,000只省150元），此時ETF的靈活性優勢更明顯。",
  },
  {
    q: "勞退自提上限是多少？",
    a: "勞工自願提繳率最高為6%（以月提繳工資為基礎）。自提的金額不計入當年薪資所得，節稅效果等於：自提金額 × 你的邊際所得稅率。例如：月薪5萬、稅率20%，每月自提3,000元 → 每月節稅600元，一年省7,200元。",
  },
  {
    q: "勞退基金報酬率比0050差很多嗎？",
    a: "長期來看確實有差距。勞退基金近10年年化報酬率約4-5%，0050（追蹤台灣50指數）自2003年上市以來年化報酬率約10-12%。但勞退基金有「保本」機制（最低不低於2年定存利率），自行投資ETF沒有這個保障。如果遇到市場大跌，ETF帳戶可能暫時帳面虧損。",
  },
  {
    q: "勞退和ETF可以同時投資嗎？",
    a: "可以，而且這是很多人採用的「最佳策略」：先自提勞退6%享受節稅優惠（確定性報酬），再把每月省下來的稅金（例如稅率20%的人省下600元）另外投入ETF，兩者兼得。節稅部分用低風險資產（勞退）鎖定，超額報酬部分用ETF追求。",
  },
  {
    q: "勞退帳戶幾歲才能領？",
    a: "勞退新制帳戶原則上在年滿60歲後才能請領。可選擇一次領清或月領（月領方式依平均餘命計算）。這是勞退最大的限制：資金流動性差，無法提前動用（除非完全喪失工作能力等特殊情況）。這是自行投資ETF相比的最大優勢：可以隨時出場。",
  },
];

function discountColor(discount: number): string {
  if (discount <= 70) return "text-green-700 font-bold";
  if (discount <= 80) return "text-blue-700 font-semibold";
  if (discount <= 88) return "text-blue-600";
  return "text-slate-500";
}

export default function IraVsLaborRetirementPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "勞退自提 vs 自己買ETF：哪個真的比較划算？2026完整比較",
        description:
          "2026年勞退自提 vs 自行投資ETF完整比較：節稅效果試算表、30年複利終值比較、勞退保本機制說明。稅率20%的人等於打8折存退休金。",
        url: "https://www.twtaxcalc.com/ira-vs-labor-retirement",
        author: { "@type": "Organization", name: "台灣財務試算" },
        publisher: { "@type": "Organization", name: "台灣財務試算" },
        datePublished: "2026-04-03",
        dateModified: "2026-04-03",
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
              114年度・勞退自提最高6%，節稅立即有效
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              勞退自提 vs 自己買ETF
              <br />
              <span className="text-blue-600">2026年完整比較試算</span>
            </h1>
            <p className="mt-3 text-base text-gray-500">
              稅率20%的人自提6%，等於用<span className="font-semibold text-blue-700">打8折的錢</span>存退休金。
              但30年後ETF績效是否更好？含節稅試算表與複利終值比較。
            </p>
          </div>

          {/* 核心觀念 - 3 cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                color: "border-green-200 bg-green-50",
                badge: "bg-green-600",
                badgeText: "確定優勢",
                title: "節稅效果立即確定",
                body: "稅率20%自提6%，等於打8折存退休金。每月省下的稅金是確定且即時的報酬，不受市場波動影響。",
              },
              {
                color: "border-blue-200 bg-blue-50",
                badge: "bg-blue-600",
                badgeText: "潛在優勢",
                title: "ETF長期報酬率更高",
                body: "0050歷史年化報酬率約10-12%，遠高於勞退基金的4-5%。但這是歷史數據，未來不保證，且沒有保本機制。",
              },
              {
                color: "border-orange-200 bg-orange-50",
                badge: "bg-orange-500",
                badgeText: "最佳策略",
                title: "兩者兼得",
                body: "先自提6%鎖定節稅，再把每月省下的稅金投入ETF追求超額報酬。用確定性收益搭配成長性資產。",
              },
            ].map((card) => (
              <div key={card.badgeText} className={`rounded-2xl border p-5 ${card.color}`}>
                <div className={`mb-2 inline-block rounded-full ${card.badge} px-3 py-0.5 text-xs font-bold text-white`}>
                  {card.badgeText}
                </div>
                <p className="font-bold text-gray-900">{card.title}</p>
                <p className="mt-2 text-sm text-gray-600">{card.body}</p>
              </div>
            ))}
          </div>

          {/* 表1: 節稅試算表 */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-xl font-bold text-gray-900">自提6%節稅試算表</h2>
            <p className="mb-4 text-xs text-gray-500">
              自提金額不計入薪資所得，節稅效果 = 自提金額 × 適用稅率。月淨成本 = 自提金額 − 節稅金額。
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-xs text-gray-500">
                    <th className="pb-2 pr-3 font-semibold">月薪</th>
                    <th className="pb-2 pr-3 font-semibold">適用稅率</th>
                    <th className="pb-2 pr-3 font-semibold">每月自提(6%)</th>
                    <th className="pb-2 pr-3 font-semibold">月節稅</th>
                    <th className="pb-2 pr-3 font-semibold">月淨成本</th>
                    <th className="pb-2 font-semibold">相當折扣</th>
                  </tr>
                </thead>
                <tbody>
                  {TAX_SCENARIOS.map((s, i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0">
                      <td className="py-2.5 pr-3 font-bold text-gray-900">{s.salary.toLocaleString()}</td>
                      <td className="py-2.5 pr-3 text-gray-700">{s.rate}%</td>
                      <td className="py-2.5 pr-3 text-gray-700">{s.contrib.toLocaleString()}</td>
                      <td className="py-2.5 pr-3 font-semibold text-green-700">+{s.savings}</td>
                      <td className="py-2.5 pr-3 text-gray-700">{s.cost.toLocaleString()}</td>
                      <td className={`py-2.5 ${discountColor(s.discount)}`}>{s.discount}折</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-blue-700">
              提示：稅率越高，折扣越低，節稅效果越顯著。稅率40%的人等於用6折的成本存退休金。
            </p>
          </div>

          {/* 表2: 30年複利終值 */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-xl font-bold text-gray-900">30年複利終值比較</h2>
            <p className="mb-4 text-xs text-gray-500">
              基準：月投 3,000 元 × 360 個月（30年）。金額為試算參考值，實際結果依實際報酬率而異。
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-xs text-gray-500">
                    <th className="pb-2 pr-4 font-semibold">年化報酬率</th>
                    <th className="pb-2 pr-4 font-semibold">30年後金額</th>
                    <th className="pb-2 font-semibold">說明</th>
                  </tr>
                </thead>
                <tbody>
                  {FV_SCENARIOS.map((s) => {
                    const isLaborFund = s.rate === 4;
                    const isEtfRef = s.rate === 8;
                    const rowClass = isLaborFund
                      ? "border-b border-blue-100 bg-blue-50"
                      : isEtfRef
                      ? "border-b border-green-100 bg-green-50"
                      : "border-b border-gray-100 last:border-0";
                    return (
                      <tr key={s.rate} className={rowClass}>
                        <td className="py-2.5 pr-4 font-bold text-gray-900">{s.label}</td>
                        <td className={`py-2.5 pr-4 font-bold ${isLaborFund ? "text-blue-700" : isEtfRef ? "text-green-700" : "text-gray-700"}`}>
                          {s.fv.toLocaleString()} 元
                        </td>
                        <td className="py-2.5 text-xs text-gray-500">
                          {s.note}
                          {isLaborFund && <span className="ml-1 rounded bg-blue-100 px-1.5 py-0.5 text-blue-700 font-semibold">勞退參考</span>}
                          {isEtfRef && <span className="ml-1 rounded bg-green-100 px-1.5 py-0.5 text-green-700 font-semibold">ETF參考</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              注：勞退基金近10年年化報酬率實際約4-5%；0050歷史年化報酬率約10-12%，均為過去數據，不代表未來績效。
            </p>
          </div>

          {/* 質性比較表 */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">勞退自提 vs ETF 比較一覽</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-xs text-gray-500">
                    <th className="pb-2 pr-4 font-semibold w-36">項目</th>
                    <th className="pb-2 pr-4 font-semibold text-green-700">勞退自提</th>
                    <th className="pb-2 font-semibold text-blue-700">自行投資ETF</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      item: "節稅效果",
                      labor: { text: "✓ 立即節稅", positive: true },
                      etf: { text: "✗ 無節稅", positive: false },
                    },
                    {
                      item: "保本保障",
                      labor: { text: "✓ 最低保2年定存利率", positive: true },
                      etf: { text: "✗ 無保本，市值可能下跌", positive: false },
                    },
                    {
                      item: "資金靈活性",
                      labor: { text: "✗ 60歲才能領", positive: false },
                      etf: { text: "✓ 隨時可出場", positive: true },
                    },
                    {
                      item: "長期報酬率",
                      labor: { text: "△ 約4-5%（歷史）", positive: null },
                      etf: { text: "△ 歷史約10-12%，不保證", positive: null },
                    },
                    {
                      item: "最低提繳",
                      labor: { text: "1%（月薪×1%）", positive: null },
                      etf: { text: "無限制，可任意金額", positive: null },
                    },
                    {
                      item: "雇主配合提繳",
                      labor: { text: "✓ 雇主依法提繳6%", positive: true },
                      etf: { text: "✗ 無雇主配合", positive: false },
                    },
                  ].map((row) => (
                    <tr key={row.item} className="border-b border-gray-100 last:border-0">
                      <td className="py-2.5 pr-4 font-semibold text-gray-700">{row.item}</td>
                      <td className={`py-2.5 pr-4 ${row.labor.positive === true ? "text-green-700 font-semibold" : row.labor.positive === false ? "text-red-600" : "text-orange-600"}`}>
                        {row.labor.text}
                      </td>
                      <td className={`py-2.5 ${row.etf.positive === true ? "text-green-700 font-semibold" : row.etf.positive === false ? "text-red-600" : "text-orange-600"}`}>
                        {row.etf.text}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Affiliate CTA 1 */}
          <div className="mt-8">
            <TaxAffiliateCTA />
          </div>

          {/* 決策建議 */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">決策建議：你適合哪種方式？</h2>
            <div className="space-y-4">
              {[
                {
                  num: "01",
                  color: "bg-green-600",
                  situation: "稅率12%以上",
                  advice: "強烈建議自提6%",
                  detail: "節稅效果立即且確定，相當於88折或更低的成本存入退休帳戶。這是幾乎零風險的確定性報酬，優先把6%額度用滿。",
                },
                {
                  num: "02",
                  color: "bg-slate-500",
                  situation: "稅率5%",
                  advice: "可自提，但ETF靈活性值得考慮",
                  detail: "每月自提3,000元只省150元，節稅效果有限（95折）。如果你重視資金靈活性或預期短期內有大額支出需求，可考慮以ETF為主。",
                },
                {
                  num: "03",
                  color: "bg-blue-600",
                  situation: "月薪5萬以上＋稅率20%",
                  advice: "自提6% ＋ 節稅的錢再投ETF",
                  detail: "最佳組合策略：先自提6%（每月自提3,000元，省600元稅），再把省下的600元投入0050或其他ETF。兩者兼得，用確定性收益搭配成長性資產。",
                },
                {
                  num: "04",
                  color: "bg-orange-500",
                  situation: "快退休（55歲以上）",
                  advice: "勞退更安全",
                  detail: "距離60歲領取僅剩5年，勞退保本機制能保護你不受市場大跌衝擊。ETF在短期內可能大幅波動，此時勞退的確定性報酬更有價值。",
                },
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-4 rounded-xl bg-gray-50 p-4">
                  <div className={`shrink-0 rounded-full ${item.color} px-2.5 py-0.5 text-sm font-bold text-white`}>
                    {item.num}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{item.situation}</p>
                    <p className="mt-0.5 font-bold text-gray-900">{item.advice}</p>
                    <p className="mt-1 text-sm text-gray-600">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 相關工具 */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">相關計算工具</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { href: "/labor-retirement", label: "勞退新制說明", desc: "勞退新制計算與提繳說明" },
                { href: "/pension-calculator", label: "退休試算", desc: "退休金需求與儲蓄目標試算" },
                { href: "/retirement-planning", label: "退休規劃", desc: "30年退休計畫完整規劃指南" },
                { href: "/income-tax-brackets", label: "所得稅級距", desc: "2026年綜所稅稅率級距一覽" },
                { href: "/tax-calculator", label: "綜合所得稅試算", desc: "2026年報稅金額估算" },
                { href: "/tax-strategy-2026", label: "省稅策略", desc: "合法節稅5大方法" },
                { href: "/dividend-tax", label: "股利所得申報", desc: "合併計稅vs分開課稅比較" },
                { href: "/salary-calculator", label: "月薪試算", desc: "實拿薪資與扣繳試算" },
                { href: "/expense-deduction-compare", label: "費用核實試算", desc: "列舉扣除額vs標準扣除額比較" },
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
            <h2 className="mb-4 text-xl font-bold text-gray-900">勞退自提常見問題</h2>
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
            資料來源：勞動部、財政部相關規定。勞退基金報酬率為歷史數據，不代表未來績效。ETF報酬率以歷史為參考，不構成投資建議。
          </p>
        </main>
      </div>
    </>
  );
}
