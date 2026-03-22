import type { StockPosition, ScenarioResult } from "../types";
import { simulateDrop } from "./margin-ratio";
import { getZone } from "./margin-ratio";
import { MARGIN_CALL_RATIO } from "../constants";

export function simulateScenarios(
  positions: StockPosition[],
  drops: number[]
): ScenarioResult[] {
  return drops.map((dropPercent) => {
    const result = simulateDrop(positions, dropPercent);
    const marginCallAmount =
      result.maintenanceRatio < MARGIN_CALL_RATIO ? result.deficiency : 0;

    return {
      dropPercent,
      newMarketValue: result.totalMarketValue,
      newMaintenanceRatio: result.maintenanceRatio,
      zone: getZone(result.maintenanceRatio),
      marginCallAmount,
    };
  });
}

export function generateDropRange(
  from: number,
  to: number,
  step: number
): number[] {
  const result: number[] = [];
  for (let i = from; i >= to; i += step) {
    result.push(Math.round(i * 10) / 10);
  }
  return result;
}
