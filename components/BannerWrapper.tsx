"use client";
import { usePathname } from "next/navigation";
import Banner from "./Banner";

export default function BannerWrapper() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return <Banner />;
}
