import Image from "next/image";
import mockCoins from "@/data/mock-coins.json";

type Coin = (typeof mockCoins)[number];

export function CoinGrid({ coins }: { coins: Coin[] }) {
  return <div className="coin-grid" aria-label="Coins">{coins.length ? coins.map((coin) => <CoinCard coin={coin} key={coin.mint} />) : <p>No coins found</p>}</div>;
}

function CoinCard({ coin }: { coin: Coin }) {
  return <a className="coin-card" href={`/t/${coin.mint}`} >
    <span className="coin-card-lines" aria-hidden="true" />
    <div className="coin-card-body">
      <Image src={coin.image} alt={coin.name} width={128} height={128} className="coin-card-image" />
      <div className="coin-card-copy">
        <p className="coin-name">{coin.name} [ticker: {coin.symbol}]</p>
        <p className="coin-meta coin-creator">created by {coin.creator?.slice(0, 5)}...{coin.creator?.slice(-4)}</p>
        {coin.description && <p className="coin-description">{coin.description}</p>}
        <div className="coin-card-stats">
          <p className="coin-meta">market cap: <strong>${Math.round(coin.usd_market_cap ?? coin.market_cap ?? 0).toLocaleString()}</strong></p>
          <p className="coin-meta">replies: <strong>{coin.reply_count ?? 0}</strong></p>
        </div>
      </div>
    </div>
  </a>;
}
