import type { Metadata } from "next";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

export const metadata: Metadata = {
  title: "退稅什麼時候入帳？2026年退稅時程完整說明 - 台灣財務試算",
  description:
    "2026年（114年度）退稅分3批：第1批7月上旬、第2批8月、第3批9月以後。越早申報越早退稅。本頁完整說明退稅時程、入帳方式、查詢方法，以及如何讓退稅最快入帳。",
  keywords: [
    "退稅時程",
    "退稅什麼時候",
    "退稅幾月入帳",
    "退稅多久",
    "2026退稅",
    "114年度退稅",
    "退稅入帳",
    "退稅查詢",
    "退稅直撥",
    "報稅退稅時間",
    "退稅第一批",
    "7月退稅",
    "退稅支票",
    "退稅加速",
  ],
  openGraph: {
    title: "退稅什麼時候入帳？2026年退稅時程完整說明",
    description:
      "2026年退稅分3批：第1批7月上旬（5/1前申報優先）、第2批8月、第3批9月。本頁說明如何最快拿到退稅：越早申報、選直撥帳戶。",
    url: "https://www.twtaxcalc.com/tax-refund-timeline",
  },
};

const NAV_LINKS = [
  { href: "/", label: "財務自由" },
  { href: "/tax-calculator", label: "報稅計算" },
  { href: "/tax-checklist-2026", label: "報稅懶人包" },
  { href: "/tax-mistakes-2026", label: "報稅常見錯誤" },
  { href: "/stock-tax-2026", label: "投資稅務" },
  { href: "/amt-calculator", label: "最低稅負" },
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
  { href: "/retirement-planning", label: "退休規劃" },
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
  { href: "/joint-filing", label: "夫妻合併vs分開" },
  { href: "/income-tax-guide-2026", label: "報稅完整攻略" },
  { href: "/tax-filing-steps", label: "報稅流程" },
  { href: "/tax-refund-timeline", label: "退稅時程", active: true },
  { href: "/day-trading-tax", label: "當沖稅費" },
  { href: "/ira-vs-labor-retirement", label: "勞退vs ETF" },
  { href: "/legal-tax-savings-2026", label: "省稅10招" },
  { href: "/rental-income-tax-2026", label: "出租報稅" },
];

const BATCHES = [
  {
    batch: "第1批",
    date: "2026年7月上旬",
    color: "green",
    condition: "5月1日起盡早申報",
    method: "線上申報＋已設定直撥帳戶",
    note: "越早送出申報越有機會在第1批7月初入帳",
    tips: [
      "5月1日開放申報當天即可送出",
      "選擇線上申報（報稅APP 或 eTax Portal）",
      "申報時填寫退稅帳戶（銀行帳號）",
      "確認所有欄位填寫正確，無需補件",
    ],
  },
  {
    batch: "第2批",
    date: "2026年8月",
    color: "blue",
    condition: "5月16日至5月31日申報",
    method: "線上申報或紙本申報",
    note: "5月中下旬才申報的人，一般落在8月退稅",
    tips: [
      "仍可在截止日（5/31）前申報",
      "紙本申報通常比線上慢1個批次",
      "直撥帳戶帳號需確認與申報資料一致",
      "若有補件需求，會延至第3批",
    ],
  },
  {
    batch: "第3批",
    date: "2026年9月以後",
    color: "orange",
    condition: "補件案、支票、特殊所得",
    method: "支票郵寄或需補件者",
    note: "資料需補正、未填直撥帳戶、或退稅金額超限者",
    tips: [
      "未填寫直撥帳戶 → 以退稅支票郵寄",
      "退稅支票有效期6個月，過期需向國稅局申請補發",
      "申報內容有疑義被要求補件 → 補件後才退稅",
      "海外所得等特殊所得申報 → 審核時間較長",
    ],
  },
];

const METHODS = [
  {
    method: "直撥入帳",
    icon: "🏦",
    speed: "最快（7月起陸續入帳）",
    color: "green",
    steps: [
      "申報時填寫「退稅帳戶」（本人任一金融帳戶）",
      "送出申報後退稅款直接匯入帳戶",
      "無需額外操作，收到簡訊或看帳戶即知",
    ],
    warning: null,
  },
  {
    method: "退稅支票",
    icon: "📮",
    speed: "較慢（8月以後郵寄）",
    color: "amber",
    steps: [
      "申報時未填退稅帳戶 → 系統自動改為支票",
      "支票寄至戶籍地址（請確認地址正確）",
      "收到後至任一銀行兌現",
    ],
    warning: "支票有效期6個月（約至2027年3月）。若地址錯誤或支票遺失，需向所屬國稅局申請補發。",
  },
];

const FAQS = [
  {
    q: "退稅什麼時候入帳？7月一定會退嗎？",
    a: "2026年（114年度）退稅分3批處理：第1批約7月上旬（5月1日起盡早申報、已設定直撥帳戶者優先）；第2批約8月；第3批9月以後（支票、補件案）。早申報早退稅是關鍵——5月1日申報與5月31日申報，退稅時間可能差1至2個月。",
  },
  {
    q: "沒有填退稅帳戶，退稅怎麼辦？",
    a: "若申報時未填寫直撥帳戶，國稅局會改以「退稅支票」方式郵寄至你的戶籍地。退稅支票有效期6個月，需在期限內至銀行兌現。若支票遺失或地址有誤，可持身分證至所屬國稅局申請補發。建議下次申報時直接填好退稅帳戶，省去這道手續。",
  },
  {
    q: "怎麼查退稅進度？",
    a: "可至「財政部電子申報繳稅服務網」（https://www.etax.nat.gov.tw）→ 登入後點選「查詢退稅狀態」。或致電財政部稅務諮詢專線0800-000-321。通常退稅入帳前5至10個工作天可在系統查到「已核定退稅」狀態。",
  },
  {
    q: "退稅金額比我預期的少，怎麼回事？",
    a: "常見原因：1. 有欠繳稅款或罰鍰被抵扣（如去年有補稅）；2. 有醫療費、補充保費未如實申報；3. 扶養親屬資格不符（國稅局調整）；4. 薪資所得與扣繳憑單不符被更正。若有疑問，可至所屬國稅局申請「核定稅額通知書」確認計算細節，或在線上申報系統查詢核定結果。",
  },
  {
    q: "申報後發現填錯了，可以修正嗎？",
    a: "可以。在申報期間（5/1–5/31）內，可重新登入申報系統送出「更正申報」，系統會以最後一份為準。申報期限結束後，若發現少報所得，應主動向國稅局申請更正，以免被查到後加計罰鍰。若少申報扣除額導致多繳稅，可在稅單確定後5年內申請退稅（依稅捐稽徵法第28條）。",
  },
];

const BATCH_COLORS: Record<string, { bg: string; border: string; badge: string; text: string; tip: string }> = {
  green: { bg: "bg-green-50", border: "border-green-200", badge: "bg-green-600", text: "text-green-900", tip: "text-green-700" },
  blue: { bg: "bg-blue-50", border: "border-blue-200", badge: "bg-blue-600", text: "text-blue-900", tip: "text-blue-700" },
  orange: { bg: "bg-orange-50", border: "border-orange-200", badge: "bg-orange-600", text: "text-orange-900", tip: "text-orange-700" },
};

export default function TaxRefundTimelinePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "退稅什麼時候入帳？2026年退稅時程完整說明",
        description:
          "2026年114年度所得稅退稅分3批：第1批7月上旬、第2批8月、第3批9月。越早申報越早退，直撥比支票快。",
        url: "https://www.twtaxcalc.com/tax-refund-timeline",
        author: { "@type": "Organization", name: "台灣財務試算" },
        publisher: { "@type": "Organization", name: "台灣財務試算" },
        datePublished: "2026-04-01",
        dateModified: "2026-04-01",
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
              114年度報稅・退稅最快7月入帳
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              退稅什麼時候入帳？
              <br />
              2026年退稅時程完整說明
            </h1>
            <p className="mt-3 text-base text-gray-500">
              越早申報越早退稅。
              <span className="font-semibold text-green-700">5月1日申報＋直撥帳戶 → 7月上旬入帳。</span>
              5月31日才申報 → 8月以後。
            </p>
          </div>

          {/* 快速答案框 */}
          <div className="mb-8 rounded-2xl border border-green-200 bg-green-50 p-5">
            <h2 className="mb-3 text-base font-bold text-green-900">2026年退稅時程一覽</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { batch: "第1批", date: "7月上旬", cond: "5月初申報＋直撥帳戶", color: "bg-green-600" },
                { batch: "第2批", date: "8月", cond: "5月中下旬申報", color: "bg-blue-600" },
                { batch: "第3批", date: "9月以後", cond: "支票、補件、特殊所得", color: "bg-orange-500" },
              ].map((b) => (
                <div key={b.batch} className="rounded-xl bg-white p-4 shadow-sm">
                  <div className={`mb-2 inline-block rounded-full ${b.color} px-3 py-0.5 text-xs font-bold text-white`}>
                    {b.batch}
                  </div>
                  <p className="text-xl font-bold text-gray-900">{b.date}</p>
                  <p className="mt-1 text-xs text-gray-500">{b.cond}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-green-700">
              提示：2026年5月1日（週四）起開放申報，截止5月31日。退稅時程以國稅局核定為準，每人略有不同。
            </p>
          </div>

          {/* 3批詳細說明 */}
          <h2 className="mb-4 text-xl font-bold text-gray-900">退稅3批時程：詳細說明</h2>
          <div className="space-y-5">
            {BATCHES.map((b) => {
              const c = BATCH_COLORS[b.color];
              return (
                <div key={b.batch} className={`rounded-2xl border ${c.border} ${c.bg} p-6 shadow-sm`}>
                  <div className="mb-4 flex items-start gap-4">
                    <div className={`shrink-0 rounded-full ${c.badge} px-3 py-1 text-sm font-bold text-white`}>
                      {b.batch}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className={`text-xl font-bold ${c.text}`}>{b.date}</h3>
                      </div>
                      <p className="mt-1 text-sm font-semibold text-gray-700">適用：{b.condition}</p>
                      <p className="mt-0.5 text-xs text-gray-500">{b.note}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {b.tips.map((tip) => (
                      <div key={tip} className="rounded-xl bg-white p-3 shadow-sm">
                        <div className="flex items-start gap-2">
                          <span className={`mt-0.5 text-sm font-bold ${c.tip}`}>✓</span>
                          <p className="text-sm text-gray-700">{tip}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 退稅方式 */}
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">退稅入帳方式：直撥 vs 支票</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {METHODS.map((m) => (
                <div
                  key={m.method}
                  className={`rounded-2xl border p-5 shadow-sm ${
                    m.color === "green"
                      ? "border-green-200 bg-green-50"
                      : "border-amber-200 bg-amber-50"
                  }`}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-2xl">{m.icon}</span>
                    <div>
                      <p className="font-bold text-gray-900">{m.method}</p>
                      <p className={`text-xs font-semibold ${m.color === "green" ? "text-green-700" : "text-amber-700"}`}>
                        {m.speed}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {m.steps.map((step) => (
                      <div key={step} className="flex items-start gap-2 rounded-lg bg-white p-2.5 shadow-sm">
                        <span className={`mt-0.5 text-xs font-bold ${m.color === "green" ? "text-green-600" : "text-amber-600"}`}>
                          ›
                        </span>
                        <p className="text-xs text-gray-700">{step}</p>
                      </div>
                    ))}
                  </div>
                  {m.warning && (
                    <p className="mt-3 rounded-lg bg-amber-100 px-3 py-2 text-xs text-amber-800">
                      ⚠ {m.warning}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 加速退稅5步驟 */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">讓退稅最快入帳：5個關鍵動作</h2>
            <div className="space-y-3">
              {[
                {
                  num: "01",
                  title: "5月1日立即申報",
                  desc: "開放日當天就送出，是進入第1批7月退稅的最重要條件。不需要等到截止日。",
                },
                {
                  num: "02",
                  title: "選擇線上申報",
                  desc: "使用財政部報稅APP（手機）或eTax Portal（電腦）線上申報，比紙本快至少一個批次。",
                },
                {
                  num: "03",
                  title: "申報前確認退稅帳戶",
                  desc: "在申報系統填入本人銀行帳號（帳號需與申報人身分相符）。未填寫 = 支票，至少慢1–2個月。",
                },
                {
                  num: "04",
                  title: "資料一次填齊，避免補件",
                  desc: "確認扶養親屬資格、所有所得來源均已填寫、扣除額憑單已備妥。補件一次通常延至第3批。",
                },
                {
                  num: "05",
                  title: "先用計算器估算退稅金額",
                  desc: "申報前先估算，可提早知道大概退多少，確認與系統計算結果相符，異常時早點處理。",
                  link: { href: "/tax-refund", label: "前往退稅試算器 →" },
                },
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-4 rounded-xl bg-gray-50 p-4">
                  <div className="shrink-0 rounded-full bg-green-600 px-2.5 py-0.5 text-sm font-bold text-white">
                    {item.num}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
                    {"link" in item && item.link && (
                      <Link
                        href={item.link.href}
                        className="mt-1 inline-block text-sm font-medium text-green-600 hover:underline"
                      >
                        {item.link.label}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
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
            <h2 className="mb-4 text-xl font-bold text-gray-900">報稅必用計算工具</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { href: "/tax-calculator", label: "報稅計算器", desc: "估算今年要繳多少稅" },
                { href: "/tax-refund", label: "退稅試算器", desc: "預估退稅金額" },
                { href: "/tax-filing-steps", label: "報稅完整流程", desc: "6步驟30分鐘完成申報" },
                { href: "/tax-strategy-2026", label: "省稅策略", desc: "5種族群節稅方式" },
                { href: "/deduction-compare", label: "列舉vs標準扣除額", desc: "哪種方式更省稅" },
                { href: "/joint-filing", label: "夫妻合併vs分開", desc: "兩種申報方式比較" },
                { href: "/dependent-deduction", label: "扶養節稅試算", desc: "扶養父母省多少稅" },
                { href: "/tax-checklist-2026", label: "報稅懶人包", desc: "不漏報不多繳清單" },
                { href: "/tax-filing-guide", label: "報稅完整攻略", desc: "全方位報稅指南" },
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
            <h2 className="mb-4 text-xl font-bold text-gray-900">退稅常見問題</h2>
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
            資料來源：財政部114年度綜合所得稅相關規定。退稅批次與時程以財政部實際公告為準，本頁提供參考性說明。
          </p>
        </main>
      </div>
    </>
  );
}
