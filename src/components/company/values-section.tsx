import { Heart, Lightbulb, ShieldCheck, Users } from "lucide-react";
import { Card } from "../ui/card";
import { Heading } from "../ui/typography";

const values = [
  {
    icon: ShieldCheck,
    title: "Trust & Security",
    description:
      "We maintain the highest standards of security and data protection.",
  },
  {
    icon: Users,
    title: "Customer First",
    description:
      "Every decision starts with understanding our customers' needs.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We constantly push boundaries to create better solutions.",
  },
  {
    icon: Heart,
    title: "Team Spirit",
    description:
      "We believe great achievements come from collaboration and mutual support.",
  },
] as const;

export function ValuesSection() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="layout">
        <div className="col-span-full lg:col-span-8 lg:col-start-3 text-center mb-12">
          <Heading level={2} className="mb-4">
            Our Core Values
          </Heading>
          <p className="text-lg text-muted-foreground">
            The principles that guide everything we do
          </p>
        </div>

        {values.map((value) => (
          <Card
            key={value.title}
            className="col-span-full md:col-span-2 lg:col-span-3"
          >
            <div className="p-6 flex flex-col items-center text-center">
              <div className="p-2 bg-primary/10 rounded-lg mb-4">
                <value.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">
                {value.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
