"use client";

import { Card } from "@/components/ui/card";
import type { DeductionMethod, ItemizedDeductions } from "@/lib/tax-types";
import type { TaxResult } from "@/lib/tax-types";
import { formatNTD } from "@/lib/format";

const ITEMIZED_FIELDS: { key: keyof ItemizedDeductions; label: string; hint?: string }[] = [
  { key: "insurance", label: "保險費", hint: "每人上限 24,000" },
  { key: "medicalExpense", label: "醫藥及生育費", hint: "無上限" },
  { key: "disasterLoss", label: "災害損失" },
  { key: "donation", label: "一般捐贈", hint: "上限所得 20%" },
  { key: "politicalDonation", label: "政治捐贈", hint: "上限 200,000" },
  { key: "rentalExpense", label: "房租支出", hint: "上限 180,000" },
  { key: "mortgageInterest", label: "房貸利息", hint: "上限 300,000（與房租擇一）" },
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
    <Card>
      <h2 className="text-lg font-semibold">
        <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm text-white">3</span>
        扣除額
      </h2>

      {/* 標準 vs 列舉切換 */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => onSetDeductionMethod("standard")}
          className={`rounded-xl border px-3 py-3 text-center transition ${
            deductionMethod === "standard"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 bg-white hover:bg-gray-50"
          }`}
        >
          <div className="text-sm font-medium text-gray-700">標準扣除額</div>
          <div className="mt-1 text-lg font-bold text-blue-600">{formatNTD(result.standardDeduction)}</div>
        </button>
        <button
          onClick={() => onSetDeductionMethod("itemized")}
          className={`rounded-xl border px-3 py-3 text-center transition ${
            deductionMethod === "itemized"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 bg-white hover:bg-gray-50"
          }`}
        >
          <div className="text-sm font-medium text-gray-700">列舉扣除額</div>
          <div className="mt-1 text-lg font-bold text-blue-600">{formatNTD(result.itemizedDeductionTotal)}</div>
        </button>
      </div>

      {/* 比較提示 */}
      {diff !== 0 && (
        <div className={`mt-2 rounded-lg px-3 py-2 text-xs ${
          diff > 0 ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
        }`}>
          {diff > 0
            ? `列舉比標準多 ${formatNTD(diff)}，選列舉更省稅`
            : `標準比列舉多 ${formatNTD(Math.abs(diff))}，選標準更省稅`
          }
        </div>
      )}

      {/* 列舉明細 */}
      {deductionMethod === "itemized" && (
        <div className="mt-4 space-y-2">
          {ITEMIZED_FIELDS.map(f => (
            <div key={f.key}>
              <div className="flex items-center justify-between">
                <label className="text-xs text-gray-600">{f.label}</label>
                {f.hint && <span className="text-xs text-gray-400">{f.hint}</span>}
              </div>
              <input
                type="text" inputMode="decimal"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-right focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="0"
                value={itemizedDeductions[f.key] || ""}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  onUpdateItemized(f.key, isNaN(v) ? 0 : v);
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* 特別扣除額（自動計算）*/}
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-700">特別扣除額（自動計算）</h3>
        <div className="mt-2 space-y-1">
          {result.specialDeductions.salaryDeduction > 0 && (
            <div className="flex justify-between text-xs text-gray-600">
              <span>薪資所得特別扣除額</span>
              <span>{formatNTD(result.specialDeductions.salaryDeduction)}</span>
            </div>
          )}
          {result.specialDeductions.disabilityDeduction > 0 && (
            <div className="flex justify-between text-xs text-gray-600">
              <span>身心障礙特別扣除額</span>
              <span>{formatNTD(result.specialDeductions.disabilityDeduction)}</span>
            </div>
          )}
          {result.specialDeductions.educationDeduction > 0 && (
            <div className="flex justify-between text-xs text-gray-600">
              <span>教育學費特別扣除額</span>
              <span>{formatNTD(result.specialDeductions.educationDeduction)}</span>
            </div>
          )}
          {result.specialDeductions.preschoolDeduction > 0 && (
            <div className="flex justify-between text-xs text-gray-600">
              <span>幼兒學前特別扣除額</span>
              <span>{formatNTD(result.specialDeductions.preschoolDeduction)}</span>
            </div>
          )}
          {result.specialDeductions.rentalDeduction > 0 && (
            <div className="flex justify-between text-xs text-gray-600">
              <span>租金特別扣除額（新制）</span>
              <span>{formatNTD(result.specialDeductions.rentalDeduction)}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-gray-200 pt-1 text-xs font-medium text-gray-700">
            <span>合計</span>
            <span>{formatNTD(result.specialDeductionTotal)}</span>
          </div>
        </div>
      </div>

      {/* 2026 租金特別扣除額 */}
      <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-3">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={claimRentalDeduction}
            onChange={(e) => onSetClaimRentalDeduction(e.target.checked)}
            className="h-4 w-4 rounded accent-green-600" />
          <span className="text-sm font-medium text-green-700">2026 新制：租金特別扣除額</span>
        </label>
        <p className="mt-1 text-xs text-green-600">租屋族不用列舉也能扣，上限 18 萬</p>
        {claimRentalDeduction && (
          <input
            type="text" inputMode="decimal"
            className="mt-2 w-full rounded-lg border border-green-300 px-3 py-2 text-sm text-right focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder="年租金支出"
            value={rentalAmount || ""}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              onSetRentalAmount(isNaN(v) ? 0 : v);
            }}
          />
        )}
      </div>

      {/* 基本生活費差額 */}
      {result.basicLivingDifference > 0 && (
        <div className="mt-3 rounded-lg bg-purple-50 px-3 py-2 text-xs text-purple-700">
          基本生活費保障：額外扣除 {formatNTD(result.basicLivingDifference)}
          <span className="ml-1 text-purple-500">（{formatNTD(result.basicLivingExpense)} − 免稅額及扣除額合計）</span>
        </div>
      )}
    </Card>
  );
}
