"use client";
import { usePathname } from "next/navigation";

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <main
      style={{
        paddingTop: isHome ? "calc(40vh + 56px)" : "56px",
        minHeight: "100vh",
        ...(isHome
          ? {}
          : {
              backgroundImage: "url('/stone-bg.png')",
              backgroundSize: "cover",
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
            }),
      }}
    >
      {children}
    </main>
  );
}
