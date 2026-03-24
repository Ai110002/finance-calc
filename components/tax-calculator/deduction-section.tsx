"use client";

import type { DeductionMethod, ItemizedDeductions } from "@/lib/tax-types";
import type { TaxResult } from "@/lib/tax-types";
import { formatNTD } from "@/lib/format";

const ITEMIZED_FIELDS: { key: keyof ItemizedDeductions; label: string; hint?: string; icon: string }[] = [
  { key: "insurance", label: "保險費", hint: "每人上限 24,000", icon: "🛡️" },
  { key: "medicalExpense", label: "醫藥及生育費", hint: "無上限", icon: "🏥" },
  { key: "disasterLoss", label: "災害損失", icon: "🌊" },
  { key: "donation", label: "一般捐贈", hint: "上限所得 20%", icon: "🤝" },
  { key: "politicalDonation", label: "政治捐贈", hint: "上限 200,000", icon: "🏛️" },
  { key: "rentalExpense", label: "房租支出", hint: "上限 180,000", icon: "🏠" },
  { key: "mortgageInterest", label: "房貸利息", hint: "上限 300,000（與房租擇一）", icon: "🏦" },
];

interface Props {
  deductionMethod: DeductionMethod;
  itemizedDeductions: ItemizedDeductions;
  claimRentalDeduction: boolean;
  rentalAmount: number;
  result: TaxResult;
  onSetDeductionMethod: (m: DeductionMethod) => void;
  onUpdateItemized: (field: keyof ItemizedDeductions, value: number) => void;
  onSetClaimRentalDeduction: (v: boolean) => void;
  onSetRentalAmount: (n: number) => void;
}

export function DeductionSection({
  deductionMethod, itemizedDeductions, claimRentalDeduction, rentalAmount,
  result, onSetDeductionMethod, onUpdateItemized,
  onSetClaimRentalDeduction, onSetRentalAmount,
}: Props) {
  const diff = result.deductionDifference;

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 text-sm font-bold text-white shadow-sm">3</div>
          <div>
            <h2 className="text-base font-bold text-gray-900">扣除額</h2>
            <p className="text-xs text-gray-500">標準 vs 列舉，系統幫你比較</p>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* 標準 vs 列舉切換 */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onSetDeductionMethod("standard")}
            className={`relative rounded-xl border-2 px-4 py-4 text-center transition-all ${
              deductionMethod === "standard"
                ? "border-purple-500 bg-purple-50 shadow-sm shadow-purple-100"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="text-xs font-medium text-gray-500">標準扣除額</div>
            <div className={`mt-1 text-xl font-bold ${deductionMethod === "standard" ? "text-purple-700" : "text-gray-700"}`}>
              {formatNTD(result.standardDeduction)}
            </div>
            {deductionMethod === "standard" && (
              <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs text-white">✓</div>
            )}
          </button>
          <button
            onClick={() => onSetDeductionMethod("itemized")}
            className={`relative rounded-xl border-2 px-4 py-4 text-center transition-all ${
              deductionMethod === "itemized"
                ? "border-purple-500 bg-purple-50 shadow-sm shadow-purple-100"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="text-xs font-medium text-gray-500">列舉扣除額</div>
            <div className={`mt-1 text-xl font-bold ${deductionMethod === "itemized" ? "text-purple-700" : "text-gray-700"}`}>
              {formatNTD(result.itemizedDeductionTotal)}
            </div>
            {deductionMethod === "itemized" && (
              <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs text-white">✓</div>
            )}
          </button>
        </div>

        {/* 比較提示 */}
        {diff !== 0 && (
          <div className={`mt-3 flex items-center gap-2 rounded-xl px-4 py-2.5 ${
            diff > 0 ? "bg-green-50 ring-1 ring-green-200" : "bg-amber-50 ring-1 ring-amber-200"
          }`}>
            <span className="text-sm">{diff > 0 ? "💡" : "📌"}</span>
            <p className={`text-xs font-medium ${diff > 0 ? "text-green-700" : "text-amber-700"}`}>
              {diff > 0
                ? `列舉比標準多 ${formatNTD(diff)}，選列舉更省稅`
                : `標準比列舉多 ${formatNTD(Math.abs(diff))}，選標準更省稅`
              }
            </p>
          </div>
        )}

        {/* 列舉明細 */}
        {deductionMethod === "itemized" && (
          <div className="mt-4 space-y-3">
            {ITEMIZED_FIELDS.map(f => (
              <div key={f.key}>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                    <span>{f.icon}</span> {f.label}
                  </label>
                  {f.hint && <span className="text-xs text-gray-400">{f.hint}</span>}
                </div>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">NT$</span>
                  <input
                    type="text" inputMode="decimal"
                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-right text-sm font-medium transition focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100"
                    placeholder="0"
                    value={itemizedDeductions[f.key] || ""}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      onUpdateItemized(f.key, isNaN(v) ? 0 : v);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 特別扣除額（自動計算）*/}
        <div className="mt-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-gray-200 text-xs">A</span>
            特別扣除額（自動計算）
          </h3>
          <div className="mt-3 rounded-xl bg-gray-50 p-4 space-y-2">
            {result.specialDeductions.salaryDeduction > 0 && (
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">薪資所得特別扣除額</span>
                <span className="font-semibold text-gray-800">{formatNTD(result.specialDeductions.salaryDeduction)}</span>
              </div>
            )}
            {result.specialDeductions.disabilityDeduction > 0 && (
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">身心障礙特別扣除額</span>
                <span className="font-semibold text-gray-800">{formatNTD(result.specialDeductions.disabilityDeduction)}</span>
              </div>
            )}
            {result.specialDeductions.educationDeduction > 0 && (
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">教育學費特別扣除額</span>
                <span className="font-semibold text-gray-800">{formatNTD(result.specialDeductions.educationDeduction)}</span>
              </div>
            )}
            {result.specialDeductions.preschoolDeduction > 0 && (
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">幼兒學前特別扣除額</span>
                <span className="font-semibold text-gray-800">{formatNTD(result.specialDeductions.preschoolDeduction)}</span>
              </div>
            )}
            {result.specialDeductions.rentalDeduction > 0 && (
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">租金特別扣除額（新制）</span>
                <span className="font-semibold text-gray-800">{formatNTD(result.specialDeductions.rentalDeduction)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-gray-200 pt-2 text-xs">
              <span className="font-semibold text-gray-700">合計</span>
              <span className="font-bold text-gray-900">{formatNTD(result.specialDeductionTotal)}</span>
            </div>
          </div>
        </div>

        {/* 2026 租金特別扣除額 */}
        <div className="mt-4 overflow-hidden rounded-xl border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <label className="flex items-center gap-3 px-4 py-3">
            <input type="checkbox" checked={claimRentalDeduction}
              onChange={(e) => onSetClaimRentalDeduction(e.target.checked)}
              className="h-4.5 w-4.5 rounded accent-green-600" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-green-800">2026 新制：租金特別扣除額</span>
                <span className="rounded-full bg-green-200 px-2 py-0.5 text-xs font-bold text-green-800">NEW</span>
              </div>
              <p className="mt-0.5 text-xs text-green-600">租屋族不用列舉也能扣，上限 18 萬</p>
              <p className="mt-0.5 text-xs text-gray-500">⚠️ 適用稅率 20% 以上、股利選 28% 分離課稅、基本所得額超過 750 萬者不適用</p>
            </div>
          </label>
          {claimRentalDeduction && (
            <div className="border-t border-green-200 px-4 py-3">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-green-600">NT$</span>
                <input
                  type="text" inputMode="decimal"
                  className="w-full rounded-xl border border-green-300 bg-white py-2.5 pl-10 pr-4 text-right text-sm font-medium text-green-800 transition focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
                  placeholder="年租金支出"
                  value={rentalAmount || ""}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    onSetRentalAmount(isNaN(v) ? 0 : v);
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* 租金扣除排除警告 */}
        {result.rentalDeductionWarning && (
          <div className="mt-3 flex items-start gap-2.5 rounded-xl bg-red-50 px-4 py-3 ring-1 ring-red-200">
            <span className="mt-0.5 text-sm">⚠️</span>
            <p className="text-xs font-medium text-red-700">{result.rentalDeductionWarning}</p>
          </div>
        )}

        {/* 基本生活費差額 */}
        {result.basicLivingDifference > 0 && (
          <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-purple-50 px-4 py-3 ring-1 ring-purple-200">
            <span className="mt-0.5 text-sm">🎯</span>
            <div>
              <p className="text-xs font-semibold text-purple-700">
                基本生活費保障：額外扣除 {formatNTD(result.basicLivingDifference)}
              </p>
              <p className="mt-0.5 text-xs text-purple-500">
                {formatNTD(result.basicLivingExpense)} − 免稅額及扣除額合計
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
