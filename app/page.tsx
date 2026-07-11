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
      className="flex flex-col"
      style={{
        minHeight: "calc(100vh - 38vh - 56px - 40px)",
        background: "#f2f2f0",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        fontFamily: "var(--font-caveat)",
      }}
    >
      {/* Hero：左（标题 + 小猫） / 右（按钮·状态 + 四条卡片） */}
      <div className="flex items-start justify-center px-6 md:px-16 pt-5 pb-6">
        <div className="w-full flex flex-col md:flex-row gap-10 md:gap-16" style={{ maxWidth: "960px" }}>

          {/* 左列：标题（上） + 小猫（下） */}
          <div className="flex flex-col gap-3 flex-shrink-0">
            <Image
              src="/hero-title.png"
              alt="Hi, 我是木杉"
              width={1053}
              height={175}
              priority
              style={{ width: "clamp(190px, 27vw, 300px)", height: "auto", maxWidth: "100%" }}
            />

            {/* 状态 + 社交 */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="inline-flex items-center gap-2" style={{ fontSize: "12px", color: "#7a766e", border: "1.5px solid #d0cdc4", borderRadius: "20px", padding: "4px 14px", background: "rgba(255,255,255,0.6)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                开放机会 · AI 技术销售
              </div>
              <a href="mailto:mushan.ysl@gmail.com" title="发邮件" style={{ fontSize: "18px", color: "#8c887f", lineHeight: 1 }}>✉</a>
              <a href="https://www.xiaohongshu.com" target="_blank" rel="noopener noreferrer" title="小红书" style={{ fontSize: "16px", lineHeight: 1 }}>📕</a>
            </div>

            <div className="hidden md:flex items-center justify-center overflow-hidden" style={{ width: "clamp(160px, 20vw, 220px)", height: "clamp(160px, 20vw, 220px)", marginTop: "-32px" }}>
              <Image src="/cat-nobg.gif" alt="" width={220} height={220} unoptimized className="object-contain w-full h-full" />
            </div>
          </div>

          {/* 右列：四条卡片 */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex flex-col gap-2" style={{ fontFamily: "var(--font-geist-sans)", width: "fit-content", maxWidth: "100%" }}>
              {strengths.map((s) => (
                <div key={s.title} className="flex items-baseline gap-2.5 whitespace-nowrap" style={{ padding: "2px 0" }}>
                  <span style={{ fontSize: "15px", color: "#c4c0b8", flexShrink: 0, width: "18px" }}>{s.icon}</span>
                  <span className="font-bold text-neutral-800 flex-shrink-0" style={{ fontSize: "16px" }}>{s.title}</span>
                  <span style={{ fontSize: "15px", color: "#8c887f" }}>— {s.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
