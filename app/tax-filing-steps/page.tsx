import type { Metadata } from "next";
import Link from "next/link";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

export const metadata: Metadata = {
  title: "2026年報稅完整流程：6步驟從收單據到申報成功 - 台灣財務試算",
  description:
    "2026年5月報稅怎麼做？從收扣繳憑單、選申報工具、到送出確認，完整6步驟攻略。114年度報稅時程、文件清單、線上申報工具比較，30分鐘完成申報不漏報。",
  keywords: [
    "報稅流程",
    "報稅步驟",
    "怎麼報稅",
    "報稅怎麼做",
    "2026報稅",
    "114年度報稅",
    "報稅教學",
    "線上報稅",
    "報稅APP",
    "扣繳憑單",
    "報稅文件",
    "報稅截止日",
    "報稅時間",
    "報稅完整流程",
  ],
  openGraph: {
    title: "2026年報稅完整流程：6步驟從收單據到申報成功",
    description:
      "第一次報稅不知從何開始？6步驟圖解攻略：收扣繳憑單→確認所得→選工具→填扣除額→送出→確認退稅。114年度重要時程 + 文件清單，30分鐘完成申報。",
    url: "https://www.twtaxcalc.com/tax-filing-steps",
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
  { href: "/tax-filing-steps", label: "報稅流程", active: true },
  { href: "/tax-refund-timeline", label: "退稅時程" },
  { href: "/day-trading-tax", label: "當沖稅費" },
  { href: "/ira-vs-labor-retirement", label: "勞退vs ETF" },
  { href: "/legal-tax-savings-2026", label: "省稅10招" },
  { href: "/rental-income-tax-2026", label: "出租報稅" },
];

const STEPS = [
  {
    step: "01",
    title: "收集必要文件",
    time: "5–10 分鐘",
    color: "blue",
    desc: "報稅前先把所有單據集中，避免漏報被罰款。",
    items: [
      { name: "薪資所得扣繳憑單", tip: "雇主每年1月底前寄出，也可在財政部電子報稅系統查詢" },
      { name: "執行業務所得憑單（9A）", tip: "接案、顧問、自由業者，業主通常1月底前寄" },
      { name: "股利扣繳憑單", tip: "有買台股、基金者，券商寄出" },
      { name: "利息收入憑單", tip: "銀行定存、活存利息超過免稅額需申報" },
      { name: "租賃所得憑單", tip: "出租房屋者，承租方如為公司通常已扣繳" },
      { name: "健保費收據", tip: "列舉扣除額用，全民健保保費可列報" },
      { name: "捐款收據", tip: "捐給政府認可機構才可列報，上限為綜合所得總額20%" },
      { name: "房貸利息對帳單/證明", tip: "自用住宅購屋貸款利息，上限30萬/年" },
      { name: "房租收據", tip: "無自用住宅者，支付租金可列報，上限12萬/年" },
      { name: "學費收據（大學以上）", tip: "扶養子女就讀大學以上，每人可扣2.5萬" },
    ],
  },
  {
    step: "02",
    title: "確認所得類型，計算應稅所得",
    time: "5 分鐘",
    color: "purple",
    desc: "台灣所得稅有10類所得，不同類型課稅方式不同，先搞清楚自己有哪些。",
    items: [
      { name: "薪資所得（50）", tip: "薪資特別扣除額 20.7萬（上班族最常見）" },
      { name: "執行業務所得（9A）", tip: "接案族：課稅所得 = 收入 × (1 − 費用率)，費用率依業別30%~70%" },
      { name: "租賃所得（03）", tip: "課稅所得 = 租金收入 × 57%（法定費用43%扣除）" },
      { name: "利息所得（05）", tip: "儲蓄投資特別扣除額 27萬，超過才課稅" },
      { name: "股利所得（54）", tip: "可選合併申報（享8.5%抵減）或28%分離課稅" },
    ],
  },
  {
    step: "03",
    title: "選擇申報工具",
    time: "2 分鐘",
    color: "green",
    desc: "台灣有多種線上報稅工具，選一個你順手的。",
    items: [
      { name: "財政部「報稅APP」（手機）", tip: "iOS/Android，最簡單，適合薪資族。掃描扣繳憑單QR Code自動帶入" },
      { name: "財政部「eTax Portal」（電腦）", tip: "網頁版，功能最完整，適合有複雜所得或扣除額者" },
      { name: "健保卡 + 自然人憑證登入", tip: "線上報稅需身分驗證，手機報稅用健保卡讀卡機或行動裝置NFC" },
      { name: "書面（紙本）申報", tip: "少數狀況需用紙本；5月初各地區國稅局皆有申報服務中心" },
    ],
  },
  {
    step: "04",
    title: "填報扣除額，最大化節稅",
    time: "10–15 分鐘",
    color: "orange",
    desc: "這步決定你繳多少稅。扣除額沒填完等於把錢留給政府。",
    items: [
      { name: "標準 vs 列舉扣除額", tip: "標準：單身13.1萬、夫妻26.2萬。若捐款+醫療+房貸利息合計超過就列舉" },
      { name: "薪資特別扣除額", tip: "每人上限20.7萬，有薪資一定要填" },
      { name: "扶養親屬免稅額", tip: "每人9.2萬；70歲以上父母加倍13.8萬" },
      { name: "基本生活費差額", tip: "每人20.2萬 × 申報人口數，超過扣除額合計的差額可再扣" },
      { name: "幼兒學前扣除額", tip: "6歲以下每人15萬（符合所得限制條件）" },
      { name: "長期照顧扣除額", tip: "符合條件者每人12萬" },
    ],
  },
  {
    step: "05",
    title: "試算稅額，確認繳稅或退稅",
    time: "5 分鐘",
    color: "red",
    desc: "系統會自動計算，確認金額後決定繳稅方式。",
    items: [
      { name: "繳稅：截止日 5月31日", tip: "超過截止日每逾2日加徵1%滯報金，最高15%；逾30日加徵20%怠報金" },
      { name: "繳稅方式", tip: "信用卡（享紅利）、ATM轉帳、便利商店繳費、網路銀行、現金至國稅局" },
      { name: "退稅：分3批退還", tip: "第1批約7月初、第2批8月、第3批9月。越早申報越早退" },
      { name: "分期繳稅", tip: "應繳稅額超過10萬，且已申請者可分2期繳納（5/31+9/30）" },
    ],
  },
  {
    step: "06",
    title: "送出申報，保存確認碼",
    time: "2 分鐘",
    color: "teal",
    desc: "送出前再確認一次，送出後務必截圖或列印申報回執。",
    items: [
      { name: "確認申報書內容無誤", tip: "特別確認：所得筆數、扶養人口、扣除額是否完整" },
      { name: "送出申報", tip: "線上送出後系統會產生「申報序號」，請截圖或記錄" },
      { name: "保存申報確認書", tip: "建議下載PDF留存至少5年（稅局查核期限）" },
      { name: "確認退稅帳號", tip: "首次申報或換帳號請填寫退稅帳戶，否則退票支票需親自領取" },
    ],
  },
];

const FAQS = [
  {
    q: "2026年報稅截止日是什麼時候？",
    a: "2026年5月31日（星期日）。114年度（2025年1月1日至12月31日）的所得申報期間為2026年5月1日起至5月31日止。逾期未申報加徵滯報金（每逾2日1%，最高15%）；逾30日加徵怠報金20%。",
  },
  {
    q: "第一次報稅要準備哪些文件？",
    a: "必備：薪資扣繳憑單（雇主1月底前寄出）、身分證。若有其他所得（接案9A、租賃、股利、利息）再備齊各類憑單。可選：捐款收據、房貸利息證明、健保費收據（列舉扣除額用）、扶養親屬相關文件。扣繳憑單也可在財政部電子報稅系統自動下載，不需等郵寄。",
  },
  {
    q: "線上報稅要怎麼登入？",
    a: "財政部報稅APP（手機）：用健保卡 NFC 感應 + 健保卡密碼；或自然人憑證 + 密碼。eTax Portal（電腦網頁）：需自然人憑證讀卡機，或使用「網路報稅自然人憑證」行動版（手機產生憑證）。初次使用建議提前測試設備，5月初網路尖峰時段較慢。",
  },
  {
    q: "退稅什麼時候入帳？",
    a: "114年度退稅分3批：第1批約2026年7月初（5月1日前申報者優先）；第2批8月；第3批9月。退稅金額較大者可能在後批次處理。退稅方式：若已填寫退稅帳戶則直接匯款；未填寫則以退稅支票郵寄。建議申報時確認退稅帳戶正確。",
  },
  {
    q: "沒有收到扣繳憑單怎麼辦？",
    a: "扣繳憑單可在「財政部電子申報繳稅服務網」登入後自動下載，不需依賴郵寄版本。若線上查無，可能是：1. 雇主尚未申報（可催促）；2. 收入未達扣繳門檻（但仍需自行申報）；3. 執行業務所得（9A）若對方為自然人，可能無扣繳憑單，需自行估算申報。",
  },
];

const STEP_COLORS: Record<string, { bg: string; border: string; badge: string; text: string; tip: string }> = {
  blue: { bg: "bg-blue-50", border: "border-blue-200", badge: "bg-blue-600", text: "text-blue-900", tip: "text-blue-700" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", badge: "bg-purple-600", text: "text-purple-900", tip: "text-purple-700" },
  green: { bg: "bg-green-50", border: "border-green-200", badge: "bg-green-600", text: "text-green-900", tip: "text-green-700" },
  orange: { bg: "bg-orange-50", border: "border-orange-200", badge: "bg-orange-600", text: "text-orange-900", tip: "text-orange-700" },
  red: { bg: "bg-red-50", border: "border-red-200", badge: "bg-red-600", text: "text-red-900", tip: "text-red-700" },
  teal: { bg: "bg-teal-50", border: "border-teal-200", badge: "bg-teal-600", text: "text-teal-900", tip: "text-teal-700" },
};

export default function TaxFilingStepsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "2026年報稅完整流程：6步驟從收單據到申報成功",
        description:
          "114年度報稅完整步驟攻略：收集文件、確認所得類型、選申報工具、填扣除額、試算繳稅、送出確認。",
        url: "https://www.twtaxcalc.com/tax-filing-steps",
        author: { "@type": "Organization", name: "台灣財務試算" },
        publisher: { "@type": "Organization", name: "台灣財務試算" },
        datePublished: "2026-04-01",
        dateModified: "2026-04-01",
      },
      {
        "@type": "HowTo",
        name: "2026年台灣個人所得稅申報流程",
        description: "114年度（2025年所得）綜合所得稅申報完整步驟",
        totalTime: "PT30M",
        step: STEPS.map((s) => ({
          "@type": "HowToStep",
          name: s.title,
          text: s.desc,
        })),
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
              114年度報稅・距5月截止60天
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              報稅怎麼做？
              <br />
              6步驟30分鐘完成申報
            </h1>
            <p className="mt-3 text-base text-gray-500">
              第一次報稅也不怕。
              <span className="font-semibold text-blue-700">收文件→確認所得→選工具→填扣除額→繳稅→確認完成。</span>
            </p>
          </div>

          {/* 重要時程 */}
          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="mb-3 text-base font-bold text-amber-900">2026年報稅重要日期</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { date: "5月1日", event: "報稅季開始", note: "線上系統開放申報" },
                { date: "5月31日", event: "申報截止日", note: "逾期加徵滯報金" },
                { date: "7月初", event: "第1批退稅", note: "5/1前申報優先" },
                { date: "8–9月", event: "第2、3批退稅", note: "越早申報越早退" },
              ].map((d) => (
                <div key={d.date} className="rounded-xl bg-white p-3 shadow-sm">
                  <p className="text-lg font-bold text-amber-700">{d.date}</p>
                  <p className="text-sm font-semibold text-gray-900">{d.event}</p>
                  <p className="text-xs text-gray-500">{d.note}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-amber-700">
              提示：5月1日起越早申報，退稅越早入帳（第1批約7月初）。最晚5月31日前送出即可。
            </p>
          </div>

          {/* 6 Steps */}
          <div className="space-y-6">
            {STEPS.map((s) => {
              const c = STEP_COLORS[s.color];
              return (
                <div key={s.step} className={`rounded-2xl border ${c.border} ${c.bg} p-6 shadow-sm`}>
                  <div className="mb-4 flex items-start gap-4">
                    <div className={`shrink-0 rounded-full ${c.badge} px-3 py-1 text-sm font-bold text-white`}>
                      Step {s.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className={`text-xl font-bold ${c.text}`}>{s.title}</h2>
                        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-gray-500 shadow-sm">
                          約 {s.time}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{s.desc}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {s.items.map((item) => (
                      <div key={item.name} className="rounded-xl bg-white p-3 shadow-sm">
                        <div className="flex items-start gap-2">
                          <span className={`mt-0.5 text-sm font-bold ${c.tip}`}>✓</span>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.tip}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Affiliate CTA 1 */}
          <div className="mt-8">
            <TaxAffiliateCTA />
          </div>

          {/* 相關工具 */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">報稅必用計算工具</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { href: "/tax-calculator", label: "報稅計算器", desc: "估算你今年要繳多少稅" },
                { href: "/tax-strategy-2026", label: "省稅策略", desc: "5種族群最省申報方式" },
                { href: "/deduction-compare", label: "列舉vs標準扣除額", desc: "哪種扣法比較划算" },
                { href: "/dependent-deduction", label: "扶養節稅試算", desc: "扶養父母子女省多少" },
                { href: "/joint-filing", label: "夫妻合併vs分開", desc: "哪種申報方式省稅" },
                { href: "/dividend-tax", label: "股利申報試算", desc: "合併還是28%分離" },
                { href: "/basic-living-deduction", label: "基本生活費試算", desc: "計算你的差額扣除" },
                { href: "/tax-refund", label: "退稅試算", desc: "預估退稅金額與時間" },
                { href: "/tax-checklist-2026", label: "報稅懶人包", desc: "不漏報不多繳清單" },
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

          {/* Affiliate CTA 2 */}
          <div className="mt-6">
            <TaxAffiliateCTA />
          </div>

          {/* FAQ */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">報稅常見問題</h2>
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
            資料來源：財政部114年度綜合所得稅相關法規。本頁為說明性內容，實際申報請以財政部電子申報系統為準。
          </p>
        </main>
      </div>
    </>
  );
}
