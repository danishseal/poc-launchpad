"use client";

import TokenHeader from "./TokenHeader";
import TokenStats from "./TokenStats";
import TokenChart from "./TokenChart";
import TokenTrades from "./TokenTrades";
import OptionsTerminal from "./OptionsTerminal";
import TradePanel from "./TradePanel";
import type { TokenData } from "./types";

export default function TokenProfile({ mint, data }: { mint: string; data: TokenData }) {
  return <main className="pump-token-page">
    <div className="pump-token-layout">
      <div className="pump-token-heading"><TokenHeader token={data.token} mint={mint} /></div>
      <div className="pump-token-content">
        <TokenStats token={data.token} />
        <TokenChart />
        <TokenTrades swaps={data.swaps} mint={mint} symbol={data.token?.symbol ?? "?"} />
      </div>
      <TradePanel symbol={data.token?.symbol ?? "?"} priceUsd={data.token?.priceUsd ?? null} />
    </div>
    <details className="pump-token-options">
      <summary><span className="pump-token-show">Show more</span><span className="pump-token-hide">Show less</span></summary>
      <OptionsTerminal symbol={data.token?.symbol ?? "PUMP1K"} />
    </details>
  </main>;
}
