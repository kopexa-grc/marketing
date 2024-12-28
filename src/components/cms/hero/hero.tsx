import { Heading, Paragraph } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { Page } from "@/payload-types";
import { RichText } from "../rich-text";
import { CMSLink } from "../cms-link";
import { Media } from "../media";

type Picked = "tagline" | "heading" | "description" | "links" | "media";

type Props = Pick<Page["hero"], Picked>;

export const Hero = ({
  tagline,
  heading,
  description,
  links,
  media,
}: Props) => {
  return (
    <div className="lg:py-32 md:py-20 py-16">
      <div className={cn("layout")}>
        <div className="col-span-4 lg:col-span-8 lg:col-start-3">
          <div className="space-y-4">
            {tagline && (
              <Paragraph level="label" className="text-center">
                {tagline}
              </Paragraph>
            )}

            {heading && (
              <Heading as="h1" className="text-center">
                {heading}
              </Heading>
            )}
          </div>
          <div className="flex flex-col items-center">
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

        {media && typeof media === "object" && (
          <div className="col-span-full">
            <Media
              className="relative overflow-hidden rounded-2xl"
              imgClassName="w-full h-auto max-w-full"
              priority
              resource={media}
            />
          </div>
        )}
      </div>
    </div>
  );
};
