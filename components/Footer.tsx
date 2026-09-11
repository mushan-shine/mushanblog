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
        gap: "16px",
      }}
    >
      {/* 格言 */}
      <span
        style={{
          fontFamily: "var(--font-caveat)",
          fontSize: "14px",
          color: "#b0aca4",
          whiteSpace: "nowrap",
        }}
      >
        Grounded on Earth: respecting the laws, pursuing the truth, and applying the logic.
      </span>

      <span style={{ color: "#d4d0ca", fontSize: "12px" }}>·</span>

      {/* 备案号 */}
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
          fontSize: "12px",
          whiteSpace: "nowrap",
        }}
      >
        <img
          src="/beian-icon.png"
          alt="公安备案"
          style={{ width: "14px", height: "14px", objectFit: "contain" }}
        />
        京公网安备11010802050252号
      </a>
    </footer>
  );
}
