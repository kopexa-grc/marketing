import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Heading, Paragraph } from "@/components/ui/typography";

export function JoinCTA() {
  return (
    <div>
      <Paragraph level="label" className="mb-4 text-background">
        Join Our Team
      </Paragraph>
      <Heading as="h2" level={2} className="mb-4">
        Ready to Make an Impact?
      </Heading>
      <Paragraph
        level="large"
        className="text-primary-foreground/80 mb-6 max-w-lg"
      >
        Join our team of passionate individuals working to transform how
        organizations handle compliance and risk management.
      </Paragraph>
      <div className="flex flex-wrap gap-4">
        <Button variant="secondary" size="lg">
          View Open Positions
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="border-primary-foreground/20 hover:bg-primary-foreground/10"
        >
          Learn About Our Culture
        </Button>
      </div>
    </div>
  );
}
