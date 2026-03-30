"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

// ── 114年度綜合所得稅參數 ────────────────────────────────────────────────────
// 免稅額：每人 97,000 元（所得稅法第17條）
// 標準扣除額：單身 131,000、夫妻合報 262,000（所得稅法第17條）
// 薪資特別扣除額：218,000 元/人（上限，實際薪資不足時取實際薪資）
// 稅率表：5% / 12% / 20% / 30% / 40%（所得稅法第5條）
// ─────────────────────────────────────────────────────────────────────────────

const EXEMPTION = 97_000;
const STANDARD_DEDUCTION = { single: 131_000, married: 262_000 };
const SALARY_DEDUCTION_MAX = 218_000;

const TAX_BRACKETS = [
  { max: 590_000,   rate: 0.05, diff: 0 },
  { max: 1_330_000, rate: 0.12, diff: 41_300 },
  { max: 2_660_000, rate: 0.20, diff: 147_700 },
  { max: 4_980_000, rate: 0.30, diff: 413_700 },
  { max: Infinity,  rate: 0.40, diff: 911_700 },
];

function calcTax(netIncome: number): number {
  if (netIncome <= 0) return 0;
  for (const b of TAX_BRACKETS) {
    if (netIncome <= b.max) return Math.round(netIncome * b.rate - b.diff);
  }
  return 0;
}

function taxRate(netIncome: number): string {
  if (netIncome <= 0) return "0%";
  for (const b of TAX_BRACKETS) {
    if (netIncome <= b.max) return `${Math.round(b.rate * 100)}%`;
  }
  return "40%";
}

function fmt(n: number): string {
  return `NT$${Math.round(n).toLocaleString("zh-TW")}`;
}

function parseNum(s: string): number {
  return Math.max(0, Number(s.replace(/,/g, "")) || 0);
}

const NAV_LINKS = [
  { href: "/", label: "財務自由" },
  { href: "/tax-calculator", label: "報稅計算" },
  { href: "/tax-checklist-2026", label: "報稅懶人包" },
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
  { href: "/deduction-compare", label: "列舉vs標準" },
  { href: "/preschool-deduction", label: "幼兒學前扣除" },
  { href: "/foreign-income-tax", label: "海外所得" },
  { href: "/tax-refund", label: "退稅試算", active: true },
];

// ── 常見情境比較表 ────────────────────────────────────────────────────────────
type Scenario = {
  label: string;
  filing: "single" | "married";
  selfSalary: number;
  spouseSalary: number;
  withheld: number;
  dependents: number;
};

const SCENARIOS: Scenario[] = [
  {
    label: "單身、薪資50萬、年中換工作扣繳多",
    filing: "single",
    selfSalary: 500_000,
    spouseSalary: 0,
    withheld: 18_000,
    dependents: 0,
  },
  {
    label: "單身、薪資80萬、無扶養",
    filing: "single",
    selfSalary: 800_000,
    spouseSalary: 0,
    withheld: 25_000,
    dependents: 0,
  },
  {
    label: "單身、扶養父母2人、薪資70萬",
    filing: "single",
    selfSalary: 700_000,
    spouseSalary: 0,
    withheld: 20_000,
    dependents: 2,
  },
  {
    label: "已婚合報、雙薪各60萬、2子女",
    filing: "married",
    selfSalary: 600_000,
    spouseSalary: 600_000,
    withheld: 28_000,
    dependents: 2,
  },
  {
    label: "已婚合報、薪資120萬+配偶60萬、扶養父母",
    filing: "married",
    selfSalary: 1_200_000,
    spouseSalary: 600_000,
    withheld: 65_000,
    dependents: 2,
  },
  {
    label: "已婚合報、高薪200萬+配偶80萬",
    filing: "married",
    selfSalary: 2_000_000,
    spouseSalary: 800_000,
    withheld: 150_000,
    dependents: 0,
  },
];

function calcScenario(s: Scenario) {
  const totalSalary = s.selfSalary + s.spouseSalary;
  const salaryDed =
    Math.min(s.selfSalary, SALARY_DEDUCTION_MAX) +
    Math.min(s.spouseSalary, SALARY_DEDUCTION_MAX);
  const headCount = (s.filing === "married" ? 2 : 1) + s.dependents;
  const exemption = EXEMPTION * headCount;
  const stdDed = STANDARD_DEDUCTION[s.filing];
  const netIncome = Math.max(0, totalSalary - salaryDed - exemption - stdDed);
  const taxDue = calcTax(netIncome);
  const delta = s.withheld - taxDue;
  return { taxDue, delta };
}

// ── 主頁面 ────────────────────────────────────────────────────────────────────
export default function TaxRefundPage() {
  const [filing, setFiling] = useState<"single" | "married">("single");
  const [selfSalary, setSelfSalary] = useState("600000");
  const [spouseSalary, setSpouseSalary] = useState("0");
  const [selfWithheld, setSelfWithheld] = useState("15000");
  const [spouseWithheld, setSpouseWithheld] = useState("0");
  const [dependents, setDependents] = useState(0);
  const [useItemized, setUseItemized] = useState(false);
  const [itemizedTotal, setItemizedTotal] = useState("0");
  const [showDetail, setShowDetail] = useState(false);

  const result = useMemo(() => {
    const self = parseNum(selfSalary);
    const spouse = filing === "married" ? parseNum(spouseSalary) : 0;
    const withheldSelf = parseNum(selfWithheld);
    const withheldSpouse = filing === "married" ? parseNum(spouseWithheld) : 0;
    const totalSalary = self + spouse;
    const totalWithheld = withheldSelf + withheldSpouse;

    const salaryDed =
      Math.min(self, SALARY_DEDUCTION_MAX) +
      Math.min(spouse, SALARY_DEDUCTION_MAX);
    const headCount = (filing === "married" ? 2 : 1) + dependents;
    const exemption = EXEMPTION * headCount;
    const stdDed = STANDARD_DEDUCTION[filing];
    const itemized = useItemized ? parseNum(itemizedTotal) : 0;
    const deduction = useItemized && itemized > stdDed ? itemized : stdDed;
    const deductionType = useItemized && itemized > stdDed ? "列舉扣除" : "標準扣除";

    const netIncome = Math.max(0, totalSalary - salaryDed - exemption - deduction);
    const taxDue = calcTax(netIncome);
    const rate = taxRate(netIncome);
    const delta = totalWithheld - taxDue;

    return {
      totalSalary,
      salaryDed,
      exemption,
      deduction,
      deductionType,
      netIncome,
      taxDue,
      totalWithheld,
      delta,
      rate,
      headCount,
    };
  }, [filing, selfSalary, spouseSalary, selfWithheld, spouseWithheld, dependents, useItemized, itemizedTotal]);

  const isRefund = result.delta > 0;
  const isBreakEven = result.delta === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Nav */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-5xl px-4 py-2 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                  l.active
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-4 py-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            退稅試算 2026
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            114年度綜合所得稅｜輸入薪資 + 扣繳稅額，立即算退稅或補稅
          </p>
        </div>

        <AdUnit slot="tax-refund-top" />

        {/* Calculator */}
        <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5 space-y-5">
          {/* 申報方式 */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              申報方式
            </label>
            <div className="flex gap-2">
              {(["single", "married"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setFiling(v)}
                  className={`flex-1 rounded-xl py-2.5 text-sm font-medium transition-colors ${
                    filing === v
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {v === "single" ? "本人單獨申報" : "夫妻合併申報"}
                </button>
              ))}
            </div>
          </div>

          {/* 本人薪資 */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                本人全年薪資所得（元）
              </label>
              <input
                type="number"
                min={0}
                value={selfSalary}
                onChange={(e) => setSelfSalary(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="600000"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                本人全年已扣繳稅額（元）
                <span className="ml-1 text-slate-400">（扣繳憑單上查）</span>
              </label>
              <input
                type="number"
                min={0}
                value={selfWithheld}
                onChange={(e) => setSelfWithheld(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="15000"
              />
            </div>
          </div>

          {/* 配偶（合報才顯示） */}
          {filing === "married" && (
            <div className="grid gap-4 sm:grid-cols-2 rounded-xl bg-slate-50 p-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  配偶全年薪資所得（元）
                </label>
                <input
                  type="number"
                  min={0}
                  value={spouseSalary}
                  onChange={(e) => setSpouseSalary(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  配偶全年已扣繳稅額（元）
                </label>
                <input
                  type="number"
                  min={0}
                  value={spouseWithheld}
                  onChange={(e) => setSpouseWithheld(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="0"
                />
              </div>
            </div>
          )}

          {/* 扶養人數 */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              受扶養親屬人數
              <span className="ml-1 text-xs font-normal text-slate-400">（父母、子女等，每人多 NT$97,000 免稅額）</span>
            </label>
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => setDependents(n)}
                  className={`flex-1 rounded-xl py-2 text-sm font-medium transition-colors ${
                    dependents === n
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {n}人
                </button>
              ))}
            </div>
          </div>

          {/* 列舉扣除 */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <input
                id="itemized"
                type="checkbox"
                checked={useItemized}
                onChange={(e) => setUseItemized(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="itemized" className="text-sm font-semibold text-slate-700 cursor-pointer">
                使用列舉扣除額
                <span className="ml-1 text-xs font-normal text-slate-400">（有房貸利息、捐款、醫療費等）</span>
              </label>
            </div>
            {useItemized && (
              <div className="rounded-xl bg-slate-50 p-4">
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  列舉扣除合計（元）
                  <span className="ml-1 text-slate-400">（房貸利息最高30萬、保險2.4萬/人、捐款、醫療費等）</span>
                </label>
                <input
                  type="number"
                  min={0}
                  value={itemizedTotal}
                  onChange={(e) => setItemizedTotal(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="300000"
                />
                {useItemized && parseNum(itemizedTotal) <= STANDARD_DEDUCTION[filing] && (
                  <p className="mt-2 text-xs text-amber-600">
                    ⚠ 列舉扣除額未超過標準扣除額（
                    {fmt(STANDARD_DEDUCTION[filing])}），系統自動使用標準扣除額
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Result */}
        <div
          className={`rounded-2xl p-5 border-2 ${
            isRefund
              ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
              : isBreakEven
              ? "bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200"
              : "bg-gradient-to-br from-red-50 to-orange-50 border-red-200"
          }`}
        >
          <div className="text-center mb-4">
            <p className="text-sm font-medium text-slate-600">
              {isRefund ? "預估可退稅" : isBreakEven ? "剛好不退不補" : "預估需補繳"}
            </p>
            <p
              className={`text-4xl font-bold mt-1 ${
                isRefund ? "text-green-600" : isBreakEven ? "text-slate-500" : "text-red-500"
              }`}
            >
              {isRefund ? "+" : isBreakEven ? "" : "-"}
              {fmt(Math.abs(result.delta))}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              已扣繳 {fmt(result.totalWithheld)} ー 應繳稅 {fmt(result.taxDue)}
            </p>
          </div>

          {/* Detail toggle */}
          <button
            onClick={() => setShowDetail(!showDetail)}
            className="w-full text-center text-xs text-slate-500 hover:text-slate-700 transition-colors py-1"
          >
            {showDetail ? "▲ 收起計算明細" : "▼ 展開計算明細"}
          </button>

          {showDetail && (
            <div className="mt-3 rounded-xl bg-white/70 p-4 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">全年薪資所得</span>
                <span className="font-medium">{fmt(result.totalSalary)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">薪資特別扣除</span>
                <span className="font-medium text-green-600">－{fmt(result.salaryDed)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">免稅額（{result.headCount}人）</span>
                <span className="font-medium text-green-600">－{fmt(result.exemption)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{result.deductionType}</span>
                <span className="font-medium text-green-600">－{fmt(result.deduction)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2">
                <span className="text-slate-700 font-semibold">所得淨額</span>
                <span className="font-bold">{fmt(result.netIncome)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">適用稅率</span>
                <span className="font-medium">{result.rate}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2">
                <span className="text-slate-700 font-semibold">應繳稅額</span>
                <span className="font-bold text-slate-800">{fmt(result.taxDue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700 font-semibold">已扣繳稅額</span>
                <span className="font-bold text-slate-800">{fmt(result.totalWithheld)}</span>
              </div>
              <div
                className={`flex justify-between border-t-2 pt-2 ${
                  isRefund ? "border-green-300" : "border-red-300"
                }`}
              >
                <span className="font-bold text-slate-800">
                  {isRefund ? "退稅" : "補稅"}
                </span>
                <span
                  className={`text-lg font-bold ${
                    isRefund ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {isRefund ? "+" : "-"}{fmt(Math.abs(result.delta))}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5">
          <h2 className="text-base font-bold text-slate-800 mb-3">
            退稅常見問題
          </h2>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex gap-2">
              <span className="text-blue-500 font-bold shrink-0">Q1</span>
              <div>
                <p className="font-medium text-slate-700">扣繳稅額在哪裡查？</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  每年2月，雇主會提供「扣繳憑單」。紙本寄到戶籍地址，或透過公司薪資系統查詢。也可在5月報稅時，用健保卡登入 eTax 系統，扣繳資料會自動帶入。
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="text-blue-500 font-bold shrink-0">Q2</span>
              <div>
                <p className="font-medium text-slate-700">年中換工作為什麼特別容易退稅？</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  每家公司都依照你當月薪資乘以月份推算「年化」後扣繳。換工作後，兩家公司加總的扣繳稅額往往超過你全年實際應繳稅額，差額就會退給你。
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="text-blue-500 font-bold shrink-0">Q3</span>
              <div>
                <p className="font-medium text-slate-700">夫妻要合報還是分報比較省？</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  薪資所得者一般合報可共用標準扣除額（262,000）並有兩個薪資特別扣除額（各218,000），通常合報更省。但若配偶有大量非薪資所得（如租金、股利），可試算分報效果。
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="text-blue-500 font-bold shrink-0">Q4</span>
              <div>
                <p className="font-medium text-slate-700">退稅什麼時候入帳？</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  5月申報後約1至3個月（7至9月）退稅入帳。申報時填寫銀行帳號最快，不填則以支票寄戶籍地址。
                </p>
              </div>
            </div>
          </div>
        </div>

        <AdUnit slot="tax-refund-mid" />

        {/* Scenario Table */}
        <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5">
          <h2 className="text-base font-bold text-slate-800 mb-3">
            常見情境試算
            <span className="ml-1 text-xs font-normal text-slate-400">（114年度，僅薪資所得，標準扣除）</span>
          </h2>
          <div className="overflow-x-auto -mx-1">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-2 px-2 font-medium text-slate-500">情境</th>
                  <th className="py-2 px-2 font-medium text-slate-500 text-right">應繳稅</th>
                  <th className="py-2 px-2 font-medium text-slate-500 text-right">退/補稅</th>
                </tr>
              </thead>
              <tbody>
                {SCENARIOS.map((s) => {
                  const { taxDue, delta } = calcScenario(s);
                  const isR = delta > 0;
                  return (
                    <tr key={s.label} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="py-2 px-2 text-slate-600">{s.label}</td>
                      <td className="py-2 px-2 text-right text-slate-700 font-medium">{fmt(taxDue)}</td>
                      <td
                        className={`py-2 px-2 text-right font-semibold ${
                          isR ? "text-green-600" : delta < 0 ? "text-red-500" : "text-slate-500"
                        }`}
                      >
                        {isR ? "+" : delta < 0 ? "-" : ""}
                        {fmt(Math.abs(delta))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Affiliate CTA */}
        <TaxAffiliateCTA />

        {/* Related Tools */}
        <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5">
          <h2 className="text-base font-bold text-slate-800 mb-3">相關工具</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {[
              { href: "/tax-calculator", label: "報稅試算" },
              { href: "/deduction-compare", label: "列舉vs標準扣除" },
              { href: "/dependent-deduction", label: "扶養節稅試算" },
              { href: "/income-tax-brackets", label: "所得稅級距表" },
              { href: "/basic-living-deduction", label: "免稅天花板試算" },
              { href: "/tax-filing-guide", label: "報稅攻略完整版" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-xl border border-slate-200 px-3 py-2 text-center text-xs font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <AdUnit slot="tax-refund-bottom" />

        <footer className="text-center text-xs text-slate-400 pb-4">
          本工具依據財政部114年度綜合所得稅規定計算，僅供試算參考。
          實際退補稅金額以國稅局核定為準。
        </footer>
      </main>
    </div>
  );
}
