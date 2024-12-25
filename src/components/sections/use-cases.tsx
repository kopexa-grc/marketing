import { Feature } from "../ui/feature";
import { cn } from "@/lib/utils";

const useCases = [
  {
    title: "ISO 27001 Compliance",
    description:
      "Automate audit preparation and follow-up with tailored assessments and dynamic actions.",
    image: "/images/features/iso27001_actions.png",
  },
  {
    title: "GDPR Compliance",
    description:
      "Identify data protection gaps and define concrete measures to comply with GDPR regulations.",
    image: "/images/features/gdpr_tasks.png",
  },
  {
    title: "Risk Management",
    description:
      "Identify and prioritize risks based on OWASP or CVSS standards and initiate dynamic actions.",
    image: "/images/features/owasp_risk-card.png",
  },
  {
    title: "IT Security Audits",
    description:
      "Review networks, applications, and systems for vulnerabilities and implement corrective actions.",
    image: "/images/features/it-security-risks.png",
  },
  {
    title: "ESG Assessments",
    description:
      "Support companies in meeting sustainability standards like CO₂ reduction or social responsibility.",
    icon: "/images/esg-icon.png",
  },
  {
    title: "M&A Due Diligence",
    description:
      "Conduct structured security and IT reviews during mergers and acquisitions, documenting risks and actions.",
    icon: "/images/ma-icon.png",
  },
  {
    title: "Business Continuity Planning",
    description:
      "Capture and evaluate critical business processes to define measures for continuity.",
    icon: "/images/business-icon.png",
  },
  {
    title: "Supply Chain Compliance",
    description:
      "Evaluate global supply chains for legal, ethical, and ecological standards.",
    icon: "/images/supply-chain-icon.png",
  },
  {
    title: "Certificate Preparation",
    description:
      "Automate preparation for standards like TISAX, PCI-DSS, or SOC 2.",
    icon: "/images/certification-icon.png",
  },
  {
    title: "Internal Audits",
    description:
      "Review internal processes and set up workflows for continuous improvement.",
    icon: "/images/internal-audit-icon.png",
  },
];

export const UseCases = () => {
  return (
    <section className="bg-background py-16 space-y-8 lg:space-y-12">
      {/* Headline Section */}
      <div className="layout text-center lg:text-left">
        <div className="mb-12 col-span-4 lg:col-span-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Flexible Use Cases for Every Need
          </h2>
          <p className="mt-4 text-lg text-accent-foreground">
            Discover how Kopexa adapts to solve your compliance challenges, no
            matter your industry.
          </p>
        </div>
      </div>

      <div className="layout">
        {useCases.map((useCase, index) => (
          <div
            key={useCase.title}
            className={cn(
              "col-span-full @container h-full",
              index % 4 === 0
                ? "md:col-span-2 lg:col-span-8"
                : index % 4 === 1
                ? "md:col-span-1 lg:col-span-4"
                : "md:col-span-1 lg:col-span-6"
            )}
          >
            <Feature.Root className="h-full">
              <Feature.TextWrapper>
                <h4 className="text-xl font-semibold text-foreground mb-2">
                  {useCase.title}
                </h4>
                <p>{useCase.description}</p>
              </Feature.TextWrapper>
              {useCase.image && (
                <Feature.Image src={useCase.image} alt={useCase.title} />
              )}
            </Feature.Root>
          </div>
        ))}
      </div>
    </section>
  );
};
