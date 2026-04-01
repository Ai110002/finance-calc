"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

// ── 114年度 綜合所得稅計算規則 ─────────────────────────────────────
// 五級累進稅率（財政部公告）
// 級距        稅率    累進差額
// 0-59萬      5%      0
// 59-133萬    12%     41,300
// 133-266萬   20%     147,700
// 266-498萬   30%     413,700
// 498萬+      40%     911,700
//
// 標準扣除額：單身 131,000 / 夫妻 262,000
// 薪資所得特別扣除額：218,000（不超過薪資所得）
// 免稅額：97,000 / 人
// ─────────────────────────────────────────────────────────────────

const TAX_BRACKETS = [
  { max: 590_000,   rate: 0.05, deduction: 0 },
  { max: 1_330_000, rate: 0.12, deduction: 41_300 },
  { max: 2_660_000, rate: 0.20, deduction: 147_700 },
  { max: 4_980_000, rate: 0.30, deduction: 413_700 },
  { max: Infinity,  rate: 0.40, deduction: 911_700 },
  { href: "/tax-refund-timeline", label: "退稅時程" },
];

const STANDARD_DEDUCTION_SINGLE = 131_000;
const STANDARD_DEDUCTION_MARRIED = 262_000;
const SALARY_DEDUCTION = 218_000;
const EXEMPTION_PER_PERSON = 97_000;

function getMarginalRate(annualSalary: number, isMarried: boolean, dependents: number): number {
  const standardDeduction = isMarried ? STANDARD_DEDUCTION_MARRIED : STANDARD_DEDUCTION_SINGLE;
  const salaryDeduction = Math.min(annualSalary, SALARY_DEDUCTION);
  const exemptions = EXEMPTION_PER_PERSON * (1 + (isMarried ? 1 : 0) + dependents);
  const taxable = Math.max(annualSalary - standardDeduction - salaryDeduction - exemptions, 0);

  if (taxable <= 0) return 0.05;
  for (const b of TAX_BRACKETS) {
    if (taxable <= b.max) return b.rate;
  }
  return 0.40;
}

// 計算 N 年後退休金積累（終值，月投入複利）
// FV = PMT × ((1+r)^n - 1) / r，r = 月利率
function calcFV(monthlyContrib: number, annualReturnRate: number, years: number): number {
  if (years <= 0 || monthlyContrib <= 0) return 0;
  const r = annualReturnRate / 12;
  const n = years * 12;
  if (r === 0) return monthlyContrib * n;
  return monthlyContrib * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
}

function fmt(n: number): string {
  return Math.round(n).toLocaleString("zh-TW");
}

const NAV_LINKS = [
  { href: "/", label: "財務自由" },
  { href: "/tax-calculator", label: "報稅計算" },
  { href: "/tax-checklist-2026", label: "報稅懶人包" },
  { href: "/tax-mistakes-2026", label: "報稅常見錯誤" },
  { href: "/stock-tax-2026", label: "投資稅務" },
  { href: "/amt-calculator", label: "最低稅負" },
  { href: "/mortgage", label: "房貸計算" },
  { href: "/overtime-calculator", label: "加班費" },
  { href: "/severance-calculator", label: "資遣費" },
  { href: "/salary-calculator", label: "月薪試算" },
  { href: "/bonus-calculator", label: "年終獎金" },
  { href: "/pension-calculator", label: "勞退計算", active: true },
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
  { href: "/mortgage-full-cost", label: "買房費用" },
  { href: "/buy-vs-rent", label: "買vs租" },
  { href: "/real-estate-tax", label: "房地合一稅" },
  { href: "/house-tax", label: "房屋稅" },
  { href: "/labor-retirement", label: "勞退新制" },
  { href: "/retirement-planning", label: "退休規劃" },
  { href: "/inheritance-tax", label: "遺產稅" },
  { href: "/gift-tax", label: "贈與稅" },
  { href: "/deduction-compare", label: "列舉vs標準" },
  { href: "/preschool-deduction", label: "幼兒學前扣除" },
  { href: "/foreign-income-tax", label: "海外所得" },
  { href: "/tax-refund", label: "退稅試算" },
  { href: "/tax-filing-steps", label: "報稅流程" },
  { href: "/joint-filing", label: "夫妻合併vs分開" },
  { href: "/income-tax-guide-2026", label: "報稅完整攻略" },
];

export default function PensionCalculatorPage() {
  const [monthlySalary, setMonthlySalary] = useState(40000);
  const [voluntaryPct, setVoluntaryPct] = useState(6);
  const [isMarried, setIsMarried] = useState(false);
  const [dependents, setDependents] = useState(0);
  const [yearsToRetire, setYearsToRetire] = useState(30);
  const [annualReturn, setAnnualReturn] = useState(3);

  const result = useMemo(() => {
    const annualSalary = monthlySalary * 12;
    const marginalRate = getMarginalRate(annualSalary, isMarried, dependents);

    const monthlyContrib = monthlySalary * (voluntaryPct / 100);
    const annualContrib = monthlyContrib * 12;
    const annualTaxSaving = annualContrib * marginalRate;
    const monthlyNetCost = monthlyContrib - annualTaxSaving / 12;

    // 雇主強制提撥 6%（不扣薪，另外計入退休帳戶）
    const employerMonthly = monthlySalary * 0.06;

    const totalMonthlyInAccount = monthlyContrib + employerMonthly;
    const selfFV = calcFV(monthlyContrib, annualReturn / 100, yearsToRetire);
    const employerFV = calcFV(employerMonthly, annualReturn / 100, yearsToRetire);
    const totalFV = selfFV + employerFV;

    // 如果完全不自提（只有雇主提撥）的結果
    const noContribFV = calcFV(employerMonthly, annualReturn / 100, yearsToRetire);
    const selfContribBonus = totalFV - noContribFV;

    return {
      marginalRate,
      monthlyContrib,
      annualContrib,
      annualTaxSaving,
      monthlyNetCost,
      employerMonthly,
      totalMonthlyInAccount,
      selfFV,
      employerFV,
      totalFV,
      noContribFV,
      selfContribBonus,
    };
  }, [monthlySalary, voluntaryPct, isMarried, dependents, yearsToRetire, annualReturn]);

  return (
    <div className="space-y-5 px-4 pt-8 pb-8">
      {/* 工具切換 */}
      <div className="flex gap-2 overflow-x-auto text-sm">
        {NAV_LINKS.map(({ href, label, active }) =>
          active ? (
            <div key={href} className="whitespace-nowrap rounded-full bg-emerald-600 px-3 py-1.5 font-semibold text-white shadow-sm">
              {label}
            </div>
          ) : (
            <Link key={href} href={href} className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1.5 font-medium text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition">
              {label}
            </Link>
          )
        )}
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-bold">勞退自提節稅計算器</h1>
        <p className="mt-1 text-sm text-gray-500">試算自願提撥勞退能省多少稅、退休能多領多少</p>
      </div>

      <div className="rounded-xl bg-emerald-50 px-4 py-3 text-xs text-emerald-700">
        💡 <strong>勞退自提的核心優勢：</strong>自提金額全額抵扣綜合所得稅，等於政府幫你出一部分退休金。依 114 年度稅率計算。
      </div>

      {/* 輸入區 */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
        <h2 className="font-semibold text-gray-800">基本資料</h2>

        {/* 月薪 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">月薪（應得薪資）</label>
          <p className="mb-1 text-xs text-gray-400">用來計算自提金額與估算所得稅率</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              inputMode="decimal"
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              value={monthlySalary || ""}
              onChange={(e) => { const v = parseFloat(e.target.value); setMonthlySalary(isNaN(v) ? 0 : v); }}
            />
            <span className="whitespace-nowrap text-sm text-gray-500">元</span>
          </div>
        </div>

        {/* 自提比例 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">自願提撥比例</label>
          <p className="mb-1 text-xs text-gray-400">最高 6%，提越多省越多稅，但當月實拿薪資也越少</p>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4, 5, 6].map((n) => (
              <button
                key={n}
                onClick={() => setVoluntaryPct(n)}
                className={`flex-1 rounded-xl border py-2 text-sm font-medium transition ${
                  voluntaryPct === n
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 text-gray-600 hover:border-emerald-300"
                }`}
              >
                {n}%
              </button>
            ))}
          </div>
        </div>

        {/* 婚姻狀況 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">婚姻狀況</label>
          <p className="mb-1 text-xs text-gray-400">影響標準扣除額，進而影響邊際稅率估算</p>
          <div className="flex gap-3">
            {[{ v: false, label: "單身" }, { v: true, label: "已婚（合併申報）" }].map(({ v, label }) => (
              <button
                key={label}
                onClick={() => setIsMarried(v)}
                className={`flex-1 rounded-xl border py-2.5 text-sm font-medium transition ${
                  isMarried === v
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 text-gray-600 hover:border-emerald-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 受扶養人數 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">受扶養人數</label>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((n) => (
              <button
                key={n}
                onClick={() => setDependents(n)}
                className={`flex-1 rounded-xl border py-2 text-sm font-medium transition ${
                  dependents === n
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 text-gray-600 hover:border-emerald-300"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 退休試算設定 */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
        <h2 className="font-semibold text-gray-800">退休積累設定</h2>

        {/* 距退休年數 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            距退休還有 <span className="text-emerald-600 font-bold">{yearsToRetire} 年</span>
          </label>
          <input
            type="range"
            min={5} max={45} step={1}
            value={yearsToRetire}
            onChange={(e) => setYearsToRetire(Number(e.target.value))}
            className="w-full accent-emerald-500"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>5 年</span><span>25 年</span><span>45 年</span>
          </div>
        </div>

        {/* 預估年化報酬率 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            預估年化報酬率 <span className="text-emerald-600 font-bold">{annualReturn}%</span>
          </label>
          <p className="mb-1 text-xs text-gray-400">勞動基金近十年平均約 4~5%，保守估算用 3%</p>
          <div className="flex gap-2">
            {[2, 3, 4, 5, 6].map((n) => (
              <button
                key={n}
                onClick={() => setAnnualReturn(n)}
                className={`flex-1 rounded-xl border py-2 text-sm font-medium transition ${
                  annualReturn === n
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 text-gray-600 hover:border-emerald-300"
                }`}
              >
                {n}%
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 結果區 */}
      {monthlySalary > 0 && (
        <>
          {/* 每月節稅效益 */}
          <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5">
            <h2 className="mb-4 font-semibold text-gray-800">每年節稅效益</h2>

            <div className="mb-3 text-center">
              <div className="text-sm text-gray-500">你的估算邊際稅率</div>
              <div className="mt-1 text-3xl font-bold text-emerald-600">
                {(result.marginalRate * 100).toFixed(0)}%
              </div>
            </div>

            <div className="space-y-2">
              {[
                {
                  label: "每月自提金額",
                  value: `${fmt(result.monthlyContrib)} 元`,
                  hint: `月薪 ${fmt(monthlySalary)} × ${voluntaryPct}%`,
                  color: "text-gray-800",
                },
                {
                  label: "每年自提總額",
                  value: `${fmt(result.annualContrib)} 元`,
                  hint: "全額從綜合所得中扣除",
                  color: "text-gray-800",
                },
                {
                  label: "每年省稅金額",
                  value: `${fmt(result.annualTaxSaving)} 元`,
                  hint: `年提撥 ${fmt(result.annualContrib)} × 邊際稅率 ${(result.marginalRate * 100).toFixed(0)}%`,
                  color: "text-emerald-700 font-bold",
                },
                {
                  label: "每月實際淨成本",
                  value: `${fmt(result.monthlyNetCost)} 元`,
                  hint: `自提 ${fmt(result.monthlyContrib)} − 省稅 ${fmt(result.annualTaxSaving / 12)}`,
                  color: "text-blue-600",
                },
              ].map(({ label, value, hint, color }) => (
                <div key={label} className="flex items-center justify-between rounded-xl bg-white/70 px-4 py-2.5">
                  <div>
                    <div className="text-sm font-medium text-gray-700">{label}</div>
                    {hint && <div className="text-xs text-gray-400">{hint}</div>}
                  </div>
                  <div className={`text-sm ${color}`}>{value}</div>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-xl border border-emerald-300 bg-white px-4 py-3 text-center">
              <p className="text-xs text-gray-500">每月存 <strong>{fmt(result.monthlyContrib)}</strong> 元，省稅後實際淨成本只要</p>
              <p className="mt-1 text-2xl font-bold text-emerald-600">{fmt(result.monthlyNetCost)} 元</p>
              <p className="text-xs text-gray-500">政府幫你出了 {fmt(result.annualTaxSaving / 12)} 元</p>
            </div>
          </div>

          <AdUnit className="my-4" />

          {/* 退休積累試算 */}
          <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-5">
            <h2 className="mb-4 font-semibold text-gray-800">
              {yearsToRetire} 年後退休金預估
              <span className="ml-2 text-xs font-normal text-gray-500">（年化 {annualReturn}%）</span>
            </h2>

            <div className="space-y-3">
              {/* 雇主提撥 */}
              <div className="rounded-xl bg-white/70 px-4 py-3">
                <div className="flex justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700">雇主強制提撥（6%）</div>
                    <div className="text-xs text-gray-400">每月 {fmt(result.employerMonthly)} 元，不扣你的薪水</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-800">{fmt(result.employerFV)} 元</div>
                  </div>
                </div>
              </div>

              {/* 自提 */}
              {voluntaryPct > 0 && (
                <div className="rounded-xl bg-white/70 px-4 py-3">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-700">你的自願提撥（{voluntaryPct}%）</div>
                      <div className="text-xs text-gray-400">每月 {fmt(result.monthlyContrib)} 元，淨成本 {fmt(result.monthlyNetCost)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-emerald-700">{fmt(result.selfFV)} 元</div>
                    </div>
                  </div>
                </div>
              )}

              {/* 總計 */}
              <div className="rounded-xl border border-blue-300 bg-white px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-gray-800">退休帳戶總積累</div>
                  <div className="text-xl font-bold text-blue-600">{fmt(result.totalFV)} 元</div>
                </div>
                {voluntaryPct > 0 && (
                  <p className="mt-1 text-xs text-gray-500">
                    比不自提多出 <span className="font-semibold text-emerald-600">{fmt(result.selfContribBonus)}</span> 元
                  </p>
                )}
              </div>
            </div>

            <div className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-xs text-amber-700">
              ⚠️ 試算假設薪資與提撥比例不變，實際報酬率會波動。退休金提領方式依勞動基金條例，60歲後可月領或一次領。
            </div>
          </div>

          {/* 報稅連結 */}
          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4">
            <p className="text-sm font-semibold text-gray-800">📊 算完勞退，再算全年要繳多少稅</p>
            <p className="mt-1 text-xs text-gray-600">
              加入自提金額後，你的綜合所得稅可能減少不少。去報稅計算器看看實際影響。
            </p>
            <Link
              href="/tax-calculator"
              className="mt-3 block rounded-xl bg-orange-500 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              去報稅計算器試算節稅效果 →
            </Link>
          </div>

          <AdUnit className="my-4" />

          <TaxAffiliateCTA />
        </>
      )}

      {/* FAQ */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <h2 className="font-semibold text-gray-800">常見問題</h2>

        {[
          {
            q: "勞退自提最多可以提幾%？",
            a: "依勞工退休金條例，員工自願提撥上限為薪資的 6%。加上雇主強制提撥的 6%，每月最多有 12% 的薪資進入你的個人退休帳戶。",
          },
          {
            q: "自提金額怎麼節稅？",
            a: "自願提撥金額可以全額從當年度綜合所得總額中扣除，直接降低應稅所得。如果你的邊際稅率是 12%，每提撥 1 萬元就省 1,200 元稅，等於打了 8.8 折存退休金。",
          },
          {
            q: "勞退帳戶的錢什麼時候能領？",
            a: "年滿 60 歲後可申請領取，可選擇月領年金或一次領取。如果工作年資滿 15 年建議月領；未滿 15 年通常選擇一次領。",
          },
          {
            q: "自提的錢放在哪裡？安全嗎？",
            a: "存入勞動部勞動基金運用局管理的「勞工退休金個人專戶」，由政府保管，不會因公司倒閉而損失。帳戶餘額有最低收益保障（不低於兩年期定存利率）。",
          },
          {
            q: "什麼樣的人最值得自提？",
            a: "邊際稅率越高越值得自提。薪資在 59 萬以上（單身）或 133 萬以上的人，省稅比例高達 12%~40%，自提等於打折存錢。低薪族（稅率 5%）省稅效果較小，但仍有強制儲蓄的好處。",
          },
        ].map(({ q, a }) => (
          <div key={q}>
            <p className="text-sm font-semibold text-gray-800">{q}</p>
            <p className="mt-1 text-xs text-gray-600 leading-relaxed">{a}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-gray-100 p-4 text-center text-xs text-gray-500">
        本計算結果依 114 年度費率及勞工退休金條例試算，僅供個人財務規劃參考。<br />
        退休積累試算假設薪資、提撥比例、報酬率維持不變，實際金額可能有所差異。
      </div>
    </div>
  );
}
