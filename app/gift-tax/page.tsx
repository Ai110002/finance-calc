"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

// ── 贈與稅規則（財政部 114 年度）─────────────────────────────────────────────
// 年度免稅額：2,440,000（244 萬）／人
// 配偶間贈與：免徵（遺產及贈與稅法第 20 條）
//
// 稅率（累進）— 對 課稅贈與淨額：
//   0 ～ 2,500 萬    → 10%
//   2,500 萬 ～ 5,000 萬 → 15%
//   超過 5,000 萬    → 20%
//
// 課稅贈與淨額 ＝ 當年度贈與總額 － 免稅額 244 萬（不得為負）
// ─────────────────────────────────────────────────────────────────────────────

const ANNUAL_EXEMPT = 2_440_000; // 年度免稅額 244 萬

interface GiftResult {
  giftTotal: number;
  exemption: number;
  taxableGift: number;
  tax: number;
  effectiveRate: number;
}

function calcGiftTax(giftWan: number, isSpouse: boolean): GiftResult {
  const giftTotal = giftWan * 10_000;

  // 配偶贈與免稅
  if (isSpouse) {
    return { giftTotal, exemption: giftTotal, taxableGift: 0, tax: 0, effectiveRate: 0 };
  }

  const exemption = ANNUAL_EXEMPT;
  const taxableGift = Math.max(0, giftTotal - exemption);

  let tax = 0;
  if (taxableGift <= 25_000_000) {
    tax = taxableGift * 0.1;
  } else if (taxableGift <= 50_000_000) {
    tax = 25_000_000 * 0.1 + (taxableGift - 25_000_000) * 0.15;
  } else {
    tax = 25_000_000 * 0.1 + 25_000_000 * 0.15 + (taxableGift - 50_000_000) * 0.2;
  }

  const effectiveRate = giftTotal > 0 ? tax / giftTotal : 0;

  return { giftTotal, exemption, taxableGift, tax, effectiveRate };
}

function fmt(n: number): string {
  return `NT$${Math.round(n).toLocaleString("zh-TW")}`;
}

function fmtWan(n: number): string {
  const wan = n / 10_000;
  return wan >= 10000
    ? `${(wan / 10000).toFixed(2)}億`
    : `${wan.toFixed(wan >= 100 ? 0 : 1)}萬`;
}

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
  { href: "/inheritance-tax", label: "遺產稅" },
  { href: "/gift-tax", label: "贈與稅", active: true },
  { href: "/overtime-calculator", label: "加班費" },
  { href: "/severance-calculator", label: "資遣費" },
  { href: "/salary-calculator", label: "月薪試算" },
  { href: "/bonus-calculator", label: "年終獎金" },
  { href: "/pension-calculator", label: "勞退計算" },
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
];

const SCENARIOS = [
  { label: "贈與 244 萬", giftWan: 244 },
  { label: "贈與 500 萬", giftWan: 500 },
  { label: "贈與 1,000 萬", giftWan: 1000 },
  { label: "贈與 2,000 萬", giftWan: 2000 },
  { label: "贈與 3,000 萬", giftWan: 3000 },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "贈與稅計算機",
      url: "https://www.twtaxcalc.com/gift-tax",
      applicationCategory: "FinanceApplication",
      description:
        "台灣贈與稅試算工具，輸入贈與金額立即計算應繳稅額。依財政部 114 年度標準，年度免稅額 244 萬。",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "TWD" },
    },
    {
      "@type": "Article",
      headline: "贈與稅計算機｜台灣 114 年度 免稅額 244 萬｜twtaxcalc.com",
      description:
        "父母贈與子女現金、房產、股票前必看：年度免稅額 244 萬、三級累進稅率、分年贈與節稅策略一次搞懂。",
      author: { "@type": "Organization", name: "twtaxcalc.com" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "台灣贈與稅年度免稅額是多少？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "依財政部 114 年度標準，每人每年可贈與免稅額為 244 萬元（2,440,000 元）。超過部分才需申報並繳納贈與稅。",
          },
        },
        {
          "@type": "Question",
          name: "夫妻間的贈與要繳稅嗎？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "夫妻間相互贈與，依遺產及贈與稅法第 20 條規定，不計入課稅贈與總額，免課贈與稅。但離婚後的財產分配另有規定。",
          },
        },
        {
          "@type": "Question",
          name: "贈與不動產如何計算贈與稅？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "不動產贈與以公告土地現值及房屋評定現值合計計算，而非市價。通常遠低於市價，因此贈與不動產的贈與稅通常低於直接贈與等值現金。",
          },
        },
        {
          "@type": "Question",
          name: "贈與稅申報期限是什麼？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "超過年度免稅額 244 萬的贈與，贈與人必須在贈與行為發生後 30 天內向國稅局申報。未申報可能被補稅並加計罰鍰。",
          },
        },
      ],
    },
  ],
};

export default function GiftTaxPage() {
  const [giftWan, setGiftWan] = useState(500);
  const [isSpouse, setIsSpouse] = useState(false);

  const result = useMemo(
    () => calcGiftTax(giftWan, isSpouse),
    [giftWan, isSpouse]
  );

  return (
    <main className="flex flex-col gap-6 px-4 py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Nav */}
      <nav className="flex gap-2 overflow-x-auto pb-1 text-xs">
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 font-medium transition ${
              l.active
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-600 shadow-sm hover:bg-gray-50"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-gray-900">贈與稅計算機</h1>
        <p className="mt-1 text-sm text-gray-500">
          輸入贈與金額，立即計算應繳稅額與節稅空間。依財政部 114 年度標準，年度免稅額 244 萬。
        </p>
      </header>

      {/* Ad */}
      <AdUnit />

      {/* Inputs */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-800">贈與資料</h2>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            當年度贈與總額（萬元）
            <span className="ml-1 text-xs font-normal text-gray-400">
              不動產以公告現值計
            </span>
          </label>
          <input
            type="number"
            min={0}
            value={giftWan}
            onChange={(e) => setGiftWan(Math.max(0, Number(e.target.value)))}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-right text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
          />
          <p className="mt-1 text-right text-xs text-gray-400">{fmt(giftWan * 10_000)}</p>
        </div>

        <label className="flex cursor-pointer items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
          <span className="text-sm text-gray-700">
            配偶間贈與
            <span className="ml-2 text-xs text-orange-600">夫妻間贈與免稅</span>
          </span>
          <input
            type="checkbox"
            checked={isSpouse}
            onChange={(e) => setIsSpouse(e.target.checked)}
            className="h-4 w-4 accent-orange-500"
          />
        </label>
      </section>

      {/* Results */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-800">計算結果</h2>

        {isSpouse ? (
          <div className="rounded-xl bg-green-50 p-4 text-center">
            <p className="text-3xl font-bold text-green-600">NT$0</p>
            <p className="mt-1 text-sm text-gray-600">夫妻間贈與免課贈與稅</p>
          </div>
        ) : (
          <>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between py-1.5">
                <span className="text-gray-500">贈與總額</span>
                <span className="font-medium">{fmt(result.giftTotal)}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-gray-500">年度免稅額</span>
                <span className="font-medium text-green-600">－ {fmt(ANNUAL_EXEMPT)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-2 pb-1 font-medium">
                <span className="text-gray-700">課稅贈與淨額</span>
                <span>{fmt(result.taxableGift)}</span>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-orange-50 p-4 text-center">
              <p className="text-xs text-gray-500">應繳贈與稅</p>
              <p className="mt-1 text-3xl font-bold text-orange-600">{fmt(result.tax)}</p>
              {result.effectiveRate > 0 && (
                <p className="mt-1 text-xs text-gray-400">
                  有效稅率 {(result.effectiveRate * 100).toFixed(2)}%
                </p>
              )}
              {result.tax === 0 && result.giftTotal > 0 && (
                <p className="mt-2 text-sm text-green-600">
                  贈與額在免稅額 244 萬以內，無需繳納贈與稅
                </p>
              )}
            </div>

            {result.tax > 0 && (
              <div className="mt-3 rounded-xl bg-gray-50 p-3 text-xs text-gray-500 space-y-0.5">
                <p className="font-medium text-gray-700 mb-1">累進稅率說明</p>
                <p>課稅贈與淨額 2,500 萬以下：10%</p>
                <p>2,500 萬 ～ 5,000 萬部分：15%</p>
                <p>5,000 萬以上部分：20%</p>
              </div>
            )}
          </>
        )}
      </section>

      {/* 情境比較 */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-base font-semibold text-gray-800">常見贈與情境比較</h2>
        <p className="mb-3 text-xs text-gray-400">假設贈與對象為子女（非配偶），單一年度贈與</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-400">
                <th className="pb-2 text-left">金額</th>
                <th className="pb-2 text-right">課稅淨額</th>
                <th className="pb-2 text-right">應繳稅額</th>
                <th className="pb-2 text-right">有效稅率</th>
              </tr>
            </thead>
            <tbody>
              {SCENARIOS.map((s) => {
                const r = calcGiftTax(s.giftWan, false);
                return (
                  <tr
                    key={s.giftWan}
                    className={`border-b border-gray-50 ${giftWan === s.giftWan ? "bg-orange-50" : ""}`}
                  >
                    <td className="py-2 font-medium">{s.label}</td>
                    <td className="py-2 text-right text-gray-500">
                      {r.taxableGift === 0 ? "—" : fmtWan(r.taxableGift)}
                    </td>
                    <td
                      className={`py-2 text-right font-semibold ${
                        r.tax === 0 ? "text-green-600" : "text-orange-600"
                      }`}
                    >
                      {r.tax === 0 ? "免稅" : fmt(r.tax)}
                    </td>
                    <td className="py-2 text-right text-gray-400">
                      {r.effectiveRate === 0 ? "0%" : `${(r.effectiveRate * 100).toFixed(1)}%`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 節稅策略 */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-base font-semibold text-gray-800">4 大合法節稅策略</h2>
        <div className="space-y-3">
          {[
            {
              title: "① 分年贈與（最省稅）",
              desc: "每年免稅額 244 萬，10 年贈與 2,440 萬完全免稅。提早計畫，每年按時贈與是零稅負的最佳路徑。",
              color: "border-orange-200 bg-orange-50",
            },
            {
              title: "② 父母各自贈與（免稅額加倍）",
              desc: "父親和母親各有 244 萬免稅額，分開申報即可。合計每年可給子女 488 萬完全免稅，10 年達 4,880 萬。",
              color: "border-amber-200 bg-amber-50",
            },
            {
              title: "③ 不動產以公告現值計算",
              desc: "贈與不動產的稅基是公告現值，而非市價，通常只有市價的 3–5 成。贈與一間市價 1,000 萬的房子，贈與稅可能比贈與 400 萬現金還低。",
              color: "border-yellow-200 bg-yellow-50",
            },
            {
              title: "④ 搭配遺產稅做長期規劃",
              desc: "生前計畫性贈與可降低未來遺產總額，同時善用每年 244 萬免稅額。贈與稅和遺產稅稅率相同（10-20%），但提早贈與還能享有免稅額，划算許多。",
              color: "border-green-200 bg-green-50",
            },
          ].map((item) => (
            <div key={item.title} className={`rounded-xl border p-4 ${item.color}`}>
              <p className="text-sm font-semibold text-gray-800">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Affiliate CTA */}
      <TaxAffiliateCTA />

      {/* Ad */}
      <AdUnit />

      {/* 相關工具 */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-base font-semibold text-gray-800">相關計算工具</h2>
        <div className="flex flex-col gap-2">
          <Link
            href="/inheritance-tax"
            className="rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            遺產稅計算機 →
          </Link>
          <Link
            href="/real-estate-tax"
            className="rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            房地合一稅計算機 →
          </Link>
          <Link
            href="/tax-calculator"
            className="rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            綜合所得稅計算機 →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-800">常見問題</h2>
        <div className="space-y-4">
          {[
            {
              q: "台灣贈與稅年度免稅額是多少？",
              a: "依財政部 114 年度標準，每人每年可贈與免稅額為 244 萬元（2,440,000 元）。超過部分才需申報並繳納贈與稅。",
            },
            {
              q: "夫妻間的贈與要繳稅嗎？",
              a: "夫妻間相互贈與，依遺產及贈與稅法第 20 條規定，不計入課稅贈與總額，免課贈與稅。但離婚後的財產分配另有規定。",
            },
            {
              q: "贈與不動產如何計算贈與稅？",
              a: "不動產贈與以公告土地現值及房屋評定現值合計計算，而非市價。通常遠低於市價，因此贈與不動產的贈與稅通常低於直接贈與等值現金。",
            },
            {
              q: "贈與稅申報期限是什麼？",
              a: "超過年度免稅額 244 萬的贈與，贈與人必須在贈與行為發生後 30 天內向國稅局申報。未申報可能被補稅並加計罰鍰。",
            },
          ].map((faq) => (
            <div key={faq.q} className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
              <p className="text-sm font-semibold text-gray-800">{faq.q}</p>
              <p className="mt-1 text-xs leading-relaxed text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="pb-4 text-center text-xs text-gray-400">
        本工具依財政部 114 年度贈與稅標準計算，僅供參考。
        <br />
        實際稅額以國稅局核定為準。複雜贈與規劃建議諮詢會計師。
      </footer>
    </main>
  );
}
