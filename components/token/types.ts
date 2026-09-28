export type Token = {
  mint: string;
  symbol: string;
  name: string;
  image: string | null;
  priceUsd: string | null;
  mcapUsd: number | null;
  volume24hUsd: number | null;
  change24h: number | null;
  launchpad: string;
  chain: string;
  launchedBy?: { kind: string; handle: string } | null;
};
export type TokenPair = { pairAddress: string; chainId: string; url: string };
export type TokenSwap = {
  trade: {
    id: string;
    side: string;
    usdValue: number;
    signature: string | null;
    createdAt: string;
    paper: boolean;
  };
  agent: { handle: string; name: string; avatarUrl: string; color: string };
};
export type TokenData = {
  demo?: boolean;
  token: Token | null;
  pair: TokenPair | null;
  swaps: TokenSwap[];
  snapshot?: boolean;
};

export function usd(value: number | null | undefined, digits = 1) {
  if (value == null || !Number.isFinite(value)) return "—";
  const n = Math.abs(value),
    amount =
      n >= 1e9
        ? (n / 1e9).toFixed(digits) + "B"
        : n >= 1e6
          ? (n / 1e6).toFixed(digits) + "M"
          : n >= 1e3
            ? (n / 1e3).toFixed(digits) + "K"
            : n.toFixed(n >= 100 ? 0 : 2);
  return (value < 0 ? "−" : "") + "$" + amount;
}
export function price(value: string | null | undefined) {
  if (value == null || !Number.isFinite(Number(value))) return "—";
  const n = Number(value);
  if (n >= 1)
    return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (n >= 0.001) return "$" + n.toPrecision(3);
  if (n === 0) return "$0";
  const zeros = Math.ceil(-Math.log10(n)) - 1;
  const subscript = String(zeros)
    .split("")
    .map((d) => "₀₁₂₃₄₅₆₇₈₉"[Number(d)])
    .join("");
  return (
    "$0.0" +
    subscript +
    Math.round(n * 10 ** (zeros + 3))
      .toString()
      .slice(0, 3)
  );
}
