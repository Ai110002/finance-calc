"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { MortgageAffiliateCTA } from "@/components/affiliate-cta";

// ── 房地合一稅 2.0（2021/07/01 起適用）規則 ───────────────────────────────
// 持有期間        稅率
// ≤2年            45%
// >2年，≤5年      35%
// >5年，≤10年     20%
// >10年           15%
// 自用住宅優惠：設籍滿6年 + 近6年未適用過此優惠 → 稅率10%
//   並且：課稅所得超過400萬的部分才課稅（前400萬免稅）
//
// 課稅所得 = 成交價 − 取得成本 − 土地漲價稅額 − 費用
// 費用選項：有憑證（仲介費最高4%+代書+修繕）或 無憑證3%（成交價×3%）
// ─────────────────────────────────────────────────────────────────────────

function getTaxRate(holdYears: number, isSelfUse: boolean): number {
  if (isSelfUse) return 0.10;
  if (holdYears <= 2) return 0.45;
  if (holdYears <= 5) return 0.35;
  if (holdYears <= 10) return 0.20;
  return 0.15;
}

interface CalcResult {
  salePrice: number;
  cost: number;
  landTaxIncrease: number;
  expenses: number;
  taxableIncome: number;
  effectiveTaxableIncome: number;
  taxRate: number;
  taxAmount: number;
  netProfit: number;
  netProfitAfterTax: number;
  holdLabel: string;
}

function calcTax(params: {
  salePriceWan: number;
  costPriceWan: number;
  holdYears: number;
  landTaxIncreaseWan: number;
  expenseMode: "voucher" | "flat";
  voucherExpenseWan: number;
  isSelfUse: boolean;
}): CalcResult {
  const {
    salePriceWan,
    costPriceWan,
    holdYears,
    landTaxIncreaseWan,
    expenseMode,
    voucherExpenseWan,
    isSelfUse,
  } = params;

  const salePrice = salePriceWan * 10_000;
  const cost = costPriceWan * 10_000;
  const landTaxIncrease = landTaxIncreaseWan * 10_000;

  // 費用：有憑證用輸入值，無憑證用成交價×3%
  const expenses =
    expenseMode === "voucher"
      ? voucherExpenseWan * 10_000
      : salePrice * 0.03;

  const rawIncome = salePrice - cost - landTaxIncrease - expenses;
  const taxableIncome = Math.max(rawIncome, 0);

  // 自用住宅：超過400萬才課稅
  const SELF_USE_EXEMPT = 4_000_000;
  const effectiveTaxableIncome =
    isSelfUse ? Math.max(taxableIncome - SELF_USE_EXEMPT, 0) : taxableIncome;

  const taxRate = getTaxRate(holdYears, isSelfUse);
  const taxAmount = effectiveTaxableIncome * taxRate;
  const netProfit = salePrice - cost;
  const netProfitAfterTax = netProfit - taxAmount;

  // 持有期間標籤
  let holdLabel = "";
  if (isSelfUse) {
    holdLabel = "自用住宅優惠（設籍≥6年）";
  } else if (holdYears <= 2) {
    holdLabel = `持有${holdYears}年以內`;
  } else if (holdYears <= 5) {
    holdLabel = `持有${holdYears}年（超過2年未逾5年）`;
  } else if (holdYears <= 10) {
    holdLabel = `持有${holdYears}年（超過5年未逾10年）`;
  } else {
    holdLabel = `持有${holdYears}年（超過10年）`;
  }

  return {
    salePrice,
    cost,
    landTaxIncrease,
    expenses,
    taxableIncome,
    effectiveTaxableIncome,
    taxRate,
    taxAmount,
    netProfit,
    netProfitAfterTax,
    holdLabel,
  };
}

function fmt(n: number): string {
  return `NT$${Math.round(n).toLocaleString("zh-TW")}`;
}

function fmtWan(n: number): string {
  const wan = n / 10_000;
  return `${wan.toFixed(0)}萬`;
}

const NAV_LINKS = [
  { href: "/", label: "財務自由" },
  { href: "/tax-calculator", label: "報稅計算" },
  { href: "/tax-checklist-2026", label: "報稅懶人包" },
  { href: "/tax-mistakes-2026", label: "報稅常見錯誤" },
  { href: "/mortgage", label: "房貸計算" },
  { href: "/mortgage-full-cost", label: "買房費用" },
  { href: "/buy-vs-rent", label: "買vs租" },
  { href: "/real-estate-tax", label: "房地合一稅", active: true },
  { href: "/house-tax", label: "房屋稅" },
  { href: "/labor-retirement", label: "勞退新制" },
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
];

// 持有期間 vs 稅率對照表
const TAX_RATE_TABLE = [
  { label: "≤2年", rate: "45%", note: "短期炒房重稅" },
  { label: "2–5年", rate: "35%", note: "" },
  { label: "5–10年", rate: "20%", note: "" },
  { label: ">10年", rate: "15%", note: "長期持有優惠" },
  { label: "自用住宅", rate: "10%", note: "前400萬免稅" },
];

export default function RealEstateTaxPage() {
  const [salePriceWan, setSalePriceWan] = useState(1500);
  const [costPriceWan, setCostPriceWan] = useState(1000);
  const [holdYears, setHoldYears] = useState(7);
  const [landTaxIncreaseWan, setLandTaxIncreaseWan] = useState(0);
  const [expenseMode, setExpenseMode] = useState<"voucher" | "flat">("flat");
  const [voucherExpenseWan, setVoucherExpenseWan] = useState(0);
  const [isSelfUse, setIsSelfUse] = useState(false);

  const result = useMemo(
    () =>
      calcTax({
        salePriceWan,
        costPriceWan,
        holdYears,
        landTaxIncreaseWan,
        expenseMode,
        voucherExpenseWan,
        isSelfUse,
      }),
    [
      salePriceWan,
      costPriceWan,
      holdYears,
      landTaxIncreaseWan,
      expenseMode,
      voucherExpenseWan,
      isSelfUse,
    ]
  );

  return (
    <div className="space-y-5 px-4 pt-8 pb-8 max-w-lg mx-auto">
      {/* 工具切換 nav */}
      <div className="flex gap-2 overflow-x-auto text-sm pb-1">
        {NAV_LINKS.map(({ href, label, active }) =>
          active ? (
            <div
              key={href}
              className="whitespace-nowrap rounded-full bg-emerald-600 px-3 py-1.5 font-semibold text-white shadow-sm"
            >
              {label}
            </div>
          ) : (
            <Link
              key={href}
              href={href}
              className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1.5 font-medium text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition"
            >
              {label}
            </Link>
          )
        )}
      </div>

      {/* 標題 */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">房地合一稅計算機</h1>
        <p className="mt-1 text-sm text-gray-500">
          賣房前必算｜2.0版（2021/07起）｜個人適用
        </p>
      </div>

      {/* 提示框 */}
      <div className="rounded-xl bg-amber-50 px-4 py-3 text-xs text-amber-800 border border-amber-200">
        ⚠️ <strong>房地合一稅 2.0（2021/07/01起）：</strong>持有 2 年內賣房課
        45%，長期持有（&gt;10年）降至 15%，自用住宅設籍 6 年以上僅課
        10%（前400萬免稅）。本計算器為估算工具，正式申報請諮詢地政士。
      </div>

      {/* 輸入區 */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
        <h2 className="font-semibold text-gray-800">交易資料</h2>

        {/* 成交價 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            成交價格（萬元）
          </label>
          <p className="mb-1 text-xs text-gray-400">
            不動產買賣契約上的成交總價
          </p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="decimal"
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              value={salePriceWan || ""}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                setSalePriceWan(isNaN(v) ? 0 : v);
              }}
            />
            <span className="whitespace-nowrap text-sm text-gray-500">萬元</span>
          </div>
        </div>

        {/* 取得成本 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            原始取得成本（萬元）
          </label>
          <p className="mb-1 text-xs text-gray-400">
            當初買入的總價（包含購入時的仲介費、代書費等費用）
          </p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="decimal"
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              value={costPriceWan || ""}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                setCostPriceWan(isNaN(v) ? 0 : v);
              }}
            />
            <span className="whitespace-nowrap text-sm text-gray-500">萬元</span>
          </div>
        </div>

        {/* 持有年數 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            持有年數
          </label>
          <p className="mb-1 text-xs text-gray-400">
            從登記取得產權到完成交易移轉的年數，直接影響稅率
          </p>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 5, 7, 10, 12, 15].map((y) => (
              <button
                key={y}
                onClick={() => setHoldYears(y)}
                className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                  holdYears === y
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 text-gray-600 hover:border-emerald-300"
                }`}
              >
                {y}年
              </button>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="number"
              inputMode="decimal"
              className="w-24 rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              value={holdYears || ""}
              onChange={(e) => {
                const v = parseInt(e.target.value);
                setHoldYears(isNaN(v) || v < 0 ? 0 : v);
              }}
            />
            <span className="text-sm text-gray-500">年（自填）</span>
          </div>
        </div>

        {/* 自用住宅 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            是否符合自用住宅優惠？
          </label>
          <p className="mb-1 text-xs text-gray-400">
            本人/配偶/未成年子女設籍，持有且住滿 6 年，且交易前 6 年未曾適用過此優惠
          </p>
          <div className="flex gap-3">
            {[
              { val: false, label: "否（一般稅率）" },
              { val: true, label: "是（自用10%）" },
            ].map(({ val, label }) => (
              <button
                key={String(val)}
                onClick={() => setIsSelfUse(val)}
                className={`flex-1 rounded-xl border py-2.5 text-sm font-medium transition ${
                  isSelfUse === val
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 text-gray-600 hover:border-emerald-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 費用認列 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            費用認列方式
          </label>
          <div className="flex gap-3 mb-3">
            {[
              { val: "flat" as const, label: "無憑證（成交價×3%）" },
              { val: "voucher" as const, label: "有憑證（自填金額）" },
            ].map(({ val, label }) => (
              <button
                key={val}
                onClick={() => setExpenseMode(val)}
                className={`flex-1 rounded-xl border px-2 py-2.5 text-sm font-medium transition ${
                  expenseMode === val
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 text-gray-600 hover:border-emerald-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {expenseMode === "voucher" && (
            <div>
              <p className="mb-1 text-xs text-gray-400">
                含仲介費（最高成交價4%）、代書費、裝修改良費等有憑證費用
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  inputMode="decimal"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  value={voucherExpenseWan || ""}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setVoucherExpenseWan(isNaN(v) ? 0 : v);
                  }}
                />
                <span className="whitespace-nowrap text-sm text-gray-500">萬元</span>
              </div>
            </div>
          )}
        </div>

        {/* 土地漲價稅額（選填） */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            土地漲價稅額（萬元）<span className="text-gray-400 font-normal">選填</span>
          </label>
          <p className="mb-1 text-xs text-gray-400">
            已繳的土地增值稅可從課稅所得中扣除。若尚未申報，先填 0 估算
          </p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="decimal"
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              value={landTaxIncreaseWan || ""}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                setLandTaxIncreaseWan(isNaN(v) ? 0 : v);
              }}
            />
            <span className="whitespace-nowrap text-sm text-gray-500">萬元</span>
          </div>
        </div>
      </div>

      <AdUnit />

      {/* 計算結果 */}
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5 space-y-4">
        <h2 className="font-bold text-gray-800 text-lg">計算結果</h2>

        {/* 稅率區塊 */}
        <div className="rounded-xl bg-white p-4 border border-emerald-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{result.holdLabel}</p>
              <p className="mt-0.5 text-xs text-gray-400">適用稅率</p>
            </div>
            <div
              className={`text-3xl font-bold ${
                result.taxRate >= 0.35
                  ? "text-red-600"
                  : result.taxRate >= 0.20
                  ? "text-amber-600"
                  : "text-emerald-600"
              }`}
            >
              {(result.taxRate * 100).toFixed(0)}%
            </div>
          </div>
        </div>

        {/* 計算明細 */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">成交價格</span>
            <span className="font-medium">{fmtWan(result.salePrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">減：取得成本</span>
            <span className="font-medium text-red-500">−{fmtWan(result.cost)}</span>
          </div>
          {result.landTaxIncrease > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">減：土地漲價稅額</span>
              <span className="font-medium text-red-500">
                −{fmtWan(result.landTaxIncrease)}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">
              減：費用（
              {expenseMode === "flat"
                ? "成交價×3%"
                : `有憑證`}
              ）
            </span>
            <span className="font-medium text-red-500">−{fmtWan(result.expenses)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
            <span className="text-gray-700">課稅所得</span>
            <span>{fmtWan(result.taxableIncome)}</span>
          </div>
          {isSelfUse && result.taxableIncome > 0 && (
            <div className="flex justify-between text-emerald-700">
              <span>自用住宅免稅額</span>
              <span>
                −{fmtWan(Math.min(result.taxableIncome, 4_000_000))}
              </span>
            </div>
          )}
          {isSelfUse && (
            <div className="flex justify-between font-semibold">
              <span className="text-gray-700">實際課稅所得</span>
              <span>{fmtWan(result.effectiveTaxableIncome)}</span>
            </div>
          )}
        </div>

        {/* 主要數字 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-red-50 border border-red-100 p-3 text-center">
            <p className="text-xs text-gray-500">應繳房地合一稅</p>
            <p className="mt-1 text-xl font-bold text-red-600">
              {fmtWan(result.taxAmount)}
            </p>
            <p className="mt-0.5 text-xs text-gray-400">{fmt(result.taxAmount)}</p>
          </div>
          <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-3 text-center">
            <p className="text-xs text-gray-500">稅後實拿獲利</p>
            <p
              className={`mt-1 text-xl font-bold ${
                result.netProfitAfterTax >= 0 ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {fmtWan(result.netProfitAfterTax)}
            </p>
            <p className="mt-0.5 text-xs text-gray-400">
              {fmt(result.netProfitAfterTax)}
            </p>
          </div>
        </div>

        {/* 有效稅負率 */}
        {result.netProfit > 0 && (
          <div className="rounded-xl bg-white border border-gray-100 px-4 py-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">帳面獲利（賣價−成本）</span>
              <span className="font-medium">{fmtWan(result.netProfit)}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-500">有效稅負率</span>
              <span className="font-medium text-amber-700">
                {((result.taxAmount / result.netProfit) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 持有期間 vs 稅率對照 */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 font-bold text-gray-800">持有期間 vs 稅率對照表</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 border-b border-gray-100">
                <th className="pb-2 text-left font-medium">持有期間</th>
                <th className="pb-2 text-right font-medium">稅率</th>
                <th className="pb-2 text-right font-medium">備注</th>
              </tr>
            </thead>
            <tbody>
              {TAX_RATE_TABLE.map(({ label, rate, note }) => (
                <tr
                  key={label}
                  className={`border-b border-gray-50 ${
                    label === (isSelfUse ? "自用住宅" :
                      holdYears <= 2 ? "≤2年" :
                      holdYears <= 5 ? "2–5年" :
                      holdYears <= 10 ? "5–10年" : ">10年")
                      ? "bg-emerald-50 font-semibold"
                      : ""
                  }`}
                >
                  <td className="py-2.5 text-gray-800">{label}</td>
                  <td className="py-2.5 text-right font-bold text-amber-700">{rate}</td>
                  <td className="py-2.5 text-right text-gray-400 text-xs">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 省稅策略 */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
        <h2 className="font-bold text-gray-800">合法節稅 4 大策略</h2>

        <div className="space-y-3 text-sm text-gray-700">
          <div className="rounded-xl bg-gray-50 p-3">
            <p className="font-semibold text-gray-800">1. 拉長持有年數（最直接）</p>
            <p className="mt-1 text-xs text-gray-500">
              持有 2 年以上稅率從 45% 降至 35%。超過 10 年僅 15%。以獲利 500 萬為例，
              持有 1.5 年繳 225 萬；持有 10 年只繳 75 萬，差 150 萬。
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-3">
            <p className="font-semibold text-gray-800">2. 主張自用住宅優惠（設籍滿6年）</p>
            <p className="mt-1 text-xs text-gray-500">
              若符合條件，稅率降至 10% 且前 400 萬免稅。獲利 500 萬 → 僅課 100 萬 × 10% = 10 萬，
              省下最多稅額。
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-3">
            <p className="font-semibold text-gray-800">3. 保留裝修憑證</p>
            <p className="mt-1 text-xs text-gray-500">
              有憑證的裝修費用可列入費用扣除，直接減少課稅所得。裝修 100 萬且稅率 35% → 省稅 35 萬。
              記得保留發票、收據。
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-3">
            <p className="font-semibold text-gray-800">4. 確認土地增值稅可扣除額</p>
            <p className="mt-1 text-xs text-gray-500">
              已繳的土地增值稅（地增稅）可從房地合一稅課稅所得中扣除。
              向地政士索取地增稅完稅證明備查。
            </p>
          </div>
        </div>
      </div>

      {/* 情境試算 */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 font-bold text-gray-800">情境比較：同一筆房子賣的時機不同</h2>
        <p className="mb-3 text-xs text-gray-500">
          假設：成交 1500 萬、買入 1000 萬、費用 45 萬（3%）、無土地增值稅
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 border-b border-gray-100">
                <th className="pb-2 text-left font-medium">賣出時機</th>
                <th className="pb-2 text-right font-medium">稅率</th>
                <th className="pb-2 text-right font-medium">稅額</th>
                <th className="pb-2 text-right font-medium">稅後獲利</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "持有1年", years: 1, selfUse: false },
                { label: "持有3年", years: 3, selfUse: false },
                { label: "持有7年", years: 7, selfUse: false },
                { label: "持有12年", years: 12, selfUse: false },
                { label: "自用住宅6年", years: 6, selfUse: true },
              ].map(({ label, years, selfUse }) => {
                const r = calcTax({
                  salePriceWan: 1500,
                  costPriceWan: 1000,
                  holdYears: years,
                  landTaxIncreaseWan: 0,
                  expenseMode: "flat",
                  voucherExpenseWan: 0,
                  isSelfUse: selfUse,
                });
                return (
                  <tr key={label} className="border-b border-gray-50">
                    <td className="py-2.5 text-gray-700">{label}</td>
                    <td className="py-2.5 text-right font-medium text-amber-700">
                      {(r.taxRate * 100).toFixed(0)}%
                    </td>
                    <td className="py-2.5 text-right text-red-600">
                      {fmtWan(r.taxAmount)}
                    </td>
                    <td className="py-2.5 text-right font-semibold text-emerald-700">
                      {fmtWan(r.netProfitAfterTax)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 聯盟行銷 CTA */}
      <MortgageAffiliateCTA />

      {/* FAQ */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <h2 className="font-bold text-gray-800">常見問題</h2>

        <div className="space-y-3 text-sm">
          <details className="rounded-xl border border-gray-100 p-3">
            <summary className="cursor-pointer font-medium text-gray-800">
              房地合一稅 1.0 和 2.0 差在哪？
            </summary>
            <p className="mt-2 text-gray-500">
              2.0 版（2021/07/01起）主要有兩項改變：①短期持有稅率提高（2年以內45%，2-5年35%，舊版分別是35%/20%）；
              ②適用範圍擴大到透過「控股公司」持有房產的情況。長期持有（5年以上）稅率不變。
            </p>
          </details>

          <details className="rounded-xl border border-gray-100 p-3">
            <summary className="cursor-pointer font-medium text-gray-800">
              繼承或贈與取得的房子賣掉，持有年數怎麼算？
            </summary>
            <p className="mt-2 text-gray-500">
              2021/07/01 前繼承取得的，持有期間從被繼承人取得日起算。
              2021/07/01 後繼承取得的，持有期間從繼承人取得日起算。
              直系親屬間贈與取得的，從受贈人取得日起算。
            </p>
          </details>

          <details className="rounded-xl border border-gray-100 p-3">
            <summary className="cursor-pointer font-medium text-gray-800">
              自用住宅的400萬免稅額是怎麼算？
            </summary>
            <p className="mt-2 text-gray-500">
              自用住宅優惠下，課稅所得前400萬元完全免稅，超過400萬的部分才以10%稅率課稅。
              例如課稅所得600萬，600萬−400萬=200萬×10%=繳20萬。比一般持有7年（20%）繳120萬便宜很多。
            </p>
          </details>

          <details className="rounded-xl border border-gray-100 p-3">
            <summary className="cursor-pointer font-medium text-gray-800">
              什麼費用可以列入扣除？
            </summary>
            <p className="mt-2 text-gray-500">
              可認列費用（須有憑證）：仲介費（最高成交價4%）、代書費、廣告費、搬遷費、裝修改良費、借款利息（購入至出售期間，扣除租金收入後）。
              無憑證者，直接採用成交價×3%（取較高者）。建議保留所有裝修發票。
            </p>
          </details>
        </div>
      </div>

      <AdUnit />

      <p className="text-center text-xs text-gray-400">
        本工具依 114 年度財政部公告規則計算，僅供估算參考，不構成稅務建議。
        實際申報請洽地政士或稅務代理人。
      </p>
    </div>
  );
}
