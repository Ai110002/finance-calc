"use client";

import { Card } from "@/components/ui/card";
import type { IncomeSource, IncomeType, WorkerType } from "@/lib/tax-types";
import { PROFESSION_RATES, INCOME_TYPE_LABELS } from "@/lib/tax-constants";
import { formatNTD } from "@/lib/format";
import { computeNetIncome } from "@/lib/calc/tax";

const WORKER_OPTIONS: { value: WorkerType; label: string; desc: string }[] = [
  { value: "employee", label: "上班族", desc: "公司發薪水" },
  { value: "freelancer", label: "自由工作者", desc: "接案/執業" },
  { value: "mixed", label: "混合", desc: "有薪水也接案" },
];

const ADD_INCOME_OPTIONS: { type: IncomeType; label: string }[] = [
  { type: "salary", label: "+ 薪資" },
  { type: "9A", label: "+ 9A 執業" },
  { type: "9B", label: "+ 9B 稿費" },
  { type: "50", label: "+ 其他所得" },
  { type: "rental", label: "+ 租金" },
  { type: "dividend", label: "+ 股利" },
];

interface Props {
  workerType: WorkerType;
  incomeSources: IncomeSource[];
  onWorkerTypeChange: (type: WorkerType) => void;
  onAddSource: (type: IncomeType) => void;
  onRemoveSource: (id: string) => void;
  onUpdateSource: (id: string, updates: Partial<IncomeSource>) => void;
}

export function IncomeSection({
  workerType, incomeSources, onWorkerTypeChange,
  onAddSource, onRemoveSource, onUpdateSource,
}: Props) {
  const professionsByCategory = PROFESSION_RATES.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {} as Record<string, typeof PROFESSION_RATES>);

  return (
    <Card>
      <h2 className="text-lg font-semibold">
        <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm text-white">1</span>
        所得輸入
      </h2>
      <p className="mt-1 text-xs text-gray-500">選擇你的身份，填入各項收入</p>

      {/* 身份切換 */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {WORKER_OPTIONS.map(opt => (
          <button
            key={opt.value}
            onClick={() => onWorkerTypeChange(opt.value)}
            className={`rounded-xl border px-3 py-2.5 text-center transition ${
              workerType === opt.value
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="text-sm font-medium">{opt.label}</div>
            <div className="text-xs text-gray-400">{opt.desc}</div>
          </button>
        ))}
      </div>

      {/* 收入列表 */}
      <div className="mt-4 space-y-3">
        {incomeSources.map((source) => (
          <div key={source.id} className="rounded-xl border border-gray-200 bg-gray-50 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                {INCOME_TYPE_LABELS[source.type] ?? source.type}
              </span>
              {incomeSources.length > 1 && (
                <button
                  onClick={() => onRemoveSource(source.id)}
                  className="text-xs text-red-400 hover:text-red-600"
                >刪除</button>
              )}
            </div>

            {/* 金額 */}
            <div className="mt-2">
              <label className="text-xs text-gray-500">年收入（總額）</label>
              <input
                type="text" inputMode="decimal"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-right focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="0"
                value={source.grossAmount || ""}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  onUpdateSource(source.id, { grossAmount: isNaN(v) ? 0 : v });
                }}
              />
            </div>

            {/* 9A 職業選擇 */}
            {source.type === "9A" && (
              <div className="mt-2">
                <label className="text-xs text-gray-500">職業（自動帶入費用率）</label>
                <select
                  value={source.professionCode ?? ""}
                  onChange={(e) => {
                    const prof = PROFESSION_RATES.find(p => p.code === e.target.value);
                    if (prof) {
                      onUpdateSource(source.id, {
                        professionCode: prof.code,
                        expenseRate: prof.rate,
                        label: prof.name,
                      });
                    }
                  }}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {Object.entries(professionsByCategory).map(([cat, profs]) => (
                    <optgroup key={cat} label={cat}>
                      {profs.map(p => (
                        <option key={p.code} value={p.code}>
                          {p.name}（{(p.rate * 100).toFixed(0)}%）
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <div className="mt-1 text-xs text-gray-400">
                  費用率 {((source.expenseRate ?? 0) * 100).toFixed(0)}% →
                  淨所得 {formatNTD(computeNetIncome(source))}
                </div>
              </div>
            )}

            {/* 9B 說明 */}
            {source.type === "9B" && source.grossAmount > 0 && (
              <div className="mt-1 text-xs text-gray-400">
                免稅 18 萬 + 超額部分 30% 費用率 → 淨所得 {formatNTD(computeNetIncome(source))}
              </div>
            )}

            {/* 租金說明 */}
            {source.type === "rental" && source.grossAmount > 0 && (
              <div className="mt-1 text-xs text-gray-400">
                43% 必要費用 → 淨所得 {formatNTD(computeNetIncome(source))}
              </div>
            )}

            {/* 其他所得淨額顯示 */}
            {!["9A", "9B", "rental"].includes(source.type) && source.grossAmount > 0 && (
              <div className="mt-1 text-xs text-gray-400">
                淨所得 {formatNTD(computeNetIncome(source))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 新增收入 */}
      <div className="mt-3 flex flex-wrap gap-2">
        {ADD_INCOME_OPTIONS
          .filter(opt => {
            if (workerType === "employee" && ["9A", "9B"].includes(opt.type)) return true;
            return true;
          })
          .map(opt => (
            <button
              key={opt.type}
              onClick={() => onAddSource(opt.type)}
              className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            >{opt.label}</button>
          ))
        }
      </div>
    </Card>
  );
}
