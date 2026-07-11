"use client";
import { useState } from "react";
import Link from "next/link";
import type { CaseMeta } from "@/lib/cases";
import Pager from "@/components/Pager";

const PAGE_SIZE = 10;

const tagColor: Record<string, string> = {
  "模拟售前案例": "bg-blue-50 text-blue-600",
  "产品拆解": "bg-violet-50 text-violet-600",
  "动手项目": "bg-emerald-50 text-emerald-600",
};

export default function PortfolioList({ cases }: { cases: CaseMeta[] }) {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(cases.length / PAGE_SIZE);
  const current = Math.min(page, pageCount || 1);
  const shown = cases.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const isLastPage = current === (pageCount || 1);

  return (
    <>
      <section className="pb-8 flex flex-col gap-3">
        {shown.map((c) => {
          const href = c.href ?? `/portfolio/${c.slug}`;
          return (
            <Link key={c.slug} href={href} className="group bg-white rounded-xl border border-neutral-200/80 p-4 hover:border-neutral-300 hover:shadow-sm transition-all block">
              <div className="flex items-start justify-between mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColor[c.tag] ?? "bg-neutral-100 text-neutral-500"}`}>{c.tag}</span>
                <span className="text-xs text-neutral-300">{c.status}</span>
              </div>
              <h2 className="text-sm font-medium text-neutral-900 mb-1.5 group-hover:text-neutral-600 transition-colors">{c.title}</h2>
              <p className="text-xs text-neutral-500 leading-relaxed">{c.desc}</p>
            </Link>
          );
        })}
        {isLastPage && (
          <div className="rounded-xl border border-dashed border-neutral-200 p-4 text-center">
            <p className="text-xs text-neutral-400">更多案例持续更新中</p>
          </div>
        )}
      </section>
      <Pager page={current} pageCount={pageCount} onChange={setPage} />
    </>
  );
}
