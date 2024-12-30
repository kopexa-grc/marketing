import { HomeHero } from "@/components/hero/home";
import CTASection from "@/components/sections/cta";
import { UseCases } from "@/components/sections/use-cases";

export default function Home() {
  return (
    <>
      <HomeHero />

      <UseCases />
      <CTASection />
    </>
  );
}
