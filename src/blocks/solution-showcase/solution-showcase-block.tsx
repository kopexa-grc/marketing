import { ColorMode } from "@/components/cms/color-mode";
import { Media } from "@/components/cms/media";
import { Feature } from "@/components/ui/feature";
import { Icon, type IconName } from "@/components/ui/icon";
import { Heading, Paragraph } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { SolutionShowcaseBlock as SolutionShowcaseBlockProps } from "@/payload-types";

type Props = SolutionShowcaseBlockProps;

export const SolutionShowcaseBlock = ({ theme, heading, solutions }: Props) => {
  return (
    <ColorMode
      as="section"
      className="pt-xhuge space-y-8 lg:space-y-12"
      theme={theme}
    >
      {/* Headline Section */}
      {heading && (
        <div className="layout">
          <div
            className={cn(
              "col-span-full mb-12 space-y-4",
              "lg:col-span-8 lg:col-start-3",
              heading.alignment === "center" ? "text-center" : "text-left"
            )}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              {heading.title}
            </h2>
            {heading.description && (
              <p className="text-lg text-muted-foreground">
                {heading.description}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="layout">
        {Array.isArray(solutions) &&
          solutions.map((solution, index) => (
            <ColorMode
              key={`${solution.id}`}
              theme={solution.theme}
              className={cn(
                "col-span-full @container h-full",
                index % 4 === 0
                  ? "md:col-span-2 lg:col-span-8"
                  : index % 4 === 1
                    ? "md:col-span-1 lg:col-span-4"
                    : "md:col-span-1 lg:col-span-6"
              )}
            >
              <Feature.Root className="h-full">
                <Feature.TextWrapper className="space-y-2">
                  <Heading as="h4" level={5}>
                    {solution.title}
                  </Heading>

                  <Paragraph color="muted">{solution.description}</Paragraph>
                </Feature.TextWrapper>
                {/* Media handling */}
                {solution.media &&
                  solution.media.mediaType === "image" &&
                  solution.media?.image && (
                    <Feature.Media>
                      <Media
                        resource={solution.media.image}
                        className="w-full h-full object-cover rounded-2xl"
                        imgClassName="rounded-2xl"
                      />
                    </Feature.Media>
                  )}

                {solution.media &&
                  solution.media.mediaType === "icon" &&
                  solution.media?.icon && (
                    <div className="relative w-12 h-12 my-4">
                      <Icon
                        name={solution.media.icon as IconName}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
              </Feature.Root>
            </ColorMode>
          ))}
      </div>
    </ColorMode>
  );
};
