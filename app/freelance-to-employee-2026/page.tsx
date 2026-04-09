import type { Metadata } from "next";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

export const metadata: Metadata = {
  title: "接案轉正職後怎麼報稅？2026完整攻略｜執行業務vs薪資所得 - 台灣財務試算",
  description:
    "2025年既有接案收入又轉為正職員工？114年度要同時申報「執行業務所得」和「薪資所得」。費用率vs薪資扣除額怎麼選、二代健保怎麼算，一次說清楚。",
  keywords: [
    "接案轉正職報稅",
    "自由工作者轉正職報稅",
    "執行業務所得轉薪資所得",
    "接案轉受雇報稅",
    "114年接案轉正職",
    "兩種所得申報",
    "自由接案報稅",
    "接案和正職混合申報",
    "執行業務所得費用率",
    "接案收入薪資所得",
    "自由工作者報稅2026",
    "接案費用率申報",
  ],
  openGraph: {
    title: "接案轉正職後怎麼報稅？2026完整攻略｜執行業務vs薪資所得",
    description:
      "2025年既有接案收入又轉為正職員工？114年度要同時申報「執行業務所得」和「薪資所得」。費用率vs薪資扣除額怎麼選、二代健保怎麼算，一次說清楚。",
    url: "https://www.twtaxcalc.com/freelance-to-employee-2026",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/freelance-to-employee-2026",
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
  { href: "/freelance-to-employee-2026", label: "接案轉正職報稅", active: true },
];

const SECTIONS = [
  {
    id: "two-income-types",
    icon: "📋",
    title: "兩種所得要分開申報",
    color: "blue",
    content:
      "2025年既有接案收入，又在同年轉為正職員工，報稅時必須同時申報「執行業務所得」（接案期間）和「薪資所得」（正職期間）。兩者計算方式不同，但最終合計成綜合所得額，用同一組稅率計算稅額。",
    details: [
      {
        label: "執行業務所得是什麼？",
        text: "接案收入（設計、翻譯、顧問費、稿費等）在稅法上屬「執行業務所得」（所得類別代號9A）。每種職業類別有不同的費用率，財政部認定一定比例為成本，不課稅。例如廣告設計費用率45%，表示收入的45%可直接扣除，只有55%計入課稅所得。",
      },
      {
        label: "薪資所得是什麼？",
        text: "轉正職後的薪水屬「薪資所得」（類別代號50），扣除方式固定：薪資特別扣除額上限20.7萬（114年度），不論在職幾個月都可扣滿。正職薪資先扣20.7萬後，再計入綜合所得總額。",
      },
      {
        label: "合計計算稅額",
        text: "執行業務所得淨額＋薪資所得淨額 = 綜合所得總額。扣掉免稅額（每人9.2萬）和扣除額後，依5%~40%稅率計算稅額。兩種收入合計可能推升稅率級距，建議提前用 twtaxcalc.com/tax-calculator 確認。",
      },
    ],
  },
  {
    id: "fee-rate-vs-deduction",
    icon: "💰",
    title: "費用率 vs 薪資扣除額：哪個對你更有利？",
    color: "green",
    content:
      "接案期間適用「費用率」（依職業類別，通常30%~45%），轉正職後適用薪資特別扣除額（固定20.7萬上限）。這兩種扣除方式不能互換，適用哪種取決於收入類型，但各自獨立計算。",
    details: [
      {
        label: "114年度常見接案費用率",
        text: "廣告設計：45%｜程式開發：45%｜翻譯：45%｜顧問費：30%｜稿費：30%｜講師費：30%。例如：接案年收入60萬（顧問費），費用率30%→費用18萬，需申報所得42萬。若同一筆誤歸為薪資，只能扣20.7萬，反而少扣1.3萬，多繳稅。",
      },
      {
        label: "薪資特別扣除額的上限",
        text: "薪資所得特別扣除額為每人每年最高20.7萬，與執行業務費用扣除獨立計算，不互相影響。同年有兩種所得：接案收入×（1-費用率）+ 薪資所得 - 20.7萬 = 兩種所得合計淨額。",
      },
      {
        label: "核實減除是否值得？",
        text: "若接案期間的實際成本（設備、軟體、工作室租金等）高於費用率，可申請「核實減除」並保留收據憑證。費用率通常比核實更簡便，除非實際費用率遠超法定費用率才值得申請。申請後財政部有機會查核單據，需確保單據齊全。",
      },
    ],
  },
  {
    id: "nhii-transition",
    icon: "🏥",
    title: "二代健保補充保費：接案和正職的差異",
    color: "orange",
    content:
      "接案時每筆給付超過2萬元，付款方需代扣2.11%補充保費；轉正職後，超出投保薪資的獎金或薪資差額才需補繳。兩種情況在同一年內都可能發生，各自獨立計算。",
    details: [
      {
        label: "接案期間的補充保費",
        text: "接案收入每筆超過2萬元，付款方（廠商/公司）需代扣2.11%補充保費。此補充保費已在給付時代扣，不需自行繳納。若年度接案收入加總後超過投保金額上限，年底結算可能有差額。",
      },
      {
        label: "轉正職後的補充保費",
        text: "正職受雇後，若獎金或加班費超過投保薪資4倍，超出部分需繳補充保費，通常由公司代扣。高薪族若月薪超過勞保投保薪資級距上限，超出部分也按年計算補充保費。",
      },
      {
        label: "兩段合計如何計算？",
        text: "同年既有接案補充保費（已代扣），又有正職薪資補充保費，兩者獨立計算，不會重複課徵。若不確定，可用 twtaxcalc.com/supplement-premium 試算全年補充保費總額。",
      },
    ],
  },
  {
    id: "labor-retirement-switch",
    icon: "📊",
    title: "勞退提撥：接案時沒有，正職才有",
    color: "purple",
    content:
      "接案期間通常沒有雇主提撥的勞工退休金；轉正職後，雇主每月必須提撥薪資6%進入個人勞退帳戶。這不影響當年報稅，但影響長期財務規劃，是薪資vs接案的隱形差異。",
    details: [
      {
        label: "接案期間的退休保障",
        text: "純接案（執行業務者）不適用勞基法，無法強制要求雇主提撥勞退。可自願提繳「個人專戶」每月最高6%，享有列舉扣除額優惠。但自由工作者必須自己承擔全額健保費，且無雇主勞退提撥。",
      },
      {
        label: "轉正職後的勞退計算",
        text: "成為受雇員工後，雇主必須提撥月薪6%進勞退新制個人帳戶。這筆錢不計入員工當年所得，不影響報稅。員工可額外自提0%~6%，自提部分享有個人所得稅扣除額優惠。",
      },
      {
        label: "薪資vs接案：哪個實際收入更高？",
        text: "轉正職的隱形好處：雇主勞退提撥（6%）+ 健保雇主負擔（30%~60%）。純接案者須自行承擔全額健保費，且無雇主勞退提撥。用 twtaxcalc.com/salary-vs-freelancer 試算兩種工作型態的淨收益差異。",
      },
    ],
  },
  {
    id: "transition-checklist",
    icon: "✅",
    title: "接案轉正職的報稅準備清單",
    color: "red",
    content:
      "同年同時有接案收入和薪資所得，報稅前需要準備的資料比純薪資族多，建議提前整理避免遺漏。",
    details: [
      {
        label: "接案期間的扣繳憑單",
        text: "每筆接案收入的「各類所得扣繳暨免扣繳憑單」（格式9A或45/46），或廠商開立的執行業務收入憑單。若廠商未開立，可要求補發，或至財政部系統用自然人憑證查詢所有所得資料。",
      },
      {
        label: "正職薪資扣繳憑單",
        text: "雇主在每年1月底前寄出薪資扣繳憑單（格式50）。若2025年轉正職後又換過公司，每一家雇主的憑單都要申報。系統通常會自動帶入，但建議核對筆數與金額。",
      },
      {
        label: "費用率自動套用",
        text: "用財政部eTax Portal報稅時，系統會依所得代號自動套用費用率，無需手動計算。但建議自行驗算：接案收入×（1-費用率）+ 薪資所得 - 20.7萬 = 兩種所得合計淨額，確認系統計算正確。",
      },
      {
        label: "提前試算稅額",
        text: "混合所得的稅額容易算錯，建議用 twtaxcalc.com/tax-calculator 輸入執行業務所得淨額（已扣費用率）和薪資所得，分別試算合計稅額，避免報稅當天補稅金額超出預期。",
      },
    ],
  },
];

const FAQS = [
  {
    q: "接案轉正職，執行業務所得和薪資所得要怎麼一起報？",
    a: "兩種所得分別填入報稅系統，系統會自動合計計算綜合所得額。報稅APP或eTax Portal中，執行業務所得在「執行業務所得」欄位填入（系統依費用率自動計算淨額），薪資所得在「薪資所得」欄位填入後扣除薪資特別扣除額20.7萬。最後合計為「綜合所得淨額」，依累進稅率5%~40%計算稅額。",
  },
  {
    q: "接案收入如果沒有扣繳憑單，還需要申報嗎？",
    a: "需要。收入不論是否有扣繳憑單都應申報。財政部每年比對各單位的給付資料，若廠商有申報你的收入而你沒有申報，會被補稅加罰款。若廠商應開立扣繳憑單而未開立，應催請補發；若廠商未申報，風險仍在申報義務人身上。小額接案（每筆未滿2萬）仍應主動申報。",
  },
  {
    q: "接案期間費用率是多少？哪裡查？",
    a: "費用率依執行業務類別而定，由財政部公告。常見類別：廣告設計45%、程式開發45%、翻譯45%、顧問費30%、稿費30%、講師30%。若對自己的費用類別有疑問，可參考財政部「各類所得扣繳率標準」或致電國稅局查詢。費用率越高代表認定成本越多，課稅所得越少。",
  },
  {
    q: "轉正職後還需要繳二代健保補充保費嗎？",
    a: "不需要另外繳之前接案的補充保費，那部分已由付款方代扣。轉正職後，薪資超出當月投保薪資級距的獎金、加班費超出部分，雇主會代扣補充保費。額外補充保費（如年終獎金超過4個月投保薪資）也由雇主代扣。通常不需要額外計算，除非你有其他收入來源（投資、租金、兼差）超過二代健保課徵門檻。",
  },
  {
    q: "接案轉正職後，報稅可以申請核實減除費用嗎？",
    a: "可以，但有條件。若接案期間的實際成本（設備採購、軟體訂閱、工作空間租金等）高於費用率，可在申報時選擇「核實減除」，提供相關費用憑證。申請後財政部可能查核，需留存相關收據。通常只有實際費用率遠超法定費用率時，核實才更划算；多數情況直接套用費用率更簡便安全。",
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

export default function FreelanceToEmployee2026Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "接案轉正職後怎麼報稅？2026完整攻略｜執行業務vs薪資所得",
        description:
          "2025年既有接案收入又轉為正職員工？114年度要同時申報「執行業務所得」和「薪資所得」。費用率vs薪資扣除額怎麼選、二代健保怎麼算，一次說清楚。",
        url: "https://www.twtaxcalc.com/freelance-to-employee-2026",
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
              114年度報稅・接案轉正職族必看
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              接案轉正職後怎麼報稅？
              <br />
              兩種所得一次搞清楚
            </h1>
            <p className="mt-3 text-base text-gray-500">
              2025年既接案又轉正職？要同時申報執行業務所得和薪資所得，
              <span className="font-semibold text-green-700">
                合計後稅率可能比預期高，建議提前試算。
              </span>
            </p>
          </div>

          {/* Alert box */}
          <div className="mb-8 rounded-2xl border border-orange-200 bg-orange-50 p-5">
            <p className="text-sm font-bold text-orange-800">
              ⚠️ 常見陷阱：接案收入沒有申報，財政部有付款方資料，比對後補稅＋罰款。
            </p>
          </div>

          {/* Quick summary cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: "📋", label: "執行業務所得", desc: "費用率30%~45%自動扣除" },
              { icon: "💼", label: "薪資所得", desc: "特別扣除額最高20.7萬" },
              { icon: "🏥", label: "二代健保", desc: "兩種收入分別計算" },
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
          <div className="mb-8 rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
            <p className="mb-1 text-sm font-medium text-green-700">接案+正職混合所得，稅額試算複雜</p>
            <p className="mb-4 text-xl font-bold text-green-900">先算清楚，5月不措手不及</p>
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
          <div className="mb-8">
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
                { href: "/freelancer-tax-guide", label: "自由工作者報稅指南", desc: "接案報稅完整說明" },
                { href: "/salary-vs-freelancer", label: "薪資vs接案試算", desc: "兩種收入的淨收益比較" },
                { href: "/supplement-premium", label: "二代健保試算", desc: "補充保費精確計算" },
                { href: "/income-tax-guide-2026", label: "報稅完整攻略", desc: "114年度報稅全流程" },
                { href: "/deduction-compare", label: "列舉vs標準扣除額", desc: "哪種扣除額更省稅" },
                { href: "/side-income-tax", label: "副業所得申報", desc: "副業收入怎麼報稅" },
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
          <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
            <p className="mb-1 text-sm font-medium text-green-700">報稅截止：2026年5月31日</p>
            <p className="mb-4 text-xl font-bold text-green-900">現在試算，提前準備補繳金額</p>
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
