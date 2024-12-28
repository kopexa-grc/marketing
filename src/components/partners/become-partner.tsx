import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeCheck, ArrowRight } from "lucide-react";
import { Heading, Paragraph } from "../ui/typography";

const requirements = [
  "Proven expertise in compliance or risk management",
  "Commitment to customer success",
  "Technical capability to integrate or implement solutions",
  "Established market presence",
] as const;

export function BecomePartner() {
  return (
    <section className="py-12 bg-muted/50">
      <div className="layout">
        <Card className="col-span-full lg:col-span-8 lg:col-start-3">
          <div className="p-8 md:p-12">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Left side - Content */}
              <div className="flex-1 space-y-6">
                <div className="space-y-2">
                  <Heading as="h3" level={3}>
                    Become a Partner
                  </Heading>
                  <Paragraph level="large" color="muted">
                    Join our partner ecosystem and help organizations transform
                    their compliance and risk management.
                  </Paragraph>
                </div>

                <div className="space-y-4">
                  <Heading as="h4" level={6}>
                    Partner Requirements
                  </Heading>
                  <ul className="space-y-3">
                    {requirements.map((requirement) => (
                      <li key={requirement} className="flex items-start gap-2">
                        <BadgeCheck className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <Button size="lg">
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Right side - Contact Info */}
              <div className="lg:w-72 space-y-6">
                <div className="space-y-2">
                  <Heading as="h3" level={6}>
                    Contact Us
                  </Heading>
                  <Paragraph level="small" color="muted">
                    Have questions about becoming a partner? Our partnership
                    team is here to help.
                  </Paragraph>
                </div>

                <div>
                  <div className="text-sm font-medium mb-1">Email</div>
                  <Button variant="link" className="p-0 h-auto text-sm">
                    partners@kopexa.com
                  </Button>
                </div>

                <div>
                  <div className="text-sm font-medium mb-1">Phone</div>
                  <Button variant="link" className="p-0 h-auto text-sm">
                    +1 (555) 123-4567
                  </Button>
                </div>

                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    Schedule a Call
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
