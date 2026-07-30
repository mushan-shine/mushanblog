// 通用栏目配置：新增/调整栏目只需改这里
export type ColumnKey = "tech" | "business" | "commercial";

export interface ColumnDef {
  key: ColumnKey;
  slug: string; // 路由，如 /tech
  label: string; // 导航显示名
  pageTitle: string;
  pageDesc: string;
  subtags?: string[]; // 该栏目下可用的细分标签（列表页会渲染筛选按钮）
}

export const COLUMNS: ColumnDef[] = [
  {
    key: "tech",
    slug: "tech",
    label: "技术学习",
    pageTitle: "技术学习",
    pageDesc: "服务器、云平台、大模型基础知识的学习与笔记。",
    subtags: ["服务器", "云计算", "大模型", "网络", "存储"],
  },
  {
    key: "business",
    slug: "business",
    label: "业务思考",
    pageTitle: "业务思考",
    pageDesc: "基于现有平台服务的思考：解决了什么问题，还能基于此解决什么问题。",
  },
  {
    key: "commercial",
    slug: "commercial",
    label: "商业价值",
    pageTitle: "商业价值",
    pageDesc: "关于如何变现的思考与实践。",
  },
];

export function getColumn(key: ColumnKey): ColumnDef {
  const c = COLUMNS.find((c) => c.key === key);
  if (!c) throw new Error(`Unknown column: ${key}`);
  return c;
}
