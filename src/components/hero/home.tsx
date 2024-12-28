import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Heading, Paragraph } from "../ui/typography";

export const HomeHero = () => {
  return (
    <section className="w-full">
      <div
        className={cn(
          "relative rounded-2xl w-full layout bg-primary text-primary-foreground",
          "text-center lg:text-left px-6 lg:px-12 py-16"
        )}
      >
        <div className="col-span-2 lg:col-span-6">
          <Heading as="h1">
            Achieve Compliance. Reduce Risk. In 15 Minutes.
          </Heading>
          <Paragraph level="large" className="mt-6 text-muted">
            Kopexa helps businesses streamline compliance processes and focus on
            what matters most – with actionable AI-driven insights.
          </Paragraph>
          <ul className="mt-6 text-left space-y-4">
            <li className="flex items-start gap-3">
              <span className="bg-secondary text-secondary-foreground rounded-full h-6 w-6 flex items-center justify-center font-bold">
                ✓
              </span>
              <p>AI-powered recommendations to simplify audits.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-secondary text-secondary-foreground rounded-full h-6 w-6 flex items-center justify-center font-bold">
                ✓
              </span>
              <p>Save hours on compliance preparation.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-secondary text-secondary-foreground rounded-full h-6 w-6 flex items-center justify-center font-bold">
                ✓
              </span>
              <p>Tailored workflows for ISO, GDPR, and beyond.</p>
            </li>
          </ul>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button size="xl" variant="secondary">
              Request a Demo
            </Button>
            <Button size="xl" variant="ghost">
              See How It Works
            </Button>
          </div>
        </div>

        <div className="relative col-span-2 lg:col-span-6">
          <img
            src="https://placehold.co/600x400"
            alt="AI Dashboard Illustration"
            className="w-full max-w-lg mx-auto lg:mx-0"
          />
          <div className="absolute bottom-4 left-4 bg-white shadow-lg rounded-lg p-4 max-w-xs">
            <h3 className="text-sm font-medium text-gray-700">AI Insights</h3>
            <p className="text-xs text-gray-500">
              &quot;Focus on high-impact tasks: ISO 27001 Section 6.1.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
