import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { ColumnKey } from "./columns";
import { calloutExtension } from "./callouts";   // ← 加这行

marked.use({ extensions: [calloutExtension] });   // ← 加这行（放在所有 import 下面）

export interface ArticleMeta {
  slug: string;
  column: ColumnKey;
  title: string;
  subtag?: string; // 细分标签，如 服务器/云计算/大模型/网络/存储（仅技术学习栏目常用）
  desc: string;
  status?: string;
  date: string;
  href?: string; // 若填了外链，卡片直接跳这里，不进详情页
}

export interface Article extends ArticleMeta {
  contentHtml: string;
  pdf?: string; // 对应的 PDF 手稿路径（在 public 下）
}

function contentDir(column: ColumnKey) {
  return path.join(process.cwd(), "content/columns", column);
}

function readMeta(column: ColumnKey, file: string): ArticleMeta {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(contentDir(column), file), "utf8");
  const { data } = matter(raw);
  return {
    slug,
    column,
    title: data.title ? String(data.title) : slug,
    subtag: data.subtag ? String(data.subtag) : undefined,
    desc: data.desc ? String(data.desc) : "",
    status: data.status ? String(data.status) : "",
    date: data.date ? String(data.date) : "",
    href: data.href ? String(data.href) : undefined,
  };
}

export function getArticles(column: ColumnKey): ArticleMeta[] {
  const dir = contentDir(column);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readMeta(column, f))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(column: ColumnKey, slug: string): Article | null {
  const file = path.join(contentDir(column), `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    column,
    title: data.title ? String(data.title) : slug,
    subtag: data.subtag ? String(data.subtag) : undefined,
    desc: data.desc ? String(data.desc) : "",
    status: data.status ? String(data.status) : "",
    date: data.date ? String(data.date) : "",
    href: data.href ? String(data.href) : undefined,
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
