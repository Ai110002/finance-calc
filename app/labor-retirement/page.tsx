"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

// ── 勞退新制規則（勞工退休金條例，114年度）──────────────────────────────────
// 雇主強制提撥：月薪 × 6%（依實際薪資，非投保薪資）
// 員工自提：月薪 × 0~6%（自提金額免計當年度薪資所得，100%節稅）
// 最低請領年齡：60 歲（工作年資滿 15 年可選月領；不足 15 年一次領）
// 帳戶性質：個人帳戶，工作年資可累計，離職不歸零
// 政府保底：不低於中華郵政二年期定存利率（近年約 1.6%）
// ─────────────────────────────────────────────────────────────────────────────

// 114年度綜所稅累進稅率（用於計算自提節稅效果）
const TAX_BRACKETS = [
  { max: 590_000,   rate: 0.05 },
  { max: 1_330_000, rate: 0.12 },
  { max: 2_660_000, rate: 0.20 },
  { max: 4_980_000, rate: 0.30 },
  { max: Infinity,  rate: 0.40 },
  { href: "/tax-refund-timeline", label: "退稅時程" },
  { href: "/day-trading-tax", label: "當沖稅費" },
  { href: "/ira-vs-labor-retirement", label: "勞退vs ETF" },
];

// 114年度扣除額常數（用於估算邊際稅率）
const STANDARD_DEDUCTION_SINGLE = 131_000;
const SALARY_DEDUCTION = 218_000;
const EXEMPTION_PER_PERSON = 97_000;

function getMarginalRate(monthlySalary: number): number {
  const annual = monthlySalary * 12;
  const netIncome = Math.max(
    0,
    annual - EXEMPTION_PER_PERSON - STANDARD_DEDUCTION_SINGLE - Math.min(annual, SALARY_DEDUCTION)
  );
  for (const b of TAX_BRACKETS) {
    if (netIncome <= b.max) return b.rate;
  }
  return 0.40;
}

// FV of monthly contribution with annual return（月複利終值，不含最後月）
function calcFV(monthly: number, annualRate: number, years: number): number {
  if (years <= 0 || monthly <= 0) return 0;
  const r = annualRate / 12;
  const n = years * 12;
  if (r === 0) return monthly * n;
  return monthly * ((Math.pow(1 + r, n) - 1) / r);
}

function fmt(n: number): string {
  return `NT$${Math.round(n).toLocaleString("zh-TW")}`;
}

function fmtWan(n: number): string {
  const wan = Math.round(n / 10_000);
  return `約 ${wan.toLocaleString("zh-TW")} 萬`;
}

const RETURN_OPTIONS = [
  { label: "保守（年化 2%）", value: 0.02 },
  { label: "穩健（年化 4%）", value: 0.04 },
  { label: "積極（年化 6%）", value: 0.06 },
];

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
  { href: "/labor-retirement", label: "勞退新制", active: true },
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
];

// 情境比較表
const SCENARIOS: { label: string; monthly: number }[] = [
  { label: "月薪 3 萬", monthly: 30_000 },
  { label: "月薪 4.5 萬", monthly: 45_000 },
  { label: "月薪 6 萬", monthly: 60_000 },
  { label: "月薪 8 萬", monthly: 80_000 },
  { label: "月薪 10 萬", monthly: 100_000 },
];

export default function LaborRetirementPage() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlySalary, setMonthlySalary] = useState(50_000);
  const [selfContribPct, setSelfContribPct] = useState(0);
  const [returnRate, setReturnRate] = useState(0.04);

  const result = useMemo(() => {
    const years = Math.max(0, retirementAge - currentAge);
    const employerMonthly = monthlySalary * 0.06;
    const selfMonthly = monthlySalary * (selfContribPct / 100);
    const totalMonthly = employerMonthly + selfMonthly;

    const employerFV = calcFV(employerMonthly, returnRate, years);
    const selfFV = calcFV(selfMonthly, returnRate, years);
    const totalFV = employerFV + selfFV;

    // 月領（平均餘命 25 年 = 300 個月）
    const monthlyPension = totalFV / 300;

    // 節稅計算（自提部分免計薪資所得）
    const marginalRate = getMarginalRate(monthlySalary);
    const annualSelfContrib = selfMonthly * 12;
    const annualTaxSaving = annualSelfContrib * marginalRate;
    const totalTaxSaving = annualTaxSaving * years;

    // 雇主純提撥（不含報酬）
    const employerRaw = employerMonthly * 12 * years;
    const selfRaw = selfMonthly * 12 * years;

    return {
      years,
      employerMonthly,
      selfMonthly,
      totalFV,
      employerFV,
      selfFV,
      monthlyPension,
      marginalRate,
      annualTaxSaving,
      totalTaxSaving,
      employerRaw,
      selfRaw,
    };
  }, [currentAge, retirementAge, monthlySalary, selfContribPct, returnRate]);

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
        <h1 className="text-2xl font-bold text-gray-900">勞退新制試算機 2026</h1>
        <p className="mt-1 text-sm text-gray-500">
          計算雇主提撥 + 自願提撥的退休金累積，以及自提節稅效果。依勞工退休金條例，60 歲可申請領取。
        </p>
      </header>

      {/* Ad */}
      <AdUnit />

      {/* 說明卡：勞退 vs 勞保 */}
      <section className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4">
        <p className="text-xs font-semibold text-blue-700 mb-1">📋 勞退新制 ≠ 勞保老年給付</p>
        <p className="text-xs leading-relaxed text-blue-800">
          兩者是不同帳戶：<strong>勞退新制</strong>是雇主強制提撥 6% 進你的個人帳戶（加上你可自提 0~6%）；
          <strong>勞保老年給付</strong>是社會保險制度，依投保年資和薪資計算。
          這個工具只計算勞退新制部分。
        </p>
      </section>

      {/* Inputs */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-800">你的狀況</h2>

        <div className="mb-4 grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">目前年齡</label>
            <input
              type="number"
              min={20}
              max={59}
              value={currentAge}
              onChange={(e) => setCurrentAge(Math.min(59, Math.max(20, Number(e.target.value))))}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-right text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">退休年齡</label>
            <input
              type="number"
              min={60}
              max={75}
              value={retirementAge}
              onChange={(e) => setRetirementAge(Math.min(75, Math.max(60, Number(e.target.value))))}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-right text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            月薪（元）
            <span className="ml-1 text-xs font-normal text-gray-400">雇主依此計算 6% 提撥</span>
          </label>
          <input
            type="number"
            min={0}
            step={1000}
            value={monthlySalary}
            onChange={(e) => setMonthlySalary(Math.max(0, Number(e.target.value)))}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-right text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
          />
          <p className="mt-1 text-right text-xs text-gray-400">
            雇主每月提撥 {fmt(monthlySalary * 0.06)}
          </p>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            員工自提率（%）
            <span className="ml-1 text-xs font-normal text-gray-400">0~6%，自提金額免計薪資所得</span>
          </label>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4, 5, 6].map((pct) => (
              <button
                key={pct}
                onClick={() => setSelfContribPct(pct)}
                className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${
                  selfContribPct === pct
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
          {selfContribPct > 0 && (
            <p className="mt-1.5 text-xs text-orange-600 font-medium">
              每月自提 {fmt(monthlySalary * selfContribPct / 100)}，
              每年節稅 {fmt(monthlySalary * selfContribPct / 100 * 12 * result.marginalRate)}（邊際稅率 {(result.marginalRate * 100).toFixed(0)}%）
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">預期年化報酬率</label>
          <div className="space-y-2">
            {RETURN_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-2.5 transition ${
                  returnRate === opt.value
                    ? "border-orange-300 bg-orange-50"
                    : "border-gray-100 bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <span className="text-sm text-gray-700">{opt.label}</span>
                <input
                  type="radio"
                  name="returnRate"
                  value={opt.value}
                  checked={returnRate === opt.value}
                  onChange={() => setReturnRate(opt.value)}
                  className="h-4 w-4 accent-orange-500"
                />
              </label>
            ))}
          </div>
          <p className="mt-1.5 text-xs text-gray-400">
            勞退基金近 5 年平均報酬率約 4~6%。保守估計建議選「穩健」。
          </p>
        </div>
      </section>

      {/* Results */}
      {result.years > 0 && (
        <section className="rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 p-5 text-white shadow-md">
          <p className="text-sm font-medium opacity-90">
            從現在到 {retirementAge} 歲，還有 {result.years} 年
          </p>
          <p className="mt-3 text-4xl font-bold tracking-tight">
            {fmtWan(result.totalFV)}
          </p>
          <p className="mt-1 text-sm opacity-90">預估退休金總額</p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/15 px-3 py-2.5">
              <p className="text-xs opacity-80">月領（估）</p>
              <p className="text-lg font-bold">{fmt(result.monthlyPension)}</p>
              <p className="text-[10px] opacity-70">依平均餘命 25 年試算</p>
            </div>
            <div className="rounded-xl bg-white/15 px-3 py-2.5">
              <p className="text-xs opacity-80">雇主累積提撥</p>
              <p className="text-lg font-bold">{fmtWan(result.employerFV)}</p>
              <p className="text-[10px] opacity-70">含複利報酬</p>
            </div>
          </div>

          {selfContribPct > 0 && (
            <div className="mt-3 rounded-xl bg-white/20 px-4 py-3">
              <p className="text-xs font-semibold">
                自提 {selfContribPct}% 額外累積：{fmtWan(result.selfFV)}
              </p>
              <p className="mt-0.5 text-xs opacity-90">
                + {result.years} 年累計節稅：{fmt(result.totalTaxSaving)}（每年省 {fmt(result.annualTaxSaving)}）
              </p>
            </div>
          )}
        </section>
      )}

      {/* 自提節稅說明 */}
      <section className="rounded-2xl border border-green-100 bg-green-50 px-5 py-4">
        <p className="text-xs font-semibold text-green-800 mb-2">💡 自提 6%，政府幫你出錢</p>
        <p className="text-xs leading-relaxed text-green-800 mb-2">
          員工自提的每一塊錢，免計算當年度薪資所得。等於政府按你的<strong>邊際稅率補貼你</strong>：
        </p>
        <div className="space-y-1.5">
          {[
            { salary: 40_000, label: "月薪 4 萬（稅率 5%）" },
            { salary: 60_000, label: "月薪 6 萬（稅率 12%）" },
            { salary: 100_000, label: "月薪 10 萬（稅率 20%）" },
          ].map(({ salary, label }) => {
            const selfMonthly = salary * 0.06;
            const rate = getMarginalRate(salary);
            const saving = selfMonthly * 12 * rate;
            return (
              <div key={salary} className="flex items-center justify-between rounded-lg bg-white px-3 py-1.5">
                <span className="text-xs text-gray-700">{label}</span>
                <span className="text-xs font-semibold text-green-700">
                  自提6% → 每年省 {fmt(saving)}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 情境比較表 */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-base font-semibold text-gray-800">情境比較：30 歲到 60 歲，穩健報酬 4%</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-500">
                <th className="pb-2 text-left font-medium">月薪</th>
                <th className="pb-2 text-right font-medium">不自提</th>
                <th className="pb-2 text-right font-medium text-orange-600">自提 6%</th>
                <th className="pb-2 text-right font-medium text-green-700">差距</th>
              </tr>
            </thead>
            <tbody>
              {SCENARIOS.map(({ label, monthly }) => {
                const employerFV = calcFV(monthly * 0.06, 0.04, 30);
                const withSelfFV = calcFV(monthly * 0.12, 0.04, 30);
                const diff = withSelfFV - employerFV;
                return (
                  <tr key={monthly} className="border-b border-gray-50">
                    <td className="py-2 text-gray-700">{label}</td>
                    <td className="py-2 text-right text-gray-600">{fmtWan(employerFV)}</td>
                    <td className="py-2 text-right font-semibold text-orange-600">{fmtWan(withSelfFV)}</td>
                    <td className="py-2 text-right font-semibold text-green-600">+{fmtWan(diff)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-gray-400">※ 以 30 歲、年化報酬 4%、連續提撥 30 年估算。實際金額依薪資調整而異。</p>
      </section>

      {/* Affiliate CTA */}
      <TaxAffiliateCTA />

      {/* 4 大重點 */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-base font-semibold text-gray-800">勞退新制 4 大重點</h2>
        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex gap-2">
            <span className="mt-0.5 flex-shrink-0 text-orange-500">✓</span>
            <span>
              <strong>雇主 6% 強制提撥</strong>：每月幫你存薪資的 6%，不用自己花錢。
              月薪 5 萬 → 雇主每月提撥 3,000 元。
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-0.5 flex-shrink-0 text-orange-500">✓</span>
            <span>
              <strong>自提 0~6% 免稅</strong>：自己再加碼提撥，全額免計薪資所得。等於政府按你稅率補貼。
              稅率 12% 的人，自提 1 元實際只花 0.88 元。
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-0.5 flex-shrink-0 text-orange-500">✓</span>
            <span>
              <strong>帳戶是你的，離職不消失</strong>：換工作不影響，年資累計計算。
              工作滿 15 年且年滿 60 歲，可選擇月領（分 300 個月）或一次領。
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-0.5 flex-shrink-0 text-orange-500">✓</span>
            <span>
              <strong>政府保底收益</strong>：勞退基金投資報酬率若低於中華郵政 2 年定存利率，
              政府補足差額。實際上近年收益率均在 4~8% 之間。
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
              q: "自願提撥要怎麼申請？",
              a: "向公司 HR 或雇主提出申請，填寫「勞工自願提繳退休金申請書」，指定提撥率（1~6%）。每年 1 月可調整一次。",
            },
            {
              q: "我是自雇者（接案/自營商），也有勞退嗎？",
              a: "沒有雇主強制提撥，但可以「自行提繳」，月薪的 6% 以內，同樣享有免計薪資所得的節稅優惠。向勞保局申請即可。",
            },
            {
              q: "勞退和勞保老年給付有什麼不同？",
              a: "勞退新制是雇主幫你存進個人帳戶，帳戶是你的；勞保老年給付是社會保險，依投保年資和薪資計算，兩者可同時領。",
            },
            {
              q: "退休後月領多少才夠？",
              a: "一般建議退休後月支出約為退休前月薪的 70~80%。勞退月領只是退休收入之一，建議搭配勞保老年給付、個人儲蓄，規劃完整退休金三層結構。",
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
          <Link href="/pension-calculator" className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-100 transition">
            退休規劃試算 →
          </Link>
          <Link href="/salary-calculator" className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-100 transition">
            月薪實領試算 →
          </Link>
          <Link href="/tax-calculator" className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-100 transition">
            報稅試算 →
          </Link>
          <Link href="/labor-insurance-rates" className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-100 transition">
            勞健保費率 →
          </Link>
          <Link href="/income-tax-brackets" className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-100 transition">
            所得稅級距 →
          </Link>
        </div>
      </section>
    </main>
  );
}
