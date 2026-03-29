"use client";

/**
 * Affiliate CTA blocks for monetization.
 *
 * TODO: Replace placeholder hrefs with real Money101/蝦皮聯盟 affiliate links
 * once Ian signs up for those programs.
 * - Money101 申請: https://www.money101.com.tw/affiliate
 * - 聯盟網: https://www.affiliates.com.tw
 */

export function MortgageAffiliateCTA() {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5">
      <p className="text-sm font-bold text-gray-800">
        想知道哪家銀行利率最低？
      </p>
      <p className="mt-1 text-xs text-gray-500">
        各銀行房貸條件差很多，利率差 0.3% 在 30 年下來差幾十萬
      </p>
      <a
        href="https://www.money101.com.tw/mortgage"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 block rounded-xl bg-emerald-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
      >
        比較各銀行房貸方案（免費）→
      </a>
      <p className="mt-2 text-center text-xs text-gray-400">
        透過 Money101 比較，找到最適合你的方案
      </p>
    </div>
  );
}

export function TaxAffiliateCTA() {
  return (
    <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-5">
      <p className="text-sm font-bold text-gray-800">
        第一次報稅沒把握？找會計師幫你
      </p>
      <p className="mt-1 text-xs text-gray-500">
        自由工作者報稅眉角多，找專業的一次搞定比自己搞省更多
      </p>
      <a
        href="https://www.money101.com.tw/tax"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 block rounded-xl bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
      >
        比較報稅服務方案 →
      </a>
    </div>
  );
}
