"use client";

import { useState, useMemo, useCallback } from "react";
import { nanoid } from "nanoid";
import type { StockPosition, MarginCalcResult, ScenarioResult } from "@/lib/types";
import { calculateMarginRatio } from "@/lib/calc/margin-ratio";
import { simulateScenarios, generateDropRange } from "@/lib/calc/liquidation";
import { DEFAULT_MARGIN_RATIO } from "@/lib/constants";

function createDefaultPosition(): StockPosition {
  return {
    id: nanoid(6),
    name: "",
    shares: 1000,
    currentPrice: 0,
    purchasePrice: 0,
    marginRatio: DEFAULT_MARGIN_RATIO,
  };
}

export function useMarginCalc() {
  const [positions, setPositions] = useState<StockPosition[]>([
    createDefaultPosition(),
  ]);

  const result: MarginCalcResult = useMemo(
    () => calculateMarginRatio(positions),
    [positions]
  );

  const dropRange = useMemo(() => generateDropRange(0, -60, -1), []);

  const scenarios: ScenarioResult[] = useMemo(
    () => simulateScenarios(positions, dropRange),
    [positions, dropRange]
  );

  const updatePosition = useCallback(
    (id: string, updates: Partial<StockPosition>) => {
      setPositions((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
      );
    },
    []
  );

  const addPosition = useCallback(() => {
    setPositions((prev) => [...prev, createDefaultPosition()]);
  }, []);

  const removePosition = useCallback((id: string) => {
    setPositions((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((p) => p.id !== id);
    });
  }, []);

  return {
    positions,
    result,
    scenarios,
    updatePosition,
    addPosition,
    removePosition,
  };
}
