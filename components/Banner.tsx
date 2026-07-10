import Image from "next/image";
import StarField from "./StarField";

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
          left: "-24px",
          bottom: "-20%",
          height: "140%",
          width: "auto",
          opacity: 1,
        }}
      />
      <Image
        src="/words.png"
        alt=""
        width={1920}
        height={360}
        priority
        style={{
          position: "absolute",
          left: "13%",
          top: "48%",
          width: "clamp(260px, 37%, 760px)",
          height: "auto",
          opacity: 0.55,
          filter: "invert(1) brightness(0.88)",
          pointerEvents: "none",
        }}
      />
      <StarField />
      <Image
        src="/rose.png"
        alt=""
        width={1242}
        height={1660}
        priority
        style={{
          position: "absolute",
          right: "26px",
          bottom: "11%",
          height: "46%",
          width: "auto",
          opacity: 0.9,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
