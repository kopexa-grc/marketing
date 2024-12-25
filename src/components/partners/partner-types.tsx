import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Puzzle, Users, Building, ArrowRight } from "lucide-react";

const partnerTypes = [
  {
    icon: Puzzle,
    title: "Technology Partners",
    description:
      "Integrate your solutions with our platform to provide comprehensive compliance and risk management capabilities.",
    features: [
      "API Access",
      "Integration Support",
      "Co-marketing Opportunities",
      "Technical Documentation",
    ],
  },
  {
    icon: Users,
    title: "Consulting Partners",
    description:
      "Help organizations implement and optimize their compliance and risk management processes using Kopexa.",
    features: [
      "Implementation Training",
      "Partner Portal Access",
      "Sales Support",
      "Certification Program",
    ],
  },
  {
    icon: Building,
    title: "Solution Partners",
    description:
      "Resell and implement Kopexa solutions as part of your service offerings to your clients.",
    features: [
      "Dedicated Support",
      "Revenue Sharing",
      "Sales Training",
      "Partner Resources",
    ],
  },
] as const;

export function PartnerTypes() {
  return (
    <section className="py-12">
      <div className="layout">
        {partnerTypes.map((type, index) => (
          <Card
            key={type.title}
            className={`col-span-full md:col-span-2 lg:col-span-4 ${
              index === 1
                ? "lg:col-start-5"
                : index === 2
                ? "lg:col-start-9"
                : ""
            }`}
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                  <type.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">{type.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {type.description}
                  </p>
                </div>
              </div>

              <div className="flex-1">
                <ul className="space-y-3 mb-6">
                  {type.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-sm flex items-center gap-2"
                    >
                      <ArrowRight className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
