import type { Metadata } from "next";
import { ReleasesPage } from "@/components/releases-page";
export const metadata: Metadata = {
  title: "Versions",
  description:
    "Notes de version, nouveautés et corrections de Divizion Launcher, stable et bêta.",
  alternates: { canonical: "/releases/" },
};
export default function Page() {
  return <ReleasesPage />;
}
