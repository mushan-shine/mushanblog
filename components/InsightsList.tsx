"use client";
import { useState } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

const categories = ["全部", "Sales × AI", "产品拆解", "AI 学习", "方法论"];

const categoryColor: Record<string, string> = {
  "Sales × AI": "bg-blue-50 text-blue-600",
  "产品拆解": "bg-violet-50 text-violet-600",
  "AI 学习": "bg-amber-50 text-amber-600",
  "方法论": "bg-emerald-50 text-emerald-600",
};

export default function InsightsList({ posts }: { posts: PostMeta[] }) {
  const [active, setActive] = useState("全部");
  const filtered = active === "全部" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      <div className="flex gap-2 pb-8 overflow-x-auto">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className="text-xs px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer"
            style={{
              border: `1px solid ${active === c ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)"}`,
              background: active === c ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.1)",
              color: active === c ? "#1a1a1a" : "rgba(255,255,255,0.75)",
            }}
          >
            {c}
          </button>
        ))}
      </div>
      <section className="pb-24 flex flex-col gap-3">
        {filtered.length === 0 && (
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>暂无文章。</p>
        )}
        {filtered.map((p) => (
          <Link key={p.slug} href={`/insights/${p.slug}`} className="group bg-white rounded-xl border border-neutral-200/80 p-4 hover:border-neutral-300 hover:shadow-sm transition-all block">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColor[p.category] ?? "bg-neutral-100 text-neutral-500"} inline-block mb-1.5`}>{p.category}</span>
                <h2 className="font-medium text-neutral-900 mb-1 text-sm group-hover:text-neutral-600 transition-colors">{p.title}</h2>
                <p className="text-xs text-neutral-500 leading-relaxed">{p.desc}</p>
              </div>
              <span className="text-xs text-neutral-300 flex-shrink-0 mt-1">{p.date}</span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
