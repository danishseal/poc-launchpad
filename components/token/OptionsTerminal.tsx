"use client";

import { useState } from "react";
import styles from "./OptionsTerminal.module.css";

type Side = "Call" | "Put";
const expiries = ["Oct 2", "Oct 9", "Oct 30", "Nov 27", "Dec 25"];
const strikes = [0.0036, 0.0038, 0.004, 0.0042, 0.0044, 0.0045, 0.0046, 0.0048, 0.005, 0.0055, 0.006, 0.007, 0.008, 0.009];
const callMarks = [1.9, 1.73, 1.56, 1.39, 1.23, 1.16, 1.08, 0.94, 0.82, 0.6, 0.47, 0.32, 0.25, 0.198];
const putMarks = [0.197, 0.22, 0.25, 0.29, 0.33, 0.35, 0.38, 0.44, 0.52, 0.79, 1.16, 2.02, 2.94, 3.89];
const callDeltas = [0.86, 0.84, 0.82, 0.79, 0.76, 0.74, 0.72, 0.68, 0.63, 0.52, 0.42, 0.3, 0.23, 0.18];
const ivs = [149.4, 142, 134.9, 128.2, 121.9, 119.1, 116.4, 112, 109.2, 109.2, 115.5, 131.2, 145.2, 157];
const money = (n: number, digits = 2) => `$${n.toFixed(digits)}`;

export default function OptionsTerminal({ symbol = "PUMP1K" }: { symbol?: string }) {
  const [expiry, setExpiry] = useState("Oct 30");
  const [strike, setStrike] = useState(0.0055);
  const [side, setSide] = useState<Side>("Call");
  const [accountTab, setAccountTab] = useState("Balances");
  const selectOption = (value: number, optionSide: Side) => {
    setStrike(value);
    setSide(optionSide);
  };
  return (
    <section className={styles.terminal} aria-label="Options market preview">
      <div className={styles.windowTitle}><h2>Options</h2><span aria-hidden="true" /></div>
      <div className={styles.layout}>
        <div className={styles.left}>
          <div className={styles.marketBar}><span className={styles.grip}>⠿</span><strong>{symbol}⌄</strong><div className={styles.expiries}>{expiries.map((item) => <button key={item} className={expiry === item ? styles.active : ""} onClick={() => setExpiry(item)}>{item}{item === "Oct 30" ? " (1)" : ""}</button>)}</div><span className={styles.previewLabel}>Illustrative data</span><span className={styles.controls}>⚙ ⋮</span></div>
          <div className={styles.tableWrap}><div className={styles.tableTop}><strong>Calls</strong><strong>Fri {expiry} 31d 18h 48m</strong><strong>Puts</strong></div><div className={styles.tableScroll}><table className={styles.chain}><thead><tr>{["Bid Size", "Bid IV", "Bid", "Mark", "Ask", "Ask IV", "Ask Size", "Delta", "Mark IV", "Position", "Strike", "Bid Size", "Bid IV", "Bid", "Mark", "Ask", "Ask IV", "Ask Size", "Delta", "Mark IV", "Position"].map((label, index) => <th key={`${label}-${index}`}>{label}</th>)}</tr></thead><tbody>{strikes.map((value, index) => <tr key={value}><td>—</td><td>—</td><td><button className={styles.quoteButton} onClick={() => selectOption(value, "Call")}>＋</button></td><td className={styles.mark}>{money(callMarks[index], callMarks[index] < 0.2 ? 3 : 2)}</td><td><button className={`${styles.quoteButton} ${value === strike && side === "Call" ? styles.chosen : ""}`} onClick={() => selectOption(value, "Call")}>{value === strike && side === "Call" ? "✓" : "＋"}</button></td><td>—</td><td>—</td><td>{callDeltas[index].toFixed(2)}</td><td>{ivs[index].toFixed(1)}%</td><td>—</td><td className={styles.strike}>{money(value, 4)}{index === 9 && <span className={styles.spotTag}>{symbol} $0.0052964</span>}</td><td>—</td><td>—</td><td><button className={styles.quoteButton} onClick={() => selectOption(value, "Put")}>＋</button></td><td className={styles.mark}>{money(putMarks[index], index === 0 ? 3 : 2)}</td><td><button className={`${styles.quoteButton} ${value === strike && side === "Put" ? styles.chosen : ""}`} onClick={() => selectOption(value, "Put")}>{value === strike && side === "Put" ? "✓" : "＋"}</button></td><td>—</td><td>—</td><td>{(callDeltas[index] - 1).toFixed(2)}</td><td>{ivs[index].toFixed(1)}%</td><td>—</td></tr>)}</tbody></table></div></div>
          <div className={styles.account}><div className={styles.accountNav}><span className={styles.grip}>⠿</span>{["Balances", "Positions", "Orders", "Greeks"].map((item) => <button key={item} className={accountTab === item ? styles.active : ""} onClick={() => setAccountTab(item)}>{item}{item === "Balances" ? " (1)" : ""}</button>)}<div className={styles.accountSummary}><span>Margin Utilization<b>0.00%</b></span><span>Buying Power<b>$15.00</b></span><span>Collateral<b>$15.00</b></span><span>Margin Type<b>Standard</b></span></div><span className={styles.controls}>⚙ ⋮</span></div>{accountTab === "Balances" ? <table className={styles.balanceTable}><thead><tr><th>Token</th><th>Amount</th><th>Mkt Val ↓</th><th>Mark</th><th>Margin</th><th>Supply APY</th><th>Borrow APY</th><th>Spot</th><th>Manage</th></tr></thead><tbody><tr><td>USDC</td><td>15</td><td>$15</td><td>$1.00</td><td>$15</td><td>2.26%</td><td>4.11%</td><td>—</td><td>Deposit&nbsp; <span>Borrow</span>&nbsp; ⋮</td></tr></tbody></table> : <div className={styles.accountEmpty}>No {accountTab.toLowerCase()} to display</div>}</div>
        </div>

      </div>

    </section>
  );
}
