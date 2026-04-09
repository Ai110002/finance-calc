import type { Metadata } from "next";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

export const metadata: Metadata = {
  title: "長期照顧特別扣除額 2026 完整攻略｜每人12萬、排富條款、外籍看護怎麼申報 - 台灣財務試算",
  description:
    "114年度長期照顧特別扣除額每人最高12萬元，適用失能、長照服務、外籍看護等情形。但有排富條款：稅率20%以上者不得適用。這篇說清楚條件、排富判斷、與身障扣除額的差異。",
  keywords: [
    "長期照顧特別扣除額",
    "長照扣除額",
    "長期照顧報稅",
    "長照扣除2026",
    "老人照護報稅",
    "外籍看護報稅",
    "長照特別扣除",
    "114年長期照顧扣除",
    "長照服務申報所得稅",
    "長照排富條款",
    "長期照顧節稅",
    "失能老人報稅",
  ],
  openGraph: {
    title: "長期照顧特別扣除額 2026 完整攻略｜每人12萬、排富條款、外籍看護怎麼申報",
    description:
      "114年度長期照顧特別扣除額每人12萬。失能認定、外籍看護、排富條款（稅率20%以上不適用）全部說清楚，與身障扣除額怎麼選也一併解答。",
    url: "https://www.twtaxcalc.com/ltc-deduction-2026",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/ltc-deduction-2026",
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
  { href: "/savings-deduction-2026", label: "儲蓄投資扣除額" },
  { href: "/salary-deduction-2026", label: "薪資所得扣除額" },
  { href: "/disability-deduction-2026", label: "身心障礙扣除額" },
  { href: "/ltc-deduction-2026", label: "長照特別扣除額", active: true },
];

const SECTIONS = [
  {
    id: "what-is",
    icon: "🏥",
    title: "什麼是長期照顧特別扣除額？",
    color: "blue",
    content:
      "長期照顧特別扣除額是2018年（107年）新增的節稅項目，針對需要照顧失能者的家庭給予稅務減免。114年度每人120,000元（定額扣除，自設立以來金額未調整）。有三種情況可以申報，但同時設有排富條款。",
    details: [
      {
        label: "114年度金額：每位被照顧者 120,000 元",
        text: "長期照顧特別扣除額是每位「被照顧者」12萬元，不是申報人本人。若家中有兩位符合長照條件的成員（例如父親與母親），可分別各申報12萬，合計24萬。這個金額自107年設立以來均維持12萬，未隨通膨調整（不同於薪資所得特別扣除額）。",
      },
      {
        label: "適用對象：被照顧者，非申報人",
        text: "申報的是「被照顧者」的身份——即本人、配偶、或受扶養親屬中符合長照條件者。申報人（支出照顧費用的人）本身不用符合任何條件，只需確認被照顧者符合資格，且自己的稅率未超過排富門檻。",
      },
      {
        label: "三種適用情況（符合其一即可申報）",
        text: "（1）依長期照顧服務法接受評估，核定需要長照服務，並使用長照服務者（有長照核定通知書）；（2）依身心障礙者日間照顧及住宿式服務機構設立許可及管理辦法使用服務者；（3）家中聘僱外籍家庭看護工，且已依法取得外籍看護聘僱許可者。",
      },
    ],
  },
  {
    id: "anti-rich",
    icon: "⚠️",
    title: "排富條款：以下三種情況不得申報",
    color: "orange",
    content:
      "長期照顧特別扣除額設有排富條款，以下三個條件「有一就不能申報」。這是最多人踩雷的地方，申報前務必先確認自己是否符合。",
    details: [
      {
        label: "排富條款1：綜合所得稅適用稅率20%以上者，不得申報",
        text: "若申報人（計算稅額的人）全年綜合所得淨額對應的所得稅率達到20%以上，即不能申報長期照顧特別扣除額。114年度稅率20%對應的所得淨額門檻為：單身超過約1,120,001元至2,800,000元（20%級距）、合併申報夫妻合計超過相應門檻。判斷方式：先計算「加入長照扣除額前」的所得稅，確認稅率落在5%或12%，才能申報。",
      },
      {
        label: "排富條款2：選擇股利所得按28%分開計算者，不得申報",
        text: "若當年度選擇股利所得「分開計算，按28%課稅」（而非合併計稅），則全家（納稅義務人、配偶、受扶養親屬）均不得申報長期照顧特別扣除額。有大量股利且稅率高的投資人通常選28%分開，這種情況就無法使用長照扣除額。",
      },
      {
        label: "排富條款3：基本所得額超過670萬者，不得申報",
        text: "依最低稅負制，基本所得額（綜合所得淨額 + 海外所得 + 未上市股票交易所得等）超過670萬元的納稅義務人，不得申報長期照顧特別扣除額。一般薪資族基本所得額通常遠低於670萬，這條主要針對高資產人士。",
      },
    ],
  },
  {
    id: "vs-disability",
    icon: "⚖️",
    title: "長照扣除額 vs 身心障礙扣除額：怎麼選？",
    color: "purple",
    content:
      "這是最多人詢問的問題。同一位被照顧者，只能選其中一種申報，不能同時用兩個。以下是選擇邏輯。",
    details: [
      {
        label: "金額比較：身障扣除額（21.8萬）通常優於長照扣除額（12萬）",
        text: "身心障礙特別扣除額21.8萬 > 長期照顧特別扣除額12萬。若被照顧者同時持有身障手冊且符合長照條件，一般情況下選身障扣除額省稅更多（多省9.8萬的扣除空間）。",
      },
      {
        label: "排富考量：稅率20%以上只能用身障，不能用長照",
        text: "長照扣除額有排富條款（稅率20%以上不得申報），身心障礙特別扣除額則沒有排富條款。若你的稅率落在20%以上，但被照顧者符合兩者條件，只能選身心障礙特別扣除額（21.8萬），長照扣除額已被排富條款排除。",
      },
      {
        label: "只有長照條件、沒有身障手冊：只能申報長照12萬",
        text: "若被照顧者符合長照認定（例如：因年老失能且有長照核定書，或家中有外籍看護），但未持有身障手冊或重大傷病卡，則只能申報長照扣除額12萬。此時需確認自己的稅率在12%以下才能使用。",
      },
      {
        label: "家中不同成員各自適用：可以分別申報不同扣除額",
        text: "父親有身障手冊（申報身障扣除額21.8萬）、母親符合長照認定但無身障手冊（申報長照扣除額12萬），這是不同成員各自適用的情況，可以分別申報，合計33.8萬。限制是「同一被照顧者只能擇一」，不同人互不影響。",
      },
    ],
  },
  {
    id: "how-much",
    icon: "📊",
    title: "長照扣除額能省多少稅？",
    color: "green",
    content:
      "長照扣除額12萬能省多少稅，取決於稅率。注意：稅率20%以上已被排富條款排除，所以最高適用稅率只有12%。",
    details: [
      {
        label: "可適用稅率省稅金額對照",
        text: "由於排富條款（稅率20%以上不得申報），長照扣除額最多只適用到稅率12%：5% → 省稅 6,000元；12% → 省稅 14,400元。雖然12萬扣除額省的稅不算多，但對需要長照的中低收入家庭來說，每年省1.4萬也是實質減輕負擔。",
      },
      {
        label: "家有兩位長照成員：可各自申報，合計24萬扣除",
        text: "若家中父母都符合長照條件（且你的稅率在12%以下），各申報12萬，合計扣除24萬。稅率12%的情況下，24萬扣除額省稅28,800元。",
      },
    ],
  },
  {
    id: "documents",
    icon: "📁",
    title: "申報長照扣除額需要哪些文件？",
    color: "blue",
    content:
      "相較於身心障礙扣除額（eTax系統自動帶入），長照扣除額通常需要主動申報並準備相關文件。不同的適用情況，文件不同。",
    details: [
      {
        label: "情況1：使用政府長照服務（長照2.0）",
        text: "需備：縣市政府長照管理中心核發的「照顧服務計畫核定通知書」（說明核定使用哪些長照服務）。這份文件證明被照顧者已通過評估且核定使用長照服務。若已使用長照2.0服務，照顧管理專員應有提供核定文件。",
      },
      {
        label: "情況2：使用身心障礙機構日間照顧或住宿服務",
        text: "需備：機構開立的服務證明或費用收據（顯示被照顧者姓名、使用服務期間）。機構需為依法立案的日間照顧或住宿機構，私人坐月子或未立案的機構不算。",
      },
      {
        label: "情況3：聘僱外籍家庭看護工",
        text: "需備：勞動部核發的「外籍家庭看護工聘僱許可函」（在有效期內）。不需要申報全年費用，只需要證明有聘僱許可即可申報定額12萬扣除。若在114年內有任何時間持有有效許可，就可以申報。",
      },
    ],
  },
];

const FAQS = [
  {
    q: "長期照顧特別扣除額多少錢？114年度有調整嗎？",
    a: "長期照顧特別扣除額每位被照顧者每年120,000元（定額），自107年設立以來金額未調整。114年度（2025年收入，2026年申報）仍為12萬。這與薪資所得特別扣除額（有跟通膨調整）不同，長照扣除額從設立起就固定12萬。",
  },
  {
    q: "我的稅率是12%，可以申報長照扣除額嗎？",
    a: "可以。排富條款是「稅率達到20%以上不得申報」，稅率5%和12%都可以申報長照扣除額。但請注意：排富條款判斷的是「加入長照扣除額之前」的應納稅率，若你原本稅率就是12%（綜合所得淨額落在12%級距），加入長照扣除後稅率可能降到5%，仍可申報。",
  },
  {
    q: "家中請了外籍看護，也有長照服務，可以申報兩個長照扣除額嗎？",
    a: "不行。長照扣除額是針對「被照顧者」，同一位被照顧者無論有多少種照顧方式（外籍看護 + 長照服務），合計只能申報一個12萬。若家中父母各自有照顧需求，父親用外籍看護（申報12萬），母親用長照服務（申報12萬），則兩者可以分別申報，合計24萬。",
  },
  {
    q: "長照扣除額和身心障礙扣除額可以同時申報同一個人嗎？",
    a: "不行，同一位被照顧者只能擇一申報。若父親同時持有身障手冊（身障扣除額21.8萬）且符合長照條件（長照扣除額12萬），只能選一個。通常選身障扣除額21.8萬更省稅，且身障扣除額沒有排富條款，稅率20%以上仍可使用。",
  },
  {
    q: "選擇股利所得按28%計稅，就不能申報長照扣除額了嗎？",
    a: "是的，這是長照扣除額的排富條款之一。若你當年度選擇股利所得分開以28%課稅（而非合併計稅），則你（含配偶、受扶養親屬）均不得申報長照特別扣除額。若有長照需求，選擇合併計稅可能更有利，需試算比較兩種方案的整體稅額。",
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

export default function LtcDeduction2026Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline:
          "長期照顧特別扣除額 2026 完整攻略｜每人12萬、排富條款、外籍看護怎麼申報",
        description:
          "114年度長期照顧特別扣除額每人最高12萬元，適用失能、長照服務、外籍看護等情形。但有排富條款：稅率20%以上者不得適用。這篇說清楚條件、排富判斷、與身障扣除額的差異。",
        url: "https://www.twtaxcalc.com/ltc-deduction-2026",
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
        {/* Nav */}
        <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
          <div className="mx-auto max-w-4xl px-4">
            <div className="flex gap-1 overflow-x-auto py-2 text-xs">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href + (("active" in l && l.active) ? "-active" : "")}
                  href={l.href}
                  className={`shrink-0 rounded-lg px-3 py-1.5 font-medium transition ${"active" in l && l.active ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
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
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-medium text-indigo-700">
              114年度報稅・長照扣除額
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              長期照顧特別扣除額 2026
              <br />
              每人12萬，你能用嗎？
            </h1>
            <p className="mt-3 text-base text-gray-500">
              家有失能長者、使用外籍看護或政府長照服務，
              <span className="font-semibold text-indigo-700">
                每位被照顧者可扣除12萬。但稅率20%以上者不適用，申報前要先確認排富條款。
              </span>
            </p>
          </div>

          {/* Quick summary cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: "🏥",
                label: "114年度扣除額",
                desc: "每位被照顧者 120,000 元",
              },
              {
                icon: "⚠️",
                label: "排富條款",
                desc: "稅率20%以上不得申報",
              },
              {
                icon: "📋",
                label: "適用情況",
                desc: "長照服務、機構照顧、外籍看護",
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
          <div className="mb-8 rounded-2xl border border-indigo-200 bg-indigo-50 p-6 text-center">
            <p className="mb-1 text-sm font-medium text-indigo-700">
              不確定自己稅率是否超過20%？
            </p>
            <p className="mb-4 text-xl font-bold text-indigo-900">
              先試算稅額，確認能否適用長照扣除額
            </p>
            <Link
              href="/tax-calculator"
              className="inline-block rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700"
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
            <h2 className="mb-4 text-xl font-bold text-gray-900">相關工具與頁面</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  href: "/tax-calculator",
                  label: "報稅試算",
                  desc: "確認稅率，判斷是否超過排富門檻",
                },
                {
                  href: "/disability-deduction-2026",
                  label: "身心障礙特別扣除額",
                  desc: "每人21.8萬，無排富條款",
                },
                {
                  href: "/dependent-deduction",
                  label: "扶養親屬節稅",
                  desc: "扶養父母、失能長者可申報",
                },
                {
                  href: "/deduction-compare",
                  label: "列舉vs標準扣除額",
                  desc: "哪種扣法省稅更多",
                },
                {
                  href: "/joint-filing",
                  label: "夫妻合併vs分開申報",
                  desc: "長照排富條款以合併申報計算",
                },
                {
                  href: "/amt-calculator",
                  label: "最低稅負試算",
                  desc: "確認基本所得額是否超過670萬",
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
                  className="flex flex-col rounded-xl border border-gray-200 p-4 transition hover:border-indigo-400 hover:bg-indigo-50"
                >
                  <p className="font-semibold text-gray-900">{tool.label}</p>
                  <p className="mt-1 text-xs text-gray-500">{tool.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 rounded-2xl border border-indigo-200 bg-indigo-50 p-6 text-center">
            <p className="mb-1 text-sm font-medium text-indigo-700">
              報稅截止：2026年5月31日
            </p>
            <p className="mb-4 text-xl font-bold text-indigo-900">
              確認長照扣除資格後，試算全年稅額
            </p>
            <Link
              href="/tax-calculator"
              className="inline-block rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700"
            >
              立即試算 →
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
