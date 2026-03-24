"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import type { TaxTip, TaxResult } from "@/lib/tax-types";
import { formatNTD } from "@/lib/format";

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  deduction: { bg: "bg-blue-100", text: "text-blue-700" },
  income: { bg: "bg-green-100", text: "text-green-700" },
  insurance: { bg: "bg-amber-100", text: "text-amber-700" },
  general: { bg: "bg-purple-100", text: "text-purple-700" },
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
    a: "9A 是「執行業務所得」，適用於有專業證照或固定執業的自由工作者（律師、醫師、設計師等），有固定費用率。9B 是「稿費、版稅、樂譜、作曲、編劇、漫畫」所得，前 18 萬免稅，超額部分有 30% 費用率。",
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
    <Card>
      <h2 className="text-lg font-semibold">
        <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm text-white">5</span>
        省稅建議
      </h2>

      {/* 動態建議 */}
      {tips.length > 0 ? (
        <div className="mt-4 space-y-2">
          {tips.map(tip => {
            const color = CATEGORY_COLORS[tip.category] ?? CATEGORY_COLORS.general;
            return (
              <div key={tip.id} className="rounded-xl border border-gray-200 bg-white p-3">
                <div className="flex items-start gap-2">
                  <span className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-xs font-medium ${color.bg} ${color.text}`}>
                    {CATEGORY_LABELS[tip.category] ?? "一般"}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-gray-800">{tip.title}</div>
                    <p className="mt-0.5 text-xs text-gray-500">{tip.description}</p>
                    {tip.potentialSavings != null && tip.potentialSavings > 0 && (
                      <p className="mt-1 text-xs font-medium text-green-600">
                        可能省下 {formatNTD(tip.potentialSavings)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-4 text-xs text-gray-400">目前沒有特別的省稅建議，填入更多資料後會自動產生。</p>
      )}

      {/* CTA 區域 */}
      {result.taxAmount > 30_000 && (
        <div className="mt-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white">
          <div className="text-sm font-semibold">稅額較大？善用繳稅工具</div>
          <p className="mt-1 text-xs text-blue-100">
            多家銀行提供信用卡繳稅分期 0 利率，或報稅貸款低利方案。
          </p>
          <div className="mt-3 flex gap-2">
            <a href="https://www.money101.com.tw/blog/tax-credit-card" target="_blank" rel="noopener noreferrer"
              className="rounded-lg bg-white/20 px-3 py-1.5 text-xs font-medium backdrop-blur hover:bg-white/30">
              繳稅信用卡比較
            </a>
            <a href="https://www.money101.com.tw/blog/tax-loan" target="_blank" rel="noopener noreferrer"
              className="rounded-lg bg-white/20 px-3 py-1.5 text-xs font-medium backdrop-blur hover:bg-white/30">
              報稅貸款方案
            </a>
          </div>
        </div>
      )}

      {/* FAQ 手風琴 */}
      <div className="mt-5">
        <h3 className="text-sm font-medium text-gray-700">常見問題</h3>
        <div className="mt-2 space-y-1">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="rounded-xl border border-gray-200">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between px-3 py-2.5 text-left"
              >
                <span className="text-sm font-medium text-gray-700">{item.q}</span>
                <span className="ml-2 shrink-0 text-gray-400">{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && (
                <div className="border-t border-gray-100 px-3 py-2.5 text-xs text-gray-600 leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 找會計師 CTA */}
      <div className="mt-4 rounded-xl bg-gray-100 p-3 text-center">
        <p className="text-sm text-gray-600">情況比較複雜？</p>
        <p className="mt-1 text-xs text-gray-400">建議諮詢專業會計師，確保報稅正確無誤</p>
      </div>
    </Card>
  );
}
