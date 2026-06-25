"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/portfolio", label: "案例" },
  { href: "/insights", label: "思考" },
  { href: "/thoughts", label: "日常感叹" },
  { href: "/about", label: "关于我" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <header className="fixed z-50" style={{ top: pathname === "/" ? "40vh" : 0, left: 0, right: 0, height: "56px", background: "rgba(242,242,240,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <div className="h-full flex items-center justify-between" style={{ maxWidth: "960px", margin: "0 auto", width: "100%", padding: "0 64px" }}>
        <Link href="/" className="font-bold text-neutral-800" style={{ fontFamily: "var(--font-caveat)", fontSize: "20px" }}>
          木杉
          <span className="font-normal ml-2" style={{ fontSize: "14px", color: "#b0aca4" }}>/ AI 技术销售</span>
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "var(--font-caveat)",
                fontSize: "16px",
                padding: "4px 12px",
                borderRadius: "4px",
                display: "inline-block",
                color: pathname === l.href ? "#faf8f4" : "#8c887f",
                background: pathname === l.href ? "rgba(44,44,44,0.82)" : "transparent",
                boxShadow: pathname === l.href ? "2px 2px 0 rgba(44,44,44,0.25)" : "none",
                transform: pathname === l.href ? "rotate(-0.8deg)" : "none",
                transition: "color 0.15s",
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
