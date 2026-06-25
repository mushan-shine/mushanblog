import PageHeader from "@/components/PageHeader";

const timeline = [
  { period: "2024 — 现在", role: "自主学习 & 转型准备", org: "", desc: "系统学习 AI 大模型技术和销售方法论（SPIN、MEDDIC），搭建个人网站，研究 AI + Data 市场。" },
  { period: "2023 — 2024", role: "售前产品经理", org: "华为", desc: "负责客户需求调研、方案设计和技术演示，参与多个政企客户的项目交付。建立了对销售流程和客户决策链的系统认知。" },
  { period: "2021 — 2023", role: "软件研发工程师", org: "华为", desc: "参与核心系统研发，熟悉大型软件项目的架构设计和工程实践。" },
  { period: "2018 — 2021", role: "软件工程 硕士", org: "南京理工大学", desc: "" },
  { period: "2014 — 2018", role: "软件工程 本科", org: "南京理工大学", desc: "" },
];

const skillGroups = [
  { label: "技术", items: ["软件架构", "系统设计", "AI/ML 基础", "数据平台"] },
  { label: "销售", items: ["SPIN 提问法", "MEDDIC 框架", "价值销售", "方案演示"] },
  { label: "工具", items: ["Python", "SQL", "Figma", "AI 辅助工具"] },
];

export default function About() {
  return (
    <div className="max-w-2xl mx-auto px-6">
      <PageHeader label="关于我" title="我的背景" desc="技术研发 + 售前经验，专注 AI 大模型与数据平台方向的技术型销售。" />

      <div className="mb-6">
        <a href="/resume.pdf" className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-700 transition-colors">
          下载简历 PDF ↓
        </a>
      </div>

      <section className="pb-10">
        <p className="text-xs uppercase tracking-widest text-neutral-400 mb-4 font-medium">经历</p>
        <div className="bg-white rounded-2xl border border-neutral-200/80 divide-y divide-neutral-100">
          {timeline.map((t) => (
            <div key={t.period} className="px-6 py-4">
              <div className="flex items-start gap-5">
                <span className="text-xs text-neutral-400 w-24 flex-shrink-0 pt-0.5 tabular-nums">{t.period}</span>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-medium text-neutral-900 text-sm">{t.role}</span>
                    {t.org && <span className="text-xs text-neutral-400">· {t.org}</span>}
                  </div>
                  {t.desc && <p className="text-sm text-neutral-500 leading-relaxed">{t.desc}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-24">
        <p className="text-xs uppercase tracking-widest text-neutral-400 mb-4 font-medium">技能</p>
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-6">
          <div className="grid grid-cols-3 gap-6">
            {skillGroups.map((s) => (
              <div key={s.label}>
                <p className="text-xs text-neutral-400 mb-3 uppercase tracking-wider">{s.label}</p>
                <div className="flex flex-col gap-2">
                  {s.items.map((item) => (
                    <span key={item} className="text-sm text-neutral-700">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
