import type { Metadata } from "next";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

export const metadata: Metadata = {
  title: "捐款可以抵稅？捐款節稅完整攻略 2026｜哪些捐款有效、上限多少 - 台灣財務試算",
  description:
    "捐款給廟宇可以抵稅嗎？答案是不行。114年度捐款列舉扣除額：哪些機構的捐款可申報、上限是綜合所得的20%、怎麼在eTax填報，一次說清楚。",
  keywords: [
    "捐款抵稅",
    "捐款節稅",
    "捐款扣除額",
    "捐款可以扣稅嗎",
    "114年捐款扣除",
    "公益捐款抵稅",
    "捐款列舉扣除",
    "慈善捐款報稅",
    "捐款申報所得稅",
    "哪些捐款可以抵稅",
    "廟宇捐款抵稅",
    "捐款節稅2026",
  ],
  openGraph: {
    title: "捐款可以抵稅？捐款節稅完整攻略 2026｜哪些捐款有效、上限多少",
    description:
      "捐款給廟宇可以抵稅嗎？答案是不行。114年度捐款列舉扣除：哪些機構可申報、上限是綜所的20%、eTax怎麼填。",
    url: "https://www.twtaxcalc.com/donation-deduction-2026",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/donation-deduction-2026",
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
  { href: "/donation-deduction-2026", label: "捐款節稅", active: true },
];

const SECTIONS = [
  {
    id: "what-qualifies",
    icon: "✅",
    title: "哪些捐款可以申報扣除？",
    color: "green",
    content:
      "不是所有捐款都能抵稅。所得稅法明確規定「捐贈對象」，捐款給不符合資格的機構，即使有收據也不能申報。申報前先確認捐款對象是否在清單上。",
    details: [
      {
        label: "可以申報（無上限）：向政府機關捐贈",
        text: "捐給政府機關、國防、教育、文化、公益、慈善機構，以及各級政府和依法設立的國立學校，可以全額申報，沒有綜所比例上限。例如：捐給衛福部、縣市政府的防災捐款、對公立大學的捐贈。",
      },
      {
        label: "可以申報（上限20%綜合所得）：符合資格的公益法人",
        text: "捐給財政部認可的公益慈善法人、教育文化機構、體育團體，可申報金額上限為綜合所得總額的20%。例如：慈濟、世界展望會、台灣癌症基金會、紅十字會、各私立大學等。超過20%的部分不能申報。",
      },
      {
        label: "可以申報（有限制）：政黨捐款",
        text: "依政治獻金法，個人捐給政黨、政治人物的捐款，可列舉扣除，但有嚴格上限：捐給同一政黨不得超過20萬元/年，捐給政治人物不得超過10萬元/年，且合計不超過綜合所得總額的20%。",
      },
      {
        label: "不能申報：廟宇、教堂、未登記團體",
        text: "這是最常見的誤解。捐給廟宇、寺廟、地方宮廟，即使金額很大，也不能申報扣除。原因：廟宇通常不是財政部認可的公益法人，不符合所得稅法規定的捐贈對象。同理，未向政府登記的社團、私人救助也不能申報。",
      },
    ],
  },
  {
    id: "limits",
    icon: "📊",
    title: "捐款扣除額上限：怎麼計算？",
    color: "blue",
    content:
      "捐款扣除額的上限不是固定金額，而是你的「綜合所得總額的20%」。所得越高，可申報的捐款上限越高。",
    details: [
      {
        label: "計算公式",
        text: "捐款扣除上限 = 綜合所得總額 × 20%。例如：年收入100萬，最多可申報20萬的捐款扣除。實際捐款額若低於20萬，以實際金額申報；若超過20萬，只能申報20萬。（向政府捐贈不受此限制，可全額申報。）",
      },
      {
        label: "試算範例：上班族年薪80萬捐了5萬",
        text: "綜合所得總額80萬 × 20% = 16萬上限。實際捐款5萬 < 16萬上限，可全額申報5萬。在選擇列舉扣除額時，5萬捐款 + 人身保險2.4萬 + 健保費0.9萬 = 8.3萬。單身標準扣除額12.4萬 > 8.3萬，這種情況選標準扣除額反而更省稅。",
      },
      {
        label: "捐款讓列舉划算的門檻",
        text: "選列舉扣除額要超過標準扣除額（單身12.4萬、夫妻24.8萬）才有意義。一般人常見的列舉組合：保險費（最高2.4萬/人）+ 健保費 + 租屋費用（最高12萬）+ 捐款。若沒有房租，光靠捐款+保險，很少能超過標準扣除額，多數人還是選標準比較省稅。",
      },
    ],
  },
  {
    id: "how-to-file",
    icon: "📱",
    title: "eTax怎麼填捐款扣除額",
    color: "purple",
    content:
      "在財政部eTax Portal填報捐款扣除額時，需要有正式的捐款收據，並在正確欄位填入金額。步驟如下。",
    details: [
      {
        label: "步驟1：準備捐款收據",
        text: "捐款機構應提供正式收據，上面要有：機構名稱、捐款人姓名身份證號、捐款金額、日期。許多財政部認可的機構（如慈濟、展望會）年底會主動寄出年度捐款證明，這就是申報憑證。若沒收到，主動向機構索取。",
      },
      {
        label: "步驟2：在eTax選列舉扣除額，填入捐款金額",
        text: "進入申報流程 → 選「列舉扣除額」→ 找到「捐贈」欄位，依收據金額填入。部分機構的捐款資料已預填入系統（財政部有資料交換），但仍需核對金額是否正確。若有多筆捐款，逐一填入合計。",
      },
      {
        label: "步驟3：確認合計是否超過標準扣除額",
        text: "填完所有列舉項目後，系統會顯示列舉扣除額合計。若合計低於標準扣除額（單身12.4萬），改選標準扣除額比較省稅。若高於標準，選列舉。保留所有捐款收據至少5年，國稅局可能抽查。",
      },
    ],
  },
  {
    id: "strategy",
    icon: "💡",
    title: "捐款抵稅的最優策略",
    color: "orange",
    content:
      "很多人誤以為「多捐就多省稅」。實際上，捐款能省多少稅，取決於你的稅率和列舉扣除額的整體規劃。這是正確的思考方式。",
    details: [
      {
        label: "省稅金額 = 捐款額 × 你的邊際稅率",
        text: "捐款1萬元能省多少稅？取決於你的所得稅率：5%稅率 → 省500元；12%稅率 → 省1,200元；20%稅率 → 省2,000元；30%稅率 → 省3,000元；40%稅率 → 省4,000元。高所得者捐款的稅務效益明顯更高。",
      },
      {
        label: "何時捐款節稅效果最大",
        text: "若你今年有大筆資本利得（不計入綜合所得）、轉職加薪、或預期明年收入下降，今年捐款的稅率比明年高，今年申報效益最大。另外，若你已確定要選列舉扣除額（有大額房貸利息或房租），再加上捐款，邊際效益最高。",
      },
      {
        label: "只有選列舉才能用捐款扣除額",
        text: "若你選標準扣除額（最常見情況），捐款扣除額完全無效。只有在選列舉扣除額時，捐款才算進去。所以捐款前確認：你的列舉合計（捐款+保險+租屋+其他）是否能超過標準扣除額，否則捐款對你的稅沒有影響。",
      },
    ],
  },
  {
    id: "traps",
    icon: "⚠️",
    title: "4個常見誤解",
    color: "red",
    content:
      "每到報稅季，這4個關於捐款抵稅的誤解反覆出現。避開這些，不要讓誤解讓你浪費節稅機會或申報錯誤。",
    details: [
      {
        label: "誤解1：捐給廟宇可以抵稅",
        text: "不行。廟宇、宮廟、寺廟通常不是財政部認可的公益法人，捐款不能申報扣除。有些廟宇有另外設立基金會（如某某基金會），若有財政部認可，基金會部分的捐款才能申報。捐款前確認機構是否在財政部公告清單上。",
      },
      {
        label: "誤解2：捐越多稅退越多",
        text: "捐款扣除額只在你選列舉扣除額、且列舉合計超過標準扣除額時才有效。多數上班族選標準扣除額，捐款對稅額完全沒影響。即使選列舉，「省稅」不等於「賺到」，捐1萬最多省4,000元（40%稅率），實際支出仍是6,000元。",
      },
      {
        label: "誤解3：沒有收據沒關係，自己填就好",
        text: "不行。捐款扣除額必須有正式收據或捐款證明文件，才能申報。若被國稅局查核要求提供憑證，提不出來的話，扣除額會被剔除，還要補稅加罰款。捐款記得索取收據，並保留至少5年。",
      },
      {
        label: "誤解4：每年都可以無限申報",
        text: "不是，上限是綜合所得總額的20%（向政府機關例外）。若年收入60萬，最多只能申報12萬的捐款，超出部分不能列舉。另外，政黨捐款有更嚴格的獨立上限（同一政黨最高20萬）。",
      },
    ],
  },
];

const FAQS = [
  {
    q: "捐款給廟宇可以申報扣除額嗎？",
    a: "通常不行。廟宇、宮廟、寺廟若未向財政部登記為公益法人，捐款不能申報列舉扣除額。確認方法：到財政部網站查詢「捐贈扣除額資格審查認可名冊」，確認該機構是否在清單上。若廟宇有另設財團法人基金會且經認可，則對基金會的捐款才能申報。",
  },
  {
    q: "捐款扣除額上限是多少？",
    a: "向財政部認可的公益慈善法人、教育文化體育機構捐款，申報上限為綜合所得總額的20%。例如年收入100萬，最多申報20萬的捐款扣除。向政府機關捐款無比例限制，可全額申報。向政黨捐款有獨立上限（同一政黨最高20萬/年）。",
  },
  {
    q: "我捐款給慈濟、世界展望會，可以申報嗎？",
    a: "可以，這兩個都是財政部認可的公益慈善法人，捐款可列舉申報扣除，上限為綜合所得總額的20%。年底機構通常會主動寄出年度捐款收據（合計證明），可直接作為申報憑證。若未收到，可向機構索取。",
  },
  {
    q: "我選標準扣除額，捐款可以抵稅嗎？",
    a: "不行。捐款列舉扣除額只在你選「列舉扣除額」時才有效。若你選標準扣除額（單身12.4萬、夫妻24.8萬），捐款金額對稅額完全沒有影響。多數上班族的列舉合計（保險費+健保費等）達不到標準扣除額，所以選標準扣除額，捐款對稅沒有作用。",
  },
  {
    q: "捐款收據沒有，可以用信用卡帳單申報嗎？",
    a: "不建議單靠信用卡帳單。申報捐款扣除額需要機構開立的正式收據（載有機構名稱、捐款人姓名身份證號、金額、日期）。信用卡帳單或轉帳記錄可以作為佐證，但主要憑證還是正式收據。若被查核，需提供收據；提不出來的話，扣除額會被剔除，應補稅加罰款。",
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

export default function DonationDeduction2026Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "捐款可以抵稅？捐款節稅完整攻略 2026｜哪些捐款有效、上限多少",
        description:
          "捐款給廟宇可以抵稅嗎？答案是不行。114年度捐款列舉扣除額：哪些機構的捐款可申報、上限是綜合所得的20%、怎麼在eTax填報，一次說清楚。",
        url: "https://www.twtaxcalc.com/donation-deduction-2026",
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
              114年度報稅・捐款族必看
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              捐款可以抵稅嗎？
              <br />
              哪些捐款有效、上限多少
            </h1>
            <p className="mt-3 text-base text-gray-500">
              捐給廟宇不算，捐給慈濟才算。
              <span className="font-semibold text-green-700">
                符合財政部認可的捐款可列舉扣除，上限為綜合所得總額的20%，選列舉才有效。
              </span>
            </p>
          </div>

          {/* Warning alert */}
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5">
            <p className="text-sm font-bold text-red-800">
              ⚠️ 很多人不知道：捐給廟宇、宮廟的錢，不能申報捐款扣除額。只有財政部認可的公益法人或政府機關才算。
            </p>
          </div>

          {/* Quick summary cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: "✅", label: "可申報上限", desc: "綜合所得總額 × 20%（政府機關無限制）" },
              { icon: "📋", label: "申報方式", desc: "選列舉扣除額才有效" },
              { icon: "⚠️", label: "廟宇捐款", desc: "通常不能申報，需確認是否公益法人" },
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
          <div className="mb-8 rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
            <p className="mb-1 text-sm font-medium text-green-700">捐款 + 保險 + 房租，選列舉還是標準？</p>
            <p className="mb-4 text-xl font-bold text-green-900">輸入所得與扣除額，30秒看清楚哪個省稅</p>
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
            <h2 className="mb-4 text-xl font-bold text-gray-900">相關工具</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { href: "/tax-calculator", label: "報稅試算", desc: "輸入所得直接算稅額" },
                { href: "/deduction-compare", label: "列舉vs標準扣除額", desc: "哪種扣除額更省稅" },
                { href: "/legal-tax-savings-2026", label: "省稅10招", desc: "合法節稅完整攻略" },
                { href: "/dependent-deduction", label: "扶養節稅", desc: "扶養親屬免稅額計算" },
                { href: "/rent-deduction-2026", label: "房租抵稅", desc: "租屋費用扣除額最高12萬" },
                { href: "/preschool-deduction", label: "幼兒學前扣除", desc: "5歲以下子女扣除額" },
                { href: "/tax-checklist-2026", label: "報稅懶人包", desc: "備齊資料不漏報" },
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
            <p className="mb-4 text-xl font-bold text-green-900">確認捐款扣除額後，試算全年稅額</p>
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
