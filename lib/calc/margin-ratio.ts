import type { StockPosition, MarginCalcResult, Zone } from "../types";
import { MARGIN_CALL_RATIO, WARNING_RATIO, SAFE_RATIO } from "../constants";

export function getZone(ratio: number): Zone {
  if (ratio >= SAFE_RATIO) return "safe";
  if (ratio >= WARNING_RATIO) return "warning";
  if (ratio >= MARGIN_CALL_RATIO) return "danger";
  return "critical";
}

export function calculateMarginRatio(
  positions: StockPosition[]
): MarginCalcResult {
  let totalMarketValue = 0;
  let totalLoanAmount = 0;

  for (const p of positions) {
    if (p.shares <= 0 || p.currentPrice <= 0) continue;
    const marketValue = p.shares * p.currentPrice;
    const loanAmount = p.shares * p.purchasePrice * p.marginRatio;
    totalMarketValue += marketValue;
    totalLoanAmount += loanAmount;
  }

  if (totalLoanAmount <= 0) {
    return {
      totalMarketValue,
      totalLoanAmount: 0,
      maintenanceRatio: Infinity,
      zone: "safe",
      distanceTo130: Infinity,
      maxDropPercent: 100,
      deficiency: 0,
    };
  }

  const maintenanceRatio = (totalMarketValue / totalLoanAmount) * 100;
  const zone = getZone(maintenanceRatio);
  const distanceTo130 = maintenanceRatio - MARGIN_CALL_RATIO;

  // 股價還能跌多少 % 才會到 130%
  // 130% = (totalMarketValue * (1 - drop)) / totalLoanAmount * 100
  // drop = 1 - (1.3 * totalLoanAmount / totalMarketValue)
  const maxDropPercent =
    totalMarketValue > 0
      ? (1 - (MARGIN_CALL_RATIO / 100) * (totalLoanAmount / totalMarketValue)) * 100
      : 0;

  // 追繳金額：維持率低於 130% 時，需補到 130%
  const requiredMarketValue = totalLoanAmount * (MARGIN_CALL_RATIO / 100);
  const deficiency =
    maintenanceRatio < MARGIN_CALL_RATIO
      ? requiredMarketValue - totalMarketValue
      : 0;

  return {
    totalMarketValue,
    totalLoanAmount,
    maintenanceRatio,
    zone,
    distanceTo130,
    maxDropPercent,
    deficiency,
  };
}

export function simulateDrop(
  positions: StockPosition[],
  dropPercent: number
): MarginCalcResult {
  const adjusted = positions.map((p) => ({
    ...p,
    currentPrice: p.currentPrice * (1 + dropPercent / 100),
  }));
  return calculateMarginRatio(adjusted);
}
