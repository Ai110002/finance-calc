"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

// ── 114年度個人最低稅負制（所得基本稅額條例）────────────────────────────────
// 所得基本稅額條例第12條第1項第1款：
//   海外所得超過 100 萬元者，其超過部分計入基本所得額
// 基本所得額免稅額：670 萬元（第13條）
// 基本稅額稅率：20%（第13條）
// 應繳稅額 = max(一般所得稅額, 基本稅額)
// ─────────────────────────────────────────────────────────────────────────────

const FOREIGN_INCOME_THRESHOLD = 1_000_000;  // 100 萬元門檻
const AMT_EXEMPTION = 6_700_000;             // 670 萬元基本所得額免稅額
const AMT_RATE = 0.20;                       // 20%

const STANDARD_DEDUCTION = { single: 131_000, married: 262_000 };
const EXEMPTION = 97_000;
const SALARY_DEDUCTION_MAX = 218_000;

const TAX_BRACKETS = [
  { max: 590_000,   rate: 0.05, diff: 0 },
  { max: 1_330_000, rate: 0.12, diff: 41_300 },
  { max: 2_660_000, rate: 0.20, diff: 147_700 },
  { max: 4_980_000, rate: 0.30, diff: 413_700 },
  { max: Infinity,  rate: 0.40, diff: 911_700 },
];

function calcRegularTax(netIncome: number): number {
  if (netIncome <= 0) return 0;
  for (const b of TAX_BRACKETS) {
    if (netIncome <= b.max) return Math.round(netIncome * b.rate - b.diff);
  }
  return 0;
}

function fmt(n: number): string {
  return `NT$${Math.round(n).toLocaleString("zh-TW")}`;
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
  { href: "/foreign-income-tax", label: "海外所得", active: true },
  { href: "/tax-refund", label: "退稅試算" },
  { href: "/tax-filing-steps", label: "報稅流程" },
  { href: "/joint-filing", label: "夫妻合併vs分開" },
  { href: "/income-tax-guide-2026", label: "報稅完整攻略" },
];

// ── 情境比較表 ────────────────────────────────────────────────────────────────
type Scenario = {
  label: string;
  domesticIncome: number;
  foreignIncome: number;
  filing: "single" | "married";
};

function calcScenario(s: Scenario) {
  const persons = s.filing === "married" ? 2 : 1;
  const salaryDeduction = Math.min(s.domesticIncome, SALARY_DEDUCTION_MAX) * persons;
  const exemption = EXEMPTION * persons;
  const stdDeduction = STANDARD_DEDUCTION[s.filing];
  const netDomestic = Math.max(0, s.domesticIncome * persons - salaryDeduction - exemption - stdDeduction);
  const regularTax = calcRegularTax(netDomestic);

  const foreignAddOn = Math.max(0, s.foreignIncome - FOREIGN_INCOME_THRESHOLD);
  const basicIncome = netDomestic + foreignAddOn;
  const basicTax = Math.max(0, Math.round((basicIncome - AMT_EXEMPTION) * AMT_RATE));
  const payable = Math.max(regularTax, basicTax);
  const amtExtra = Math.max(0, basicTax - regularTax);

  return { regularTax, basicTax, payable, amtExtra };
}

const SCENARIOS: Scenario[] = [
  { label: "薪資 100萬，海外所得 50萬", domesticIncome: 1_000_000, foreignIncome: 500_000, filing: "single" },
  { label: "薪資 100萬，海外所得 200萬", domesticIncome: 1_000_000, foreignIncome: 2_000_000, filing: "single" },
  { label: "薪資 100萬，海外所得 1,000萬 ⚠️", domesticIncome: 1_000_000, foreignIncome: 10_000_000, filing: "single" },
  { label: "薪資 200萬，海外所得 500萬", domesticIncome: 2_000_000, foreignIncome: 5_000_000, filing: "single" },
  { label: "夫妻各薪 150萬，海外所得 300萬", domesticIncome: 1_500_000, foreignIncome: 3_000_000, filing: "married" },
  { label: "夫妻各薪 200萬，海外所得 500萬", domesticIncome: 2_000_000, foreignIncome: 5_000_000, filing: "married" },
];

export default function ForeignIncomeTaxPage() {
  const [filing, setFiling] = useState<"single" | "married">("single");
  const [salary, setSalary] = useState(1_200_000);
  const [spouseSalary, setSpouseSalary] = useState(0);
  const [foreignIncome, setForeignIncome] = useState(1_500_000);

  const result = useMemo(() => {
    // 一般綜所稅計算
    const salaryA = Math.min(salary, SALARY_DEDUCTION_MAX);
    const salaryB = filing === "married" && spouseSalary > 0 ? Math.min(spouseSalary, SALARY_DEDUCTION_MAX) : 0;
    const totalSalaryDeduction = salaryA + salaryB;
    const persons = filing === "married" ? 2 : 1;
    const exemption = EXEMPTION * persons;
    const stdDeduction = STANDARD_DEDUCTION[filing];
    const totalDomesticIncome = filing === "married" ? salary + spouseSalary : salary;
    const netDomestic = Math.max(0, totalDomesticIncome - totalSalaryDeduction - exemption - stdDeduction);
    const regularTax = calcRegularTax(netDomestic);

    // AMT 計算
    const triggerThreshold = foreignIncome >= FOREIGN_INCOME_THRESHOLD;
    const foreignAddOn = Math.max(0, foreignIncome - FOREIGN_INCOME_THRESHOLD);
    const basicIncome = netDomestic + foreignAddOn;
    const triggerAMT = basicIncome > AMT_EXEMPTION;
    const basicTax = triggerAMT ? Math.round((basicIncome - AMT_EXEMPTION) * AMT_RATE) : 0;
    const payable = Math.max(regularTax, basicTax);
    const amtExtra = Math.max(0, basicTax - regularTax);

    return {
      totalDomesticIncome,
      totalSalaryDeduction,
      exemption,
      stdDeduction,
      netDomestic,
      regularTax,
      triggerThreshold,
      foreignAddOn,
      basicIncome,
      triggerAMT,
      basicTax,
      payable,
      amtExtra,
    };
  }, [filing, salary, spouseSalary, foreignIncome]);

  const amtStatus = result.amtExtra > 0
    ? { label: "需補繳 AMT！", color: "text-red-400", bg: "bg-red-500/20" }
    : result.triggerAMT
    ? { label: "基本稅額 ≤ 一般稅額，不補繳", color: "text-yellow-300", bg: "bg-yellow-500/20" }
    : result.triggerThreshold
    ? { label: "基本所得額未達 670 萬，AMT 為 0", color: "text-green-400", bg: "bg-green-500/20" }
    : { label: "海外所得未達 100 萬，不計入 AMT", color: "text-green-400", bg: "bg-green-500/20" };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50">
      {/* Nav */}
      <nav className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl overflow-x-auto px-4">
          <div className="flex gap-1 py-2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  l.active
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-2xl px-4 py-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1.5">
            <span className="text-lg">🌏</span>
            <span className="text-sm font-semibold text-indigo-700">114年度報稅</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            海外所得 & 最低稅負制試算
          </h1>
          <p className="mt-3 text-gray-500">
            美股、海外 ETF 投資人——海外所得超過{" "}
            <strong className="text-indigo-600">NT$100 萬</strong>才計入 AMT，
            基本所得額超過{" "}
            <strong className="text-indigo-600">NT$670 萬</strong>才需繳 20% 稅
          </p>
          <p className="mt-1 text-sm text-gray-400">
            依所得基本稅額條例（114年度申報）
          </p>
        </header>

        {/* 說明卡片 */}
        <div className="mb-6 rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 p-5">
          <h2 className="mb-3 font-bold text-gray-800">最低稅負制（AMT）三步驟判斷</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>① <strong>海外所得是否 ≥ 100 萬元？</strong>未達100萬，整年海外所得全免，不計入AMT</p>
            <p>② <strong>基本所得額是否 &gt; 670 萬元？</strong>（綜合所得淨額 + 海外所得超過100萬的部分）未達670萬，AMT稅額為0</p>
            <p>③ <strong>基本稅額 vs 一般稅額取大值</strong>——只有基本稅額 &gt; 一般稅額時，才需補繳差額</p>
          </div>
        </div>

        <AdUnit />

        {/* Calculator */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-bold text-gray-800">海外所得 AMT 試算</h2>

          {/* 申報方式 */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">申報方式</label>
            <div className="grid grid-cols-2 gap-2">
              {(["single", "married"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFiling(f)}
                  className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                    filing === f
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {f === "single" ? "🧑 單身申報" : "💑 夫妻合報"}
                </button>
              ))}
            </div>
          </div>

          {/* 國內薪資 */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {filing === "married" ? "本人國內薪資所得" : "國內薪資所得"}
              <span className="ml-1 font-normal text-gray-400">（年薪）</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                inputMode="numeric"
                value={salary}
                onChange={(e) => setSalary(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="1200000"
              />
              <span className="whitespace-nowrap text-sm text-gray-500">元/年</span>
            </div>
          </div>

          {/* 配偶薪資 */}
          {filing === "married" && (
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                配偶國內薪資所得
                <span className="ml-1 font-normal text-gray-400">（年薪）</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  inputMode="numeric"
                  value={spouseSalary}
                  onChange={(e) => setSpouseSalary(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="0"
                />
                <span className="whitespace-nowrap text-sm text-gray-500">元/年</span>
              </div>
              <p className="mt-1 text-xs text-gray-400">配偶無薪資收入請填 0</p>
            </div>
          )}

          {/* 海外所得 */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              全年海外所得合計
              <span className="ml-1 font-normal text-gray-400">（美股股利 + 資本利得 + 海外利息等）</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                inputMode="numeric"
                value={foreignIncome}
                onChange={(e) => setForeignIncome(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="1500000"
              />
              <span className="whitespace-nowrap text-sm text-gray-500">元/年</span>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              台股買賣資本利得免稅，不用填入。台灣上市ETF（如0050）配息算國內股利，不算海外所得。
            </p>
          </div>

          {/* 結果卡片 */}
          <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 p-5 text-white">
            {/* AMT 狀態 */}
            <div className={`mb-4 rounded-xl px-4 py-3 text-center ${amtStatus.bg}`}>
              <p className={`text-base font-bold ${amtStatus.color}`}>{amtStatus.label}</p>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/10 p-3 text-center">
                <p className="text-xs opacity-80">一般所得稅額</p>
                <p className="text-lg font-bold">{fmt(result.regularTax)}</p>
              </div>
              <div className="rounded-xl bg-white/10 p-3 text-center">
                <p className="text-xs opacity-80">基本稅額（AMT）</p>
                <p className="text-lg font-bold">{fmt(result.basicTax)}</p>
              </div>
            </div>

            <div className="mb-4 rounded-xl bg-white/15 p-4">
              <div className="flex justify-between text-sm">
                <span className="opacity-90">基本所得額</span>
                <span className="font-bold">{fmt(result.basicIncome)}</span>
              </div>
              <div className="mt-1 flex justify-between text-sm">
                <span className="opacity-80 text-xs">（綜合所得淨額 {fmt(result.netDomestic)} + 海外加計 {fmt(result.foreignAddOn)}）</span>
              </div>
              {result.amtExtra > 0 && (
                <div className="mt-3 border-t border-white/20 pt-3 flex justify-between">
                  <span className="font-bold opacity-95">需補繳 AMT 差額</span>
                  <span className="text-xl font-bold text-red-300">{fmt(result.amtExtra)}</span>
                </div>
              )}
            </div>

            <div className="rounded-xl bg-white/20 p-3 text-center">
              <p className="text-sm font-medium opacity-90">應繳稅額（取較高者）</p>
              <p className="text-4xl font-bold">{fmt(result.payable)}</p>
              {result.amtExtra > 0 && (
                <p className="mt-1 text-xs text-red-200">含 AMT 補繳 {fmt(result.amtExtra)}</p>
              )}
            </div>
            <p className="mt-3 text-center text-xs opacity-70">
              ＊以薪資所得標準扣除額估算，實際金額依申報情況而異
            </p>
          </div>

          {/* 計算明細 */}
          <div className="mt-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
            <p className="mb-2 font-semibold text-gray-700">計算明細</p>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>國內薪資所得合計</span>
                <span>{fmt(result.totalDomesticIncome)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>－薪資所得特別扣除額</span>
                <span>－{fmt(result.totalSalaryDeduction)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>－免稅額</span>
                <span>－{fmt(result.exemption)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>－標準扣除額</span>
                <span>－{fmt(result.stdDeduction)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-1">
                <span>綜合所得淨額</span>
                <span className="font-medium">{fmt(result.netDomestic)}</span>
              </div>
              <div className="flex justify-between text-indigo-600">
                <span>＋海外所得加計（超過100萬部分）</span>
                <span>＋{fmt(result.foreignAddOn)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-1 font-medium">
                <span>基本所得額</span>
                <span>{fmt(result.basicIncome)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>－基本所得額免稅額</span>
                <span>－NT$6,700,000</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-1 font-medium">
                <span>基本稅額（× 20%）</span>
                <span>{fmt(result.basicTax)}</span>
              </div>
            </div>
          </div>
        </div>

        <TaxAffiliateCTA />

        {/* 情境比較表 */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-800">常見情境 AMT 試算</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500">情境</th>
                  <th className="pb-2 text-right text-xs font-semibold text-gray-500">一般稅額</th>
                  <th className="pb-2 text-right text-xs font-semibold text-gray-500">AMT</th>
                  <th className="pb-2 text-right text-xs font-semibold text-gray-500">應繳稅額</th>
                </tr>
              </thead>
              <tbody>
                {SCENARIOS.map((s) => {
                  const r = calcScenario(s);
                  return (
                    <tr key={s.label} className="border-b border-gray-50">
                      <td className="py-2.5 text-gray-700 text-xs">{s.label}</td>
                      <td className="py-2.5 text-right text-gray-600">{fmt(r.regularTax)}</td>
                      <td className={`py-2.5 text-right font-medium ${r.basicTax > 0 ? "text-indigo-600" : "text-gray-400"}`}>
                        {fmt(r.basicTax)}
                      </td>
                      <td className={`py-2.5 text-right font-semibold ${r.amtExtra > 0 ? "text-red-600" : "text-gray-700"}`}>
                        {fmt(r.payable)}
                        {r.amtExtra > 0 && <span className="ml-1 text-xs text-red-400">+AMT</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-gray-400">
            ＊薪資所得以標準扣除額估算。夫妻合報情境為每人各該薪資。
          </p>
        </div>

        {/* 申報重點 */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-800">海外所得申報重點</h2>
          <div className="space-y-3">
            {[
              {
                n: 1,
                title: "海外所得未達 100 萬元：完全免計入",
                desc: "個人全年海外所得（美股股利、資本利得、海外利息等合計）未達新臺幣100萬元，不需計入基本所得額，AMT稅額為0，但仍需注意是否有其他申報義務。",
              },
              {
                n: 2,
                title: "超過100萬只計「超過的部分」",
                desc: "海外所得達100萬01元，只有超過100萬的那1元計入基本所得額，不是全額計入。例如海外所得150萬，只有50萬計入基本所得額。",
              },
              {
                n: 3,
                title: "基本所得額 670 萬是大多數人的安全線",
                desc: "薪資500萬 + 海外所得超過100萬的部分，合計仍需超過670萬才需繳AMT。對絕大多數上班族投資人，即使有美股股利收入，多半不會觸發AMT。",
              },
              {
                n: 4,
                title: "台灣上市ETF配息不算海外所得",
                desc: "0050、00878、006208等台灣掛牌ETF配息屬於國內股利所得，適用一般綜所稅（可申報股利合併計稅或分開28%）。只有直接持有海外掛牌證券（如美股VTI、個股）的股利和買賣利得才算海外所得。",
              },
            ].map((item) => (
              <div key={item.n} className="flex gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                  {item.n}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-bold text-gray-800">常見問題</h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-gray-800">Q：美股 ETF（如 VTI、SPY）的股利算海外所得嗎？</h3>
              <p className="mt-1 text-sm text-gray-600">
                是的。在美國掛牌的 ETF（VTI、SPY、QQQ 等）股利屬於「非中華民國來源所得」，算海外所得。台灣掛牌的 ETF（0050、00878 等）配息則屬國內股利所得，依股利申報規則處理，不算海外所得。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Q：美股賣出獲利要怎麼計算海外所得？</h3>
              <p className="mt-1 text-sm text-gray-600">
                美股資本利得 = 賣出金額 − 取得成本（含手續費）。同年度的海外虧損可以抵同年度的海外所得，但不能跨年抵，也不能抵國內所得。以新臺幣換算時，以實際匯率換算，建議保留交易記錄與匯率憑證備查。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Q：海外所得要在哪裡申報？</h3>
              <p className="mt-1 text-sm text-gray-600">
                使用財政部網路申報系統（eTax Portal）時，在「基本所得額申報」欄位填入海外所得資料。若使用綜所稅結算申報書（紙本），填寫「所得基本稅額申報表」（附件）。系統會自動判斷是否需繳AMT。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Q：海外所得超過 100 萬一定要繳稅嗎？</h3>
              <p className="mt-1 text-sm text-gray-600">
                不一定。超過100萬才計入基本所得額，但若「基本所得額（綜合所得淨額 + 海外所得超過100萬的部分）」未超過670萬元，基本稅額為0，不需繳AMT。即使超過670萬，也要基本稅額大於一般所得稅額才需補繳差額。用上方計算器輸入你的狀況，就能立即知道。
              </p>
            </div>
          </div>
        </div>

        {/* 相關工具 */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-bold text-gray-700">相關投資稅務工具</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { href: "/dividend-tax", label: "📈 股利申報試算", desc: "合併計稅 vs 分開28%" },
              { href: "/supplement-premium", label: "🏥 二代健保試算", desc: "股利/獎金補充保費" },
              { href: "/tax-calculator", label: "📊 報稅計算器", desc: "綜合所得稅全試算" },
              { href: "/income-tax-brackets", label: "📋 所得稅級距", desc: "114年度稅率表" },
              { href: "/deduction-compare", label: "🔄 列舉vs標準", desc: "哪種扣除額更省" },
              { href: "/tax-filing-guide", label: "📝 報稅攻略", desc: "新手報稅懶人包" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-gray-100 bg-gray-50 p-3 transition-colors hover:border-indigo-200 hover:bg-indigo-50"
              >
                <p className="text-sm font-medium text-gray-700">{item.label}</p>
                <p className="mt-0.5 text-xs text-gray-400">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          依所得基本稅額條例（114年度）。試算結果僅供參考，實際稅額以財政部核定為準。
        </p>
      </div>
    </div>
  );
}
