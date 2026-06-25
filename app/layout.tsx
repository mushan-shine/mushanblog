import type { Metadata } from "next";
import { Geist, Caveat } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import SparkleEffect from "@/components/SparkleEffect";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "木杉 | AI 技术销售",
  description: "软件研发背景，华为售前经验，专注 AI + Data 方向的技术型销售候选人。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={`${geist.variable} ${caveat.variable} antialiased`}>
      <body className="bg-[#f2f2f0] text-neutral-900">
        <SparkleEffect />
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
