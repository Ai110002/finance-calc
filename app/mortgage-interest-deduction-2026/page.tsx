import type { Metadata } from "next";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

export const metadata: Metadata = {
  title: "自用住宅購屋借款利息扣除額 2026｜房貸利息怎麼抵稅、最高30萬完整攻略 - 台灣財務試算",
  description:
    "114年度自用住宅購屋借款利息列舉扣除額最高300,000元。需選列舉扣除額，且可扣金額 = 實際利息 - 儲蓄投資特別扣除額。完整說明適用條件、計算公式、eTax操作。",
  keywords: [
    "房貸利息扣除額",
    "自用住宅借款利息",
    "房貸利息抵稅",
    "購屋借款利息列舉",
    "房貸利息報稅",
    "114年房貸利息扣除",
    "房貸利息節稅2026",
    "自用住宅貸款利息",
    "房貸抵稅",
    "房屋貸款利息扣除",
    "房貸列舉扣除",
    "購屋利息節稅",
  ],
  openGraph: {
    title: "自用住宅購屋借款利息扣除額 2026｜房貸利息怎麼抵稅、最高30萬完整攻略",
    description:
      "114年度自用住宅購屋借款利息列舉扣除額最高300,000元。可扣金額 = 實際利息 - 儲蓄投資特別扣除額。選列舉扣除額才能使用。",
    url: "https://www.twtaxcalc.com/mortgage-interest-deduction-2026",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/mortgage-interest-deduction-2026",
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
  { href: "/savings-deduction-2026", label: "儲蓄投資扣除" },
  { href: "/salary-deduction-2026", label: "薪資扣除額" },
  { href: "/disability-deduction-2026", label: "身障扣除額" },
  { href: "/ltc-deduction-2026", label: "長照扣除額" },
  { href: "/tuition-deduction-2026", label: "學費扣除額" },
  { href: "/insurance-deduction-2026", label: "保險費扣除額" },
  { href: "/mortgage-interest-deduction-2026", label: "房貸利息扣除額", active: true },
];

const SECTIONS = [
  {
    id: "what-is",
    icon: "🏠",
    title: "什麼是自用住宅購屋借款利息扣除額？",
    color: "blue",
    content:
      "自用住宅購屋借款利息是《所得稅法》第17條「列舉扣除額」的一種。每年上限 300,000 元，僅限自用住宅（限一戶）的房貸利息。重要：實際可扣除金額 = 房貸利息實際金額（上限30萬）- 已申報的儲蓄投資特別扣除額。必須選列舉扣除額才能使用。",
    details: [
      {
        label: "每年最高 300,000 元（每戶一間自用住宅）",
        text: "自用住宅購屋借款利息扣除額每戶每年上限 30 萬元。「每戶」意指每個申報戶（通常為一個家庭），且只限一間自用住宅。若有多間房產，只能擇一申報，且必須是本人或配偶、受扶養直系親屬居住的自用住宅。",
      },
      {
        label: "關鍵公式：可申報金額 = 利息 - 儲蓄投資特別扣除額",
        text: "這是最多人不知道的計算規則。可申報的房貸利息扣除額 = min(實際全年房貸利息, 300,000) - 你已申報的儲蓄投資特別扣除額。例如：全年利息 250,000 元，儲蓄投資特別扣除額已申報 100,000 元，則可申報房貸利息 = 250,000 - 100,000 = 150,000 元。",
      },
      {
        label: "為什麼要扣掉儲蓄投資特別扣除額？",
        text: "政府的邏輯：若你有錢存在銀行賺利息（儲蓄投資扣除），代表你有資金，房貸利息的節稅利益就應縮減。儲蓄投資特別扣除額是「特別扣除額」，無論選標準或列舉扣除額都可申報；但只要申報了儲蓄投資扣除，就會減少房貸利息的可扣除金額。",
      },
    ],
  },
  {
    id: "who-qualifies",
    icon: "✅",
    title: "哪些人可以申報？適用條件",
    color: "green",
    content:
      "房貸利息扣除有明確的適用條件，核心是「自用」和「限一戶」。出租的房子、第二間房的房貸利息均不適用。",
    details: [
      {
        label: "條件 1：自用住宅（非出租、非空置投資）",
        text: "申報的房屋必須是本人、配偶或受扶養直系親屬實際居住的自用住宅。出租房屋、空置房屋、商辦、工業用途的房屋均不適用。若房屋部分自住、部分出租，只有自住面積比例的利息可申報。",
      },
      {
        label: "條件 2：限一戶，多戶擇一",
        text: "家中有兩間房子都有貸款，只能選其中一間申報房貸利息扣除額。通常選利息金額較高的那間，節稅效果較大。注意：「一戶」指的是申報戶（家庭），不是每個人各自一戶。",
      },
      {
        label: "條件 3：必須選列舉扣除額",
        text: "房貸利息是列舉扣除額的項目之一。若選標準扣除額（個人 131,000、夫妻 262,000），則無法申報房貸利息。一般建議：若每年房貸利息（扣儲蓄投資扣除額後）+ 保險費 + 健保費 + 其他列舉項目合計超過標準扣除額，選列舉更划算。",
      },
      {
        label: "條件 4：房屋與貸款需在納稅義務人名下",
        text: "原則上，申報房貸利息的人必須是貸款的借款人（或共同借款人），且房屋需登記在本人、配偶或受扶養直系親屬名下。若房屋登記在父母名下、但你繳貸款，一般不能申報（因為你不是貸款人）。各地國稅局可諮詢具體情況。",
      },
    ],
  },
  {
    id: "calculation",
    icon: "🧮",
    title: "實際可扣除金額怎麼算？完整範例",
    color: "orange",
    content:
      "房貸利息扣除額的計算有「儲蓄投資特別扣除額要先扣」這個特殊規則，以下用實際數字示範幾種常見情境。",
    details: [
      {
        label: "情境 A：利息 200,000，儲蓄投資扣除 0",
        text: "全年房貸利息 200,000 元，銀行帳戶利息很少、儲蓄投資特別扣除額申報 0 元。可申報房貸利息 = 200,000 - 0 = 200,000 元。稅率 20% 可省稅 40,000 元，稅率 12% 省稅 24,000 元。",
      },
      {
        label: "情境 B：利息 280,000，儲蓄投資扣除 150,000",
        text: "全年房貸利息 280,000 元，同時有銀行利息收入，儲蓄投資特別扣除額申報 150,000 元。可申報房貸利息 = 280,000 - 150,000 = 130,000 元。若還有 80,000 房租或更高利息，要重新計算哪個組合更有利。",
      },
      {
        label: "情境 C：利息 350,000（超過上限），儲蓄投資扣除 50,000",
        text: "全年房貸利息 350,000 元，超過 30 萬上限。儲蓄投資特別扣除額申報 50,000 元。可申報房貸利息 = min(350,000, 300,000) - 50,000 = 300,000 - 50,000 = 250,000 元。稅率 20% 可省稅 50,000 元。",
      },
    ],
  },
  {
    id: "vs-rent",
    icon: "📊",
    title: "房貸利息 vs 房租支出：不能同時申報",
    color: "purple",
    content:
      "列舉扣除額中，「自用住宅購屋借款利息」（上限30萬）和「房屋租金支出」（上限12萬）每戶只能擇一申報，不能同時使用。有房貸通常選房貸利息，沒房貸的租屋族選房租扣除。",
    details: [
      {
        label: "有自住房貸：通常選房貸利息",
        text: "房貸利息上限 30 萬 >> 租金扣除上限 12 萬。有房貸的家庭，通常房貸利息遠超 12 萬，選房貸利息扣除額幾乎都比較划算。除非你的房貸利息扣掉儲蓄投資扣除額後不到 12 萬，才考慮比較。",
      },
      {
        label: "租屋族：選房租扣除（上限 12 萬）",
        text: "沒有自用住宅房貸的租屋族，可申報「房屋租金支出」列舉扣除，每年上限 120,000 元。需要房東提供正式租賃契約和收據。詳細說明請見→ /rent-deduction-2026。",
      },
      {
        label: "特殊情境：同年買房又有一段租屋期",
        text: "同一申報年度，前半年租屋、後半年買房入住，在「同一戶」中擇一。若買房後才有房貸利息，且當年利息金額遠超 12 萬，通常選房貸利息。若當年利息很少（如年底才買房），可能選租金扣除更有利，需實際試算。",
      },
    ],
  },
  {
    id: "how-to-file",
    icon: "💻",
    title: "eTax 怎麼申報房貸利息扣除額",
    color: "green",
    content:
      "eTax 系統在列舉扣除額中有「自用住宅購屋借款利息」欄位。利息金額通常不會自動帶入，需手動輸入（銀行年度利息對帳單）。",
    details: [
      {
        label: "步驟 1：取得銀行利息對帳單",
        text: "向貸款銀行申請「房屋貸款利息繳納明細」或「年度繳息證明」，確認全年實際繳納的利息金額（不含本金）。網路銀行通常可線上下載，或至分行申請。這是申報的憑據，建議保留備查。",
      },
      {
        label: "步驟 2：在 eTax 切換為列舉扣除額",
        text: "登入 eTax 後，在「扣除額選擇」頁面確認選擇「列舉扣除額」。在列舉扣除額清單中找到「自用住宅購屋借款利息」欄位，輸入全年實際支付的房貸利息金額（系統會自動上限至 300,000 元）。",
      },
      {
        label: "步驟 3：系統自動計算（利息 - 儲蓄投資扣除額）",
        text: "eTax 系統在計算最終可扣除金額時，會自動將你填入的房貸利息減去你已申報的儲蓄投資特別扣除額。不需要你自己手算，只要確認最終的「自用住宅購屋借款利息可扣除金額」數字正確即可。若覺得數字有誤，可向所轄國稅局查詢。",
      },
    ],
  },
];

const FAQS = [
  {
    q: "為什麼房貸利息扣除額要先扣儲蓄投資特別扣除額？",
    a: "政府的規定是：自用住宅購屋借款利息 = min(實際利息, 300,000) - 已申報的儲蓄投資特別扣除額。邏輯是：若你有大量存款在銀行賺利息（享受儲蓄投資扣除），代表你有財力，房貸利息的節稅優惠就相應縮減。儲蓄投資特別扣除額越高，房貸利息可申報金額越少。",
  },
  {
    q: "第 2 間房的房貸利息可以申報嗎？",
    a: "不行。自用住宅購屋借款利息扣除額只限一戶自用住宅。若有兩間房子都有貸款，只能擇一申報，且必須是本人、配偶或受扶養直系親屬實際居住的自用住宅。出租房屋、空置投資房的貸款利息不能以此扣除。",
  },
  {
    q: "房屋在父母名下，但我每月繳房貸，我可以申報嗎？",
    a: "一般情況不行。申報房貸利息的前提是：借款人（或共同借款人）是申報人本人、配偶或受扶養直系親屬，且房屋所有權也在相同範圍內。若房屋登記在父母名下，貸款也是父母的，你只是幫忙繳款，通常無法申報。建議諮詢當地國稅局確認具體情況。",
  },
  {
    q: "選了標準扣除額，還能申報房貸利息嗎？",
    a: "不能。自用住宅購屋借款利息是列舉扣除額的項目，選標準扣除額就無法申報。建議把房貸利息（扣儲蓄投資扣除額後）+ 保險費 + 健保費 + 其他列舉項目加總，若超過標準扣除額（個人 131,000、夫妻 262,000），選列舉才划算，房貸利息才能發揮節稅效果。",
  },
  {
    q: "增貸（如裝潢貸款、青年安心成家貸款增額）的利息可以申報嗎？",
    a: "增貸部分的利息通常不能申報。自用住宅購屋借款利息扣除額的「購屋借款」原則上是指購置房屋的原始貸款，用於裝潢、週轉等用途的增貸不屬於購屋用途。不過，若是青年安心成家優惠貸款等政策性貸款，建議向國稅局或銀行確認可申報的利息金額。",
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

export default function MortgageInterestDeduction2026Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline:
          "自用住宅購屋借款利息扣除額 2026｜房貸利息怎麼抵稅、最高30萬完整攻略",
        description:
          "114年度自用住宅購屋借款利息列舉扣除額最高300,000元。可扣金額 = 實際利息 - 儲蓄投資特別扣除額。選列舉扣除額才能使用。",
        url: "https://www.twtaxcalc.com/mortgage-interest-deduction-2026",
        author: { "@type": "Organization", name: "台灣財務試算" },
        publisher: { "@type": "Organization", name: "台灣財務試算" },
        datePublished: "2026-04-16",
        dateModified: "2026-04-16",
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
        {/* Nav */}
        <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
          <div className="mx-auto max-w-4xl px-4">
            <div className="flex gap-1 overflow-x-auto py-2 text-xs">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href + (("active" in l && l.active) ? "-active" : "")}
                  href={l.href}
                  className={`shrink-0 rounded-lg px-3 py-1.5 font-medium transition ${"active" in l && l.active ? "bg-orange-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
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
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-sm font-medium text-orange-700">
              114年度報稅・有房貸必看
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              房貸利息可以抵稅？
              <br />
              <span className="text-orange-600">自用住宅借款利息扣除額完整攻略</span>
            </h1>
            <p className="mt-3 text-base text-gray-500">
              每年最多扣除 300,000 元房貸利息。
              <span className="font-semibold text-orange-700">
                重點：可申報金額 = 實際利息 - 儲蓄投資特別扣除額，很多人搞錯這個公式。
              </span>
            </p>
          </div>

          {/* Key insight alert */}
          <div className="mb-8 rounded-2xl border border-orange-200 bg-orange-50 p-5">
            <p className="text-sm font-bold text-orange-800">
              💡 最多人不知道的規則：房貸利息可申報金額要先扣掉「已申報的儲蓄投資特別扣除額」。如果你申報了 27 萬儲蓄投資扣除，即使有 30 萬房貸利息，實際能扣的只剩 3 萬。計算時別漏這一步。
            </p>
          </div>

          {/* Quick summary cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: "🏠", label: "上限金額", desc: "每戶每年最高 300,000 元" },
              { icon: "🧮", label: "計算公式", desc: "利息 - 儲蓄投資特別扣除額" },
              { icon: "📋", label: "申報前提", desc: "必須選擇列舉扣除額" },
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

          {/* CTA */}
          <div className="mb-8 rounded-2xl border border-orange-200 bg-orange-50 p-6 text-center">
            <p className="mb-1 text-sm font-medium text-orange-700">加入房貸利息扣除後，全年稅額是多少？</p>
            <p className="mb-4 text-xl font-bold text-orange-900">輸入所得和房貸資訊，30秒算出實際稅額</p>
            <Link
              href="/tax-calculator"
              className="inline-block rounded-xl bg-orange-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-700"
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
                    <span className={`rounded-xl ${c.icon} p-2 text-xl`}>{section.icon}</span>
                    <h2 className={`text-lg font-bold ${c.title}`}>{section.title}</h2>
                  </div>
                  <p className="mb-4 text-sm text-gray-700">{section.content}</p>
                  <div className="space-y-3">
                    {section.details.map((d) => (
                      <div key={d.label} className="rounded-xl bg-white/60 p-4">
                        <p className={`mb-1 text-xs font-bold ${c.detail}`}>{d.label}</p>
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
                <div key={faq.q} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-bold text-gray-900">Q：{faq.q}</p>
                  <p className="text-sm text-gray-600">A：{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related tools */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">相關工具與頁面</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { href: "/tax-calculator", label: "報稅試算", desc: "輸入所得直接算稅額" },
                { href: "/mortgage", label: "房貸計算機", desc: "月付、總利息完整試算" },
                { href: "/deduction-compare", label: "列舉vs標準扣除額", desc: "哪種扣法省稅更多" },
                { href: "/insurance-deduction-2026", label: "保險費扣除額", desc: "每人最高24,000元" },
                { href: "/savings-deduction-2026", label: "儲蓄投資扣除額", desc: "影響房貸利息計算" },
                { href: "/rent-deduction-2026", label: "房租抵稅", desc: "租屋族列舉最高12萬" },
                { href: "/legal-tax-savings-2026", label: "省稅10招", desc: "合法節稅完整攻略" },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="flex flex-col rounded-xl border border-gray-200 p-4 transition hover:border-orange-400 hover:bg-orange-50"
                >
                  <p className="font-semibold text-gray-900">{tool.label}</p>
                  <p className="mt-1 text-xs text-gray-500">{tool.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 rounded-2xl border border-orange-200 bg-orange-50 p-6 text-center">
            <p className="mb-1 text-sm font-medium text-orange-700">報稅截止：2026年5月31日</p>
            <p className="mb-4 text-xl font-bold text-orange-900">確認房貸利息扣除後，試算全年稅額</p>
            <Link
              href="/tax-calculator"
              className="inline-block rounded-xl bg-orange-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-700"
            >
              立即試算 →
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
