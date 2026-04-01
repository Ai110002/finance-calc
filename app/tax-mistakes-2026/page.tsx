import type { Metadata } from "next";
import Link from "next/link";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

export const metadata: Metadata = {
  title: "2026報稅5大常見錯誤｜你犯了哪個？ - 台灣財務試算",
  description:
    "114年度綜合所得稅申報5大常見錯誤：漏報扶養、忘記幼兒學前扣除、海外所得漏申報、誤用標準扣除、接案收入漏報。每個錯誤都有計算工具可以修正。",
  keywords: [
    "報稅常見錯誤",
    "報稅錯誤",
    "綜合所得稅申報錯誤",
    "報稅漏報",
    "扶養親屬漏報",
    "幼兒學前扣除額",
    "海外所得申報",
    "2026報稅",
    "114年度報稅",
  ],
  openGraph: {
    title: "2026報稅5大常見錯誤｜你犯了哪個？",
    description:
      "每年報稅季最多人犯的5個錯，每個錯可能讓你多繳幾萬元。看看你有沒有中招。",
    url: "https://www.twtaxcalc.com/tax-mistakes-2026",
  },
};

const NAV_LINKS = [
  { href: "/", label: "財務自由" },
  { href: "/tax-calculator", label: "報稅計算" },
  { href: "/tax-checklist-2026", label: "報稅懶人包" },
  { href: "/tax-mistakes-2026", label: "報稅常見錯誤", active: true },
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
  { href: "/stock-tax-2026", label: "股票稅務" },
  { href: "/deduction-compare", label: "列舉vs標準" },
  { href: "/preschool-deduction", label: "幼兒學前扣除" },
  { href: "/foreign-income-tax", label: "海外所得" },
  { href: "/tax-refund", label: "退稅試算" },
  { href: "/tax-filing-steps", label: "報稅流程" },
  { href: "/joint-filing", label: "夫妻合併vs分開" },
  { href: "/income-tax-guide-2026", label: "報稅完整攻略" },
  { href: "/tax-refund-timeline", label: "退稅時程" },
  { href: "/day-trading-tax", label: "當沖稅費" },
];

// ── 5大常見錯誤資料 ───────────────────────────────────────────────────────────

const MISTAKES = [
  {
    id: 1,
    emoji: "👨‍👩‍👧",
    title: "漏報扶養親屬",
    tagline: "每漏一人，少扣 97,000 元免稅額",
    whoMakes: "有父母、祖父母、兄弟姊妹、子女可申報扶養的人",
    detail: [
      "扶養親屬每人可增加 97,000 元免稅額，若適用 12% 稅率，每漏一人就多繳約 11,640 元。",
      "直系血親（父母、祖父母、子女、孫子女）、旁系血親（兄弟姊妹未成年或無謀生能力）、配偶的直系血親都可能符合資格。",
      "常見漏報情況：父母已退休但忘記申報、大學就讀子女沒有申報、祖父母年老在家不知可申報。",
    ],
    checkQuestion: "你有父母、祖父母或子女可以申報扶養嗎？",
    ctaLabel: "試算扶養節稅金額",
    ctaHref: "/dependent-deduction",
    ctaColor: "bg-blue-600 hover:bg-blue-700",
  },
  {
    id: 2,
    emoji: "👶",
    title: "忘記幼兒學前特別扣除額",
    tagline: "3~6 歲子女每人多扣 120,000 元",
    whoMakes: "有 3 至 6 歲（滿 3 歲未滿 7 歲）子女的父母",
    detail: [
      "114 年度幼兒學前特別扣除額為每人 120,000 元，不論送不送幼兒園都可以扣。",
      "這是 2024 年才大幅調高的新規定，很多父母還不知道額度已倍增。",
      "注意：高所得家庭（綜合所得稅淨額超過一定門檻）可能受排富條款限制，但大多數雙薪家庭都適用。",
    ],
    checkQuestion: "你有 3 至 6 歲的子女嗎？",
    ctaLabel: "計算幼兒學前扣除額",
    ctaHref: "/preschool-deduction",
    ctaColor: "bg-pink-600 hover:bg-pink-700",
  },
  {
    id: 3,
    emoji: "🌏",
    title: "海外所得漏申報（最低稅負制）",
    tagline: "海外所得超過 100 萬，可能要多繳 20% 稅",
    whoMakes: "有海外股票收入、境外基金、海外薪資、加密貨幣變現的人",
    detail: [
      "台灣的「最低稅負制」規定：海外所得（含境外基金獲利、海外股票股利、加密貨幣）全年超過 100 萬元，就需計入申報。",
      "最低稅負稅率為 20%，起徵點為基本所得額 750 萬元。也就是說海外所得加上綜合所得超過 750 萬才需要繳最低稅負。",
      "但漏報本身是違法的，即使最後不用繳稅，被查到仍有罰則。美股、ETF、加密貨幣近年大漲，許多人首次觸及申報門檻。",
    ],
    checkQuestion: "你去年有海外股票、境外基金獲利或加密貨幣收入嗎？",
    ctaLabel: "計算海外所得稅負",
    ctaHref: "/foreign-income-tax",
    ctaColor: "bg-purple-600 hover:bg-purple-700",
  },
  {
    id: 4,
    emoji: "📋",
    title: "誤選標準扣除額（應該用列舉）",
    tagline: "房貸族、大額捐款者可能少扣幾十萬",
    whoMakes: "有房貸利息、大額捐款、高額醫療費用或保險費的納稅人",
    detail: [
      "114 年度單身標準扣除額 131,000 元、夫妻合報 262,000 元。但若你的房貸利息 + 捐款 + 醫療費 + 保費加起來超過這個數字，應選列舉扣除。",
      "房貸利息每年可扣最高 300,000 元（需扣掉儲蓄投資特別扣除額後的餘額）。",
      "人壽保險費、健康保險費合計每人最高可列舉 24,000 元。",
    ],
    checkQuestion: "你去年房貸利息超過 13 萬元嗎？",
    ctaLabel: "比較列舉vs標準扣除哪個划算",
    ctaHref: "/deduction-compare",
    ctaColor: "bg-amber-600 hover:bg-amber-700",
  },
  {
    id: 5,
    emoji: "💻",
    title: "接案收入漏報（平台收入、副業收入）",
    tagline: "接案所得超過 1,000 元就要申報，漏報罰 2~3 倍稅額",
    whoMakes: "有 Freelance、外送、直播、網拍、電商、家教等副業收入的人",
    detail: [
      "各平台（Uber Eats、PressPlay、蝦皮等）若向你扣繳所得稅，資料會自動傳財政部。你不報不代表國稅局不知道。",
      "漏報被查到：補稅外加 2 倍罰款；短報被查到：補稅外加 1 倍罰款。",
      "好消息：接案族適用「9A 執行業務所得費用率」，可依職業類別扣除 30~75% 的費用再計稅，實際稅率比你想的低很多。",
    ],
    checkQuestion: "你去年有接案、副業或平台收入嗎？",
    ctaLabel: "計算接案族實際稅負",
    ctaHref: "/freelancer-tax-guide",
    ctaColor: "bg-green-600 hover:bg-green-700",
  },
];

const FAQS = [
  {
    q: "漏報發現了怎麼辦？還有機會補報嗎？",
    a: "有。申報期間（5/1~5/31）可以直接重新申報。過了申報期，可以在5年內向稅務局申請更正申報，主動補報罰款比被查到輕很多，通常只需補稅不加罰或罰款較少。",
  },
  {
    q: "報稅申報錯誤被查到的機率高嗎？",
    a: "近年財政部大數據比對能力提升很多，尤其是平台扣繳資料、海外匯款記錄、房屋買賣資料都會和申報資料比對。刻意漏報高風險，主動更正才是正確做法。",
  },
  {
    q: "父母有退休金，還可以申報扶養嗎？",
    a: "可以，只要父母本年度的綜合所得稅應納稅額（不是收入）不超過免稅額 97,000 元，就可以申報扶養。勞保老年給付、公保養老給付屬於免稅所得，不計入所得計算。",
  },
  {
    q: "我的申報到底對不對？有辦法驗算嗎？",
    a: "建議用我們的退稅試算器自己算一次，和報稅軟體的結果比對。如果差異超過 5,000 元，值得仔細檢查是否有漏報或錯報項目。",
  },
  {
    q: "今年第一次報稅，容易犯哪個錯？",
    a: "第一次報稅最常犯錯誤 1（忘了申報扶養父母）和錯誤 5（有打工/兼差收入不知道要報）。建議先看報稅懶人包，8步驟逐一確認。",
  },
];

export default function TaxMistakes2026Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "2026報稅5大常見錯誤｜你犯了哪個？",
        description:
          "114年度綜合所得稅申報5大常見錯誤：漏報扶養、忘記幼兒學前扣除、海外所得漏申報、誤用標準扣除、接案收入漏報。",
        url: "https://www.twtaxcalc.com/tax-mistakes-2026",
        publisher: {
          "@type": "Organization",
          name: "台灣財務試算 twtaxcalc.com",
          url: "https://www.twtaxcalc.com",
        },
        datePublished: "2026-03-30",
        dateModified: "2026-03-30",
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

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-4">
          <nav className="flex items-center gap-1 overflow-x-auto py-3 text-sm">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`shrink-0 rounded-lg px-3 py-1.5 font-medium transition ${
                  l.active
                    ? "bg-red-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-10 px-4 py-10">
        {/* ── HERO ── */}
        <section className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-1.5 text-xs font-semibold text-red-700">
            ⚠️ 114 年度報稅季・5 月 31 日截止
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            2026 報稅 5 大常見錯誤
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            每年報稅季，這 5 個錯誤讓台灣人多繳幾千到幾萬元稅金。
            <br />
            花 5 分鐘確認你有沒有中招。
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
            <div className="rounded-lg bg-gray-100 px-3 py-1.5 text-gray-700">
              📅 申報期：2026/5/1 ~ 5/31
            </div>
            <div className="rounded-lg bg-gray-100 px-3 py-1.5 text-gray-700">
              📌 適用年度：114 年（2025）所得
            </div>
          </div>
        </section>

        {/* ── 快速自我診斷 ── */}
        <section className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <h2 className="text-base font-bold text-red-800">
            🔍 快速自我診斷：你有沒有這 5 個情況？
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            {MISTAKES.map((m) => (
              <li key={m.id} className="flex items-start gap-2">
                <span className="mt-0.5 text-base">{m.emoji}</span>
                <span>
                  <span className="font-semibold">錯誤 {m.id}：</span>
                  {m.checkQuestion}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-gray-500">
            有任何一個「是」→ 往下看對應的錯誤說明，確認你有沒有申報正確。
          </p>
        </section>

        {/* ── 5大錯誤 ── */}
        {MISTAKES.map((m) => (
          <section
            key={m.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">{m.emoji}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-gray-900 px-2 py-0.5 text-xs font-bold text-white">
                    錯誤 {m.id}
                  </span>
                </div>
                <h2 className="mt-1 text-xl font-bold text-gray-900">
                  {m.title}
                </h2>
                <p className="mt-1 text-sm font-semibold text-red-600">
                  ▶ {m.tagline}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-amber-50 px-4 py-2 text-sm text-amber-800">
              <span className="font-semibold">誰容易犯這個錯？</span>{" "}
              {m.whoMakes}
            </div>

            <ul className="mt-4 space-y-2">
              {m.detail.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-0.5 shrink-0 text-gray-400">•</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>

            <Link
              href={m.ctaHref}
              className={`mt-5 block rounded-xl px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition ${m.ctaColor}`}
            >
              {m.ctaLabel} →
            </Link>
          </section>
        ))}

        {/* ── 聯盟 CTA ── */}
        <TaxAffiliateCTA />

        {/* ── 申報截止提醒 ── */}
        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-base font-bold text-blue-900">
            📌 114 年度申報重要日期
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            <div className="flex justify-between rounded-lg bg-white px-4 py-2.5">
              <span className="text-gray-600">申報開始</span>
              <span className="font-semibold">2026 / 5 / 1</span>
            </div>
            <div className="flex justify-between rounded-lg bg-white px-4 py-2.5">
              <span className="text-gray-600">申報截止</span>
              <span className="font-semibold text-red-600">2026 / 5 / 31</span>
            </div>
            <div className="flex justify-between rounded-lg bg-white px-4 py-2.5">
              <span className="text-gray-600">免稅額（每人）</span>
              <span className="font-semibold">NT$97,000</span>
            </div>
            <div className="flex justify-between rounded-lg bg-white px-4 py-2.5">
              <span className="text-gray-600">幼兒學前扣除（每人）</span>
              <span className="font-semibold">NT$120,000</span>
            </div>
            <div className="flex justify-between rounded-lg bg-white px-4 py-2.5">
              <span className="text-gray-600">標準扣除額（單身）</span>
              <span className="font-semibold">NT$131,000</span>
            </div>
            <div className="flex justify-between rounded-lg bg-white px-4 py-2.5">
              <span className="text-gray-600">標準扣除額（合報）</span>
              <span className="font-semibold">NT$262,000</span>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900">常見問題</h2>
          <div className="mt-4 space-y-4">
            {FAQS.map((f, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 bg-white p-4"
              >
                <p className="font-semibold text-gray-900">Q：{f.q}</p>
                <p className="mt-2 text-sm text-gray-600">A：{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 相關工具 ── */}
        <section className="rounded-2xl bg-gray-50 p-5">
          <h2 className="text-base font-bold text-gray-800">相關報稅工具</h2>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
            {[
              { href: "/tax-calculator", label: "報稅計算器" },
              { href: "/tax-refund", label: "退稅試算" },
  { href: "/tax-filing-steps", label: "報稅流程" },
  { href: "/joint-filing", label: "夫妻合併vs分開" },
  { href: "/income-tax-guide-2026", label: "報稅完整攻略" },
              { href: "/tax-checklist-2026", label: "報稅懶人包" },
              { href: "/dependent-deduction", label: "扶養節稅試算" },
              { href: "/preschool-deduction", label: "幼兒學前扣除" },
              { href: "/deduction-compare", label: "列舉vs標準比較" },
              { href: "/freelancer-tax-guide", label: "接案族報稅指南" },
              { href: "/foreign-income-tax", label: "海外所得計算" },
              { href: "/dividend-tax", label: "股利申報試算" },
              { href: "/income-tax-brackets", label: "所得稅級距表" },
              { href: "/basic-living-deduction", label: "免稅天花板試算" },
              { href: "/tax-filing-guide", label: "完整報稅攻略" },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-center text-gray-700 transition hover:border-blue-300 hover:text-blue-600"
              >
                {t.label}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
