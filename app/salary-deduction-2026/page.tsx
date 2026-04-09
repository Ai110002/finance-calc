import type { Metadata } from "next";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

export const metadata: Metadata = {
  title: "薪資所得特別扣除額 2026 完整攻略｜21.8萬是什麼、怎麼省稅 - 台灣財務試算",
  description:
    "114年度薪資所得特別扣除額每人最高21.8萬元，有薪資所得就自動適用，不需要憑證。是所有上班族最基本的節稅項目，這篇告訴你怎麼算、能省多少稅。",
  keywords: [
    "薪資所得特別扣除額",
    "薪資扣除額",
    "21.8萬扣除額",
    "114年薪資所得扣除",
    "上班族報稅",
    "薪資所得申報",
    "薪資所得扣除2026",
    "受薪階級報稅",
    "薪資特別扣除",
    "綜合所得稅薪資",
    "薪資所得稅怎麼算",
    "上班族節稅",
  ],
  openGraph: {
    title: "薪資所得特別扣除額 2026 完整攻略｜21.8萬是什麼、怎麼省稅",
    description:
      "114年度薪資所得特別扣除額每人21.8萬元，有薪資收入就自動適用。是所有上班族最基本的節稅項目，不需要憑證，系統自動計算。",
    url: "https://www.twtaxcalc.com/salary-deduction-2026",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/salary-deduction-2026",
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
  { href: "/salary-deduction-2026", label: "薪資所得扣除額", active: true },
];

const SECTIONS = [
  {
    id: "what-is",
    icon: "💼",
    title: "什麼是薪資所得特別扣除額？",
    color: "blue",
    content:
      "薪資所得特別扣除額是有薪資收入的人，在計算所得稅時可以先扣掉的金額。114年度每人最高可扣除21.8萬元，這是你的薪資收入直接「免稅」的部分。不需要任何憑證，系統自動計算。",
    details: [
      {
        label: "114年度金額：每人最高 218,000 元",
        text: "注意是「每人」，不是每戶。夫妻兩人都有薪資所得，各自享有21.8萬的特別扣除額，合計可扣43.6萬。若薪資收入低於21.8萬（例如只工作半年），以實際薪資收入為上限，而非固定扣21.8萬。",
      },
      {
        label: "什麼叫「薪資所得」？",
        text: "薪資所得包括：每月薪資、年終獎金、績效獎金、加班費（超時加班費全額算薪資）、董監事酬勞（若屬薪資性質）、受雇提供勞務取得的報酬。若你有正職，年薪（含各種獎金）就是你的薪資所得。若也有接案（執行業務所得），那兩種所得分開計算。",
      },
      {
        label: "不需要申請、不需要憑證，自動適用",
        text: "薪資所得特別扣除額是「特別扣除額」，不是「列舉扣除額」。你不需要選擇列舉，也不需要提供任何收據或憑證，只要有薪資收入，這個扣除額就自動套用。在eTax系統，薪資所得確認後，系統會自動計入這個扣除額。",
      },
    ],
  },
  {
    id: "how-much",
    icon: "📊",
    title: "薪資所得特別扣除額能省多少稅？",
    color: "green",
    content:
      "21.8萬的扣除額能省多少稅，取決於你的所得稅率。稅率越高，這個扣除額替你省的稅越多。以下是各稅率級距的試算。",
    details: [
      {
        label: "各稅率省稅金額",
        text: "薪資所得特別扣除額21.8萬 × 稅率：5% → 省稅 10,900元；12% → 省稅 26,160元；20% → 省稅 43,600元；30% → 省稅 65,400元；40% → 省稅 87,200元。年薪越高、稅率越高，這個扣除額的價值越大。",
      },
      {
        label: "上班族年薪80萬的試算範例",
        text: "薪資所得80萬，扣除薪資所得特別扣除額21.8萬後，薪資所得剩58.2萬，再扣個人免稅額9.7萬、標準扣除額12.4萬，綜合所得淨額約36.1萬，適用5~12%稅率。若沒有這個21.8萬扣除額，綜合所得淨額約57.9萬，稅率直接跳到20%，稅額差了近2~3萬。",
      },
      {
        label: "兩份薪資（換工作）：加總申報，扣除額仍只有一個21.8萬",
        text: "同一年內換工作，兩家公司的薪資都要加總申報。薪資所得特別扣除額仍是每人21.8萬，不是每份工作各算一個。所以年薪合計100萬，扣除21.8萬後，薪資所得是78.2萬，繼續計算其他扣除額後的稅額。",
      },
    ],
  },
  {
    id: "vs-freelancer",
    icon: "⚖️",
    title: "薪資所得 vs 執行業務所得（接案）：扣除方式不同",
    color: "purple",
    content:
      "正職薪資用「薪資所得特別扣除額」21.8萬。接案、自由工作者的「執行業務所得」則不用這個扣除額，而是用「費用率」（依職業類別18%~45%）或「核實費用」扣除。兩者不能混用。",
    details: [
      {
        label: "薪資所得：扣除21.8萬（固定，不需要憑證）",
        text: "有雇傭關係、每月領薪資的工作，所得分類為薪資所得（代碼50）。年薪100萬，扣掉21.8萬後，薪資所得為78.2萬，再計算其他扣除額。這個21.8萬代表的概念是：政府認定你有一定比例的工作費用（通勤、進修等），直接給你定額扣除。",
      },
      {
        label: "執行業務所得（接案）：扣除費用率（依職業類別18%~45%）",
        text: "沒有雇傭關係、每次承攬的工作（設計案、工程案、顧問費等），所得分類為執行業務所得（代碼9A）。扣除方式是依職業類別套用費用率，例如：廣告設計45%、資訊服務40%、一般顧問30%、技術服務18%。接案100萬，費用率45%，申報所得55萬，比薪資所得的78.2萬省更多稅。",
      },
      {
        label: "兩種所得可以同年都有，分別適用各自扣除規則",
        text: "同一年內既有正職薪資又有接案收入，兩種所得分別用自己的扣除方式。薪資所得扣21.8萬；執行業務所得扣費用率，然後兩種所得淨額合計，一起計算稅額。這是最常見的混合所得情況，各自的扣除規則不互相影響。",
      },
    ],
  },
  {
    id: "special-cases",
    icon: "📋",
    title: "特殊情況：兼職、加班費、獎金怎麼算",
    color: "orange",
    content:
      "薪資所得的計算範圍、扣除額的適用方式，在幾個特殊情況下有常見誤解。以下是最常被問到的三種情況。",
    details: [
      {
        label: "加班費：算薪資所得，計入21.8萬扣除額範圍",
        text: "勞基法規定的延時加班費（1.34倍、1.67倍）屬於薪資所得，算入年薪，適用薪資所得特別扣除額。注意：實務上有些公司另給「加班津貼」名目的補貼，若超過勞基法標準，仍屬薪資所得，不是免稅。",
      },
      {
        label: "年終獎金、績效獎金：都是薪資所得",
        text: "各種獎金（年終、績效、三節獎金、久任獎金）只要是雇主給的，都屬薪資所得，加入年薪一起計算。不能分開申報，也不能用其他方式另計。例外：退職所得（資遣費、退休金）有獨立的計算公式，不算薪資所得。",
      },
      {
        label: "兼職收入：看是否有雇傭關係",
        text: "週末打工、兼差如果是固定受雇關係（公司扣繳健保、填薪資扣繳憑單），屬薪資所得，與本職薪資合計，共用一個21.8萬扣除額。若是一次性承攬（無固定雇傭，開執行業務收入），則屬執行業務所得，另行計算費用率。",
      },
    ],
  },
  {
    id: "history",
    icon: "📅",
    title: "114年度金額是21.8萬，比上一年提高了",
    color: "blue",
    content:
      "薪資所得特別扣除額跟隨物價指數定期調整。114年度（2025年收入，2026年申報）每人21.8萬元，相較113年度（2024年收入，2025年申報）的20.7萬元提升1.1萬元。",
    details: [
      {
        label: "各年度金額對照",
        text: "113年度：207,000元；114年度：218,000元（增加11,000元）。這個調升讓薪資所得者今年的應稅所得減少1.1萬，稅率12%的人可少繳1,320元，稅率20%的人可少繳2,200元。",
      },
      {
        label: "為什麼會調整？",
        text: "薪資所得特別扣除額依所得稅法每隔一段期間依通貨膨脹（消費者物價指數）調整。當累計通膨達到一定程度，財政部就會公告調整各項扣除額和免稅額。114年度的調升反映近年物價上漲的累積影響。",
      },
    ],
  },
];

const FAQS = [
  {
    q: "薪資所得特別扣除額是每人21.8萬還是每戶21.8萬？",
    a: "每人，不是每戶。夫妻兩人都有薪資所得，各自享有21.8萬的扣除額，合計可扣43.6萬。這與儲蓄投資特別扣除額（每戶27萬）不同。薪資所得特別扣除額是依有薪資所得的人數各自計算。",
  },
  {
    q: "我年薪只有10萬，薪資所得特別扣除額能扣21.8萬嗎？",
    a: "不行，薪資所得特別扣除額不得超過薪資所得本身。若你的薪資所得只有10萬，扣除額最多就是10萬，不會扣到21.8萬。實際上這種情況通常稅額很低或為零，加上其他免稅額後，幾乎不用繳稅。",
  },
  {
    q: "接案收入（執行業務所得）也適用薪資所得特別扣除額嗎？",
    a: "不適用。薪資所得特別扣除額只適用於「薪資所得」，也就是有雇傭關係的工作收入。接案、自由工作者的「執行業務所得」不用薪資扣除額，而是用「費用率」（依職業類別18%~45%）扣除。若你同時有薪資和接案收入，只有薪資部分能用這個21.8萬扣除額。",
  },
  {
    q: "換工作，當年有兩份薪資，薪資所得特別扣除額還是只有一個21.8萬嗎？",
    a: "是的，薪資所得特別扣除額是每人每年21.8萬，不是每份工作各算一個。同年內換工作，兩份薪資加總後一起申報，扣除額仍是21.8萬。年薪合計100萬，薪資所得特別扣除額21.8萬，薪資所得淨額78.2萬，再計算其他扣除額。",
  },
  {
    q: "114年度薪資所得特別扣除額多少錢？跟113年度一樣嗎？",
    a: "不一樣。114年度（2025年收入，2026年申報）薪資所得特別扣除額為每人218,000元；113年度（2024年收入，2025年申報）為207,000元。114年度提高了11,000元，稅率12%的人可少繳約1,320元。",
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

export default function SalaryDeduction2026Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline:
          "薪資所得特別扣除額 2026 完整攻略｜21.8萬是什麼、怎麼省稅",
        description:
          "114年度薪資所得特別扣除額每人最高21.8萬元，有薪資所得就自動適用，不需要憑證。是所有上班族最基本的節稅項目，這篇告訴你怎麼算、能省多少稅。",
        url: "https://www.twtaxcalc.com/salary-deduction-2026",
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
              114年度報稅・上班族必看
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              薪資所得特別扣除額 2026
              <br />
              每人21.8萬，怎麼省稅？
            </h1>
            <p className="mt-3 text-base text-gray-500">
              有薪資收入，系統自動幫你扣21.8萬。
              <span className="font-semibold text-indigo-700">
                不需要任何憑證，是上班族最基本、最確定的節稅項目。114年度比上年提高1.1萬元。
              </span>
            </p>
          </div>

          {/* Quick summary cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: "💼",
                label: "114年度扣除額",
                desc: "每人最高 218,000 元",
              },
              {
                icon: "✅",
                label: "適用條件",
                desc: "有薪資所得即自動適用，免申請",
              },
              {
                icon: "📈",
                label: "省稅金額",
                desc: "21.8萬 × 稅率（12%→省2.6萬）",
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
              年薪多少、可以退稅還是要補稅？
            </p>
            <p className="mb-4 text-xl font-bold text-indigo-900">
              輸入薪資所得，30秒算出含薪資扣除額的稅額
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
            <h2 className="mb-4 text-xl font-bold text-gray-900">相關工具</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  href: "/tax-calculator",
                  label: "報稅試算",
                  desc: "輸入所得直接算稅額",
                },
                {
                  href: "/salary-vs-freelancer",
                  label: "薪資vs接案比較",
                  desc: "哪種工作形式稅負更低",
                },
                {
                  href: "/savings-deduction-2026",
                  label: "儲蓄投資特別扣除額",
                  desc: "利息收入每戶27萬免稅",
                },
                {
                  href: "/expense-deduction-compare",
                  label: "費用核實試算",
                  desc: "接案費用率vs薪資扣除哪個好",
                },
                {
                  href: "/freelance-to-employee-2026",
                  label: "接案轉正職報稅",
                  desc: "兩種所得同年的申報指引",
                },
                {
                  href: "/job-change-tax-2026",
                  label: "換工作報稅",
                  desc: "兩份薪資怎麼合併申報",
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
              確認薪資扣除額後，試算全年稅額
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
