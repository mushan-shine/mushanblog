"use client";
import { useEffect, useRef, useState } from "react";

const QUOTES = [
  "你现在的努力，是为了以后有更多选择的自由。",
  "慢慢来，比较快。",
  "把每一件小事做好，就是不平凡。",
  "热爱可抵岁月漫长。",
  "种一棵树最好的时间是十年前，其次是现在。",
  "别怕，你想要的，时间都会给你。",
  "保持热爱，奔赴山海。",
  "所有的努力，都不会白费。",
  "星光不问赶路人，时光不负有心人。",
  "越努力，越幸运。",
  "去成为你想成为的人，什么时候都不算晚。",
  "脚踏实地，仰望星空。",
  "自律，给我自由。",
  "今天的每一步，都算数。",
  "做难而正确的事。",
];

const STAR_COUNT = 130;
const BAND_ANGLE = -Math.PI / 5; // 银河带倾斜方向

interface Star {
  x: number;
  y: number;
  r: number;
  base: number; // 基础亮度
  phase: number;
  speed: number;
  quote: string;
}

interface Popup {
  left: number; // 文字中心 x
  top: number;
  quote: string;
}

// 用离屏 canvas 测量文字宽度
let measureCtx: CanvasRenderingContext2D | null = null;
function measureText(text: string): number {
  if (typeof document === "undefined") return 0;
  if (!measureCtx) measureCtx = document.createElement("canvas").getContext("2d");
  if (!measureCtx) return 0;
  measureCtx.font = '14px "FangSong","STFangsong","仿宋",serif';
  return measureCtx.measureText(text).width;
}

// 近似高斯（-1.5~1.5 集中在 0 附近）
function gaussian() {
  return Math.random() + Math.random() + Math.random() - 1.5;
}

export default function StarField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const [popup, setPopup] = useState<Popup | null>(null);
  const [visible, setVisible] = useState(false);

  // 弹窗渐显：挂载后下一帧切到可见；约 4 秒后自动渐隐
  useEffect(() => {
    if (!popup) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    const hide = setTimeout(() => setVisible(false), 3000);
    const unmount = setTimeout(() => setPopup(null), 3850);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hide);
      clearTimeout(unmount);
    };
  }, [popup]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let W = 0;
    let H = 0;
    let last = 0;
    const FRAME = 1000 / 30; // 限制 ~30fps 降低重绘负担
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function seed() {
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cx = W * 0.5;
      const cy = H * 0.5;
      const diag = Math.hypot(W, H);
      const stars: Star[] = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        let x: number, y: number, band: boolean;
        if (i < STAR_COUNT * 0.7) {
          // 银河带：沿倾斜线聚集，垂直方向高斯散开
          band = true;
          const along = (Math.random() - 0.5) * diag * 0.95;
          const across = gaussian() * Math.min(W, H) * 0.16;
          x = cx + Math.cos(BAND_ANGLE) * along - Math.sin(BAND_ANGLE) * across;
          y = cy + Math.sin(BAND_ANGLE) * along + Math.cos(BAND_ANGLE) * across;
        } else {
          band = false;
          x = Math.random() * W;
          y = Math.random() * H;
        }
        x = Math.max(3, Math.min(W - 3, x));
        y = Math.max(3, Math.min(H - 3, y));
        const bright = Math.random();
        stars.push({
          x,
          y,
          r: bright > 0.93 ? Math.random() * 1.4 + 1.6 : Math.random() * 1.1 + 0.5,
          base: band ? 0.5 + Math.random() * 0.5 : 0.3 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 1.4 + 0.5,
          quote: QUOTES[Math.floor(Math.random() * QUOTES.length)],
        });
      }
      starsRef.current = stars;
    }

    function drawNebula() {
      // 柔和的银河光带
      ctx.save();
      ctx.translate(W * 0.5, H * 0.5);
      ctx.rotate(BAND_ANGLE);
      const grad = ctx.createLinearGradient(0, -H * 0.5, 0, H * 0.5);
      grad.addColorStop(0, "rgba(180,195,255,0)");
      grad.addColorStop(0.5, "rgba(190,205,255,0.06)");
      grad.addColorStop(1, "rgba(180,195,255,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(-Math.hypot(W, H) / 2, -H * 0.32, Math.hypot(W, H), H * 0.64);
      ctx.restore();
    }

    function draw(t: number) {
      raf = requestAnimationFrame(draw);
      if (t - last < FRAME) return;
      last = t;
      ctx.clearRect(0, 0, W, H);
      drawNebula();
      for (const s of starsRef.current) {
        const tw = 0.55 + 0.45 * Math.sin(t * 0.001 * s.speed + s.phase);
        const a = Math.min(1, s.base * tw);
        // 柔和光晕：外圈淡填充（比 shadowBlur 便宜很多）
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,215,255,${a * 0.14})`;
        ctx.fill();
        // 星芯
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      }
    }

    seed();
    raf = requestAnimationFrame(draw);
    const onResize = () => seed();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  function handleClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    let best: Star | null = null;
    let bestD = Infinity;
    for (const s of starsRef.current) {
      const d = Math.hypot(s.x - cx, s.y - cy);
      if (d < bestD) {
        bestD = d;
        best = s;
      }
    }
    if (best && bestD < Math.max(best.r * 6, 18)) {
      const margin = 14;
      const W = rect.width;
      const H = rect.height;
      // 文字实际宽度（不超过区域可用宽度）
      const textW = Math.min(measureText(best.quote), W - margin * 2);
      // 横向：以星星为中心，收拢到整句能完整显示的最近位置
      const minC = margin + textW / 2;
      const maxC = W - margin - textW / 2;
      const left = maxC < minC ? W / 2 : Math.min(Math.max(best.x, minC), maxC);
      // 纵向：默认星星下方；若太靠底则放到星星上方
      const top = best.y + 34 <= H ? best.y + 12 : Math.max(6, best.y - 26);
      setVisible(false);
      setPopup({ left, top, quote: best.quote });
    } else {
      close();
    }
  }

  function close() {
    setVisible(false);
    setTimeout(() => setPopup(null), 340);
  }

  return (
    <div
      ref={wrapRef}
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        height: "100%",
        width: "min(46%, 900px)",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        style={{ position: "absolute", inset: 0, pointerEvents: "auto", cursor: "pointer" }}
      />

      {popup && (
        <div
          onClick={close}
          style={{
            position: "absolute",
            left: `${popup.left}px`,
            top: `${popup.top}px`,
            transform: "translate(-50%, 0)",
            color: "#fff",
            fontSize: "14px",
            lineHeight: 1.5,
            fontFamily: '"FangSong", "STFangsong", "FangSong_GB2312", "仿宋", serif',
            whiteSpace: "nowrap",
            textShadow: "0 1px 6px rgba(0,0,0,0.7), 0 0 14px rgba(0,0,0,0.45)",
            pointerEvents: "auto",
            cursor: "pointer",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.85s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {popup.quote}
        </div>
      )}
    </div>
  );
}
