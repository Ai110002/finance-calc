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
  { href: "/income-tax-brackets", label: "所得稅級距" },
  { href: "/dependent-deduction", label: "扶養節稅" },
  { href: "/freelancer-tax-guide", label: "接案報稅" },
  { href: "/supplement-premium", label: "二代健保", active: true },
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
  { href: "/preschool-deduction", label: "幼兒學前扣除" },
];

// ── 115年度（114年所得，2026年5月申報）─────────────────────────────────
// 全民健康保險法第31條 / 衛福部公告
// 補充保費費率：2.11%（107年1月起）
// 最低投保金額：27,470元（110年7月起）
// ─────────────────────────────────────────────────────────────────────
const SUPP_RATE = 0.0211;
const MIN_INSURED = 27_470;
const HIGH_BONUS_THRESHOLD = MIN_INSURED * 4; // 109,880

function calcSuppPremium(base: number): number {
  return Math.round(base * SUPP_RATE);
}

function formatNTD(n: number) {
  return n.toLocaleString("zh-TW");
}

// 接案收入試算範例
const FREELANCE_EXAMPLES = [
  50_000, 100_000, 200_000, 300_000,
  500_000, 800_000, 1_000_000, 1_500_000,
];

// 獎金試算範例（超過門檻部分）
const BONUS_EXAMPLES = [
  { gross: 50_000,   label: "5萬" },
  { gross: 100_000,  label: "10萬" },
  { gross: 150_000,  label: "15萬" },
  { gross: 200_000,  label: "20萬" },
  { gross: 300_000,  label: "30萬" },
  { gross: 500_000,  label: "50萬" },
  { gross: 1_000_000, label: "100萬" },
];

// 股利試算範例
const DIVIDEND_EXAMPLES = [
  20_000, 50_000, 100_000, 200_000, 500_000,
];

export default function SupplementPremiumPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Nav ── */}
      <nav className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 py-2">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`whitespace-nowrap rounded-full border px-3 py-1 text-sm transition ${
                  l.active
                    ? "border-teal-500 bg-teal-50 font-semibold text-teal-700"
                    : "border-gray-200 text-gray-600 hover:border-teal-400 hover:text-teal-600"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-4 py-8 space-y-8">
        {/* ── Hero ── */}
        <section>
          <p className="text-sm font-medium text-teal-600">115年度 · 114年所得 · 費率 2.11%</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900 leading-snug">
            二代健保補充保費完整指南
          </h1>
          <p className="mt-3 text-gray-600 leading-relaxed">
            除了一般月薪繳的健保費之外，以下六大類所得還需要額外繳納<strong>補充保費</strong>，
            費率 <strong>2.11%</strong>，由付款方代扣。很多人不知道自己被扣了什麼，
            或不知道哪些情況免扣——這篇把六種情境全部說清楚。
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl bg-teal-50 p-4 text-center">
              <p className="text-xs text-gray-500">補充保費費率</p>
              <p className="text-xl font-bold text-teal-700">2.11%</p>
              <p className="text-xs text-gray-400">107年起不變</p>
            </div>
            <div className="rounded-2xl bg-blue-50 p-4 text-center">
              <p className="text-xs text-gray-500">高額獎金門檻</p>
              <p className="text-xl font-bold text-blue-700">109,880</p>
              <p className="text-xs text-gray-400">投保金額 × 4 倍</p>
            </div>
            <div className="rounded-2xl bg-purple-50 p-4 text-center">
              <p className="text-xs text-gray-500">股利免扣門檻</p>
              <p className="text-xl font-bold text-purple-700">2萬</p>
              <p className="text-xs text-gray-400">全年累積超過才扣</p>
            </div>
            <div className="rounded-2xl bg-orange-50 p-4 text-center">
              <p className="text-xs text-gray-500">兼職/接案每次</p>
              <p className="text-xl font-bold text-orange-700">全額</p>
              <p className="text-xs text-gray-400">≥ 2,000 才扣</p>
            </div>
          </div>
        </section>

        <AdUnit />

        {/* ── 六大類一覽 ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">六大類補充保費情境</h2>
          <div className="space-y-3">
            {/* 1. 高額獎金 */}
            <div className="rounded-2xl border border-blue-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">1</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">高額獎金（年終、三節、績效）</p>
                  <p className="mt-1 text-sm text-gray-600">
                    單次獎金超過投保金額4倍（<strong>109,880元</strong>）的差額 × 2.11%。
                    超過才扣，未達免扣。
                  </p>
                  <div className="mt-2 rounded-xl bg-blue-50 px-3 py-2 text-sm">
                    <span className="font-medium text-blue-800">例：年終 200,000 元</span>
                    <span className="text-gray-600"> → 超出 90,120 元 × 2.11% = </span>
                    <span className="font-bold text-blue-700">1,902 元</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. 兼職薪資 */}
            <div className="rounded-2xl border border-green-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">2</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">兼職薪資（非所屬投保單位給付）</p>
                  <p className="mt-1 text-sm text-gray-600">
                    每次給付全額 × 2.11%，由付款公司代扣。每次未達 2,000 元免扣。
                    本職薪資不受影響，只有「兼差」那份才扣。
                  </p>
                  <div className="mt-2 rounded-xl bg-green-50 px-3 py-2 text-sm">
                    <span className="font-medium text-green-800">例：兼職月領 20,000 元</span>
                    <span className="text-gray-600"> → 20,000 × 2.11% = </span>
                    <span className="font-bold text-green-700">422 元</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. 執行業務所得（接案） */}
            <div className="rounded-2xl border border-orange-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-700">3</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">執行業務所得（接案、演講費）</p>
                  <p className="mt-1 text-sm text-gray-600">
                    每次給付全額 × 2.11%，由委託公司代扣。每次未達 2,000 元免扣。
                    這是自由工作者最常遇到的情境。
                  </p>
                  <div className="mt-2 rounded-xl bg-orange-50 px-3 py-2 text-sm">
                    <span className="font-medium text-orange-800">例：收到案款 100,000 元</span>
                    <span className="text-gray-600"> → 公司匯款前扣 2,110 元，你實拿 </span>
                    <span className="font-bold text-orange-700">97,890 元</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. 股利 */}
            <div className="rounded-2xl border border-purple-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 rounded-full bg-purple-100 px-2 py-0.5 text-xs font-bold text-purple-700">4</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">股利所得（台股、基金配息）</p>
                  <p className="mt-1 text-sm text-gray-600">
                    全年股利累計超過 <strong>20,000 元</strong>的差額 × 2.11%。
                    由配息公司（或基金）在年底累積計算後代扣。
                    全年股利未達 2 萬元完全免扣。
                  </p>
                  <div className="mt-2 rounded-xl bg-purple-50 px-3 py-2 text-sm">
                    <span className="font-medium text-purple-800">例：全年股利 100,000 元</span>
                    <span className="text-gray-600"> → （100,000 − 20,000）× 2.11% = </span>
                    <span className="font-bold text-purple-700">1,688 元</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. 利息 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-bold text-gray-600">5</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">利息所得（非金融機構）</p>
                  <p className="mt-1 text-sm text-gray-600">
                    每次給付超過 20,000 元的差額 × 2.11%。
                    <strong>金融機構（銀行、郵局）給付的利息免扣</strong>，
                    只有公司借貸、債券等非金融機構利息才算。
                    一般上班族幾乎不受影響。
                  </p>
                </div>
              </div>
            </div>

            {/* 6. 租金 */}
            <div className="rounded-2xl border border-red-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">6</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">租金所得（出租給法人）</p>
                  <p className="mt-1 text-sm text-gray-600">
                    每次給付全額 × 2.11%，由承租方代扣。
                    <strong>租客是一般個人（個人租給個人）→ 免扣</strong>。
                    租客是公司、機關或執行業務者 → 需扣。
                  </p>
                  <div className="mt-2 rounded-xl bg-red-50 px-3 py-2 text-sm">
                    <span className="font-medium text-red-800">例：月租 30,000 元出租給公司</span>
                    <span className="text-gray-600"> → 公司每月代扣 30,000 × 2.11% = </span>
                    <span className="font-bold text-red-700">633 元</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 接案補充保費試算表 ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-1">接案收入補充保費試算</h2>
          <p className="text-sm text-gray-500 mb-4">
            執行業務所得（設計、程式、顧問、演講等），每次給付全額 × 2.11%
          </p>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-orange-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">年接案收入</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">全年補充保費（估）</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">月均補充保費</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">實際入帳比例</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {FREELANCE_EXAMPLES.map((income) => {
                  const premium = calcSuppPremium(income);
                  const monthly = Math.round(premium / 12);
                  const takeRate = (((income - premium) / income) * 100).toFixed(2);
                  return (
                    <tr key={income} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {formatNTD(income)} 元
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-orange-700">
                        {formatNTD(premium)} 元
                      </td>
                      <td className="px-4 py-3 text-right text-gray-600">
                        {formatNTD(monthly)} 元
                      </td>
                      <td className="px-4 py-3 text-right text-gray-500">
                        {takeRate}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            ※ 實際為每次給付時代扣，非年底一次計算。每次給付未達 2,000 元免扣。
          </p>
        </section>

        {/* ── 年終獎金試算表 ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-1">高額獎金補充保費試算</h2>
          <p className="text-sm text-gray-500 mb-4">
            單次超過投保金額4倍（<strong>109,880元</strong>）的差額才扣，未超過完全免扣
          </p>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">單次獎金</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">超過門檻金額</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">應扣補充保費</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">實拿金額</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {BONUS_EXAMPLES.map(({ gross, label }) => {
                  const excess = Math.max(0, gross - HIGH_BONUS_THRESHOLD);
                  const premium = calcSuppPremium(excess);
                  const takehome = gross - premium;
                  return (
                    <tr key={gross} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {label}（{formatNTD(gross)} 元）
                      </td>
                      <td className="px-4 py-3 text-right text-gray-600">
                        {excess > 0 ? `${formatNTD(excess)} 元` : <span className="text-green-600 font-medium">未達門檻</span>}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-blue-700">
                        {excess > 0 ? `${formatNTD(premium)} 元` : <span className="text-green-600">免扣</span>}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-700">
                        {formatNTD(takehome)} 元
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            ※ 門檻：投保金額 27,470 × 4 = 109,880 元（115年度）。同一次給付才計算，非全年累積。
          </p>
        </section>

        <AdUnit />

        {/* ── 股利補充保費試算表 ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-1">股利所得補充保費試算</h2>
          <p className="text-sm text-gray-500 mb-4">
            全年股利累計超過 <strong>20,000 元</strong>的差額才扣
          </p>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-purple-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">全年股利</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">超過門檻金額</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">應扣補充保費</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {DIVIDEND_EXAMPLES.map((div) => {
                  const excess = Math.max(0, div - 20_000);
                  const premium = calcSuppPremium(excess);
                  return (
                    <tr key={div} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {formatNTD(div)} 元
                      </td>
                      <td className="px-4 py-3 text-right text-gray-600">
                        {excess > 0 ? `${formatNTD(excess)} 元` : <span className="text-green-600 font-medium">未達門檻</span>}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-purple-700">
                        {excess > 0 ? `${formatNTD(premium)} 元` : <span className="text-green-600">免扣</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            ※ 全年股利由所有公司/基金累積計算，於每次配息時代扣（年初累積，超過2萬後開始扣）。
          </p>
        </section>

        {/* ── 常見誤解 ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">三個常見誤解</h2>
          <div className="space-y-3">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="font-semibold text-amber-900">❌ 誤解：本薪也要繳補充保費</p>
              <p className="mt-1 text-sm text-gray-700">
                <strong>正確：</strong>本職月薪（正職）已包含在一般健保費中，<strong>不再另收補充保費</strong>。
                只有六大類「額外所得」才扣。本薪調漲只影響一般保費（跟著投保級距走）。
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="font-semibold text-amber-900">❌ 誤解：股利全部都要扣 2.11%</p>
              <p className="mt-1 text-sm text-gray-700">
                <strong>正確：</strong>全年股利要<strong>超過 20,000 元</strong>才開始扣，而且只扣超出的部分。
                每年股利不到 2 萬完全免扣。
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="font-semibold text-amber-900">❌ 誤解：接案收入報稅時才繳補充保費</p>
              <p className="mt-1 text-sm text-gray-700">
                <strong>正確：</strong>補充保費由付款方（委託公司）在每次<strong>付款時當場代扣</strong>，
                不等到報稅季。報稅申報所得稅是另一回事，補充保費和所得稅是兩件不同的事。
              </p>
            </div>
          </div>
        </section>

        {/* ── 相關工具 CTA ── */}
        <section>
          <TaxAffiliateCTA />
        </section>

        {/* ── 相關工具 ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">相關工具</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/tax-calculator"
              className="rounded-2xl border border-gray-200 bg-white p-4 hover:border-teal-400 hover:shadow-sm transition"
            >
              <p className="font-semibold text-gray-800">報稅計算器</p>
              <p className="text-sm text-gray-500 mt-0.5">計算綜合所得稅，含接案、薪資、股利各類所得</p>
            </Link>
            <Link
              href="/freelancer-tax-guide"
              className="rounded-2xl border border-gray-200 bg-white p-4 hover:border-teal-400 hover:shadow-sm transition"
            >
              <p className="font-semibold text-gray-800">接案報稅指南</p>
              <p className="text-sm text-gray-500 mt-0.5">執行業務所得費用率、接案 vs 上班族稅負比較</p>
            </Link>
            <Link
              href="/income-tax-brackets"
              className="rounded-2xl border border-gray-200 bg-white p-4 hover:border-teal-400 hover:shadow-sm transition"
            >
              <p className="font-semibold text-gray-800">所得稅級距</p>
              <p className="text-sm text-gray-500 mt-0.5">115年度五級累進稅率完整說明與試算表</p>
            </Link>
            <Link
              href="/dependent-deduction"
              className="rounded-2xl border border-gray-200 bg-white p-4 hover:border-teal-400 hover:shadow-sm transition"
            >
              <p className="font-semibold text-gray-800">扶養親屬節稅</p>
              <p className="text-sm text-gray-500 mt-0.5">扶養父母/子女可以省多少稅？試算表一看就懂</p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
