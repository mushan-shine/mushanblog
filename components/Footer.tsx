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
        gap: "4px",
      }}
    >
      <img
        src="/earth-nobg.png"
        alt="earth"
        style={{
          width: "72px",
          height: "72px",
          objectFit: "contain",
          flexShrink: 0,
        }}
      />
      <p
        style={{
          fontFamily: "var(--font-caveat)",
          fontSize: "18px",
          color: "#8c887f",
          whiteSpace: "nowrap",
          lineHeight: 1,
        }}
      >
        Grounded on Earth: respecting the laws, pursuing the truth, and applying the logic.
      </p>
    </footer>
  );
}
