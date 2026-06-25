import Link from "next/link";
import PageHeader from "@/components/PageHeader";

const cases = [
  {
    tag: "模拟售前案例",
    tagColor: "bg-blue-50 text-blue-600",
    title: "制造业客户的 AI 质检方案",
    desc: "如果我是某 AI 视觉平台的技术销售，面对一家汽车零件制造商，我会怎么做客户发现、需求确认和方案演示？",
    status: "撰写中",
    href: "#",
  },
  {
    tag: "产品拆解",
    tagColor: "bg-violet-50 text-violet-600",
    title: "阿里云 PAI：技术销售视角的深度拆解",
    desc: "从客户痛点出发，拆解 PAI 平台的核心功能、适用场景和竞品差异，以及销售对话中的常见异议处理。",
    status: "撰写中",
    href: "#",
  },
  {
    tag: "动手项目",
    tagColor: "bg-emerald-50 text-emerald-600",
    title: "这个网站本身",
    desc: "从 0 搭建个人网站，全程用 AI 辅助（Next.js + Tailwind + Vercel）。过程记录在 Insights 持续更新。",
    status: "进行中",
    href: "/insights",
  },
];

export default function Portfolio() {
  return (
    <div className="max-w-2xl mx-auto px-6">
      <PageHeader label="案例" title="我能做什么" desc="没有正式销售经历，就用行动来证明。这里是模拟的售前场景、产品拆解，以及实际动手的项目。" />
      <section className="pb-24 flex flex-col gap-4">
        {cases.map((c) => (
          <Link key={c.title} href={c.href} className="group bg-white rounded-2xl border border-neutral-200/80 p-6 hover:border-neutral-300 hover:shadow-sm transition-all block">
            <div className="flex items-start justify-between mb-3">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${c.tagColor}`}>{c.tag}</span>
              <span className="text-xs text-neutral-300">{c.status}</span>
            </div>
            <h2 className="text-base font-medium text-neutral-900 mb-2 group-hover:text-neutral-600 transition-colors">{c.title}</h2>
            <p className="text-sm text-neutral-500 leading-relaxed">{c.desc}</p>
          </Link>
        ))}
        <div className="rounded-2xl border border-dashed border-neutral-200 p-6 text-center">
          <p className="text-sm text-neutral-400">更多案例持续更新中</p>
        </div>
      </section>
    </div>
  );
}
