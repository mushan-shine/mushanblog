import PageHeader from "@/components/PageHeader";
import PortfolioList from "@/components/PortfolioList";
import { getAllCases } from "@/lib/cases";

export default function Portfolio() {
  const cases = getAllCases();

  return (
    <div className="max-w-[960px] mx-auto px-6">
      <PageHeader title="我能做什么" desc="没有正式销售经历，就用行动来证明。这里是模拟的售前场景、产品拆解，以及实际动手的项目。" />
      <PortfolioList cases={cases} />
    </div>
  );
}
