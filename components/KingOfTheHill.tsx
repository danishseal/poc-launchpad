import Image from "next/image";
import mockCoins from "@/data/mock-coins.json";

export function KingOfTheHill({ coin }: { coin: (typeof mockCoins)[number] }) {
  return <section className="king-section" aria-label="King of the hill">
    <a className="create-link" href="/create">[start a new coin]</a>
    <div className="king-heading">king of the hill</div>
    <a className="king-coin" href={`/t/${coin.mint}`} >
      <span className="coin-card-lines" aria-hidden="true" />
      <div className="king-coin-body">
        <Image src={coin.image} alt={coin.name} width={80} height={80} />
        <div className="king-coin-copy">
          <p className="coin-name">{coin.name} [ticker: {coin.symbol}]</p>
          {coin.description && <p className="coin-description">{coin.description}</p>}
          <div className="coin-card-stats">
            <p className="coin-meta">market cap: <strong>${Math.round(coin.usd_market_cap ?? coin.market_cap ?? 0).toLocaleString()}</strong></p>
            <p className="coin-meta">replies: <strong>{coin.reply_count ?? 0}</strong></p>
          </div>
        </div>
      </div>
    </a>
  </section>;
}
