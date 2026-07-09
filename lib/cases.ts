import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const casesDir = path.join(process.cwd(), "content/cases");

export interface CaseMeta {
  slug: string;
  title: string;
  tag: string;
  desc: string;
  status: string;
  date: string;
  href?: string; // 若填了外链，卡片直接跳这里，不进详情页
}

export interface CaseItem extends CaseMeta {
  contentHtml: string;
}

function readMeta(file: string): CaseMeta {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(casesDir, file), "utf8");
  const { data } = matter(raw);
  return {
    slug,
    title: data.title ? String(data.title) : slug,
    tag: data.tag ? String(data.tag) : "案例",
    desc: data.desc ? String(data.desc) : "",
    status: data.status ? String(data.status) : "",
    date: data.date ? String(data.date) : "",
    href: data.href ? String(data.href) : undefined,
  };
}

export function getAllCases(): CaseMeta[] {
  if (!fs.existsSync(casesDir)) return [];
  return fs
    .readdirSync(casesDir)
    .filter((f) => f.endsWith(".md"))
    .map(readMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getCaseBySlug(slug: string): CaseItem | null {
  const file = path.join(casesDir, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ? String(data.title) : slug,
    tag: data.tag ? String(data.tag) : "案例",
    desc: data.desc ? String(data.desc) : "",
    status: data.status ? String(data.status) : "",
    date: data.date ? String(data.date) : "",
    href: data.href ? String(data.href) : undefined,
    contentHtml: marked.parse(content) as string,
  };
}
