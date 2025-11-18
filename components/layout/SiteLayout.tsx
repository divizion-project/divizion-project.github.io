"use client";

import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import PageTransition from "../transitions/PageTransition";

type SiteLayoutProps = {
  children: ReactNode;
};

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#1a1a1a]">
      <Navbar />
      <PageTransition>
        <main className="flex-1">{children}</main>
      </PageTransition>
      <Footer />
    </div>
  );
}
