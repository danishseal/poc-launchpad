"use client";

import { useMemo, useState } from "react";
import mockCoins from "@/data/mock-coins.json";
import { KingOfTheHill } from "./KingOfTheHill";
import { SearchBar } from "./SearchBar";
import { CoinGrid } from "./CoinGrid";
import { Pagination } from "./Pagination";
import { SiteHeader } from "./SiteHeader";
import { BoardFooter } from "./BoardFooter";

export function Board() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const coins = useMemo(() => {
    const matches = mockCoins.filter((coin) => `${coin.name} ${coin.symbol} ${coin.description ?? ""}`.toLowerCase().includes(query.toLowerCase()));
    return [...matches].sort((a, b) => (b.last_trade_timestamp ?? 0) - (a.last_trade_timestamp ?? 0));
  }, [query]);
  const pageSize = 12;
  return <>
    <SiteHeader search={<SearchBar onSearch={(value) => { setQuery(value); setPage(1); }} />} />
    <main className="board-main">
      <KingOfTheHill coin={mockCoins[0]} />
      <div className="board-content">
        <CoinGrid coins={coins.slice((page - 1) * pageSize, page * pageSize)} />
      </div>
      <Pagination page={page} totalPages={Math.max(1, Math.ceil(coins.length / pageSize))} onPage={setPage} />
      <BoardFooter />
    </main>
  </>;
}
