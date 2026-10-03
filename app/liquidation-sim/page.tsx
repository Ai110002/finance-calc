"use client";

import Link from "next/link";
import { useMarginCalc } from "@/hooks/use-margin-calc";
import { StockRow } from "@/components/margin-ratio/stock-row";
import ScenarioChart from "@/components/liquidation-sim/scenario-chart";
import { HistoricalPanel } from "@/components/liquidation-sim/historical-panel";
import { Card } from "@/components/ui/card";
import { HISTORICAL_SCENARIOS, PRESET_DROPS } from "@/lib/constants";
import { simulateDrop, getZone } from "@/lib/calc/margin-ratio";
import { ZONES } from "@/lib/constants";
import { MARGIN_CALL_RATIO } from "@/lib/constants";
import { formatRatio, formatNTD } from "@/lib/format";

const FAQS = [
  {
    q: "融資跌幾%會被斷頭？",
    a: "沒有固定的百分比，答案取決於你的融資成數。當買入價與現價相同時，股價最多可跌幅度 =（1 − 1.3 × 融資成數）× 100%：成數 60% 約可跌 22%，成數 50% 約可跌 35%，成數 40% 約可跌 48%。如果你買進後股價已經上漲，緩衝會更大；如果一買就跌，緩衝就會比剛算出來的更小。實際數字請把持股輸入本頁模擬器直接讀取。",
  },
  {
    q: "模擬器裡的「追繳金額」怎麼算出來的？",
    a: "本站的定義是：需追繳金額 = 融資金額 × 130% − 目前市值，也就是把整戶維持率補回 130% 所需的差額。若維持率仍在 130% 以上，這一欄會顯示「—」，代表尚未達到追繳條件。例如融資金額 30 萬元、市值跌到 37.5 萬元（維持率 125%），需追繳 1.5 萬元。",
  },
  {
    q: "為什麼圖表上畫的是 130% 和 150% 兩條線？",
    a: "因為本站把 130% 當作追繳線、150% 當作注意線，圖上同時標出這兩條水平線，你就能一眼看出維持率曲線是在哪個跌幅區間穿越它們。圖表的橫軸從 0% 開始、每一格 1 個百分點往下走，快速情境表則是固定的 5% 級距，兩者搭配看最清楚。",
  },
  {
    q: "被斷頭之後，我還拿得回錢嗎？",
    a: "券商處分持股後會先清償你的融資金額與相關費用，如果賣出所得還有剩餘，餘額會退還給你；如果不足，你可能還需要補足差額。也就是說斷頭不代表債務一筆勾銷，它是「被動賣出」而不是「責任結束」。賣出的時點與價格由券商決定，這也正是斷頭最傷的地方。",
  },
  {
    q: "我要怎麼用這個模擬器設自己的警戒線？",
    a: "建議先用目前的持股跑一次，記下「股價最多可跌」這個數字，問自己：如果明天遇到一根這樣的跌幅，我睡得著嗎？如果答案是否定的，就往下調整：降低融資成數、減少部位、或先預留一筆可以隨時補繳的現金。接著把快速情境表中維持率最接近 150% 的那一列當成自己的警戒線，而不是等到 130% 才動作。",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

function InfoCard({
  step,
  icon,
  title,
  subtitle,
  children,
}: {
  step: string;
  icon: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-sm">
            {step}
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">
              <span className="mr-1">{icon}</span>
              {title}
            </h2>
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
        </div>
      </div>
      <div className="space-y-3 p-5 text-sm leading-relaxed text-gray-700">
        {children}
      </div>
    </div>
  );
}

export default function LiquidationSimPage() {
  const {
    positions,
    scenarios,
    updatePosition,
    addPosition,
    removePosition,
  } = useMarginCalc();

  const hasData = positions.some(
    (p) => p.shares > 0 && p.currentPrice > 0 && p.purchasePrice > 0
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-4 px-4 pt-6">
        <div>
          <h1 className="text-xl font-bold">斷頭模擬器</h1>
          <p className="text-sm text-gray-500">
            模擬股價下跌對維持率的影響
          </p>
        </div>

        {/* 導讀 */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
          <div className="space-y-3 p-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              📉 事前推演，而不是事後懊悔
            </div>
            <h2 className="text-base font-bold text-gray-900">
              這個模擬器在做什麼？
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              前面幾個數字只是起點。真正該問的問題是：「如果明天開始跌，我會在第幾%被追繳、第幾%被斷頭、要補多少錢？」這個頁面就是回答那一串問題。你只要把持股的股數、現價、買入價與融資成數填進去，模擬器就會沿著固定的跌幅級距，把每一個情境下的整戶維持率、狀態分類與追繳金額一次算給你，並且畫成一張可以一眼看出「在哪裡跌破線」的圖。
            </p>
            <p className="text-sm leading-relaxed text-gray-700">
              所有計算都跟本站的
              <Link
                href="/margin-ratio"
                className="mx-1 font-semibold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-800"
              >
                融資維持率計算器
              </Link>
              共用同一套公式：維持率 = 擔保品市值 ÷ 融資金額 × 100%，其中融資金額 = 股數 × 買入價 × 融資成數，而且是在買進當下就固定的數字。理解這一點，你就能自己驗證畫面上的每一個結果。
            </p>
          </div>
        </div>

        {/* 持股輸入 */}
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">持股明細</h2>
            <button
              onClick={addPosition}
              className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-100"
            >
              + 新增股票
            </button>
          </div>
          <div className="space-y-3">
            {positions.map((p) => (
              <StockRow
                key={p.id}
                position={p}
                onUpdate={updatePosition}
                onRemove={removePosition}
                canRemove={positions.length > 1}
              />
            ))}
          </div>
        </Card>

        {/* 下跌模擬圖表 */}
        {hasData && (
          <Card>
            <h2 className="mb-3 font-semibold">維持率 vs 股價跌幅</h2>
            <ScenarioChart scenarios={scenarios} />
          </Card>
        )}

        {/* 快速情境表 */}
        {hasData && (
          <Card>
            <h2 className="mb-3 font-semibold">快速情境</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-xs text-gray-500">
                    <th className="pb-2 pr-4">跌幅</th>
                    <th className="pb-2 pr-4">維持率</th>
                    <th className="pb-2 pr-4">狀態</th>
                    <th className="pb-2">追繳金額</th>
                  </tr>
                </thead>
                <tbody>
                  {PRESET_DROPS.map((drop) => {
                    const r = simulateDrop(positions, drop);
                    const zone = getZone(r.maintenanceRatio);
                    const zs = ZONES[zone];
                    return (
                      <tr key={drop} className="border-b border-gray-100">
                        <td className="py-2 pr-4 font-medium">{drop}%</td>
                        <td
                          className="py-2 pr-4 font-semibold"
                          style={{ color: zs.color }}
                        >
                          {formatRatio(r.maintenanceRatio)}
                        </td>
                        <td className="py-2 pr-4">
                          <span
                            className="rounded-full px-2 py-0.5 text-xs text-white"
                            style={{ backgroundColor: zs.color }}
                          >
                            {zs.label}
                          </span>
                        </td>
                        <td className="py-2 text-red-600">
                          {r.deficiency > 0 ? formatNTD(r.deficiency) : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* 歷史情境 */}
        <Card>
          <h2 className="mb-3 font-semibold">歷史崩盤情境回測</h2>
          <HistoricalPanel positions={positions} />
        </Card>

        {/* 1. 怎麼讀輸出 */}
        <InfoCard
          step="1"
          icon="🔍"
          title="怎麼讀這個模擬器的輸出"
          subtitle="三張卡片回答三個不同層次的問題"
        >
          <p>
            這個頁面總共會產生三種輸出，它們回答的問題不一樣，混著看很容易誤判，建議照下面的順序讀。
          </p>
          <div className="space-y-2">
            <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-black/5">
              <p className="text-xs font-bold text-blue-700">
                ① 維持率 vs 股價跌幅（折線圖）
              </p>
              <p className="mt-1 text-sm text-gray-700">
                橫軸是股價跌幅，從 0% 一路往左走到 −60%，每一格是 1 個百分點；縱軸是整戶維持率。圖上另外畫了兩條水平參考線：
                {MARGIN_CALL_RATIO}% 與 {ZONES.warning.min}%。當藍色曲線往下穿越第一條線，就是跌破本站的追繳線，穿越第二條線則是進入注意區。這張圖的用途是讓你看見「斜率」：維持率不是等速下降的，跌得越深，每多跌 1% 對維持率的傷害越大。
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-black/5">
              <p className="text-xs font-bold text-blue-700">
                ② 快速情境（表格）
              </p>
              <p className="mt-1 text-sm text-gray-700">
                表格把固定的跌幅級距
                {PRESET_DROPS.map((d) => `${d}%`).join("、")}
                列成八列，每一列顯示該跌幅下的維持率、狀態分類與追繳金額。追繳金額顯示「—」代表那個情境還沒跌破
                {MARGIN_CALL_RATIO}%，不需要補錢。這張表是你規劃補繳資金時最實用的工具，因為它給的是「多少錢」而不是「多少百分比」。
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-black/5">
              <p className="text-xs font-bold text-blue-700">
                ③ 歷史崩盤情境回測（卡片）
              </p>
              <p className="mt-1 text-sm text-gray-700">
                這一區把網站內建的歷史情境套用到你的持股上，讓你知道「如果歷史重演，我的帳戶會長什麼樣子」。內建情境包含
                {HISTORICAL_SCENARIOS.map(
                  (s) => `${s.name}（跌幅約 ${Math.abs(s.dropPercent)}%）`
                ).join("、")}
                。這些是歷史回顧用的幅度設定，不是對未來的預測。
              </p>
            </div>
          </div>
          <p>
            <span className="font-semibold text-gray-900">讀表的三個訣竅：</span>
            第一，先看「狀態」欄的顏色變化，那是最快掌握風險位置的線索。第二，再看「維持率」欄，注意它跨過
            {MARGIN_CALL_RATIO}% 的那一列。第三，最後才看追繳金額，因為那才是真的會從你口袋掏出去的數字。如果三個欄位一起看會頭暈，就只看追繳金額由「—」變成數字的第一次，那就是你的警戒起點。
          </p>
        </InfoCard>

        {/* 2. 流程 */}
        <InfoCard
          step="2"
          icon="⏱️"
          title="融資斷頭的完整流程與時間順序"
          subtitle="從跌破門檻到券商處分，中間發生什麼事"
        >
          <p>
            很多人以為斷頭是「股價一跌到某個數字，系統就自動把股票賣掉」。實際上它是一段有順序的流程，中間留給你的時間非常有限，但確實存在。理解順序，你才知道自己在哪一步還有選擇權。
          </p>
          <div className="space-y-2">
            {[
              {
                t: "第一步：整戶維持率跌破追繳線",
                d: `收盤後券商結算你的整戶維持率，一旦低於 ${MARGIN_CALL_RATIO}%，就進入需要處理的狀態。注意這是「整戶」，不是單一檔股票；也注意這是結算後的數字，不是你盤中看到的即時報價。`,
              },
              {
                t: "第二步：券商發出追繳通知",
                d: "券商會依契約約定的方式通知你，常見的是電話、簡訊、App 推播或對帳單。通知內容會包含你目前的維持率、需要補繳的金額，以及補繳的截止時間。這裡最重要的一句話是：通知是券商給你的機會，不是提醒你「再看看」。",
              },
              {
                t: "第三步：你在期限內補繳或自行減碼",
                d: "你有兩條路：補現金讓維持率回到門檻之上，或是自己賣掉部分持股把融資金額降下來。自行處理的好處是賣點由你決定；等到券商處理，賣點就由券商決定。",
              },
              {
                t: "第四步：期限屆滿仍未處理，券商開始處分",
                d: "期限過後，券商可以依契約逕行賣出你的擔保品（也就是斷頭、砍倉）。實務上券商會在市價賣出，可能是分批、也可能一次出清，你不會參與決定，也不一定能事先知道成交價格。",
              },
              {
                t: "第五步：結算與後續",
                d: "處分所得會先清償你的融資金額與相關費用，有餘額退還給你；不足的部分，你可能仍需補足。若因此產生債務不履行，券商可能依規定通報，影響你日後與金融機構的往來。",
              },
            ].map((s, i) => (
              <div key={s.t} className="rounded-xl bg-gray-50 p-4 ring-1 ring-black/5">
                <p className="text-xs font-bold text-blue-700">
                  {i + 1}. {s.t}
                </p>
                <p className="mt-1 text-sm text-gray-700">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-xs font-bold text-amber-800">⚠️ 關於時間</p>
            <p className="mt-1 text-sm text-amber-800">
              每一家券商對於追繳的通知方式、補繳期限與處分時點都有自己的規定，而且可能依市場狀況調整。本站刻意不在這裡寫死天數，因為寫死的天數對你沒有幫助、反而可能誤導。請直接以你開戶券商的契約與通知內容為準，並且在收到通知的第一時間就確認截止時間，不要憑印象估算。
            </p>
          </div>
          <p>
            <span className="font-semibold text-gray-900">
              為什麼流程對你有利也有害：
            </span>
            有利的是你確實有機會自己處理，不必把賣出決定權直接交給別人；有害的是這段時間通常短到來不及等到反彈，而且市場往往在你還在猶豫時繼續下跌。把時間序想清楚，你就不會把「有期限」誤解成「有很多時間」。
          </p>
        </InfoCard>

        {/* 3. 跌幅情境 */}
        <InfoCard
          step="3"
          icon="📊"
          title="不同跌幅情境下，維持率怎麼變化"
          subtitle="用固定級距把風險排成一張可比較的表"
        >
          <p>
            這個模擬器刻意採用固定的跌幅級距，而不是讓你自由拖動一個數字，原因是「可比較」。當你每次都用同一組跌幅來看自己的部位，你才能在不同時間、不同持股之間做對照，也才看得出自己的緩衝是在變大還是變小。以下是本站採用的級距，以及一個具體持股情境下會發生的變化。
          </p>
          <p>
            <span className="font-semibold text-gray-900">級距：</span>
            {PRESET_DROPS.map((d) => `${d}%`).join("、")}
            。從小幅回檔（5%、10%）一路到歷史級別的股災（40%、50%），級距刻意包含歷史情境用得到的深度：
            {HISTORICAL_SCENARIOS.map((s) => `${Math.abs(s.dropPercent)}%`).join("、")}
            % 這些幅度在內建情境裡都出現過。
          </p>
          <p>
            <span className="font-semibold text-gray-900">
              範例情境（可直接輸入模擬器驗證）：
            </span>
            1,000 股、買入價 500 元、現價 500 元、融資成數 60%，融資金額固定為 30 萬元。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-gray-500">
                  <th className="pb-2 pr-4">跌幅</th>
                  <th className="pb-2 pr-4">股價</th>
                  <th className="pb-2 pr-4">市值</th>
                  <th className="pb-2 pr-4">維持率</th>
                  <th className="pb-2 pr-4">狀態</th>
                  <th className="pb-2">追繳金額</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["-5%", "475 元", "47.5 萬", "158.3%", "注意", "—"],
                  ["-10%", "450 元", "45.0 萬", "150.0%", "注意", "—"],
                  ["-15%", "425 元", "42.5 萬", "141.7%", "危險", "—"],
                  ["-20%", "400 元", "40.0 萬", "133.3%", "危險", "—"],
                  ["-25%", "375 元", "37.5 萬", "125.0%", "斷頭", "1.5 萬"],
                  ["-30%", "350 元", "35.0 萬", "116.7%", "斷頭", "4.0 萬"],
                  ["-40%", "300 元", "30.0 萬", "100.0%", "斷頭", "9.0 萬"],
                  ["-50%", "250 元", "25.0 萬", "83.3%", "斷頭", "14.0 萬"],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">{row[0]}</td>
                    <td className="py-2 pr-4">{row[1]}</td>
                    <td className="py-2 pr-4">{row[2]}</td>
                    <td className="py-2 pr-4 font-semibold">{row[3]}</td>
                    <td className="py-2 pr-4">{row[4]}</td>
                    <td className="py-2 text-red-600">{row[5]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            觀察這張表有兩個重點。第一，維持率的下降不是等速的：從 0% 跌到 −10%，維持率從 166.7% 掉到 150.0%，少了 16.7 個百分點；再從 −10% 跌到 −20%，維持率掉到 133.3%，又少了 16.7 個百分點，看起來一樣；但從 −20% 到 −30%，維持率從 133.3% 掉到 116.7%，而跌幅只有 10%，實際上已經從「危險」掉進「斷頭」。第二，追繳金額的成長是加速的：1.5 萬、4 萬、9 萬、14 萬，每多跌一段，要補的錢就更多。
          </p>
          <p>
            把這張表跟你的現金水位放在一起看，你就能回答一個很具體的問題：「如果真的跌到 −30%，我拿得出 4 萬元補繳嗎？如果拿不出來，我現在該做什麼？」這比抽象地問「我的風險高不高」有用得多。
          </p>
        </InfoCard>

        {/* 4. 跌20%迷思 */}
        <InfoCard
          step="4"
          icon="🤔"
          title="為什麼「跌 20% 就斷頭」的直覺常常是錯的"
          subtitle="斷頭點不是一個固定百分比，而是一個關係"
        >
          <p>
            「融資六成，跌兩成就斷頭」是一個流傳很廣的說法，聽起來簡單好記，但它既不精確，也會讓你低估或高估自己的風險。它錯在哪裡？錯在把斷頭點當成一個固定的股價跌幅，而實際上斷頭點是由「融資金額占市值的比例」決定的。
          </p>
          <p>
            <span className="font-semibold text-gray-900">正確的關係是這樣：</span>
            當買入價與現價相同時，股價最多可跌幅度 =（1 − {MARGIN_CALL_RATIO / 100} × 融資成數）×
            100%。融資成數 60% 時，答案約是 22%，不是 20%；成數 50% 時約 35%；成數 40% 時約 48%。換句話說，「跌幾%會斷頭」的第一個決定因素不是股票，而是你開了多少成數。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-gray-500">
                  <th className="pb-2 pr-4">融資成數</th>
                  <th className="pb-2 pr-4">起始維持率</th>
                  <th className="pb-2">股價最多可跌</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">40%</td>
                  <td className="py-2 pr-4">250.0%</td>
                  <td className="py-2 font-semibold text-emerald-700">48%</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">50%</td>
                  <td className="py-2 pr-4">200.0%</td>
                  <td className="py-2 font-semibold text-emerald-700">35%</td>
                </tr>
                <tr className="border-b border-gray-100 bg-blue-50/50">
                  <td className="py-2 pr-4 font-medium">60%（本站預設）</td>
                  <td className="py-2 pr-4">166.7%</td>
                  <td className="py-2 font-semibold text-amber-700">22%</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">70%</td>
                  <td className="py-2 pr-4">142.9%</td>
                  <td className="py-2 font-semibold text-red-600">9%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            第二個讓直覺失準的因素是「跌 20% 是相對誰」。新聞說的跌幅是相對昨天的收盤價，但你的維持率是相對「買進時的融資金額」。如果你在股價 400 元時買進、成數 60%，融資金額是 24 萬元；當股價漲到 500 元、市值 50 萬元，維持率是 208.3%，最大可跌幅度約 37.6%。同樣一檔股票、同樣的成數，只因為買進價不同，緩衝就從 22% 變成 37.6%。這就是為什麼「用一個固定百分比判斷所有人的斷頭點」注定不準。
          </p>
          <p>
            第三個因素是「分母不會跟著跌」。現股投資人跌 50% 就是資產少一半；融資投資人的分母是固定的借款，所以股價跌 50% 對自有資金的傷害遠大於 50%。斷頭機制就是這個放大效果的末端產物，它不是突然出現的懲罰，而是槓桿在數學上的必然結果。
          </p>
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-xs font-bold text-blue-800">
              💡 一句話記住
            </p>
            <p className="mt-1 text-sm text-blue-800">
              斷頭點不是「跌幾%」的問題，而是「你借了多少」的問題。想知道自己的答案，唯一可靠的方法是把實際數字填進這個模擬器，讀它算出來的「股價最多可跌」——那個數字才是專屬於你的。
            </p>
          </div>
        </InfoCard>

        {/* 5. 斷頭之後 */}
        <InfoCard
          step="5"
          icon="💥"
          title="斷頭之後會發生什麼事"
          subtitle="被動賣出、款項結算、以及留下來的紀錄"
        >
          <p>
            斷頭不是一個瞬間的事件，而是一連串後果的開始。很多人只想到「股票被賣掉」，實際上後面還有幾件事同時發生。
          </p>
          <div className="space-y-2">
            <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-black/5">
              <p className="text-xs font-bold text-red-700">
                ① 你失去賣點的決定權
              </p>
              <p className="mt-1 text-sm text-gray-700">
                券商處分是為了收回借款，不是為了幫你賣在好價格。處分的時點、批次與價格都由券商依內部程序決定，你可能是在下跌途中被賣出，也可能是在反彈前一刻被賣出。這是斷頭最實質的損失：不是價格本身，而是決策權。
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-black/5">
              <p className="text-xs font-bold text-red-700">
                ② 賣出後的款項結算
              </p>
              <p className="mt-1 text-sm text-gray-700">
                處分所得會先清償你的融資金額與相關費用，剩下的餘額退還給你。所以斷頭之後你通常還是會拿回一部分錢，不是全部歸零。
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-black/5">
              <p className="text-xs font-bold text-red-700">
                ③ 不足清償時仍有責任
              </p>
              <p className="mt-1 text-sm text-gray-700">
                如果賣出所得不足以清償借款與相關費用，你可能仍需要補足差額。斷頭是「強制賣出」，不是「債務免除」；把它想成「事情結束了」是危險的誤解。
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-black/5">
              <p className="text-xs font-bold text-red-700">
                ④ 信用紀錄與往後往來
              </p>
              <p className="mt-1 text-sm text-gray-700">
                若因融資違約而產生債務不履行，券商可能依規定通報，日後你與金融機構往來時，可能在信用評價、開戶、申請融資額度等方面受到影響。這部分的實際規定與影響範圍依相關法規與各機構內部規範而定，本站不在此斷言具體年限或後果，但「會留下紀錄」這件事是可以肯定的方向。
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-black/5">
              <p className="text-xs font-bold text-red-700">
                ⑤ 心理與行為層面的連鎖反應
              </p>
              <p className="mt-1 text-sm text-gray-700">
                被斷頭之後最容易出現的行為是「急著賺回來」，於是把剩下的資金投入更高風險的標的，或用更高的槓桿再進場。這往往比原本那筆虧損更傷。事前用模擬器把最壞情境演練過一次，最大的價值就在這裡：你會知道最壞的數字是多少，就不容易在情緒裡做決定。
              </p>
            </div>
          </div>
        </InfoCard>

        {/* 6. 事前規劃 */}
        <InfoCard
          step="6"
          icon="🎯"
          title="如何用這個模擬器事前規劃自己的警戒線"
          subtitle="把「券商的通知線」變成「你自己的行動線」"
        >
          <p>
            券商的通知線是 {MARGIN_CALL_RATIO}
            %，但你不應該等到那條線才開始動作。等到那一刻，你的選擇只剩下補錢或賣股，而且時間很短。比較好的做法是設一條屬於自己的、比券商更早的警戒線，並且在設定它的時候就算清楚「到時候我要做什麼」。
          </p>
          <div className="space-y-2">
            <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-black/5">
              <p className="text-xs font-bold text-blue-700">
                步驟一：先跑一次現況
              </p>
              <p className="mt-1 text-sm text-gray-700">
                把你的實際持股填進來（可多檔），記下整戶維持率與「股價最多可跌」這兩個數字。前者告訴你現在站在哪裡，後者告訴你還有多遠。
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-black/5">
              <p className="text-xs font-bold text-blue-700">
                步驟二：在快速情境表裡找到自己的警戒列
              </p>
              <p className="mt-1 text-sm text-gray-700">
                通常會把維持率最接近 {ZONES.warning.min}
                % 的那一列當成警戒線，因為那是「還沒被追繳、但已經該準備」的位置。如果你的持股在 −10% 或 −15% 就會掉到那條線附近，那就是你的實際緩衝。
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-black/5">
              <p className="text-xs font-bold text-blue-700">
                步驟三：先決定好那時候要做什麼
              </p>
              <p className="mt-1 text-sm text-gray-700">
                你可以選「已經準備好一筆補繳現金」、「到那條線就主動減碼一部分」，或「一開始就用更低的融資成數讓那條線距離更遠」。三種都可以，重點是事前決定，而不是在下跌的當天臨時想。
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-black/5">
              <p className="text-xs font-bold text-blue-700">
                步驟四：用歷史情境做壓力測試
              </p>
              <p className="mt-1 text-sm text-gray-700">
                把內建的歷史情境卡片當成壓力測試。如果
                {HISTORICAL_SCENARIOS.map((s) => s.name).join("、")}
                這些幅度今天重演，你的追繳金額是多少？如果那個數字超過你手邊的現金，就代表你的部位太大或成數太高。
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-black/5">
              <p className="text-xs font-bold text-blue-700">
                步驟五：定期重算，而不是算一次
              </p>
              <p className="mt-1 text-sm text-gray-700">
                股價變動之後，分母不變但分子改變，你的緩衝也跟著改變。建議在每次加碼、每次大盤出現明顯波動後重跑一次，尤其是當你打算再融資加碼同一檔股票時，因為那會同時拉高融資金額與集中度，是風險上升最快的時刻。
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-xs font-bold text-emerald-800">
              ✅ 一個實用的自我檢查
            </p>
            <p className="mt-1 text-sm text-emerald-800">
              如果模擬結果顯示你在 −20% 以內就會跌破 {MARGIN_CALL_RATIO}
              %，那代表你幾乎沒有緩衝，任何一次正常的市場回檔都可能讓你收到追繳通知。這種情況下，降低融資成數或減少部位，通常比準備一筆補繳現金更有效，因為前者降低了風險本身，後者只是準備好承受風險的錢。
            </p>
          </div>
        </InfoCard>

        {/* FAQ */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
          <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-900">
            <span>❓</span>常見問題
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl border border-gray-200 bg-gray-50 p-4"
              >
                <p className="mb-1 text-sm font-bold text-gray-900">
                  Q：{faq.q}
                </p>
                <p className="text-sm leading-relaxed text-gray-600">
                  A：{faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 相關頁面 */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
          <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-gray-900">
            <span>🔗</span>接下來你可以看這些
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-gray-600">
            模擬完跌幅之後，建議回到
            <Link
              href="/margin-ratio"
              className="mx-1 font-semibold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-800"
            >
              融資維持率計算器
            </Link>
            看目前的整戶維持率、追繳金額與公式細節，兩頁共用同一套算法，數字一定對得起來。斷頭帶來的損失不只是價差，還包含賣出時的交易成本，這些在
            <Link
              href="/stock-tax-2026"
              className="mx-1 font-semibold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-800"
            >
              投資稅務總整理
            </Link>
            裡有完整說明；如果你是短線進出、常常在盤中買賣，也別忘了把
            <Link
              href="/day-trading-tax"
              className="mx-1 font-semibold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-800"
            >
              當沖稅費試算
            </Link>
            的成本算進去，因為那些費用會讓你的實際虧損比帳面更難看。
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                href: "/margin-ratio",
                label: "融資維持率計算器",
                desc: "整戶維持率、追繳金額與公式",
              },
              {
                href: "/stock-tax-2026",
                label: "投資稅務總整理",
                desc: "證交稅、手續費與股利申報",
              },
              {
                href: "/day-trading-tax",
                label: "當沖稅費試算",
                desc: "短線交易的實際成本",
              },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="flex flex-col rounded-xl border border-gray-200 p-4 transition hover:border-blue-400 hover:bg-blue-50"
              >
                <p className="font-semibold text-gray-900">{t.label}</p>
                <p className="mt-1 text-xs text-gray-500">{t.desc}</p>
              </Link>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-gray-100 p-4 text-xs leading-relaxed text-gray-500">
            本頁為情境模擬工具與一般性知識說明，所有結果都是依你輸入的假設與本站固定公式計算出來的試算值，不代表任何券商的實際計算方式、也不構成投資建議。實際的追繳門檻、補繳期限、利率、費用與處分程序，請以你開戶券商的契約、公告與通知為準。
          </div>
        </div>
      </div>
    </>
  );
}
