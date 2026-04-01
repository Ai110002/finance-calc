"use client";

import { useState } from "react";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

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
  { href: "/salary-vs-freelancer", label: "薪資vs接案", active: true },
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
  { href: "/tax-refund-timeline", label: "退稅時程" },
];

// ── 115年度（114年所得，2026年5月申報）─────────────────
const EXEMPTION = 97_000;           // 本人免稅額
const STD_DEDUCTION = 131_000;      // 標準扣除額（單身）
const SALARY_SPECIAL = 218_000;     // 薪資特別扣除額
const FREELANCER_RATE = 0.20;       // 執行業務費用率（一般接案）
const NHI_SUPPLEMENT = 0.0211;      // 二代健保補充保費率

const TAX_BRACKETS = [
  { max: 590_000,   rate: 0.05, diff: 0 },
  { max: 1_330_000, rate: 0.12, diff: 41_300 },
  { max: 2_660_000, rate: 0.20, diff: 147_700 },
  { max: 4_980_000, rate: 0.30, diff: 413_700 },
  { max: Infinity,  rate: 0.40, diff: 912_700 },
];

function calcTax(netIncome: number): number {
  if (netIncome <= 0) return 0;
  const b = TAX_BRACKETS.find((t) => netIncome <= t.max)!;
  return Math.max(0, Math.round(netIncome * b.rate - b.diff));
}

function getEffectiveRate(tax: number, income: number): string {
  if (income <= 0) return "0.0";
  return ((tax / income) * 100).toFixed(1);
}

function calcSalary(income: number) {
  const netIncome = Math.max(0, income - EXEMPTION - STD_DEDUCTION - SALARY_SPECIAL);
  const tax = calcTax(netIncome);
  return { netIncome, tax, totalCost: tax };
}

function calcFreelancer(income: number) {
  const expense = Math.round(income * FREELANCER_RATE);
  const netIncome = Math.max(0, income - expense - EXEMPTION - STD_DEDUCTION);
  const tax = calcTax(netIncome);
  const supplement = Math.round(income * NHI_SUPPLEMENT);
  const totalCost = tax + supplement;
  return { netIncome, expense, tax, supplement, totalCost };
}

function fmt(n: number) {
  return n.toLocaleString("zh-TW");
}

const COMPARISON_INCOMES = [
  600_000, 800_000, 1_090_000, 1_500_000,
  2_000_000, 2_300_000, 3_000_000, 4_000_000,
];

export default function SalaryVsFreelancerPage() {
  const [income, setIncome] = useState(1_200_000);
  const [inputVal, setInputVal] = useState("1200000");

  const salary = calcSalary(income);
  const freelancer = calcFreelancer(income);
  const diff = salary.totalCost - freelancer.totalCost;
  const freelancerWins = diff > 0;

  function handleInput(val: string) {
    const raw = val.replace(/[^0-9]/g, "");
    setInputVal(raw);
    const n = parseInt(raw, 10);
    if (!isNaN(n) && n >= 0) setIncome(n);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Nav ── */}
      <nav className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 py-2">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`whitespace-nowrap rounded-full border px-3 py-1 text-sm transition ${
                  l.active
                    ? "border-blue-500 bg-blue-50 font-semibold text-blue-700"
                    : "border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-4 py-8 space-y-8">
        {/* ── Hero ── */}
        <section>
          <p className="text-sm font-medium text-blue-600">115年度 · 2026年5月報稅 · 114年所得</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900 leading-snug">
            薪資 vs 執行業務所得<br />
            <span className="text-blue-600">稅負比較計算器</span>
          </h1>
          <p className="mt-3 text-gray-600 leading-relaxed">
            同樣年收入，上班族和接案族繳的稅不一樣。核心差異：
            上班族有<strong>薪資特別扣除額 218,000 元</strong>；
            接案族有<strong>執行業務費用率 20%</strong>（多數接案職類），但需額外負擔二代健保補充保費 2.11%。
            含補充保費的<strong>總稅務負擔</strong>，接案族要到年收約 <strong>230 萬</strong>才更省。
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl bg-blue-50 p-4 text-center">
              <p className="text-xs text-gray-500">上班族特別扣除額</p>
              <p className="text-xl font-bold text-blue-700">218,000</p>
              <p className="text-xs text-gray-400">薪資特別扣除額（固定）</p>
            </div>
            <div className="rounded-2xl bg-green-50 p-4 text-center">
              <p className="text-xs text-gray-500">接案族費用扣除率</p>
              <p className="text-xl font-bold text-green-700">20%</p>
              <p className="text-xs text-gray-400">執行業務費用率（一般）</p>
            </div>
            <div className="rounded-2xl bg-orange-50 p-4 text-center">
              <p className="text-xs text-gray-500">總稅負平衡點（含補充保費）</p>
              <p className="text-xl font-bold text-orange-700">約230萬</p>
              <p className="text-xs text-gray-400">超過此額接案族更省</p>
            </div>
            <div className="rounded-2xl bg-purple-50 p-4 text-center">
              <p className="text-xs text-gray-500">接案補充保費</p>
              <p className="text-xl font-bold text-purple-700">2.11%</p>
              <p className="text-xs text-gray-400">需計入總成本</p>
            </div>
          </div>
        </section>

        <AdUnit />

        {/* ── 互動計算器 ── */}
        <section className="rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">輸入你的年收入，即時比較</h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              年收入（元）
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                inputMode="numeric"
                value={inputVal}
                onChange={(e) => handleInput(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-lg font-semibold focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="例：1200000"
              />
              <span className="text-sm text-gray-500 whitespace-nowrap">
                ≈ 月收{income > 0 ? fmt(Math.round(income / 12)) : 0}
              </span>
            </div>
            <input
              type="range"
              min={300000}
              max={5000000}
              step={50000}
              value={income}
              onChange={(e) => {
                const v = Number(e.target.value);
                setIncome(v);
                setInputVal(String(v));
              }}
              className="mt-3 w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>30萬</span><span>500萬</span>
            </div>
          </div>

          {/* 比較結果卡片 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* 上班族 */}
            <div className={`rounded-2xl p-5 border-2 ${freelancerWins ? "border-gray-200 bg-gray-50" : "border-blue-400 bg-blue-50"}`}>
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold text-gray-800">🏢 上班族（薪資所得）</p>
                {!freelancerWins && (
                  <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">省稅</span>
                )}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">薪資特別扣除額</span>
                  <span className="font-semibold">−{fmt(Math.min(income, SALARY_SPECIAL))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">免稅額 + 標準扣除額</span>
                  <span className="font-semibold">−{fmt(EXEMPTION + STD_DEDUCTION)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">所得淨額</span>
                  <span className="font-semibold">{fmt(salary.netIncome)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <span className="text-gray-600 font-medium">應繳所得稅</span>
                  <span className="text-lg font-bold text-blue-700">{fmt(salary.tax)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>有效稅率</span>
                  <span>{getEffectiveRate(salary.tax, income)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">補充保費</span>
                  <span className="font-semibold text-gray-400">0（薪資免）</span>
                </div>
                <div className="border-t border-blue-200 pt-2 flex justify-between">
                  <span className="text-blue-800 font-bold">總稅務負擔</span>
                  <span className="text-xl font-bold text-blue-800">{fmt(salary.totalCost)}</span>
                </div>
              </div>
            </div>

            {/* 接案族 */}
            <div className={`rounded-2xl p-5 border-2 ${freelancerWins ? "border-green-400 bg-green-50" : "border-gray-200 bg-gray-50"}`}>
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold text-gray-800">💻 接案族（執行業務所得）</p>
                {freelancerWins && (
                  <span className="rounded-full bg-green-600 px-2 py-0.5 text-xs font-bold text-white">省稅</span>
                )}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">費用率扣除（20%）</span>
                  <span className="font-semibold">−{fmt(freelancer.expense)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">免稅額 + 標準扣除額</span>
                  <span className="font-semibold">−{fmt(EXEMPTION + STD_DEDUCTION)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">所得淨額</span>
                  <span className="font-semibold">{fmt(freelancer.netIncome)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <span className="text-gray-600 font-medium">應繳所得稅</span>
                  <span className="text-lg font-bold text-green-700">{fmt(freelancer.tax)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>有效稅率</span>
                  <span>{getEffectiveRate(freelancer.tax, income)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">二代健保補充保費（2.11%）</span>
                  <span className="font-semibold text-orange-600">+{fmt(freelancer.supplement)}</span>
                </div>
                <div className="border-t border-green-200 pt-2 flex justify-between">
                  <span className="text-green-800 font-bold">總稅務負擔</span>
                  <span className="text-xl font-bold text-green-800">{fmt(freelancer.totalCost)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 結論 */}
          <div className={`mt-4 rounded-xl p-4 text-center ${freelancerWins ? "bg-green-100" : "bg-blue-100"}`}>
            {income === 0 ? (
              <p className="font-semibold text-gray-600">請輸入年收入</p>
            ) : Math.abs(diff) < 1000 ? (
              <p className="font-semibold text-gray-700">
                兩種身份稅負幾乎相同（差距不到1,000元）
              </p>
            ) : (
              <p className={`font-semibold ${freelancerWins ? "text-green-800" : "text-blue-800"}`}>
                {freelancerWins ? "接案族" : "上班族"}每年少繳{" "}
                <span className="text-xl font-bold">
                  {fmt(Math.abs(diff))} 元
                </span>
                {" "}（含補充保費比較）
              </p>
            )}
            {income > 0 && income < 1_090_000 && (
              <p className="mt-1 text-xs text-gray-500">
                年收未達109萬損益平衡點，上班族薪資特別扣除額優勢較大
              </p>
            )}
            {income >= 1_090_000 && (
              <p className="mt-1 text-xs text-gray-500">
                年收超過109萬，接案費用率20%扣除額超過薪資特別扣除額218,000元
              </p>
            )}
          </div>
        </section>

        {/* ── 各年收入對照表 ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-1">各年收入稅負比較表</h2>
          <p className="text-sm text-gray-500 mb-4">
            單身、標準扣除額、接案費用率20%。接案欄含所得稅 + 二代健保補充保費。
          </p>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">年收入</th>
                  <th className="px-4 py-3 text-right font-semibold text-blue-700">上班族稅額</th>
                  <th className="px-4 py-3 text-right font-semibold text-green-700">接案族總稅負</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">差額（接案省）</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">誰更省</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_INCOMES.map((inc, i) => {
                  const s = calcSalary(inc);
                  const f = calcFreelancer(inc);
                  const d = s.totalCost - f.totalCost;
                  const isBreakeven = inc === 2_300_000;
                  return (
                    <tr
                      key={inc}
                      className={`border-t border-gray-100 ${isBreakeven ? "bg-yellow-50" : i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                    >
                      <td className="px-4 py-3 font-semibold text-gray-900">
                        {`${(inc / 10000).toFixed(0)}萬`}
                        {isBreakeven && (
                          <span className="ml-2 rounded-full bg-yellow-400 px-1.5 py-0.5 text-xs font-bold text-yellow-900">
                            ≈總稅負平衡點
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right text-blue-700 font-semibold">
                        {fmt(s.tax)}
                      </td>
                      <td className="px-4 py-3 text-right text-green-700 font-semibold">
                        {fmt(f.totalCost)}
                        <span className="ml-1 text-xs text-gray-400">
                          （稅{fmt(f.tax)}+健保{fmt(f.supplement)}）
                        </span>
                      </td>
                      <td className={`px-4 py-3 text-right font-bold ${d > 0 ? "text-green-600" : d < 0 ? "text-red-500" : "text-gray-400"}`}>
                        {d > 0 ? `省 ${fmt(d)}` : d < 0 ? `多 ${fmt(-d)}` : "相同"}
                      </td>
                      <td className="px-4 py-3 text-right text-sm">
                        {d > 500 ? (
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-700 font-medium">接案省</span>
                        ) : d < -500 ? (
                          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700 font-medium">上班省</span>
                        ) : (
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-500">差不多</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-gray-400">
            ＊接案族總稅負 = 所得稅 + 二代健保補充保費（2.11%）。上班族薪資所得補充保費由雇主負擔，個人無需另繳。
          </p>
        </section>

        {/* ── 損益平衡分析 ── */}
        <section className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            兩個損益平衡點
          </h2>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <p className="font-bold text-gray-800">① 所得稅平衡點：109萬</p>
              <p className="mt-1 text-gray-600">
                費用率扣除額等於薪資特別扣除額時，兩者所得稅相同：
              </p>
              <div className="mt-2 rounded-xl bg-white p-3 font-mono text-xs border border-yellow-200">
                <p>年收入 × 20% = 218,000（薪資特別扣除額）</p>
                <p>年收入 = 218,000 ÷ 0.20 = <strong>1,090,000（109萬）</strong></p>
              </div>
            </div>
            <div>
              <p className="font-bold text-gray-800">② 總稅務負擔平衡點：約230萬</p>
              <p className="mt-1 text-gray-600">
                接案族還需負擔二代健保補充保費（2.11%），這筆費用隨收入等比增加，
                使得「接案稅負更低」的實際門檻高得多。
                一般接案族（費用率20%）要年收約 <strong>230萬</strong>，
                總稅務負擔才開始低於同等年收的上班族。
              </p>
            </div>
            <p className="text-gray-500 text-xs border-t border-yellow-200 pt-3">
              ＊上表「接案族總稅負」已含補充保費，可直接對照各收入的實際差額。
              費用率越高的職類（律師30%、建築師35%、醫師40%），總稅負平衡點更低。
            </p>
          </div>
        </section>

        <AdUnit />

        {/* ── 費用率一覽 ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">各職類費用率與損益平衡點</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">職類</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">費用率</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">損益平衡點（年收）</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">適用範例</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: "一般接案", rate: 0.20, examples: "設計師、工程師、顧問、翻譯、文案、講師（每次＞5,000）" },
                  { type: "律師、會計師、記帳士", rate: 0.30, examples: "法律顧問、稅務申報、地政士、記帳士" },
                  { type: "建築師、技師", rate: 0.35, examples: "建築師事務所、結構技師、土木技師" },
                  { type: "醫師（診所）", rate: 0.40, examples: "診所醫師、牙科醫師" },
                ].map((r, i) => {
                  const breakeven = Math.round(SALARY_SPECIAL / r.rate);
                  return (
                    <tr key={r.type} className={`border-t border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                      <td className="px-4 py-3 font-semibold text-gray-900">{r.type}</td>
                      <td className="px-4 py-3 text-right font-bold text-green-700">{(r.rate * 100).toFixed(0)}%</td>
                      <td className="px-4 py-3 text-right font-semibold text-orange-700">
                        {fmt(breakeven)} 元<span className="text-xs text-gray-400 ml-1">（約{Math.round(breakeven / 10000)}萬）</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{r.examples}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-gray-400">
            ＊損益平衡點 = 薪資特別扣除額218,000 ÷ 費用率。超過此年收，接案族稅負低於上班族。
          </p>
        </section>

        {/* ── 常見迷思 ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">三個常見迷思</h2>
          <div className="space-y-4">
            {[
              {
                myth: "接案收入要繳比較多稅",
                fact: "年收超過109萬後，接案族因費用率20%的扣除額，反而比同等收入上班族少繳稅。",
                color: "red",
              },
              {
                myth: "費用率20%要有發票才能扣",
                fact: "錯。費用率是財政部「擬制費用」，不需要任何憑證，直接從收入扣除20%就是應稅所得。",
                color: "orange",
              },
              {
                myth: "接案只需要報所得稅",
                fact: "接案收入（執行業務所得）每次超過2萬元，付款方會代扣2.11%的二代健保補充保費。計算實際稅務負擔必須加計這筆費用。",
                color: "purple",
              },
            ].map((item) => (
              <div key={item.myth} className={`rounded-2xl p-4 border ${
                item.color === "red" ? "border-red-100 bg-red-50" :
                item.color === "orange" ? "border-orange-100 bg-orange-50" :
                "border-purple-100 bg-purple-50"
              }`}>
                <p className={`text-sm font-bold ${
                  item.color === "red" ? "text-red-700" :
                  item.color === "orange" ? "text-orange-700" :
                  "text-purple-700"
                }`}>
                  ✕ 迷思：{item.myth}
                </p>
                <p className="mt-1 text-sm text-gray-700">
                  <strong>✓ 事實：</strong>{item.fact}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 深入連結 ── */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">進一步試算工具</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              { href: "/freelancer-tax-guide", label: "接案報稅完整指南", desc: "費用率說明、各收入稅額試算、節稅策略" },
              { href: "/supplement-premium", label: "二代健保補充保費", desc: "接案族補充保費計算、六大類說明" },
              { href: "/tax-calculator", label: "綜合所得稅計算器", desc: "完整申報試算，含扶養、房貸利息扣除" },
              { href: "/income-tax-brackets", label: "所得稅級距說明", desc: "五級累進稅率表，115年度" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-start gap-2 rounded-xl border border-gray-100 p-3 hover:border-blue-200 hover:bg-blue-50 transition"
              >
                <span className="text-blue-600 font-semibold text-sm">{link.label}</span>
                <span className="text-xs text-gray-400 ml-auto">{link.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        <TaxAffiliateCTA />

        {/* ── FAQ ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">常見問題</h2>
          <div className="space-y-4">
            {[
              {
                q: "薪資所得和執行業務所得的稅有什麼差別？",
                a: "薪資所得可扣除「薪資特別扣除額」218,000元（115年度，固定金額）；執行業務所得依職類適用費用率，一般接案為20%，等於直接扣除年收入的20%。但接案族還需負擔薪資族沒有的二代健保補充保費2.11%，需要年收約230萬，接案族的總稅務負擔才低於上班族。",
              },
              {
                q: "年收多少接案才比上班省稅？",
                a: "有兩個角度：①「所得稅」單獨比較，平衡點在109萬；②含二代健保補充保費（2.11%）的總稅務負擔，實際平衡點約在230萬。本頁上表「接案族總稅負」已含補充保費，可直接看各收入的實際差額。",
              },
              {
                q: "接案收入還要繳二代健保補充保費嗎？",
                a: "是的。接案收入每次超過2萬元，付款方代扣2.11%補充保費（115年度），這是上班族薪資所得沒有的成本。本頁比較已將此費用計入「接案族總稅負」。",
              },
              {
                q: "我可以同時有薪資所得和執行業務所得嗎？",
                a: "可以。兼職接案的上班族，薪資所得和執行業務所得分別計算後合併申報。薪資特別扣除額218,000元可全額扣除，執行業務所得另依費用率計算。但要特別注意接案收入的二代健保補充保費。",
              },
            ].map((item) => (
              <div key={item.q} className="rounded-2xl border border-gray-200 bg-white p-4">
                <p className="font-bold text-gray-900 text-sm">{item.q}</p>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="pt-4 text-center text-xs text-gray-400">
          資料來源：財政部 115年度綜合所得稅計算規定。本工具試算結果供參考，實際稅額以財政部報稅系統為準。
        </footer>
      </main>
    </div>
  );
}
