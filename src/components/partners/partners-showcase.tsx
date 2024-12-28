import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRight, Building, Award } from "lucide-react";

const featuredPartners = [
  {
    name: "TechSecure Solutions",
    type: "Technology Partner",
    level: "Gold",
    logo: "/api/placeholder/120/60",
    description: "Leading provider of security assessment tools.",
    specialties: ["IT Security", "Risk Assessment", "GDPR"],
  },
  {
    name: "ComplianceFirst Consulting",
    type: "Consulting Partner",
    level: "Platinum",
    logo: "/api/placeholder/120/60",
    description: "Expert compliance consulting services worldwide.",
    specialties: ["ISO 27001", "SOC 2", "Compliance Training"],
  },
  {
    name: "RiskPro Services",
    type: "Solution Partner",
    level: "Gold",
    logo: "/api/placeholder/120/60",
    description: "Comprehensive risk management solutions.",
    specialties: ["Risk Management", "Audit Services", "Training"],
  },
] as const;

export function PartnersShowcase() {
  return (
    <section className="py-12 bg-muted/50">
      <div className="layout">
        <div className="col-span-full lg:col-span-8 lg:col-start-3 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Featured Partners</h2>
              <p className="text-muted-foreground">
                Meet some of our trusted partners who help deliver exceptional
                compliance solutions.
              </p>
            </div>
            <Button variant="outline">
              View All Partners
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {featuredPartners.map((partner) => (
          <Card
            key={partner.name}
            className={"col-span-full lg:col-span-8 lg:col-start-3"}
          >
            <div className="p-6">
              <div className="flex items-start gap-6">
                {/* Logo */}
                <div className="shrink-0 w-[120px] h-[60px] bg-muted rounded-lg flex items-center justify-center">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="max-w-full max-h-full"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{partner.name}</h3>
                    <Badge variant="outline" className="rounded-full">
                      <Building className="h-3 w-3 mr-1" />
                      {partner.type}
                    </Badge>
                    <Badge
                      className={`rounded-full ${
                        partner.level === "Platinum"
                          ? "bg-primary/10 text-primary"
                          : ""
                      }`}
                    >
                      <Award className="h-3 w-3 mr-1" />
                      {partner.level} Partner
                    </Badge>
                  </div>

                  <p className="text-muted-foreground mb-4">
                    {partner.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {partner.specialties.map((specialty) => (
                      <Badge
                        key={specialty}
                        variant="outline"
                        className="rounded-full"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="shrink-0">
                  <Button variant="ghost" size="sm">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
