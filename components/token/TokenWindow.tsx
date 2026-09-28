import type { ReactNode } from "react";

export default function TokenWindow({
  title,
  end,
  children,
}: {
  title: string;
  end?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <style>{css}</style>
      <section className="token-window">
        <header>
          <h2>{title}</h2>
          <span aria-hidden="true" />
          {end}
        </header>
        {children}
      </section>
    </>
  );
}
export function ExternalIcon({ size = 13 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}
const css = String.raw`
.token-window { margin-top:16px; border:1px solid #000; background:#fff; box-shadow:1px 1px 0 #000; }
.token-window>header { display:flex; align-items:center; height:40px; gap:8px; padding:0 10px; border-bottom:1px solid #000; }
.token-window h2 { font:400 19px/1 g,Georgia,serif; margin:0; white-space:nowrap; }
.token-window>header>span { flex:1; min-width:16px; height:16px; background:repeating-linear-gradient(to bottom,#000 0 1px,transparent 1px 3px); }
.token-window>header a { display:inline-flex; align-items:center; gap:4px; height:28px; padding:0 8px; font-size:12px; font-weight:500; color:#5c5c58; text-decoration:none; border-radius:5px; }
.token-window>header a:hover { background:#f4f4f1; color:#111; }
`;
