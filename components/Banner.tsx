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
        height: "38vh",
        backgroundImage: "url('/stone-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <Image
        src="/portrait.png"
        alt=""
        width={1242}
        height={1660}
        priority
        style={{
          position: "absolute",
          left: "12px",
          bottom: "-8%",
          height: "112%",
          width: "auto",
          opacity: 1,
        }}
      />
    </div>
  );
}
