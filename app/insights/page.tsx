"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";

const categories = ["全部", "Sales × AI", "产品拆解", "AI 学习", "方法论"];

const posts = [
  { category: "Sales × AI", title: "用 SPIN 拆解一次 AI 大模型的客户发现对话", desc: "SPIN 提问法如何在 AI 产品销售中落地？用一个虚构的客户对话来实战演练。", date: "即将发布", href: "#" },
  { category: "方法论", title: "MEDDIC 框架：AI 项目中如何量化 Metrics", desc: "AI 项目的 ROI 往往难以量化，这是销售最常遇到的障碍之一。MEDDIC 的 M 怎么用？", date: "即将发布", href: "#" },
  { category: "AI 学习", title: "大模型 RAG 技术：非技术客户能听懂的解释", desc: "如果客户问：你们的 AI 怎么知道我们公司的内部文档？这篇给你一个能讲清楚的答案。", date: "即将发布", href: "#" },
  { category: "产品拆解", title: "阿里云 PAI vs 华为 ModelArts：技术销售怎么选边站", desc: "两个平台的功能对比不是重点，重点是面对不同客户背景时各自的差异化叙事。", date: "即将发布", href: "#" },
];

const categoryColor: Record<string, string> = {
  "Sales × AI": "bg-blue-50 text-blue-600",
  "产品拆解": "bg-violet-50 text-violet-600",
  "AI 学习": "bg-amber-50 text-amber-600",
  "方法论": "bg-emerald-50 text-emerald-600",
};

export default function Insights() {
  const [active, setActive] = useState("全部");
  const filtered = active === "全部" ? posts : posts.filter((p) => p.category === active);

  return (
    <div className="max-w-2xl mx-auto px-6">
      <PageHeader label="思考" title="我在想什么" desc="销售方法论 × AI 技术理解。记录学习过程，也记录思考结果。" />
      <div className="flex gap-2 pb-8 overflow-x-auto">
        {categories.map((c) => (
          <button key={c} onClick={() => setActive(c)} className={`text-xs px-3.5 py-1.5 rounded-full border whitespace-nowrap transition-all cursor-pointer ${active === c ? "bg-neutral-900 text-white border-neutral-900" : "border-neutral-200 text-neutral-500 hover:border-neutral-400"}`}>
            {c}
          </button>
        ))}
      </div>
      <section className="pb-24">
        <div className="bg-white rounded-2xl border border-neutral-200/80 divide-y divide-neutral-100">
          {filtered.map((p) => (
            <a key={p.title} href={p.href} className="group block px-6 py-5 hover:bg-neutral-50 transition-colors first:rounded-t-2xl last:rounded-b-2xl">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColor[p.category]} inline-block mb-2`}>{p.category}</span>
                  <h2 className="font-medium text-neutral-900 mb-1 text-sm group-hover:text-neutral-600 transition-colors">{p.title}</h2>
                  <p className="text-sm text-neutral-500 leading-relaxed">{p.desc}</p>
                </div>
                <span className="text-xs text-neutral-300 flex-shrink-0 mt-1">{p.date}</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
