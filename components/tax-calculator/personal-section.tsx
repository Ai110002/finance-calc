"use client";

import { Card } from "@/components/ui/card";
import type { MaritalStatus, Dependent } from "@/lib/tax-types";

const RELATIONSHIP_OPTIONS = [
  { value: "child", label: "子女" },
  { value: "parent", label: "父母" },
  { value: "grandparent", label: "祖父母" },
  { value: "disabled", label: "身心障礙" },
  { value: "other", label: "其他" },
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
    <Card>
      <h2 className="text-lg font-semibold">
        <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm text-white">2</span>
        個人資訊
      </h2>

      {/* 婚姻狀態 */}
      <div className="mt-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">婚姻狀態</label>
        <div className="grid grid-cols-2 gap-2">
          {(["single", "married"] as const).map(s => (
            <button
              key={s}
              onClick={() => onSetMaritalStatus(s)}
              className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                maritalStatus === s
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {s === "single" ? "單身" : "已婚合併申報"}
            </button>
          ))}
        </div>
      </div>

      {/* 年齡 */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs text-gray-500">本人年齡</label>
          <input
            type="text" inputMode="numeric"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-center focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={filingAge || ""}
            onChange={(e) => { const v = parseInt(e.target.value); onSetFilingAge(isNaN(v) ? 0 : v); }}
          />
          {filingAge >= 70 && <span className="text-xs text-green-600">免稅額加碼</span>}
        </div>
        {maritalStatus === "married" && (
          <div>
            <label className="mb-1 block text-xs text-gray-500">配偶年齡</label>
            <input
              type="text" inputMode="numeric"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-center focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={spouseAge || ""}
              onChange={(e) => { const v = parseInt(e.target.value); onSetSpouseAge(isNaN(v) ? 0 : v); }}
            />
            {spouseAge >= 70 && <span className="text-xs text-green-600">免稅額加碼</span>}
          </div>
        )}
      </div>

      {/* 身心障礙 */}
      <div className="mt-4 space-y-2">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={hasDisability} onChange={(e) => onSetHasDisability(e.target.checked)}
            className="h-4 w-4 rounded accent-blue-600" />
          <span className="text-sm text-gray-700">本人身心障礙</span>
        </label>
        {maritalStatus === "married" && (
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={spouseHasDisability} onChange={(e) => onSetSpouseHasDisability(e.target.checked)}
              className="h-4 w-4 rounded accent-blue-600" />
            <span className="text-sm text-gray-700">配偶身心障礙</span>
          </label>
        )}
      </div>

      {/* 扶養親屬 */}
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">扶養親屬</label>
          <button
            onClick={onAddDependent}
            className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-100"
          >+ 新增</button>
        </div>

        {dependents.length === 0 && (
          <p className="mt-2 text-xs text-gray-400">無扶養親屬</p>
        )}

        <div className="mt-2 space-y-2">
          {dependents.map((dep) => (
            <div key={dep.id} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-2">
              <select
                value={dep.relationship}
                onChange={(e) => {
                  const rel = e.target.value as Dependent["relationship"];
                  const label = RELATIONSHIP_OPTIONS.find(r => r.value === rel)?.label ?? "其他";
                  onUpdateDependent(dep.id, { relationship: rel, label });
                }}
                className="rounded border border-gray-200 px-2 py-1 text-xs"
              >
                {RELATIONSHIP_OPTIONS.map(r => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
              <input
                type="text" inputMode="numeric" placeholder="年齡"
                className="w-16 rounded border border-gray-200 px-2 py-1 text-xs text-center"
                value={dep.age || ""}
                onChange={(e) => {
                  const v = parseInt(e.target.value);
                  onUpdateDependent(dep.id, { age: isNaN(v) ? 0 : v });
                }}
              />
              <span className="text-xs text-gray-400">歲</span>
              {dep.isPreschool && <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-600">幼兒</span>}
              {dep.isSenior && <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs text-amber-600">70+</span>}
              <button
                onClick={() => onRemoveDependent(dep.id)}
                className="ml-auto text-xs text-red-400 hover:text-red-600"
              >✕</button>
            </div>
          ))}
        </div>
      </div>

      {/* 教育學費 */}
      <div className="mt-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={hasEducationExpense} onChange={(e) => onSetHasEducationExpense(e.target.checked)}
            className="h-4 w-4 rounded accent-blue-600" />
          <span className="text-sm text-gray-700">有大專以上子女教育學費</span>
        </label>
        {hasEducationExpense && (
          <div className="mt-2 ml-6">
            <label className="text-xs text-gray-500">就學人數</label>
            <input
              type="text" inputMode="numeric"
              className="ml-2 w-16 rounded border border-gray-200 px-2 py-1 text-xs text-center"
              value={educationExpenseCount || ""}
              onChange={(e) => { const v = parseInt(e.target.value); onSetEducationExpenseCount(isNaN(v) ? 0 : v); }}
            />
          </div>
        )}
      </div>
    </Card>
  );
}
