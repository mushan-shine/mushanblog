import type { Metadata } from "next";
import { Geist, Caveat, ZCOOL_KuaiLe } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import BannerWrapper from "@/components/BannerWrapper";
import MainWrapper from "@/components/MainWrapper";
import SparkleEffect from "@/components/SparkleEffect";
import Footer from "@/components/Footer";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] });
const kuaile = ZCOOL_KuaiLe({ variable: "--font-kuaile", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "木杉 | AI 技术销售",
  description: "软件研发背景，华为售前经验，专注 AI + Data 方向的技术型销售候选人。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={`${geist.variable} ${caveat.variable} ${kuaile.variable} antialiased`}>
      <body className="bg-[#f2f2f0] text-neutral-900">
        <SparkleEffect />
        <BannerWrapper />
        <Nav />
        <MainWrapper>{children}</MainWrapper>
        <Footer />
      </body>
    </html>
  );
}
