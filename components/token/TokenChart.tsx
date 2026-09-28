import TokenWindow from "./TokenWindow";

export default function TokenChart() {
  return (
    <>
      <style>{css}</style>
      <TokenWindow title="Chart">
        <div className="token-chart-empty">
          <span>No chart yet</span>
          <small>DexScreener hasn&apos;t listed a pool for this coin yet.</small>
        </div>
      </TokenWindow>
    </>
  );
}
const css = String.raw`
.token-chart-frame { display:block; width:100%; height:440px; border:0; background:#fff; }
.token-chart-empty { display:flex; height:240px; flex-direction:column; align-items:center; justify-content:center; gap:4px; padding:0 24px; text-align:center; }
.token-chart-empty>span { font:400 20px g,Georgia,serif; }
.token-chart-empty small { font-size:12.5px; color:#5c5c58; }
@media(min-width:768px) { .token-chart-frame { height:520px; } }
`;
