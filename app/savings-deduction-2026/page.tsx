import type { Metadata } from "next";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

export const metadata: Metadata = {
  title: "儲蓄投資特別扣除額 2026 完整攻略｜27萬利息免稅怎麼用、股利適用嗎 - 台灣財務試算",
  description:
    "114年度儲蓄投資特別扣除額每戶最高27萬元，銀行利息收入在此限額內不課稅。哪些收入適用、股利算不算、郵局10萬免稅和這27萬的關係，一次說清楚。",
  keywords: [
    "儲蓄投資特別扣除額",
    "利息所得免稅",
    "27萬免稅",
    "114年儲蓄投資扣除額",
    "銀行利息報稅",
    "存款利息免稅",
    "股利所得申報",
    "儲蓄投資扣除2026",
    "利息收入扣除額",
    "郵局存款免稅",
    "投資所得免稅",
    "綜合所得稅特別扣除",
  ],
  openGraph: {
    title: "儲蓄投資特別扣除額 2026 完整攻略｜27萬利息免稅怎麼用、股利適用嗎",
    description:
      "114年度儲蓄投資特別扣除額每戶最高27萬。銀行利息、郵局存款、股利所得各怎麼算？哪些在27萬內免稅、哪些另有規定？",
    url: "https://www.twtaxcalc.com/savings-deduction-2026",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/savings-deduction-2026",
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
  { href: "/job-change-tax-2026", label: "換工作報稅" },
  { href: "/etax-guide-2026", label: "eTax教學" },
  { href: "/tax-refund-timeline", label: "退稅時程" },
  { href: "/day-trading-tax", label: "當沖稅費" },
  { href: "/ira-vs-labor-retirement", label: "勞退vs ETF" },
  { href: "/legal-tax-savings-2026", label: "省稅10招" },
  { href: "/rental-income-tax-2026", label: "出租報稅" },
  { href: "/freelance-to-employee-2026", label: "接案轉正職報稅" },
  { href: "/rent-deduction-2026", label: "房租抵稅" },
  { href: "/donation-deduction-2026", label: "捐款節稅" },
  { href: "/savings-deduction-2026", label: "儲蓄投資扣除額", active: true },
  { href: "/salary-deduction-2026", label: "薪資所得扣除額" },
];

const SECTIONS = [
  {
    id: "what-is",
    icon: "🏦",
    title: "什麼是儲蓄投資特別扣除額？",
    color: "blue",
    content:
      "儲蓄投資特別扣除額是綜合所得稅的特別扣除項目之一，114年度每個申報戶最高可扣除27萬元。白話說：你的利息收入在27萬以內，不用繳所得稅；超過的部分才要算進綜合所得課稅。",
    details: [
      {
        label: "114年度金額：每申報戶最高 270,000 元",
        text: "注意是「每戶」不是「每人」。夫妻合併申報，兩人的利息所得合計適用同一個27萬上限，不是各自27萬。若兩人加起來的利息收入超過27萬，超出部分需要課稅。",
      },
      {
        label: "適用的收入類型",
        text: "主要包括：銀行定存、活存利息收入；信用合作社、農漁會信用部存款利息；公債、公司債利息收入；貨幣市場基金收益（申報為利息所得的部分）。這些收入加總，在27萬以內，透過這個扣除額可以完全不課稅。",
      },
      {
        label: "為什麼多數人「自動用到」這個扣除額",
        text: "台灣銀行利率長期偏低，100萬定存年利率約1.5~2%，利息只有1.5~2萬元，離27萬上限非常遠。一般上班族的利息收入通常只有幾千到幾萬元，扣除額完全夠用，等於利息收入完全不課稅。真正需要注意的是有大額定存或靠利息生活的退休族。",
      },
    ],
  },
  {
    id: "post-office",
    icon: "📮",
    title: "郵局存款10萬免稅，跟27萬是兩回事",
    color: "green",
    content:
      "這是最常被混淆的地方。郵局存簿儲金的利息有另一個獨立的免稅規定（每人每年10萬元分離課稅），跟儲蓄投資特別扣除額是不同的制度，不會互相佔用額度。",
    details: [
      {
        label: "郵局存簿儲金利息：每人每年10萬免稅（分離課稅）",
        text: "中華郵政存簿儲金（活期存款）的利息，每人每年10萬元以內免納所得稅，超過的部分才要申報。這個10萬是「分離課稅」，不計入綜合所得，也不佔用儲蓄投資特別扣除額的27萬額度。若你在郵局有大額活存，利息在10萬以內完全免稅。",
      },
      {
        label: "兩個制度的組合：最高可有37萬利息免稅",
        text: "理論上：郵局存款利息10萬（分離課稅免稅）+ 其他銀行利息27萬（儲蓄投資特別扣除額）= 最高37萬利息收入完全不課稅。但實務上，一般人的利息遠低於這個數字，不需要刻意規劃。",
      },
      {
        label: "郵局定期存款的利息不同：算在27萬裡",
        text: "要注意：郵局「存簿儲金（活存）」才有10萬免稅；郵局的「定期存款（定存）」利息不在這個免稅範圍，算進綜合所得，適用儲蓄投資特別扣除額的27萬上限。兩者是不同商品。",
      },
    ],
  },
  {
    id: "dividends",
    icon: "📈",
    title: "股利所得算在27萬裡面嗎？",
    color: "purple",
    content:
      "這是投資人最常問的問題。答案取決於你的股利申報方式。選合併計稅的股利收入算在儲蓄投資特別扣除額裡；選分開計稅（28%）的股利則不適用這個扣除額。",
    details: [
      {
        label: "股利所得有兩種申報方式（擇一）",
        text: "方式A：合併計稅 → 股利併入綜合所得，同時享有8.5%的股利抵減稅額（上限8萬元）。方式B：分開計稅 → 股利以28%分開計算稅額，不合併入綜合所得，也不享有儲蓄投資特別扣除額的27萬額度。",
      },
      {
        label: "選合併計稅：股利算在27萬額度裡",
        text: "若你選擇合併計稅，股利收入算入綜合所得，同時也算在儲蓄投資特別扣除額的適用範圍。例如：銀行利息3萬 + 股利15萬 = 18萬，低於27萬，全部可以扣除，等於這部分收入不課稅（另有股利抵減稅額8.5%可以用）。",
      },
      {
        label: "選分開計稅：股利不算在27萬裡，但稅率固定28%",
        text: "若你選分開計稅，股利以28%固定稅率計算，與27萬扣除額無關。這種方式適合：高所得者（稅率超過28%）、或希望股利不影響其他所得級距的人。低所得者（稅率12%以下）通常選合併計稅更省稅。",
      },
    ],
  },
  {
    id: "who-cares",
    icon: "⚠️",
    title: "什麼情況下需要認真注意？",
    color: "orange",
    content:
      "大多數上班族不需要擔心儲蓄投資特別扣除額。但以下幾種情況，這個扣除額可能成為關鍵，甚至影響你繳了多少稅。",
    details: [
      {
        label: "退休族、大額定存族：利息可能超過27萬",
        text: "假設退休後有1,500萬存款，年利率2%，一年利息30萬，超過27萬上限3萬元。這3萬要合併入綜合所得課稅，若其他收入不多（稅率5%），增加約1,500元稅負。對多數退休族影響有限，但要知道超過的部分不再免稅。",
      },
      {
        label: "夫妻合併申報：兩人利息共用27萬",
        text: "若夫妻各有大額定存，兩人利息加起來可能超過27萬。超過部分課稅。解法之一：若兩人分開申報，各自可用27萬扣除額（合計54萬），但要確認分開申報整體稅額是否更低。",
      },
      {
        label: "有大量股利且選合併計稅：27萬很快用完",
        text: "若你有大量股票，股利收入超過27萬（例如：持有市值1,000萬以上、殖利率3%以上），儲蓄投資特別扣除額27萬已用完，超出部分課稅。這時要認真計算是否改選股利分開計稅（28%）更划算。",
      },
    ],
  },
  {
    id: "how-to-file",
    icon: "📱",
    title: "怎麼在eTax申報？",
    color: "green",
    content:
      "一般上班族的銀行利息資料，財政部已與金融機構交換，eTax通常會自動帶入。你需要做的主要是確認金額是否正確，以及選擇股利的申報方式。",
    details: [
      {
        label: "步驟1：確認系統帶入的利息金額",
        text: "進入eTax申報流程，「利息所得」欄位通常會預填銀行提供的資料。檢查是否所有銀行帳戶的利息都有帶入，若有遺漏（如小銀行、信用合作社），需要自行補填。郵局活存利息若超過10萬，超出部分也需要申報。",
      },
      {
        label: "步驟2：選擇股利所得申報方式",
        text: "若有股利收入，系統會提示你選擇合併計稅或分開計稅（28%）。系統通常會計算兩種方式的稅額供你比較。一般低稅率者（5~12%）選合併計稅省稅；高稅率者（30%以上）選分開計稅省稅。",
      },
      {
        label: "步驟3：確認儲蓄投資特別扣除額自動套用",
        text: "儲蓄投資特別扣除額是系統自動計算的特別扣除項目，不需要手動申請憑證。若你的利息+股利（合併申報）在27萬以內，系統會直接扣除，顯示可扣除金額等於你的實際利息所得。若超過27萬，顯示上限27萬。",
      },
    ],
  },
];

const FAQS = [
  {
    q: "儲蓄投資特別扣除額27萬是每人還是每戶？",
    a: "每申報戶（每戶），不是每人。若夫妻合併申報，兩人的利息所得合計後，一起適用同一個27萬上限，不是各自27萬。若兩人利息加起來超過27萬，超出部分需要課稅。若選擇分開申報，則各自有一個27萬上限，合計可達54萬。",
  },
  {
    q: "我的利息收入只有幾千元，還需要申報嗎？",
    a: "仍需申報，但實際上不會增加稅負。銀行已向財政部提供扣繳憑單，eTax系統通常會自動帶入。由於儲蓄投資特別扣除額27萬遠大於你的利息收入，這些利息會被扣除額抵消，稅額不會增加。直接確認預填金額後送出即可。",
  },
  {
    q: "郵局存款10萬免稅和儲蓄投資特別扣除額27萬會互相衝突嗎？",
    a: "不會。兩個是不同的免稅制度，分開計算，不互相佔用。郵局存簿儲金（活期）利息每人每年10萬內免稅，這部分不算入綜合所得。其他銀行（包括郵局定存）的利息算入綜合所得，再適用儲蓄投資特別扣除額27萬。",
  },
  {
    q: "股利選合併計稅，算在27萬的儲蓄投資扣除額裡嗎？",
    a: "是的。選合併計稅的股利收入，算在儲蓄投資特別扣除額的適用範圍內。利息+股利合計在27萬以內，可全部扣除。同時，合併計稅的股利還有額外的8.5%股利抵減稅額（上限8萬元）。選分開計稅（28%）的股利則不適用這個27萬扣除額。",
  },
  {
    q: "退休後靠定存利息生活，超過27萬怎麼辦？",
    a: "超過27萬的部分，需要合併入綜合所得課稅。例如：利息收入30萬，扣除27萬後，3萬元算入綜合所得。若你退休後沒有其他收入，加上免稅額、標準扣除額等，實際稅額可能仍為零或很低。建議用 /tax-calculator 試算全年稅額，確認實際影響。",
  },
];

const SECTION_COLORS: Record<
  string,
  { bg: string; border: string; icon: string; title: string; detail: string }
> = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "bg-blue-100",
    title: "text-blue-900",
    detail: "text-blue-700",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    icon: "bg-green-100",
    title: "text-green-900",
    detail: "text-green-700",
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    icon: "bg-orange-100",
    title: "text-orange-900",
    detail: "text-orange-700",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    icon: "bg-purple-100",
    title: "text-purple-900",
    detail: "text-purple-700",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    icon: "bg-red-100",
    title: "text-red-900",
    detail: "text-red-700",
  },
};

export default function SavingsDeduction2026Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline:
          "儲蓄投資特別扣除額 2026 完整攻略｜27萬利息免稅怎麼用、股利適用嗎",
        description:
          "114年度儲蓄投資特別扣除額每戶最高27萬元，銀行利息收入在此限額內不課稅。哪些收入適用、股利算不算、郵局10萬免稅和這27萬的關係，一次說清楚。",
        url: "https://www.twtaxcalc.com/savings-deduction-2026",
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
              114年度報稅・存款族、投資族必看
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              儲蓄投資特別扣除額 2026
              <br />
              27萬利息免稅怎麼算？
            </h1>
            <p className="mt-3 text-base text-gray-500">
              銀行存款利息在27萬以內，完全不用繳稅。
              <span className="font-semibold text-blue-700">
                大多數人的利息收入遠低於27萬，等於自動免稅。但股利申報方式不同，適用規則也不一樣。
              </span>
            </p>
          </div>

          {/* Quick summary cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: "🏦",
                label: "114年度扣除額",
                desc: "每申報戶最高 270,000 元",
              },
              {
                icon: "📮",
                label: "郵局活存另計",
                desc: "每人10萬免稅，不佔27萬額度",
              },
              {
                icon: "📈",
                label: "股利合併計稅",
                desc: "才算在27萬扣除額範圍內",
              },
            ].map((card) => (
              <div
                key={card.label}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm text-center"
              >
                <div className="mb-2 text-2xl">{card.icon}</div>
                <p className="font-bold text-gray-900">{card.label}</p>
                <p className="mt-1 text-sm text-gray-500">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* 試算 CTA */}
          <div className="mb-8 rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center">
            <p className="mb-1 text-sm font-medium text-blue-700">
              有存款利息、股利收入，不確定怎麼報？
            </p>
            <p className="mb-4 text-xl font-bold text-blue-900">
              輸入利息+股利，30秒算出合併vs分開計稅哪個省
            </p>
            <Link
              href="/tax-calculator"
              className="inline-block rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
            >
              立即試算報稅金額 →
            </Link>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {SECTIONS.map((section) => {
              const c = SECTION_COLORS[section.color];
              return (
                <div
                  key={section.id}
                  className={`rounded-2xl border ${c.border} ${c.bg} p-6 shadow-sm`}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className={`rounded-xl ${c.icon} p-2 text-xl`}>
                      {section.icon}
                    </span>
                    <h2 className={`text-lg font-bold ${c.title}`}>
                      {section.title}
                    </h2>
                  </div>
                  <p className="mb-4 text-sm text-gray-700">{section.content}</p>
                  <div className="space-y-3">
                    {section.details.map((d) => (
                      <div key={d.label} className="rounded-xl bg-white/60 p-4">
                        <p className={`mb-1 text-xs font-bold ${c.detail}`}>
                          {d.label}
                        </p>
                        <p className="text-sm text-gray-700">{d.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 廣告 1 */}
          <div className="mt-8">
            <AdUnit />
          </div>

          {/* 廣告 2 */}
          <div className="mt-6">
            <AdUnit />
          </div>

          {/* Affiliate CTA */}
          <div className="mt-6">
            <TaxAffiliateCTA />
          </div>

          {/* FAQ */}
          <div className="mb-8 mt-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">常見問題</h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <p className="mb-2 font-bold text-gray-900">Q：{faq.q}</p>
                  <p className="text-sm text-gray-600">A：{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related tools */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">相關工具</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  href: "/tax-calculator",
                  label: "報稅試算",
                  desc: "輸入所得直接算稅額",
                },
                {
                  href: "/dividend-tax",
                  label: "股利所得申報",
                  desc: "合併vs分開計稅哪個省",
                },
                {
                  href: "/salary-deduction-2026",
                  label: "薪資所得特別扣除額",
                  desc: "每人21.8萬，上班族必看",
                },
                {
                  href: "/deduction-compare",
                  label: "列舉vs標準扣除額",
                  desc: "哪種扣除額更省稅",
                },
                {
                  href: "/legal-tax-savings-2026",
                  label: "省稅10招",
                  desc: "合法節稅完整攻略",
                },
                {
                  href: "/amt-calculator",
                  label: "最低稅負試算",
                  desc: "投資人必看的替代稅",
                },
                {
                  href: "/tax-checklist-2026",
                  label: "報稅懶人包",
                  desc: "備齊資料不漏報",
                },
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

          {/* Bottom CTA */}
          <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center">
            <p className="mb-1 text-sm font-medium text-blue-700">
              報稅截止：2026年5月31日
            </p>
            <p className="mb-4 text-xl font-bold text-blue-900">
              確認儲蓄投資扣除額後，試算全年稅額
            </p>
            <Link
              href="/tax-calculator"
              className="inline-block rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
            >
              立即試算 →
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
