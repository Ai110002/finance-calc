"use client";

import { useState } from "react";
import type { TaxTip, TaxResult } from "@/lib/tax-types";
import { formatNTD } from "@/lib/format";

const CATEGORY_STYLES: Record<string, { bg: string; text: string; icon: string }> = {
  deduction: { bg: "bg-blue-50 ring-blue-200", text: "text-blue-700", icon: "📋" },
  income: { bg: "bg-green-50 ring-green-200", text: "text-green-700", icon: "💰" },
  insurance: { bg: "bg-amber-50 ring-amber-200", text: "text-amber-700", icon: "🛡️" },
  general: { bg: "bg-purple-50 ring-purple-200", text: "text-purple-700", icon: "💡" },
};

const CATEGORY_LABELS: Record<string, string> = {
  deduction: "扣除額",
  income: "所得",
  insurance: "保險",
  general: "一般",
};

const FAQ_ITEMS = [
  {
    q: "自由工作者一定要報稅嗎？",
    a: "只要年度綜合所得超過免稅額 + 標準扣除額（單身約 237,000），就需要報稅。即使不用繳稅，也建議申報以建立所得記錄，有助於貸款和簽證。",
  },
  {
    q: "9A 和 9B 有什麼差別？",
    a: "9A 是「執行業務所得」，適用於有專業證照或固定執業的自由工作者（律師、醫師、設計師等），政府會根據你的職業認定一定比例是成本，只對剩下的部分課稅。9B 是「稿費、版稅、樂譜、作曲、編劇、漫畫」所得，前 18 萬完全免稅，超過的部分也有 30% 算成本不課稅。",
  },
  {
    q: "標準扣除額和列舉扣除額怎麼選？",
    a: "如果你的可列舉項目（保險費、醫藥費、房租等）加起來超過標準扣除額（單身 136,000），就選列舉。否則選標準比較簡單。本工具會自動幫你比較。",
  },
  {
    q: "二代健保補充保費怎麼算？",
    a: "執行業務所得、稿費、租金、股利等，單筆 ≥ 20,000 元時，扣繳 2.11% 補充保費。由付款方代扣代繳。",
  },
  {
    q: "2026 年有什麼新的稅制變動？",
    a: "2026 年（114 年度）主要變動：新增「租金支出特別扣除額」上限 18 萬，租屋族不需選列舉也能扣除房租。各項免稅額、扣除額也有微調。",
  },
];

interface Props {
  tips: TaxTip[];
  result: TaxResult;
}

export function TipsSection({ tips, result }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="border-b border-gray-100 bg-gradient-to-r from-cyan-50 to-white px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-600 text-sm font-bold text-white shadow-sm">5</div>
          <div>
            <h2 className="text-base font-bold text-gray-900">省稅建議</h2>
            <p className="text-xs text-gray-500">根據你的資料，給你最實用的建議</p>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* 動態建議 */}
        {tips.length > 0 ? (
          <div className="space-y-2.5">
            {tips.map(tip => {
              const style = CATEGORY_STYLES[tip.category] ?? CATEGORY_STYLES.general;
              return (
                <div key={tip.id} className={`rounded-xl p-3.5 ring-1 ${style.bg}`}>
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 text-base">{style.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-800">{tip.title}</span>
                        <span className={`rounded-full bg-white/80 px-2 py-0.5 text-xs font-medium ${style.text}`}>
                          {CATEGORY_LABELS[tip.category] ?? "一般"}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-gray-600">{tip.description}</p>
                      {tip.potentialSavings != null && tip.potentialSavings > 0 && (
                        <div className="mt-2 inline-flex items-center gap-1 rounded-lg bg-white/80 px-2.5 py-1">
                          <span className="text-xs">💰</span>
                          <span className="text-xs font-bold text-green-700">
                            可能省下 {formatNTD(tip.potentialSavings)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-200 py-8 text-center">
            <p className="text-2xl">📝</p>
            <p className="mt-2 text-sm text-gray-400">填入更多資料後會自動產生省稅建議</p>
          </div>
        )}

        {/* CTA 區域 */}
        {result.taxAmount > 30_000 && (
          <div className="mt-5 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 p-5 text-white shadow-lg shadow-blue-200">
            <div className="flex items-center gap-2">
              <span className="text-lg">💳</span>
              <span className="text-base font-bold">稅額較大？善用繳稅工具</span>
            </div>
            <p className="mt-2 text-sm text-blue-100 leading-relaxed">
              多家銀行提供信用卡繳稅分期 0 利率，或報稅貸款低利方案。
            </p>
            <div className="mt-4 flex gap-2">
              <a href="https://www.money101.com.tw/blog/tax-credit-card" target="_blank" rel="noopener noreferrer"
                className="flex-1 rounded-xl bg-white/20 py-2.5 text-center text-sm font-semibold backdrop-blur-sm transition hover:bg-white/30">
                繳稅信用卡比較
              </a>
              <a href="https://www.money101.com.tw/blog/tax-loan" target="_blank" rel="noopener noreferrer"
                className="flex-1 rounded-xl bg-white/20 py-2.5 text-center text-sm font-semibold backdrop-blur-sm transition hover:bg-white/30">
                報稅貸款方案
              </a>
            </div>
          </div>
        )}

        {/* FAQ 手風琴 */}
        <div className="mt-6">
          <h3 className="flex items-center gap-2 text-sm font-bold text-gray-800">
            <span>❓</span> 常見問題
          </h3>
          <div className="mt-3 space-y-2">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-gray-200 transition-all hover:shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-gray-50"
                >
                  <span className="pr-4 text-sm font-medium text-gray-700">{item.q}</span>
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all ${
                    openFaq === i ? "rotate-45 bg-blue-600 text-white" : "bg-gray-100 text-gray-400"
                  }`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 text-xs leading-relaxed text-gray-600">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 找會計師 CTA */}
        <div className="mt-5 rounded-2xl border-2 border-dashed border-gray-200 p-5 text-center">
          <span className="text-2xl">👨‍💼</span>
          <p className="mt-2 text-sm font-semibold text-gray-700">情況比較複雜？</p>
          <p className="mt-1 text-xs text-gray-400">建議諮詢專業會計師，確保報稅正確無誤</p>
        </div>
      </div>
    </div>
  );
}
