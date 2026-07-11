import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import ArticleView from "@/components/ArticleView";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.desc };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="max-w-[960px] mx-auto px-6">
      <div className="pt-8 pb-3">
        <Link href="/insights" className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
          ← 返回列表
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight mt-4" style={{ color: "#ffffff", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
          {post.title}
        </h1>
        <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.5)" }}>
          {post.category}
          {post.date ? ` · ${post.date}` : ""}
        </p>
      </div>
      <ArticleView contentHtml={post.contentHtml} pdf={post.pdf} />
    </div>
  );
}
