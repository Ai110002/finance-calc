import type { Metadata } from "next";
import Link from "next/link";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

export const metadata: Metadata = {
  title: "2026投資稅務完整攻略｜台股/美股/ETF/加密貨幣報稅指南 - 台灣財務試算",
  description:
    "114年度投資稅務完整指南：台股股利稅（合併/分開課稅）、美股海外所得、ETF配息稅、加密貨幣財產交易所得。投資人報稅前必看，含試算工具連結。",
  keywords: [
    "投資稅務",
    "台股報稅",
    "美股稅務",
    "ETF配息稅",
    "加密貨幣稅",
    "股票稅務2026",
    "投資人報稅",
    "114年度投資所得",
    "海外所得申報",
    "最低稅負制",
    "股利所得稅",
    "資本利得稅台灣",
  ],
  openGraph: {
    title: "2026投資稅務完整攻略｜台股/美股/ETF/加密貨幣報稅指南",
    description:
      "114年度投資稅務完整指南：台股股利稅、美股海外所得、ETF配息稅、加密貨幣財產交易所得。投資人報稅前必看。",
    url: "https://www.twtaxcalc.com/stock-tax-2026",
  },
};

const NAV_LINKS = [
  { href: "/", label: "財務自由" },
  { href: "/tax-calculator", label: "報稅計算" },
  { href: "/tax-checklist-2026", label: "報稅懶人包" },
  { href: "/tax-mistakes-2026", label: "報稅常見錯誤" },
  { href: "/stock-tax-2026", label: "投資稅務", active: true },
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
  { href: "/basic-living-deduction", label: "免稅天花板" },
  { href: "/labor-insurance-rates", label: "勞健保費率" },
  { href: "/income-tax-brackets", label: "所得稅級距" },
  { href: "/dependent-deduction", label: "扶養節稅" },
  { href: "/freelancer-tax-guide", label: "接案報稅" },
  { href: "/expense-deduction-compare", label: "費用核實試算" },
  { href: "/supplement-premium", label: "二代健保" },
  { href: "/salary-vs-freelancer", label: "薪資vs接案" },
  { href: "/tax-filing-guide", label: "報稅攻略" },
  { href: "/dividend-tax", label: "股利申報" },
  { href: "/deduction-compare", label: "列舉vs標準" },
  { href: "/preschool-deduction", label: "幼兒學前扣除" },
  { href: "/foreign-income-tax", label: "海外所得" },
  { href: "/tax-refund", label: "退稅試算" },
];

const FAQS = [
  {
    q: "台灣股票買賣價差要課稅嗎？",
    a: "目前台股交易所得（資本利得）免稅，不需申報。但股利仍需申報，可選合併計稅（享8.5%抵減，上限8萬）或分開課稅28%。ETF的資本利得配發也暫時免稅。",
  },
  {
    q: "美股股利和台股股利課稅方式一樣嗎？",
    a: "不一樣。台股股利計入綜合所得，可享8.5%可抵減稅額。美股股利屬海外所得，不適用8.5%抵減，全年海外所得超過100萬需申報最低稅負制，超過基本所得額670萬免稅額部分按20%計稅。",
  },
  {
    q: "美股已在美國被扣30%稅，台灣還要再報嗎？",
    a: "需要申報但可扣抵。美國預扣稅（30%或依租稅協定稅率）可作為海外所得的已納稅額扣抵，避免雙重課稅。申報時需附上美國的稅務憑證。台灣目前與美國無完整租稅協定，但可依最低稅負制規定扣抵。",
  },
  {
    q: "加密貨幣虧損可以扣抵其他所得嗎？",
    a: "同年度的財產交易損失可以扣抵財產交易所得，但不能扣抵薪資等其他類型所得。跨年度損失也無法遞延扣抵。建議保留所有交易記錄，計算出正確的損益。",
  },
  {
    q: "每年都要申報，還是只有獲利超過多少才申報？",
    a: "只要有股利收入（不論金額）就需申報。海外所得方面，單筆或全年合計超過100元（注意：是100元不是100萬）就需填報，但全年海外所得超過100萬才會影響最低稅負計算。實務上，財政部的標準申報表已預先填入扣繳資料，建議仔細核對。",
  },
];

export default function StockTax2026Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "2026投資稅務完整攻略｜台股/美股/ETF/加密貨幣報稅指南",
        description:
          "114年度投資稅務完整指南：台股股利稅（合併/分開課稅）、美股海外所得、ETF配息稅、加密貨幣財產交易所得。",
        url: "https://www.twtaxcalc.com/stock-tax-2026",
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
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-700">
            💰 114 年度投資稅務 · 5 月 31 日申報截止
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            2026 投資稅務完整攻略
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            台股、美股、ETF、加密貨幣，4大投資類型稅務全解析。
            <br />
            報稅前花10分鐘確認，可能替你省下幾萬元。
          </p>
          {/* Quick nav badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
            <div className="rounded-lg bg-blue-100 px-3 py-1.5 font-medium text-blue-700">
              📈 台股股利
            </div>
            <div className="rounded-lg bg-purple-100 px-3 py-1.5 font-medium text-purple-700">
              🌏 美股/海外
            </div>
            <div className="rounded-lg bg-emerald-100 px-3 py-1.5 font-medium text-emerald-700">
              📊 ETF配息
            </div>
            <div className="rounded-lg bg-orange-100 px-3 py-1.5 font-medium text-orange-700">
              ₿ 加密貨幣
            </div>
          </div>
        </section>

        {/* ── 1. 台股股利稅 ── */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-3xl">📈</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">
                  台股股利稅
                </span>
              </div>
              <h2 className="mt-1 text-xl font-bold text-gray-900">
                台股股利稅
              </h2>
              <p className="mt-1 text-sm font-semibold text-blue-600">
                ▶ 股利可選合併計稅或分開課稅28%，大多數人合併更省
              </p>
            </div>
          </div>

          <ul className="mt-4 space-y-2">
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-0.5 shrink-0 text-gray-400">•</span>
              <span>
                <span className="font-semibold">合併計稅：</span>
                股利併入綜合所得，享8.5%可抵減稅額（每戶上限80,000元）
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-0.5 shrink-0 text-gray-400">•</span>
              <span>
                <span className="font-semibold">分開課稅：</span>
                股利按28%分離課稅，不影響綜合所得稅率
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-0.5 shrink-0 text-gray-400">•</span>
              <span>
                <span className="font-semibold">決策原則：</span>
                稅率≤30%選合併，稅率40%才考慮分開
              </span>
            </li>
          </ul>

          <div className="mt-4 rounded-lg bg-amber-50 px-4 py-2 text-sm text-amber-800">
            <span className="font-semibold">快速判斷：</span>{" "}
            年收入（薪資+其他）&lt; 400萬？→ 選合併計稅幾乎一定更省
          </div>

          <Link
            href="/dividend-tax"
            className="mt-5 block rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            試算股利稅兩種方案 →
          </Link>

          <p className="mt-3 rounded-lg bg-gray-50 px-4 py-2 text-xs text-gray-500">
            ℹ️ 台股交易所得（買低賣高的價差）目前免稅，不需申報。
          </p>
        </section>

        {/* ── 2. 美股/海外股票稅 ── */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🌏</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-purple-600 px-2 py-0.5 text-xs font-bold text-white">
                  美股/海外股票稅
                </span>
              </div>
              <h2 className="mt-1 text-xl font-bold text-gray-900">
                美股/海外股票稅
              </h2>
              <p className="mt-1 text-sm font-semibold text-purple-600">
                ▶ 海外所得超過100萬要申報最低稅負制，超過750萬才要繳稅
              </p>
            </div>
          </div>

          <ul className="mt-4 space-y-2">
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-0.5 shrink-0 text-gray-400">•</span>
              <span>
                海外所得（含美股股利、境外基金配息）每年全部合計，超過100萬元需申報最低稅負制
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-0.5 shrink-0 text-gray-400">•</span>
              <span>
                基本所得額 = 綜合所得淨額 + 海外所得。超過670萬免稅額的部分按20%計算最低稅負
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-0.5 shrink-0 text-gray-400">•</span>
              <span>
                美股交易價差（Capital Gain）也屬海外所得，需合計計算
              </span>
            </li>
          </ul>

          <div className="mt-4 rounded-lg bg-amber-50 px-4 py-2 text-sm text-amber-800">
            <span className="font-semibold">快速判斷：</span>{" "}
            去年美股+海外基金所得 &lt; 100萬？→ 不需申報最低稅負，但仍要申報股利扣繳
          </div>

          <Link
            href="/foreign-income-tax"
            className="mt-5 block rounded-xl bg-purple-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700"
          >
            計算海外所得最低稅負 →
          </Link>
        </section>

        {/* ── 聯盟 CTA (after section 2) ── */}
        <TaxAffiliateCTA />

        {/* ── 3. ETF配息稅 ── */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-3xl">📊</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">
                  ETF配息稅
                </span>
              </div>
              <h2 className="mt-1 text-xl font-bold text-gray-900">
                ETF配息稅
              </h2>
              <p className="mt-1 text-sm font-semibold text-emerald-600">
                ▶ ETF配息分兩種：股利部分課稅、資本利得配發免稅
              </p>
            </div>
          </div>

          <ul className="mt-4 space-y-2">
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-0.5 shrink-0 text-gray-400">•</span>
              <span>
                台灣ETF配息分為「股利收益」和「資本利得配發」兩類，投信公司每年會提供明細
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-0.5 shrink-0 text-gray-400">•</span>
              <span>
                <span className="font-semibold">股利收益：</span>
                與一般台股股利相同，可選合併計稅（8.5%抵減）或分開課稅28%
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-0.5 shrink-0 text-gray-400">•</span>
              <span>
                <span className="font-semibold">資本利得配發（非股利）：</span>
                目前免稅，不計入個人綜合所得
              </span>
            </li>
          </ul>

          <div className="mt-4 rounded-lg bg-amber-50 px-4 py-2 text-sm text-amber-800">
            <span className="font-semibold">快速判斷：</span>{" "}
            查詢ETF配息明細（集保e存摺或投信官網），確認各類型金額
          </div>

          <Link
            href="/dividend-tax"
            className="mt-5 block rounded-xl bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            試算股利所得稅 →
          </Link>
        </section>

        {/* ── 4. 加密貨幣稅 ── */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-3xl">₿</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs font-bold text-white">
                  加密貨幣稅
                </span>
              </div>
              <h2 className="mt-1 text-xl font-bold text-gray-900">
                加密貨幣稅
              </h2>
              <p className="mt-1 text-sm font-semibold text-orange-500">
                ▶ 財政部認定加密貨幣為財產，交易所得需申報財產交易所得
              </p>
            </div>
          </div>

          <ul className="mt-4 space-y-2">
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-0.5 shrink-0 text-gray-400">•</span>
              <span>
                加密貨幣（BTC/ETH等）被財政部認定為「財產」，買賣價差屬「財產交易所得」，需計入綜合所得
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-0.5 shrink-0 text-gray-400">•</span>
              <span>
                計算方式：售價 - 成本（購買時的台幣價格）= 財產交易所得，計入綜合所得課稅
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-0.5 shrink-0 text-gray-400">•</span>
              <span>
                如透過境外交易所交易，可能同時涉及「海外所得」，超過100萬需申報最低稅負制
              </span>
            </li>
          </ul>

          <div className="mt-4 rounded-lg bg-amber-50 px-4 py-2 text-sm text-amber-800">
            <span className="font-semibold">快速判斷：</span>{" "}
            去年有加密貨幣獲利？→ 保留所有交易記錄（購買日期、成本、賣出金額）
          </div>

          <Link
            href="/tax-calculator"
            className="mt-5 block rounded-xl bg-orange-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
          >
            計算財產交易所得稅 →
          </Link>
        </section>

        {/* ── 聯盟 CTA (after section 4) ── */}
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
          <h2 className="text-base font-bold text-gray-800">相關投資稅務工具</h2>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
            {[
              { href: "/dividend-tax", label: "台股股利申報試算" },
              { href: "/foreign-income-tax", label: "海外所得試算" },
              { href: "/tax-calculator", label: "綜合所得稅試算" },
              { href: "/income-tax-brackets", label: "所得稅級距表" },
              { href: "/tax-refund", label: "退稅試算" },
              { href: "/deduction-compare", label: "列舉vs標準扣除" },
              { href: "/tax-filing-guide", label: "報稅攻略" },
              { href: "/tax-mistakes-2026", label: "報稅常見錯誤" },
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
