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
  { href: "/labor-insurance-rates", label: "勞健保費率" },
  { href: "/income-tax-brackets", label: "所得稅級距", active: true },
  { href: "/dependent-deduction", label: "扶養節稅" },
  { href: "/freelancer-tax-guide", label: "接案報稅" },
  { href: "/supplement-premium", label: "二代健保" },
  { href: "/salary-vs-freelancer", label: "薪資vs接案" },
  { href: "/tax-filing-guide", label: "報稅攻略" },
  { href: "/dividend-tax", label: "股利申報" },
  { href: "/mortgage-full-cost", label: "買房費用" },
  { href: "/buy-vs-rent", label: "買vs租" },
  { href: "/real-estate-tax", label: "房地合一稅" },
  { href: "/house-tax", label: "房屋稅" },
  { href: "/labor-retirement", label: "勞退新制" },
  { href: "/inheritance-tax", label: "遺產稅" },
  { href: "/gift-tax", label: "贈與稅" },
  { href: "/deduction-compare", label: "列舉vs標準" },
];

// ── 115年度（2026年5月申報）綜合所得稅五級累進稅率 ────────────────────
// 依財政部 114 年度稅率表（115年度申報同）
// ────────────────────────────────────────────────────────────────────
const TAX_BRACKETS = [
  { min: 0, max: 590000, rate: 0.05, deduction: 0 },
  { min: 590001, max: 1330000, rate: 0.12, deduction: 41300 },
  { min: 1330001, max: 2660000, rate: 0.20, deduction: 147700 },
  { min: 2660001, max: 4980000, rate: 0.30, deduction: 413700 },
  { min: 4980001, max: Infinity, rate: 0.40, deduction: 911700 },
];

// 速算公式：應納稅額 = 所得淨額 × 稅率 − 累進差額
// 速算差額（累進差額）
const CUMULATIVE_DEDUCTIONS = [0, 41300, 147700, 413700, 911700];

// 常見薪資情境試算（單身、無受扶養，薪資所得，採標準扣除）
// 所得淨額 = 年薪 − 97000（免稅額）− 131000（標準扣除）− 218000（薪資特別扣除）= 年薪 − 446000
// 但薪資特別扣除上限 218,000
function calcExampleTax(annualSalary: number) {
  const personalExemption = 97000;
  const standardDeduction = 131000;
  const salaryDeduction = Math.min(annualSalary, 218000);
  const netIncome = Math.max(0, annualSalary - personalExemption - standardDeduction - salaryDeduction);

  let tax = 0;
  for (const bracket of TAX_BRACKETS) {
    if (netIncome <= 0) break;
    if (bracket.min <= netIncome) {
      const taxable = Math.min(netIncome, bracket.max === Infinity ? netIncome : bracket.max) - bracket.min + 1;
      if (taxable > 0 && netIncome >= bracket.min) {
        tax = netIncome * bracket.rate - bracket.deduction;
        break;
      }
    }
  }
  // Use speed formula directly
  let speedTax = 0;
  for (let i = TAX_BRACKETS.length - 1; i >= 0; i--) {
    if (netIncome >= TAX_BRACKETS[i].min) {
      speedTax = Math.round(netIncome * TAX_BRACKETS[i].rate - CUMULATIVE_DEDUCTIONS[i]);
      break;
    }
  }

  const effectiveRate = annualSalary > 0 ? (speedTax / annualSalary) * 100 : 0;
  return { netIncome, tax: Math.max(0, speedTax), effectiveRate };
}

const SALARY_EXAMPLES = [
  { label: "年薪 50 萬", salary: 500000 },
  { label: "年薪 70 萬", salary: 700000 },
  { label: "年薪 100 萬", salary: 1000000 },
  { label: "年薪 150 萬", salary: 1500000 },
  { label: "年薪 200 萬", salary: 2000000 },
  { label: "年薪 300 萬", salary: 3000000 },
  { label: "年薪 500 萬", salary: 5000000 },
];

export default function IncomeTaxBracketsPage() {
  return (
    <div className="space-y-6 px-4 pt-8 pb-10">
      {/* nav */}
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
        <h1 className="text-2xl font-bold">115年度所得稅級距完整表</h1>
        <p className="mt-1 text-sm text-gray-500">2026年5月申報適用｜五級累進稅率 5%～40%｜含速算公式與試算</p>
      </div>

      <div className="rounded-xl bg-amber-50 px-4 py-3 text-xs text-amber-700">
        ⚠️ 本頁適用 <strong>115年度（2026年5月申報）</strong>綜合所得稅，申報的是2025年1月～12月的所得。稅率依財政部公告，免稅額及扣除額與114年度相同。
      </div>

      <AdUnit />

      {/* 稅率表 */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-bold text-gray-800">📊 五級累進稅率表（115年度）</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-3 py-2 text-left font-semibold">級距</th>
                <th className="border border-gray-200 px-3 py-2 text-left font-semibold">所得淨額範圍</th>
                <th className="border border-gray-200 px-3 py-2 text-right font-semibold text-red-700">稅率</th>
                <th className="border border-gray-200 px-3 py-2 text-right font-semibold text-gray-500">累進差額</th>
              </tr>
            </thead>
            <tbody>
              {[
                { level: "第一級", range: "0 元 ～ 590,000 元", rate: "5%", deduction: "—" },
                { level: "第二級", range: "590,001 元 ～ 1,330,000 元", rate: "12%", deduction: "41,300 元" },
                { level: "第三級", range: "1,330,001 元 ～ 2,660,000 元", rate: "20%", deduction: "147,700 元" },
                { level: "第四級", range: "2,660,001 元 ～ 4,980,000 元", rate: "30%", deduction: "413,700 元" },
                { level: "第五級", range: "4,980,001 元以上", rate: "40%", deduction: "911,700 元" },
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-gray-50" : ""}>
                  <td className="border border-gray-200 px-3 py-2 font-medium text-gray-700">{row.level}</td>
                  <td className="border border-gray-200 px-3 py-2 text-gray-700">{row.range}</td>
                  <td className="border border-gray-200 px-3 py-2 text-right font-bold text-red-700">{row.rate}</td>
                  <td className="border border-gray-200 px-3 py-2 text-right text-gray-500">{row.deduction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-gray-400">累進差額用於速算公式：應納稅額 = 所得淨額 × 稅率 − 累進差額。115年度稅率與114年度相同。</p>
      </section>

      {/* 速算公式 */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-800">🧮 速算公式怎麼用</h2>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="rounded-xl bg-blue-50 px-4 py-3">
            <p className="font-semibold text-blue-800 mb-1">兩步驟算出應繳稅額</p>
            <p className="font-mono text-blue-700">① 算所得淨額 = 全年所得 − 免稅額 − 扣除額 − 特別扣除額</p>
            <p className="font-mono text-blue-700 mt-1">② 應納稅額 = 所得淨額 × 對應稅率 − 累進差額</p>
          </div>
          <div className="rounded-xl bg-green-50 px-4 py-3 space-y-2">
            <p className="font-semibold text-green-800">實例：年薪 100 萬，單身，無受扶養人</p>
            <div className="text-xs space-y-1 text-gray-700">
              <p>年薪 1,000,000</p>
              <p>− 免稅額 97,000（本人）</p>
              <p>− 標準扣除額 131,000（單身）</p>
              <p>− 薪資特別扣除額 218,000</p>
              <p className="border-t border-green-200 pt-1 font-semibold">= 所得淨額 <strong>554,000 元</strong>（落在第一級 5%）</p>
              <p className="font-semibold text-green-700">應納稅額 = 554,000 × 5% − 0 = <strong>27,700 元</strong></p>
              <p className="text-gray-500">有效稅率 = 27,700 ÷ 1,000,000 ≈ <strong>2.77%</strong>（比 5% 低很多！）</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 bg-yellow-50 px-3 py-2 rounded-lg">
            💡 <strong>有效稅率</strong>永遠低於邊際稅率。「被扣到 20% 稅率」≠「薪水的 20% 都繳稅」，只有超過 1,330,000 元的部分才按 20% 計算。
          </p>
        </div>
      </section>

      {/* 115年度扣除額一覽 */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
        <h2 className="text-lg font-bold text-gray-800">📋 115年度免稅額與扣除額一覽</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-3 py-2 text-left font-semibold">項目</th>
                <th className="border border-gray-200 px-3 py-2 text-right font-semibold">金額</th>
                <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-500">說明</th>
              </tr>
            </thead>
            <tbody>
              {[
                { item: "免稅額（本人/配偶/受扶養親屬）", amount: "97,000", note: "每人各一份" },
                { item: "免稅額（70歲以上長輩）", amount: "145,500", note: "每人各一份，比一般多 50%" },
                { item: "標準扣除額（單身）", amount: "131,000", note: "不用備證明，直接扣" },
                { item: "標準扣除額（夫妻合申）", amount: "262,000", note: "等於兩倍單身" },
                { item: "薪資特別扣除額", amount: "218,000", note: "有薪資所得者每人可扣" },
                { item: "身心障礙特別扣除額", amount: "218,000", note: "每位障礙者可扣" },
                { item: "幼兒學前特別扣除額", amount: "150,000", note: "5歲以下子女每人可扣" },
                { item: "教育學費特別扣除額", amount: "25,000", note: "大學以上子女，限一人" },
                { item: "長期照顧特別扣除額", amount: "120,000", note: "需符合長照認定資格" },
                { item: "基本生活費差額", amount: "202,000/人", note: "115年度調升至 202,000" },
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-gray-50" : ""}>
                  <td className="border border-gray-200 px-3 py-2 font-medium text-gray-700">{row.item}</td>
                  <td className="border border-gray-200 px-3 py-2 text-right font-semibold text-teal-700">{row.amount}</td>
                  <td className="border border-gray-200 px-3 py-2 text-xs text-gray-500">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-3 mt-2">
          <Link href="/basic-living-deduction" className="text-xs text-blue-600 underline">
            → 基本生活費差額計算器（算你能多扣多少）
          </Link>
        </div>
      </section>

      <AdUnit />

      {/* 常見薪資試算 */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
        <h2 className="text-lg font-bold text-gray-800">💰 各薪資應繳稅額試算（115年度）</h2>
        <p className="text-xs text-gray-500">假設：單身、無受扶養人、全部為薪資所得、採標準扣除額</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-3 py-2 text-left font-semibold">年薪</th>
                <th className="border border-gray-200 px-3 py-2 text-right font-semibold">所得淨額</th>
                <th className="border border-gray-200 px-3 py-2 text-right font-semibold text-red-700">應納稅額</th>
                <th className="border border-gray-200 px-3 py-2 text-right font-semibold text-gray-500">有效稅率</th>
                <th className="border border-gray-200 px-3 py-2 text-right font-semibold text-blue-700">適用級距</th>
              </tr>
            </thead>
            <tbody>
              {SALARY_EXAMPLES.map(({ label, salary }, i) => {
                const { netIncome, tax, effectiveRate } = calcExampleTax(salary);
                const bracket = TAX_BRACKETS.findIndex(b => netIncome <= b.max);
                const bracketIdx = bracket === -1 ? 4 : bracket;
                const rateLabel = ["5%", "12%", "20%", "30%", "40%"][bracketIdx];
                return (
                  <tr key={label} className={i % 2 === 1 ? "bg-gray-50" : ""}>
                    <td className="border border-gray-200 px-3 py-2 font-medium">{label}</td>
                    <td className="border border-gray-200 px-3 py-2 text-right text-gray-600">{netIncome.toLocaleString("zh-TW")}</td>
                    <td className="border border-gray-200 px-3 py-2 text-right font-semibold text-red-700">{tax.toLocaleString("zh-TW")}</td>
                    <td className="border border-gray-200 px-3 py-2 text-right text-gray-500">{effectiveRate.toFixed(2)}%</td>
                    <td className="border border-gray-200 px-3 py-2 text-right text-blue-700 font-medium">{rateLabel}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400">以上僅為估算，實際稅額需依個人免稅額、扣除額、所得類別調整。建議使用下方報稅計算器精算。</p>
      </section>

      {/* 邊際稅率 vs 有效稅率 */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
        <h2 className="text-lg font-bold text-gray-800">🤔 邊際稅率 vs 有效稅率，差在哪？</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>邊際稅率</strong>：你「最後一塊錢」所得適用的稅率。年薪 200 萬的人，超過 133 萬的部分按 20% 課稅，但前面 133 萬的部分仍按較低稅率計算。</p>
          <p><strong>有效稅率</strong>：你實際繳的稅 ÷ 總年薪，永遠低於邊際稅率。</p>
          <div className="rounded-xl bg-orange-50 px-4 py-3 text-xs">
            <p className="font-semibold text-orange-800 mb-1">常見誤解：「薪水漲到下一個級距，扣更多划不來」</p>
            <p className="text-gray-700">❌ 錯。只有「超出那條線」的部分才用新稅率。就算所得淨額從 130 萬漲到 135 萬，只有多出的 5 萬按 20% 計算（= 多繳 10,000 元），不是整個 135 萬都按 20%。</p>
            <p className="mt-1 text-gray-700">✅ 漲薪永遠划算，因為實際到手一定增加。</p>
          </div>
        </div>
      </section>

      {/* CTA 到報稅計算器 */}
      <div className="rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50 p-5">
        <p className="text-sm font-bold text-gray-800">精算你的報稅金額 🧾</p>
        <p className="mt-1 text-xs text-gray-500">輸入你的薪資、配偶、子女、受扶養人數，自動套用115年度免稅額與扣除額，算出應繳稅額與退稅金額</p>
        <Link
          href="/tax-calculator"
          className="mt-3 block rounded-xl bg-teal-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
        >
          報稅計算器（115年度）→
        </Link>
      </div>

      {/* 常見問題 */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-800">❓ 常見問題</h2>
        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <p className="font-semibold">Q：115年度稅率和114年度一樣嗎？</p>
            <p className="mt-1 text-gray-600">稅率五個級距（5%/12%/20%/30%/40%）及各級距金額維持不變。主要調整是基本生活費由 196,000 調升至 202,000 元，讓家庭人口多的納稅人可多扣一些。</p>
          </div>
          <div>
            <p className="font-semibold">Q：所得淨額低於零，還要繳稅嗎？</p>
            <p className="mt-1 text-gray-600">不需要。若扣除免稅額與各項扣除額後所得淨額為負數（常見於低薪、家庭人口多），應納稅額為零，且可能有退稅（如已預繳扶養人相關稅款）。</p>
          </div>
          <div>
            <p className="font-semibold">Q：列舉扣除 vs 標準扣除，哪個比較划算？</p>
            <p className="mt-1 text-gray-600">若有大筆捐款、房貸利息、醫療費，列舉扣除可能更高。但多數上班族每年列舉不超過標準扣除額（單身 131,000、夫妻 262,000），直接選標準扣除更省事。可用報稅計算器兩個都算看看。</p>
          </div>
          <div>
            <p className="font-semibold">Q：年終獎金要計入所得嗎？</p>
            <p className="mt-1 text-gray-600">是的。年終獎金屬薪資所得，全額計入當年度所得申報。但薪資特別扣除額 218,000 元可以扣掉，實際影響端看總所得落在哪個級距。<Link href="/bonus-calculator" className="text-blue-600 underline">→ 年終獎金稅額計算器</Link></p>
          </div>
        </div>
      </section>

      <TaxAffiliateCTA />
    </div>
  );
}
