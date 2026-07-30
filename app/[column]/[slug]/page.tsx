import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles, getArticleBySlug } from "@/lib/articles";
import { COLUMNS, ColumnKey } from "@/lib/columns";
import ArticleView from "@/components/ArticleView";

export function generateStaticParams() {
  return COLUMNS.flatMap((c) =>
    getArticles(c.key as ColumnKey)
      .filter((a) => !a.href) // 有外链的文章不生成详情页
      .map((a) => ({ column: c.slug, slug: a.slug }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ column: string; slug: string }> }) {
  const { column, slug } = await params;
  const def = COLUMNS.find((c) => c.slug === column);
  if (!def) return {};
  const item = getArticleBySlug(def.key as ColumnKey, slug);
  if (!item) return {};
  return { title: item.title, description: item.desc };
}

export default async function ArticlePage({ params }: { params: Promise<{ column: string; slug: string }> }) {
  const { column, slug } = await params;
  const def = COLUMNS.find((c) => c.slug === column);
  if (!def) notFound();
  const item = getArticleBySlug(def.key as ColumnKey, slug);
  if (!item) notFound();

  return (
    <div className="max-w-[960px] mx-auto px-6">
      <div className="pt-8 pb-3">
        <Link href={`/${def.slug}`} className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
          ← 返回{def.pageTitle}
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight mt-4" style={{ color: "#ffffff", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
          {item.title}
        </h1>
        <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.5)" }}>
          {item.subtag ?? def.pageTitle}
          {item.status ? ` · ${item.status}` : ""}
          {item.date ? ` · ${item.date}` : ""}
        </p>
      </div>
      <ArticleView contentHtml={item.contentHtml} pdf={item.pdf} />
    </div>
  );
}
