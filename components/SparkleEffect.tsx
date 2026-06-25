"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
}

export default function SparkleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function onMouseMove(e: MouseEvent) {
      mouse.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener("mousemove", onMouseMove);

    function spawnParticles(x: number, y: number) {
      for (let i = 0; i < 5; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 1.2;
        particles.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: 1.5 + Math.random() * 2.5,
        });
      }
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dx = mouse.current.x - lastPos.current.x;
      const dy = mouse.current.y - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 5) {
        spawnParticles(mouse.current.x, mouse.current.y);
        lastPos.current = { ...mouse.current };
      }

      particles.current = particles.current.filter((p) => p.life > 0);
      for (const p of particles.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.02;
        p.life -= 0.03;
        const alpha = Math.max(0, p.life);

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        g.addColorStop(0, `rgba(255,255,255,${alpha})`);
        g.addColorStop(0.4, `rgba(255,255,255,${alpha * 0.5})`);
        g.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        // 十字闪光
        ctx.save();
        ctx.globalAlpha = alpha * 0.7;
        ctx.strokeStyle = "rgba(255,255,255,0.9)";
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
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
