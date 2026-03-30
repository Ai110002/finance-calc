"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

// ── 114年度綜所稅一般扣除額（擇一）──────────────────────────────────────────
// 標準扣除額：單身 131,000 / 夫妻 262,000
// 列舉扣除額：下列各項合計
//   - 捐贈：政府/公益無上限（一般公益上限為所得 20%）
//   - 人身保險費：24,000/人（健保費另計無上限）
//   - 醫療及生育費：無上限（健保給付部分不可申報）
//   - 自用住宅購屋借款利息：上限 300,000
//   - 房屋租金：上限 120,000（不可與購屋利息同申報）
// ─────────────────────────────────────────────────────────────────────────────

const STANDARD_DEDUCTION = { single: 131_000, married: 262_000 };

const ITEMIZED_LIMITS = {
  lifeInsurancePerPerson: 24_000,
  mortgageInterest: 300_000,
  rent: 120_000,
};

// 114年度累進稅率
const TAX_BRACKETS = [
  { max: 590_000, rate: 0.05 },
  { max: 1_330_000, rate: 0.12 },
  { max: 2_660_000, rate: 0.20 },
  { max: 4_980_000, rate: 0.30 },
  { max: Infinity, rate: 0.40 },
];

const EXEMPTION = 97_000;
const SALARY_DEDUCTION_MAX = 218_000;

function getMarginalRate(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  for (const b of TAX_BRACKETS) {
    if (taxableIncome <= b.max) return b.rate;
  }
  return 0.40;
}

function fmt(n: number): string {
  return `NT$${Math.round(n).toLocaleString("zh-TW")}`;
}

const NAV_LINKS = [
  { href: "/", label: "財務自由" },
  { href: "/tax-calculator", label: "報稅計算" },
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
  { href: "/supplement-premium", label: "二代健保" },
  { href: "/salary-vs-freelancer", label: "薪資vs接案" },
  { href: "/tax-filing-guide", label: "報稅攻略" },
  { href: "/dividend-tax", label: "股利申報" },
  { href: "/deduction-compare", label: "列舉vs標準", active: true },
  { href: "/preschool-deduction", label: "幼兒學前扣除" },
  { href: "/foreign-income-tax", label: "海外所得" },
];

export default function DeductionComparePage() {
  const [filing, setFiling] = useState<"single" | "married">("single");
  const [annualIncome, setAnnualIncome] = useState(720_000);
  // 列舉扣除額輸入
  const [donation, setDonation] = useState(0);
  const [lifeInsurance, setLifeInsurance] = useState(0);
  const [medical, setMedical] = useState(0);
  const [mortgageInterest, setMortgageInterest] = useState(0);
  const [rent, setRent] = useState(0);

  const result = useMemo(() => {
    const persons = filing === "married" ? 2 : 1;
    const insLimit = ITEMIZED_LIMITS.lifeInsurancePerPerson * persons;
    const cappedInsurance = Math.min(lifeInsurance, insLimit);
    const cappedMortgage = Math.min(mortgageInterest, ITEMIZED_LIMITS.mortgageInterest);
    const cappedRent = Math.min(rent, ITEMIZED_LIMITS.rent);

    // 購屋利息與租金互斥：有利息以利息為主
    const housingDeduction = cappedMortgage > 0 ? cappedMortgage : cappedRent;

    const itemizedTotal = donation + cappedInsurance + medical + housingDeduction;
    const standardTotal = STANDARD_DEDUCTION[filing];

    const betterMethod: "itemized" | "standard" =
      itemizedTotal >= standardTotal ? "itemized" : "standard";
    const savings = Math.abs(itemizedTotal - standardTotal);

    // 估算邊際稅率（以實際申報方式計算）
    const salaryDeduction = Math.min(annualIncome, SALARY_DEDUCTION_MAX) * persons;
    const exemptions = EXEMPTION * persons;
    const generalDeduction = betterMethod === "itemized" ? itemizedTotal : standardTotal;
    const taxableIncome = Math.max(0, annualIncome - exemptions - salaryDeduction - generalDeduction);
    const marginalRate = getMarginalRate(taxableIncome);
    const taxImpact = savings * marginalRate;

    return {
      itemizedTotal,
      standardTotal,
      betterMethod,
      savings,
      cappedInsurance,
      cappedMortgage,
      cappedRent,
      housingDeduction,
      insLimit,
      taxableIncome,
      marginalRate,
      taxImpact,
    };
  }, [filing, annualIncome, donation, lifeInsurance, medical, mortgageInterest, rent]);

  return (
    <main className="flex flex-col gap-6 px-4 py-6">
      {/* Nav */}
      <nav className="flex gap-2 overflow-x-auto pb-1 text-xs">
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 font-medium transition ${
              l.active
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 shadow-sm hover:bg-gray-50"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-gray-900">列舉 vs 標準扣除額試算 2026</h1>
        <p className="mt-1 text-sm text-gray-500">
          輸入你的列舉扣除項目，30 秒算出哪種方式少繳更多稅。依財政部 114 年度綜所稅規定。
        </p>
      </header>

      <AdUnit />

      {/* 說明卡 */}
      <section className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4">
        <p className="text-xs font-semibold text-blue-700 mb-1">📋 什麼是一般扣除額？</p>
        <p className="text-xs leading-relaxed text-blue-800">
          綜所稅申報時，「一般扣除額」只能選一種：<br />
          ✓ <strong>標準扣除額</strong>：單身 NT$131,000 / 夫妻 NT$262,000，不需備齊憑證<br />
          ✓ <strong>列舉扣除額</strong>：保險費、醫療費、房貸利息、租金、捐贈...加總<br />
          列舉合計超過標準扣除額 → 用列舉更省稅
        </p>
      </section>

      {/* 申報身分 */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-base font-semibold text-gray-800">申報身分</h2>
        <div className="flex gap-3">
          {(["single", "married"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFiling(f)}
              className={`flex-1 rounded-xl border py-3 text-sm font-semibold transition ${
                filing === f
                  ? "border-blue-500 bg-blue-600 text-white"
                  : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {f === "single" ? "單身" : "夫妻合併申報"}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-400">
          標準扣除額：{filing === "single" ? "NT$131,000" : "NT$262,000（夫妻合計）"}
        </p>
      </section>

      {/* 年所得（用於稅額估算） */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-800">所得與列舉扣除項目</h2>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            薪資年所得（元）
            <span className="ml-1 text-xs font-normal text-gray-400">用於估算節稅金額</span>
          </label>
          <input
            type="number"
            min={0}
            step={10000}
            value={annualIncome}
            onChange={(e) => setAnnualIncome(Math.max(0, Number(e.target.value)))}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-right text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* 捐贈 */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            捐贈（元）
            <span className="ml-1 text-xs font-normal text-gray-400">政府/教育機構無上限；一般公益上限為所得 20%</span>
          </label>
          <input
            type="number"
            min={0}
            step={1000}
            value={donation}
            onChange={(e) => setDonation(Math.max(0, Number(e.target.value)))}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-right text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* 人身保險費 */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            人身保險費（元）
            <span className="ml-1 text-xs font-normal text-gray-400">
              上限 NT$24,000/人（{filing === "married" ? "夫妻合計上限 NT$48,000" : "上限 NT$24,000"}）
            </span>
          </label>
          <input
            type="number"
            min={0}
            step={1000}
            value={lifeInsurance}
            onChange={(e) => setLifeInsurance(Math.max(0, Number(e.target.value)))}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-right text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          {lifeInsurance > result.insLimit && (
            <p className="mt-1 text-xs text-amber-600">超出上限，實際可扣：{fmt(result.insLimit)}</p>
          )}
        </div>

        {/* 醫療費 */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            醫療及生育費（元）
            <span className="ml-1 text-xs font-normal text-gray-400">自費部分無上限；健保給付部分不可申報</span>
          </label>
          <input
            type="number"
            min={0}
            step={1000}
            value={medical}
            onChange={(e) => setMedical(Math.max(0, Number(e.target.value)))}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-right text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* 購屋貸款利息 */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            自用住宅購屋借款利息（元）
            <span className="ml-1 text-xs font-normal text-gray-400">上限 NT$300,000（需減去儲蓄特扣額）</span>
          </label>
          <input
            type="number"
            min={0}
            step={1000}
            value={mortgageInterest}
            onChange={(e) => setMortgageInterest(Math.max(0, Number(e.target.value)))}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-right text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          {mortgageInterest > ITEMIZED_LIMITS.mortgageInterest && (
            <p className="mt-1 text-xs text-amber-600">超出上限，實際可扣：{fmt(ITEMIZED_LIMITS.mortgageInterest)}</p>
          )}
        </div>

        {/* 租金 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            房屋租金支出（元）
            <span className="ml-1 text-xs font-normal text-gray-400">上限 NT$120,000，不可與購屋利息同申報</span>
          </label>
          <input
            type="number"
            min={0}
            step={1000}
            value={rent}
            onChange={(e) => setRent(Math.max(0, Number(e.target.value)))}
            className={`w-full rounded-xl border px-4 py-2.5 text-right text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 ${
              mortgageInterest > 0 && rent > 0 ? "border-amber-300 bg-amber-50" : "border-gray-200"
            }`}
          />
          {mortgageInterest > 0 && rent > 0 && (
            <p className="mt-1 text-xs text-amber-600">
              已填購屋利息，租金不可同時申報。以利息 {fmt(result.cappedMortgage)} 為準。
            </p>
          )}
          {rent > ITEMIZED_LIMITS.rent && mortgageInterest === 0 && (
            <p className="mt-1 text-xs text-amber-600">超出上限，實際可扣：{fmt(ITEMIZED_LIMITS.rent)}</p>
          )}
        </div>
      </section>

      {/* 結果 */}
      <section
        className={`rounded-2xl p-5 shadow-md text-white ${
          result.betterMethod === "itemized"
            ? "bg-gradient-to-br from-green-500 to-emerald-600"
            : "bg-gradient-to-br from-blue-600 to-indigo-600"
        }`}
      >
        <p className="text-sm font-medium opacity-90">建議申報方式</p>
        <p className="mt-1 text-3xl font-bold">
          {result.betterMethod === "itemized" ? "列舉扣除額" : "標準扣除額"}
        </p>
        <p className="mt-1 text-sm opacity-90">
          {result.betterMethod === "itemized"
            ? `列舉合計 ${fmt(result.itemizedTotal)}，比標準多 ${fmt(result.savings)}`
            : result.savings === 0
            ? "列舉與標準相同，選標準最省事"
            : `標準扣除額 ${fmt(result.standardTotal)}，比你的列舉合計多 ${fmt(result.savings)}`}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div
            className={`rounded-xl px-3 py-2.5 ${
              result.betterMethod === "itemized" ? "bg-white/25" : "bg-white/15"
            }`}
          >
            <p className="text-xs opacity-80">列舉扣除額合計</p>
            <p className="text-lg font-bold">{fmt(result.itemizedTotal)}</p>
          </div>
          <div
            className={`rounded-xl px-3 py-2.5 ${
              result.betterMethod === "standard" ? "bg-white/25" : "bg-white/15"
            }`}
          >
            <p className="text-xs opacity-80">標準扣除額</p>
            <p className="text-lg font-bold">{fmt(result.standardTotal)}</p>
          </div>
        </div>

        {result.savings > 0 && result.marginalRate > 0 && (
          <div className="mt-3 rounded-xl bg-white/20 px-4 py-2.5">
            <p className="text-xs font-semibold">
              選對方式，估計少繳所得稅：約 {fmt(result.taxImpact)}
            </p>
            <p className="mt-0.5 text-xs opacity-85">
              {fmt(result.savings)} 扣除額差距 × 邊際稅率 {(result.marginalRate * 100).toFixed(0)}%
            </p>
          </div>
        )}
      </section>

      {/* 列舉明細 */}
      {result.itemizedTotal > 0 && (
        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-gray-700">列舉扣除明細</h2>
          <div className="space-y-2 text-sm">
            {donation > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">捐贈</span>
                <span className="font-medium text-gray-800">{fmt(donation)}</span>
              </div>
            )}
            {result.cappedInsurance > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">人身保險費</span>
                <span className="font-medium text-gray-800">{fmt(result.cappedInsurance)}</span>
              </div>
            )}
            {medical > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">醫療及生育費</span>
                <span className="font-medium text-gray-800">{fmt(medical)}</span>
              </div>
            )}
            {result.housingDeduction > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {result.cappedMortgage > 0 ? "購屋借款利息" : "房屋租金"}
                </span>
                <span className="font-medium text-gray-800">{fmt(result.housingDeduction)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-gray-100 pt-2">
              <span className="font-semibold text-gray-800">列舉合計</span>
              <span className="font-bold text-gray-900">{fmt(result.itemizedTotal)}</span>
            </div>
          </div>
        </section>
      )}

      <TaxAffiliateCTA />

      {/* 情境比較表 */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-base font-semibold text-gray-800">常見情境比較</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-500">
                <th className="pb-2 text-left font-medium">情境</th>
                <th className="pb-2 text-right font-medium">標準</th>
                <th className="pb-2 text-right font-medium">列舉</th>
                <th className="pb-2 text-right font-medium">建議</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "單身，無特別支出", std: 131_000, itemized: 0 },
                { label: "單身，保險 2.4 萬＋醫療 5 萬", std: 131_000, itemized: 74_000 },
                { label: "單身，自費醫療 20 萬（重病）", std: 131_000, itemized: 224_000 },
                { label: "夫妻，保險 4.8 萬＋醫療 30 萬", std: 262_000, itemized: 348_000 },
                { label: "夫妻，房貸利息 25 萬＋保險 4.8 萬", std: 262_000, itemized: 298_000 },
                { label: "單身，房租 12 萬（上限）", std: 131_000, itemized: 120_000 },
              ].map(({ label, std, itemized }) => (
                <tr key={label} className="border-b border-gray-50">
                  <td className="py-2 pr-3 text-gray-700 leading-tight">{label}</td>
                  <td className="py-2 text-right text-gray-600">{fmt(std)}</td>
                  <td className="py-2 text-right text-gray-600">{fmt(itemized)}</td>
                  <td
                    className={`py-2 text-right font-semibold ${
                      itemized >= std ? "text-green-600" : "text-blue-600"
                    }`}
                  >
                    {itemized >= std ? "列舉" : "標準"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-gray-400">
          ※ 高稅率（20%+）族群，選對方式節稅效果更顯著。
        </p>
      </section>

      {/* 4 大注意事項 */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-base font-semibold text-gray-800">列舉扣除 4 大注意事項</h2>
        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex gap-2">
            <span className="mt-0.5 flex-shrink-0 text-blue-500">✓</span>
            <span>
              <strong>保險費每人上限 NT$24,000</strong>：健保費另計不受限，人壽、癌症等人身保險每人最多 NT$24,000。
              夫妻合計上限 NT$48,000。
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-0.5 flex-shrink-0 text-blue-500">✓</span>
            <span>
              <strong>購屋利息與租金二擇一</strong>：不可同時申報。有自用住宅貸款選利息（上限較高 NT$300,000）；
              純租屋族選租金（上限 NT$120,000）。
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-0.5 flex-shrink-0 text-blue-500">✓</span>
            <span>
              <strong>醫療費需保留收據</strong>：自費部分無上限，但健保給付部分不得申報。
              看牙齒、生育、手術自費差額均可列舉，記得向院所索取收據。
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-0.5 flex-shrink-0 text-blue-500">✓</span>
            <span>
              <strong>一般扣除額 vs 特別扣除額不互斥</strong>：選標準或列舉後，薪資特別扣除額（上限 NT$218,000）、
              幼兒學前特扣（NT$150,000/子）等「特別扣除額」仍可另外再扣，不受影響。
            </span>
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-base font-semibold text-gray-800">常見問題</h2>
        <div className="space-y-4">
          {[
            {
              q: "什麼情況應該用列舉扣除額？",
              a: "當你的列舉項目加總超過標準扣除額（單身 NT$131,000 / 夫妻 NT$262,000）時，用列舉更划算。常見情況：有高額自費醫療、夫妻保險費達上限、房貸年利息超過 NT$20~30 萬等。",
            },
            {
              q: "列舉扣除需要準備哪些文件？",
              a: "保險費：保險公司繳費證明；醫療費：醫療院所自費收據；購屋利息：銀行年度利息支出證明；租金：租賃契約及付款紀錄；捐贈：公益機構收據。健保署等機關資料會自動匯入網路申報系統。",
            },
            {
              q: "申報後發現選錯，可以改嗎？",
              a: "在申報截止日（5月31日）前可隨時更改。截止後，若在規定期限內（通常 5 年內）可向國稅局申請更正申報，超繳的稅款可退還。",
            },
            {
              q: "房貸利息上限 NT$300,000 是利息還是本金？",
              a: "是「利息支出金額」，不含本金還款。銀行每年會寄送「房屋貸款利息支出證明書」，上面載明年度實際支付利息，這才是可申報的金額。通常房貸前幾年利息較高，後期隨本金減少而遞減。",
            },
          ].map(({ q, a }) => (
            <div key={q}>
              <p className="text-sm font-semibold text-gray-800">{q}</p>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Internal links */}
      <section className="rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4">
        <p className="mb-3 text-xs font-semibold text-gray-500">相關工具</p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/tax-calculator"
            className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-100 transition"
          >
            綜所稅試算 →
          </Link>
          <Link
            href="/dependent-deduction"
            className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-100 transition"
          >
            扶養節稅試算 →
          </Link>
          <Link
            href="/basic-living-deduction"
            className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-100 transition"
          >
            免稅天花板 →
          </Link>
          <Link
            href="/income-tax-brackets"
            className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-100 transition"
          >
            所得稅級距 →
          </Link>
          <Link
            href="/tax-filing-guide"
            className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-100 transition"
          >
            報稅攻略 →
          </Link>
        </div>
      </section>
    </main>
  );
}
