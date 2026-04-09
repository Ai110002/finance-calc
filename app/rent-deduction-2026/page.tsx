import type { Metadata } from "next";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

export const metadata: Metadata = {
  title: "房租可以抵稅？租屋費用扣除額完整攻略 2026｜最高12萬 - 台灣財務試算",
  description:
    "租房族最容易漏掉的節稅機會：租屋費用列舉扣除額最高12萬。114年度申報條件、怎麼判斷用列舉還是標準扣除額、eTax怎麼填，一次說清楚。",
  keywords: [
    "房租抵稅",
    "租屋費用扣除額",
    "租房報稅",
    "租屋扣除2026",
    "租屋費用列舉扣除",
    "房租節稅",
    "114年租屋扣除",
    "租屋費用申報",
    "列舉扣除額房租",
    "租房族報稅",
    "自住租屋扣除額",
    "無自有住宅報稅",
  ],
  openGraph: {
    title: "房租可以抵稅？租屋費用扣除額完整攻略 2026｜最高12萬",
    description:
      "租房族最容易漏掉的節稅機會：租屋費用列舉扣除額最高12萬。114年度申報條件、列舉vs標準怎麼選，一次說清楚。",
    url: "https://www.twtaxcalc.com/rent-deduction-2026",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/rent-deduction-2026",
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
  { href: "/rent-deduction-2026", label: "房租抵稅", active: true },
];

const SECTIONS = [
  {
    id: "what-is-rent-deduction",
    icon: "🏠",
    title: "租屋費用扣除額是什麼？",
    color: "blue",
    content:
      "租屋費用扣除額是所得稅法第17條規定的列舉扣除項目，允許無自有住宅的租房族，在申報綜合所得稅時，將每年支付的房租列舉扣除，最高12萬元。這是租房族最容易被忽略的節稅機會。",
    details: [
      {
        label: "114年度上限：每人每年12萬元",
        text: "每位申報人的租屋費用列舉扣除額上限為12萬元（10,000元/月）。實際支付的租金若低於12萬，以實際金額申報；若超過12萬，只能扣除12萬上限。夫妻合併申報時，每人各有12萬上限，合計最高24萬。",
      },
      {
        label: "要選「列舉扣除額」才能申報",
        text: "申報房租扣除額需選擇「列舉扣除額」，不能同時使用標準扣除額（單身12.4萬、已婚24.8萬）。因此，只有當房租+其他列舉項目（保險費、醫療費、捐贈等）的合計高於標準扣除額，選列舉才划算。",
      },
      {
        label: "法源依據",
        text: "《所得稅法》第17條第1項第2款第3目：「個人、配偶及受扶養親屬在中華民國境內租屋供自住之費用，未申報房屋租金支出扣除者，其房屋租金支出之扣除，全戶合計每年以12萬元為限。」",
      },
    ],
  },
  {
    id: "eligibility",
    icon: "✅",
    title: "申報條件：4個都要符合",
    color: "green",
    content:
      "不是所有租房族都能申報。財政部規定必須同時滿足以下4個條件，缺一不可。申報前先逐一確認，避免誤申報被補稅。",
    details: [
      {
        label: "條件1：無自有住宅",
        text: "申報人本人、配偶及受扶養直系親屬（父母、子女）名下都不能有自有住宅。只要其中一人名下有房，就不符合資格。財政部會透過地政資料比對，誤報會被查到。",
      },
      {
        label: "條件2：租屋供自住",
        text: "租屋必須用於自住，不能用於營業或出租。若你在家接案或遠端工作，住宅仍屬自住用途，不影響資格。若將部分房間分租給他人，需按比例分攤，只有自住部分可申報。",
      },
      {
        label: "條件3：租約名義正確",
        text: "租賃契約須以申報人本人、配偶或受扶養親屬名義簽訂。若租約上的承租人不是申報人（例如租約登記父母名字），可能無法申報。簽約前確認租約以自己名義簽訂。",
      },
      {
        label: "條件4：非雇主提供的免費住所",
        text: "若雇主提供免費宿舍或津貼，則不符合自行租屋資格。如果雇主給你住屋津貼計入薪資，或你自己另外租屋，則可以申報自行支付的部分。",
      },
    ],
  },
  {
    id: "itemized-vs-standard",
    icon: "💡",
    title: "列舉vs標準扣除額：租房族怎麼選？",
    color: "orange",
    content:
      "申報租屋費用必須選列舉扣除額，但列舉未必比標準划算。關鍵是把所有列舉項目加總，和標準扣除額比較，選金額較高的那個。",
    details: [
      {
        label: "標準扣除額 vs 常見列舉組合",
        text: "114年度標準扣除額：單身12.4萬，夫妻合申24.8萬。常見列舉組合（單身）：租屋12萬＋保險費2.4萬（上限）＋醫療費（超過保險給付部分）= 至少14.4萬，已超過標準扣除額12.4萬。只要有房租，多數情況列舉更划算。",
      },
      {
        label: "試算公式",
        text: "列舉扣除額合計 = 房租費用（最高12萬）+ 人身保險費（每人最高2.4萬）+ 健保費（實際繳納）+ 醫療費（超過健保給付，需收據）+ 捐贈（政府及公益團體）+ 自用住宅貸款利息（有房才適用）。把這些加總，若高於標準扣除額，選列舉。",
      },
      {
        label: "範例：月租2.5萬的單身上班族",
        text: "年租金30萬 → 只能扣12萬上限。加上保險費2.4萬、健保費0.9萬，合計約15.3萬 > 標準扣除額12.4萬。選列舉可多扣約2.9萬，節稅約1,450元（5%稅率）至5,800元（20%稅率）。",
      },
    ],
  },
  {
    id: "how-to-file",
    icon: "📱",
    title: "eTax怎麼填：3個步驟",
    color: "purple",
    content:
      "財政部eTax Portal（報稅系統）申報租屋費用扣除額，步驟不複雜，但要在正確的欄位填入，否則系統會漏掉。",
    details: [
      {
        label: "步驟1：選擇「列舉扣除額」",
        text: "進入申報流程後，扣除額選項會出現「標準扣除額」或「列舉扣除額」，選「列舉扣除額」。系統會自動帶入你登記的保險費等資料，但房租金額需自行填入。",
      },
      {
        label: "步驟2：填入租屋費用",
        text: "在「列舉扣除額 → 租屋費用」欄位，填入114年度（2025年1月1日～12月31日）實際支付的房租總額，最高填12萬。若有租賃契約和付款紀錄（轉帳記錄、收據），建議保留備查，財政部可能抽查。",
      },
      {
        label: "步驟3：確認合計超過標準扣除額",
        text: "系統會顯示列舉扣除額合計，確認高於標準扣除額後確認送出。若列舉合計低於標準，改回標準扣除額較省稅。有些報稅APP（如財政部官方APP）會自動幫你比較兩種方案，建議用電腦版eTax Portal核對。",
      },
    ],
  },
  {
    id: "tips-and-traps",
    icon: "⚠️",
    title: "3個常見陷阱",
    color: "red",
    content:
      "租屋費用扣除額看似簡單，但有幾個容易踩雷的地方，實際申報前先確認。",
    details: [
      {
        label: "陷阱1：房東不開收據怎麼辦",
        text: "房東不願意開收據是常見問題。解決方法：（1）轉帳付款並保留交易紀錄；（2）有租賃契約副本；（3）申報時填入金額，財政部可能用房東的地址資料比對，但實務上申報人義務在於誠實申報。若房東不申報租金收入，財政部會比對雙方資料。建議跟房東溝通，有申報才合法合規。",
      },
      {
        label: "陷阱2：宿舍或公司宿舍不能申報",
        text: "若居住的是學生宿舍、公司宿舍、或父母名下的房子（即使你有給家用），這些都不符合申報條件。租約須以自己名義與房東簽訂，才能申報。",
      },
      {
        label: "陷阱3：同時有幼兒學前或其他大額扣除額時要再比較",
        text: "若你有幼兒學前教育扣除額（最高12萬）、或正職加班費、年終等較多的狀況，整體稅額規劃可能更複雜。建議用 twtaxcalc.com/tax-calculator 輸入完整資料，試算列舉vs標準哪種方案實際稅額較低。",
      },
    ],
  },
];

const FAQS = [
  {
    q: "租屋費用扣除額的上限是多少？每月超過1萬元的租金可以全部申報嗎？",
    a: "上限為每人每年12萬元（月租10,000元）。若實際月租高於1萬，超出部分不能申報，仍以12萬為上限。夫妻合申時，各自有12萬上限，若兩人都符合條件（但通常同住的夫妻只算一戶的房租），合計上限24萬。實務上，夫妻通常只有一份租約，由持約人申報，上限12萬。",
  },
  {
    q: "房東說不要把房租填進申報，因為他沒有申報租金收入，我該怎麼辦？",
    a: "這是房東的義務問題，不影響你的申報權利。房東未申報租金收入是他的稅務違規，你誠實申報房租扣除額是合法的。若你因為配合房東而放棄申報，等於放棄節稅機會。建議跟房東溝通：申報租屋費用時，財政部並不會直接通報房東，但兩邊資料若不一致，國稅局可能後續比對。最穩健的方式是雙方都誠實申報。",
  },
  {
    q: "我用信用卡或轉帳繳租金，但沒有正式收據，可以申報嗎？",
    a: "可以。財政部接受銀行轉帳記錄、信用卡帳單、Line Pay等電子支付記錄作為支付憑證。保留：（1）租賃契約；（2）付款紀錄（轉帳截圖或對帳單）；（3）若被查核，提供上述資料即可。現金付款較難舉證，若有可能，建議改為轉帳。",
  },
  {
    q: "我今年一月才租房，只租了11個月，可以申報全年12萬嗎？",
    a: "不行，只能申報實際支付的金額。如果月租1.5萬，租11個月，只能申報16.5萬中的12萬上限（仍以12萬為上限）。若月租0.9萬，租11個月，實際支付9.9萬，就申報9.9萬（未達12萬上限，填實際金額）。",
  },
  {
    q: "我和室友合租，租約上只有一個人的名字，另一個人可以申報嗎？",
    a: "依規定，申報人須是租賃契約上的承租人（本人或配偶、受扶養親屬）。若租約只有一人名字，另一位室友通常無法直接申報。解決方案：與房東簽立「共同承租」或副約，將雙方都列為承租人，各自按比例申報房租金額。",
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

export default function RentDeduction2026Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "房租可以抵稅？租屋費用扣除額完整攻略 2026｜最高12萬",
        description:
          "租房族最容易漏掉的節稅機會：租屋費用列舉扣除額最高12萬。114年度申報條件、怎麼判斷用列舉還是標準扣除額、eTax怎麼填，一次說清楚。",
        url: "https://www.twtaxcalc.com/rent-deduction-2026",
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
              114年度報稅・租房族必看
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              房租可以抵稅！
              <br />
              租屋費用扣除額最高12萬
            </h1>
            <p className="mt-3 text-base text-gray-500">
              每年都在繳房租，但沒有申報節稅？
              <span className="font-semibold text-blue-700">
                無自有住宅的租房族，每年最多可扣除12萬房租，多數情況比標準扣除額更省稅。
              </span>
            </p>
          </div>

          {/* Alert box */}
          <div className="mb-8 rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <p className="text-sm font-bold text-blue-800">
              💡 很多租房族不知道：房租可以列舉扣除，最高12萬/年。選列舉扣除額後，通常比標準扣除額省稅更多。
            </p>
          </div>

          {/* Quick summary cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: "🏠", label: "扣除上限", desc: "每人每年最高 12 萬元" },
              { icon: "📋", label: "申報方式", desc: "選列舉扣除額才能使用" },
              { icon: "✅", label: "主要條件", desc: "無自有住宅 + 自住用途" },
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
            <p className="mb-1 text-sm font-medium text-blue-700">列舉 or 標準？先算清楚再決定</p>
            <p className="mb-4 text-xl font-bold text-blue-900">輸入所得與扣除額，30秒看清楚哪個省稅</p>
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
                { href: "/deduction-compare", label: "列舉vs標準扣除額", desc: "哪種扣除額更省稅" },
                { href: "/legal-tax-savings-2026", label: "省稅10招", desc: "合法節稅完整攻略" },
                { href: "/dependent-deduction", label: "扶養節稅", desc: "扶養親屬免稅額計算" },
                { href: "/preschool-deduction", label: "幼兒學前扣除", desc: "5歲以下子女扣除額" },
                { href: "/income-tax-guide-2026", label: "報稅完整攻略", desc: "114年度報稅全流程" },
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
            <p className="mb-4 text-xl font-bold text-blue-900">確認房租扣除額後，試算全年稅額</p>
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
