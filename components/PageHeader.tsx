interface PageHeaderProps { label: string; title: string; desc: string; }

export default function PageHeader({ label, title, desc }: PageHeaderProps) {
  return (
    <section className="pt-32 pb-10">
      <p className="text-xs uppercase tracking-widest text-neutral-400 mb-3 font-medium">{label}</p>
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 mb-3">{title}</h1>
      <p className="text-base text-neutral-500 leading-relaxed max-w-lg">{desc}</p>
    </section>
  );
}
