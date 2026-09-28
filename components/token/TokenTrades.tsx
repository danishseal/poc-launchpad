import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import TokenWindow from "./TokenWindow";
import { usd, type TokenSwap } from "./types";

function relative(date: string, now: number) {
  const seconds = Math.max(
    0,
    Math.round((now - new Date(date).getTime()) / 1000),
  );
  if (seconds < 5) return "now";
  if (seconds < 60) return seconds + "s";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes + "m";
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + "h";
  const days = Math.floor(hours / 24);
  return days < 14 ? days + "d" : Math.floor(days / 7) + "w";
}
export default function TokenTrades({
  swaps,
  mint,
  symbol,
}: {
  swaps: TokenSwap[];
  mint: string;
  symbol: string;
}) {
  const [now, setNow] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <>
      <style>{css}</style>
      <TokenWindow title="Agent trades">
        {swaps.length ? (
          swaps.map(({ trade, agent }) => (
            <div key={trade.id} className="token-swap">
              <span className="token-swap-avatar" style={{ background: agent.color + "20" }}>
                <Image
                  unoptimized
                  src={agent.avatarUrl}
                  width={28}
                  height={28}
                  alt={agent.name}
                />
              </span>
              <p>
                <span>{agent.name}</span>
                <span
                  className={
                    trade.side === "buy" ? "token-bought" : "token-sold"
                  }
                >
                  {trade.side === "buy" ? "BOUGHT" : "SOLD"}
                </span>
                <Link className="token-swap-symbol" href={`/t/${mint}`}>
                  ${symbol}
                </Link>
                {trade.paper && <span className="token-paper">Paper</span>}
              </p>
              <strong>{usd(trade.usdValue, 2)}</strong>
              <time
                dateTime={trade.createdAt}
                title={new Date(trade.createdAt).toUTCString()}
              >
                {now ? relative(trade.createdAt, now) : ""}
              </time>
              <span className="token-swap-explorer" />
            </div>
          ))
        ) : (
          <p className="token-no-trades">No agent has traded this coin yet.</p>
        )}
      </TokenWindow>
    </>
  );
}
const css = String.raw`
.token-swap { display:flex; align-items:center; height:44px; gap:10px; padding:0 14px; transition:background-color .15s; }
.token-swap:hover { background:#f4f4f1; }
.token-swap-avatar { display:grid; place-items:center; width:28px; height:28px; border:1px solid #e2e2df; border-radius:8px; flex-shrink:0; overflow:hidden; }
.token-swap img { image-rendering:pixelated; }
.token-swap p { display:flex; align-items:center; gap:6px; min-width:0; flex:1; margin:0; font-size:13px; }
.token-swap p>a { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-weight:700; color:#111; text-decoration:none; }
.token-swap p>a:hover { text-decoration:underline; text-underline-offset:2px; }
.token-swap p>a.token-swap-symbol { flex-shrink:0; }
.token-bought,.token-sold { flex-shrink:0; padding:1px 4px; border-radius:4px; font-size:10px; font-weight:700; letter-spacing:.06em; }
.token-bought { background:#e5f3ea; color:#0a7a3b; }
.token-sold { background:#fbe8ea; color:#c81e2c; }
.token-swap>strong { width:64px; flex-shrink:0; text-align:right; font-size:13px; }
.token-swap time { width:32px; flex-shrink:0; text-align:right; color:#5c5c58; font-size:12px; }
.token-swap-explorer { display:grid; place-items:center; width:28px; height:28px; flex-shrink:0; border-radius:5px; color:#5c5c58; }
.token-swap-explorer:hover { background:#e9e9e4; color:#111; }
.token-paper { border:1px dashed #5c5c58; border-radius:4px; font-size:10px; padding:0 4px; color:#5c5c58; }
.token-no-trades { margin:0; padding:40px 16px; text-align:center; color:#5c5c58; font-size:13px; }
`;
