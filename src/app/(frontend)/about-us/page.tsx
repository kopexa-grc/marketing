import { CompanyHero } from "@/components/company/hero";
import { ValuesSection } from "@/components/company/values-section";
import { VisionSection } from "@/components/company/vision-section";
import { HeroLeftAligned } from "@/components/hero/hero-left-aligned";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Kopexa",
  description:
    "Learn about Kopexa's journey, our mission to transform compliance and risk management, and the team behind our innovative platform.",
};

export default function AboutUsPage() {
  return (
    <>
      <HeroLeftAligned />
      <CompanyHero />
      <VisionSection />
      <ValuesSection />
    </>
  );
}
