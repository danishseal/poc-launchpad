"use client";

import { useState } from "react";

export function BoardFilters({ sort, onSort, order, onOrder, includeNsfw, onNsfw }: { sort: string; onSort: (value: string) => void; order: string; onOrder: (value: string) => void; includeNsfw: boolean; onNsfw: (value: boolean) => void }) {
  const [feed, setFeed] = useState("Terminal");
  const [animations, setAnimations] = useState(true);
  return <section className="board-filters" aria-label="Board filters">
    <div className="feed-tabs">{["Following", "Terminal"].map((item) => <button type="button" className={feed === item ? "active" : ""} onClick={() => setFeed(item)} key={item}>{item}</button>)}</div>
    <div className="filter-row">
      <div className="selects">
        <select aria-label="Sort" value={sort} onChange={(event) => onSort(event.target.value)}>
          <option value="last_trade_timestamp">sort: bump order</option><option value="featured">sort: featured 🔥</option><option value="last_reply">sort: last reply</option><option value="reply_count">sort: reply count</option><option value="market_cap">sort: market cap</option><option value="created_timestamp">sort: creation time</option><option value="currently_live">sort: currently live</option>
        </select>
        <select aria-label="Order" value={order} onChange={(event) => onOrder(event.target.value)}><option value="ASC">order: asc</option><option value="DESC">order: desc</option></select>
      </div>
      <div className="toggles"><Toggle label="Show animations:" value={animations} onChange={setAnimations} /><Toggle label="Include nsfw:" value={includeNsfw} onChange={onNsfw} /></div>
    </div>
  </section>;
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (value: boolean) => void }) {
  return <div className="toggle"><span>{label}</span><button type="button" className={value ? "selected" : ""} onClick={() => onChange(true)}>On</button><button type="button" className={!value ? "selected" : ""} onClick={() => onChange(false)}>Off</button></div>;
}
