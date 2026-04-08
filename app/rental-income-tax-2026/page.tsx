"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

// ── 114年度（2026年申報）租賃所得相關規定 ──────────────────────────
// 費用率：43%（居住用房屋，免附憑證）
// 租賃所得 = 年租金 × 57%（費用率43%法）
// 或列舉實際費用：維修費、折舊、管理費、房屋稅、地價稅、貸款利息
// 二代健保補充保費：2.11%，每次租金 > NT$20,000 由承租方代扣
// ─────────────────────────────────────────────────────────────────

const TAX_BRACKETS = [
  { max: 590_000,   rate: 0.05, deduction: 0 },
  { max: 1_330_000, rate: 0.12, deduction: 41_300 },
  { max: 2_660_000, rate: 0.20, deduction: 147_700 },
  { max: 4_980_000, rate: 0.30, deduction: 413_700 },
  { max: Infinity,  rate: 0.40, deduction: 911_700 },
];

const RENTAL_EXPENSE_RATE = 0.43;
const STANDARD_DEDUCTION = 131_000;
const SALARY_DEDUCTION = 218_000;
const PERSONAL_EXEMPTION = 97_000;
const SUPPLEMENT_RATE = 0.0211;
const SUPPLEMENT_THRESHOLD = 20_000;

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
  { href: "/pension-calculator", label: "勞退計算" },
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
  { href: "/tax-filing-steps", label: "報稅流程" },
  { href: "/joint-filing", label: "夫妻合併vs分開" },
  { href: "/income-tax-guide-2026", label: "報稅完整攻略" },
  { href: "/side-income-tax", label: "副業所得申報" },
  { href: "/tax-strategy-2026", label: "省稅策略" },
  { href: "/tax-refund-timeline", label: "退稅時程" },
  { href: "/day-trading-tax", label: "當沖稅費" },
  { href: "/ira-vs-labor-retirement", label: "勞退vs ETF" },
  { href: "/legal-tax-savings-2026", label: "省稅10招" },
  { href: "/rental-income-tax-2026", label: "出租報稅", active: true },
];

const FAQS = [
  {
    q: "出租房屋一定要申報所得稅嗎？",
    a: "是的。租賃所得屬於綜合所得稅課稅範圍，房東每年5月需申報。即使未收到扣繳憑單，也應主動申報。未申報可能面臨補稅加罰鍰。",
  },
  {
    q: "費用率43%是怎麼來的？需要提供憑證嗎？",
    a: "財政部規定居住用房屋租賃所得可適用43%費用率，代表政府認定你有43%的收入用於折舊、維修、管理等成本。採費用率法不需提供收據，直接從年租金扣除43%即可。",
  },
  {
    q: "什麼時候用列舉實際費用比較划算？",
    a: "當你的實際費用（維修費+管理費+折舊+房屋稅+地價稅+貸款利息）超過年租金的43%時，列舉實際費用反而能扣除更多，應納所得更低，稅更少。需保留所有費用憑證。",
  },
  {
    q: "二代健保補充保費由誰繳？怎麼算？",
    a: "每次租金超過NT$20,000時，「扣費義務人」（即承租方，如公司或個人）應代扣2.11%補充保費，再將剩餘租金付給房東。例如月租$25,000，代扣$527.5，房東實收$24,472.5。補充保費屬於健保費，不能抵扣所得稅。",
  },
  {
    q: "夫妻一方出租房屋，所得要合計申報嗎？",
    a: "台灣夫妻需合併申報綜合所得稅，租賃所得會加入夫妻總所得計算。若其中一方所得較高，租賃所得可能推升適用稅率。可用本站「夫妻合併vs分開申報」計算器比較是否分開申報更有利。",
  },
];

function calcTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  for (const b of TAX_BRACKETS) {
    if (taxableIncome <= b.max) {
      return Math.round(taxableIncome * b.rate - b.deduction);
    }
  }
  return 0;
}

function fmt(n: number): string {
  return Math.round(n).toLocaleString("zh-TW");
}

const EXAMPLES = [
  { label: "月薪族兼出租", monthlyRent: 15_000, months: 12, otherIncome: 480_000 },
  { label: "中薪房東", monthlyRent: 25_000, months: 12, otherIncome: 720_000 },
  { label: "高薪多房東", monthlyRent: 45_000, months: 12, otherIncome: 1_500_000 },
];

function computeResult(
  rent: number,
  m: number,
  other: number,
  expenseMethod: "rate" | "actual",
  actual: number
) {
  const annualRent = rent * m;
  const expenseDeduction =
    expenseMethod === "rate"
      ? Math.round(annualRent * RENTAL_EXPENSE_RATE)
      : Math.min(actual, annualRent);
  const rentalIncome = Math.max(annualRent - expenseDeduction, 0);
  const salaryDed = Math.min(other, SALARY_DEDUCTION);
  const baseNet = Math.max(other - PERSONAL_EXEMPTION - STANDARD_DEDUCTION - salaryDed, 0);
  const baseTax = calcTax(baseNet);
  const totalNet = Math.max(other + rentalIncome - PERSONAL_EXEMPTION - STANDARD_DEDUCTION - salaryDed, 0);
  const totalTax = calcTax(totalNet);
  const additionalTax = totalTax - baseTax;
  const effectiveRate = annualRent > 0 ? (additionalTax / annualRent) * 100 : 0;
  const netRental = annualRent - additionalTax;
  const supplementPremium = rent > SUPPLEMENT_THRESHOLD ? Math.round(annualRent * SUPPLEMENT_RATE) : 0;
  const marginalRate = TAX_BRACKETS.find((b) => totalNet <= b.max)?.rate ?? 0.40;
  return { annualRent, expenseDeduction, rentalIncome, additionalTax, effectiveRate, netRental, supplementPremium, marginalRate };
}

export default function RentalIncomeTaxPage() {
  const [monthlyRent, setMonthlyRent] = useState("20000");
  const [months, setMonths] = useState("12");
  const [otherIncome, setOtherIncome] = useState("600000");
  const [expenseMethod, setExpenseMethod] = useState<"rate" | "actual">("rate");
  const [actualExpenses, setActualExpenses] = useState("0");

  const result = useMemo(() => {
    const rent = parseFloat(monthlyRent) || 0;
    const m = Math.min(Math.max(parseInt(months) || 12, 1), 12);
    const other = parseFloat(otherIncome) || 0;
    const actual = parseFloat(actualExpenses) || 0;
    return computeResult(rent, m, other, expenseMethod, actual);
  }, [monthlyRent, months, otherIncome, expenseMethod, actualExpenses]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="sticky top-0 z-10 overflow-x-auto bg-white shadow-sm">
        <div className="flex gap-2 px-4 py-2">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`whitespace-nowrap rounded-full px-3 py-1 text-sm transition ${
                "active" in l && l.active
                  ? "bg-orange-600 text-white font-semibold"
                  : "border border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-600"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-4 py-8 space-y-8">
        {/* Hero */}
        <header>
          <h1 className="text-2xl font-bold text-gray-900">
            房屋出租報稅 2026
          </h1>
          <p className="mt-2 text-gray-600">
            114年度租賃所得費用率43%試算 · 計算出租房屋對綜所稅的影響
          </p>
          <p className="mt-1 text-sm text-orange-700 font-medium">
            📅 申報截止：2026年5月31日
          </p>
        </header>

        {/* Calculator */}
        <section className="rounded-2xl bg-white p-6 shadow-sm space-y-5">
          <h2 className="text-lg font-semibold text-gray-800">租賃所得試算</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                月租金（元）
              </label>
              <input
                type="number"
                min={1000}
                step={1000}
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
                placeholder="20000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                出租月數
              </label>
              <input
                type="number"
                min={1}
                max={12}
                value={months}
                onChange={(e) => setMonths(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              其他年收入（薪資/執業所得等，元）
            </label>
            <input
              type="number"
              min={0}
              step={10000}
              value={otherIncome}
              onChange={(e) => setOtherIncome(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
              placeholder="600000"
            />
            <p className="mt-1 text-xs text-gray-400">
              若為薪資所得，計算時自動適用薪資特別扣除額 NT$218,000
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              費用扣除方式
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="expenseMethod"
                  value="rate"
                  checked={expenseMethod === "rate"}
                  onChange={() => setExpenseMethod("rate")}
                  className="accent-orange-500"
                />
                <span className="text-sm">費用率43%（免附憑證，最常用）</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="expenseMethod"
                  value="actual"
                  checked={expenseMethod === "actual"}
                  onChange={() => setExpenseMethod("actual")}
                  className="accent-orange-500"
                />
                <span className="text-sm">列舉實際費用</span>
              </label>
            </div>
          </div>

          {expenseMethod === "actual" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                實際費用合計（元）
              </label>
              <input
                type="number"
                min={0}
                step={1000}
                value={actualExpenses}
                onChange={(e) => setActualExpenses(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
                placeholder="0"
              />
              <p className="mt-1 text-xs text-gray-400">
                可扣除：維修費、管理費、建物折舊、房屋稅、地價稅、貸款利息
              </p>
            </div>
          )}

          {/* Results */}
          <div className="rounded-xl bg-orange-50 border border-orange-100 p-5 space-y-3">
            <h3 className="font-semibold text-gray-800">試算結果</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">年租金總收入</span>
                <span className="font-medium">NT${fmt(result.annualRent)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  費用扣除
                  {expenseMethod === "rate" ? "（43%費用率）" : "（列舉實際費用）"}
                </span>
                <span className="font-medium text-green-700">－NT${fmt(result.expenseDeduction)}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-700 font-medium">租賃所得（應申報）</span>
                <span className="font-bold">NT${fmt(result.rentalIncome)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">適用綜所稅率</span>
                <span className="font-medium">{(result.marginalRate * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-700 font-medium">預估多繳稅金</span>
                <span className={`font-bold text-lg ${result.additionalTax > 0 ? "text-red-600" : "text-green-600"}`}>
                  NT${fmt(result.additionalTax)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">稅後實拿租金（年）</span>
                <span className="font-medium text-green-700">NT${fmt(result.netRental)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">實質稅率（多繳稅÷年租金）</span>
                <span className="font-medium">{result.effectiveRate.toFixed(1)}%</span>
              </div>
              {result.supplementPremium > 0 && (
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600">二代健保補充保費（年，承租方代扣）</span>
                  <span className="font-medium text-amber-700">NT${fmt(result.supplementPremium)}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        {/* Method comparison table */}
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">費用率43% vs 列舉實際費用</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left text-gray-700">項目</th>
                  <th className="border border-gray-200 px-3 py-2 text-center text-orange-700">費用率43%</th>
                  <th className="border border-gray-200 px-3 py-2 text-center text-blue-700">列舉實際費用</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 text-gray-600">需要收據</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-medium">不需要</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-500">需要保留憑證</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2 text-gray-600">可扣除金額</td>
                  <td className="border border-gray-200 px-3 py-2 text-center">年租金 × 43%</td>
                  <td className="border border-gray-200 px-3 py-2 text-center">實際費用（無上限）</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 text-gray-600">可扣除費用項目</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-gray-500">全部打包計算</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-sm">維修費、折舊、管理費、<br/>房屋稅、地價稅、貸款利息</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2 text-gray-600">適合對象</td>
                  <td className="border border-gray-200 px-3 py-2 text-center">大多數房東</td>
                  <td className="border border-gray-200 px-3 py-2 text-center">有高額修繕或貸款利息者</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 text-gray-600">何時選列舉更划算</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-gray-400">—</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-blue-700 font-medium">實際費用 {">"} 年租金43%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Examples */}
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">三種常見情況試算</h2>
          <div className="space-y-4">
            {EXAMPLES.map((ex) => {
              const r = computeResult(ex.monthlyRent, ex.months, ex.otherIncome, "rate", 0);
              return (
                <div key={ex.label} className="rounded-xl border border-gray-100 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">{ex.label}</span>
                    <span className="text-sm text-gray-500">
                      月租NT${fmt(ex.monthlyRent)} · 薪資NT${fmt(ex.otherIncome)}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div className="rounded-lg bg-gray-50 p-2">
                      <div className="text-gray-500 text-xs mb-1">租賃所得</div>
                      <div className="font-semibold">NT${fmt(r.rentalIncome)}</div>
                    </div>
                    <div className="rounded-lg bg-red-50 p-2">
                      <div className="text-gray-500 text-xs mb-1">多繳稅金/年</div>
                      <div className="font-semibold text-red-600">NT${fmt(r.additionalTax)}</div>
                    </div>
                    <div className="rounded-lg bg-green-50 p-2">
                      <div className="text-gray-500 text-xs mb-1">實質稅率</div>
                      <div className="font-semibold text-green-700">{r.effectiveRate.toFixed(1)}%</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Affiliate CTA */}
        <TaxAffiliateCTA />

        {/* FAQ */}
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">常見問題</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details key={i} className="group rounded-xl border border-gray-100 p-4">
                <summary className="cursor-pointer font-medium text-gray-800 list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform text-xs">▼</span>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related links */}
        <section className="rounded-2xl bg-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">相關試算工具</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/tax-calculator", label: "綜合所得稅試算" },
              { href: "/joint-filing", label: "夫妻合併vs分開申報" },
              { href: "/deduction-compare", label: "列舉vs標準扣除" },
              { href: "/legal-tax-savings-2026", label: "10個省稅方法" },
              { href: "/real-estate-tax", label: "房地合一稅（賣房）" },
              { href: "/house-tax", label: "房屋稅試算" },
              { href: "/supplement-premium", label: "二代健保補充保費" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full border border-gray-300 bg-white px-3 py-1 text-sm text-gray-600 hover:border-orange-400 hover:text-orange-600 transition"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </section>

        <AdUnit className="my-2" />
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "台灣房屋出租報稅計算器 2026",
            description:
              "114年度租賃所得費用率43%試算，計算出租房屋要多繳多少綜合所得稅，含二代健保補充保費說明",
            url: "https://www.twtaxcalc.com/rental-income-tax-2026",
            applicationCategory: "FinanceApplication",
          }),
        }}
      />
    </div>
  );
}
