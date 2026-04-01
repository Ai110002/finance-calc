import type { Metadata } from "next";
import Link from "next/link";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

export const metadata: Metadata = {
  title: "最低稅負制試算｜114年度基本稅額計算教學 - 台灣財務試算",
  description:
    "114年度最低稅負制（AMT）完整說明：海外所得超過100萬才需注意，基本所得額免稅額670萬。含試算範例：海外所得200萬/500萬/1000萬應繳多少？3步驟判斷你需不需要繳AMT。",
  keywords: [
    "最低稅負制",
    "AMT計算",
    "基本稅額",
    "海外所得申報",
    "基本所得額",
    "最低稅負制試算",
    "114年度AMT",
    "海外所得稅",
    "美股報稅",
    "最低稅負計算",
    "綜合所得稅vs最低稅負",
    "670萬免稅額",
  ],
  openGraph: {
    title: "最低稅負制試算｜114年度基本稅額計算教學",
    description:
      "114年度最低稅負制（AMT）：海外所得超過100萬才需注意，基本所得額免稅額670萬，超過部分按20%計算。3步驟判斷你需不需要繳AMT。",
    url: "https://www.twtaxcalc.com/amt-calculator",
  },
};

const NAV_LINKS = [
  { href: "/", label: "財務自由" },
  { href: "/tax-calculator", label: "報稅計算" },
  { href: "/tax-checklist-2026", label: "報稅懶人包" },
  { href: "/tax-mistakes-2026", label: "報稅常見錯誤" },
  { href: "/stock-tax-2026", label: "投資稅務" },
  { href: "/amt-calculator", label: "最低稅負", active: true },
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
  { href: "/tax-filing-steps", label: "報稅流程" },
  { href: "/joint-filing", label: "夫妻合併vs分開" },
  { href: "/income-tax-guide-2026", label: "報稅完整攻略" },
];

const FAQS = [
  {
    q: "海外所得不到100萬，還需要申報最低稅負制嗎？",
    a: "不需要。全年海外所得未超過100萬元，這筆所得就不必計入基本所得額，也不需要填寫最低稅負制相關欄位。但若有股利等台灣來源所得，仍需正常申報綜合所得稅。",
  },
  {
    q: "基本所得額不到670萬，會被課最低稅負制嗎？",
    a: "不會。114年度個人基本所得額免稅額為670萬元。若「綜合所得淨額＋海外所得＋其他加計項目」合計不超過670萬，基本稅額為零，完全不需繳最低稅負制。",
  },
  {
    q: "最低稅負制和一般綜合所得稅要同時繳嗎？",
    a: "不是同時繳兩次，而是「取高者」。先算一般所得稅應納稅額，再算基本稅額（最低稅負）。若基本稅額大於一般所得稅額，則補繳差額；若一般所得稅額已更高，就只繳一般所得稅，不另外繳AMT。",
  },
  {
    q: "美股在美國已被扣30%預扣稅，台灣還要繳最低稅負嗎？",
    a: "在美國被預扣的稅款可以在計算最低稅負時作為「已納境外稅額」扣抵，避免雙重課稅。實際需補繳金額 = 基本稅額 - 一般所得稅額 - 境外已納稅額。若境外已納稅額足夠大，可能完全抵銷AMT。",
  },
  {
    q: "買賣美股的資本利得（價差）也要計入最低稅負嗎？",
    a: "是的。美股買低賣高的資本利得屬於海外所得，和股利收入合計計算。全年美股股利＋美股價差＋境外基金配息等，只要合計超過100萬元，就全部計入基本所得額。",
  },
];

// AMT example calculations
const AMT_EXAMPLES = [
  {
    label: "輕度海外投資族",
    foreignIncome: 200,
    netTaxableIncome: 150,
    note: "基本所得額 350萬 < 670萬 → 不繳 AMT",
    needsAMT: false,
  },
  {
    label: "中度海外所得",
    foreignIncome: 500,
    netTaxableIncome: 250,
    note: "基本所得額 750萬 > 670萬，超出80萬 × 20% = 16萬基本稅額",
    needsAMT: true,
    basicTaxableAmount: 80,
    amtAmount: 16,
  },
  {
    label: "重度海外投資族",
    foreignIncome: 1000,
    netTaxableIncome: 400,
    note: "基本所得額 1,400萬 > 670萬，超出730萬 × 20% = 146萬基本稅額",
    needsAMT: true,
    basicTaxableAmount: 730,
    amtAmount: 146,
  },
];

export default function AmtCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "最低稅負制試算｜114年度基本稅額計算教學",
        description:
          "114年度最低稅負制（AMT）：海外所得超過100萬才需注意，基本所得額免稅額670萬，超過部分按20%計算。",
        url: "https://www.twtaxcalc.com/amt-calculator",
        publisher: {
          "@type": "Organization",
          name: "台灣財務試算 twtaxcalc.com",
          url: "https://www.twtaxcalc.com",
        },
        datePublished: "2026-03-31",
        dateModified: "2026-03-31",
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
                    ? "bg-blue-600 text-white"
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
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1.5 text-xs font-semibold text-purple-700">
            🌏 114 年度最低稅負制 · 5 月 31 日申報截止
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            最低稅負制（AMT）試算教學
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            有美股、境外基金、海外所得？
            <br />
            3步驟判斷你需不需要繳最低稅負，以及大概要繳多少。
          </p>
          {/* Quick status badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
            <div className="rounded-lg bg-purple-100 px-3 py-1.5 font-medium text-purple-700">
              免稅額 670 萬
            </div>
            <div className="rounded-lg bg-blue-100 px-3 py-1.5 font-medium text-blue-700">
              稅率 20%
            </div>
            <div className="rounded-lg bg-amber-100 px-3 py-1.5 font-medium text-amber-700">
              海外所得門檻 100 萬
            </div>
          </div>
        </section>

        {/* ── 3步驟快速判斷 ── */}
        <section className="rounded-2xl border border-purple-200 bg-purple-50 p-6">
          <h2 className="text-lg font-bold text-purple-900">
            3 步驟快速判斷：你需要繳最低稅負嗎？
          </h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
                1
              </span>
              <div>
                <p className="font-semibold text-gray-900">
                  全年海外所得 &lt; 100 萬？
                </p>
                <p className="mt-0.5 text-sm text-gray-600">
                  美股股利＋美股價差＋境外基金配息＋境外存款利息，全部加總。
                  未超過 100 萬元 →{" "}
                  <span className="font-semibold text-green-600">
                    不需計入，停止計算，不用繳 AMT。
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
                2
              </span>
              <div>
                <p className="font-semibold text-gray-900">
                  基本所得額 &lt; 670 萬？
                </p>
                <p className="mt-0.5 text-sm text-gray-600">
                  基本所得額 = 綜合所得淨額＋海外所得（超過 100 萬才全數計入）。
                  未超過 670 萬元 →{" "}
                  <span className="font-semibold text-green-600">
                    基本稅額為零，不用繳 AMT。
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
                3
              </span>
              <div>
                <p className="font-semibold text-gray-900">
                  基本稅額 vs 一般所得稅，取高者
                </p>
                <p className="mt-0.5 text-sm text-gray-600">
                  基本稅額 =（基本所得額 − 670 萬）× 20%。
                  若基本稅額 &gt; 一般所得稅額 →{" "}
                  <span className="font-semibold text-red-600">
                    補繳差額（基本稅額 − 一般所得稅額）。
                  </span>
                  若一般所得稅額已更高 → 不需繳 AMT。
                </p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-purple-700">
            ℹ️ 大多數台灣投資人海外所得不到 100 萬，不需申報 AMT。
          </p>
        </section>

        {/* ── 試算範例 ── */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">試算範例</h2>
          <p className="mt-1 text-sm text-gray-600">
            114 年度｜免稅額 670 萬｜稅率 20%
          </p>
          <div className="mt-5 space-y-4">
            {AMT_EXAMPLES.map((ex) => (
              <div
                key={ex.label}
                className={`rounded-xl border p-4 ${
                  ex.needsAMT
                    ? "border-red-200 bg-red-50"
                    : "border-green-200 bg-green-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">
                    {ex.label}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      ex.needsAMT
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {ex.needsAMT ? "需計算 AMT" : "不需繳 AMT"}
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-600">
                    海外所得：
                    <span className="font-semibold text-gray-900">
                      {ex.foreignIncome} 萬
                    </span>
                  </div>
                  <div className="text-gray-600">
                    綜合所得淨額：
                    <span className="font-semibold text-gray-900">
                      {ex.netTaxableIncome} 萬
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-700">{ex.note}</p>
                {ex.needsAMT && (
                  <p className="mt-1 text-sm font-semibold text-red-700">
                    → 最低基本稅額約 {ex.amtAmount} 萬元（扣抵境外稅款前）
                  </p>
                )}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-500">
            ※ 以上為基本稅額計算，實際應補繳金額需扣除一般所得稅額及已繳境外稅款。
            建議使用下方工具精確計算。
          </p>
        </section>

        {/* ── 聯盟 CTA ── */}
        <TaxAffiliateCTA />

        {/* ── 計算公式說明 ── */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">完整計算公式</h2>
          <div className="mt-5 space-y-4">
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-sm font-semibold text-blue-900">
                Step 1 — 計算基本所得額
              </p>
              <p className="mt-1 text-sm text-blue-800">
                基本所得額 = 綜合所得淨額
                <br />
                ＋ 海外所得（全年合計超過 100 萬元才計入，且全數計入）
                <br />
                ＋ 非現金捐贈（列舉扣除部分）
                <br />
                ＋ 保險給付超過 3,330 萬元的部分
                <br />
                ＋ 員工認股權憑證所得
              </p>
            </div>
            <div className="rounded-xl border border-purple-100 bg-purple-50 p-4">
              <p className="text-sm font-semibold text-purple-900">
                Step 2 — 計算基本稅額
              </p>
              <p className="mt-1 text-sm text-purple-800">
                若基本所得額 ≤ 670 萬 → 基本稅額 = 0，不需繳 AMT
                <br />
                若基本所得額 &gt; 670 萬 →
                <br />
                基本稅額 =（基本所得額 − 670 萬）× 20%
              </p>
            </div>
            <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-900">
                Step 3 — 應補繳金額
              </p>
              <p className="mt-1 text-sm text-amber-800">
                應補繳金額 = MAX（基本稅額, 一般所得稅額）− 一般所得稅額
                <br />
                − 境外已納稅款（如美股被扣 30% 預扣稅，可按比例扣抵）
                <br />
                <br />
                若基本稅額 ≤ 一般所得稅額 → 不需補繳，已繳足
              </p>
            </div>
          </div>
        </section>

        {/* ── 誰需要特別注意 ── */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">誰需要特別注意？</h2>
          <ul className="mt-4 space-y-3">
            {[
              {
                icon: "🌏",
                title: "美股重度投資人",
                desc: "美股股利＋資本利得（價差）合計超過 100 萬元，就需計入基本所得額計算",
              },
              {
                icon: "📊",
                title: "境外基金持有人",
                desc: "境外基金配息、贖回獲利屬海外所得，需與美股合計計算是否超過 100 萬",
              },
              {
                icon: "🏢",
                title: "海外工作或接案收入",
                desc: "在台灣境外工作所得也屬海外所得，需合計計算；注意：若已是台灣稅務居民，全球所得均需申報",
              },
              {
                icon: "💰",
                title: "高額保險受益人",
                desc: "單一保單保險給付超過 3,330 萬元的部分需計入基本所得額，請務必確認",
              },
            ].map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="mt-0.5 text-xl">{item.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
            <span className="font-semibold">好消息：</span>{" "}
            台灣一般上班族，若沒有美股/境外基金，通常完全不受最低稅負制影響。
          </div>
        </section>

        {/* ── 聯盟 CTA ── */}
        <TaxAffiliateCTA />

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
          <h2 className="text-base font-bold text-gray-800">
            相關投資稅務工具
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
            {[
              { href: "/foreign-income-tax", label: "海外所得試算" },
              { href: "/stock-tax-2026", label: "投資稅務攻略" },
              { href: "/dividend-tax", label: "台股股利申報" },
              { href: "/tax-calculator", label: "綜合所得稅試算" },
              { href: "/income-tax-brackets", label: "所得稅級距表" },
              { href: "/tax-refund", label: "退稅試算" },
  { href: "/tax-filing-steps", label: "報稅流程" },
  { href: "/joint-filing", label: "夫妻合併vs分開" },
  { href: "/income-tax-guide-2026", label: "報稅完整攻略" },
              { href: "/tax-filing-guide", label: "報稅攻略" },
              { href: "/tax-mistakes-2026", label: "報稅常見錯誤" },
              { href: "/deduction-compare", label: "列舉vs標準扣除" },
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
