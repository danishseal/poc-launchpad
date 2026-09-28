"use client";

export function Pagination({ page, totalPages, onPage }: { page: number; totalPages: number; onPage: (page: number) => void }) {
  return <div className="pagination"><button type="button" disabled={page === 1} onClick={() => onPage(page - 1)}>[ &lt;&lt; ]</button><span>{page}</span><button type="button" disabled={page >= totalPages} onClick={() => onPage(page + 1)}>[ &gt;&gt; ]</button></div>;
}
