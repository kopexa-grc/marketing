import { Card } from "@/components/ui/card";
import {
  TrendingUp,
  Users,
  BookOpen,
  Trophy,
  Zap,
  BarChart,
  LifeBuoy,
  Target,
} from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Revenue Growth",
    description:
      "Access new markets and revenue streams through partnership opportunities",
  },
  {
    icon: Users,
    title: "Joint Marketing",
    description:
      "Co-marketing activities, events, and promotional opportunities",
  },
  {
    icon: BookOpen,
    title: "Training & Resources",
    description: "Comprehensive training programs and educational resources",
  },
  {
    icon: Trophy,
    title: "Partner Recognition",
    description: "Recognition program with tiered benefits and rewards",
  },
  {
    icon: Zap,
    title: "Technical Support",
    description:
      "Priority access to technical support and implementation assistance",
  },
  {
    icon: BarChart,
    title: "Business Planning",
    description: "Strategic business planning and growth support",
  },
  {
    icon: LifeBuoy,
    title: "Dedicated Support",
    description: "Dedicated partner success manager for your account",
  },
  {
    icon: Target,
    title: "Lead Generation",
    description: "Access to qualified leads and referral opportunities",
  },
] as const;

export function PartnerBenefits() {
  return (
    <section className="py-12">
      <div className="layout">
        <div className="col-span-full lg:col-span-8 lg:col-start-3 text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Partner Program Benefits
          </h2>
          <p className="text-lg text-muted-foreground">
            Join our partner program and unlock a range of benefits to help grow
            your business
          </p>
        </div>

        {benefits.map((benefit, index) => (
          <Card
            key={benefit.title}
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
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
