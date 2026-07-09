import PageHeader from "@/components/PageHeader";
import InsightsList from "@/components/InsightsList";
import { getAllPosts } from "@/lib/posts";

export default function Insights() {
  const posts = getAllPosts();

  return (
    <div className="max-w-[960px] mx-auto px-6">
      <PageHeader title="我在想什么" desc="销售方法论 × AI 技术理解。记录学习过程，也记录思考结果。" />
      <InsightsList posts={posts} />
    </div>
  );
}
