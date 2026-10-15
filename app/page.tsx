import { Home } from "@/components/home";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/config";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Divizion Launcher",
            operatingSystem: "Windows, macOS, Linux",
            applicationCategory: "GameApplication",
            url: SITE_URL,
            downloadUrl: `${SITE_URL}/download/`,
            offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
            description:
              "Launcher Minecraft Java : instances, mods, modloaders, Java et serveurs.",
          }).replaceAll("<", "\\u003c"),
        }}
      />
      <Home />
    </>
  );
}
