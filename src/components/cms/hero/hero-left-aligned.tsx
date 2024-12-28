import { Heading, Paragraph } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { Page } from "@/payload-types";
import { RichText } from "../rich-text";
import { CMSLink } from "../cms-link";
import { Media } from "../media";

type Picked = "tagline" | "heading" | "description" | "links" | "media";

type Props = Pick<Page["hero"], Picked>;

export const HeroLeftAligned = ({
  tagline,
  heading,
  description,
  links,
  media,
}: Props) => {
  return (
    <div className={cn("layout", "text-foreground lg:py-32 md:py-20 py-16")}>
      <div
        className={cn(
          "col-span-full lg:col-span-6",
          "flex flex-col order-1 mb-4",
          "md:mb-6",
          "lg:justify-center lg:pr-4 lg:order-1 lg:mb-0"
        )}
      >
        <div className="space-y-4">
          {tagline && (
            <Paragraph level="label" className="mb-6">
              {tagline}
            </Paragraph>
          )}

          {heading && (
            <Heading as="h1" className="mb-4">
              {heading}
            </Heading>
          )}
        </div>

        <div className="flex flex-col">
          {description && <RichText content={description} />}

          {Array.isArray(links) && links.length > 0 && (
            <div className="flex items-center mt-6 lg:mt-8 gap-4">
              {links.map((link, idx) => (
                <CMSLink key={`${link.id}-${idx}`} {...link.link} size="lg" />
              ))}
            </div>
          )}
        </div>
      </div>
      <div
        className={cn(
          "col-span-full lg:col-span-6",
          "order-1 mb-0 max-w-full max-h-full",
          "lg:flex lg:items-center lg:justify-end lg:order-2 lg:pl-4"
        )}
      >
        {media && typeof media === "object" && (
          <Media
            className="relative w-full h-full"
            imgClassName="w-full h-auto max-w-full"
            priority
            resource={media}
          />
        )}
      </div>
    </div>
  );
};
