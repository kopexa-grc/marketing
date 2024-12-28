import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Heading } from "../ui/typography";

export function CareersHero() {
  return (
    <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
      <div className="layout">
        <div className="col-span-full md:col-span-4 lg:col-span-8 lg:col-start-3 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full text-sm text-primary mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            We&apos;re hiring!
          </div>

          <Heading as="h1" className="mb-4">
            Join us in Transforming Compliance & Risk Management
          </Heading>
          <p className="text-lg text-muted-foreground mb-8">
            Work with passionate people who are committed to making compliance
            and risk management more accessible and efficient for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              View Open Positions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Meet the Team
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-left">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Team Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Nationalities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">4.8/5</div>
              <div className="text-sm text-muted-foreground">
                Employee Rating
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">
                Remote Friendly
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
