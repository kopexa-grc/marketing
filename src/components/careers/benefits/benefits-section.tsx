import { Heading, Paragraph } from "@/components/ui/typography";
import { BenefitsGrid } from "./benefits-grid";

export function BenefitsSection() {
  return (
    <section className="py-16">
      <div className="layout">
        <div className="col-span-full lg:col-span-8 lg:col-start-3 text-center mb-12 space-y-4">
          <Heading as="h2" level={3}>
            Benefits & Perks
          </Heading>
          <Paragraph level="large" color="muted">
            We believe in taking care of our team with comprehensive benefits
            that matter most to you
          </Paragraph>
        </div>
        <BenefitsGrid />
      </div>
    </section>
  );
}
