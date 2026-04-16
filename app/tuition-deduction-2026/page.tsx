import type { Metadata } from "next";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

export const metadata: Metadata = {
  title: "教育學費特別扣除額 2026｜子女大學學費怎麼抵稅、每人25,000元完整攻略 - 台灣財務試算",
  description:
    "114年度教育學費特別扣除額每人25,000元，大學、碩士、博士都適用，選標準扣除額也能用！國外就讀不適用。完整說明哪些人可申報、eTax如何填報。",
  keywords: [
    "教育學費特別扣除額",
    "學費可以報稅嗎",
    "學費抵稅",
    "子女教育扣除額",
    "大學學費報稅",
    "114年學費扣除",
    "教育扣除額2026",
    "學費節稅",
    "子女學費申報",
    "大學學費抵稅",
    "研究所學費報稅",
    "教育學費扣除2026",
  ],
  openGraph: {
    title: "教育學費特別扣除額 2026｜子女大學學費怎麼抵稅、每人25,000元完整攻略",
    description:
      "114年度教育學費特別扣除額每人25,000元，大學、碩士、博士都適用，選標準扣除額也能用！完整說明哪些人可申報、eTax如何填報。",
    url: "https://www.twtaxcalc.com/tuition-deduction-2026",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/tuition-deduction-2026",
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
  { href: "/tuition-deduction-2026", label: "學費扣除額", active: true },
];

const SECTIONS = [
  {
    id: "what-is",
    icon: "🎓",
    title: "什麼是教育學費特別扣除額？",
    color: "blue",
    content:
      "教育學費特別扣除額是《所得稅法》第17條的「特別扣除額」，與列舉扣除額無關。不管你選標準扣除額還是列舉扣除額，都可以同時申報這個扣除額。這是很多父母不知道的節稅機會。",
    details: [
      {
        label: "每人每年扣除 25,000 元",
        text: "就讀國內大專以上院校的受扶養子女，每人每年最多可扣除學費25,000元。有兩個大學生孩子，最多可扣除50,000元。這個金額自104年起維持至今，114年度（2025年所得）同樣適用25,000元/人。",
      },
      {
        label: "這是「特別扣除額」，不是列舉扣除額",
        text: "台灣所得稅的「特別扣除額」包含：薪資所得扣除（20.7萬）、儲蓄投資扣除（27萬）、身心障礙扣除（21.8萬）、教育學費扣除（2.5萬/人）、幼兒學前扣除、長期照顧扣除（12萬/人）。特別扣除額可以疊加在標準或列舉扣除額上，不用二選一。",
      },
      {
        label: "申報對象：納稅義務人的受扶養子女",
        text: "父母申報所得稅時，若有扶養就讀大專以上院校的子女，可申報子女的學費扣除額。子女本人若已自行申報所得稅（獨立申報），則子女自己可申報，父母不能重複申報。",
      },
    ],
  },
  {
    id: "who-qualifies",
    icon: "✅",
    title: "哪些人可以申報？條件一次說清楚",
    color: "green",
    content:
      "教育學費特別扣除額有明確的適用條件。符合全部條件才能申報，否則申報了也會被國稅局剔除。",
    details: [
      {
        label: "條件1：就讀國內大專以上院校",
        text: "必須是在台灣設立的專科、大學、碩士班、博士班。包含：公私立大學、科技大學、技術學院、專科學校、研究所、進修部、夜間部、空中大學。重點：必須是教育部認可的正規院校，補習班、職訓課程不算。",
      },
      {
        label: "條件2：是納稅義務人的受扶養直系親屬",
        text: "通常是父母申報扶養的大學子女。若子女已成年但收入低，父母仍將其列為受扶養親屬，即可申報子女的學費扣除額。若子女已自行申報所得稅、不被父母扶養，父母就不能申報。",
      },
      {
        label: "條件3：海外就讀不適用",
        text: "這是最常見的誤解。若子女就讀的是美國、英國、日本等海外大學，即使是正規大學、學費很高，也不能申報教育學費特別扣除額。只有就讀國內院校才適用。已取得學位回台灣就讀研究所者，就讀國內期間可申報。",
      },
      {
        label: "條件4：在學年度課程費用",
        text: "申報的是實際繳交的學費金額，最高25,000元。若全年實際學費低於25,000元（如部分學期在學），以實際繳交金額申報。入學第一年或畢業最後一年，只計在學期間繳交的學費。",
      },
    ],
  },
  {
    id: "tax-savings",
    icon: "💰",
    title: "能省多少稅？各稅率算一次",
    color: "orange",
    content:
      "每扣除25,000元學費，實際省稅金額取決於你的邊際稅率。以下是各稅率對應的節稅金額。有兩個大學生子女，節稅效果加倍。",
    details: [
      {
        label: "1個大學生子女（扣除 25,000 元）",
        text: "稅率5%：省1,250元。稅率12%：省3,000元。稅率20%：省5,000元。稅率30%：省7,500元。稅率40%：省10,000元。家庭收入高、稅率高，學費扣除額的節稅效果更大。稅率20%的家庭，一個大學生子女就省5,000元/年。",
      },
      {
        label: "2個大學生子女（扣除 50,000 元）",
        text: "稅率5%：省2,500元。稅率12%：省6,000元。稅率20%：省10,000元。稅率30%：省15,000元。稅率40%：省20,000元。兩個子女同時就讀大學期間，節稅效益最大，每年最多省20,000元（稅率40%）。",
      },
      {
        label: "與幼兒學前扣除額比較",
        text: "幼兒學前扣除額（5歲以下）每人12萬，金額遠大於學費扣除額25,000。但子女大學期間只有學費扣除額（25,000），兩者分別適用不同年齡段。子女從幼兒到大學的扶養期間，父母在不同階段有對應的特別扣除額可申報。",
      },
    ],
  },
  {
    id: "vs-preschool",
    icon: "📊",
    title: "學費扣除額 vs 幼兒學前扣除額：差在哪？",
    color: "purple",
    content:
      "很多父母混淆「幼兒學前特別扣除額」和「教育學費特別扣除額」。兩者都是特別扣除額，但適用年齡完全不同，不重疊。",
    details: [
      {
        label: "幼兒學前特別扣除額（5歲以下）",
        text: "適用：5歲以下（國小入學前）的受扶養子女。金額：每人12萬元（114年度）。不受排富限制（改版後已無排富）。適用時間：孩子0~5歲，幼稚園、托嬰、安親班（5歲以下）期間。",
      },
      {
        label: "教育學費特別扣除額（大專以上）",
        text: "適用：就讀國內大專以上院校的受扶養子女。金額：每人25,000元（上限）。適用時間：子女就讀專科、大學、研究所期間。注意：國中、高中、高職不適用，這段期間沒有對應的學費特別扣除額。",
      },
      {
        label: "中間的空白地帶：國中、高中",
        text: "很遺憾，孩子就讀國中（12~15歲）和高中（15~18歲）期間，目前沒有對應的學費特別扣除額。父母仍可申報扶養親屬免稅額（每人97,000元），但沒有學費專屬扣除額。",
      },
    ],
  },
  {
    id: "how-to-file",
    icon: "📱",
    title: "eTax怎麼申報教育學費扣除額",
    color: "green",
    content:
      "好消息：教育學費特別扣除額通常由財稅資料中心自動帶入，不需要自己保留學費收據。但還是要確認金額正確。",
    details: [
      {
        label: "步驟1：確認受扶養子女資料",
        text: "進入eTax申報系統 → 「扶養親屬」欄位，確認子女已被列入受扶養。子女必須有在學資料，財稅資料中心才會自動帶入學費資料。若子女資料未帶入，可能需要手動填入。",
      },
      {
        label: "步驟2：確認教育學費扣除額欄位",
        text: "在「特別扣除額」區塊 → 找到「教育學費特別扣除額」。系統通常會顯示自動帶入的金額（來自學校向財稅資料中心提報的數據）。確認金額正確：一個子女最高25,000元，兩個子女最高50,000元。",
      },
      {
        label: "步驟3：金額有誤時如何處理",
        text: "若系統帶入金額低於實際繳交學費，可手動修改（最高不超過25,000元/人）。若需要備齊文件，向就讀學校申請「學費繳費收據」或「在籍證明」。被查核時需提供憑證，保留到申報截止後5年。",
      },
    ],
  },
];

const FAQS = [
  {
    q: "子女就讀研究所可以申報教育學費特別扣除額嗎？",
    a: "可以。只要就讀國內教育部認可的碩士班、博士班，同樣適用教育學費特別扣除額，每人每年最高25,000元。前提是子女仍被父母列為受扶養親屬，或子女自行申報所得稅時自己申報。",
  },
  {
    q: "子女去美國、英國留學，學費可以申報扣除額嗎？",
    a: "不行。教育學費特別扣除額只適用於就讀「國內」大專以上院校的受扶養子女。就讀海外大學，即使是世界頂尖學校、學費極高，也不能申報此扣除額。",
  },
  {
    q: "子女已有工作和薪水，自己申報所得稅，學費扣除額給父母還是子女？",
    a: "若子女已獨立申報所得稅（不被父母扶養），父母不能申報子女的學費扣除額。子女自己申報時，可申報本人的教育學費特別扣除額（若符合條件）。若子女仍被父母列為受扶養親屬（父母申報扶養），則父母可申報，子女不能重複申報。",
  },
  {
    q: "就讀技職院校、科技大學、夜間部可以申報嗎？",
    a: "可以。只要是教育部認可的專科以上院校，包含：科技大學、技術學院、護理專科、二技（二年制技術學院）、夜間部、進修部、空中大學（空大），都適用教育學費特別扣除額。重點是「教育部認可」，不是就讀方式。",
  },
  {
    q: "申報學費扣除額需要保留收據嗎？",
    a: "通常不需要。財稅資料中心與學校有資料交換，eTax申報時系統會自動帶入學費資料。但若金額有異常、或需要手動修改，建議保留學校開立的繳費收據或在籍證明，以備國稅局查核。一般情況下，確認系統帶入金額正確後即可申報。",
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

export default function TuitionDeduction2026Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "教育學費特別扣除額 2026｜子女大學學費怎麼抵稅、每人25,000元完整攻略",
        description:
          "114年度教育學費特別扣除額每人25,000元，大學、碩士、博士都適用，選標準扣除額也能用！完整說明哪些人可申報、eTax如何填報。",
        url: "https://www.twtaxcalc.com/tuition-deduction-2026",
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
              114年度報稅・有大學生子女必看
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              子女讀大學，學費可以抵稅？
              <br />
              <span className="text-blue-600">教育學費特別扣除額完整攻略</span>
            </h1>
            <p className="mt-3 text-base text-gray-500">
              每人每年最多扣除 25,000 元，大學、碩士、博士都算。
              <span className="font-semibold text-blue-700">
                最重要的是：選標準扣除額也可以同時用，很多父母不知道白白漏報了。
              </span>
            </p>
          </div>

          {/* Key insight alert */}
          <div className="mb-8 rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <p className="text-sm font-bold text-blue-800">
              💡 很多人不知道：教育學費特別扣除額是「特別扣除額」，跟你選標準還是列舉扣除額無關，可以疊加申報。有大學生子女的父母，記得確認 eTax 有帶入這個扣除額。
            </p>
          </div>

          {/* Quick summary cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: "🎓", label: "扣除額上限", desc: "每人 25,000 元（大學、碩士、博士均適用）" },
              { icon: "✅", label: "不受扣除額選擇影響", desc: "標準或列舉扣除額均可同時申報" },
              { icon: "🌍", label: "海外就讀不適用", desc: "只有國內大專院校才能申報" },
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
          <div className="mb-8 rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center">
            <p className="mb-1 text-sm font-medium text-blue-700">加入學費扣除額後，全年稅額是多少？</p>
            <p className="mb-4 text-xl font-bold text-blue-900">輸入所得和家庭狀況，30秒算出實際稅額</p>
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
                { href: "/dependent-deduction", label: "扶養節稅", desc: "扶養親屬免稅額計算" },
                { href: "/preschool-deduction", label: "幼兒學前扣除", desc: "5歲以下子女每人12萬" },
                { href: "/disability-deduction-2026", label: "身障扣除額", desc: "身障手冊/重大傷病卡21.8萬" },
                { href: "/deduction-compare", label: "列舉vs標準", desc: "哪種扣除額更省稅" },
                { href: "/legal-tax-savings-2026", label: "省稅10招", desc: "合法節稅完整攻略" },
                { href: "/tax-checklist-2026", label: "報稅懶人包", desc: "備齊資料不漏報" },
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
            <p className="mb-1 text-sm font-medium text-blue-700">報稅截止：2026年5月31日</p>
            <p className="mb-4 text-xl font-bold text-blue-900">確認學費扣除額後，試算全年稅額</p>
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
