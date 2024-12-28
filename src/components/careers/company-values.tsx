import { Card } from "@/components/ui/card";
import { Target, Users, Lightbulb, Shield } from "lucide-react";
import { Heading, Paragraph } from "../ui/typography";

const values = [
  {
    icon: Target,
    title: "Impact-Driven",
    description:
      "We're focused on making a real difference in how organizations handle compliance and risk.",
  },
  {
    icon: Users,
    title: "Collaborative",
    description:
      "We believe the best solutions come from diverse teams working together towards common goals.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We encourage creative thinking and are not afraid to challenge the status quo.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We maintain the highest standards of integrity in everything we do.",
  },
] as const;

export function CompanyValues() {
  return (
    <section className="py-12">
      <div className="layout">
        <div className="col-span-full lg:col-span-8 lg:col-start-3 text-center mb-12">
          <Heading as="h2" level={3} className="mb-4">
            Our Values
          </Heading>
          <Paragraph level="large" color="muted">
            These core values guide everything we do at Kopexa
          </Paragraph>
        </div>

        {values.map((value, index) => (
          <Card
            key={value.title}
            className={`col-span-full md:col-span-2 lg:col-span-3 ${
              index % 4 === 1
                ? "lg:col-start-4"
                : index % 4 === 2
                ? "lg:col-start-7"
                : index % 4 === 3
                ? "lg:col-start-10"
                : ""
            }`}
          >
            <div className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <Heading as="h3" level={5} className="mb-2">
                {value.title}
              </Heading>
              <Paragraph level="small" color="muted">
                {value.description}
              </Paragraph>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
