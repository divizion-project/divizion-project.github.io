import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
export const metadata: Metadata = {
  title: "Confidentialité",
  description:
    "Politique de confidentialité de Divizion Launcher et du site vitrine.",
  alternates: { canonical: "/privacy/" },
};
export default function Page() {
  return <LegalPage kind="privacy" />;
}
