"use client";

export default function Pager({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (p: number) => void;
}) {
  if (pageCount <= 1) return null;

  const btn = (active: boolean) => ({
    fontSize: "13px",
    minWidth: "32px",
    height: "32px",
    padding: "0 10px",
    borderRadius: "8px",
    cursor: "pointer",
    border: `1px solid ${active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)"}`,
    background: active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.1)",
    color: active ? "#1a1a1a" : "rgba(255,255,255,0.75)",
  });

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 pb-24">
      <button style={btn(false)} onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1}>
        ‹
      </button>
      {pages.map((p) => (
        <button key={p} style={btn(p === page)} onClick={() => onChange(p)}>
          {p}
        </button>
      ))}
      <button style={btn(false)} onClick={() => onChange(Math.min(pageCount, page + 1))} disabled={page === pageCount}>
        ›
      </button>
    </div>
  );
}
