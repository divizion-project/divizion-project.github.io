import type { Metadata } from "next";
import { WikiIndex } from "@/components/wiki";
export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Guides d’installation, de connexion Microsoft et de dépannage du Divizion Launcher.",
  alternates: { canonical: "/wiki/" },
};
export default function Page() {
  return <WikiIndex />;
}
