import { cn } from "@/lib/utils";
import { Heading, Paragraph } from "../ui/typography";

export const HeroLeftAligned = () => {
  return (
    <div className={cn("layout", "pt-16 md:pt-20 lg:pt-32")}>
      <div
        className={cn(
          "col-span-full flex flex-col order-1 mb-6 lg:mb-12 lg:justify-center",
          "lg:pr-6 lg:pb-0"
        )}
      >
        <div className="lg:w-4/6">
          <Paragraph level="label" className="mb-6">
            Our Journey
          </Paragraph>

          <Heading as="h1" className="mb-4">
            Building the Future of Assessment & Compliance
          </Heading>
        </div>
        <div className="lg:w-4/6 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <Paragraph className="text-lg mb-8">
            We&apos;re on a mission to transform how organizations handle
            compliance and risk management through intelligent tools and
            automation.
          </Paragraph>
        </div>
      </div>
    </div>
  );
};
