import type { Metadata } from "next";
import "./globals.css";
import "./sections.css";
import { Provider } from "@/components/provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/page-transition";
import { SITE_URL, asset } from "@/lib/config";
import localFont from "next/font/local";

const messina = localFont({
  src: [
    {
      path: "../public/fonts/messina-sans.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/messina-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-messina",
  display: "swap",
});

const teodor = localFont({
  src: "../public/fonts/teodor-light.woff2",
  variable: "--font-teodor",
  weight: "300",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Divizion — Launcher Minecraft",
    template: "%s · Divizion",
  },
  description:
    "Gérez vos instances Minecraft, installez vos mods depuis Modrinth et lancez vos serveurs avec Divizion. Gratuit, sur Windows, macOS et Linux.",
  icons: { icon: asset("/favicon.ico"), apple: asset("/assets/logo.webp") },
  openGraph: {
    title: "Divizion — Launcher Minecraft",
    description: "Instances, mods, Java et serveurs dans un seul launcher.",
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
  },
  robots: { index: true, follow: true },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${messina.variable} ${teodor.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Aller au contenu / Skip to content
        </a>
        <Provider>
          <Header />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
