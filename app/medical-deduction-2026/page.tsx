import type { Metadata } from "next";
import Link from "next/link";
import { AdUnit } from "@/components/ad-unit";
import { TaxAffiliateCTA } from "@/components/affiliate-cta";

export const metadata: Metadata = {
  title: "醫藥費列舉扣除額 2026｜醫療費用怎麼報稅、無金額上限完整攻略 - 台灣財務試算",
  description:
    "114年度醫藥及生育費列舉扣除額無金額上限，但必須選列舉扣除額，且只能申報保險理賠後的自付部分。掛號費、手術費、住院費、生育費均可申報。完整條件、省稅試算、eTax操作說明。",
  keywords: [
    "醫藥費列舉扣除",
    "醫療費用報稅",
    "醫藥費抵稅",
    "看診費用可以報稅嗎",
    "住院費報稅",
    "生育費扣除額",
    "114年醫療費扣除",
    "醫藥費節稅2026",
    "醫療費用扣除額",
    "手術費報稅",
    "醫藥費申報",
    "醫療費列舉2026",
  ],
  openGraph: {
    title: "醫藥費列舉扣除額 2026｜醫療費用怎麼報稅、無金額上限完整攻略",
    description:
      "114年度醫藥及生育費列舉扣除額無金額上限，只能申報保險理賠後的自付部分。掛號費、手術費、住院費、生育費均可申報。",
    url: "https://www.twtaxcalc.com/medical-deduction-2026",
  },
  alternates: {
    canonical: "https://www.twtaxcalc.com/medical-deduction-2026",
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
  { href: "/basic-living-deduction", label: "免稅天花板" },
  { href: "/labor-insurance-rates", label: "勞健保費率" },
  { href: "/income-tax-brackets", label: "所得稅級距" },
  { href: "/dependent-deduction", label: "扶養節稅" },
  { href: "/freelancer-tax-guide", label: "接案報稅" },
  { href: "/side-income-tax", label: "副業所得申報" },
  { href: "/tax-strategy-2026", label: "省稅策略" },
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
  { href: "/job-change-tax-2026", label: "換工作報稅" },
  { href: "/etax-guide-2026", label: "eTax教學" },
  { href: "/tax-refund-timeline", label: "退稅時程" },
  { href: "/day-trading-tax", label: "當沖稅費" },
  { href: "/ira-vs-labor-retirement", label: "勞退vs ETF" },
  { href: "/legal-tax-savings-2026", label: "省稅10招" },
  { href: "/rental-income-tax-2026", label: "出租報稅" },
  { href: "/freelance-to-employee-2026", label: "接案轉正職報稅" },
  { href: "/rent-deduction-2026", label: "房租抵稅" },
  { href: "/donation-deduction-2026", label: "捐款節稅" },
  { href: "/savings-deduction-2026", label: "儲蓄投資扣除" },
  { href: "/salary-deduction-2026", label: "薪資扣除額" },
  { href: "/disability-deduction-2026", label: "身障扣除額" },
  { href: "/ltc-deduction-2026", label: "長照扣除額" },
  { href: "/tuition-deduction-2026", label: "學費扣除額" },
  { href: "/insurance-deduction-2026", label: "保險費扣除額" },
  { href: "/mortgage-interest-deduction-2026", label: "房貸利息扣除額" },
  { href: "/medical-deduction-2026", label: "醫藥費扣除額", active: true },
];

const SECTIONS = [
  {
    id: "what-is",
    icon: "🏥",
    title: "什麼是醫藥及生育費列舉扣除額？",
    color: "blue",
    content:
      "醫藥及生育費是《所得稅法》第17條「列舉扣除額」的一種，是所有列舉扣除項目中唯一沒有金額上限的項目。只要是在合格醫療機構就醫、有收據、且未被保險理賠的自付部分，金額再高都可以列舉扣除。重點：必須選「列舉扣除額」，且只有自付部分（扣除保險理賠後）才能申報。",
    details: [
      {
        label: "無金額上限——列舉扣除額中唯一沒有上限的項目",
        text: "相較於人身保險費（每人 24,000）、房貸利息（上限 30 萬）、房租（上限 12 萬），醫藥及生育費沒有金額上限。癌症治療、重大手術、長期住院、透析費用等大額醫療支出，只要符合條件，全部可以列舉扣除。這是大病患者家庭節稅的重要管道。",
      },
      {
        label: "只有「自付額」才能申報——保險理賠部分要扣掉",
        text: "這是最多人忽略的關鍵規定：若醫療費用已由商業保險、勞保、健保補助，或雇主補助，這些已獲補償的部分不能申報。只有你實際自掏腰包的部分（自付額 = 總費用 − 保險理賠 − 其他補助）才能列舉扣除。例如：手術費 30 萬，保險理賠 20 萬，可申報金額 = 10 萬。",
      },
      {
        label: "必須選列舉扣除額才能使用",
        text: "和所有列舉扣除項目一樣，醫藥費必須選擇列舉扣除額才能申報。若選標準扣除額（個人 131,000 元、夫妻 262,000 元），就無法另外申報醫藥費。因此，若全年醫藥費自付額很高，加上其他列舉項目合計是否超過標準扣除額，才是決定要不要選列舉的關鍵。",
      },
    ],
  },
  {
    id: "what-qualifies",
    icon: "📋",
    title: "哪些醫療費用可以申報？哪些不行？",
    color: "green",
    content:
      "判斷標準有兩個：①在「合格醫療機構」就醫，②屬於治療目的（非預防、非美觀）。以下逐項說明。",
    details: [
      {
        label: "可以申報的醫療費用",
        text: "公立或合格私立醫院、診所的掛號費、診療費、手術費、住院費、藥費（醫師處方）；生育費（產檢費、接生費、剖腹費）；牙科治療費（補牙、拔牙、根管治療、鑲牙等治療性質）；合格中醫師看診費及中藥處方費；復健治療費（在合格醫療機構）；眼科治療費（如青光眼、視網膜手術等）。以上均需有收據正本，且未被保險理賠。",
      },
      {
        label: "不能申報的費用",
        text: "預防性健康檢查費（健檢費）；美容手術費（雙眼皮、隆鼻等非治療目的）；近視雷射手術（非治療性視力矯正）；牙齒矯正費（純矯正美觀用途，無醫療必要性）；保健食品、健康食品、維生素補充劑；已由健保、商業保險、勞保給付的部分；外勞看護費（非在合格醫療機構）；交通費、伙食費等附帶費用。",
      },
      {
        label: "受扶養親屬的醫療費：可以合併申報",
        text: "若配偶、受扶養父母、受扶養子女有醫療費用，且已在你的申報戶中，你為他們支付的醫療費（自付部分）可以一併列入你的列舉扣除額。例如：父親住院手術自付 50 萬、配偶生育費自付 8 萬，這兩筆都可以在你的報稅申報中列舉扣除。",
      },
      {
        label: "需要收據正本——不可只憑轉帳記錄",
        text: "醫藥費列舉扣除需要保存收據正本（收據或診療費用明細）。eTax 申報時不需要上傳，但若國稅局事後抽查，必須能提供收據。建議平時就把看診收據裝袋，按年度保存至少 5 年。收據遺失時，可向醫療機構申請補開診療證明，但部分醫院不一定配合。",
      },
    ],
  },
  {
    id: "tax-savings",
    icon: "💰",
    title: "能省多少稅？各情境實際試算",
    color: "orange",
    content:
      "省稅金額 = 可申報醫藥費自付額 × 邊際稅率。因為沒有上限，大額醫療支出的節稅空間非常可觀。",
    details: [
      {
        label: "情境 1：父親癌症治療（自付 60 萬）",
        text: "假設申報人父親罹癌，全年醫療費用 80 萬，保險理賠 20 萬，自付 60 萬（父親為受扶養人）。各稅率省稅金額：稅率 12% → 省 72,000 元；稅率 20% → 省 120,000 元；稅率 30% → 省 180,000 元。加上其他列舉項目，選列舉扣除額幾乎必然優於標準扣除額。",
      },
      {
        label: "情境 2：一般上班族年度門診（自付 3 萬）",
        text: "若全年看診費、藥費自付合計約 30,000 元，但無其他列舉項目（無房貸、無大額保費等），合計遠低於標準扣除額 131,000 元（個人），選列舉不划算。醫藥費單獨無法撐起列舉優勢——關鍵是要跟其他列舉項目合計比較。",
      },
      {
        label: "情境 3：生育 + 月子中心（自付 25 萬）",
        text: "生育費（產檢、接生、剖腹）可申報，但坐月子中心費用不能申報（非治療性）。假設生育費自付 15 萬、配偶當年其他看診費 2 萬，合計可申報 17 萬。加上其他列舉項目若超過標準扣除額（夫妻 262,000），選列舉可省稅：稅率 12% → 省 20,400 元；稅率 20% → 省 34,000 元。",
      },
    ],
  },
  {
    id: "special-cases",
    icon: "⚠️",
    title: "特殊情況說明",
    color: "purple",
    content:
      "以下幾種常見情況容易讓人搞混，逐一說明。",
    details: [
      {
        label: "健保自付差額病房費：可以申報",
        text: "健保給付的標準病房以外，自費升等（差額病床費）屬於醫療費自付部分，可以列舉申報。例如：住院 10 天，差額病床費每日 1,500 元，合計 15,000 元，可申報。但伙食費（非醫療性）不在申報範圍內。",
      },
      {
        label: "月子中心費用：不能申報",
        text: "坐月子中心費用不屬於「醫藥費」，無法列舉扣除。坐月子中心提供的護理服務若非在合格醫療機構執行，也不符合條件。生育費申報範圍是醫院的產前檢查費、接生費、手術費等，以醫療機構開立的收據為準。",
      },
      {
        label: "看護費用：只有合格機構可申報",
        text: "在合格醫療機構（如護理之家）的照護費用屬可申報範圍。但在家中雇用外籍看護的費用，不屬於醫藥費，無法列舉申報。若父母符合長照條件，可改考慮申請「長期照顧特別扣除額」（每人 12 萬）。",
      },
      {
        label: "海外就醫費用：原則上不適用",
        text: "海外就醫費用，因醫療機構非在台灣境內，原則上不符合「合格醫療機構」條件，無法列舉扣除。但若在台灣轉介、由台灣醫療院所安排的境外醫療，實務上仍需詢問國稅局確認。國內就醫花費不論金額多大，只要有收據且為自付部分即可申報。",
      },
    ],
  },
  {
    id: "how-to-file",
    icon: "💻",
    title: "eTax 怎麼申報醫藥費列舉扣除額",
    color: "green",
    content:
      "醫藥費不像健保費或薪資會自動帶入，必須手動輸入。需要保存收據作為佐證。",
    details: [
      {
        label: "步驟 1：確認選列舉扣除額",
        text: "登入 eTax 後，在「扣除額選擇」頁面切換為「列舉扣除額」（系統可能預設標準扣除額）。切換後才會顯示各列舉項目輸入欄位，包含「醫藥及生育費」。",
      },
      {
        label: "步驟 2：計算全年自付醫藥費總額",
        text: "事先將全年收據整理好，加總所有自付醫藥費金額（已扣除保險理賠後）。包含本人、配偶及受扶養親屬（父母、子女等）的符合條件醫療費用。在「醫藥及生育費」欄位輸入合計金額。系統不會自動帶入，完全靠手動填入。",
      },
      {
        label: "步驟 3：保存收據備查（不需上傳）",
        text: "eTax 申報時不需要上傳收據，但財政部可能事後抽查要求提供。收據需保存至少 5 年。建議用信封袋或資料夾按年份整理，診療費用明細、門診收據、住院費用明細單都要保留。若使用信用卡消費，刷卡紀錄只是輔助，收據正本仍需保存。",
      },
    ],
  },
];

const FAQS = [
  {
    q: "醫藥費列舉扣除有金額上限嗎？",
    a: "沒有。醫藥及生育費是所有列舉扣除項目中唯一沒有金額上限的項目。只要是在合格醫療機構就醫、有收據正本、且是自付部分（扣除保險理賠後），金額再高都可以全數列舉扣除。但前提是必須選列舉扣除額，且整體列舉合計必須超過標準扣除額才划算。",
  },
  {
    q: "保險理賠了一部分，剩下自己付的還能申報嗎？",
    a: "可以，而且只能申報自付的部分。例如：手術費 50 萬，商業醫療保險理賠 35 萬，自付 15 萬，則可申報金額為 15 萬。已被保險補償的 35 萬不能再申報。若同時有勞保、健保補助，也要一併扣除，只申報最終自付的淨額。",
  },
  {
    q: "健康檢查費可以申報醫藥費扣除額嗎？",
    a: "不行。預防性的健康檢查（健檢）費用不屬於「醫藥費」，無法列舉扣除。醫藥費的申報範圍是「疾病診斷與治療」相關費用。健檢費用性質屬於預防保健，非治療性，因此不符合條件，即使在合格醫院健檢、有正式收據也不能申報。",
  },
  {
    q: "幫父母付的住院費可以申報嗎？",
    a: "可以，前提是父母已列為你的受扶養直系親屬。若父母是你申報戶的受扶養成員，你代為支付的醫藥費自付部分，可以合併計入你的列舉扣除。例如：媽媽住院自付 40 萬（扣除保險理賠後），媽媽是你的受扶養親屬，這 40 萬可以在你的報稅申報中列舉扣除，省稅效果非常顯著。",
  },
  {
    q: "牙齒矯正費可以申報醫藥費扣除額嗎？",
    a: "純美觀目的的齒列矯正不能申報。但若有醫療必要性（如顎骨異常咬合影響咀嚼功能、骨骼發育問題），且醫師出具醫療必要性診斷書，部分情況可以申報。實務上，純正畸科矯正（戴矯正器）通常被視為美觀目的，不予認定；有醫療必要性的案例需個別判斷，建議先詢問國稅局確認。",
  },
];

const SECTION_COLORS: Record<
  string,
  { bg: string; border: string; icon: string; title: string; detail: string }
> = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "bg-blue-100",
    title: "text-blue-900",
    detail: "text-blue-700",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    icon: "bg-green-100",
    title: "text-green-900",
    detail: "text-green-700",
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    icon: "bg-orange-100",
    title: "text-orange-900",
    detail: "text-orange-700",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    icon: "bg-purple-100",
    title: "text-purple-900",
    detail: "text-purple-700",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    icon: "bg-red-100",
    title: "text-red-900",
    detail: "text-red-700",
  },
};

export default function MedicalDeduction2026Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline:
          "醫藥費列舉扣除額 2026｜醫療費用怎麼報稅、無金額上限完整攻略",
        description:
          "114年度醫藥及生育費列舉扣除額無金額上限，但必須選列舉扣除額，且只能申報保險理賠後的自付部分。掛號費、手術費、住院費、生育費均可申報。",
        url: "https://www.twtaxcalc.com/medical-deduction-2026",
        author: { "@type": "Organization", name: "台灣財務試算" },
        publisher: { "@type": "Organization", name: "台灣財務試算" },
        datePublished: "2026-04-17",
        dateModified: "2026-04-17",
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
        {/* Nav */}
        <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
          <div className="mx-auto max-w-4xl px-4">
            <div className="flex gap-1 overflow-x-auto py-2 text-xs">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href + (("active" in l && l.active) ? "-active" : "")}
                  href={l.href}
                  className={`shrink-0 rounded-lg px-3 py-1.5 font-medium transition ${"active" in l && l.active ? "bg-red-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
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
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-1.5 text-sm font-medium text-red-700">
              114年度報稅・有大額醫療費必看
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              醫藥費可以報稅抵扣？
              <br />
              <span className="text-red-600">醫藥費列舉扣除額完整攻略</span>
            </h1>
            <p className="mt-3 text-base text-gray-500">
              看診費、手術費、住院費、生育費，所有醫療自付部分都能列舉扣除。
              <span className="font-semibold text-red-700">
                沒有金額上限，但保險理賠的部分不能算。
              </span>
            </p>
          </div>

          {/* Key insight alert */}
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5">
            <p className="text-sm font-bold text-red-800">
              💡 最關鍵規定：保險理賠後的「自付額」才能申報，已理賠部分要扣掉。很多人把全部醫療費都申報，但其實只有自己掏腰包的部分才合法，也才需要申報。另外，健康檢查費、坐月子費用、美容手術不能申報。
            </p>
          </div>

          {/* Quick summary cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: "🏥", label: "無金額上限", desc: "列舉扣除項目中唯一無上限" },
              { icon: "💳", label: "只申報自付部分", desc: "保險理賠後的淨自付額" },
              { icon: "🧾", label: "需要收據正本", desc: "eTax不用上傳但需保存5年" },
            ].map((card) => (
              <div
                key={card.label}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm text-center"
              >
                <div className="mb-2 text-2xl">{card.icon}</div>
                <p className="font-bold text-gray-900">{card.label}</p>
                <p className="mt-1 text-sm text-gray-500">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="mb-1 text-sm font-medium text-red-700">加入醫藥費後，選列舉划算嗎？</p>
            <p className="mb-4 text-xl font-bold text-red-900">輸入所得和列舉項目，30秒算清楚</p>
            <Link
              href="/tax-calculator"
              className="inline-block rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-red-700"
            >
              立即試算報稅金額 →
            </Link>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {SECTIONS.map((section) => {
              const c = SECTION_COLORS[section.color];
              return (
                <div
                  key={section.id}
                  className={`rounded-2xl border ${c.border} ${c.bg} p-6 shadow-sm`}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className={`rounded-xl ${c.icon} p-2 text-xl`}>{section.icon}</span>
                    <h2 className={`text-lg font-bold ${c.title}`}>{section.title}</h2>
                  </div>
                  <p className="mb-4 text-sm text-gray-700">{section.content}</p>
                  <div className="space-y-3">
                    {section.details.map((d) => (
                      <div key={d.label} className="rounded-xl bg-white/60 p-4">
                        <p className={`mb-1 text-xs font-bold ${c.detail}`}>{d.label}</p>
                        <p className="text-sm text-gray-700">{d.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 廣告 1 */}
          <div className="mt-8">
            <AdUnit />
          </div>

          {/* 廣告 2 */}
          <div className="mt-6">
            <AdUnit />
          </div>

          {/* Affiliate CTA */}
          <div className="mt-6">
            <TaxAffiliateCTA />
          </div>

          {/* FAQ */}
          <div className="mb-8 mt-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">常見問題</h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <div key={faq.q} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-bold text-gray-900">Q：{faq.q}</p>
                  <p className="text-sm text-gray-600">A：{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related tools */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">相關工具與頁面</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { href: "/tax-calculator", label: "報稅試算", desc: "輸入所得直接算稅額" },
                { href: "/deduction-compare", label: "列舉vs標準扣除額", desc: "哪種扣法省稅更多" },
                { href: "/insurance-deduction-2026", label: "保險費扣除額", desc: "人身保險費每人24,000" },
                { href: "/ltc-deduction-2026", label: "長照扣除額", desc: "長期照顧特別扣除12萬" },
                { href: "/disability-deduction-2026", label: "身障扣除額", desc: "重大傷病卡21.8萬" },
                { href: "/donation-deduction-2026", label: "捐款節稅", desc: "列舉扣除最大化" },
                { href: "/legal-tax-savings-2026", label: "省稅10招", desc: "合法節稅完整攻略" },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="flex flex-col rounded-xl border border-gray-200 p-4 transition hover:border-red-400 hover:bg-red-50"
                >
                  <p className="font-semibold text-gray-900">{tool.label}</p>
                  <p className="mt-1 text-xs text-gray-500">{tool.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="mb-1 text-sm font-medium text-red-700">報稅截止：2026年5月31日</p>
            <p className="mb-4 text-xl font-bold text-red-900">醫藥費加上其他列舉，試算全年稅額</p>
            <Link
              href="/tax-calculator"
              className="inline-block rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-red-700"
            >
              立即試算 →
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
