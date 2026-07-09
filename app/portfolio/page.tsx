import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { getAllCases } from "@/lib/cases";

const tagColor: Record<string, string> = {
  "模拟售前案例": "bg-blue-50 text-blue-600",
  "产品拆解": "bg-violet-50 text-violet-600",
  "动手项目": "bg-emerald-50 text-emerald-600",
};

export default function Portfolio() {
  const cases = getAllCases();

  return (
    <div className="max-w-[960px] mx-auto px-6">
      <PageHeader title="我能做什么" desc="没有正式销售经历，就用行动来证明。这里是模拟的售前场景、产品拆解，以及实际动手的项目。" />
      <section className="pb-24 flex flex-col gap-3">
        {cases.map((c) => {
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
        <div className="rounded-xl border border-dashed border-neutral-200 p-4 text-center">
          <p className="text-xs text-neutral-400">更多案例持续更新中</p>
        </div>
      </section>
    </div>
  );
}
