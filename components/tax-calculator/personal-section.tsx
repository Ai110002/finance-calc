"use client";

import type { MaritalStatus, Dependent } from "@/lib/tax-types";

const RELATIONSHIP_OPTIONS = [
  { value: "child", label: "子女", icon: "👶" },
  { value: "parent", label: "父母", icon: "👨‍👩‍👦" },
  { value: "grandparent", label: "祖父母", icon: "👴" },
  { value: "disabled", label: "身心障礙", icon: "♿" },
  { value: "other", label: "其他", icon: "👤" },
] as const;

interface Props {
  maritalStatus: MaritalStatus;
  filingAge: number;
  spouseAge: number;
  dependents: Dependent[];
  hasDisability: boolean;
  spouseHasDisability: boolean;
  hasEducationExpense: boolean;
  educationExpenseCount: number;
  onSetMaritalStatus: (s: MaritalStatus) => void;
  onSetFilingAge: (n: number) => void;
  onSetSpouseAge: (n: number) => void;
  onAddDependent: () => void;
  onRemoveDependent: (id: string) => void;
  onUpdateDependent: (id: string, updates: Partial<Dependent>) => void;
  onSetHasDisability: (v: boolean) => void;
  onSetSpouseHasDisability: (v: boolean) => void;
  onSetHasEducationExpense: (v: boolean) => void;
  onSetEducationExpenseCount: (n: number) => void;
}

export function PersonalSection({
  maritalStatus, filingAge, spouseAge, dependents,
  hasDisability, spouseHasDisability,
  hasEducationExpense, educationExpenseCount,
  onSetMaritalStatus, onSetFilingAge, onSetSpouseAge,
  onAddDependent, onRemoveDependent, onUpdateDependent,
  onSetHasDisability, onSetSpouseHasDisability,
  onSetHasEducationExpense, onSetEducationExpenseCount,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="border-b border-gray-100 bg-gradient-to-r from-green-50 to-white px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600 text-sm font-bold text-white shadow-sm">2</div>
          <div>
            <h2 className="text-base font-bold text-gray-900">個人資訊</h2>
            <p className="text-xs text-gray-500">婚姻狀態、年齡、扶養親屬</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* 婚姻狀態 */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">婚姻狀態</label>
          <div className="grid grid-cols-2 gap-2">
            {([
              { value: "single" as const, label: "單身", icon: "👤" },
              { value: "married" as const, label: "已婚合併申報", icon: "💑" },
            ]).map(s => (
              <button
                key={s.value}
                onClick={() => onSetMaritalStatus(s.value)}
                className={`relative rounded-xl border-2 px-4 py-3 text-center transition-all ${
                  maritalStatus === s.value
                    ? "border-green-500 bg-green-50 shadow-sm shadow-green-100"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <div className="text-lg">{s.icon}</div>
                <div className={`mt-1 text-sm font-semibold ${maritalStatus === s.value ? "text-green-700" : "text-gray-700"}`}>
                  {s.label}
                </div>
                {maritalStatus === s.value && (
                  <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs text-white shadow-sm">✓</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 年齡 */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-500">本人年齡</label>
            <input
              type="text" inputMode="numeric"
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-center text-base font-medium text-gray-900 transition focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100"
              value={filingAge || ""}
              onChange={(e) => { const v = parseInt(e.target.value); onSetFilingAge(isNaN(v) ? 0 : v); }}
              placeholder="35"
            />
            {filingAge >= 70 && (
              <div className="mt-1.5 flex items-center gap-1 rounded-lg bg-green-50 px-2 py-1">
                <span className="text-xs">🎉</span>
                <span className="text-xs font-medium text-green-700">免稅額加碼 50%</span>
              </div>
            )}
          </div>
          {maritalStatus === "married" && (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-500">配偶年齡</label>
              <input
                type="text" inputMode="numeric"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-center text-base font-medium text-gray-900 transition focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100"
                value={spouseAge || ""}
                onChange={(e) => { const v = parseInt(e.target.value); onSetSpouseAge(isNaN(v) ? 0 : v); }}
                placeholder="35"
              />
              {spouseAge >= 70 && (
                <div className="mt-1.5 flex items-center gap-1 rounded-lg bg-green-50 px-2 py-1">
                  <span className="text-xs">🎉</span>
                  <span className="text-xs font-medium text-green-700">免稅額加碼 50%</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 身心障礙 */}
        <div className="space-y-2.5">
          <label className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 transition hover:bg-gray-50">
            <input type="checkbox" checked={hasDisability} onChange={(e) => onSetHasDisability(e.target.checked)}
              className="h-4.5 w-4.5 rounded accent-green-600" />
            <div>
              <span className="text-sm font-medium text-gray-700">本人身心障礙</span>
              <p className="text-xs text-gray-400">可扣除 218,000</p>
            </div>
          </label>
          {maritalStatus === "married" && (
            <label className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 transition hover:bg-gray-50">
              <input type="checkbox" checked={spouseHasDisability} onChange={(e) => onSetSpouseHasDisability(e.target.checked)}
                className="h-4.5 w-4.5 rounded accent-green-600" />
              <div>
                <span className="text-sm font-medium text-gray-700">配偶身心障礙</span>
                <p className="text-xs text-gray-400">可扣除 218,000</p>
              </div>
            </label>
          )}
        </div>

        {/* 扶養親屬 */}
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700">扶養親屬</label>
            <button
              onClick={onAddDependent}
              className="flex items-center gap-1 rounded-xl bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 transition hover:bg-green-100"
            >
              <span>+</span> 新增親屬
            </button>
          </div>

          {dependents.length === 0 && (
            <div className="mt-3 rounded-xl border border-dashed border-gray-200 py-6 text-center">
              <p className="text-sm text-gray-400">無扶養親屬</p>
              <p className="mt-1 text-xs text-gray-300">點擊「新增親屬」加入</p>
            </div>
          )}

          <div className="mt-3 space-y-2">
            {dependents.map((dep) => (
              <div key={dep.id} className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50/50 p-3 transition hover:shadow-sm">
                <select
                  value={dep.relationship}
                  onChange={(e) => {
                    const rel = e.target.value as Dependent["relationship"];
                    const label = RELATIONSHIP_OPTIONS.find(r => r.value === rel)?.label ?? "其他";
                    onUpdateDependent(dep.id, { relationship: rel, label });
                  }}
                  className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs font-medium text-gray-900"
                >
                  {RELATIONSHIP_OPTIONS.map(r => (
                    <option key={r.value} value={r.value}>{r.icon} {r.label}</option>
                  ))}
                </select>
                <div className="flex items-center gap-1">
                  <input
                    type="text" inputMode="numeric" placeholder="年齡"
                    className="w-14 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-center text-xs font-medium text-gray-900"
                    value={dep.age || ""}
                    onChange={(e) => {
                      const v = parseInt(e.target.value);
                      onUpdateDependent(dep.id, { age: isNaN(v) ? 0 : v });
                    }}
                  />
                  <span className="text-xs text-gray-400">歲</span>
                </div>
                <div className="flex items-center gap-1 ml-auto">
                  {dep.isPreschool && <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">幼兒</span>}
                  {dep.isSenior && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">70+</span>}
                  <button
                    onClick={() => onRemoveDependent(dep.id)}
                    className="flex h-6 w-6 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                  >✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 教育學費 */}
        <label className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 transition hover:bg-gray-50">
          <input type="checkbox" checked={hasEducationExpense} onChange={(e) => onSetHasEducationExpense(e.target.checked)}
            className="h-4.5 w-4.5 rounded accent-green-600" />
          <div className="flex-1">
            <span className="text-sm font-medium text-gray-700">有大專以上子女教育學費</span>
            <p className="text-xs text-gray-400">每人可扣除 25,000</p>
          </div>
          {hasEducationExpense && (
            <div className="flex items-center gap-1.5">
              <input
                type="text" inputMode="numeric"
                className="w-12 rounded-lg border border-gray-200 px-2 py-1 text-center text-xs font-medium text-gray-900"
                value={educationExpenseCount || ""}
                onChange={(e) => { const v = parseInt(e.target.value); onSetEducationExpenseCount(isNaN(v) ? 0 : v); }}
              />
              <span className="text-xs text-gray-500">人</span>
            </div>
          )}
        </label>
      </div>
    </div>
  );
}
