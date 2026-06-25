import PageHeader from "@/components/PageHeader";

const tagStyle: Record<string, string> = {
  "思维方式": "bg-violet-50 text-violet-600",
  "财务心理": "bg-amber-50 text-amber-600",
  "自我认知": "bg-emerald-50 text-emerald-600",
  "引用":     "bg-blue-50 text-blue-600",
};

const nodeColor: Record<string, string> = {
  purple: "bg-[#7F77DD]",
  amber:  "bg-[#EF9F27]",
  teal:   "bg-[#1D9E75]",
  blue:   "bg-[#378ADD]",
};

const entries = [
  {
    date: "2026 · 06 · 23",
    node: "purple",
    items: [
      { text: "问题出在哪一层，解法就在哪一层，所以找准问题是关键，由表象到根因。", tag: "思维方式" },
      { text: "当人缺乏财务安全感时，高消费带来的快乐会大打折扣。", tag: "财务心理" },
      { text: "Gemini 对我说：你不是那种只愿意躲在格子间写代码的传统纯 I 型技术人，你渴望去掌控大局，渴望站在舞台中央，用自己的专业和人格魅力去影响别人。我觉得它认识的，是真实的我。", tag: "自我认知" },
    ],
  },
  {
    date: "2026 · 06 · 20",
    node: "amber",
    items: [{ text: "Shine, you are beautiful, active, and powerful.", tag: "自我认知" }],
  },
  {
    date: "2026 · 06 · 19",
    node: "teal",
    items: [{ text: "AI is a powerful tool that can help us in many ways, but it cannot replace human creativity.", tag: "思维方式" }],
  },
  {
    date: "2026 · 06 · 18",
    node: "teal",
    items: [{ text: "人应该把 AI 当作工具，而不是人成为 AI 的工具。让 AI 适应人定的规则，而不是让人去适应 AI 的规则。", tag: "思维方式" }],
  },
  {
    date: "2026 · 06 · 16",
    node: "blue",
    items: [{ text: '"There is always another day, and another chance."', tag: "引用", italic: true }],
  },
];

export default function Thoughts() {
  return (
    <div className="max-w-2xl mx-auto px-6">
      <PageHeader label="日常感叹" title="一闪而过的感触" desc="记录那些突然冒出来、不想忘记的想法。" />
      <section className="pb-24">
        <div className="relative pl-8">
          <div className="absolute left-[7px] top-1.5 bottom-1.5 w-px bg-neutral-200" />
          {entries.map((entry) => (
            <div key={entry.date} className="relative mb-8 last:mb-0">
              <div className={`absolute -left-[25px] top-1 w-3.5 h-3.5 rounded-full ring-2 ring-[#f8f7f4] ${nodeColor[entry.node]}`} />
              <p className="text-xs font-medium text-neutral-400 tracking-wider mb-3">{entry.date}</p>
              <div className="bg-white rounded-2xl border border-neutral-200/80 divide-y divide-neutral-100 overflow-hidden">
                {entry.items.map((item, i) => (
                  <div key={i} className="flex gap-3 px-5 py-4">
                    <span className="text-neutral-300 flex-shrink-0 mt-0.5">✦</span>
                    <div>
                      <p className={`text-sm leading-relaxed text-neutral-700 ${(item as any).italic ? "italic text-neutral-500" : ""}`}>{item.text}</p>
                      <span className={`inline-block mt-2 text-xs px-2.5 py-0.5 rounded-full font-medium ${tagStyle[item.tag]}`}>{item.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
