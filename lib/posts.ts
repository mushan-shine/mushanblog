import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const postsDir = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  category: string;
  desc: string;
  date: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
  pdf?: string; // 对应的 PDF 手稿路径（在 public 下），如 /manuscripts/xxx.pdf
}

function readMeta(file: string): PostMeta {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
  const { data } = matter(raw);
  return {
    slug,
    title: data.title ? String(data.title) : slug,
    category: data.category ? String(data.category) : "未分类",
    desc: data.desc ? String(data.desc) : "",
    date: data.date ? String(data.date) : "",
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  return files
    .map(readMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const file = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ? String(data.title) : slug,
    category: data.category ? String(data.category) : "未分类",
    desc: data.desc ? String(data.desc) : "",
    date: data.date ? String(data.date) : "",
    contentHtml: marked.parse(content) as string,
    pdf: resolvePdf(slug, data.pdf),
  };
}

// 手稿 PDF 约定：public/manuscripts/<slug>.pdf 自动识别；也可用 frontmatter 的 pdf 字段显式指定
function resolvePdf(slug: string, explicit: unknown): string | undefined {
  if (explicit) return String(explicit);
  const rel = `/manuscripts/${slug}.pdf`;
  const abs = path.join(process.cwd(), "public", rel);
  return fs.existsSync(abs) ? rel : undefined;
}
