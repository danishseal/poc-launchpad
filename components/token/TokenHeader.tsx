import Image from "next/image";
import { useSyncExternalStore } from "react";
import type { Token } from "./types";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("zop:watchlist-changed", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("zop:watchlist-changed", callback);
  };
}
function watchSnapshot() {
  try {
    return localStorage.getItem("zop.watchlist.v1") ?? "";
  } catch {
    return "";
  }
}
export default function TokenHeader({
  token,
  mint,
}: {
  token: Token | null;
  mint: string;
}) {
  const saved = useSyncExternalStore(subscribe, watchSnapshot, () => "");
  let watch: { agents: string[]; tokens: string[] } = {
    agents: [],
    tokens: [],
  };
  try {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed.agents) && Array.isArray(parsed.tokens))
      watch = parsed;
  } catch {}
  const starred = watch.tokens.includes(mint);
  function toggle() {
    try {
      localStorage.setItem(
        "zop.watchlist.v1",
        JSON.stringify({
          ...watch,
          tokens: starred
            ? watch.tokens.filter((t) => t !== mint)
            : [mint, ...watch.tokens],
        }),
      );
      window.dispatchEvent(new Event("zop:watchlist-changed"));
    } catch {}
  }
  const pad = token?.launchpad === "pump.fun" ? "pump.fun" : "stonkfun";
  const hot =
    (token?.volume24hUsd ?? 0) >= 500000 && (token?.change24h ?? 0) >= 50;
  return (
    <>
      <style>{css}</style>
      <header className="token-identity">
        <span className="token-logo">
          {token?.image ? (
            <Image src={token.image} width={88} height={88} alt={token.name} unoptimized />
          ) : (
            <b>{token?.symbol?.[0] ?? "?"}</b>
          )}
        </span>
        <div className="token-name">
          <h1>
            {token?.name ?? "Unknown coin"}
            {hot && (
              <span className="token-hot">
                <svg
                  viewBox="0 0 5 6"
                  width="7"
                  height="8.4"
                  shapeRendering="crispEdges"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M2 0h1v1H2zM1 1h2v1H1zM1 2h3v1H1zM0 3h5v3H0z" />
                  <path d="M2 4h1v2H2z" fill="#fff" />
                </svg>
                Hot
              </span>
            )}
          </h1>
          <p>
            {token ? "$" + token.symbol + " · " : ""}
            {mint.slice(0, 6)}…{mint.slice(-6)}
            {token ? " · " + pad : ""}
          </p>
          {token?.launchedBy && (
            <div className="token-creator">
              {token.launchedBy.kind === "agent"
                ? "The own token of "
                : "Launched by "}
              <span>@{token.launchedBy.handle}</span>
              , an AI agent on Zop
              {token.launchedBy.kind === "agent"
                ? ""
                : " (it never trades its own coins)"}
              .
            </div>
          )}
        </div>
        {token && (
          <button
            className="token-star"
            onClick={toggle}
            aria-label={starred ? "Remove from watchlist" : "Add to watchlist"}
            aria-pressed={starred}
            title={starred ? "Remove from watchlist" : "Add to watchlist"}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={starred ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
            </svg>
          </button>
        )}
      </header>
    </>
  );
}
const css = String.raw`
.token-identity { display:flex; align-items:flex-end; gap:20px; }
.token-logo { display:inline-grid; place-items:center; width:88px; height:88px; flex-shrink:0; border:1px solid #000; border-radius:50%; overflow:hidden; background:#fff; }
.token-logo img { width:100%; height:100%; object-fit:cover; }
.token-logo b { font-size:29.92px; letter-spacing:-.02em; }
.token-name { flex:1; min-width:0; }
.token-name h1 { display:flex; align-items:center; gap:12px; margin:0; font:400 40px/1 g,Georgia,serif; letter-spacing:-.012em; }
.token-name p { margin:6px 0 0; font:12px monospace; color:#5c5c58; }
.token-hot { display:inline-flex; align-items:center; height:16px; gap:4px; padding:0 4px; border:1px solid #000; border-radius:4px; font:700 9px Helvetica,Arial,sans-serif; text-transform:uppercase; letter-spacing:.06em; flex-shrink:0; }
.token-pad-link { display:inline-flex; height:36px; align-items:center; gap:6px; padding:0 12px; border:1px solid #000; border-radius:6px; font-size:13px; font-weight:500; text-decoration:none; color:#111; white-space:nowrap; }
.token-pad-link:hover,.token-star:hover { background:#f4f4f1; }
.token-star { display:grid; place-items:center; width:32px; height:32px; padding:0; border:0; border-radius:5px; background:transparent; color:#5c5c58; cursor:pointer; flex-shrink:0; }
.token-star[aria-pressed=true] { color:#111; }
.token-creator { margin-top:6px; font-size:13px; }
.token-creator a { font-weight:700; text-decoration:underline; text-underline-offset:2px; color:#111; }
@media(min-width:768px) { .token-name h1 { font-size:52px; } }
@media(max-width:639px) { .token-identity { flex-wrap:wrap; gap:12px; }.token-name h1 { font-size:34px; }.token-pad-link { margin-left:100px; } }
`;
