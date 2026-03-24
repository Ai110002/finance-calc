"use client";

import { Card } from "@/components/ui/card";
import type { TaxResult } from "@/lib/tax-types";
import { formatNTD, formatPercent } from "@/lib/format";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie,
} from "recharts";

const BRACKET_COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#991b1b"];

interface Props {
  result: TaxResult;
}

export function ResultSection({ result }: Props) {
  const bracketData = result.bracketBreakdown.map((b, i) => ({
    name: b.bracket,
    tax: b.tax,
    amount: b.amount,
    rate: `${(b.rate * 100).toFixed(0)}%`,
    fill: BRACKET_COLORS[i] ?? BRACKET_COLORS[0],
  }));

  const pieData = [
    { name: "免稅額", value: result.exemptionAmount, fill: "#22c55e" },
    { name: "扣除額", value: result.appliedDeduction, fill: "#3b82f6" },
    { name: "特別扣除", value: result.specialDeductionTotal, fill: "#8b5cf6" },
    ...(result.basicLivingDifference > 0
      ? [{ name: "基本生活費差額", value: result.basicLivingDifference, fill: "#06b6d4" }]
      : []),
    { name: "應稅所得", value: result.taxableIncome, fill: "#f59e0b" },
  ].filter(d => d.value > 0);

  return (
    <Card>
      <h2 className="text-lg font-semibold">
        <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm text-white">4</span>
        試算結果
      </h2>

      {/* 大字稅額 */}
      <div className="mt-4 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-5 text-center">
        <div className="text-sm text-gray-500">預估應繳所得稅</div>
        <div className="mt-1 text-4xl font-bold text-blue-700">{formatNTD(result.taxAmount)}</div>
        <div className="mt-2 flex justify-center gap-4">
          <div className="text-xs text-gray-500">
            有效稅率 <span className="font-semibold text-blue-600">{formatPercent(result.effectiveRate)}</span>
          </div>
          <div className="text-xs text-gray-500">
            邊際稅率 <span className="font-semibold text-purple-600">{formatPercent(result.marginalRate * 100, 0)}</span>
          </div>
        </div>
      </div>

      {/* 逐行明細 */}
      <div className="mt-4 space-y-1">
        <DetailRow label="綜合所得總額" value={result.totalGrossIncome} />
        <DetailRow label="− 必要費用/免稅" value={result.totalGrossIncome - result.totalNetIncome} minus />
        <DetailRow label="= 所得淨額" value={result.totalNetIncome} bold />
        <DetailRow label="− 免稅額" value={result.exemptionAmount} minus />
        <DetailRow label={`− ${result.deductionMethod === "standard" ? "標準" : "列舉"}扣除額`} value={result.appliedDeduction} minus />
        <DetailRow label="− 特別扣除額" value={result.specialDeductionTotal} minus />
        {result.basicLivingDifference > 0 && (
          <DetailRow label="− 基本生活費差額" value={result.basicLivingDifference} minus />
        )}
        <div className="border-t border-gray-200 pt-1">
          <DetailRow label="= 綜合所得淨額" value={result.taxableIncome} bold />
        </div>
        <div className="border-t border-gray-300 pt-1">
          <DetailRow label="應納稅額" value={result.taxAmount} bold highlight />
        </div>
      </div>

      {/* 級距圖 */}
      {bracketData.length > 0 && (
        <div className="mt-5">
          <h3 className="mb-2 text-sm font-medium text-gray-700">稅率級距分布</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={bracketData} layout="vertical" margin={{ left: 0, right: 10 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="rate" width={40} tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value) => formatNTD(Number(value))}
                labelFormatter={(label) => `稅率 ${label}`}
              />
              <Bar dataKey="tax" radius={[0, 6, 6, 0]}>
                {bracketData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* 圓餅圖 */}
      {pieData.length > 0 && (
        <div className="mt-4">
          <h3 className="mb-2 text-sm font-medium text-gray-700">所得分配</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%" cy="50%"
                innerRadius={50} outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatNTD(Number(value))} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* 二代健保 */}
      {result.nhiResult.supplementaryPremium > 0 && (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3">
          <h3 className="text-sm font-medium text-amber-700">二代健保補充保費</h3>
          <div className="mt-1 text-xl font-bold text-amber-700">
            {formatNTD(result.nhiResult.supplementaryPremium)}
          </div>
          <div className="mt-2 space-y-1">
            {result.nhiResult.details.map((d, i) => (
              <div key={i} className="flex justify-between text-xs text-amber-600">
                <span>{d.source}（{formatNTD(d.amount)}）</span>
                <span>{formatNTD(d.premium)}</span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-amber-500">費率 2.11%，單筆所得 ≥ 20,000 元時扣繳</p>
        </div>
      )}

      {/* 勞健保 */}
      {result.unionInsurance.annualTotal > 0 && (
        <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
          <h3 className="text-sm font-medium text-gray-700">勞健保估算（工會投保）</h3>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-gray-500">勞保/月</div>
              <div className="text-sm font-semibold">{formatNTD(result.unionInsurance.laborInsurance)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">健保/月</div>
              <div className="text-sm font-semibold">{formatNTD(result.unionInsurance.healthInsurance)}</div>
            </div>
          </div>
          <div className="mt-2 flex justify-between border-t border-gray-200 pt-2">
            <span className="text-xs text-gray-600">年度合計</span>
            <span className="text-sm font-bold text-gray-700">{formatNTD(result.unionInsurance.annualTotal)}</span>
          </div>
        </div>
      )}
    </Card>
  );
}

function DetailRow({ label, value, minus, bold, highlight }: {
  label: string; value: number; minus?: boolean; bold?: boolean; highlight?: boolean;
}) {
  return (
    <div className={`flex justify-between py-0.5 ${bold ? "font-medium" : ""}`}>
      <span className={`text-xs ${highlight ? "text-blue-700" : "text-gray-600"}`}>{label}</span>
      <span className={`text-xs ${highlight ? "text-blue-700 font-bold" : minus ? "text-red-500" : "text-gray-800"}`}>
        {minus ? "−" : ""}{formatNTD(value)}
      </span>
    </div>
  );
}
