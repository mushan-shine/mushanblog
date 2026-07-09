// 类型、常量与纯字符串解析/序列化，可安全被客户端组件引用（不含 fs）
export const THOUGHT_TAGS = ["思维方式", "财务心理", "自我认知", "引用"] as const;
export type ThoughtTag = typeof THOUGHT_TAGS[number];

export interface ThoughtItem {
  text: string;
  tag: ThoughtTag;
  italic?: boolean;
}
export interface ThoughtEntry {
  date: string;
  items: ThoughtItem[];
}

const TAG_SET = new Set<string>(THOUGHT_TAGS);

// 解析 thoughts.md → 结构化数据
// 规则：## YYYY-MM-DD 开始一天；- [标签] 内容 为一条；内容用 *..* 包裹表示斜体
export function parseThoughtsMarkdown(md: string): ThoughtEntry[] {
  const map: Record<string, ThoughtEntry> = {};
  let current: string | null = null;

  for (const rawLine of md.split(/\r?\n/)) {
    const line = rawLine.trim();
    const dateMatch = line.match(/^##\s+(\d{4}-\d{2}-\d{2})\s*$/);
    if (dateMatch) {
      current = dateMatch[1];
      if (!map[current]) map[current] = { date: current, items: [] };
      continue;
    }
    const itemMatch = line.match(/^[-*]\s+\[([^\]]+)\]\s*(.+)$/);
    if (itemMatch && current) {
      const tag = itemMatch[1].trim();
      if (!TAG_SET.has(tag)) continue;
      let text = itemMatch[2].trim();
      let italic = false;
      if (text.length >= 2 && text.startsWith("*") && text.endsWith("*")) {
        italic = true;
        text = text.slice(1, -1).trim();
      }
      map[current].items.push({ text, tag: tag as ThoughtTag, italic });
    }
  }

  return Object.values(map)
    .filter((e) => e.items.length > 0)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
