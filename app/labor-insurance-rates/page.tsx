import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

const NAV_LINKS = [
  { href: "/", label: "財務自由" },
  { href: "/tax-calculator", label: "報稅計算" },
  { href: "/mortgage", label: "房貸計算" },
  { href: "/overtime-calculator", label: "加班費" },
  { href: "/severance-calculator", label: "資遣費" },
  { href: "/salary-calculator", label: "月薪試算" },
  { href: "/bonus-calculator", label: "年終獎金" },
  { href: "/pension-calculator", label: "勞退計算" },
  { href: "/basic-living-deduction", label: "免稅天花板" },
  { href: "/labor-insurance-rates", label: "勞健保費率", active: true },
  { href: "/income-tax-brackets", label: "所得稅級距" },
  { href: "/dependent-deduction", label: "扶養節稅" },
  { href: "/freelancer-tax-guide", label: "接案報稅" },
  { href: "/supplement-premium", label: "二代健保" },
  { href: "/salary-vs-freelancer", label: "薪資vs接案" },
  { href: "/tax-filing-guide", label: "報稅攻略" },
  { href: "/dividend-tax", label: "股利申報" },
  { href: "/mortgage-full-cost", label: "買房費用" },
  { href: "/buy-vs-rent", label: "買vs租" },
  { href: "/real-estate-tax", label: "房地合一稅" },
  { href: "/inheritance-tax", label: "遺產稅" },
  { href: "/gift-tax", label: "贈與稅" },
];

// ── 114/115年度 費率（相同，通膨未達調整門檻）─────────────────────
// 勞保費率: 13.0%　員工20% / 雇主70% / 政府10%
// 健保費率: 5.17%　員工30% / 雇主60% / 政府10%
// 二代健保補充保費: 2.11%
// 勞退: 雇主強制6% / 員工自提0–6%
// ─────────────────────────────────────────────────────────────────

const LABOR_BRACKETS = [
  28590, 30300, 31800, 33300, 34800, 36300, 38200, 40100,
  42000, 43900, 45800, 48200, 50600, 53000, 55400, 57800,
  60800, 63800, 66800, 69800, 72800, 76500, 80200, 83900,
  87600, 92100, 96600, 101100, 105600, 110100, 115500, 120900,
  126300, 131700, 137100, 142500, 147900,
];

const HEALTH_EXTRA_BRACKETS = [
  157100, 163500, 169900, 176500, 183000, 189600, 196200,
  202800, 209500, 216200, 219500,
];

export default function LaborInsuranceRatesPage() {
  return (
    <div className="space-y-6 px-4 pt-8 pb-10">
      {/* 工具切換 nav */}
      <div className="flex gap-2 overflow-x-auto text-sm">
        {NAV_LINKS.map(({ href, label, active }) =>
          active ? (
            <div key={href} className="whitespace-nowrap rounded-full bg-teal-600 px-3 py-1.5 font-semibold text-white shadow-sm">
              {label}
            </div>
          ) : (
            <Link key={href} href={href} className="whitespace-nowrap rounded-full border border-gray-200 px-3 py-1.5 font-medium text-gray-600 hover:border-teal-400 hover:text-teal-600 transition">
              {label}
            </Link>
          )
        )}
      </div>

      {/* 標題 */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">勞保、健保費率完整說明</h1>
        <p className="mt-1 text-sm text-gray-500">2026年（115年度）勞保費率 13%、健保費率 5.17%、二代健保補充保費 2.11%</p>
      </div>

      <div className="rounded-xl bg-amber-50 px-4 py-3 text-xs text-amber-700">
        ⚠️ 115年度（2026年5月報稅）費率與114年度相同，因通膨未達調整門檻，扣除額維持不變。本頁數據依財政部及勞動部公告。
      </div>

      <AdUnit />

      {/* 快速總覽 */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-bold text-gray-800">📊 費率快速總覽</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-3 py-2 text-left font-semibold">項目</th>
                <th className="border border-gray-200 px-3 py-2 text-right font-semibold">費率</th>
                <th className="border border-gray-200 px-3 py-2 text-right font-semibold text-blue-700">員工負擔</th>
                <th className="border border-gray-200 px-3 py-2 text-right font-semibold text-green-700">雇主負擔</th>
                <th className="border border-gray-200 px-3 py-2 text-right font-semibold text-gray-500">政府補助</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-3 py-2 font-medium">勞工保險</td>
                <td className="border border-gray-200 px-3 py-2 text-right">13.0%</td>
                <td className="border border-gray-200 px-3 py-2 text-right text-blue-700">20%（2.6%）</td>
                <td className="border border-gray-200 px-3 py-2 text-right text-green-700">70%（9.1%）</td>
                <td className="border border-gray-200 px-3 py-2 text-right text-gray-500">10%（1.3%）</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2 font-medium">全民健康保險</td>
                <td className="border border-gray-200 px-3 py-2 text-right">5.17%</td>
                <td className="border border-gray-200 px-3 py-2 text-right text-blue-700">30%（1.551%）</td>
                <td className="border border-gray-200 px-3 py-2 text-right text-green-700">60%（3.102%）</td>
                <td className="border border-gray-200 px-3 py-2 text-right text-gray-500">10%（0.517%）</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2 font-medium">二代健保補充保費</td>
                <td className="border border-gray-200 px-3 py-2 text-right">2.11%</td>
                <td className="border border-gray-200 px-3 py-2 text-right text-blue-700">100%</td>
                <td className="border border-gray-200 px-3 py-2 text-right text-gray-400">—</td>
                <td className="border border-gray-200 px-3 py-2 text-right text-gray-400">—</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-3 py-2 font-medium">勞退（強制提撥）</td>
                <td className="border border-gray-200 px-3 py-2 text-right">6%</td>
                <td className="border border-gray-200 px-3 py-2 text-right text-gray-400">—</td>
                <td className="border border-gray-200 px-3 py-2 text-right text-green-700">100%（6%）</td>
                <td className="border border-gray-200 px-3 py-2 text-right text-gray-400">—</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-gray-400">費率基礎為投保薪資，非實際月薪；費率 = 投保薪資 × 費率%。</p>
      </section>

      {/* 勞保 */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-800">🔵 勞工保險費率（115年度）</h2>

        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>費率：13.0%</strong>，依勞保投保薪資分級表計算。</p>
          <div className="rounded-xl bg-blue-50 px-4 py-3 text-sm space-y-1">
            <p className="font-semibold text-blue-800">計算公式</p>
            <p>員工每月勞保費 = 投保薪資 × 13% × 20%</p>
            <p className="text-blue-700 font-medium">= 投保薪資 × 2.6%</p>
            <p className="mt-1 text-xs text-gray-500">例：月薪 35,000 → 投保薪資 36,300 → 員工勞保費 = 36,300 × 2.6% ≈ <strong>944 元/月</strong></p>
          </div>
          <p>投保薪資依「勞保投保薪資分級表」往上取最近一級，最低 <strong>28,590 元</strong>，最高 <strong>147,900 元</strong>。</p>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-gray-700">勞保投保薪資分級表（114/115年度，部分）</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-gray-200 px-2 py-1.5 text-left">投保薪資（元）</th>
                  <th className="border border-gray-200 px-2 py-1.5 text-right">員工月繳（元）</th>
                  <th className="border border-gray-200 px-2 py-1.5 text-right">雇主月繳（元）</th>
                </tr>
              </thead>
              <tbody>
                {LABOR_BRACKETS.filter((_, i) => i % 4 === 0 || i === LABOR_BRACKETS.length - 1).map((b) => (
                  <tr key={b} className="even:bg-gray-50">
                    <td className="border border-gray-200 px-2 py-1.5">{b.toLocaleString("zh-TW")}</td>
                    <td className="border border-gray-200 px-2 py-1.5 text-right">{Math.round(b * 0.026).toLocaleString("zh-TW")}</td>
                    <td className="border border-gray-200 px-2 py-1.5 text-right">{Math.round(b * 0.091).toLocaleString("zh-TW")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-1 text-xs text-gray-400">完整37級分級表可至勞動部網站查詢；雇主繳費 = 投保薪資 × 9.1%。</p>
        </div>
      </section>

      {/* 健保 */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-800">🟢 全民健康保險費率（115年度）</h2>

        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>費率：5.17%</strong>，依健保投保薪資分級表計算。</p>
          <div className="rounded-xl bg-green-50 px-4 py-3 text-sm space-y-1">
            <p className="font-semibold text-green-800">計算公式（無眷屬）</p>
            <p>員工每月健保費 = 投保薪資 × 5.17% × 30%</p>
            <p className="text-green-700 font-medium">= 投保薪資 × 1.551%</p>
            <p className="mt-1 text-xs text-gray-500">例：月薪 35,000 → 投保薪資 36,300 → 員工健保費 = 36,300 × 1.551% ≈ <strong>563 元/月</strong></p>
          </div>
          <div className="rounded-xl bg-yellow-50 px-4 py-3 text-sm space-y-1">
            <p className="font-semibold text-yellow-800">眷屬加成計算</p>
            <p>有眷屬（配偶/子女/父母）需額外加付健保費：</p>
            <ul className="ml-4 list-disc space-y-0.5 text-xs">
              <li>每增加 1 名眷屬：員工保費 × 0.7 倍</li>
              <li>眷屬上限：最多計算 3 名（超過3名不再加計）</li>
              <li>1名眷屬：基本保費 × 1.7</li>
              <li>2名眷屬：基本保費 × 2.4</li>
              <li>3名以上：基本保費 × 3.1</li>
            </ul>
          </div>
          <p>健保投保薪資最低 <strong>28,590 元</strong>，最高 <strong>219,500 元</strong>（比勞保多11級）。</p>
        </div>
      </section>

      <AdUnit />

      {/* 二代健保 */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
        <h2 className="text-lg font-bold text-gray-800">🟡 二代健保補充保費（2.11%）</h2>
        <div className="text-sm text-gray-700 space-y-2">
          <p>補充保費針對<strong>投保薪資以外</strong>的所得來源額外課徵，費率 <strong>2.11%</strong>。</p>
          <div className="rounded-xl bg-yellow-50 px-4 py-3 text-sm">
            <p className="font-semibold text-yellow-800 mb-2">六大課徵項目</p>
            <ul className="space-y-1 text-xs text-gray-700">
              <li>① <strong>兼職薪資</strong>：單次或當月累計超過 <strong>20,000 元</strong>的部分</li>
              <li>② <strong>薪資超出健保投保薪資</strong>：當月薪資 - 健保投保薪資上限</li>
              <li>③ <strong>執行業務所得</strong>：如稿費、演講費、版稅等，單次 ≥ 20,000</li>
              <li>④ <strong>股利所得</strong>：全年股利總額（含現金股利+股票股利）≥ 20,000 元</li>
              <li>⑤ <strong>利息所得</strong>：當年度利息所得 ≥ 20,000 元</li>
              <li>⑥ <strong>租金收入</strong>：單次租金 ≥ 20,000 元</li>
            </ul>
          </div>
          <p className="text-xs text-gray-500">💡 一般上班族通常只會遇到①和②，不涉及股利、利息、租金的上班族影響有限。</p>
        </div>
      </section>

      {/* 勞退 */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
        <h2 className="text-lg font-bold text-gray-800">💼 勞工退休金（勞退）費率</h2>
        <div className="text-sm text-gray-700 space-y-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-green-50 px-4 py-3">
              <p className="text-xs text-gray-500 mb-1">雇主強制提撥</p>
              <p className="text-2xl font-bold text-green-700">6%</p>
              <p className="text-xs text-gray-600 mt-1">雇主全額負擔，存入員工個人勞退帳戶，<strong>不扣薪</strong></p>
            </div>
            <div className="rounded-xl bg-blue-50 px-4 py-3">
              <p className="text-xs text-gray-500 mb-1">員工自願提撥</p>
              <p className="text-2xl font-bold text-blue-700">0–6%</p>
              <p className="text-xs text-gray-600 mt-1">員工自願，自提金額可<strong>全額免計入薪資所得</strong>（抵稅）</p>
            </div>
          </div>
          <p>自提 1% 等於月薪 35,000 元的員工每月提撥 350 元，全年 4,200 元完全不課稅。邊際稅率 12% 的話，等於政府幫你出 504 元。</p>
          <Link href="/pension-calculator" className="inline-block text-sm font-semibold text-blue-600 underline">
            → 用勞退自提節稅計算器試算我能省多少稅
          </Link>
        </div>
      </section>

      {/* 常見問題 */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-800">❓ 常見問題</h2>

        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <p className="font-semibold">Q：為什麼薪資單上的勞保費和算出來不一樣？</p>
            <p className="mt-1 text-gray-600">勞保費是依「投保薪資分級表」四捨五入取整數計算，不是直接用實際月薪 × 2.6%。例如月薪 35,000 元，投保薪資會取 36,300 元（往上取最近一級），所以費用會稍高於月薪 × 2.6%。</p>
          </div>
          <div>
            <p className="font-semibold">Q：試用期勞健保費率有沒有不同？</p>
            <p className="mt-1 text-gray-600">沒有。只要是正式勞動契約，試用期員工享有相同的勞健保保障，費率完全相同。雇主必須在勞工到職當天申報加保。</p>
          </div>
          <div>
            <p className="font-semibold">Q：健保眷屬要另外繳費嗎？</p>
            <p className="mt-1 text-gray-600">需要。每新增1名眷屬，員工健保費增加 0.7 倍的基本保費。但眷屬本人不用另外投保，其保障由主要被保險人（你）的健保費涵蓋。</p>
          </div>
          <div>
            <p className="font-semibold">Q：115年度費率跟114年度一樣嗎？</p>
            <p className="mt-1 text-gray-600">是的。依政府公告，115年度（2026年申報）因通膨率未達調整門檻，勞保費率、健保費率、免稅額、扣除額均維持與114年度相同。</p>
          </div>
        </div>
      </section>

      {/* CTA 到月薪計算器 */}
      <div className="rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50 p-5">
        <p className="text-sm font-bold text-gray-800">馬上算你的實拿薪資 💰</p>
        <p className="mt-1 text-xs text-gray-500">輸入月薪，自動計算勞保、健保、勞退扣款後的到手薪資，還能看雇主總人事成本</p>
        <Link
          href="/salary-calculator"
          className="mt-3 block rounded-xl bg-teal-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
        >
          月薪試算計算器 →
        </Link>
      </div>

      <TaxAffiliateCTA />
    </div>
  );
}
