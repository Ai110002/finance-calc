"use client";

import { useMarginCalc } from "@/hooks/use-margin-calc";
import { StockRow } from "@/components/margin-ratio/stock-row";
import { RatioResult } from "@/components/margin-ratio/ratio-result";
import { Card } from "@/components/ui/card";

export default function MarginRatioPage() {
  const { positions, result, updatePosition, addPosition, removePosition } =
    useMarginCalc();

  return (
    <div className="space-y-4 px-4 pt-6">
      <div>
        <h1 className="text-xl font-bold">融資維持率計算器</h1>
        <p className="text-sm text-gray-500">
          輸入持股資料，即時計算整戶維持率
        </p>
      </div>

      {/* 結果（置頂） */}
      <Card>
        <RatioResult result={result} />
      </Card>

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

      {/* 說明 */}
      <div className="rounded-xl bg-gray-100 p-4 text-xs text-gray-500">
        <p className="mb-1 font-medium text-gray-700">計算公式</p>
        <p>整戶維持率 = 擔保品市值 ÷ 融資金額 × 100%</p>
        <p>融資金額 = 股數 × 買入價 × 融資成數</p>
        <p className="mt-2">
          維持率低於 130% 時，券商會發出追繳通知，需在 2
          個營業日內補繳差額，否則將被強制賣出（斷頭）。
        </p>
      </div>
    </div>
  );
}
