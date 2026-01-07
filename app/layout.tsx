import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import SiteLayout from "@/components/layout/SiteLayout";
import { I18nProvider } from "@/lib/i18n";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Divizion",
  description: "Divizion est un serveur Minecraft géopolitique.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${rajdhani.variable}`}>
      <body>
        <I18nProvider>
          <SiteLayout>{children}</SiteLayout>
        </I18nProvider>
      </body>
    </html>
  );
}
