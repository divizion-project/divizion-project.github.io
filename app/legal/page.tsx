import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
export const metadata: Metadata = {
  title: "Conditions d’utilisation",
  description:
    "Conditions générales d’utilisation, éditeur et mentions légales du projet Divizion.",
  alternates: { canonical: "/legal/" },
};
export default function Page() {
  return <LegalPage kind="legal" />;
}
