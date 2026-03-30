"use client";

import { useState, useMemo } from "react";
import { calculateMortgage } from "@/lib/calc/mortgage";
import type { MortgageInput } from "@/lib/calc/mortgage";
import { formatNTD, formatNumber } from "@/lib/format";
import { EmailCTA } from "@/components/email-cta";
import { AdUnit } from "@/components/ad-unit";
import { MortgageAffiliateCTA } from "@/components/affiliate-cta";
import Link from "next/link";

const PRESETS = [
  { label: "新青安一段式", rate: 1.775, years: 40, grace: 5 },
  { label: "新青安二段式", rate: 1.69, years: 40, grace: 5 },
  { label: "首購族", rate: 2.35, years: 30, grace: 2 },
  { label: "一般房貸", rate: 2.6, years: 30, grace: 0 },
];

const BANK_RATES = [
  { bank: "新青安（一段式）", rate: "1.775%", note: "至 2026/7 止" },
  { bank: "新青安（二段式）", rate: "1.69%→1.99%", note: "前2年→第3年起" },
  { bank: "台灣銀行", rate: "2.345%", note: "首購優惠" },
  { bank: "中國信託", rate: "2.30%", note: "轉貸/增貸" },
  { bank: "星展銀行", rate: "2.45%", note: "最長40年" },
  { bank: "玉山銀行", rate: "2.53%", note: "LTV 80%" },
  { bank: "台北富邦", rate: "2.65%", note: "" },
  { bank: "國泰世華", rate: "2.66%", note: "專業人士優惠" },
  { bank: "台新銀行", rate: "2.68%", note: "寬限期2年" },
];

export default function MortgagePage() {
  const [principal, setPrincipal] = useState(800);
  const [annualRate, setAnnualRate] = useState(2.1);
  const [years, setYears] = useState(30);
  const [gracePeriodYears, setGracePeriodYears] = useState(0);
  const [method, setMethod] = useState<MortgageInput["method"]>("equal-payment");

  const result = useMemo(
    () => calculateMortgage({ principal: principal * 10000, annualRate, years, gracePeriodYears, method }),
    [principal, annualRate, years, gracePeriodYears, method]
  );

  const applyPreset = (preset: typeof PRESETS[number]) => {
    setAnnualRate(preset.rate);
    setYears(preset.years);
    setGracePeriodYears(preset.grace);
  };

  return (
    <div className="min-h-screen pb-10">
      {/* Tool Switch */}
      <div className="flex gap-2 overflow-x-auto bg-white px-4 pt-4 pb-2 text-sm">
        <Link href="/" className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition">
          財務自由
        </Link>
        <Link href="/tax-calculator" className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition">
          報稅計算
        </Link>
        <span className="whitespace-nowrap rounded-full bg-emerald-600 px-3 py-1 font-medium text-white">
          房貸計算
        </span>
        <Link href="/overtime-calculator" className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition">
          加班費
        </Link>
        <Link href="/severance-calculator" className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition">
          資遣費
        </Link>
        <Link href="/salary-calculator" className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition">
          月薪試算
        </Link>
        <Link href="/bonus-calculator" className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition">
          年終獎金
        </Link>
        <Link href="/pension-calculator" className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition">
          勞退計算
        </Link>
        <Link href="/basic-living-deduction" className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition">
          免稅天花板
        </Link>
        <Link href="/labor-insurance-rates" className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition">
          勞健保費率
        </Link>
        <Link href="/income-tax-brackets" className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition">
          所得稅級距
        </Link>
        <Link href="/dependent-deduction" className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition">
          扶養節稅
        </Link>
        <Link href="/freelancer-tax-guide" className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition">
          接案報稅
        </Link>
        <Link href="/supplement-premium" className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition">
          二代健保
        </Link>
        <Link href="/salary-vs-freelancer" className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition">
          薪資vs接案
        </Link>
        <Link
          href="/tax-filing-guide"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
        >
          報稅攻略
        </Link>
        <Link
          href="/dividend-tax"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition"
        >
          股利申報
        </Link>
        <Link
          href="/mortgage-full-cost"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition"
        >
          買房費用
        </Link>
        <Link
          href="/buy-vs-rent"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition"
        >
          買vs租
        </Link>
        <Link
          href="/real-estate-tax"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition"
        >
          房地合一稅
        </Link>
        <Link
          href="/inheritance-tax"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition"
        >
          遺產稅
        </Link>
        <Link
          href="/gift-tax"
          className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition"
        >
          贈與稅
        </Link>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 px-4 pb-12 pt-8 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/20" />
          <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10" />
        </div>
        <div className="relative">
          <Link href="/" className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur-sm transition hover:bg-white/25">
            ← 回首頁
          </Link>
          <h1 className="mt-4 text-2xl font-bold tracking-tight">房貸計算器</h1>
          <p className="mt-2 text-sm text-emerald-100">
            月付金試算 · 新青安 · 等額本息vs本金比較
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["新青安利率", "寬限期試算", "兩種還款比較"].map(tag => (
              <span key={tag} className="rounded-full bg-white/15 px-2.5 py-1 text-xs backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-5 px-4">
        {/* Presets */}
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
          <h2 className="text-sm font-semibold text-gray-700">快速選擇方案</h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => applyPreset(p)}
                className="rounded-xl border border-gray-200 px-3 py-2.5 text-left transition hover:border-emerald-300 hover:bg-emerald-50"
              >
                <div className="text-sm font-medium text-gray-800">{p.label}</div>
                <div className="mt-0.5 text-xs text-gray-500">
                  {p.rate}% · {p.years}年{p.grace > 0 ? ` · 寬限${p.grace}年` : ""}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
          <h2 className="text-sm font-semibold text-gray-700">貸款條件</h2>
          <div className="mt-4 space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">貸款金額</label>
                <span className="text-lg font-bold text-emerald-600">{formatNumber(principal)} 萬</span>
              </div>
              <input
                type="range" min={100} max={5000} step={50} value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-emerald-600"
              />
              <div className="mt-1 flex justify-between text-xs text-gray-400">
                <span>100萬</span><span>5,000萬</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">年利率</label>
                <span className="text-lg font-bold text-emerald-600">{annualRate}%</span>
              </div>
              <input
                type="range" min={1} max={5} step={0.025} value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-emerald-600"
              />
              <div className="mt-1 flex justify-between text-xs text-gray-400">
                <span>1%</span><span>5%</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">貸款年限</label>
                <span className="text-lg font-bold text-emerald-600">{years} 年</span>
              </div>
              <input
                type="range" min={5} max={40} step={1} value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-emerald-600"
              />
              <div className="mt-1 flex justify-between text-xs text-gray-400">
                <span>5年</span><span>40年</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">寬限期</label>
                <span className="text-lg font-bold text-emerald-600">{gracePeriodYears} 年</span>
              </div>
              <input
                type="range" min={0} max={5} step={1} value={gracePeriodYears}
                onChange={(e) => setGracePeriodYears(Number(e.target.value))}
                className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-emerald-600"
              />
              <div className="mt-1 flex justify-between text-xs text-gray-400">
                <span>0年</span><span>5年</span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">還款方式</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMethod("equal-payment")}
                  className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                    method === "equal-payment"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  等額本息
                  <div className="mt-0.5 text-xs font-normal text-gray-400">每月固定</div>
                </button>
                <button
                  onClick={() => setMethod("equal-principal")}
                  className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                    method === "equal-principal"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  等額本金
                  <div className="mt-0.5 text-xs font-normal text-gray-400">利息遞減</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-5 ring-1 ring-emerald-200/50">
          <h2 className="text-sm font-semibold text-gray-700">試算結果</h2>

          {gracePeriodYears > 0 && (
            <div className="mt-3 rounded-xl bg-amber-50 p-3">
              <div className="text-xs text-amber-700">寬限期每月只繳利息</div>
              <div className="mt-1 text-xl font-bold text-amber-600">{formatNTD(result.graceMonthly)}<span className="text-sm font-normal">/月</span></div>
              <div className="mt-0.5 text-xs text-amber-500">前 {gracePeriodYears} 年</div>
            </div>
          )}

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white p-3">
              <div className="text-xs text-gray-500">
                {method === "equal-payment" ? "每月還款" : "第一期還款"}
              </div>
              <div className="mt-1 text-xl font-bold text-emerald-600">{formatNTD(result.monthlyPayment)}</div>
            </div>
            {method === "equal-principal" && (
              <div className="rounded-xl bg-white p-3">
                <div className="text-xs text-gray-500">最後一期</div>
                <div className="mt-1 text-xl font-bold text-emerald-600">{formatNTD(result.lastMonthPayment)}</div>
              </div>
            )}
            <div className="rounded-xl bg-white p-3">
              <div className="text-xs text-gray-500">總利息</div>
              <div className="mt-1 text-xl font-bold text-red-500">{formatNTD(result.totalInterest)}</div>
            </div>
            <div className="rounded-xl bg-white p-3">
              <div className="text-xs text-gray-500">總還款</div>
              <div className="mt-1 text-xl font-bold text-gray-800">{formatNTD(result.totalPayment)}</div>
            </div>
          </div>

          {principal > 0 && (
            <div className="mt-3 rounded-xl bg-white p-3">
              <div className="text-xs text-gray-500">利息佔比</div>
              <div className="mt-1 flex items-center gap-2">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-red-400 transition-all"
                    style={{ width: `${(result.totalInterest / result.totalPayment * 100).toFixed(1)}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-red-500">
                  {(result.totalInterest / result.totalPayment * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          )}
        </div>

        <AdUnit className="my-2" />

        {/* Yearly Breakdown */}
        {result.yearlyBreakdown.length > 0 && (
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
            <h2 className="text-sm font-semibold text-gray-700">每年還款明細</h2>
            <div className="mt-3 max-h-64 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-white">
                  <tr className="border-b text-left text-xs text-gray-500">
                    <th className="pb-2 pr-2">年</th>
                    <th className="pb-2 pr-2 text-right">還本金</th>
                    <th className="pb-2 pr-2 text-right">付利息</th>
                    <th className="pb-2 text-right">剩餘</th>
                  </tr>
                </thead>
                <tbody>
                  {result.yearlyBreakdown.map((row) => (
                    <tr key={row.year} className="border-b border-gray-50">
                      <td className="py-1.5 pr-2 text-gray-600">{row.year}</td>
                      <td className="py-1.5 pr-2 text-right font-medium text-emerald-600">
                        {formatNTD(row.principal)}
                      </td>
                      <td className="py-1.5 pr-2 text-right text-red-500">
                        {formatNTD(row.interest)}
                      </td>
                      <td className="py-1.5 text-right text-gray-500">
                        {formatNTD(row.remaining)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bank Rates Reference */}
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
          <h2 className="text-sm font-semibold text-gray-700">2026 各銀行房貸利率參考</h2>
          <p className="mt-1 text-xs text-gray-400">利率僅供參考，以各銀行實際核貸為準</p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-gray-500">
                  <th className="pb-2 pr-3">銀行</th>
                  <th className="pb-2 pr-3">利率</th>
                  <th className="pb-2">備註</th>
                </tr>
              </thead>
              <tbody>
                {BANK_RATES.map((b) => (
                  <tr key={b.bank} className="border-b border-gray-50">
                    <td className="py-1.5 pr-3 font-medium text-gray-700">{b.bank}</td>
                    <td className="py-1.5 pr-3 font-semibold text-emerald-600">{b.rate}</td>
                    <td className="py-1.5 text-xs text-gray-400">{b.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Affiliate CTA — direct monetization */}
        <MortgageAffiliateCTA />

        <AdUnit className="my-2" />

        <EmailCTA />

        {/* Footer */}
        <div className="rounded-2xl bg-gray-100 p-5 text-center">
          <p className="text-xs text-gray-500">
            本工具僅供房貸規劃參考，<strong>不構成投資或貸款建議</strong>。實際利率及核貸條件以銀行為準。
          </p>
          <div className="mt-3 flex justify-center gap-4">
            <Link href="/" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
              財務自由計算器
            </Link>
            <Link href="/tax-calculator" className="text-sm font-medium text-blue-600 hover:text-blue-700">
              報稅計算器
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
