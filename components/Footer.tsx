export default function Footer() {
  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        height: "40px",
        background: "rgba(242,242,240,0.92)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
      }}
    >
      {/* 地球图标 + 格言 */}
      <div style={{ display: "flex", alignItems: "center", gap: "0px" }}>
        <img src="/earth-nobg.png" alt="earth" style={{ width: "46px", height: "46px", objectFit: "contain" }} />
        <span
          style={{
            fontFamily: "var(--font-caveat)",
            fontSize: "20px",
            color: "#b0aca4",
            whiteSpace: "nowrap",
          }}
        >
          Grounded on Earth: respecting the laws, pursuing the truth, and applying the logic.
        </span>
      </div>

      <span style={{ color: "#d4d0ca", fontSize: "12px", marginLeft: "8px" }}>·</span>

      {/* 公安备案号 */}
      <a
        href="https://beian.mps.gov.cn/#/query/webSearch?code=11010802050252"
        target="_blank"
        rel="noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          textDecoration: "none",
          color: "#b0aca4",
          fontSize: "16px",
          whiteSpace: "nowrap",
        }}
      >
        <img
          src="/beian-icon.png"
          alt="公安备案"
          style={{ width: "16px", height: "16px", objectFit: "contain" }}
        />
        京公网安备11010802050252号
      </a>

      <span style={{ color: "#d4d0ca", fontSize: "12px" }}>·</span>

      {/* ICP备案号 */}
      <a
        href="https://beian.miit.gov.cn"
        target="_blank"
        rel="noreferrer"
        style={{
          textDecoration: "none",
          color: "#b0aca4",
          fontSize: "16px",
          whiteSpace: "nowrap",
        }}
      >
        京ICP备2026051325号-1
      </a>
    </footer>
  );
}
