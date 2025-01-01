import type { Metadata } from "next";
import { PartnersHero } from "@/components/partners/partners-hero";
import { PartnerTypes } from "@/components/partners/partner-types";
import { PartnerBenefits } from "@/components/partners/partner-benefits";
import { BecomePartner } from "@/components/partners/become-partner";
import { PartnersShowcase } from "@/components/partners/partners-showcase";

export const metadata: Metadata = {
  title: "Partner Program | Kopexa",
  description:
    "Join Kopexa's partner ecosystem. Transform compliance and risk management together.",
};

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-background">
      <PartnersHero />
      <PartnerTypes />
      <PartnersShowcase />
      <PartnerBenefits />
      <BecomePartner />
    </div>
  );
}
