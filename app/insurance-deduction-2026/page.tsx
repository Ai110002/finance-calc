import type { Metadata } from "next";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

export const metadata: Metadata = {
  title: "人身保險費列舉扣除額 2026｜壽險健康險怎麼抵稅、每人24,000元完整攻略 - 台灣財務試算",
  description:
    "114年度人身保險費列舉扣除額每人最高24,000元，壽險、健康險、傷害險均適用。全民健保費另外申報無上限。必須選列舉扣除額才能使用。完整說明條件、省稅金額、eTax操作。",
  keywords: [
    "人身保險費扣除額",
    "保險費列舉扣除",
    "壽險抵稅",
    "健康險報稅",
    "保險費報稅",
    "114年保險費扣除",
    "保險費列舉扣除2026",
    "人身保險報稅",
    "保費抵稅",
    "健保費報稅",
    "保險費所得稅",
    "保險費節稅2026",
  ],
  openGraph: {
    title: "人身保險費列舉扣除額 2026｜壽險健康險怎麼抵稅、每人24,000元完整攻略",
    description:
      "114年度人身保險費列舉扣除額每人最高24,000元，壽險、健康險、傷害險均適用。全民健保費另外申報無上限。必須選列舉扣除額才能使用。",
    url: "https://www.twtaxcalc.com/insurance-deduction-2026",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/insurance-deduction-2026",
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
  { href: "/insurance-deduction-2026", label: "保險費扣除額", active: true },
  { href: "/mortgage-interest-deduction-2026", label: "房貸利息扣除額" },
];

const SECTIONS = [
  {
    id: "what-is",
    icon: "🛡️",
    title: "什麼是人身保險費列舉扣除額？",
    color: "blue",
    content:
      "人身保險費是《所得稅法》第17條「列舉扣除額」的一種。每人每年最高可申報 24,000 元的人身保險費，包含壽險、健康險、傷害險、年金險。全民健保保費不受 24,000 元上限限制，可另外全額申報。重點：必須選「列舉扣除額」才能使用，選了標準扣除額就用不到。",
    details: [
      {
        label: "每人每年上限 24,000 元（人身保險）",
        text: "每位申報成員的人身保險費，每年可列舉扣除最高 24,000 元。家中 4 人（申報人、配偶、2 位受扶養直系親屬），最多可申報 4 × 24,000 = 96,000 元。注意：上限是以人頭計算，而非每戶。",
      },
      {
        label: "全民健保費：無 24,000 上限，另外全額申報",
        text: "全民健保費（含補充保費）不適用 24,000 元上限，可依實際繳交金額全數列舉扣除。例如：本人全年繳納健保費 30,000 元、人身保險費 20,000 元，可申報 30,000（健保） + 20,000（人身保險，未達上限）= 50,000 元。",
      },
      {
        label: "這是「列舉扣除額」，選標準扣除額就用不到",
        text: "人身保險費是列舉扣除額的一部分，與標準扣除額二選一。2026 年（114 年度）標準扣除額：個人 131,000 元、夫妻 262,000 元。若你的列舉扣除額（保險費 + 房租 + 醫藥費 + 其他）合計低於標準扣除額，選標準扣除額反而更划算。",
      },
    ],
  },
  {
    id: "which-insurance",
    icon: "📋",
    title: "哪些保險費可以申報？哪些不行？",
    color: "green",
    content:
      "「人身保險」是關鍵詞。只有以人身為保障對象的保險費可以列舉，財產保險（如車險、房屋火險）不適用。",
    details: [
      {
        label: "可以申報的人身保險（每人上限 24,000）",
        text: "壽險（定期壽險、終身壽險）、健康險（醫療險、癌症險、重大疾病險）、傷害險（意外險）、年金保險（商業年金）、投資型保單的保障部分（純保費，非投資部分）。以上均屬「人身保險費」，每人每年可申報合計最高 24,000 元。",
      },
      {
        label: "不能申報的保險費",
        text: "強制汽車責任險、任意汽車險（車碰險、第三人責任險）、房屋火險、地震險、旅遊不便險（非人身類）。這些屬於財產保險或非人身保險，不能以「人身保險費列舉扣除額」申報。注意：旅平險（旅遊平安險）屬人身保險，可以申報。",
      },
      {
        label: "全民健保費：另外申報，無 24,000 上限",
        text: "全民健保保費（第一類、第二類、第三類被保險人自付部分）及補充保費，不受 24,000 元上限限制，可全額列舉扣除，且在「健保費」欄位申報，與「人身保險費」分開計算。兩個欄位合計才是你的保險類列舉扣除總額。",
      },
      {
        label: "幫受扶養直系親屬繳的保費：可以申報",
        text: "申報人為受扶養的直系親屬（父母、子女、祖父母等）繳納的人身保險費，可以合併在申報人的列舉扣除中，每位受扶養者各自計算上限 24,000 元。例如：幫父親繳的壽險費 18,000、幫母親繳的醫療險費 20,000，父親申報 18,000、母親申報 20,000（均未超上限）。",
      },
    ],
  },
  {
    id: "tax-savings",
    icon: "💰",
    title: "能省多少稅？各稅率實際試算",
    color: "orange",
    content:
      "省稅金額 = 可申報保險費 × 邊際稅率。稅率越高、申報人數越多，節稅效果越大。以下以常見情境試算。",
    details: [
      {
        label: "單人申報（每年保費達 24,000 上限）",
        text: "可申報 24,000 元人身保險費，各稅率省稅金額：5% → 省 1,200 元；12% → 省 2,880 元；20% → 省 4,800 元；30% → 省 7,200 元；40% → 省 9,600 元。另若有健保費，可額外全額扣除。",
      },
      {
        label: "夫妻 + 2 子女（4 人均達 24,000 上限）",
        text: "4 人合計可申報 96,000 元人身保險費。稅率 12%：省 11,520 元；稅率 20%：省 19,200 元；稅率 30%：省 28,800 元。加上 4 人的全民健保費（假設每人年繳 25,000，合計 10 萬），列舉保險類扣除可達 20 萬，超過標準扣除額 26.2 萬的難度降低。",
      },
      {
        label: "列舉 vs 標準：什麼時候值得選列舉？",
        text: "個人標準扣除額 131,000 元，夫妻 262,000 元。若你的列舉扣除額合計（保險費 + 醫藥費 + 房租/房貸利息 + 捐款 + 其他）超過標準扣除額，選列舉才划算。保險費通常不夠單獨撐起列舉優勢，但配合其他列舉項目（如房貸利息、捐款）就可能超過。",
      },
    ],
  },
  {
    id: "vs-standard",
    icon: "📊",
    title: "列舉扣除額 vs 標準扣除額：如何決定？",
    color: "purple",
    content:
      "選列舉還是標準，核心邏輯只有一個：哪個金額大就選哪個。列舉扣除額包含多個項目，要全部加總後再比較。",
    details: [
      {
        label: "列舉扣除額的組成項目",
        text: "捐贈、人身保險費（每人上限 24,000）、醫藥及生育費（無上限，需收據）、災害損失（需核定）、自用住宅借款利息（上限 30 萬，需扣儲蓄投資扣除額）、房屋租金支出（上限 12 萬，與房貸利息擇一）。以上項目合計如超過標準扣除額（個人 131,000、夫妻 262,000），才值得選列舉。",
      },
      {
        label: "實際試算範例：夫妻有房貸 + 保費",
        text: "假設夫妻合報：人身保險費（4人）= 80,000、全民健保費（4人）= 80,000、房貸利息 = 200,000（扣儲蓄投資扣除額後）、捐款 = 20,000。列舉合計 = 380,000 > 標準扣除額 262,000。選列舉可多扣 118,000，稅率 20% 省稅 23,600 元。",
      },
      {
        label: "常見誤解：全民健保費選標準也能申報？",
        text: "不能。全民健保費是列舉扣除額的一部分（雖然無上限），若選了標準扣除額，健保費就無法另外扣除。因此：若你的健保費 + 人身保險費 + 其他列舉項目合計超過標準扣除額，選列舉才合理。",
      },
    ],
  },
  {
    id: "how-to-file",
    icon: "💻",
    title: "eTax 怎麼申報保險費列舉扣除額",
    color: "green",
    content:
      "eTax 系統在列舉扣除額欄位有「人身保險費」和「全民健保費」兩個獨立欄位。全民健保費通常自動帶入，人身保險費需手動輸入。",
    details: [
      {
        label: "步驟 1：切換為列舉扣除額",
        text: "登入 eTax 後，在「扣除額選擇」頁面，確認選擇「列舉扣除額」（而非標準扣除額）。系統可能預設標準扣除額，需手動切換。切換後，系統會顯示各列舉項目的輸入欄位。",
      },
      {
        label: "步驟 2：填入人身保險費金額",
        text: "在「列舉扣除額 → 人身保險費」欄位，輸入本人、配偶及受扶養直系親屬的人身保險費實際金額（每人上限 24,000 元）。系統通常不會自動帶入，需依據保費繳費收據或保險公司年度扣繳憑單填入。",
      },
      {
        label: "步驟 3：確認全民健保費已帶入",
        text: "全民健保費通常由系統自動帶入（來自健保署資料）。在「列舉扣除額 → 全民健保費」欄位確認金額是否正確。若有補充保費（如股利所得的 2.11%），需確認是否完整帶入。有疑問可向各地健保署分區辦事處查詢。",
      },
    ],
  },
];

const FAQS = [
  {
    q: "人身保險費 24,000 是每戶還是每人的上限？",
    a: "每人。家中每位申報成員（本人、配偶、受扶養直系親屬）各自有 24,000 元的上限。例如：夫妻 + 2 位受扶養子女，共 4 人，最多可申報 4 × 24,000 = 96,000 元的人身保險費。這與儲蓄投資特別扣除額（每戶上限 27 萬）的計算方式不同。",
  },
  {
    q: "車險、房屋火險可以申報保險費扣除額嗎？",
    a: "不行。車險（強制險、任意險）、房屋火險、地震險屬於財產保險，不屬於「人身保險」，無法申報人身保險費列舉扣除額。只有以人身為保障對象的保險（壽險、健康險、傷害險、年金險等）才能申報，每人每年上限 24,000 元。",
  },
  {
    q: "選了標準扣除額，全民健保費還可以申報嗎？",
    a: "不行。全民健保費是「列舉扣除額」的一部分，選擇標準扣除額就無法另外申報健保費。因此，如果你的全民健保費 + 人身保險費 + 其他列舉項目（如房貸利息、捐款）合計超過標準扣除額（個人 131,000、夫妻 262,000），選擇列舉扣除額才能節稅。",
  },
  {
    q: "幫父母買的保險，保費可以申報嗎？",
    a: "可以，前提是父母已被你列為受扶養直系親屬。若父母是你的申報扶養對象，你為他們繳納的人身保險費（壽險、健康險等）可納入你的列舉扣除，每位父母各自計算 24,000 元上限。但若父母自行申報所得稅（不被你扶養），則他們的保費由他們自己申報。",
  },
  {
    q: "投資型保單的保費也可以申報嗎？",
    a: "只有投資型保單中「保障部分」的純保費可以申報，投資部分（進入投資帳戶的金額）不能列舉扣除。實際上，保險公司每年會出具「人身保險費扣除憑單」，上面記載可申報的保費金額，直接依憑單填報即可，不需要自己區分。",
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

export default function InsuranceDeduction2026Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline:
          "人身保險費列舉扣除額 2026｜壽險健康險怎麼抵稅、每人24,000元完整攻略",
        description:
          "114年度人身保險費列舉扣除額每人最高24,000元，壽險、健康險、傷害險均適用。全民健保費另外申報無上限。必須選列舉扣除額才能使用。",
        url: "https://www.twtaxcalc.com/insurance-deduction-2026",
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
        {/* Nav */}
        <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
          <div className="mx-auto max-w-4xl px-4">
            <div className="flex gap-1 overflow-x-auto py-2 text-xs">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href + (("active" in l && l.active) ? "-active" : "")}
                  href={l.href}
                  className={`shrink-0 rounded-lg px-3 py-1.5 font-medium transition ${"active" in l && l.active ? "bg-green-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
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
              114年度報稅・有買保險必看
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              保險費可以抵稅？
              <br />
              <span className="text-green-600">人身保險費列舉扣除額完整攻略</span>
            </h1>
            <p className="mt-3 text-base text-gray-500">
              壽險、健康險、意外險每人每年最多扣除 24,000 元。
              <span className="font-semibold text-green-700">
                全民健保費另外計算，無上限可全額申報。必須選列舉扣除額才能用。
              </span>
            </p>
          </div>

          {/* Key insight alert */}
          <div className="mb-8 rounded-2xl border border-green-200 bg-green-50 p-5">
            <p className="text-sm font-bold text-green-800">
              💡 重要提醒：保險費是「列舉扣除額」，選了標準扣除額就用不到。如果你的保費 + 健保費 + 房貸利息 + 捐款合計超過標準扣除額（個人 131,000、夫妻 262,000），選列舉才划算，保費才能發揮節稅效果。
            </p>
          </div>

          {/* Quick summary cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: "🛡️", label: "人身保險費上限", desc: "每人每年最高 24,000 元" },
              { icon: "🏥", label: "全民健保費", desc: "無上限，可全額另外申報" },
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
          <div className="mb-8 rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
            <p className="mb-1 text-sm font-medium text-green-700">加入保險費扣除後，全年稅額是多少？</p>
            <p className="mb-4 text-xl font-bold text-green-900">輸入所得和扣除項目，30秒算出實際稅額</p>
            <Link
              href="/tax-calculator"
              className="inline-block rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-700"
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
                { href: "/deduction-compare", label: "列舉vs標準扣除額", desc: "哪種扣法省稅更多" },
                { href: "/mortgage-interest-deduction-2026", label: "房貸利息扣除額", desc: "列舉扣除最高30萬" },
                { href: "/donation-deduction-2026", label: "捐款節稅", desc: "列舉扣除最大化" },
                { href: "/disability-deduction-2026", label: "身障扣除額", desc: "特別扣除額21.8萬" },
                { href: "/savings-deduction-2026", label: "儲蓄投資扣除", desc: "利息收入27萬免稅" },
                { href: "/legal-tax-savings-2026", label: "省稅10招", desc: "合法節稅完整攻略" },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="flex flex-col rounded-xl border border-gray-200 p-4 transition hover:border-green-400 hover:bg-green-50"
                >
                  <p className="font-semibold text-gray-900">{tool.label}</p>
                  <p className="mt-1 text-xs text-gray-500">{tool.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
            <p className="mb-1 text-sm font-medium text-green-700">報稅截止：2026年5月31日</p>
            <p className="mb-4 text-xl font-bold text-green-900">確認列舉vs標準，試算全年稅額</p>
            <Link
              href="/tax-calculator"
              className="inline-block rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-700"
            >
              立即試算 →
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
