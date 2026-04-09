import type { Metadata } from "next";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

export const metadata: Metadata = {
  title: "身心障礙特別扣除額 2026 完整攻略｜21.8萬怎麼用、重大傷病卡能申報嗎 - 台灣財務試算",
  description:
    "114年度身心障礙特別扣除額每人最高21.8萬元，本人或受扶養親屬持有身障手冊或重大傷病卡即可適用。不分障礙等級，系統自動帶入，這篇告訴你條件、能省多少稅、eTax怎麼操作。",
  keywords: [
    "身心障礙特別扣除額",
    "身障扣除額",
    "重大傷病卡報稅",
    "身心障礙報稅",
    "身心障礙所得稅扣除",
    "114年身心障礙扣除",
    "身障扣除2026",
    "身心障礙手冊報稅",
    "身障報稅",
    "重大傷病申報所得稅",
    "身障扶養扣除",
    "身心障礙特別扣除2026",
  ],
  openGraph: {
    title: "身心障礙特別扣除額 2026 完整攻略｜21.8萬怎麼用、重大傷病卡能申報嗎",
    description:
      "114年度身心障礙特別扣除額每人21.8萬。本人、配偶或受扶養親屬持有身障手冊或重大傷病卡即可適用，不分障礙等級，eTax系統自動帶入。",
    url: "https://www.twtaxcalc.com/disability-deduction-2026",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/disability-deduction-2026",
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
  { href: "/disability-deduction-2026", label: "身心障礙扣除額", active: true },
  { href: "/ltc-deduction-2026", label: "長照特別扣除額" },
];

const SECTIONS = [
  {
    id: "what-is",
    icon: "♿",
    title: "什麼是身心障礙特別扣除額？",
    color: "blue",
    content:
      "身心障礙特別扣除額是本人、配偶或受扶養親屬持有身心障礙手冊（或身心障礙證明）、或全民健保重大傷病卡，在申報所得稅時可以扣除的固定金額。114年度每人最高218,000元，不分障礙等級，系統申報時自動帶入，不需要另外憑證。",
    details: [
      {
        label: "114年度金額：每人最高 218,000 元",
        text: "注意是「每人」，不是每戶。若家中有多位成員持有身障手冊或重大傷病卡，每位各自享有21.8萬的特別扣除額。例如：申報人本人與父親都有身障手冊，合計可扣43.6萬。114年度金額與薪資所得特別扣除額相同，均調升至21.8萬。",
      },
      {
        label: "適用文件：身障手冊、身障證明、重大傷病卡，三者都算",
        text: "符合條件的文件有三種：（1）社會局核發的身心障礙手冊或身心障礙證明；（2）衛福部核發的重大傷病卡；（3）持有上述文件之受扶養親屬。其中「重大傷病」包括癌症、洗腎、罕見疾病、器官移植術後等，通常由醫療院所協助申請。",
      },
      {
        label: "不分障礙等級，輕度也適用",
        text: "身心障礙等級分為輕度、中度、重度、極重度，但無論哪個等級，申報身心障礙特別扣除額的金額都是每人21.8萬，沒有因等級不同而有差異。只要手冊或卡片在申報基準日（通常是12月31日前）仍有效，就可以申報。",
      },
    ],
  },
  {
    id: "who-qualifies",
    icon: "📋",
    title: "哪些人可以申報身心障礙特別扣除額？",
    color: "green",
    content:
      "凡是在114年度（2025年1月1日至12月31日）納稅義務人本人、合併申報的配偶，或申報受扶養的親屬中，有持有有效的身心障礙手冊、身心障礙證明或重大傷病卡，就可以申報。",
    details: [
      {
        label: "申報人本人持有：直接申報",
        text: "納稅義務人本人持有有效的身障手冊或重大傷病卡，在eTax系統填寫個人資料時，直接勾選「本人有身心障礙」，系統即自動帶入218,000元的扣除額。",
      },
      {
        label: "配偶持有：合併申報時一起帶入",
        text: "與配偶合併申報時，配偶持有身障手冊或重大傷病卡，同樣可申報一個21.8萬扣除額。eTax系統填寫配偶資料時，勾選「配偶有身心障礙」即可。注意：若配偶選擇分開申報（薪資所得分開計稅），其身障扣除額由配偶自行申報，不由主要申報人扣除。",
      },
      {
        label: "受扶養親屬持有：在扶養欄位中申報",
        text: "若你扶養的父母、祖父母、子女、兄弟姊妹等持有身障手冊或重大傷病卡，在申報扶養親屬時，每位符合條件的受扶養者各自加計21.8萬。例如：申報父母扶養，父親與母親都有重大傷病卡，則可扣除21.8萬 × 2 = 43.6萬。",
      },
      {
        label: "手冊有效期限：需在12月31日前仍有效",
        text: "身心障礙手冊或重大傷病卡需在114年12月31日前仍在有效期內。若手冊已於114年中過期，且未重新申請，則當年度不得適用。如有更換新手冊（如從舊制手冊換為身心障礙證明），新文件有效即可，不影響申報。",
      },
    ],
  },
  {
    id: "how-much",
    icon: "📊",
    title: "能省多少稅？各稅率省稅試算",
    color: "purple",
    content:
      "身心障礙特別扣除額21.8萬能省多少稅，取決於你的所得稅率（邊際稅率）。稅率越高，省稅效果越大。",
    details: [
      {
        label: "各稅率省稅金額對照表",
        text: "218,000元 × 稅率 = 省稅金額：5% → 省稅 10,900元；12% → 省稅 26,160元；20% → 省稅 43,600元；30% → 省稅 65,400元；40% → 省稅 87,200元。稅率20%的人光身心障礙扣除額就省4.3萬，稅率30%省6.5萬。",
      },
      {
        label: "家有身障父母 + 本人薪資所得：兩個扣除額加總",
        text: "以申報人本人年薪80萬、扶養一位持有重大傷病卡的父親為例：薪資所得特別扣除額21.8萬 + 身心障礙特別扣除額（父親）21.8萬 = 共扣除43.6萬。相比只有薪資扣除，應稅所得再減21.8萬，稅率12%可額外省稅26,160元。",
      },
      {
        label: "若申報人本人也有身障：可累加兩個21.8萬",
        text: "申報人本人有身障手冊，同時薪資所得特別扣除額也有21.8萬，這兩個扣除額可以同時適用，合計扣除43.6萬（薪資扣除額21.8萬 + 身心障礙扣除額21.8萬）。這兩個是不同性質的扣除額，不互相排斥。",
      },
    ],
  },
  {
    id: "double-deduction",
    icon: "⚠️",
    title: "身心障礙扣除額 vs 長期照顧扣除額：可以同時申報嗎？",
    color: "orange",
    content:
      "這是最常見的疑問。同一位被照顧者，「身心障礙特別扣除額」與「長期照顧特別扣除額」不得同時申報，只能擇一使用。但如果家中不同成員分別適用不同的扣除額，則可以分別申報。",
    details: [
      {
        label: "同一人不能同時申報兩種：擇一較大的",
        text: "若受扶養的父親既有身心障礙證明（可申報21.8萬），又符合長照扣除額資格（12萬），只能選其中一個。身心障礙特別扣除額21.8萬 > 長期照顧特別扣除額12萬，一般情況選前者更省稅。但長照扣除額有排富條款（稅率20%以上不得適用），需一併考量。",
      },
      {
        label: "家中不同成員各自適用不同扣除：可以分別申報",
        text: "若父親有身障手冊（申報身心障礙扣除額21.8萬），母親符合長照服務認定但沒有身障手冊（申報長照扣除額12萬），則兩者可以分別申報，各自加計，合計33.8萬。兩個扣除額的限制是「同一被照顧者不能同時用兩種」，不同人各自適用自己的扣除額。",
      },
    ],
  },
  {
    id: "etax",
    icon: "💻",
    title: "eTax申報身心障礙特別扣除額：3步驟完成",
    color: "blue",
    content:
      "eTax系統（財政部綜合所得稅申報系統）會依據健保和身障資料自動帶入，多數情況下你只需要確認人數和金額是否正確。",
    details: [
      {
        label: "步驟1：確認申報成員資料",
        text: "登入eTax後，在「基本資料」頁確認申報成員（本人、配偶、受扶養親屬）是否完整。系統會自動從健保資料帶入，若有受扶養親屬尚未在申報清單中，需手動新增（輸入身分證號、姓名、關係）。",
      },
      {
        label: "步驟2：確認身心障礙特別扣除額已帶入",
        text: "在「特別扣除額」頁面，確認「身心障礙特別扣除額」欄位是否已自動帶入正確金額和人數。若系統未帶入（例如手冊是今年新申請的，資料尚未同步），可手動勾選「有身心障礙」並輸入。",
      },
      {
        label: "步驟3：確認合計金額並送出",
        text: "在扣除額合計頁確認：特別扣除額合計 = 薪資所得特別扣除額 + 身心障礙特別扣除額（每位符合者各計21.8萬）+ 其他特別扣除額。確認無誤後，繼續試算應繳或退稅金額，最後送出申報。整個流程通常10分鐘內完成。",
      },
    ],
  },
];

const FAQS = [
  {
    q: "身心障礙特別扣除額是每人21.8萬還是每戶21.8萬？",
    a: "每人，不是每戶。家中有多位成員持有身障手冊或重大傷病卡，每位各自享有21.8萬的特別扣除額。例如：本人與父親都有身障手冊，合計可扣除43.6萬。這與儲蓄投資特別扣除額（每戶上限27萬）不同，身心障礙扣除額沒有每戶總額上限。",
  },
  {
    q: "持有全民健保重大傷病卡可以申報身心障礙特別扣除額嗎？",
    a: "可以。持有衛福部全民健保重大傷病卡者，與持有身心障礙手冊者一樣，都可以申報身心障礙特別扣除額每人21.8萬（114年度）。重大傷病包括：癌症、慢性腎衰竭（洗腎）、器官移植術後、罕見疾病、先天性凝血因子缺乏症等。",
  },
  {
    q: "我扶養的父母有身障手冊，我可以幫他們申報嗎？",
    a: "可以，前提是你有申報扶養這位親屬。若父母已被你列為受扶養親屬（並符合扶養條件），且持有有效的身障手冊或重大傷病卡，則在你的申報單上，每位符合條件的受扶養親屬各自加計21.8萬。若父母自己單獨申報，則由他們自己申報，不由你申報。",
  },
  {
    q: "身心障礙等級輕度也能申報，跟重度金額一樣嗎？",
    a: "一樣。身心障礙特別扣除額不因障礙等級而有差別，輕度、中度、重度、極重度均一律每人21.8萬（114年度）。只要在114年12月31日前手冊或證明仍有效即可申報。",
  },
  {
    q: "114年度身心障礙特別扣除額有調升嗎？",
    a: "有。114年度（2025年收入，2026年申報）身心障礙特別扣除額調升至每人218,000元，比113年度的207,000元提升11,000元，與薪資所得特別扣除額同步調整，反映近年通膨累積影響。稅率12%的人可因此少繳約1,320元。",
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

export default function DisabilityDeduction2026Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline:
          "身心障礙特別扣除額 2026 完整攻略｜21.8萬怎麼用、重大傷病卡能申報嗎",
        description:
          "114年度身心障礙特別扣除額每人最高21.8萬元，本人或受扶養親屬持有身障手冊或重大傷病卡即可適用。不分障礙等級，系統自動帶入，這篇告訴你條件、能省多少稅、eTax怎麼操作。",
        url: "https://www.twtaxcalc.com/disability-deduction-2026",
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
              114年度報稅・身心障礙扣除額
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              身心障礙特別扣除額 2026
              <br />
              每人21.8萬，誰能用？
            </h1>
            <p className="mt-3 text-base text-gray-500">
              本人、配偶或受扶養親屬持有身障手冊或重大傷病卡，
              <span className="font-semibold text-indigo-700">
                不分障礙等級，每人可扣21.8萬，eTax系統自動帶入。114年度比上年提高1.1萬。
              </span>
            </p>
          </div>

          {/* Quick summary cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: "♿",
                label: "114年度扣除額",
                desc: "每人最高 218,000 元",
              },
              {
                icon: "📄",
                label: "適用文件",
                desc: "身障手冊、身障證明、重大傷病卡",
              },
              {
                icon: "📊",
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
              含身心障礙扣除額，你今年要繳多少稅？
            </p>
            <p className="mb-4 text-xl font-bold text-indigo-900">
              輸入所得與扣除人數，30秒算出稅額
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
                  desc: "輸入所得直接算稅額",
                },
                {
                  href: "/ltc-deduction-2026",
                  label: "長期照顧特別扣除額",
                  desc: "每人12萬，有排富條款",
                },
                {
                  href: "/dependent-deduction",
                  label: "扶養親屬節稅",
                  desc: "扶養父母、子女可申報",
                },
                {
                  href: "/salary-deduction-2026",
                  label: "薪資所得特別扣除額",
                  desc: "上班族自動扣除21.8萬",
                },
                {
                  href: "/savings-deduction-2026",
                  label: "儲蓄投資特別扣除額",
                  desc: "利息收入每戶27萬免稅",
                },
                {
                  href: "/deduction-compare",
                  label: "列舉vs標準扣除額",
                  desc: "哪種扣法省稅更多",
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
              確認身心障礙扣除人數後，試算全年稅額
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
