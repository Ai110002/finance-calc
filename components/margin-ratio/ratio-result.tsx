"use client";

import type { MarginCalcResult } from "@/lib/types";
import { ZONES } from "@/lib/constants";
import { formatNTD, formatRatio, formatPercent } from "@/lib/format";

export function RatioResult({ result }: { result: MarginCalcResult }) {
  const zone = ZONES[result.zone];
  const isInfinite = !isFinite(result.maintenanceRatio);

  return (
    <div className="space-y-4">
      {/* 主數字 */}
      <div
        className="rounded-2xl p-6 text-center"
        style={{ backgroundColor: isInfinite ? "#f0fdf4" : zone.bg }}
      >
        <div className="text-sm text-gray-600">整戶維持率</div>
        <div
          className="text-5xl font-bold"
          style={{ color: isInfinite ? "#22c55e" : zone.color }}
        >
          {isInfinite ? "∞" : formatRatio(result.maintenanceRatio)}
        </div>
        <div
          className="mt-1 inline-block rounded-full px-3 py-1 text-sm font-medium text-white"
          style={{ backgroundColor: isInfinite ? "#22c55e" : zone.color }}
        >
          {isInfinite ? "無融資" : zone.label}
        </div>
      </div>

      {/* 明細 */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-gray-50 p-3">
          <div className="text-xs text-gray-500">擔保品市值</div>
          <div className="text-lg font-semibold">
            {formatNTD(result.totalMarketValue)}
          </div>
        </div>
        <div className="rounded-xl bg-gray-50 p-3">
          <div className="text-xs text-gray-500">融資金額</div>
          <div className="text-lg font-semibold">
            {formatNTD(result.totalLoanAmount)}
          </div>
        </div>
      </div>

      {/* 關鍵指標 */}
      {!isInfinite && (
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-xl bg-blue-50 p-3">
            <span className="text-sm text-gray-600">距離斷頭線 (130%)</span>
            <span
              className="text-lg font-bold"
              style={{ color: result.distanceTo130 > 20 ? "#22c55e" : result.distanceTo130 > 0 ? "#eab308" : "#ef4444" }}
            >
              {result.distanceTo130 > 0
                ? `+${formatPercent(result.distanceTo130, 1)}`
                : formatPercent(result.distanceTo130, 1)}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-blue-50 p-3">
            <span className="text-sm text-gray-600">股價最多可跌</span>
            <span
              className="text-lg font-bold"
              style={{ color: result.maxDropPercent > 20 ? "#22c55e" : result.maxDropPercent > 10 ? "#eab308" : "#ef4444" }}
            >
              {formatPercent(result.maxDropPercent, 1)}
            </span>
          </div>

          {result.deficiency > 0 && (
            <div className="flex items-center justify-between rounded-xl bg-red-50 p-3">
              <span className="text-sm font-medium text-red-700">
                需追繳金額
              </span>
              <span className="text-lg font-bold text-red-700">
                {formatNTD(result.deficiency)}
              </span>
            </div>
          )}
        </div>
      )}

      {/* 維持率量表 */}
      {!isInfinite && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-500">
            <span>130% 斷頭</span>
            <span>150%</span>
            <span>166% 安全</span>
          </div>
          <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="absolute left-0 top-0 h-full rounded-full transition-all"
              style={{
                width: `${Math.min(100, Math.max(0, ((result.maintenanceRatio - 100) / 100) * 100))}%`,
                backgroundColor: zone.color,
              }}
            />
            {/* 130% 標記 */}
            <div
              className="absolute top-0 h-full w-0.5 bg-red-600"
              style={{ left: "30%" }}
            />
            {/* 150% 標記 */}
            <div
              className="absolute top-0 h-full w-0.5 bg-yellow-500"
              style={{ left: "50%" }}
            />
            {/* 166% 標記 */}
            <div
              className="absolute top-0 h-full w-0.5 bg-green-500"
              style={{ left: "66%" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
