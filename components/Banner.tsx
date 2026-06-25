import Image from "next/image";

export default function Banner() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        width: "100%",
        height: "40vh",
        backgroundImage: "url('/stone-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "flex-end",
        padding: "40px 64px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "14px" }}>
        {/* 圆形头像，约 1/3 banner 高度 */}
        <div
          style={{
            width: "calc(40vh / 3)",
            height: "calc(40vh / 3)",
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid rgba(255,255,255,0.3)",
            flexShrink: 0,
          }}
        >
          <Image
            src="/avatar.jpg"
            alt="木杉"
            width={200}
            height={200}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>

        {/* 文字在头像下方 */}
        <div>
          <h1
            style={{
              fontFamily: "var(--font-caveat)",
              fontSize: "clamp(28px, 3.5vw, 48px)",
              fontWeight: 700,
              color: "#f5f5f5",
              lineHeight: 1.1,
              letterSpacing: "-0.5px",
              textShadow: "0 2px 12px rgba(0,0,0,0.4)",
            }}
          >
            木杉
          </h1>
          <p
            style={{
              fontFamily: "var(--font-caveat)",
              fontSize: "16px",
              color: "rgba(255,255,255,0.6)",
              marginTop: "4px",
              textShadow: "0 1px 6px rgba(0,0,0,0.4)",
            }}
          >
            立志成为最懂技术最懂沟通的销售
          </p>
        </div>
      </div>
    </div>
  );
}
