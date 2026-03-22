"use client";

import { HISTORICAL_SCENARIOS } from "@/lib/constants";
import type { StockPosition } from "@/lib/types";
import { simulateDrop, getZone } from "@/lib/calc/margin-ratio";
import { ZONES } from "@/lib/constants";
import { formatRatio, formatNTD } from "@/lib/format";

export function HistoricalPanel({
  positions,
}: {
  positions: StockPosition[];
}) {
  const hasPositions = positions.some(
    (p) => p.shares > 0 && p.currentPrice > 0 && p.purchasePrice > 0
  );

  if (!hasPositions) {
    return (
      <div className="rounded-xl bg-gray-50 p-4 text-center text-sm text-gray-400">
        請先輸入持股資料
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {HISTORICAL_SCENARIOS.map((scenario) => {
        const result = simulateDrop(positions, scenario.dropPercent);
        const zone = getZone(result.maintenanceRatio);
        const zoneStyle = ZONES[zone];

        return (
          <div
            key={scenario.id}
            className="rounded-xl border p-4"
            style={{ borderColor: zoneStyle.color + "40" }}
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-semibold">{scenario.name}</span>
              <span
                className="rounded-full px-2 py-0.5 text-xs font-medium text-white"
                style={{ backgroundColor: zoneStyle.color }}
              >
                {zoneStyle.label}
              </span>
            </div>
            <div className="mb-2 text-xs text-gray-500">
              {scenario.description} · 跌幅 {scenario.dropPercent}% ·{" "}
              {scenario.dateRange}
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xs text-gray-500">維持率</div>
                <div
                  className="text-2xl font-bold"
                  style={{ color: zoneStyle.color }}
                >
                  {formatRatio(result.maintenanceRatio)}
                </div>
              </div>
              {result.deficiency > 0 && (
                <div className="text-right">
                  <div className="text-xs text-red-500">需追繳</div>
                  <div className="text-sm font-semibold text-red-600">
                    {formatNTD(result.deficiency)}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
