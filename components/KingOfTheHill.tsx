import Image from "next/image";
import mockCoins from "@/data/mock-coins.json";

export function KingOfTheHill({ coin }: { coin: (typeof mockCoins)[number] }) {
  return <section className="king-section" aria-label="King of the hill">
    <a className="create-link" href="/create">[start a new coin]</a>
    <div className="king-heading">king of the hill</div>
    <a className="king-coin" href={`/t/${coin.mint}`} >
      <Image src={coin.image} alt={coin.name} width={80} height={80} />
      <div><p className="coin-meta">market cap: ${Math.round(coin.usd_market_cap ?? coin.market_cap ?? 0).toLocaleString()}</p><p className="coin-meta">replies: {coin.reply_count ?? 0}</p><p className="coin-name">{coin.name} [ticker: {coin.symbol}]</p><p className="coin-description">{coin.description}</p></div>
    </a>
  </section>;
}
