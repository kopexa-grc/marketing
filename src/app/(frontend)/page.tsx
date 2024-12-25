import { HomeHero } from "@/components/hero/home";
import CTASection from "@/components/sections/cta";
import { ProblemStatement } from "@/components/sections/problem-statement";
import { UseCases } from "@/components/sections/use-cases";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <HomeHero />
      <ProblemStatement />
      <div className="layout">
        <Separator className="col-span-full my-8 lg:my-12" />
      </div>

      <UseCases />
      <CTASection />
    </>
  );
}
