import type { Metadata } from "next";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

export const metadata: Metadata = {
  title: "換工作後報稅攻略 2026｜多份扣繳憑單、資遣費怎麼申報 - 台灣財務試算",
  description:
    "2025年換過工作？114年度報稅要注意：多份扣繳憑單都要申報，漏報會被補稅。資遣費有免稅額計算，年中離職扣除額比例怎麼算，一次說清楚。",
  keywords: [
    "換工作報稅",
    "換工作扣繳憑單",
    "年中換工作報稅",
    "多份扣繳憑單",
    "離職後報稅",
    "被資遣報稅",
    "資遣費報稅",
    "資遣費免稅",
    "試用期薪資報稅",
    "兩份薪資報稅",
    "多個雇主報稅",
    "114年換工作",
    "換工作如何報稅",
    "離職扣繳憑單怎麼辦",
  ],
  openGraph: {
    title: "換工作後報稅攻略 2026｜多份扣繳憑單、資遣費怎麼申報",
    description:
      "2025年換過工作？114年度報稅要注意：多份扣繳憑單都要申報，漏報會被補稅。資遣費有免稅額計算，年中離職扣除額比例怎麼算，一次說清楚。",
    url: "https://www.twtaxcalc.com/job-change-tax-2026",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/job-change-tax-2026",
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
  { href: "/job-change-tax-2026", label: "換工作報稅", active: true },
  { href: "/etax-guide-2026", label: "eTax教學" },
  { href: "/tax-refund-timeline", label: "退稅時程" },
  { href: "/day-trading-tax", label: "當沖稅費" },
  { href: "/ira-vs-labor-retirement", label: "勞退vs ETF" },
  { href: "/legal-tax-savings-2026", label: "省稅10招" },
  { href: "/rental-income-tax-2026", label: "出租報稅" },
];

const SECTIONS = [
  {
    id: "multiple-w2",
    icon: "📋",
    title: "多份扣繳憑單都要申報",
    color: "blue",
    content:
      "2025年換過工作，手上有兩份（或多份）薪資扣繳憑單，每一份都必須申報。漏報其中一份，財政部比對後會補稅 + 罰款。",
    details: [
      {
        label: "為什麼要全部申報？",
        text: "財政部有所有雇主的扣繳資料。即使某份扣繳憑單沒有郵寄到你手上，系統仍記錄在案。漏報 = 少報所得，輕則補稅，重則罰款至少1倍。",
      },
      {
        label: "線上報稅如何操作？",
        text: "用財政部報稅APP或eTax Portal登入後，系統會自動帶入所有雇主的扣繳憑單。確認每筆所得都有顯示，若有遺漏可手動補填。",
      },
      {
        label: "試用期只做幾天也要申報嗎？",
        text: "是的。只要有薪資收入，不論金額多小，都需要申報。通常金額小且已扣繳稅款，申報後多為退稅結果。",
      },
    ],
  },
  {
    id: "deductions-prorate",
    icon: "✂️",
    title: "薪資特別扣除額：年中離職也能扣滿",
    color: "purple",
    content:
      "薪資特別扣除額20.7萬是「每年」上限，不按月比例計算。就算只在某雇主工作3個月，薪資特別扣除額仍可扣滿20.7萬。",
    details: [
      {
        label: "薪資特別扣除額規則",
        text: "每人每年最高20.7萬，直接從薪資所得中扣除，不需附單據。只要當年有薪資收入，就可以申報，不論在職時間長短。",
      },
      {
        label: "多份薪資合計計算",
        text: "多份薪資所得會加總為「薪資總所得」，再統一扣除薪資特別扣除額20.7萬（上限一次），不是每份扣一次。",
      },
      {
        label: "兼職薪資也適用",
        text: "若同時有正職和兼職薪資所得（均為薪資類所得54類），合計後扣一次薪資特別扣除額。",
      },
    ],
  },
  {
    id: "severance-tax",
    icon: "💼",
    title: "資遣費：有免稅額，未必全部課稅",
    color: "green",
    content:
      "被資遣領到的資遣費，依年資計算有免稅額。114年度每年服務年資免稅18.1萬，最高以36年計算（即免稅上限651.6萬）。",
    details: [
      {
        label: "資遣費免稅公式（114年度）",
        text: "免稅金額 = 服務年資（最高36年）× 18.1萬。超過免稅額的部分，以「退職所得」申報，依所得稅率課稅。",
      },
      {
        label: "服務年資如何計算？",
        text: "以實際服務年數計算，未滿一年按月計算（例如服務3年8個月 = 3又8/12年）。跨公司年資不能合併計算，每份資遣費個別計算。",
      },
      {
        label: "申報方式",
        text: "資遣費在報稅系統中屬「退職所得」（所得類別代號13）。雇主應發給「退職所得扣繳憑單」，憑單上已載明應稅金額。若雇主未核發，可向公司索取或至財政部系統查詢。",
      },
    ],
  },
  {
    id: "nhii-and-special",
    icon: "🏥",
    title: "離職後的健保與二代健保",
    color: "orange",
    content:
      "離職後若未立即就職，健保費自付提高（改投家眷或地區人口），但這不影響報稅申報——健保費仍可列舉扣除。",
    details: [
      {
        label: "健保費列舉扣除",
        text: "當年繳交的全民健保費（含在職時公司扣、離職後自行繳納的「保費」部分）均可列舉扣除，無上限（但受總列舉扣除額限制）。",
      },
      {
        label: "二代健保補充保費",
        text: "資遣費超過4個月投保金額者，雇主需代扣2.11%補充保費。但年薪超出投保薪資的部分（薪資差額），隔年個人需自行補繳。",
      },
      {
        label: "失業給付要申報嗎？",
        text: "不需要。勞工局發放的失業給付（失業保險給付）免納所得稅，不需申報。",
      },
    ],
  },
  {
    id: "practical-checklist",
    icon: "✅",
    title: "換工作族報稅實用清單",
    color: "red",
    content: "年中換工作，報稅前先確認這幾件事，避免漏報補稅。",
    details: [
      {
        label: "確認扣繳憑單筆數",
        text: "到財政部電子申報系統查詢，確認所有雇主的扣繳資料都有顯示。若前雇主尚未申報，可催促HR在1月底前完成。",
      },
      {
        label: "確認資遣費憑單",
        text: "若有資遣費，確認收到「退職所得扣繳憑單」，並核對免稅金額是否正確（年資 × 18.1萬）。",
      },
      {
        label: "試算是否需要補繳",
        text: "多份薪資合計後，可能比單一雇主預扣的稅款更多（因邊際稅率更高），建議提前用 twtaxcalc.com/tax-calculator 試算。",
      },
      {
        label: "標準 vs 列舉扣除額",
        text: "若離職後有花費搬家成本、健保費增加，可評估是否列舉。多數情況標準扣除額（13.1萬）仍較划算。",
      },
    ],
  },
];

const FAQS = [
  {
    q: "2025年換工作，報稅只要申報最後一份工作的薪資嗎？",
    a: "不對。所有在2025年（1月1日至12月31日）工作過的雇主薪資都需要申報，每一份扣繳憑單都要包含在內。財政部有完整的扣繳資料，漏報其中一份會被比對發現，輕則補稅加罰款，重則面臨稅務調查。登入報稅APP或eTax Portal後，系統會自動帶入所有雇主資料，確認筆數與實際相符即可。",
  },
  {
    q: "試用期只做了1個月就離職，也需要申報嗎？",
    a: "需要。只要在2025年有薪資收入，不論金額多少、在職時間多長，都需要申報。試用期薪資雇主通常已預扣稅款，申報後多半是退稅（因為全年所得低，稅率也低）。前雇主應發給扣繳憑單，若未收到可要求補發，或至財政部系統查詢。",
  },
  {
    q: "資遣費有多少免稅？怎麼計算？",
    a: "114年度資遣費免稅標準：每一服務年資免稅金額為18.1萬元，最高計算36年（免稅上限651.6萬）。計算方式：實際服務年資（未滿一年按月計）× 18.1萬 = 免稅額。超過免稅額的部分為「退職所得」，需申報課稅。例如：服務5年的資遣費，免稅額 = 5 × 18.1萬 = 90.5萬；若實際資遣費為100萬，則9.5萬需申報為退職所得。",
  },
  {
    q: "換工作後薪資合計，稅率會比單一雇主更高嗎？",
    a: "有可能。台灣綜合所得稅採累進稅率，全年所得越高稅率越高（5%~40%）。若在A公司工作7個月、B公司工作5個月，兩份薪資合計後的稅額，可能高於各自雇主個別預扣的稅款總和。建議用twtaxcalc.com/tax-calculator輸入全年薪資合計試算，了解是否需補繳，提前準備資金，避免5月報稅後措手不及。",
  },
  {
    q: "失業給付（失業保險）需要報稅嗎？",
    a: "不需要。依法律規定，勞工保險失業給付免納所得稅，不需申報。但若同年有其他所得（薪資、接案等），仍需正常申報那些所得。離職後投保職業工會的保費，若有繳納健保費，可列舉扣除（提供繳費收據）。",
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
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    icon: "bg-purple-100",
    title: "text-purple-900",
    detail: "text-purple-700",
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
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    icon: "bg-red-100",
    title: "text-red-900",
    detail: "text-red-700",
  },
};

export default function JobChangeTax2026Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "換工作後報稅攻略 2026｜多份扣繳憑單、資遣費怎麼申報",
        description:
          "2025年換過工作？114年度報稅要注意：多份扣繳憑單都要申報，漏報會被補稅。資遣費有免稅額計算，年中離職扣除額比例怎麼算，一次說清楚。",
        url: "https://www.twtaxcalc.com/job-change-tax-2026",
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
              114年度報稅・換工作族必看
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              換工作後怎麼報稅？
              <br />
              多份扣繳憑單一次說清楚
            </h1>
            <p className="mt-3 text-base text-gray-500">
              2025年換過工作？每份扣繳憑單都要申報。
              <span className="font-semibold text-blue-700">
                漏報一份，財政部比對後補稅 + 罰款。
              </span>
            </p>
          </div>

          {/* Alert box */}
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5">
            <p className="text-sm font-bold text-red-800">
              ⚠️ 最常見的補稅原因 #1：只申報最後一份薪資，忘了前雇主的扣繳憑單。
            </p>
          </div>

          {/* Quick summary cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: "📋", label: "多份扣繳憑單", desc: "全部都要申報，缺一不可" },
              { icon: "💼", label: "資遣費", desc: "年資×18.1萬免稅" },
              { icon: "🏦", label: "失業給付", desc: "完全免稅，不用申報" },
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

          {/* 試算工具 CTA */}
          <div className="mb-8 rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center">
            <p className="mb-1 text-sm font-medium text-blue-700">換工作薪資合計後稅率可能更高</p>
            <p className="mb-4 text-xl font-bold text-blue-900">先算你要繳多少稅</p>
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
                  <div className="mb-4 flex items-start gap-4">
                    <div
                      className={`shrink-0 rounded-xl ${c.icon} flex h-12 w-12 items-center justify-center text-2xl`}
                    >
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className={`text-xl font-bold ${c.title}`}>{section.title}</h2>
                      <p className="mt-1 text-sm text-gray-600">{section.content}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {section.details.map((detail) => (
                      <div key={detail.label} className="rounded-xl bg-white p-4 shadow-sm">
                        <p className={`text-sm font-bold ${c.detail}`}>{detail.label}</p>
                        <p className="mt-1 text-sm leading-relaxed text-gray-600">{detail.text}</p>
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

          {/* Affiliate CTA 1 */}
          <div className="mt-8">
            <TaxAffiliateCTA />
          </div>

          {/* 相關工具 */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">換工作族必用計算工具</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { href: "/tax-calculator", label: "報稅試算器", desc: "輸入全年薪資合計試算" },
                { href: "/severance-calculator", label: "資遣費試算", desc: "法定資遣費計算" },
                { href: "/income-tax-brackets", label: "稅率級距表", desc: "查你的邊際稅率" },
                { href: "/tax-filing-steps", label: "報稅完整流程", desc: "6步驟30分鐘完成申報" },
                { href: "/etax-guide-2026", label: "eTax APP教學", desc: "線上報稅操作圖解" },
                { href: "/deduction-compare", label: "列舉vs標準扣除額", desc: "哪種扣法比較划算" },
                { href: "/dependent-deduction", label: "扶養節稅試算", desc: "扶養父母子女省多少" },
                { href: "/tax-checklist-2026", label: "報稅懶人包", desc: "不漏報不多繳清單" },
                { href: "/tax-mistakes-2026", label: "報稅常見錯誤", desc: "避開最常見的申報地雷" },
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

          {/* 廣告 2 */}
          <div className="mt-6">
            <AdUnit />
          </div>

          {/* Affiliate CTA 2 */}
          <div className="mt-6">
            <TaxAffiliateCTA />
          </div>

          {/* FAQ */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">換工作報稅常見問題</h2>
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
            資料來源：財政部114年度綜合所得稅相關法規、勞動部退職所得免稅標準。本頁為說明性內容，實際申報請以財政部電子申報系統為準。
          </p>
        </main>
      </div>
    </>
  );
}
