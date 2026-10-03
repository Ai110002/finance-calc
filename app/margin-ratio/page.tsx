"use client";

import Link from "next/link";
import { useMarginCalc } from "@/hooks/use-margin-calc";
import { StockRow } from "@/components/margin-ratio/stock-row";
import { RatioResult } from "@/components/margin-ratio/ratio-result";
import { Card } from "@/components/ui/card";
import { ZONES, MARGIN_CALL_RATIO } from "@/lib/constants";

const FAQS = [
  {
    q: "融資維持率怎麼算？公式是什麼？",
    a: "整戶維持率 = 擔保品市值 ÷ 融資金額 × 100%。分子「擔保品市值」是股數 × 現價，會隨股價每天變動；分母「融資金額」是股數 × 買入價 × 融資成數，在你買進那一刻就固定下來，之後股價怎麼跌都不會自己變小（除非你賣股還款或補繳現金）。多檔持股時，把每一檔的市值加總放分子、每一檔的融資金額加總放分母，就是券商看的整戶維持率。",
  },
  {
    q: "整戶維持率多少算安全？多少會被追繳？",
    a: "本站計算器採用四個區間：維持率 166% 以上為安全，150% 以上為注意，130% 以上為危險，低於 130% 進入斷頭區（這些門檻直接取自網站內建常數）。其中 130% 是本站採用的追繳線，跌破 130% 就是一般所稱的「追繳」。要提醒的是，各家券商的實際規定、通知方式與補繳期限可能不同，最終請以你開戶券商的公告與通知為準。",
  },
  {
    q: "收到追繳通知要補多少錢？",
    a: "本站計算器的「需追繳金額」定義為「把整戶維持率補回 130% 所需要的差額」，算式是：需追繳金額 = 融資金額 × 130% − 目前市值。舉例：融資金額 30 萬元、目前市值 37.5 萬元（維持率 125%），則需追繳 = 39 萬 − 37.5 萬 = 1.5 萬元。若想補到 150% 需要 7.5 萬元，補到 166% 需要 12.3 萬元。",
  },
  {
    q: "只補到 130% 就夠了嗎？",
    a: "補到 130% 只是剛好回到追繳線上緣，緩衝空間等於零。只要隔天再跌一點，維持率馬上又跌破 130%，你會再收到一次追繳通知。實務上比較穩健的做法是把緩衝留在前面：補到 150% 以上，或直接補到 166% 的安全線，讓自己有機會撐過一段震盪而不是每天被追繳。",
  },
  {
    q: "融資利息會不會影響維持率？利息怎麼算？",
    a: "本站計算器的維持率只看「市值 ÷ 融資金額」，並沒有把融資利息算進去，所以你輸入的數字算出來會比實際帳務稍微樂觀一些。融資利息的一般算法是：融資金額 × 年利率 ÷ 365 × 持有天數，實際年利率依各券商公告與標的而定。利息本身不會直接壓低維持率，但它會實實在在吃掉你的報酬，短線頻繁進出的融資族感受最明顯。",
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
      <div className="border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-white px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-sm font-bold text-white shadow-sm">
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

export default function MarginRatioPage() {
  const { positions, result, updatePosition, addPosition, removePosition } =
    useMarginCalc();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-4 px-4 pt-6">
        <div>
          <h1 className="text-xl font-bold">融資維持率計算器</h1>
          <p className="text-sm text-gray-500">
            輸入持股資料，即時計算整戶維持率
          </p>
        </div>

        {/* 導讀 */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
          <div className="space-y-3 p-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              🛡️ 融資族風控入門
            </div>
            <h2 className="text-base font-bold text-gray-900">
              什麼是融資維持率？先看你借的錢還有多少股票在擔保
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              融資維持率（券商常寫成「整戶維持率」或「擔保維持率」）是券商用來衡量你的融資帳戶還安不安全的核心指標。算式非常單純：股票市值 ÷ 融資金額 × 100%。分子是你手上融資持股的市價總值，分母是你當初向券商借的錢。股價下跌會讓分子變小，分母卻不會跟著變小，所以維持率會一路往下掉；當它跌破券商規定的門檻，券商就會發出追繳通知，再不處理就會強制賣出你的股票，也就是大家口中的「斷頭」。
            </p>
            <p className="text-sm leading-relaxed text-gray-700">
              這個頁面就是幫你在事情發生之前先算清楚：你現在的整戶維持率是多少、距離危險線還有多遠、股價最多還能跌幾%、以及如果真的跌破門檻，你需要補多少錢。下方計算器可以一次輸入多檔持股，因為券商看的是整戶合計，不是單一檔股票。
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
                <p className="text-xs font-medium text-emerald-700">
                  📐 維持率公式
                </p>
                <p className="mt-1 text-sm font-bold text-emerald-900">
                  市值 ÷ 融資金額 × 100%
                </p>
                <p className="mt-1 text-xs text-emerald-700">
                  分子用現價，分母用買進時的融資金額
                </p>
              </div>
              <div className="rounded-xl bg-blue-50 p-4 ring-1 ring-blue-100">
                <p className="text-xs font-medium text-blue-700">🚦 追繳線</p>
                <p className="mt-1 text-sm font-bold text-blue-900">
                  {MARGIN_CALL_RATIO}%
                </p>
                <p className="mt-1 text-xs text-blue-700">
                  低於此線即為本站定義的斷頭區
                </p>
              </div>
              <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-100">
                <p className="text-xs font-medium text-amber-700">✅ 安全線</p>
                <p className="mt-1 text-sm font-bold text-amber-900">
                  {ZONES.safe.min}%
                </p>
                <p className="mt-1 text-xs text-amber-700">
                  維持率在此之上才算留有緩衝
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 結果（置頂） */}
        <Card>
          <RatioResult result={result} />
        </Card>

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

        {/* 說明 */}
        <div className="rounded-xl bg-gray-100 p-4 text-xs text-gray-500">
          <p className="mb-1 font-medium text-gray-700">計算公式</p>
          <p>整戶維持率 = 擔保品市值 ÷ 融資金額 × 100%</p>
          <p>融資金額 = 股數 × 買入價 × 融資成數</p>
          <p className="mt-2">
            維持率低於 130% 時，券商會發出追繳通知，需在 2
            個營業日內補繳差額，否則將被強制賣出（斷頭）。
          </p>
        </div>

        {/* 1. 公式 */}
        <InfoCard
          step="1"
          icon="📐"
          title="融資維持率的公式：三個數字決定一切"
          subtitle="看懂分子、分母，就知道為什麼股價下跌這麼致命"
        >
          <p>
            整個融資維持率只有三個數字在互相拉扯，把它們記牢，後面所有情境都能自己推導，不需要背表格。
          </p>
          <div className="space-y-2">
            <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-black/5">
              <p className="text-xs font-bold text-emerald-700">
                分子：擔保品市值（會變動）
              </p>
              <p className="mt-1 text-sm text-gray-700">
                擔保品市值 = 股數 × 目前股價。這是唯一會每天跳動的數字。股價跌一成，分子就少一成。
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-black/5">
              <p className="text-xs font-bold text-blue-700">
                分母：融資金額（買進後就固定）
              </p>
              <p className="mt-1 text-sm text-gray-700">
                融資金額 = 股數 × 買入價 × 融資成數。它是在你買進當下用「買入價」算出來的，之後股價再怎麼跌，這個數字都不會自己變小。分母不動、分子變小，比率當然直線下墜，這就是融資比現股危險的根本原因。
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-black/5">
              <p className="text-xs font-bold text-amber-700">
                比率：兩者相除
              </p>
              <p className="mt-1 text-sm text-gray-700">
                維持率 = 市值 ÷ 融資金額 × 100%。只要知道這三個數字，你就可以隨時手算驗證頁面上的結果。
              </p>
            </div>
          </div>
          <p>
            <span className="font-semibold text-gray-900">實際範例：</span>
            假設你買進 1,000 股、買入價 500 元、融資成數 60%，那麼融資金額 = 1,000 × 500 × 60% = 30 萬元，自備款是剩下的 20 萬元。如果現價剛好還是 500 元，市值 = 50 萬元，維持率 = 50 萬 ÷ 30 萬 × 100% = 166.7%，正好落在安全線上。
          </p>
          <p>
            <span className="font-semibold text-gray-900">多檔持股怎麼算：</span>
            把每一檔的市值相加放分子，每一檔的融資金額相加放分母。這個「相加」的動作看起來很簡單，卻是後面「整戶」這個概念的關鍵。
          </p>
        </InfoCard>

        {/* 2. 整戶 vs 個股 */}
        <InfoCard
          step="2"
          icon="🏦"
          title="整戶維持率 vs 個股維持率：券商只看整戶"
          subtitle="同一融資帳戶裡的所有部位合併計算"
        >
          <p>
            很多投資人以為券商是「一檔一檔盯著看」，其實券商計算的是整戶：同一個融資信用帳戶底下所有融資買進的股票，市值全部加總、融資金額也全部加總，算出來的才是會觸發追繳的那個數字。個股維持率只存在於你自己的試算表裡，券商不會用它來決定要不要通知你。
          </p>
          <p>
            券商為什麼要用整戶？因為對券商來說，你的股票是擔保品，擔保品的價值要看整體。當帳戶真的需要處分時，券商也可以挑流動性好、容易賣掉的部位來賣，而不是非得砍掉跌最兇的那一檔。這是制度設計上的方便，不是對你的優待。
          </p>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-xs font-bold text-amber-800">
              ⚠️ 整戶計算的雙面刃
            </p>
            <p className="mt-1 text-sm text-amber-800">
              整戶計算會讓風險被「平均掉」。你可能有某一檔已經跌到體無完膚，但只要另一檔剛好在漲，整戶維持率看起來仍然過關。反過來說，也可能出現整戶維持率還很漂亮，實際上你的資金卻高度集中在單一檔股票上，一旦那一檔出事，整戶會瞬間崩壞。整戶維持率是券商的風控線，不是你的風控線。
            </p>
          </div>
          <p>
            <span className="font-semibold text-gray-900">
              實際範例（可輸入計算器驗證）：
            </span>
            兩檔股票各 1,000 股、買入價都是 500 元、融資成數都是 60%，所以各借 30 萬元、合計融資金額 60 萬元。假設 A 股跌到 250 元、B 股漲到 600 元，則市值 = 25 萬 + 60 萬 = 85 萬元，整戶維持率 = 85 萬 ÷ 60 萬 × 100% = 141.7%，落在本站的「危險」區間，還沒跌破追繳線。但如果只看 A 股自己的個股維持率，是 25 萬 ÷ 30 萬 × 100% = 83.3%，早就不知道掉到斷頭區多深了。這個落差就是整戶計算的威力，也是它容易讓人鬆懈的地方。
          </p>
          <p>
            實務上的結論很簡單：整戶維持率要算，因為那是券商的觸發條件；但你自己更應該盯的是「最弱的那一檔」以及「單一持股占整戶市值的比重」。當某一檔的市值占比特別高，整戶維持率對你來說就只是幻覺。
          </p>
        </InfoCard>

        {/* 3. 門檻 */}
        <InfoCard
          step="3"
          icon="🚦"
          title="追繳線與斷頭線：四個門檻怎麼看"
          subtitle="以下數字直接取自本站內建常數，非憑印象填寫"
        >
          <p>
            本站計算器與警示顏色採用四個門檻。這些數字不是我們隨手寫的，而是直接讀取網站內建常數後顯示，因此你在頁面上看到的顏色分區，跟下方表格一定是同一套標準。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-gray-500">
                  <th className="pb-2 pr-4">區間</th>
                  <th className="pb-2 pr-4">維持率</th>
                  <th className="pb-2 pr-4">頁面標示</th>
                  <th className="pb-2">代表意義</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">安全</td>
                  <td className="py-2 pr-4 font-semibold text-emerald-600">
                    {ZONES.safe.min}% 以上
                  </td>
                  <td className="py-2 pr-4">
                    <span
                      className="rounded-full px-2 py-0.5 text-xs text-white"
                      style={{ backgroundColor: ZONES.safe.color }}
                    >
                      {ZONES.safe.label}
                    </span>
                  </td>
                  <td className="py-2 text-gray-600">留有緩衝空間</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">注意</td>
                  <td className="py-2 pr-4 font-semibold text-yellow-600">
                    {ZONES.warning.min}% ~ {ZONES.safe.min}%
                  </td>
                  <td className="py-2 pr-4">
                    <span
                      className="rounded-full px-2 py-0.5 text-xs text-white"
                      style={{ backgroundColor: ZONES.warning.color }}
                    >
                      {ZONES.warning.label}
                    </span>
                  </td>
                  <td className="py-2 text-gray-600">
                    還沒被追繳，但應該開始準備
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">危險</td>
                  <td className="py-2 pr-4 font-semibold text-red-500">
                    {ZONES.danger.min}% ~ {ZONES.warning.min}%
                  </td>
                  <td className="py-2 pr-4">
                    <span
                      className="rounded-full px-2 py-0.5 text-xs text-white"
                      style={{ backgroundColor: ZONES.danger.color }}
                    >
                      {ZONES.danger.label}
                    </span>
                  </td>
                  <td className="py-2 text-gray-600">
                    貼著追繳線，一有風吹草動就翻臉
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">斷頭</td>
                  <td className="py-2 pr-4 font-semibold text-red-800">
                    {ZONES.danger.min}% 以下
                  </td>
                  <td className="py-2 pr-4">
                    <span
                      className="rounded-full px-2 py-0.5 text-xs text-white"
                      style={{ backgroundColor: ZONES.critical.color }}
                    >
                      {ZONES.critical.label}
                    </span>
                  </td>
                  <td className="py-2 text-gray-600">
                    低於追繳線，券商可處分持股
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            {MARGIN_CALL_RATIO}% 是本站採用的追繳線：維持率跌破 {MARGIN_CALL_RATIO}
            %，就屬於需要處理的狀況；維持率低於 {ZONES.danger.min}
            % 則進入斷頭區。{ZONES.warning.min}% 是注意線，用來提醒你「還沒出事，但該準備了」。
            {ZONES.safe.min}% 是安全線，也就是買進當下融資成數 60% 時的起始維持率。
          </p>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs font-bold text-gray-700">
              要特別說明的一件事
            </p>
            <p className="mt-1 text-sm text-gray-600">
              各家券商的徵信標準、追繳門檻、通知方式與補繳期限可能不同，同一套制度在不同時期也可能調整。本站的門檻是網站採用的一套一致標準，用途是讓你先有一個可計算、可比較的基準線；實際會不會被追繳、要在多久內補多少錢，請以你開戶券商的公告、對帳單與通知內容為準。這一頁的所有數字都請當成「試算基準」，而不是法律或契約條文。
            </p>
          </div>
          <p>
            除了顏色與區間，計算器上方還會顯示兩個很實用的衍生數字：
            <span className="font-semibold text-gray-900">距離斷頭線</span>
            是目前維持率減掉 {MARGIN_CALL_RATIO}
            % 的百分點差距；
            <span className="font-semibold text-gray-900">股價最多可跌</span>
            則是股價還能下跌多少百分比才會觸及追繳線。後者比前者直覺得多，因為它可以直接跟你在新聞上看到的跌幅相比。
          </p>
        </InfoCard>

        {/* 4. 追繳處理 */}
        <InfoCard
          step="4"
          icon="🆘"
          title="收到追繳通知時，你可以做的三件事"
          subtitle="補繳現金、賣股還款，或什麼都不做"
        >
          <p>
            維持率跌破追繳線之後，你通常會收到券商的通知。通知本身不是壞消息，壞消息是你不理它。實務上你只有兩條主動的路可以走：補錢，或是把借款降下來；不做任何事，就是把決定權交給券商的處分程序。
          </p>
          <div className="space-y-2">
            <div className="rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
              <p className="text-xs font-bold text-emerald-800">
                路線一：補繳現金
              </p>
              <p className="mt-1 text-sm text-gray-700">
                算式：需追繳金額 = 融資金額 × {MARGIN_CALL_RATIO}% −
                目前市值。補進去的現金會直接墊高帳戶的擔保價值，讓維持率回到門檻之上。這是最直接、也最不傷害部位的方式，前提是你手上真的有閒置現金。
              </p>
            </div>
            <div className="rounded-xl bg-blue-50 p-4 ring-1 ring-blue-100">
              <p className="text-xs font-bold text-blue-800">
                路線二：賣股還款，降低融資金額
              </p>
              <p className="mt-1 text-sm text-gray-700">
                賣出部分持股並把錢拿去還融資，會同時讓分子（市值）與分母（融資金額）變小。算式上，若原本市值 M、融資金額 L，賣掉價值 S 的股票並全數還款，新維持率 = (M − S) ÷ (L − S) × 100%。因為分子分母同步縮小，你必須賣掉相當比例的持股才會看到明顯效果，殺雞用牛刀是沒用的。
              </p>
            </div>
            <div className="rounded-xl bg-red-50 p-4 ring-1 ring-red-100">
              <p className="text-xs font-bold text-red-800">
                路線三：不處理
              </p>
              <p className="mt-1 text-sm text-gray-700">
                期限過後券商可以逕行處分你的持股，也就是斷頭。處分的時點與價格由券商決定，你不但失去了選擇賣點的權利，還可能被賣在相對低點。這條路最大的問題不是虧損，而是把控制權交出去。
              </p>
            </div>
          </div>
          <p>
            <span className="font-semibold text-gray-900">
              補繳金額實算（可對照計算器）：
            </span>
            情境是 1,000 股、買入價 500 元、融資成數 60%，融資金額 30 萬元；假設股價跌到 375 元，市值 37.5 萬元，維持率 125%，已跌破追繳線。想補到不同水位，需要的現金完全不同：
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-gray-500">
                  <th className="pb-2 pr-4">目標維持率</th>
                  <th className="pb-2 pr-4">需要市值</th>
                  <th className="pb-2">需補金額</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">
                    {MARGIN_CALL_RATIO}%（回到追繳線）
                  </td>
                  <td className="py-2 pr-4">39.0 萬元</td>
                  <td className="py-2 font-semibold text-emerald-700">
                    1.5 萬元
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">
                    {ZONES.warning.min}%（回到注意線）
                  </td>
                  <td className="py-2 pr-4">45.0 萬元</td>
                  <td className="py-2 font-semibold text-amber-700">
                    7.5 萬元
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">
                    {ZONES.safe.min}%（回到安全線）
                  </td>
                  <td className="py-2 pr-4">49.8 萬元</td>
                  <td className="py-2 font-semibold text-red-600">
                    12.3 萬元
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            同樣的情境，如果選擇賣股還款：賣掉 400 股、以 375 元計算可得 15 萬元並全數還款，剩下的 600 股市值 22.5 萬元、融資金額降為 15 萬元，維持率剛好回到 150%。想只補回 130% 的話，大約要賣 134 股。你會發現「賣股」看起來比較輕鬆，實際上要動到的部位並不小，而且等於把未來的上漲機會一起賣掉。
          </p>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-xs font-bold text-amber-800">⚠️ 補到剛好最危險</p>
            <p className="mt-1 text-sm text-amber-800">
              只補到 {MARGIN_CALL_RATIO}
              % 等於把維持率貼在懸崖邊上，隔天再跌一點就又跌破。要嘛一次補到安全線以上，要嘛就誠實面對部位太大的事實、降低持股，不要用「補到剛好」來延後決定。
            </p>
          </div>
        </InfoCard>

        {/* 5. 成數與損益 */}
        <InfoCard
          step="5"
          icon="📉"
          title="融資成數、融資利率與實際損益"
          subtitle="成數決定你的緩衝，利率決定你的成本"
        >
          <p>
            融資成數是「券商願意借你多少比例」的設定。成數越高，你自備的錢越少、槓桿越大，但維持率的起始值也越低，能承受的跌幅越小。本站計算器的融資成數預設為 60%，你可以依實際核貸的成數自行調整欄位；實際成數依券商與標的公告而定。
          </p>
          <p>
            <span className="font-semibold text-gray-900">兩個必記的關係：</span>
            自備款比率 = 1 − 融資成數；槓桿倍數 = 1 ÷ (1 − 融資成數)。以 60% 成數為例，自備款是 4 成，槓桿是 2.5 倍。
          </p>
          <p>
            更關鍵的是「最大可跌幅度」。在本站程式使用的公式下，當買入價與現價相同時，股價最多可跌百分比 = (1 − {MARGIN_CALL_RATIO / 100} × 融資成數) ×
            100%。也就是說，同樣的股票、同樣的金額，成數不同，你能承受的跌幅差非常多：
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-gray-500">
                  <th className="pb-2 pr-4">融資成數</th>
                  <th className="pb-2 pr-4">自備比率</th>
                  <th className="pb-2 pr-4">槓桿倍數</th>
                  <th className="pb-2 pr-4">起始維持率</th>
                  <th className="pb-2">股價最多可跌</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">40%</td>
                  <td className="py-2 pr-4">60%</td>
                  <td className="py-2 pr-4">1.67 倍</td>
                  <td className="py-2 pr-4">250.0%</td>
                  <td className="py-2 font-semibold text-emerald-700">48%</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium">50%</td>
                  <td className="py-2 pr-4">50%</td>
                  <td className="py-2 pr-4">2.00 倍</td>
                  <td className="py-2 pr-4">200.0%</td>
                  <td className="py-2 font-semibold text-emerald-700">35%</td>
                </tr>
                <tr className="border-b border-gray-100 bg-emerald-50/50">
                  <td className="py-2 pr-4 font-medium">60%（本站預設）</td>
                  <td className="py-2 pr-4">40%</td>
                  <td className="py-2 pr-4">2.50 倍</td>
                  <td className="py-2 pr-4">166.7%</td>
                  <td className="py-2 font-semibold text-amber-700">22%</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">70%</td>
                  <td className="py-2 pr-4">30%</td>
                  <td className="py-2 pr-4">3.33 倍</td>
                  <td className="py-2 pr-4">142.9%</td>
                  <td className="py-2 font-semibold text-red-600">9%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            這張表是這一頁最值得記住的東西：成數從 60% 拉到 70%，起始維持率就從 166.7% 掉到 142.9%，只剩 9% 的下跌空間。很多人是被「可以借更多」吸引而開到高成數，卻沒意識到自己同時把斷頭線往上拉到腳邊。
          </p>
          <p>
            <span className="font-semibold text-gray-900">融資利息的成本：</span>
            融資利息的一般算式是 融資金額 × 年利率 ÷ 365 × 持有天數，實際年利率依券商公告與標的信用等級而定。利息不會直接改變本站計算器算出的維持率（分母是融資金額，不含利息），但它會實實在在吃掉你的獲利。持有 30 萬元的融資部位，利息是照天數累積的，短進短出的交易者最有感；長期抱著的人則會發現「股價明明漲了，實際拿回來的錢比想像中少」。
          </p>
          <p>
            <span className="font-semibold text-gray-900">
              槓桿對自備款報酬的放大：
            </span>
            買 1,000 股、買入價 500 元、成數 60%，自備 20 萬元、融資 30 萬元。若股價上漲 10% 到 550 元，市值 55 萬元，扣掉 30 萬元借款後約剩 25 萬元，相當於自備款賺了 25%；若下跌 10% 到 450 元，市值 45 萬元，扣掉借款約剩 15 萬元，自備款虧了 25%。上漲與下跌都被放大 2.5 倍，這正是槓桿的本質，也是為什麼融資族更需要事前算清楚自己能承受多少跌幅。
          </p>
        </InfoCard>

        {/* 6. 常見誤解 */}
        <InfoCard
          step="6"
          icon="🧠"
          title="關於融資維持率的常見誤解"
          subtitle="這幾句話幾乎每個融資族都說過"
        >
          <div className="space-y-2">
            <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-black/5">
              <p className="text-xs font-bold text-red-700">
                誤解一：「維持率是看我的買進成本」
              </p>
              <p className="mt-1 text-sm text-gray-700">
                不對。分子用的是「市價」，不是買進成本。買進成本只透過分母（融資金額 = 股數 × 買入價 × 融資成數）影響維持率。這也是為什麼買進之後股價上漲，維持率會跟著變高；如果維持率是看成本，它就會永遠停在 166.7% 不動了。
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-black/5">
              <p className="text-xs font-bold text-red-700">
                誤解二：「只要不賣就不會被斷頭」
              </p>
              <p className="mt-1 text-sm text-gray-700">
                斷頭不是等你賣，而是券商主動處分你的持股。維持率跌破門檻又沒有在期限內處理，券商就可以代你賣出，你完全不需要同意。「不賣就沒事」是把「我可以決定賣點」跟「券商可以決定賣點」搞混了。
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-black/5">
              <p className="text-xs font-bold text-red-700">
                誤解三：「補到 130% 就好」
              </p>
              <p className="mt-1 text-sm text-gray-700">
                補到 130% 只是回到門檻邊緣，沒有任何緩衝。市場隔天再跌一點，你就再收一次追繳。真正該問的不是「最少要補多少」，而是「我補完之後還能撐多久」。
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-black/5">
              <p className="text-xs font-bold text-red-700">
                誤解四：「看個股維持率就好」
              </p>
              <p className="mt-1 text-sm text-gray-700">
                券商看的是整戶。你可能某一檔早就該處理，卻因為另一檔在漲而讓整戶數字看起來沒事；也可能某一檔單獨看很安全，卻因為它占整戶比重太高，成為拖垮整戶的那顆石頭。兩個數字都要看，但它們回答的是不同問題。
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-black/5">
              <p className="text-xs font-bold text-red-700">
                誤解五：「融資成數越低越保守，所以越低越好」
              </p>
              <p className="mt-1 text-sm text-gray-700">
                成數低、緩衝大是事實，但自備款也高、報酬放大效果也小。成數高低是取捨，不是道德問題。真正該避免的是「不知道自己開在幾成、也不知道自己的最大可跌幅度是多少」。
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-black/5">
              <p className="text-xs font-bold text-red-700">
                誤解六：「維持率高就代表我不會賠錢」
              </p>
              <p className="mt-1 text-sm text-gray-700">
                維持率衡量的是「擔保夠不夠」，不是「你有沒有賺錢」。你可能維持率 200%、帳面上卻仍在虧損；也可能維持率很安全，但利息與交易成本已經默默把獲利吃光。維持率是生存指標，不是績效指標。
              </p>
            </div>
          </div>
        </InfoCard>

        {/* 7. 完整範例 */}
        <InfoCard
          step="7"
          icon="🧮"
          title="完整計算範例：跌到哪裡會發生什麼事"
          subtitle="把數字輸入上方計算器即可逐項驗證"
        >
          <p>
            以下用一個固定情境示範：1,000 股、買入價 500 元、融資成數 60%，因此融資金額固定為 30 萬元，自備款 20 萬元。表格裡的維持率是「市值 ÷ 30 萬元 ×
            100%」的結果，需追繳金額則是「市值低於 39 萬元（等同 130%）時，補回 130% 所需的差額」。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-gray-500">
                  <th className="pb-2 pr-3">股價</th>
                  <th className="pb-2 pr-3">跌幅</th>
                  <th className="pb-2 pr-3">市值</th>
                  <th className="pb-2 pr-3">維持率</th>
                  <th className="pb-2 pr-3">區間</th>
                  <th className="pb-2">需追繳</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["500 元", "0%", "50.0 萬", "166.7%", "安全", "—"],
                  ["475 元", "-5%", "47.5 萬", "158.3%", "注意", "—"],
                  ["450 元", "-10%", "45.0 萬", "150.0%", "注意", "—"],
                  ["425 元", "-15%", "42.5 萬", "141.7%", "危險", "—"],
                  ["400 元", "-20%", "40.0 萬", "133.3%", "危險", "—"],
                  ["390 元", "-22%", "39.0 萬", "130.0%", "危險", "—"],
                  ["375 元", "-25%", "37.5 萬", "125.0%", "斷頭", "1.5 萬"],
                  ["350 元", "-30%", "35.0 萬", "116.7%", "斷頭", "4.0 萬"],
                  ["300 元", "-40%", "30.0 萬", "100.0%", "斷頭", "9.0 萬"],
                  ["250 元", "-50%", "25.0 萬", "83.3%", "斷頭", "14.0 萬"],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-gray-100">
                    <td className="py-2 pr-3 font-medium">{row[0]}</td>
                    <td className="py-2 pr-3">{row[1]}</td>
                    <td className="py-2 pr-3">{row[2]}</td>
                    <td className="py-2 pr-3 font-semibold">{row[3]}</td>
                    <td className="py-2 pr-3">{row[4]}</td>
                    <td className="py-2 text-red-600">{row[5]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            從表格可以看到幾件事。第一，在 60% 成數、買入價等於現價的情況下，股價跌 22% 時維持率剛好落在 130.0%，也就是說「跌幅超過 22%」才真正跌破追繳線。第二，跌破之後每多跌 5%，需要補的金額是三級跳：跌 25% 要補 1.5 萬，跌 30% 要補 4 萬，跌 40% 要補 9 萬，跌 50% 要補 14 萬。補繳金額不是線性成長，而是隨著跌幅加速擴大。
          </p>
          <p>
            第三，仔細看 130.0% 那一列：本站計算器在維持率「等於」130% 時仍歸類為危險、需追繳金額為 0，必須真正「低於」130% 才會出現追繳金額。這個邊界行為在你自己手算時很容易搞錯，建議直接用計算器確認。
          </p>
          <p>
            同一個情境如果買進後曾經上漲，緩衝會完全不同。假設你買入價 400 元、成數 60%，融資金額 = 1,000 × 400 × 60% = 24 萬元；當股價漲到 500 元，市值 50 萬元，維持率是 208.3%，最大可跌幅度約 37.6%，比剛買進時寬鬆許多。這也是為什麼「獲利中的部位」比較耐震，而「一買就跌」的部位最危險。
          </p>
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
            算完維持率之後，下一步通常是「那我到底還能跌多少」。建議把同樣的持股資料帶到
            <Link
              href="/liquidation-sim"
              className="mx-1 font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-800"
            >
              斷頭模擬器
            </Link>
            ，它會用固定的跌幅級距（5% 到 50%）把你的整戶維持率、狀態與追繳金額排成一張表，還有歷史股災情境可以對照。如果你想一起看交易成本，可以參考
            <Link
              href="/day-trading-tax"
              className="mx-1 font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-800"
            >
              當沖稅費試算
            </Link>
            ；想了解賣出時的證券交易稅與手續費怎麼吃掉獲利，可以看
            <Link
              href="/stock-tax-2026"
              className="mx-1 font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-800"
            >
              投資稅務總整理
            </Link>
            ；如果你同時持有配息股票，股利所得的申報方式則整理在
            <Link
              href="/dividend-tax"
              className="mx-1 font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-800"
            >
              股利申報專頁
            </Link>
            。融資的風險從來不只是維持率，把成本、稅費與現金流一起算進去，才是完整的損益評估。
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                href: "/liquidation-sim",
                label: "斷頭模擬器",
                desc: "不同跌幅下的維持率與追繳金額",
              },
              {
                href: "/stock-tax-2026",
                label: "投資稅務總整理",
                desc: "證交稅、手續費與股利申報",
              },
              {
                href: "/day-trading-tax",
                label: "當沖稅費試算",
                desc: "短線進出的成本有多高",
              },
              {
                href: "/dividend-tax",
                label: "股利申報專頁",
                desc: "存股族的稅務重點",
              },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="flex flex-col rounded-xl border border-gray-200 p-4 transition hover:border-emerald-400 hover:bg-emerald-50"
              >
                <p className="font-semibold text-gray-900">{t.label}</p>
                <p className="mt-1 text-xs text-gray-500">{t.desc}</p>
              </Link>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-gray-100 p-4 text-xs leading-relaxed text-gray-500">
            本頁內容為一般性財務知識說明與試算工具，不構成投資建議、也不代表任何券商的實際規定。融資成數、追繳門檻、補繳期限、利率與處分程序，一律以你開戶券商的公告、契約與通知為準。
          </div>
        </div>
      </div>
    </>
  );
}
