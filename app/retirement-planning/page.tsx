"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

// ── 退休金規劃常數（114年度）─────────────────────────────────────────────────
// 勞退新制：雇主強制提撥月薪 6%，員工可自提 0~6%（自提免計薪資所得）
// 勞保年金（方式二）：min(月薪,45800) × 工作年資 × 1.55%（對多數人最有利）
// 平均壽命 85 歲（衛福部生命表參考值）
// ─────────────────────────────────────────────────────────────────────────────

const LABOR_PENSION_WAGE_CAP = 45_800; // 勞保投保薪資上限
const LIFE_EXPECTANCY = 85;

function calcFV(monthly: number, annualRate: number, years: number): number {
  if (years <= 0 || monthly <= 0) return 0;
  const r = annualRate / 12;
  const n = years * 12;
  if (r === 0) return monthly * n;
  return monthly * ((Math.pow(1 + r, n) - 1) / r);
}

function calcFVLump(pv: number, annualRate: number, years: number): number {
  if (years <= 0 || pv <= 0) return 0;
  return pv * Math.pow(1 + annualRate, years);
}

// 每月需存多少錢，才能在 years 年後累積到 targetFV
function calcPMT(targetFV: number, annualRate: number, years: number): number {
  if (years <= 0 || targetFV <= 0) return 0;
  if (annualRate === 0) return targetFV / (years * 12);
  const r = annualRate / 12;
  const n = years * 12;
  return targetFV * r / (Math.pow(1 + r, n) - 1);
}

function fmt(n: number): string {
  return `NT$${Math.round(n).toLocaleString("zh-TW")}`;
}
function fmtWan(n: number): string {
  const wan = Math.round(n / 10_000);
  return `約 ${wan.toLocaleString("zh-TW")} 萬`;
}

const RETURN_OPTIONS = [
  { label: "保守 2%", value: 0.02 },
  { label: "穩健 4%", value: 0.04 },
  { label: "積極 6%", value: 0.06 },
  { href: "/tax-refund-timeline", label: "退稅時程" },
  { href: "/day-trading-tax", label: "當沖稅費" },
  { href: "/ira-vs-labor-retirement", label: "勞退vs ETF" },
  { href: "/legal-tax-savings-2026", label: "省稅10招" },
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
  { href: "/labor-retirement", label: "勞退新制" },
  { href: "/retirement-planning", label: "退休規劃", active: true },
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
];

const FAQS = [
  {
    q: "勞退新制和勞保年金有什麼不同？",
    a: "勞退新制（勞工退休金條例）是雇主強制提撥月薪 6% 進你的個人帳戶，帳戶屬於你，換工作不歸零，最早 60 歲可申請領取。勞保年金（勞工保險老年給付）是社會保險，依投保年資和平均薪資計算月領金額，與勞退完全獨立，兩者都可以領。",
  },
  {
    q: "退休後每月需要多少錢才夠？",
    a: "主計總處統計，台灣單人家庭平均每月消費支出約 2.5 萬，雙人家庭約 4.5 萬。但「夠不夠」取決於你的生活目標：想出國旅遊、需要醫療費用緩衝，建議至少設定月支出 4~6 萬。此試算器讓你自訂目標，算出真實缺口。",
  },
  {
    q: "勞保年金什麼時候可以領？",
    a: "依出生年依不同，請領年齡逐步延後：1958 年以前出生者 63 歲可領，1960 年出生 64 歲，1962 年以後出生 65 歲。勞退新制則是最早 60 歲即可申請，工作年資滿 15 年可月領，未滿 15 年一次領清。",
  },
  {
    q: "勞退自提 6% 值得嗎？",
    a: "幾乎所有情況都值得。自提金額可從當年度薪資所得全額扣除，等於政府幫你補貼稅率比例的費用。月薪 5 萬、邊際稅率 12%，自提 6% 每年節稅 4,320 元，相當於政府補貼你 12% 的退休儲蓄。加上複利時間效應，越早自提效益越大。計算自提節稅金額請用「勞退新制試算機」。",
  },
  {
    q: "退休金缺口怎麼填補最有效率？",
    a: "優先順序：① 先用足勞退自提 6%（節稅同時強制儲蓄，無腦首選）；② 透過ETF/基金長期投資，年化 4~6% 報酬率是合理預期；③ 若有房產可納入退休規劃；④ 越早開始，每月需存的金額越少（複利效應）。本試算器可以幫你算出在不同報酬率假設下，每月需額外儲蓄多少。",
  },
];


const SCENARIOS: { label: string; age: number; monthly: number; selfPct: number; target: number }[] = [
  { label: "月薪3萬，35歲", age: 35, monthly: 30_000, selfPct: 0, target: 30_000 },
  { label: "月薪5萬，35歲", age: 35, monthly: 50_000, selfPct: 0, target: 50_000 },
  { label: "月薪5萬，35歲，自提6%", age: 35, monthly: 50_000, selfPct: 6, target: 50_000 },
  { label: "月薪8萬，30歲", age: 30, monthly: 80_000, selfPct: 0, target: 60_000 },
  { label: "月薪8萬，30歲，自提6%", age: 30, monthly: 80_000, selfPct: 6, target: 60_000 },
];

function calcScenario(
  age: number, monthly: number, selfPct: number, target: number, retirementAge = 60, rate = 0.04
) {
  const yearsToRetire = Math.max(0, retirementAge - age);
  const yearsInRetirement = LIFE_EXPECTANCY - retirementAge;
  const employerMonthly = monthly * 0.06;
  const selfMonthly = monthly * (selfPct / 100);
  const laborFV = calcFV(employerMonthly + selfMonthly, rate, yearsToRetire);
  const laborMonthly = yearsInRetirement > 0 ? laborFV / (yearsInRetirement * 12) : 0;
  const insuredWage = Math.min(monthly, LABOR_PENSION_WAGE_CAP);
  const workYears = Math.max(0, retirementAge - 25);
  const laborInsuranceMonthly = insuredWage * workYears * 0.0155;
  const totalMonthly = laborMonthly + laborInsuranceMonthly;
  const monthlyGap = Math.max(0, target - totalMonthly);
  const totalGap = monthlyGap * 12 * yearsInRetirement;
  const requiredSaving = calcPMT(totalGap, rate, yearsToRetire);
  return { totalMonthly, monthlyGap, requiredSaving };
}

export default function RetirementPlanningPage() {
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(60);
  const [targetMonthlyExpense, setTargetMonthlyExpense] = useState(50_000);
  const [monthlySalary, setMonthlySalary] = useState(50_000);
  const [selfContribPct, setSelfContribPct] = useState(0);
  const [currentSavings, setCurrentSavings] = useState(0);
  const [returnRate, setReturnRate] = useState(0.04);

  const result = useMemo(() => {
    const yearsToRetire = Math.max(0, retirementAge - currentAge);
    const yearsInRetirement = LIFE_EXPECTANCY - retirementAge;

    // 勞退新制
    const employerMonthly = monthlySalary * 0.06;
    const selfMonthly = monthlySalary * (selfContribPct / 100);
    const laborFV = calcFV(employerMonthly + selfMonthly, returnRate, yearsToRetire);
    const laborMonthly = yearsInRetirement > 0 ? laborFV / (yearsInRetirement * 12) : 0;

    // 勞保年金（方式二）
    const insuredWage = Math.min(monthlySalary, LABOR_PENSION_WAGE_CAP);
    const workingYears = Math.max(0, retirementAge - 25);
    const laborInsuranceMonthly = insuredWage * workingYears * 0.0155;

    // 現有儲蓄到退休
    const currentSavingsFV = calcFVLump(currentSavings, returnRate, yearsToRetire);

    // 退休後總需求（不做折現，讓數字更直覺）
    const totalNeed = targetMonthlyExpense * 12 * yearsInRetirement;

    // 已有來源合計
    const fromLaborRetirement = laborFV;
    const fromLaborInsurance = laborInsuranceMonthly * 12 * yearsInRetirement;
    const fromCurrentSavings = currentSavingsFV;
    const totalProvided = fromLaborRetirement + fromLaborInsurance + fromCurrentSavings;

    // 缺口
    const totalGap = Math.max(0, totalNeed - totalProvided);

    // 每月收入缺口
    const monthlyIncome = laborMonthly + laborInsuranceMonthly;
    const monthlyGap = Math.max(0, targetMonthlyExpense - monthlyIncome);

    // 每月需額外儲蓄
    const requiredMonthlySaving = calcPMT(totalGap, returnRate, yearsToRetire);

    return {
      yearsToRetire,
      yearsInRetirement,
      laborMonthly,
      laborInsuranceMonthly,
      monthlyIncome,
      monthlyGap,
      laborFV,
      fromLaborInsurance,
      fromCurrentSavings,
      totalProvided,
      totalNeed,
      totalGap,
      requiredMonthlySaving,
    };
  }, [currentAge, retirementAge, targetMonthlyExpense, monthlySalary, selfContribPct, currentSavings, returnRate]);

  return (
    <main className="flex flex-col gap-6 px-4 py-6">
      {/* Nav */}
      <nav className="flex gap-2 overflow-x-auto pb-1 text-xs">
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href + l.label}
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
        <h1 className="text-2xl font-bold text-gray-900">退休金缺口試算器 2026</h1>
        <p className="mt-1 text-sm text-gray-500">
          輸入你的目標與薪資，計算勞退 + 勞保年金的預計月領，與退休後支出比較，算出你的退休缺口與每月需額外儲蓄多少。依 114 年度規定。
        </p>
      </header>

      <AdUnit />

      {/* 快速說明 */}
      <section className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4">
        <p className="text-xs font-semibold text-blue-700 mb-1">📋 這個試算器在算什麼？</p>
        <p className="text-xs leading-relaxed text-blue-800">
          台灣受僱勞工退休後有兩個主要收入：<strong>勞退新制帳戶</strong>（雇主6%提撥 + 你的自提）和
          <strong>勞保老年年金</strong>（依年資和薪資計算）。這兩者合計通常不夠退休目標，
          差距就是「缺口」——需要靠個人儲蓄投資來填補。
        </p>
      </section>

      {/* Input 表單 */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-800">你的退休規劃設定</h2>

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
            <label className="mb-1 block text-sm font-medium text-gray-700">預計退休年齡</label>
            <input
              type="number"
              min={55}
              max={70}
              value={retirementAge}
              onChange={(e) => setRetirementAge(Math.min(70, Math.max(55, Number(e.target.value))))}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-right text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            退休後每月目標支出（元）
            <span className="ml-1 text-xs font-normal text-gray-400">你希望退休後每月花多少？</span>
          </label>
          <input
            type="number"
            min={0}
            step={1000}
            value={targetMonthlyExpense}
            onChange={(e) => setTargetMonthlyExpense(Math.max(0, Number(e.target.value)))}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-right text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            目前月薪（元）
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
            雇主每月提撥 {fmt(monthlySalary * 0.06)}，勞保年金投保薪資上限 NT$45,800
          </p>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            勞退自提比例：<span className="font-bold text-orange-600">{selfContribPct}%</span>
            <span className="ml-1 text-xs font-normal text-gray-400">（每月自提 {fmt(monthlySalary * selfContribPct / 100)}，可免計薪資所得）</span>
          </label>
          <input
            type="range"
            min={0}
            max={6}
            step={1}
            value={selfContribPct}
            onChange={(e) => setSelfContribPct(Number(e.target.value))}
            className="w-full accent-orange-500"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-400">
            {[0,1,2,3,4,5,6].map(v => <span key={v}>{v}%</span>)}
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            現有退休儲蓄（元）
            <span className="ml-1 text-xs font-normal text-gray-400">已存的股票/基金/存款</span>
          </label>
          <input
            type="number"
            min={0}
            step={10000}
            value={currentSavings}
            onChange={(e) => setCurrentSavings(Math.max(0, Number(e.target.value)))}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-right text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
          />
        </div>

        <div className="mb-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">預期年化報酬率</label>
          <div className="flex gap-2">
            {RETURN_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setReturnRate(opt.value)}
                className={`flex-1 rounded-xl py-2 text-sm font-medium transition ${
                  returnRate === opt.value
                    ? "bg-orange-500 text-white"
                    : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 退休缺口分析 */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-800">退休缺口分析</h2>

        {/* 總需求 */}
        <div className="mb-4 rounded-xl bg-gray-50 p-4">
          <p className="text-xs text-gray-500 mb-1">退休後總需求（{targetMonthlyExpense.toLocaleString("zh-TW")} 元/月 × {result.yearsInRetirement} 年）</p>
          <p className="text-2xl font-bold text-gray-900">{fmtWan(result.totalNeed)}</p>
          <p className="text-xs text-gray-400 mt-0.5">{fmt(result.totalNeed)}</p>
        </div>

        {/* 已有來源 */}
        <div className="mb-4 space-y-2">
          <p className="text-sm font-semibold text-gray-700">預計退休收入來源</p>
          <div className="rounded-xl border border-gray-100 divide-y divide-gray-100">
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm text-gray-700">勞退新制月領</p>
                <p className="text-xs text-gray-400">雇主6% + 自提{selfContribPct}%，累積 {result.yearsToRetire} 年</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{fmt(result.laborMonthly)}/月</p>
                <p className="text-xs text-gray-400">總領 {fmtWan(result.laborFV)}</p>
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm text-gray-700">勞保老年年金</p>
                <p className="text-xs text-gray-400">投保薪資 × {Math.min(monthlySalary, LABOR_PENSION_WAGE_CAP).toLocaleString("zh-TW")} × {Math.max(0, retirementAge - 25)} 年 × 1.55%（方式二估算）</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{fmt(result.laborInsuranceMonthly)}/月</p>
                <p className="text-xs text-gray-400">總領 {fmtWan(result.fromLaborInsurance)}</p>
              </div>
            </div>
            {currentSavings > 0 && (
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm text-gray-700">現有儲蓄到退休時</p>
                  <p className="text-xs text-gray-400">{fmt(currentSavings)} 複利 {returnRate * 100}% × {result.yearsToRetire} 年</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{fmtWan(result.fromCurrentSavings)}</p>
                </div>
              </div>
            )}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
              <p className="text-sm font-semibold text-gray-700">合計已有</p>
              <p className="text-sm font-bold text-gray-900">{fmtWan(result.totalProvided)}</p>
            </div>
          </div>
        </div>

        {/* 缺口 */}
        <div className={`mb-4 rounded-xl p-4 ${result.totalGap > 0 ? "bg-red-50 border border-red-100" : "bg-green-50 border border-green-100"}`}>
          <p className={`text-xs font-semibold mb-1 ${result.totalGap > 0 ? "text-red-600" : "text-green-600"}`}>
            {result.totalGap > 0 ? "⚠️ 退休缺口" : "✅ 目前預估足夠"}
          </p>
          {result.totalGap > 0 ? (
            <>
              <p className="text-2xl font-bold text-red-700">{fmtWan(result.totalGap)}</p>
              <p className="text-xs text-red-500 mt-0.5">
                每月收入缺口：{fmt(result.monthlyGap)}（月需求 {fmt(targetMonthlyExpense)} - 月收入 {fmt(result.monthlyIncome)}）
              </p>
            </>
          ) : (
            <p className="text-lg font-bold text-green-700">恭喜！預計退休收入已超過目標支出</p>
          )}
        </div>

        {/* 建議每月儲蓄 */}
        {result.totalGap > 0 && (
          <div className="rounded-xl bg-orange-50 border border-orange-100 p-4">
            <p className="text-xs font-semibold text-orange-700 mb-1">💡 填補缺口，建議每月額外儲蓄</p>
            <p className="text-2xl font-bold text-orange-700">{fmt(result.requiredMonthlySaving)}</p>
            <p className="text-xs text-orange-500 mt-0.5">
              從現在起，每月投入此金額，年化 {returnRate * 100}%，{result.yearsToRetire} 年後剛好填補缺口
            </p>
          </div>
        )}
      </section>

      <AdUnit />

      {/* 常見情境比較表 */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-base font-semibold text-gray-800">各情境缺口一覽（穩健報酬 4%）</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-2 text-left text-xs font-medium text-gray-500">情境</th>
                <th className="pb-2 text-right text-xs font-medium text-gray-500">月收入</th>
                <th className="pb-2 text-right text-xs font-medium text-gray-500">月缺口</th>
                <th className="pb-2 text-right text-xs font-medium text-gray-500">需月存</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {SCENARIOS.map((s) => {
                const sc = calcScenario(s.age, s.monthly, s.selfPct, s.target);
                return (
                  <tr key={s.label}>
                    <td className="py-2.5 text-xs text-gray-700">{s.label}</td>
                    <td className="py-2.5 text-right text-xs font-medium text-gray-900">{fmt(sc.totalMonthly)}</td>
                    <td className={`py-2.5 text-right text-xs font-semibold ${sc.monthlyGap > 0 ? "text-red-500" : "text-green-600"}`}>
                      {sc.monthlyGap > 0 ? fmt(sc.monthlyGap) : "0"}
                    </td>
                    <td className="py-2.5 text-right text-xs font-bold text-orange-600">{sc.requiredSaving > 0 ? fmt(sc.requiredSaving) : "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-gray-400">※ 退休年齡 60 歲、壽命 85 歲、月收入目標同月薪。勞保年金依方式二估算。</p>
      </section>

      <TaxAffiliateCTA />

      {/* 退休規劃三步驟 */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-800">退休規劃三步驟</h2>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm font-bold text-orange-600">1</div>
            <div>
              <p className="text-sm font-semibold text-gray-800">算清楚你的退休缺口</p>
              <p className="text-xs text-gray-500 mt-0.5">用這個工具，設定目標月支出和退休年齡，算出實際缺口多少。大多數人缺口在 500~1,500 萬之間。</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm font-bold text-orange-600">2</div>
            <div>
              <p className="text-sm font-semibold text-gray-800">用足勞退自提 6%（首選）</p>
              <p className="text-xs text-gray-500 mt-0.5">自提金額免計薪資所得，等於政府幫你出稅率比例的錢。這是最低成本的退休儲蓄方式，沒有理由不做。
                <Link href="/labor-retirement" className="ml-1 text-orange-500 underline">計算自提節稅效果 →</Link>
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm font-bold text-orange-600">3</div>
            <div>
              <p className="text-sm font-semibold text-gray-800">額外儲蓄填補剩餘缺口</p>
              <p className="text-xs text-gray-500 mt-0.5">勞退自提之外，每月投入定期定額 ETF 或基金。本試算器顯示的「每月需額外儲蓄」就是這個數字。越早開始，每月需存越少。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 相關工具 */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-gray-700">相關計算工具</h2>
        <div className="grid grid-cols-3 gap-2">
          {[
            { href: "/labor-retirement", label: "勞退新制試算" },
            { href: "/pension-calculator", label: "勞退節稅計算" },
            { href: "/tax-calculator", label: "所得稅計算器" },
            { href: "/salary-calculator", label: "月薪試算" },
            { href: "/labor-insurance-rates", label: "勞健保費率" },
            { href: "/supplement-premium", label: "二代健保" },
            { href: "/income-tax-brackets", label: "所得稅級距" },
            { href: "/tax-strategy-2026", label: "省稅攻略" },
            { href: "/income-tax-guide-2026", label: "報稅完整攻略" },
          ].map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="rounded-xl border border-gray-100 px-3 py-2 text-center text-xs text-gray-600 hover:border-orange-200 hover:text-orange-600 transition"
            >
              {t.label}
            </Link>
          ))}
        </div>
      </section>

      <TaxAffiliateCTA />

      {/* FAQ */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-800">常見問題</h2>
        <div className="space-y-4">
          {FAQS.map((faq) => (
            <div key={faq.q}>
              <p className="text-sm font-semibold text-gray-800 mb-1">{faq.q}</p>
              <p className="text-xs leading-relaxed text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 pb-4">
        <p>※ 本試算器依 114 年度勞退新制及勞保規定計算，勞保年金採方式二（平均月投保薪資 × 年資 × 1.55%）估算，</p>
        <p>實際金額依個人投保紀錄為準。數字僅供規劃參考，不構成財務建議。</p>
      </footer>
    </main>
  );
}
