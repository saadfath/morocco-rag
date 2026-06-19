import type { Metadata } from "next";
import { SmartGovDashboard } from "@/components/smartgov/SmartGovDashboard";

export const metadata: Metadata = {
  title: "SmartGov AI — Morocco 2030 Command Center",
  description:
    "Centre de commandement IA gouvernemental — Administration proactive, prédictive et centrée sur le citoyen.",
};

export default function SmartGovPage() {
  return <SmartGovDashboard />;
}
