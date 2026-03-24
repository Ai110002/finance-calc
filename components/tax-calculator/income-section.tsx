"use client";

import type { IncomeSource, IncomeType, WorkerType } from "@/lib/tax-types";
import { PROFESSION_RATES, INCOME_TYPE_LABELS } from "@/lib/tax-constants";
import { formatNTD } from "@/lib/format";
import { computeNetIncome } from "@/lib/calc/tax";

const WORKER_OPTIONS: { value: WorkerType; label: string; desc: string; icon: string }[] = [
  { value: "employee", label: "上班族", desc: "公司發薪水", icon: "🏢" },
  { value: "freelancer", label: "自由工作者", desc: "接案/執業", icon: "💻" },
  { value: "mixed", label: "混合", desc: "有薪水也接案", icon: "🔀" },
];

const ADD_INCOME_OPTIONS: { type: IncomeType; label: string; icon: string }[] = [
  { type: "salary", label: "薪資", icon: "💵" },
  { type: "9A", label: "9A 執業", icon: "📑" },
  { type: "9B", label: "9B 稿費", icon: "✍️" },
  { type: "50", label: "其他所得", icon: "📦" },
  { type: "rental", label: "租金", icon: "🏠" },
  { type: "dividend", label: "股利", icon: "📈" },
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

  const totalGross = incomeSources.reduce((s, src) => s + src.grossAmount, 0);
  const totalNet = incomeSources.reduce((s, src) => s + computeNetIncome(src), 0);

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      {/* Section Header */}
      <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-sm">1</div>
          <div>
            <h2 className="text-base font-bold text-gray-900">所得輸入</h2>
            <p className="text-xs text-gray-500">選擇你的身份，填入各項收入</p>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* 身份切換 */}
        <div className="grid grid-cols-3 gap-2">
          {WORKER_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => onWorkerTypeChange(opt.value)}
              className={`group relative rounded-xl border-2 px-3 py-3 text-center transition-all ${
                workerType === opt.value
                  ? "border-blue-500 bg-blue-50 shadow-sm shadow-blue-100"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <div className="text-lg">{opt.icon}</div>
              <div className={`mt-1 text-sm font-semibold ${workerType === opt.value ? "text-blue-700" : "text-gray-700"}`}>{opt.label}</div>
              <div className="text-xs text-gray-400">{opt.desc}</div>
              {workerType === opt.value && (
                <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white shadow-sm">✓</div>
              )}
            </button>
          ))}
        </div>

        {/* 收入列表 */}
        <div className="mt-5 space-y-3">
          {incomeSources.map((source) => (
            <div key={source.id} className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 transition hover:shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">
                    {ADD_INCOME_OPTIONS.find(o => o.type === source.type)?.icon ?? "📄"}
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    {INCOME_TYPE_LABELS[source.type] ?? source.type}
                  </span>
                </div>
                {incomeSources.length > 1 && (
                  <button
                    onClick={() => onRemoveSource(source.id)}
                    className="flex h-6 w-6 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                  >✕</button>
                )}
              </div>

              {/* 金額 */}
              <div className="mt-3">
                <label className="text-xs font-medium text-gray-500">年收入（總額）</label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">NT$</span>
                  <input
                    type="text" inputMode="decimal"
                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-12 pr-4 text-right text-base font-medium text-gray-900 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="0"
                    value={source.grossAmount || ""}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      onUpdateSource(source.id, { grossAmount: isNaN(v) ? 0 : v });
                    }}
                  />
                </div>
              </div>

              {/* 9A 職業選擇 */}
              {source.type === "9A" && (
                <div className="mt-3">
                  <label className="text-xs font-medium text-gray-500">職業（自動帶入費用率）</label>
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
                    className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  >
                    {Object.entries(professionsByCategory).map(([cat, profs]) => (
                      <optgroup key={cat} label={cat}>
                        {profs.map(p => (
                          <option key={p.code} value={p.code}>
                            {p.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <div className="mt-2 flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5">
                    <span className="text-xs text-blue-600">費用率 {((source.expenseRate ?? 0) * 100).toFixed(0)}%</span>
                    <span className="text-xs text-gray-400">→</span>
                    <span className="text-xs font-semibold text-blue-700">淨所得 {formatNTD(computeNetIncome(source))}</span>
                  </div>
                </div>
              )}

              {/* 9B 說明 */}
              {source.type === "9B" && source.grossAmount > 0 && (
                <div className="mt-2 rounded-lg bg-green-50 px-3 py-1.5 text-xs text-green-700">
                  免稅 18 萬 + 超額 30% 費用率 → 淨所得 <strong>{formatNTD(computeNetIncome(source))}</strong>
                </div>
              )}

              {/* 租金說明 */}
              {source.type === "rental" && source.grossAmount > 0 && (
                <div className="mt-2 rounded-lg bg-amber-50 px-3 py-1.5 text-xs text-amber-700">
                  43% 必要費用 → 淨所得 <strong>{formatNTD(computeNetIncome(source))}</strong>
                </div>
              )}

              {/* 其他所得 */}
              {!["9A", "9B", "rental"].includes(source.type) && source.grossAmount > 0 && (
                <div className="mt-2 rounded-lg bg-gray-100 px-3 py-1.5 text-xs text-gray-600">
                  淨所得 <strong>{formatNTD(computeNetIncome(source))}</strong>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 新增收入 */}
        <div className="mt-4">
          <p className="mb-2 text-xs font-medium text-gray-500">新增收入來源</p>
          <div className="flex flex-wrap gap-2">
            {ADD_INCOME_OPTIONS.map(opt => (
              <button
                key={opt.type}
                onClick={() => onAddSource(opt.type)}
                className="flex items-center gap-1.5 rounded-xl border border-dashed border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
              >
                <span>{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 總計 */}
        {totalGross > 0 && (
          <div className="mt-5 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 p-4 text-white">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">總收入</span>
              <span className="text-lg font-bold">{formatNTD(totalGross)}</span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-sm text-gray-400">扣除費用後淨所得</span>
              <span className="text-base font-semibold text-blue-300">{formatNTD(totalNet)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
