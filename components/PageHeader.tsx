interface PageHeaderProps { title: string; desc: string; }

export default function PageHeader({ title, desc }: PageHeaderProps) {
  return (
    <section className="pt-10 pb-10">
      <h1 className="text-3xl font-semibold tracking-tight mb-3" style={{ color: "#ffffff", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>{title}</h1>
      <p className="text-base leading-relaxed max-w-lg" style={{ color: "rgba(255,255,255,0.7)" }}>{desc}</p>
    </section>
  );
}
