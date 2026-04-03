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
  { salary: 30000, contrib: 1800, rate: 5,  savings: 90,   cost: 1710, discount: 95 },
  { salary: 30000, contrib: 1800, rate: 12, savings: 216,  cost: 1584, discount: 88 },
  { salary: 40000, contrib: 2400, rate: 5,  savings: 120,  cost: 2280, discount: 95 },
  { salary: 40000, contrib: 2400, rate: 12, savings: 288,  cost: 2112, discount: 88 },
  { salary: 40000, contrib: 2400, rate: 20, savings: 480,  cost: 1920, discount: 80 },
  { salary: 50000, contrib: 3000, rate: 5,  savings: 150,  cost: 2850, discount: 95 },
  { salary: 50000, contrib: 3000, rate: 12, savings: 360,  cost: 2640, discount: 88 },
  { salary: 50000, contrib: 3000, rate: 20, savings: 600,  cost: 2400, discount: 80 },
  { salary: 60000, contrib: 3600, rate: 12, savings: 432,  cost: 3168, discount: 88 },
  { salary: 60000, contrib: 3600, rate: 20, savings: 720,  cost: 2880, discount: 80 },
  { salary: 60000, contrib: 3600, rate: 30, savings: 1080, cost: 2520, discount: 70 },
  { salary: 80000, contrib: 4800, rate: 20, savings: 960,  cost: 3840, discount: 80 },
  { salary: 80000, contrib: 4800, rate: 30, savings: 1440, cost: 3360, discount: 70 },
  { salary: 100000, contrib: 6000, rate: 20, savings: 1200, cost: 4800, discount: 80 },
  { salary: 100000, contrib: 6000, rate: 30, savings: 1800, cost: 4200, discount: 70 },
  { salary: 100000, contrib: 6000, rate: 40, savings: 2400, cost: 3600, discount: 60 },
];

// 表2: 月投3,000元，30年複利終值
const FV_SCENARIOS = [
  { rate: 3,  label: "3%",  fv: 1748040, note: "保守／定存水準" },
  { rate: 4,  label: "4%",  fv: 2082300, note: "勞退基金近10年均約4-5%", highlight: "blue" },
  { rate: 5,  label: "5%",  fv: 2496300, note: "中性估計" },
  { rate: 6,  label: "6%",  fv: 3013500, note: "穩健" },
  { rate: 7,  label: "7%",  fv: 3659100, note: "積極" },
  { rate: 8,  label: "8%",  fv: 4470900, note: "0050歷史年化約10-12%", highlight: "green" },
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
    a: "長期來看確實有差距。勞退基金近10年年化報酬率約4-5%，0050自2003年上市以來年化報酬率約10-12%。但勞退基金有「保本」機制（最低不低於2年定存利率），自行投資ETF沒有這個保障。如果遇到市場大跌，ETF帳戶可能暫時帳面虧損。",
  },
  {
    q: "勞退和ETF可以同時投資嗎？",
    a: "可以，而且這是很多人採用的最佳策略：先自提勞退6%享受節稅優惠（確定性報酬），再把每月省下來的稅金（例如稅率20%的人省下600元）另外投入ETF，兩者兼得。節稅部分用低風險資產鎖定，超額報酬部分用ETF追求。",
  },
  {
    q: "勞退帳戶幾歲才能領？",
    a: "勞退新制帳戶原則上在年滿60歲後才能請領。可選擇一次領清或月領（月領方式依平均餘命計算）。這是勞退最大的限制：資金流動性差，無法提前動用（除非完全喪失工作能力等特殊情況）。相比之下，自行投資ETF可以隨時出場，這是ETF的主要優勢。",
  },
];

export default function IraVsLaborRetirementPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "勞退自提 vs 自己買ETF 2026｜節稅試算＋30年複利比較",
        description:
          "2026年勞退自提 vs 自行投資ETF完整比較：節稅效果試算表、30年複利終值比較、保本機制說明。",
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
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-700">
              114年度・勞退自提最高6%，節稅立即有效
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              勞退自提 vs 自己買ETF
              <br />
              <span className="text-blue-600">2026年完整比較試算</span>
            </h1>
            <p className="mt-3 text-base text-gray-500">
              這不是「勞退報酬率 vs ETF報酬率」的問題，而是：
              <span className="font-semibold text-green-700">先把節稅折扣拿了，再去買ETF。</span>
            </p>
          </div>

          {/* 3 core concept cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "確定優勢",
                subtitle: "節稅（立即到手）",
                desc: "稅率20%的人，每月3,000元自提，實際只花2,400元。節省的600元，你再去買ETF。",
                color: "border-green-300 bg-green-50",
                badge: "bg-green-600",
                badgeText: "強烈建議",
              },
              {
                title: "潛在優勢",
                subtitle: "ETF（歷史績效更好）",
                desc: "0050歷史年化約10-12%，勞退基金近10年約4-5%。ETF長期報酬可能更高，但不保證。",
                color: "border-blue-300 bg-blue-50",
                badge: "bg-blue-600",
                badgeText: "考量靈活性",
              },
              {
                title: "最佳策略",
                subtitle: "兩者兼得",
                desc: "自提6%拿節稅折扣 + 把省下的稅金每月投ETF。確定性報酬 + 成長潛力，不必二選一。",
                color: "border-orange-300 bg-orange-50",
                badge: "bg-orange-600",
                badgeText: "推薦做法",
              },
            ].map((card) => (
              <div key={card.title} className={`rounded-2xl border p-5 ${card.color}`}>
                <div className={`mb-2 inline-block rounded-full ${card.badge} px-3 py-0.5 text-xs font-bold text-white`}>
                  {card.badgeText}
                </div>
                <p className="text-lg font-bold text-gray-900">{card.title}</p>
                <p className="text-sm font-semibold text-gray-700">{card.subtitle}</p>
                <p className="mt-2 text-sm text-gray-600">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* 表1: 節稅試算 */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-xl font-bold text-gray-900">自提6%節稅試算表（各月薪 × 稅率）</h2>
            <p className="mb-4 text-xs text-gray-500">節稅效果 = 每月自提金額 × 邊際稅率。自提金額不計入薪資所得，當年即節稅。</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-xs text-gray-500">
                    <th className="pb-2 pr-4 font-semibold">月薪</th>
                    <th className="pb-2 pr-4 font-semibold">適用稅率</th>
                    <th className="pb-2 pr-4 font-semibold">每月自提(6%)</th>
                    <th className="pb-2 pr-4 font-semibold">月節稅</th>
                    <th className="pb-2 pr-4 font-semibold">月淨成本</th>
                    <th className="pb-2 font-semibold">相當折扣</th>
                  </tr>
                </thead>
                <tbody>
                  {TAX_SCENARIOS.map((s, i) => (
                    <tr
                      key={i}
                      className={`border-b border-gray-100 last:border-0 ${
                        s.salary !== (TAX_SCENARIOS[i - 1]?.salary ?? 0) ? "border-t-2 border-t-gray-300" : ""
                      }`}
                    >
                      <td className="py-2.5 pr-4 font-bold text-gray-900">
                        {s.salary !== (TAX_SCENARIOS[i - 1]?.salary ?? 0)
                          ? `${(s.salary / 10000).toFixed(0)}萬`
                          : ""}
                      </td>
                      <td className="py-2.5 pr-4 text-gray-700">{s.rate}%</td>
                      <td className="py-2.5 pr-4 text-gray-700">{s.contrib.toLocaleString()}元</td>
                      <td className="py-2.5 pr-4 font-semibold text-green-700">+{s.savings}元</td>
                      <td className="py-2.5 pr-4 font-semibold text-blue-700">{s.cost.toLocaleString()}元</td>
                      <td className={`py-2.5 font-bold ${
                        s.discount <= 70 ? "text-green-700" : s.discount <= 80 ? "text-blue-700" : "text-slate-500"
                      }`}>
                        {s.discount}折
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-blue-700">
              試算說明：邊際稅率越高，節稅折扣越大。稅率30%的人月薪8萬，等於每月用7折的錢存退休金。
            </p>
          </div>

          {/* 表2: 30年複利終值 */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-xl font-bold text-gray-900">30年複利終值比較</h2>
            <p className="mb-4 text-xs text-gray-500">
              基準：月投 <span className="font-semibold">3,000元</span>（月薪5萬自提6%）× 360個月（30年）。不同年化報酬率下的期末金額。
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
                  {FV_SCENARIOS.map((s) => (
                    <tr
                      key={s.rate}
                      className={`border-b border-gray-100 last:border-0 ${
                        s.highlight === "blue" ? "bg-blue-50" : s.highlight === "green" ? "bg-green-50" : ""
                      }`}
                    >
                      <td className="py-2.5 pr-4 font-bold text-gray-900">{s.label}</td>
                      <td className="py-2.5 pr-4 font-bold text-blue-700">
                        約{Math.round(s.fv / 10000)}萬元
                      </td>
                      <td className="py-2.5 text-xs text-gray-500">{s.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              藍色：勞退基金近年約4%；綠色：0050歷史約8-10%。注意：勞退有保本機制，ETF無保本，數值為試算參考。
            </p>
          </div>

          {/* 質性比較表 */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">勞退自提 vs ETF：6大維度比較</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-xs text-gray-500">
                    <th className="pb-2 pr-6 text-left font-semibold">比較項目</th>
                    <th className="pb-2 pr-6 text-center font-semibold">勞退自提</th>
                    <th className="pb-2 text-center font-semibold">自行買ETF</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { item: "節稅效果", labor: "✓ 自提額免計薪資所得", etf: "✗ 無節稅" },
                    { item: "保本保障", labor: "✓ 最低2年定存利率", etf: "✗ 無保本" },
                    { item: "資金靈活性", labor: "✗ 60歲才能領", etf: "✓ 隨時可出場" },
                    { item: "長期報酬率", labor: "△ 近10年約4-5%", etf: "△ 0050歷史約10-12%（不保證）" },
                    { item: "政府雇主配合", labor: "✓ 雇主強制提繳6%", etf: "✗ 無雇主配合" },
                    { item: "帳戶安全性", labor: "✓ 個人帳戶，不受公司影響", etf: "✓ 持有人所有" },
                  ].map((row) => (
                    <tr key={row.item} className="border-b border-gray-100 last:border-0">
                      <td className="py-3 pr-6 font-semibold text-gray-900">{row.item}</td>
                      <td className={`py-3 pr-6 text-center text-sm ${row.labor.startsWith("✓") ? "text-green-700 font-semibold" : row.labor.startsWith("✗") ? "text-red-600" : "text-gray-600"}`}>
                        {row.labor}
                      </td>
                      <td className={`py-3 text-center text-sm ${row.etf.startsWith("✓") ? "text-green-700 font-semibold" : row.etf.startsWith("✗") ? "text-red-600" : "text-gray-600"}`}>
                        {row.etf}
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
          <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-blue-900">四種情況的建議做法</h2>
            <div className="space-y-3">
              {[
                {
                  num: "01",
                  title: "稅率12%以上 → 強烈建議自提6%",
                  desc: "節稅效果立即確定（88折或更低），加上雇主已提繳6%，等於每月有12%薪資進入退休帳戶，你只負擔60%不到的成本。",
                  color: "bg-green-600",
                },
                {
                  num: "02",
                  title: "稅率5% → 自提看個人",
                  desc: "月薪3-4萬的族群，節稅每月只省90-120元，ETF靈活性的優勢可能更重要。若資金不緊，仍建議小額自提（如1-2%）。",
                  color: "bg-slate-500",
                },
                {
                  num: "03",
                  title: "月薪5萬以上＋稅率20% → 自提6%＋節稅再投ETF",
                  desc: "每月節稅600-1,200元，自動轉入ETF定期定額，兩者兼得。這是「確定節稅+成長潛力」的組合。",
                  color: "bg-blue-600",
                },
                {
                  num: "04",
                  title: "55歲以上接近退休 → 勞退優先",
                  desc: "保本機制讓你不用擔心在大跌年份退休。ETF市值波動大，接近退休的資金不適合高風險暴露。",
                  color: "bg-orange-600",
                },
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm">
                  <div className={`shrink-0 rounded-full ${item.color} px-2.5 py-0.5 text-sm font-bold text-white`}>
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

          {/* 相關工具 */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">相關計算工具</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { href: "/labor-retirement", label: "勞退新制節稅試算", desc: "自提節稅金額詳細計算" },
                { href: "/pension-calculator", label: "退休金估算", desc: "勞退＋勞保＋個人儲蓄估算" },
                { href: "/retirement-planning", label: "退休缺口試算", desc: "需要多少退休金？" },
                { href: "/income-tax-brackets", label: "所得稅級距", desc: "確認你的邊際稅率" },
                { href: "/tax-calculator", label: "綜合所得稅試算", desc: "2026年報稅金額估算" },
                { href: "/tax-strategy-2026", label: "省稅策略", desc: "更多2026年節稅方法" },
                { href: "/dividend-tax", label: "股利所得試算", desc: "ETF股利稅務說明" },
                { href: "/salary-calculator", label: "月薪試算", desc: "實拿薪資計算" },
                { href: "/expense-deduction-compare", label: "費用核實試算", desc: "申報費用節稅比較" },
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
            <h2 className="mb-4 text-xl font-bold text-gray-900">勞退自提 vs ETF 常見問題</h2>
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
            資料來源：勞動部、財政部相關規定。勞退基金報酬率為歷史數據，不代表未來績效。ETF報酬率以歷史為參考，不構成投資建議。節稅效果依個人實際所得級距而異，請以財政部最新規定為準。
          </p>
        </main>
      </div>
    </>
  );
}
