import type { Metadata } from "next";
import Link from "next/link";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

export const metadata: Metadata = {
  title: "2026怎麼報稅最省？5種族群節稅攻略完整指南 - 台灣財務試算",
  description:
    "上班族、雙薪夫妻、自由工作者、有投資、房東——每種族群最省報稅策略不同。114年度完整節稅公式，附各族群試算數字。找到你的族群，30秒掌握最省申報方式。",
  keywords: [
    "怎麼報稅最省",
    "報稅省稅技巧",
    "節稅攻略2026",
    "報稅策略",
    "省稅方法",
    "報稅技巧",
    "節稅方法2026",
    "報稅最省方式",
    "上班族報稅省錢",
    "雙薪夫妻報稅",
    "自由工作者節稅",
    "投資人報稅策略",
    "房東節稅",
    "114年度節稅",
  ],
  openGraph: {
    title: "2026怎麼報稅最省？5種族群節稅攻略",
    description:
      "雙薪夫妻分開申報省67,770元。上班族勞退自提省23,400元。自由工作者費用率省30%~62%。找到你的族群，30秒掌握最省策略。",
    url: "https://www.twtaxcalc.com/tax-strategy-2026",
  },
};

const NAV_LINKS = [
  { href: "/", label: "財務自由" },
  { href: "/tax-calculator", label: "報稅計算" },
  { href: "/tax-checklist-2026", label: "報稅懶人包" },
  { href: "/tax-mistakes-2026", label: "報稅常見錯誤" },
  { href: "/stock-tax-2026", label: "投資稅務" },
  { href: "/amt-calculator", label: "最低稅負" },
  { href: "/joint-filing", label: "夫妻合併vs分開" },
  { href: "/income-tax-guide-2026", label: "報稅完整攻略" },
  { href: "/mortgage", label: "房貸計算" },
  { href: "/mortgage-full-cost", label: "買房費用" },
  { href: "/buy-vs-rent", label: "買vs租" },
  { href: "/real-estate-tax", label: "房地合一稅" },
  { href: "/house-tax", label: "房屋稅" },
  { href: "/inheritance-tax", label: "遺產稅" },
  { href: "/gift-tax", label: "贈與稅" },
  { href: "/overtime-calculator", label: "加班費" },
  { href: "/severance-calculator", label: "資遣費" },
  { href: "/salary-calculator", label: "月薪試算" },
  { href: "/bonus-calculator", label: "年終獎金" },
  { href: "/pension-calculator", label: "退休試算" },
  { href: "/labor-retirement", label: "勞退新制" },
  { href: "/retirement-planning", label: "退休規劃" },
  { href: "/basic-living-deduction", label: "免稅天花板" },
  { href: "/labor-insurance-rates", label: "勞健保費率" },
  { href: "/income-tax-brackets", label: "所得稅級距" },
  { href: "/dependent-deduction", label: "扶養節稅" },
  { href: "/freelancer-tax-guide", label: "接案報稅" },
  { href: "/side-income-tax", label: "副業所得申報" },
  { href: "/tax-strategy-2026", label: "省稅策略" },
  { href: "/tax-strategy-2026", label: "省稅策略", active: true },
  { href: "/expense-deduction-compare", label: "費用核實試算" },
  { href: "/supplement-premium", label: "二代健保" },
  { href: "/salary-vs-freelancer", label: "薪資vs接案" },
  { href: "/tax-filing-guide", label: "報稅攻略" },
  { href: "/dividend-tax", label: "股利申報" },
  { href: "/deduction-compare", label: "列舉vs標準" },
  { href: "/preschool-deduction", label: "幼兒學前扣除" },
  { href: "/foreign-income-tax", label: "海外所得" },
  { href: "/tax-refund", label: "退稅試算" },
  { href: "/tax-filing-steps", label: "報稅流程" },
  { href: "/tax-refund-timeline", label: "退稅時程" },
];

const FAQS = [
  {
    q: "報稅要怎麼最省？",
    a: "沒有一招通吃——最省的方式取決於你的族群。上班族重點在「扶養親屬」和「列舉vs標準扣除額」；雙薪夫妻通常「分開申報薪資」最省（夫妻各自用薪資特別扣除額）；自由工作者重點在「費用率」（依業別30%~62%課稅所得大幅降低）；有股利的投資人要比較「合併申報」vs「28%分離課稅」；房東要善用「法定費用43%」或核實認定。",
  },
  {
    q: "上班族報稅哪些扣除額容易被忽略？",
    a: "最常被忽略的有：1. 扶養親屬（父母70歲以上免稅額加倍，每人13.8萬）；2. 身心障礙扣除額（本人或扶養親屬，每人20.7萬）；3. 購屋自用貸款利息（上限30萬/年，需扣除儲蓄投資特別扣除額後）；4. 幼兒學前扣除額（6歲以下每人15萬，符合條件者）；5. 教育學費（大學以上每人2.5萬）。",
  },
  {
    q: "雙薪夫妻合併還是分開申報比較省？",
    a: "薪資所得「分開計算」通常比合併更省——夫妻各自適用薪資特別扣除額（上限20.7萬），兩人合計可扣41.4萬。若合併申報，仍各自扣，但稅率以合計所得計算，容易累進到更高稅率。試算：夫年薪150萬、妻100萬，薪資分開申報省67,770元；若有股利、租賃等其他所得，另行評估合併或分開。",
  },
  {
    q: "自由工作者要怎麼節稅？",
    a: "三個核心策略：1. 費用率最大化——確認你的業別費用率（廣告設計45%、程式30%、醫師62%），課稅所得 = 收入 × (1-費用率)；2. 費用核實認定——若實際費用率高於法定標準，可蒐集單據核實申報；3. 二代健保規劃——單筆執行業務收入若分期收款，每筆低於2萬元可避免被扣補充保費2.11%。",
  },
  {
    q: "有股票股利要怎麼申報最省？",
    a: "股利有兩種申報方式：合併申報（股利計入綜合所得稅，但可享8.5%可抵減稅額，上限8萬/年）；28%分離課稅（不計入綜合所得稅，單一稅率28%）。若你的綜合所得稅率≤20%，通常合併申報較省；若已達30%或40%稅率，28%分離可能更划算。搭配股利試算工具可精確比較。",
  },
];

export default function TaxStrategy2026Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "2026怎麼報稅最省？5種族群節稅攻略完整指南",
        description:
          "上班族、雙薪夫妻、自由工作者、有投資、房東——每種族群最省報稅策略不同。114年度完整節稅公式，附各族群試算數字。",
        url: "https://www.twtaxcalc.com/tax-strategy-2026",
        author: { "@type": "Organization", name: "台灣財務試算" },
        publisher: { "@type": "Organization", name: "台灣財務試算" },
        datePublished: "2026-04-01",
        dateModified: "2026-04-01",
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
        {/* Nav */}
        <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
          <div className="mx-auto max-w-4xl px-4">
            <div className="flex gap-1 overflow-x-auto py-2 text-xs">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`shrink-0 rounded-lg px-3 py-1.5 font-medium transition ${"active" in l && l.active ? "bg-green-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <main className="mx-auto max-w-4xl px-4 py-8">
          {/* Hero */}
          <div className="mb-8 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-700">
              114年度報稅旺季攻略・距5月截止60天
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              怎麼報稅最省？
              <br />
              5種族群各有最省公式
            </h1>
            <p className="mt-3 text-base text-gray-500">
              沒有一招通吃的省稅法。
              <span className="font-semibold text-green-700">找到你的族群，30秒掌握最省申報策略。</span>
            </p>
          </div>

          {/* Quick selector */}
          <div className="mb-8 rounded-2xl border border-green-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">你是哪種族群？</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { emoji: "💼", label: "上班族", anchor: "salaried", desc: "固定薪資，有勞健保" },
                { emoji: "👫", label: "雙薪夫妻", anchor: "dual-income", desc: "配偶各有收入" },
                { emoji: "💻", label: "自由工作者", anchor: "freelancer", desc: "接案、自雇、副業" },
                { emoji: "📈", label: "有投資理財", anchor: "investor", desc: "股票、基金、股利收入" },
                { emoji: "🏠", label: "房東/有房貸", anchor: "landlord", desc: "出租或自住房屋" },
              ].map((item) => (
                <a
                  key={item.anchor}
                  href={`#${item.anchor}`}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-green-400 hover:bg-green-50"
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Section 1: 上班族 */}
          <div id="salaried" className="mb-8 scroll-mt-16 rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-3xl">💼</span>
              <div>
                <h2 className="text-xl font-bold text-gray-900">上班族：4個必做節稅動作</h2>
                <p className="text-sm text-gray-500">固定薪資族，重點在扣除額最大化</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Action 1 */}
              <div className="rounded-xl bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-blue-900">列舉 vs 標準扣除額——比過才知道</p>
                    <p className="mt-1 text-sm text-gray-600">標準扣除額：單身 13.1萬、夫妻 26.2萬。若捐款＋自費醫療＋房貸利息合計超過這個數字，就應列舉申報。</p>
                    <div className="mt-2 rounded-lg bg-white p-3 text-sm">
                      <p className="font-medium text-blue-800">快速判斷：這些費用加起來超過13.1萬嗎？</p>
                      <ul className="mt-1 space-y-0.5 text-gray-600">
                        <li>• 捐款（政府認可機構，上限20%所得）</li>
                        <li>• 自費醫療（未納入健保的醫療費，無上限）</li>
                        <li>• 自用購屋貸款利息（上限30萬/年）</li>
                        <li>• 房屋租金（無自用購屋者，上限12萬/年）</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action 2 */}
              <div className="rounded-xl bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-blue-900">扶養親屬：每人省最高 13,800 元</p>
                    <p className="mt-1 text-sm text-gray-600">扶養親屬可列報免稅額。父母年滿70歲，免稅額加倍為 13.8萬（一般9.2萬）。扶養大學以上子女另可加扣教育學費2.5萬。</p>
                    <div className="mt-2 overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-blue-200">
                            <th className="py-1.5 text-left font-semibold text-blue-800">扶養對象</th>
                            <th className="py-1.5 text-right font-semibold text-blue-800">免稅額</th>
                            <th className="py-1.5 text-right font-semibold text-blue-800">12%稅率省稅</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-100">
                          {[
                            { who: "父母（未滿70歲）", exempt: "9.2萬", save: "11,040元" },
                            { who: "父母（70歲以上）", exempt: "13.8萬", save: "16,560元" },
                            { who: "未成年子女", exempt: "9.2萬", save: "11,040元" },
                            { who: "大學以上子女＋學費", exempt: "11.7萬", save: "14,040元" },
                          ].map((r) => (
                            <tr key={r.who}>
                              <td className="py-1.5 text-gray-700">{r.who}</td>
                              <td className="py-1.5 text-right font-medium text-blue-700">{r.exempt}</td>
                              <td className="py-1.5 text-right font-medium text-green-700">{r.save}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action 3 */}
              <div className="rounded-xl bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-blue-900">勞退自提6%：年省23,400元（稅率12%族群）</p>
                    <p className="mt-1 text-sm text-gray-600">勞退自提金額全額從薪資所得扣除，不計入所得課稅。月薪5萬自提6%（3,000元/月），全年3.6萬從所得扣除，稅率12%省4,320元，稅率20%省7,200元，稅率30%省10,800元。</p>
                    <Link href="/pension-calculator" className="mt-2 inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700">
                      試算我的勞退節稅金額 →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Action 4 */}
              <div className="rounded-xl bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-blue-900">基本生活費差額：小家庭不扣到這個不划算</p>
                    <p className="mt-1 text-sm text-gray-600">114年度每人基本生活費 20.2萬。若「基本生活費 × 人口數」大於標準扣除額等合計，差額可額外扣除。三口之家可扣 60.6萬，多數家庭都有差額可扣。</p>
                    <Link href="/basic-living-deduction" className="mt-2 inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700">
                      計算我的基本生活費差額 →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-blue-100 px-4 py-3 text-center">
              <p className="text-sm font-semibold text-blue-900">上班族完整試算</p>
              <p className="mt-1 text-xs text-blue-700">輸入年薪 + 扣除額，算出實際應繳稅額</p>
              <Link href="/tax-calculator" className="mt-2 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                立即試算報稅金額 →
              </Link>
            </div>
          </div>

          {/* Section 2: 雙薪夫妻 */}
          <div id="dual-income" className="mb-8 scroll-mt-16 rounded-2xl border border-pink-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-3xl">👫</span>
              <div>
                <h2 className="text-xl font-bold text-gray-900">雙薪夫妻：分開申報薪資省 67,770 元</h2>
                <p className="text-sm text-gray-500">兩人都有薪資，分開計算薪資所得通常最省</p>
              </div>
            </div>

            <div className="mb-5 rounded-xl border border-pink-100 bg-pink-50 p-5">
              <p className="mb-3 text-sm font-bold text-pink-800">試算：夫年薪150萬、妻年薪100萬（各單身一口計算）</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-white p-4 text-sm">
                  <p className="mb-2 font-semibold text-gray-800">合併申報（傳統方式）</p>
                  <div className="space-y-1 text-gray-600">
                    <div className="flex justify-between"><span>薪資合計</span><span>250萬</span></div>
                    <div className="flex justify-between"><span>薪資特別扣除（合計）</span><span>-41.4萬</span></div>
                    <div className="flex justify-between"><span>免稅額×2 + 標準扣除</span><span>-44.4萬</span></div>
                    <div className="flex justify-between font-medium"><span>應稅所得</span><span>164.2萬</span></div>
                    <div className="flex justify-between rounded bg-red-50 px-2 py-1">
                      <span className="font-semibold text-red-800">應繳稅額</span>
                      <span className="font-bold text-red-700">183,130 元</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-white p-4 text-sm">
                  <p className="mb-2 font-semibold text-gray-800">薪資分開計算（推薦）</p>
                  <div className="space-y-1 text-gray-600">
                    <div className="flex justify-between"><span>夫薪資所得</span><span>129.3萬</span></div>
                    <div className="flex justify-between"><span>妻薪資所得</span><span>79.3萬</span></div>
                    <div className="flex justify-between"><span>各自適用扣除額</span><span>-44.4萬</span></div>
                    <div className="flex justify-between font-medium"><span>合計應稅所得</span><span>164.2萬</span></div>
                    <div className="flex justify-between rounded bg-green-50 px-2 py-1">
                      <span className="font-semibold text-green-800">應繳稅額</span>
                      <span className="font-bold text-green-700">115,360 元</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 rounded-lg bg-pink-100 px-4 py-2 text-center">
                <span className="text-base font-bold text-pink-900">分開申報省 67,770 元</span>
                <span className="ml-2 text-sm text-pink-700">（關鍵：妻100萬薪資分開後稅率從20%降至12%）</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl bg-pink-50 p-4 text-sm">
                <p className="font-semibold text-pink-900">薪資分開計算的操作方式</p>
                <p className="mt-1 text-gray-600">報稅系統選「薪資所得分開計算」。夫妻任一方的薪資所得可選擇分開計算，以較低稅率課稅，其他所得仍合併。每年都要重新選擇，不會自動延續。</p>
              </div>
              <div className="rounded-xl bg-amber-50 p-4 text-sm">
                <p className="font-semibold text-amber-900">例外：配偶無收入，合併申報更省</p>
                <p className="mt-1 text-gray-600">若配偶無薪資所得，合併可多用一份免稅額9.2萬＋標準扣除額13.1萬，單薪家庭分開申報反而多繳。</p>
              </div>
            </div>

            <div className="mt-4 text-center">
              <Link href="/joint-filing" className="inline-flex items-center gap-1 rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700">
                精確試算你家合併vs分開哪個省 →
              </Link>
            </div>
          </div>

          {/* Section 3: 自由工作者 */}
          <div id="freelancer" className="mb-8 scroll-mt-16 rounded-2xl border border-orange-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-3xl">💻</span>
              <div>
                <h2 className="text-xl font-bold text-gray-900">自由工作者：費用率是最強武器</h2>
                <p className="text-sm text-gray-500">接案族、自雇者、斜槓族——善用費用率大幅降低課稅所得</p>
              </div>
            </div>

            <div className="mb-5 rounded-xl border border-orange-100 bg-orange-50 p-5">
              <p className="mb-3 text-sm font-bold text-orange-800">試算：接案設計師年收80萬（廣告設計費用率45%）</p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">執行業務收入</span><span className="font-medium">800,000</span></div>
                <div className="flex justify-between"><span className="text-gray-600">費用率45%（政府認定成本）</span><span className="font-medium text-orange-600">-360,000</span></div>
                <div className="flex justify-between border-t border-orange-200 pt-1.5"><span className="text-gray-600">執行業務所得</span><span className="font-medium">440,000</span></div>
                <div className="flex justify-between"><span className="text-gray-600">免稅額9.2萬 + 標準扣除13.1萬 + 薪資特別20.7萬</span><span className="font-medium text-orange-600">-430,000</span></div>
                <div className="flex justify-between rounded-lg bg-orange-100 px-3 py-2">
                  <span className="font-semibold text-orange-900">應稅所得 × 5%</span>
                  <span className="text-lg font-bold text-orange-700">5,000 元</span>
                </div>
                <div className="rounded-lg bg-emerald-50 px-3 py-2 text-center">
                  <span className="text-sm font-bold text-emerald-800">年收80萬只繳5,000元稅。有效稅率 0.63%。</span>
                </div>
              </div>
            </div>

            <div className="mb-4 overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">業別</th>
                    <th className="px-4 py-2 text-right font-semibold text-gray-700">費用率</th>
                    <th className="px-4 py-2 text-right font-semibold text-orange-700">收入100萬實際課稅</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["廣告/美術/室內設計/攝影", "45%", "55萬"],
                    ["程式/資訊/翻譯/撰稿/顧問", "30%", "70萬"],
                    ["建築師/工程師/技師", "35%", "65萬"],
                    ["醫師/牙醫師", "62%", "38萬"],
                    ["律師/會計師/地政士", "30%", "70萬"],
                    ["表演藝術/演出", "45%", "55萬"],
                  ].map(([type, rate, taxable]) => (
                    <tr key={type} className="hover:bg-gray-50">
                      <td className="px-4 py-2.5 text-gray-700">{type}</td>
                      <td className="px-4 py-2.5 text-right font-medium text-blue-700">{rate}</td>
                      <td className="px-4 py-2.5 text-right font-medium text-orange-600">{taxable}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/freelancer-tax-guide" className="inline-flex items-center gap-1 rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-white hover:bg-orange-600">
                全職接案報稅指南 →
              </Link>
              <Link href="/side-income-tax" className="inline-flex items-center gap-1 rounded-lg border border-orange-300 px-3 py-2 text-sm font-medium text-orange-700 hover:bg-orange-50">
                副業斜槓申報攻略 →
              </Link>
              <Link href="/expense-deduction-compare" className="inline-flex items-center gap-1 rounded-lg border border-orange-300 px-3 py-2 text-sm font-medium text-orange-700 hover:bg-orange-50">
                費用核實 vs 標準費用率 →
              </Link>
            </div>
          </div>

          {/* Section 4: 投資人 */}
          <div id="investor" className="mb-8 scroll-mt-16 rounded-2xl border border-purple-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-3xl">📈</span>
              <div>
                <h2 className="text-xl font-bold text-gray-900">投資人：股利申報方式決定勝負</h2>
                <p className="text-sm text-gray-500">股票、基金、ETF 配息族的關鍵決策</p>
              </div>
            </div>

            <div className="mb-5 space-y-4">
              <div className="rounded-xl border border-purple-100 bg-purple-50 p-5">
                <p className="mb-3 text-sm font-bold text-purple-800">股利兩種申報方式對照</p>
                <div className="grid gap-4 sm:grid-cols-2 text-sm">
                  <div className="rounded-lg bg-white p-4">
                    <p className="mb-2 font-semibold text-purple-900">方式一：合併申報（+8.5%抵減）</p>
                    <ul className="space-y-1 text-gray-600">
                      <li>• 股利計入綜合所得稅</li>
                      <li>• 可享 8.5% 可抵減稅額（上限8萬/年）</li>
                      <li>• 適合：綜合所得稅率 ≤ 20% 者</li>
                    </ul>
                    <div className="mt-2 rounded bg-purple-50 px-3 py-2 text-xs">
                      <strong>試算：</strong>股利100萬，合併稅率12%<br/>
                      稅額 = 12萬 − 抵減8.5萬 = <strong>3.5萬</strong>
                    </div>
                  </div>
                  <div className="rounded-lg bg-white p-4">
                    <p className="mb-2 font-semibold text-purple-900">方式二：28%分離課稅</p>
                    <ul className="space-y-1 text-gray-600">
                      <li>• 股利不計入綜合所得稅</li>
                      <li>• 單一稅率28%，無抵減</li>
                      <li>• 適合：綜合所得稅率 ≥ 30% 者</li>
                    </ul>
                    <div className="mt-2 rounded bg-purple-50 px-3 py-2 text-xs">
                      <strong>試算：</strong>股利100萬，28%分離<br/>
                      稅額 = <strong>28萬</strong>（無抵減）
                    </div>
                  </div>
                </div>
                <div className="mt-3 rounded-lg bg-purple-100 px-4 py-2 text-sm text-center">
                  <span className="font-semibold text-purple-900">判斷關鍵：你的薪資＋其他所得適用哪個稅率？</span>
                  <span className="ml-1 text-purple-700">稅率≤20%選合併，稅率≥30%選分離</span>
                </div>
              </div>

              <div className="rounded-xl bg-amber-50 p-4 text-sm">
                <p className="font-semibold text-amber-900">注意：二代健保補充保費</p>
                <p className="mt-1 text-gray-600">單次領取股利或薪資外收入超過2萬元，支付方須扣繳2.11%補充保費。全年股利合計超過6.7萬，發放公司扣繳，這部分無法避免但可規劃持股分散。</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link href="/dividend-tax" className="inline-flex items-center gap-1 rounded-lg bg-purple-600 px-3 py-2 text-sm font-medium text-white hover:bg-purple-700">
                股利申報試算工具 →
              </Link>
              <Link href="/stock-tax-2026" className="inline-flex items-center gap-1 rounded-lg border border-purple-300 px-3 py-2 text-sm font-medium text-purple-700 hover:bg-purple-50">
                股票買賣完整稅務攻略 →
              </Link>
              <Link href="/amt-calculator" className="inline-flex items-center gap-1 rounded-lg border border-purple-300 px-3 py-2 text-sm font-medium text-purple-700 hover:bg-purple-50">
                最低稅負試算 →
              </Link>
            </div>
          </div>

          {/* Section 5: 房東/有房貸 */}
          <div id="landlord" className="mb-8 scroll-mt-16 rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-3xl">🏠</span>
              <div>
                <h2 className="text-xl font-bold text-gray-900">房東 / 有房貸：三個必知稅務重點</h2>
                <p className="text-sm text-gray-500">租金所得、房貸利息扣除、房地合一稅</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl bg-emerald-50 p-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">1</span>
                  <div>
                    <p className="font-semibold text-emerald-900">租金所得：法定費用43%或核實認定擇一</p>
                    <p className="mt-1 text-sm text-gray-600">租賃所得 = 全年租金收入 × 57%（法定費用43%），計入綜合所得。若實際費用（折舊、利息、修繕、管理費）超過43%，可選「核實認定」自行列報，通常更省。</p>
                    <div className="mt-2 rounded-lg bg-white p-3 text-xs text-gray-600">
                      <strong>試算：</strong>月租2萬（年24萬），法定費用43% → 租賃所得 13.68萬，稅率5%繳 6,840元。
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-emerald-50 p-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">2</span>
                  <div>
                    <p className="font-semibold text-emerald-900">自用房貸利息扣除：最高30萬/年</p>
                    <p className="mt-1 text-sm text-gray-600">自用購屋（非出租）的房貸利息可列舉扣除，上限30萬/年，需扣掉當年儲蓄投資特別扣除額（上限27萬）後的差額才能扣。換言之：年繳利息需超過27萬才有效果。</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-emerald-50 p-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">3</span>
                  <div>
                    <p className="font-semibold text-emerald-900">賣房前確認持有年限：房地合一稅差很大</p>
                    <p className="mt-1 text-sm text-gray-600">持有2年內出售稅率45%；2~5年35%；5~10年20%；10年以上15%。自住滿6年且本人設籍，可享400萬免稅額並適用10%優惠稅率。持有到10年再賣，稅差最高可達30%。</p>
                    <Link href="/real-estate-tax" className="mt-2 inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700">
                      計算我的房地合一稅 →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Universal checklist */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">所有人都要做的5件事</h2>
            <div className="space-y-3">
              {[
                {
                  num: "1",
                  title: "收集所有扣繳憑單",
                  desc: "薪資、執行業務、股利、租金——每張憑單都對應一筆稅。漏報被查到要補稅加罰款。健保費用收據也要留存（自費醫療可列舉）。",
                },
                {
                  num: "2",
                  title: "確認基本資料正確",
                  desc: "戶籍地址、扶養親屬（父母/子女的身分證號）。父母是否70歲以上（免稅額加倍至13.8萬），子女是否在校在讀（可附教育學費扣除）。",
                },
                {
                  num: "3",
                  title: "試算列舉 vs 標準扣除額",
                  desc: "系統會自動計算哪個比較省，但你要先備妥相關單據（捐款收據、醫療費用、房貸對帳單）才能正確填入。",
                },
                {
                  num: "4",
                  title: "確認去年有無漏報收入",
                  desc: "兼差薪資、股利、臨時收入——有扣繳憑單的收入政府都知道。主動申報比被查到補稅更划算。",
                },
                {
                  num: "5",
                  title: "5月1日起就可以報，早報早退稅",
                  desc: "若你是退稅戶，5月1日一開放就申報，退稅最快在6月底入帳。等到5月31日最後一天才報，退稅延到8月以後。",
                },
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-3 rounded-xl bg-gray-50 p-4">
                  <span className="mt-0.5 shrink-0 rounded-full bg-gray-700 px-2 py-0.5 text-xs font-bold text-white">{item.num}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="mt-0.5 text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA 1 */}
          <TaxAffiliateCTA />

          {/* Related tools */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-gray-900">相關試算工具</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { href: "/tax-calculator", label: "綜合所得稅試算", desc: "輸入年收入、扣除額，算出應繳稅額" },
                { href: "/joint-filing", label: "夫妻合併vs分開試算", desc: "精確比較哪種申報方式省更多" },
                { href: "/dividend-tax", label: "股利申報試算", desc: "合併 vs 28%分離課稅哪個省" },
                { href: "/pension-calculator", label: "勞退自提節稅試算", desc: "計算自提比例的實際節稅金額" },
                { href: "/basic-living-deduction", label: "基本生活費差額試算", desc: "小家庭必查的額外扣除額" },
                { href: "/dependent-deduction", label: "扶養節稅試算", desc: "父母、子女各能省多少稅" },
                { href: "/deduction-compare", label: "列舉vs標準扣除額", desc: "哪個對你更有利" },
                { href: "/freelancer-tax-guide", label: "接案/自由工作者報稅", desc: "費用率完整說明" },
                { href: "/real-estate-tax", label: "房地合一稅試算", desc: "持有年限 × 賣價，算出稅額" },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="flex flex-col rounded-xl border border-gray-200 p-3 transition hover:border-green-400 hover:bg-green-50"
                >
                  <span className="font-medium text-gray-900">{tool.label}</span>
                  <span className="mt-0.5 text-xs text-gray-500">{tool.desc}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">常見問題</h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <div key={faq.q} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <p className="font-semibold text-gray-900">{faq.q}</p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA 2 */}
          <TaxAffiliateCTA />

          {/* Footer note */}
          <p className="mt-6 text-center text-xs text-gray-400">
            以上試算基於財政部114年度（2026年5月申報）稅務規定。個人情況不同，建議搭配計算器精算或諮詢會計師。
          </p>
        </main>
      </div>
    </>
  );
}
