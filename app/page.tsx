import Link from "next/link";
import Image from "next/image";

const strengths = [
  { icon: "⌥", title: "技术背景，能谈细节", desc: "2 年研发，能跟客户工程师对话，不被技术问题问住。" },
  { icon: "◈", title: "售前经验，懂方案流程", desc: "华为 1 年售前，做过需求分析、方案设计和演示。" },
  { icon: "⊕", title: "Sales × AI，双向学习", desc: "系统学习 SPIN、MEDDIC，同时深研 AI 大模型产品。" },
  { icon: "◎", title: "善于沟通，理解人", desc: "真正理解对方需求，在对话中建立信任。" },
];

export default function Home() {
  return (
    <div
      className="min-h-screen -mt-14 flex flex-col"
      style={{
        background: "#f2f2f0",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        fontFamily: "var(--font-caveat)",
      }}
    >
      {/* Hero */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-16" style={{ minHeight: "100vh" }}>
        <div className="w-full flex flex-col md:flex-row items-center gap-10 md:gap-16" style={{ maxWidth: "960px" }}>

          {/* 左侧文字 */}
          <div className="flex-1 flex flex-col gap-5">
            <h1 className="font-bold text-neutral-900" style={{ fontSize: "clamp(52px, 8vw, 84px)", lineHeight: 1.05, letterSpacing: "-1px" }}>
              Hi, 木杉
            </h1>
            <p className="font-semibold text-neutral-700" style={{ fontSize: "18px" }}>
              立志成为最懂技术最懂沟通的销售
            </p>
            <p style={{ fontSize: "15px", color: "#5a5650", lineHeight: 1.9, maxWidth: "400px" }}>
              软件工程背景，<strong className="text-neutral-800">华为 3 年</strong>（研发 + 售前）。<br />
              专注 <strong className="text-neutral-800">AI 大模型 · 数据平台</strong> 方向的技术型销售。<br />
              有研发视角，也有售前经验，善于沟通与理解人。
            </p>

            {/* 状态 + 社交 */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="inline-flex items-center gap-2" style={{ fontSize: "12px", color: "#7a766e", border: "1.5px solid #d0cdc4", borderRadius: "20px", padding: "4px 14px", background: "rgba(255,255,255,0.6)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                开放机会 · AI 技术销售
              </div>
              <a href="mailto:mushan.ysl@gmail.com" title="发邮件" style={{ fontSize: "18px", color: "#8c887f", lineHeight: 1 }}>✉</a>
              <a href="https://www.xiaohongshu.com" target="_blank" rel="noopener noreferrer" title="小红书" style={{ fontSize: "16px", lineHeight: 1 }}>📕</a>
            </div>

            {/* 按钮 */}
            <div className="flex gap-3 flex-wrap">
              <Link href="/portfolio" style={{ fontSize: "14px", padding: "8px 22px", background: "rgba(44,44,44,0.85)", color: "#fff", borderRadius: "6px", boxShadow: "2px 2px 0 rgba(44,44,44,0.2)", display: "inline-block" }}>
                查看案例 →
              </Link>
              <Link href="/about" style={{ fontSize: "14px", padding: "8px 22px", background: "rgba(255,255,255,0.7)", color: "#2c2c2c", border: "1.5px solid rgba(44,44,44,0.2)", borderRadius: "6px", display: "inline-block" }}>
                下载简历
              </Link>
            </div>
          </div>

          {/* 右侧照片 */}
          <div className="flex-shrink-0 hidden md:block relative" style={{ width: "340px", height: "400px", borderRadius: "24px", overflow: "hidden", boxShadow: "0 6px 32px rgba(0,0,0,0.12)" }}>
            <Image src="/avatar.jpg" alt="木杉" fill className="object-cover object-top" sizes="340px" priority />
          </div>
        </div>
      </div>

      {/* 滚动提示 */}
      <div className="text-center pb-8" style={{ fontSize: "14px", color: "#b0aca4" }}>
        我写的东西 ↓
      </div>

      {/* 为什么选我 */}
      <div className="px-6 md:px-16 pb-24" style={{ maxWidth: "960px", margin: "0 auto", width: "100%" }}>
        <p className="text-xs uppercase tracking-widest text-neutral-400 mb-6 font-medium" style={{ fontFamily: "var(--font-geist-sans)" }}>
          为什么选择我
        </p>
        <div className="flex flex-col gap-3">
          {strengths.map((s) => (
            <div key={s.title} className="flex items-baseline gap-4" style={{ padding: "6px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
              <span style={{ fontSize: "14px", color: "#c4c0b8", flexShrink: 0, width: "20px" }}>{s.icon}</span>
              <span className="font-bold text-neutral-800 flex-shrink-0" style={{ fontSize: "15px", minWidth: "150px" }}>{s.title}</span>
              <span style={{ fontSize: "13px", color: "#8c887f" }}>— {s.desc}</span>
            </div>
          ))}
        </div>
        <div className="hidden md:flex justify-end mt-6">
          <Image src="/cat-nobg.gif" alt="" width={150} height={150} unoptimized className="object-contain" />
        </div>
      </div>
    </div>
  );
}
