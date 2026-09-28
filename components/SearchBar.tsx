"use client";

import { useState } from "react";

export function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");
  return <form className="search-wrap" onSubmit={(event) => { event.preventDefault(); onSearch(query.trim()); }} role="search">
    <input type="search" value={query} onChange={(event) => { setQuery(event.target.value); if (!event.target.value) onSearch(""); }} placeholder="search for token" aria-label="search for token" />
    <button type="submit">search</button>
  </form>;
}
