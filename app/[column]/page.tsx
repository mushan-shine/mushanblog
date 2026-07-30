import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import ColumnList from "@/components/ColumnList";
import { getArticles } from "@/lib/articles";
import { COLUMNS, ColumnKey, getColumn } from "@/lib/columns";

export function generateStaticParams() {
  return COLUMNS.map((c) => ({ column: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ column: string }> }) {
  const { column } = await params;
  const def = COLUMNS.find((c) => c.slug === column);
  if (!def) return {};
  return { title: def.pageTitle, description: def.pageDesc };
}

export default async function ColumnPage({ params }: { params: Promise<{ column: string }> }) {
  const { column } = await params;
  const def = COLUMNS.find((c) => c.slug === column);
  if (!def) notFound();
  const articles = getArticles(def.key as ColumnKey);

  return (
    <div className="max-w-[960px] mx-auto px-6">
      <PageHeader title={def.pageTitle} desc={def.pageDesc} />
      <ColumnList articles={articles} columnSlug={def.slug} subtags={getColumn(def.key).subtags} />
    </div>
  );
}
