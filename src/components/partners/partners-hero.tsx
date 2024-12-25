import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function PartnersHero() {
  return (
    <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
      <div className="layout">
        <div className="col-span-full md:col-span-4 lg:col-span-8 lg:col-start-3 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Partner with Kopexa
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Join our ecosystem of technology, consulting, and service partners
            to help organizations transform their compliance and risk
            management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Become a Partner
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Partner Directory
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
