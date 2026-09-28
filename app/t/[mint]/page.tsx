import { notFound } from "next/navigation";
import mockCoins from "@/data/mock-coins.json";
import TokenProfile from "@/components/token/TokenProfile";
import { SiteHeader } from "@/components/SiteHeader";
import type { TokenData } from "@/components/token/types";

export function generateStaticParams() {
  return mockCoins.map((coin) => ({ mint: coin.mint }));
}

export default async function TokenPage({ params }: { params: Promise<{ mint: string }> }) {
  const { mint } = await params;
  const coin = mockCoins.find((item) => item.mint === mint);
  if (!coin) notFound();
  const data: TokenData = {
    token: {
      mint: coin.mint,
      symbol: coin.symbol,
      name: coin.name,
      image: coin.image,
      priceUsd: coin.usd_market_cap == null ? null : String(coin.usd_market_cap / 1_000_000_000),
      mcapUsd: coin.usd_market_cap ?? coin.market_cap,
      volume24hUsd: null,
      change24h: null,
      launchpad: "pump.fun",
      chain: "solana",
    },
    pair: null,
    swaps: [],
  };
  return <><SiteHeader /><TokenProfile mint={mint} data={data} /></>;
}
