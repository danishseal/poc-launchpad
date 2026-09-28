import { usd, price, type Token } from "./types";

export default function TokenStats({ token }: { token: Token | null }) {
  const change = token?.change24h;
  const percent =
    change == null
      ? "—"
      : (change < 0 ? "↓ " : "↑ ") +
        (Math.abs(change) >= 1000
          ? Math.round(Math.abs(change)).toLocaleString("en-US")
          : Math.abs(change).toFixed(1)) +
        "%";
  const items = [
    ["Price", price(token?.priceUsd)],
    ["Market cap", usd(token?.mcapUsd)],
    ["Volume 24h", usd(token?.volume24hUsd)],
    ["24h", percent],
  ];
  return (
    <>
      <style>{css}</style>
      <section className="token-stats">
        {items.map(([label, value], index) => (
          <div key={label}>
            <small>{label}</small>
            <strong
              className={
                index === 3
                  ? change == null
                    ? "muted"
                    : change < 0
                      ? "loss"
                      : "profit"
                  : ""
              }
            >
              {value}
            </strong>
          </div>
        ))}
      </section>
    </>
  );
}
const css = String.raw`
.token-stats { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); margin-top:32px; border:1px solid #000; background:#fff; box-shadow:1px 1px 0 #000; }
.token-stats>div { padding:14px 16px; }
.token-stats>div:nth-child(even) { border-left:1px solid #e2e2df; }
.token-stats>div:nth-child(n+3) { border-top:1px solid #e2e2df; }
.token-stats small { display:block; font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:.08em; color:#5c5c58; }
.token-stats strong { display:block; margin-top:4px; font-size:22px; line-height:1.25; letter-spacing:-.01em; }
.token-stats .muted { color:#5c5c58; }.token-stats .profit { color:#0a7a3b; }.token-stats .loss { color:#c81e2c; }
@media(min-width:768px) { .token-stats { grid-template-columns:repeat(4,minmax(0,1fr)); }.token-stats>div:nth-child(n+3) { border-top:0; }.token-stats>div:not(:first-child) { border-left:1px solid #e2e2df; } }
`;
