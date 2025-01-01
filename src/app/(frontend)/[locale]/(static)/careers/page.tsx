import type { Metadata } from "next";
import { CareersHero } from "@/components/careers/careers-hero";
import { CompanyValues } from "@/components/careers/company-values";
import { OpenPositions } from "@/components/careers/open-positions";
import { JoinTeamSection } from "@/components/careers/join/join-team-section";
import { BenefitsSection } from "@/components/careers/benefits/benefits-section";
// import { CompanyBenefits } from "@/components/careers/company-benefits";
// import { JoinTeam } from "@/components/careers/join-team";

export const metadata: Metadata = {
  title: "Careers at Kopexa | Join Our Team",
  description:
    "Join Kopexa and help organizations transform their compliance and risk management. Explore open positions and our company culture.",
};

export default async function CareersPage() {
  // In a real app, these would come from your CMS or API
  const positions = [
    {
      id: "fe-dev",
      title: "Frontend Developer",
      department: "Engineering",
      location: "Berlin / Remote",
      type: "Full-time",
      level: "Mid-Senior",
    },
    {
      id: "pm",
      title: "Product Manager",
      department: "Product",
      location: "Berlin",
      type: "Full-time",
      level: "Senior",
    },
    {
      id: "sales-eng",
      title: "Sales Engineer",
      department: "Sales",
      location: "Remote",
      type: "Full-time",
      level: "Senior",
    },
    // Add more positions as needed
  ];

  return (
    <div className="min-h-screen bg-background">
      <CareersHero />
      <CompanyValues />
      <OpenPositions positions={positions} />
      <BenefitsSection />
      <JoinTeamSection />
    </div>
  );
}
