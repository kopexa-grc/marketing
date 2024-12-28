import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, MapPin, Briefcase } from "lucide-react";
import { Heading, Paragraph } from "../ui/typography";

interface Position {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  level: string;
}

interface OpenPositionsProps {
  positions: Position[];
}

export function OpenPositions({ positions }: OpenPositionsProps) {
  return (
    <section className="py-12 bg-muted/50">
      <div className="layout">
        <div className="col-span-full lg:col-span-8 lg:col-start-3">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-2">
              <Heading as="h2" level={3}>
                Open Positions
              </Heading>
              <Paragraph color="muted">
                Join our team and help shape the future of compliance
              </Paragraph>
            </div>
            <Button variant="outline">All Departments</Button>
          </div>

          <div className="space-y-4">
            {positions.map((position) => (
              <Card key={position.id} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Heading as="h3" level={6}>
                        {position.title}
                      </Heading>
                      <div className="flex flex-wrap gap-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Building2 className="h-4 w-4 mr-1" />
                          {position.department}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          {position.location}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {position.type}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{position.level}</Badge>
                      {position.department === "Engineering" && (
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary"
                        >
                          Remote Possible
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button>
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
