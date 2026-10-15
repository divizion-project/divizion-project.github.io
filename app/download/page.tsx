import type { Metadata } from "next";
import { DownloadPage } from "@/components/download-page";
export const metadata: Metadata = {
  title: "Télécharger",
  description:
    "Téléchargez la dernière version stable ou bêta de Divizion Launcher pour Windows, macOS et Linux.",
  alternates: { canonical: "/download/" },
};
export default function Page() {
  return <DownloadPage />;
}
