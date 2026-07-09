import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCases, getCaseBySlug } from "@/lib/cases";

export function generateStaticParams() {
  // 只为没有外链的案例生成详情页
  return getAllCases()
    .filter((c) => !c.href)
    .map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getCaseBySlug(slug);
  if (!item) return {};
  return { title: item.title, description: item.desc };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getCaseBySlug(slug);
  if (!item) notFound();

  return (
    <div className="max-w-[760px] mx-auto px-6">
      <div className="pt-8 pb-3">
        <Link href="/portfolio" className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
          ← 返回案例
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight mt-4" style={{ color: "#ffffff", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
          {item.title}
        </h1>
        <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.5)" }}>
          {item.tag}
          {item.status ? ` · ${item.status}` : ""}
          {item.date ? ` · ${item.date}` : ""}
        </p>
      </div>
      <article className="bg-white rounded-xl border border-neutral-200/80 p-8 mb-24 article-content">
        <div dangerouslySetInnerHTML={{ __html: item.contentHtml }} />
      </article>
    </div>
  );
}
