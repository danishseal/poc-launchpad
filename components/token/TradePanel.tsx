"use client";

import { useState } from "react";

export default function TradePanel({ symbol, priceUsd }: { symbol: string; priceUsd: string | null }) {
  const [side, setSide] = useState<"Buy" | "Sell">("Buy");
  const [orderType, setOrderType] = useState("Limit");
  const [limitPrice, setLimitPrice] = useState(priceUsd ?? "");
  const [amount, setAmount] = useState("");
  const [percent, setPercent] = useState(0);
  const [post, setPost] = useState(false);
  const [open, setOpen] = useState(false);
  const total = (Number(limitPrice) || 0) * (Number(amount) || 0);

  return <aside className="token-trade-panel" aria-label="Buy or sell token">
    <div className="token-trade-heading"><strong>{symbol}</strong><span>Book⌄ &nbsp; ⋮</span></div>
    <div className="token-trade-form">
      <div className="token-trade-tabs"><button type="button" className={side === "Buy" ? "active" : ""} onClick={() => setSide("Buy")}>Buy to Open</button><button type="button" className={side === "Sell" ? "active" : ""} onClick={() => setSide("Sell")}>Sell to Open</button></div>
      <label className="token-trade-row"><span>Order Type</span><select value={orderType} onChange={(event) => setOrderType(event.target.value)}><option>Limit</option><option>Market</option></select></label>
      <label className="token-trade-row"><span>Limit Price<small>Ask: <u>{priceUsd ? `$${Number(priceUsd).toPrecision(3)}` : "$0.000"}</u></small></span><span className="token-trade-input">$ <input type="number" min="0" step="any" value={limitPrice} onChange={(event) => setLimitPrice(event.target.value)} disabled={orderType === "Market"} placeholder="0" /></span></label>
      <label className="token-trade-row"><span>Amount</span><span className="token-trade-input"><input type="number" min="0" step="any" placeholder="0.0" value={amount} onChange={(event) => setAmount(event.target.value)} /><span>{symbol}</span></span></label>
      <div className="token-trade-slider"><input type="range" min="0" max="100" value={percent} aria-label="Amount percentage" onChange={(event) => setPercent(Number(event.target.value))} /><span>{percent} %</span></div>
      <div className="token-trade-extras"><label><input type="checkbox" checked={post} onChange={(event) => setPost(event.target.checked)} /> Post</label><select aria-label="Time in force"><option>GTC</option><option>IOC</option><option>FOK</option></select></div>
      <button className="token-trade-submit" type="button" disabled={!Number(amount) || (orderType === "Limit" && !Number(limitPrice))} onClick={() => setOpen(true)}>{Number(amount) && (orderType === "Market" || Number(limitPrice)) ? "Preview order" : "Enter Amount"}</button>
      <div className="token-trade-costs"><div><strong>Max Cost</strong><strong>${total.toFixed(2)}</strong></div><div><span>Amount</span><span>{Number(amount) || 0} {symbol}</span></div><div><span>Est. Fee</span><span>—</span></div></div>
    </div>
    {open && <div className="token-trade-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}><div className="token-trade-dialog" role="dialog" aria-modal="true" aria-label="Order preview"><button type="button" onClick={() => setOpen(false)} aria-label="Close">×</button><h2>Order preview</h2><p>This section uses illustrative market data. Orders are not submitted.</p></div></div>}
  </aside>;
}
