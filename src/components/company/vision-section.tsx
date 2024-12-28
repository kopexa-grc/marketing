import { RocketIcon, TargetIcon, UsersIcon } from "lucide-react";
import { Heading } from "../ui/typography";
export function VisionSection() {
  return (
    <section className="py-24">
      <div className="layout">
        <div className="col-span-full lg:col-span-5">
          <Heading as="h2" level={2} className="mb-4">
            Our Vision
          </Heading>
          <p className="text-lg text-muted-foreground mb-8">
            We envision a future where compliance and risk management are
            seamlessly integrated into every organization&apos;s operations,
            powered by intelligent automation and data-driven insights.
          </p>

          <div className="space-y-6">
            {[
              {
                icon: RocketIcon,
                title: "Innovation First",
                description: "Pushing boundaries with AI and automation",
              },
              {
                icon: TargetIcon,
                title: "Impact Driven",
                description: "Measurable improvements in compliance efficiency",
              },
              {
                icon: UsersIcon,
                title: "Customer Success",
                description: "Partner in our clients' growth journey",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-full lg:col-span-6 lg:col-start-7">
          <div className="relative aspect-square">
            <img
              src="/vision-image.jpg"
              alt="Our vision visualization"
              className="rounded-lg object-cover"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
