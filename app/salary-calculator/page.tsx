"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

// ── 114年度 薪資相關費率 ─────────────────────────────────────────
// 勞保費率: 13.0%（114年度），員工負擔 20%，雇主負擔 70%，政府負擔 10%
// 健保費率: 5.17%（114年度），員工負擔 30%，雇主負擔 60%，政府負擔 10%
// 二代健保補充保費: 2.11%（薪資超出健保投保薪資部分）
// 勞退: 雇主強制提撥 6%（不扣薪），員工可自願提撥 0-6%
// ────────────────────────────────────────────────────────────────

const LABOR_RATE = 0.13;
const LABOR_EMP_SHARE = 0.20;
const LABOR_EMP_RATE = LABOR_RATE * LABOR_EMP_SHARE; // 2.6%

const HEALTH_RATE = 0.0517;
const HEALTH_EMP_SHARE = 0.30;
const HEALTH_EMP_RATE = HEALTH_RATE * HEALTH_EMP_SHARE; // 1.551%

const SUPPLEMENTAL_RATE = 0.0211; // 二代健保補充保費

// 勞保投保薪資分級表（114年）— 最低 28,590、最高 147,900
const LABOR_BRACKETS = [
  28590, 30300, 31800, 33300, 34800, 36300, 38200, 40100,
  42000, 43900, 45800, 48200, 50600, 53000, 55400, 57800,
  60800, 63800, 66800, 69800, 72800, 76500, 80200, 83900,
  87600, 92100, 96600, 101100, 105600, 110100, 115500, 120900,
  126300, 131700, 137100, 142500, 147900,
];

// 健保投保薪資分級表（114年）— 最低 28,590、最高 219,500
const HEALTH_BRACKETS = [
  ...LABOR_BRACKETS,
  157100, 163500, 169900, 176500, 183000, 189600, 196200,
  202800, 209500, 216200, 219500,
];

function getInsuredSalary(salary: number, brackets: number[]): number {
  const min = brackets[0];
  const max = brackets[brackets.length - 1];
  if (salary <= min) return min;
  if (salary >= max) return max;
  return brackets.find((b) => b >= salary) ?? max;
}

function fmt(n: number): string {
  return Math.round(n).toLocaleString("zh-TW");
}

interface CalcResult {
  laborInsuredSalary: number;
  healthInsuredSalary: number;
  laborEmpFee: number;
  healthEmpFee: number;
  supplementalFee: number;
  voluntaryPension: number;
  totalDeduction: number;
  takehome: number;
  // 雇主成本
  laborEmployerFee: number;
  healthEmployerFee: number;
  employerPension: number;
  totalEmployerCost: number;
}

function calcSalary(
  monthlySalary: number,
  dependents: number,
  voluntaryPensionPct: number
): CalcResult {
  const laborInsuredSalary = getInsuredSalary(monthlySalary, LABOR_BRACKETS);
  const healthInsuredSalary = getInsuredSalary(monthlySalary, HEALTH_BRACKETS);

  // 健保眷屬倍數：每增1眷屬多付 0.7 倍員工保費
  const healthDependentMultiplier = 1 + Math.min(dependents, 3) * 0.7;

  // 員工扣款
  const laborEmpFee = laborInsuredSalary * LABOR_EMP_RATE;
  const healthEmpFee = healthInsuredSalary * HEALTH_EMP_RATE * healthDependentMultiplier;
  const supplementalFee = Math.max(0, monthlySalary - healthInsuredSalary) * SUPPLEMENTAL_RATE;
  const voluntaryPension = monthlySalary * (voluntaryPensionPct / 100);

  const totalDeduction = laborEmpFee + healthEmpFee + supplementalFee + voluntaryPension;
  const takehome = monthlySalary - totalDeduction;

  // 雇主負擔（不扣薪，但構成雇主總人事成本）
  const laborEmployerFee = laborInsuredSalary * LABOR_RATE * 0.70;
  const healthEmployerFee = healthInsuredSalary * HEALTH_RATE * 0.60 * healthDependentMultiplier;
  const employerPension = monthlySalary * 0.06;
  const totalEmployerCost = monthlySalary + laborEmployerFee + healthEmployerFee + employerPension;

  return {
    laborInsuredSalary, healthInsuredSalary,
    laborEmpFee, healthEmpFee, supplementalFee, voluntaryPension,
    totalDeduction, takehome,
    laborEmployerFee, healthEmployerFee, employerPension, totalEmployerCost,
  };
}

function NumField({ label, hint, value, onChange, suffix }: {
  label: string; hint?: string; value: number; onChange: (v: number) => void; suffix?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      {hint && <p className="mb-1 text-xs text-gray-400">{hint}</p>}
      <div className="flex items-center gap-2">
        <input
          type="text" inputMode="decimal"
          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={value || ""}
          onChange={(e) => { const v = parseFloat(e.target.value); onChange(isNaN(v) ? 0 : v); }}
        />
        {suffix && <span className="whitespace-nowrap text-sm text-gray-500">{suffix}</span>}
      </div>
    </div>
  );
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
  { href: "/salary-calculator", label: "月薪試算", active: true },
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
  { href: "/mortgage-full-cost", label: "買房費用" },
  { href: "/buy-vs-rent", label: "買vs租" },
  { href: "/real-estate-tax", label: "房地合一稅" },
  { href: "/house-tax", label: "房屋稅" },
  { href: "/labor-retirement", label: "勞退新制" },
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

export default function SalaryCalculatorPage() {
  const [monthlySalary, setMonthlySalary] = useState(35000);
  const [dependents, setDependents] = useState(0);
  const [voluntaryPensionPct, setVoluntaryPensionPct] = useState(0);
  const [showEmployer, setShowEmployer] = useState(false);

  const result = useMemo(
    () => calcSalary(monthlySalary, dependents, voluntaryPensionPct),
    [monthlySalary, dependents, voluntaryPensionPct]
  );

  const takehomePct = monthlySalary > 0 ? (result.takehome / monthlySalary * 100).toFixed(1) : "0";

  return (
    <div className="space-y-5 px-4 pt-8 pb-8">
      {/* 工具切換 */}
      <div className="flex gap-2 overflow-x-auto text-sm">
        {NAV_LINKS.map(({ href, label, active }) =>
          active ? (
            <div key={href} className="whitespace-nowrap rounded-full bg-blue-600 px-3 py-1.5 font-semibold text-white shadow-sm">
              {label}
            </div>
          ) : (
            <Link key={href} href={href} className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1.5 font-medium text-gray-600 hover:border-blue-400 hover:text-blue-600 transition">
              {label}
            </Link>
          )
        )}
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-bold">月薪試算（到手薪資計算器）</h1>
        <p className="mt-1 text-sm text-gray-500">輸入月薪，自動計算勞保、健保、勞退扣款後的實拿金額</p>
      </div>

      <div className="rounded-xl bg-amber-50 px-4 py-3 text-xs text-amber-700">
        ⚠️ 依財政部 114 年度費率試算，僅供參考。實際金額以公司薪資單為準。
      </div>

      {/* 輸入區 */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
        <h2 className="font-semibold text-gray-800">基本資料</h2>

        <NumField
          label="月薪（應得薪資）"
          hint="填入公司給付的月薪，不含加班費"
          value={monthlySalary}
          onChange={setMonthlySalary}
          suffix="元"
        />

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            眷屬人數（健保）
          </label>
          <p className="mb-1 text-xs text-gray-400">由你負擔保費的眷屬數，影響健保費計算</p>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setDependents(n)}
                className={`flex-1 rounded-xl border py-2 text-sm font-medium transition ${
                  dependents === n
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-600 hover:border-blue-300"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            勞退自願提撥（0–6%）
          </label>
          <p className="mb-1 text-xs text-gray-400">自提可全額抵稅，但減少當月到手薪資。0% = 不自提</p>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4, 5, 6].map((n) => (
              <button
                key={n}
                onClick={() => setVoluntaryPensionPct(n)}
                className={`flex-1 rounded-xl border py-2 text-sm font-medium transition ${
                  voluntaryPensionPct === n
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-600 hover:border-blue-300"
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
          {/* 主要結果 */}
          <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-5">
            <div className="text-center">
              <div className="text-sm text-gray-500">月薪 {fmt(monthlySalary)} 元，實際到手</div>
              <div className="mt-1 text-4xl font-bold text-blue-600">{fmt(result.takehome)} 元</div>
              <div className="mt-1 text-sm text-gray-500">到手率 {takehomePct}%</div>
            </div>

            <div className="mt-4 space-y-2">
              {[
                { label: "勞保費（員工）", value: result.laborEmpFee, hint: `投保薪資 ${fmt(result.laborInsuredSalary)} × ${(LABOR_EMP_RATE * 100).toFixed(1)}%` },
                { label: "健保費（員工）", value: result.healthEmpFee, hint: `投保薪資 ${fmt(result.healthInsuredSalary)} × 1.551%${dependents > 0 ? ` × 眷屬倍數` : ""}` },
                ...(result.supplementalFee > 0
                  ? [{ label: "二代健保補充保費", value: result.supplementalFee, hint: `(${fmt(monthlySalary)} − ${fmt(result.healthInsuredSalary)}) × 2.11%` }]
                  : []),
                ...(result.voluntaryPension > 0
                  ? [{ label: `勞退自提（${voluntaryPensionPct}%）`, value: result.voluntaryPension, hint: "存入個人勞退帳戶，可抵綜合所得稅" }]
                  : []),
              ].map(({ label, value, hint }) => (
                <div key={label} className="flex items-center justify-between rounded-xl bg-white/70 px-4 py-2.5">
                  <div>
                    <div className="text-sm font-medium text-gray-700">{label}</div>
                    {hint && <div className="text-xs text-gray-400">{hint}</div>}
                  </div>
                  <div className="text-sm font-semibold text-red-500">−{fmt(value)}</div>
                </div>
              ))}

              <div className="flex items-center justify-between rounded-xl border border-blue-300 bg-white px-4 py-3">
                <div className="font-semibold text-gray-800">總扣款</div>
                <div className="font-bold text-red-600">−{fmt(result.totalDeduction)}</div>
              </div>
            </div>
          </div>

          {/* 所得稅提示 */}
          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4">
            <p className="text-sm font-semibold text-gray-800">⚠️ 上方未含所得稅</p>
            <p className="mt-1 text-xs text-gray-600">
              薪資所得稅由公司每月預扣，年度報稅時多退少補。
              年薪 × 12 扣掉各項扣除額後，依稅率級距課稅。
            </p>
            <Link
              href="/tax-calculator"
              className="mt-3 block rounded-xl bg-orange-500 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              去報稅計算器估算年度稅額 →
            </Link>
          </div>

          <AdUnit className="my-4" />

          {/* 雇主成本 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <button
              onClick={() => setShowEmployer(!showEmployer)}
              className="flex w-full items-center justify-between"
            >
              <h2 className="font-semibold text-gray-800">公司雇用你的實際成本</h2>
              <span className="text-sm text-blue-600">{showEmployer ? "收起 ▲" : "展開 ▼"}</span>
            </button>
            <p className="mt-1 text-xs text-gray-500">除了你的月薪，公司還要幫你付這些</p>

            {showEmployer && (
              <div className="mt-4 space-y-2">
                {[
                  { label: "月薪（你拿到的）", value: monthlySalary },
                  { label: `勞保費（雇主 70%）`, value: result.laborEmployerFee },
                  { label: `健保費（雇主 60%）`, value: result.healthEmployerFee },
                  { label: `勞退提撥（雇主 6%）`, value: result.employerPension, hint: "存入你的個人勞退帳戶" },
                ].map(({ label, value, hint }) => (
                  <div key={label} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-2.5">
                    <div>
                      <div className="text-sm text-gray-700">{label}</div>
                      {hint && <div className="text-xs text-gray-400">{hint}</div>}
                    </div>
                    <div className="text-sm font-semibold">{fmt(value)}</div>
                  </div>
                ))}
                <div className="flex items-center justify-between rounded-xl border border-gray-300 bg-gray-100 px-4 py-3">
                  <div className="font-semibold text-gray-800">公司每月總人事成本</div>
                  <div className="font-bold text-gray-900">{fmt(result.totalEmployerCost)}</div>
                </div>
                <p className="text-xs text-gray-400">
                  你月薪 {fmt(monthlySalary)}，公司實際要花 {fmt(result.totalEmployerCost)}，差距 {fmt(result.totalEmployerCost - monthlySalary)} 元。
                </p>
              </div>
            )}
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
            q: "為什麼我的投保薪資和月薪不一樣？",
            a: "勞保和健保的投保薪資都是依「投保薪資分級表」歸入最接近且不低於實際薪資的級距，所以通常等於或略高於月薪，但有上限（勞保上限 147,900；健保上限 219,500）。",
          },
          {
            q: "勞退自提有什麼好處？",
            a: "自願提撥金額可以全額從當年度綜合所得額中扣除，等於「先存錢再省稅」。但提撥後要 60 歲才能領，流動性較差，適合有閒餘資金的人。",
          },
          {
            q: "二代健保補充保費是什麼？",
            a: "當你的月薪超過健保投保薪資時，超出的部分要再繳 2.11% 補充保費，由公司代扣。如月薪 = 投保薪資則不用繳。",
          },
          {
            q: "到手薪資還要扣所得稅嗎？",
            a: "是的。公司每月會根據薪資預扣所得稅，隔年5月報稅時再結算多退少補。預扣金額不在本計算器範圍內，請到報稅計算器試算年度稅負。",
          },
        ].map(({ q, a }) => (
          <div key={q}>
            <p className="text-sm font-semibold text-gray-800">{q}</p>
            <p className="mt-1 text-xs text-gray-600 leading-relaxed">{a}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-gray-100 p-4 text-center text-xs text-gray-500">
        本計算結果依 114 年度費率試算，僅供個人財務規劃參考。<br />
        實際扣款金額以公司薪資單及主管機關公告為準。
      </div>
    </div>
  );
}
