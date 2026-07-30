"use client";
import { useState } from "react";
import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";
import Pager from "@/components/Pager";

const PAGE_SIZE = 10;

const subtagColor: Record<string, string> = {
  "服务器": "bg-blue-50 text-blue-600",
  "云计算": "bg-violet-50 text-violet-600",
  "大模型": "bg-amber-50 text-amber-600",
  "网络": "bg-emerald-50 text-emerald-600",
  "存储": "bg-rose-50 text-rose-600",
};

export default function ColumnList({
  articles,
  columnSlug,
  subtags,
}: {
  articles: ArticleMeta[];
  columnSlug: string;
  subtags?: string[];
}) {
  const [active, setActive] = useState("全部");
  const [page, setPage] = useState(1);
  const filtered = active === "全部" ? articles : articles.filter((a) => a.subtag === active);
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const current = Math.min(page, pageCount || 1);
  const shown = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <>
      {subtags && subtags.length > 0 && (
        <div className="flex gap-2 pb-8 overflow-x-auto">
          {["全部", ...subtags].map((t) => (
            <button
              key={t}
              onClick={() => {
                setActive(t);
                setPage(1);
              }}
              className="text-xs px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer"
              style={{
                border: `1px solid ${active === t ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)"}`,
                background: active === t ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.1)",
                color: active === t ? "#1a1a1a" : "rgba(255,255,255,0.75)",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      )}
      <section className="pb-8 flex flex-col gap-3">
        {filtered.length === 0 && (
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>暂无文章。</p>
        )}
        {shown.map((a) => {
          const href = a.href ?? `/${columnSlug}/${a.slug}`;
          return (
            <Link key={a.slug} href={href} className="group bg-white rounded-xl border border-neutral-200/80 p-4 hover:border-neutral-300 hover:shadow-sm transition-all block">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {a.subtag && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${subtagColor[a.subtag] ?? "bg-neutral-100 text-neutral-500"} inline-block mb-1.5`}>{a.subtag}</span>
                  )}
                  <h2 className="font-medium text-neutral-900 mb-1 text-sm group-hover:text-neutral-600 transition-colors">{a.title}</h2>
                  <p className="text-xs text-neutral-500 leading-relaxed">{a.desc}</p>
                </div>
                <span className="text-xs text-neutral-300 flex-shrink-0 mt-1">{a.status || a.date}</span>
              </div>
            </Link>
          );
        })}
      </section>
      <Pager page={current} pageCount={pageCount} onChange={setPage} />
    </>
  );
}
