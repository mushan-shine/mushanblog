interface PageHeaderProps { title: string; desc: string; }

export default function PageHeader({ title, desc }: PageHeaderProps) {
  return (
    <section className="pt-8 pb-3 flex items-baseline gap-3">
      <h1 className="text-2xl font-semibold tracking-tight flex-shrink-0" style={{ color: "#ffffff", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>{title}</h1>
      <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{desc}</p>
    </section>
  );
}
