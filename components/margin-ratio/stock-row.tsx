"use client";

import type { StockPosition } from "@/lib/types";

interface StockRowProps {
  position: StockPosition;
  onUpdate: (id: string, updates: Partial<StockPosition>) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

function NumberInput({
  value,
  onChange,
  placeholder,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-500">{label}</label>
      <input
        type="text"
        inputMode="decimal"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) => {
          const v = parseFloat(e.target.value);
          onChange(isNaN(v) ? 0 : v);
        }}
      />
    </div>
  );
}

export function StockRow({
  position,
  onUpdate,
  onRemove,
  canRemove,
}: StockRowProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
      <div className="mb-2 flex items-center justify-between">
        <input
          type="text"
          className="w-40 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium focus:border-blue-500 focus:outline-none"
          placeholder="股票名稱 (如 2330 台積電)"
          value={position.name}
          onChange={(e) => onUpdate(position.id, { name: e.target.value })}
        />
        {canRemove && (
          <button
            onClick={() => onRemove(position.id)}
            className="rounded-lg px-2 py-1 text-sm text-red-500 hover:bg-red-50"
          >
            刪除
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <NumberInput
          label="股數"
          value={position.shares}
          placeholder="1000"
          onChange={(v) => onUpdate(position.id, { shares: v })}
        />
        <NumberInput
          label="現價"
          value={position.currentPrice}
          placeholder="580"
          onChange={(v) => onUpdate(position.id, { currentPrice: v })}
        />
        <NumberInput
          label="買入價"
          value={position.purchasePrice}
          placeholder="520"
          onChange={(v) => onUpdate(position.id, { purchasePrice: v })}
        />
        <NumberInput
          label="融資成數 %"
          value={position.marginRatio * 100}
          placeholder="60"
          onChange={(v) => onUpdate(position.id, { marginRatio: v / 100 })}
        />
      </div>
    </div>
  );
}
