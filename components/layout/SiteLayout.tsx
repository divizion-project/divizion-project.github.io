"use client";

import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import PageTransition from "../transitions/PageTransition";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type SiteLayoutProps = {
  children: ReactNode;
};

export default function SiteLayout({ children }: SiteLayoutProps) {
  const pathname = usePathname();
  const isLauncherPage = pathname === "/launcher";

  return (
    <div className={clsx(
      "flex min-h-screen flex-col",
      isLauncherPage ? "bg-black" : "bg-[#1a1a1a]"
    )}>
      <Navbar />
      <PageTransition>
        <main className="flex-1">{children}</main>
      </PageTransition>
      <Footer />
    </div>
  );
}

