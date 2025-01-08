import { CMSLink } from "@/components/cms/cms-link";
import { Media } from "@/components/cms/media";
import { Icon, IconName } from "@/components/ui/icon";
import { Heading, Paragraph } from "@/components/ui/typography";
import { HeadingVariants } from "@/components/ui/typography/heading";
import { cn } from "@/lib/utils";
import type { FeatureSectionBlock as FeatureSectionBlockProps } from "@/payload-types";

type Props = FeatureSectionBlockProps;

export const FeatureSectionBlock = (props: Props) => {
  switch (props.variant) {
    case "variantOne":
      return <VariantOne {...props} />;
    default:
      return null;
  }
};

function VariantOne({
  variant,
  heading,
  headingLevel,
  headingTag,
  features,
  media,
  links,
}: Props) {
  if (variant !== "variantOne") return null;

  return (
    <section className="layout pt-xhuge gap-y-[unset]">
      <div className="col-span-full">
        {media && (
          <Media resource={media} imgClassName="rounded-2xl w-full block" />
        )}
        {/** media zone */}
        <Heading
          as={headingTag}
          level={
            (headingLevel
              ? (Number.parseInt(headingLevel) ?? 3)
              : 3) as HeadingVariants["level"]
          }
          className={cn(
            "lg:w-1/2",
            media ? "lg:my-16 md:my-12 my-10" : "lg:mb-16 md:mb-12 mb-10"
          )}
        >
          {heading}
        </Heading>
      </div>
      {Array.isArray(features) &&
        features.map((feature) => (
          <div
            key={feature.id}
            className={cn(
              "col-span-full lg:col-span-5",
              "flex items-start",
              "lg:mb-16 md:mb-12 mb-10"
            )}
          >
            {feature.mediaType &&
              ["icon", "media"].includes(feature.mediaType) && (
                <div
                  className={cn(
                    "inline-flex size-16 lg:size-20 shrink-0 items-center justify-center",
                    "border-2 border-primary rounded-2xl",
                    "mr-6 lg:mr-8"
                  )}
                >
                  {feature.mediaType === "icon" && feature.icon && (
                    <Icon name={feature.icon as IconName} className="size-8" />
                  )}
                </div>
              )}
            <div className="flex flex-col gap-1">
              <Paragraph as="span" level="label">
                {feature.headline}
              </Paragraph>
              <Paragraph>{feature.description}</Paragraph>
            </div>
          </div>
        ))}
      {Array.isArray(links) && links.length > 0 && (
        <div className="col-span-full">
          <div className="flex flex-col lg:flex-row gap-4">
            {links.map((link) => (
              <CMSLink key={link.id} {...link.link} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
