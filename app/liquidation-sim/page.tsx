"use client";

import { useMarginCalc } from "@/hooks/use-margin-calc";
import { StockRow } from "@/components/margin-ratio/stock-row";
import ScenarioChart from "@/components/liquidation-sim/scenario-chart";
import { HistoricalPanel } from "@/components/liquidation-sim/historical-panel";
import { Card } from "@/components/ui/card";
import { PRESET_DROPS } from "@/lib/constants";
import { simulateDrop, getZone } from "@/lib/calc/margin-ratio";
import { ZONES } from "@/lib/constants";
import { formatRatio, formatNTD } from "@/lib/format";

export default function LiquidationSimPage() {
  const {
    positions,
    scenarios,
    updatePosition,
    addPosition,
    removePosition,
  } = useMarginCalc();

  const hasData = positions.some(
    (p) => p.shares > 0 && p.currentPrice > 0 && p.purchasePrice > 0
  );

  return (
    <div className="space-y-4 px-4 pt-6">
      <div>
        <h1 className="text-xl font-bold">斷頭模擬器</h1>
        <p className="text-sm text-gray-500">
          模擬股價下跌對維持率的影響
        </p>
      </div>

      {/* 持股輸入 */}
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold">持股明細</h2>
          <button
            onClick={addPosition}
            className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-100"
          >
            + 新增股票
          </button>
        </div>
        <div className="space-y-3">
          {positions.map((p) => (
            <StockRow
              key={p.id}
              position={p}
              onUpdate={updatePosition}
              onRemove={removePosition}
              canRemove={positions.length > 1}
            />
          ))}
        </div>
      </Card>

      {/* 下跌模擬圖表 */}
      {hasData && (
        <Card>
          <h2 className="mb-3 font-semibold">維持率 vs 股價跌幅</h2>
          <ScenarioChart scenarios={scenarios} />
        </Card>
      )}

      {/* 快速情境表 */}
      {hasData && (
        <Card>
          <h2 className="mb-3 font-semibold">快速情境</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-gray-500">
                  <th className="pb-2 pr-4">跌幅</th>
                  <th className="pb-2 pr-4">維持率</th>
                  <th className="pb-2 pr-4">狀態</th>
                  <th className="pb-2">追繳金額</th>
                </tr>
              </thead>
              <tbody>
                {PRESET_DROPS.map((drop) => {
                  const r = simulateDrop(positions, drop);
                  const zone = getZone(r.maintenanceRatio);
                  const zs = ZONES[zone];
                  return (
                    <tr key={drop} className="border-b border-gray-100">
                      <td className="py-2 pr-4 font-medium">{drop}%</td>
                      <td
                        className="py-2 pr-4 font-semibold"
                        style={{ color: zs.color }}
                      >
                        {formatRatio(r.maintenanceRatio)}
                      </td>
                      <td className="py-2 pr-4">
                        <span
                          className="rounded-full px-2 py-0.5 text-xs text-white"
                          style={{ backgroundColor: zs.color }}
                        >
                          {zs.label}
                        </span>
                      </td>
                      <td className="py-2 text-red-600">
                        {r.deficiency > 0 ? formatNTD(r.deficiency) : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* 歷史情境 */}
      <Card>
        <h2 className="mb-3 font-semibold">歷史崩盤情境回測</h2>
        <HistoricalPanel positions={positions} />
      </Card>
    </div>
  );
}
