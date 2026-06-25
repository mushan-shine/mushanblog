"use client";
import { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export default function TiltCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, inside: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      if (!canvas || !cardRef.current) return;
      canvas.width = cardRef.current.offsetWidth;
      canvas.height = cardRef.current.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function spawnParticles(x: number, y: number) {
      const count = 5;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.4 + Math.random() * 1.2;
        particles.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 1,
          size: 1.5 + Math.random() * 2.5,
        });
      }
    }

    let lastX = 0;
    let lastY = 0;

    function loop() {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (mouseRef.current.inside) {
        const dx = mouseRef.current.x - lastX;
        const dy = mouseRef.current.y - lastY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 4) {
          spawnParticles(mouseRef.current.x, mouseRef.current.y);
          lastX = mouseRef.current.x;
          lastY = mouseRef.current.y;
        }
      }

      particles.current = particles.current.filter((p) => p.life > 0);
      for (const p of particles.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.02;
        p.life -= 0.03;
        const alpha = Math.max(0, p.life);
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, `rgba(255,245,180,${alpha})`);
        gradient.addColorStop(0.4, `rgba(255,235,140,${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(255,220,80,0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // 十字闪光
        ctx.save();
        ctx.globalAlpha = alpha * 0.7;
        ctx.strokeStyle = "rgba(255,245,180,0.9)";
        ctx.lineWidth = 0.8;
        const s = p.size * 3;
        ctx.beginPath();
        ctx.moveTo(p.x - s, p.y);
        ctx.lineTo(p.x + s, p.y);
        ctx.moveTo(p.x, p.y - s);
        ctx.lineTo(p.x, p.y + s);
        ctx.stroke();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    loop();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current = { x, y, inside: true };
    const rx = (x / rect.width - 0.5) * 14;
    const ry = (y / rect.height - 0.5) * 14;
    card.style.transform = `perspective(900px) rotateY(${rx}deg) rotateX(${-ry}deg) scale(1.02)`;
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    mouseRef.current.inside = false;
    card.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)";
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%)",
        borderRadius: "20px",
        padding: "40px 48px",
        color: "#fff",
        cursor: "default",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* 粒子 canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}
      />

      {/* 装饰圆 */}
      <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(255,255,255,0.03)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-60px", left: "-30px", width: "220px", height: "220px", borderRadius: "50%", background: "rgba(255,255,255,0.02)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}>OPEN TO WORK</span>
        </div>

        <div style={{ display: "flex", gap: "48px", flexWrap: "wrap", alignItems: "flex-start" }}>
          <div>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>姓名</p>
            <p style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.5px" }}>木杉</p>
          </div>
          <div>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>方向</p>
            <p style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.5px" }}>AI 技术销售</p>
          </div>
          <div>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>背景</p>
            <p style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.5px" }}>华为 3 年</p>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", margin: "24px 0" }} />

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["软件研发", "售前 PM", "SPIN / MEDDIC", "大模型", "数据平台"].map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "12px",
                padding: "4px 12px",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "20px",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
