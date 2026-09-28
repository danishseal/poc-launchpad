"use client";

import { useState } from "react";

export function CreateCoinForm() {
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [buyInSol, setBuyInSol] = useState(true);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  function validate() {
    if (!name.trim()) return "Coin needs a name";
    if (name.trim().length > 32) return "name too long: it must be less than 32 characters";
    if (!ticker.trim()) return "Coin needs a ticker";
    if (ticker.trim().length > 10) return "ticker cannot be more than 10 characters";
    if (!image) return "no image uploaded";
    if (description.length > 2000) return "description too long";
    if (image.size > 4_500_000) return "image too large: it must be less than 4.3 megabytes";
    return "connect your wallet and sign in to create a coin";
  }

  return <>
    <form className="create-form" onSubmit={(event) => { event.preventDefault(); setError(""); setShowDialog(true); }}>
      <div className="create-field"><label htmlFor="coin-name">name</label><input id="coin-name" type="text" value={name} onChange={(event) => setName(event.target.value)} /></div>
      <div className="create-field"><label htmlFor="coin-ticker">ticker</label><input id="coin-ticker" type="text" value={ticker} onChange={(event) => setTicker(event.target.value)} /></div>
      <div className="create-field"><label htmlFor="coin-description">description</label><textarea id="coin-description" value={description} onChange={(event) => setDescription(event.target.value)} /></div>
      <div className="create-field"><label htmlFor="coin-image">image</label><input id="coin-image" type="file" accept="image/*" onChange={(event) => setImage(event.target.files?.[0] ?? null)} /></div>
      <button className="more-options" type="button" onClick={() => setShowMore(!showMore)}>{showMore ? "Hide more options ↑" : "Show more options ↓"}</button>
      {showMore && <>
        <div className="create-field"><label htmlFor="coin-twitter">twitter link</label><input id="coin-twitter" type="text" placeholder="(optional)" /></div>
        <div className="create-field"><label htmlFor="coin-telegram">telegram link</label><input id="coin-telegram" type="text" placeholder="(optional)" /></div>
        <div className="create-field"><label htmlFor="coin-website">website</label><input id="coin-website" type="text" placeholder="(optional)" /></div>
        <p className="create-tip">Tip: coin data cannot be changed after creation</p>
      </>}
      <button className="create-button" type="submit">Create coin</button>
      <p className="create-note">When your coin completes its bonding curve you receive 0.5 SOL</p>
    </form>
    {showDialog && <div className="create-dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowDialog(false); }}>
      <section className="create-dialog" role="dialog" aria-modal="true" aria-label="Create coin">
        <button className="dialog-close" type="button" onClick={() => setShowDialog(false)} aria-label="Close">×</button>
        <div>Choose how many [{ticker || ""}] you want to buy (optional)</div>
        <p className="create-tip">tip: its optional but buying a small amount of coins helps protect your coin from snipers</p>
        <button className="switch-currency" type="button" onClick={() => { setBuyInSol(!buyInSol); setAmount(""); }}>switch to {buyInSol ? ticker || "token" : "SOL"}</button>
        <div className="amount-input"><input id="coin-amount" type="number" min="0" step="any" placeholder="0.0 (optional)" value={amount} onChange={(event) => setAmount(event.target.value)} /><span>{buyInSol ? "SOL" : ticker}</span></div>
        <button className="create-button" type="button" onClick={() => setError(validate())}>Create coin</button>
        {error && <p className="create-error" role="alert">{error}</p>}
      </section>
    </div>}
  </>;
}
