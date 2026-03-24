"use client";

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
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="border-b border-gray-100 bg-gradient-to-r from-amber-50 to-white px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-sm font-bold text-white shadow-sm">4</div>
          <div>
            <h2 className="text-base font-bold text-gray-900">試算結果</h2>
            <p className="text-xs text-gray-500">預估稅額、級距分布、完整明細</p>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* 大字稅額 - Hero Card */}
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 p-6 text-white shadow-lg shadow-blue-200">
          <div className="text-center">
            <p className="text-sm text-blue-200">預估應繳所得稅</p>
            <p className="mt-2 text-4xl font-extrabold tracking-tight">{formatNTD(result.taxAmount)}</p>
            <div className="mt-4 flex justify-center gap-6">
              <div className="rounded-xl bg-white/15 px-4 py-2 backdrop-blur-sm">
                <p className="text-xs text-blue-200">有效稅率</p>
                <p className="text-lg font-bold">{formatPercent(result.effectiveRate)}</p>
              </div>
              <div className="rounded-xl bg-white/15 px-4 py-2 backdrop-blur-sm">
                <p className="text-xs text-blue-200">邊際稅率</p>
                <p className="text-lg font-bold">{formatPercent(result.marginalRate * 100, 0)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 逐行明細 */}
        <div className="mt-5 rounded-xl bg-gray-50 p-4">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">計算明細</h3>
          <div className="space-y-1.5">
            <DetailRow label="綜合所得總額" value={result.totalGrossIncome} />
            <DetailRow label="− 必要費用/免稅" value={result.totalGrossIncome - result.totalNetIncome} minus />
            <DetailRow label="= 所得淨額" value={result.totalNetIncome} bold />
            <div className="my-1 border-t border-gray-200" />
            <DetailRow label="− 免稅額" value={result.exemptionAmount} minus />
            <DetailRow label={`− ${result.deductionMethod === "standard" ? "標準" : "列舉"}扣除額`} value={result.appliedDeduction} minus />
            <DetailRow label="− 特別扣除額" value={result.specialDeductionTotal} minus />
            {result.basicLivingDifference > 0 && (
              <DetailRow label="− 基本生活費差額" value={result.basicLivingDifference} minus />
            )}
            <div className="my-1 border-t border-gray-200" />
            <DetailRow label="= 綜合所得淨額" value={result.taxableIncome} bold />
            <div className="my-1 border-t-2 border-gray-300" />
            <DetailRow label="應納稅額" value={result.taxAmount} bold highlight />
          </div>
        </div>

        {/* 級距圖 */}
        {bracketData.length > 0 && (
          <div className="mt-5">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gray-200 text-xs">📊</span>
              稅率級距分布
            </h3>
            <div className="rounded-xl bg-gray-50 p-3">
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={bracketData} layout="vertical" margin={{ left: 0, right: 10 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="rate" width={40} tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value) => formatNTD(Number(value))}
                    labelFormatter={(label) => `稅率 ${label}`}
                    contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12 }}
                  />
                  <Bar dataKey="tax" radius={[0, 8, 8, 0]}>
                    {bracketData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 圓餅圖 */}
        {pieData.length > 0 && (
          <div className="mt-5">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gray-200 text-xs">🍩</span>
              所得分配
            </h3>
            <div className="rounded-xl bg-gray-50 p-3">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%" cy="50%"
                    innerRadius={55} outerRadius={85}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => formatNTD(Number(value))}
                    contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 flex flex-wrap justify-center gap-3">
                {pieData.map((d, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.fill }} />
                    <span className="text-xs text-gray-600">{d.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 二代健保 */}
        {result.nhiResult.supplementaryPremium > 0 && (
          <div className="mt-5 overflow-hidden rounded-xl border border-amber-200">
            <div className="bg-amber-50 px-4 py-3">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-amber-800">
                  <span>🏥</span> 二代健保補充保費
                </h3>
                <span className="text-xl font-bold text-amber-700">
                  {formatNTD(result.nhiResult.supplementaryPremium)}
                </span>
              </div>
            </div>
            <div className="bg-white px-4 py-3 space-y-1.5">
              {result.nhiResult.details.map((d, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="text-gray-600">{d.source}（{formatNTD(d.amount)}）</span>
                  <span className="font-semibold text-amber-700">{formatNTD(d.premium)}</span>
                </div>
              ))}
              <p className="pt-1 text-xs text-gray-400">費率 2.11%，單筆所得 ≥ 20,000 元時扣繳</p>
            </div>
          </div>
        )}

        {/* 勞健保 */}
        {result.unionInsurance.annualTotal > 0 && (
          <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
            <div className="bg-gray-50 px-4 py-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <span>🏛️</span> 勞健保估算（工會投保）
              </h3>
            </div>
            <div className="bg-white p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-blue-50 p-3 text-center">
                  <div className="text-xs text-gray-500">勞保/月</div>
                  <div className="mt-1 text-base font-bold text-blue-700">{formatNTD(result.unionInsurance.laborInsurance)}</div>
                </div>
                <div className="rounded-xl bg-green-50 p-3 text-center">
                  <div className="text-xs text-gray-500">健保/月</div>
                  <div className="mt-1 text-base font-bold text-green-700">{formatNTD(result.unionInsurance.healthInsurance)}</div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between rounded-xl bg-gray-900 px-4 py-3 text-white">
                <span className="text-sm">年度合計</span>
                <span className="text-lg font-bold">{formatNTD(result.unionInsurance.annualTotal)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailRow({ label, value, minus, bold, highlight }: {
  label: string; value: number; minus?: boolean; bold?: boolean; highlight?: boolean;
}) {
  return (
    <div className={`flex justify-between py-0.5 ${bold ? "font-medium" : ""}`}>
      <span className={`text-xs ${highlight ? "text-blue-700 font-semibold" : "text-gray-600"}`}>{label}</span>
      <span className={`text-xs tabular-nums ${
        highlight ? "text-blue-700 font-bold text-sm" : minus ? "text-red-500" : "text-gray-800 font-medium"
      }`}>
        {minus ? "−" : ""}{formatNTD(value)}
      </span>
    </div>
  );
}
