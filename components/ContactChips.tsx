"use client";
import { useEffect, useRef, useState } from "react";

const CONTACTS = [
  { key: "email", icon: "✉", label: "邮箱", value: "mushan.ysl@gmail.com", display: "邮箱：mushan.ysl@gmail.com", size: 18 },
  { key: "xhs", icon: "📕", label: "小红书", value: "26719233266", display: "小红书：26719233266", size: 16 },
];

export default function ContactChips() {
  const [open, setOpen] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearTimers() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  function show(key: string) {
    clearTimers();
    setCopied(false);
    if (open === key) {
      hide();
      return;
    }
    setOpen(key);
    requestAnimationFrame(() => setVisible(true));
    timers.current.push(setTimeout(() => setVisible(false), 3000));
    timers.current.push(setTimeout(() => setOpen(null), 3300));
  }

  function hide() {
    clearTimers();
    setVisible(false);
    timers.current.push(setTimeout(() => setOpen(null), 300));
  }

  // 点击其他位置关闭
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) hide();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  useEffect(() => () => clearTimers(), []);

  async function copy(v: string) {
    try {
      await navigator.clipboard.writeText(v);
      setCopied(true);
    } catch {
      window.prompt("复制以下内容：", v);
    }
  }

  return (
    <div ref={wrapRef} style={{ display: "inline-flex", alignItems: "center", gap: "12px" }}>
      {CONTACTS.map((c) => (
        <span key={c.key} style={{ position: "relative", display: "inline-flex" }}>
          <button
            title={c.label}
            onClick={() => show(c.key)}
            style={{
              fontSize: `${c.size}px`,
              color: "#8c887f",
              lineHeight: 1,
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            {c.icon}
          </button>

          {open === c.key && (
            <span
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                left: 0,
                zIndex: 30,
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                whiteSpace: "nowrap",
                fontSize: "13px",
                color: "#3a3630",
                fontFamily: "var(--font-geist-sans)",
                textShadow: "0 1px 2px rgba(242,242,240,0.9)",
                opacity: visible ? 1 : 0,
                transition: "opacity 0.3s ease",
                pointerEvents: visible ? "auto" : "none",
              }}
            >
              {c.display}
              <button
                onClick={() => copy(c.value)}
                title="复制到剪贴板"
                style={{
                  fontSize: "12px",
                  color: copied ? "#2e7d32" : "#8c887f",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {copied ? "已复制✓" : "复制"}
              </button>
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
