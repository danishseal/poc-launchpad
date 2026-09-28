"use client";

import { useMemo, useState } from "react";
import mockCoins from "@/data/mock-coins.json";
import { KingOfTheHill } from "./KingOfTheHill";
import { SearchBar } from "./SearchBar";
import { BoardFilters } from "./BoardFilters";
import { CoinGrid } from "./CoinGrid";
import { Pagination } from "./Pagination";

type Coin = (typeof mockCoins)[number];

export function Board() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("last_trade_timestamp");
  const [order, setOrder] = useState("DESC");
  const [includeNsfw, setIncludeNsfw] = useState(false);
  const [page, setPage] = useState(1);
  const coins = useMemo(() => {
    const matches = mockCoins.filter((coin) => `${coin.name} ${coin.symbol} ${coin.description ?? ""}`.toLowerCase().includes(query.toLowerCase()));
    const field: keyof Coin = sort === "reply_count" || sort === "last_reply" ? "reply_count" : sort === "market_cap" ? "market_cap" : sort === "created_timestamp" ? "created_timestamp" : "last_trade_timestamp";
    return [...matches].sort((a, b) => (Number(b[field] ?? 0) - Number(a[field] ?? 0)) * (order === "ASC" ? -1 : 1));
  }, [query, sort, order]);
  const pageSize = 12;
  return <>
    <KingOfTheHill coin={mockCoins[0]} />
    <SearchBar onSearch={(value) => { setQuery(value); setPage(1); }} />
    <div className="board-content">
      <BoardFilters sort={sort} onSort={(value) => { setSort(value); setPage(1); }} order={order} onOrder={setOrder} includeNsfw={includeNsfw} onNsfw={setIncludeNsfw} />
      <CoinGrid coins={coins.slice((page - 1) * pageSize, page * pageSize)} />
    </div>
    <Pagination page={page} totalPages={Math.max(1, Math.ceil(coins.length / pageSize))} onPage={setPage} />
  </>;
}
