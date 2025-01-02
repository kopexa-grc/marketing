import { Heading, Paragraph } from "@/components/ui/typography";
import type { Page } from "@/payload-types";
import { RichText } from "../rich-text";
import { CMSLink } from "../cms-link";
import { Media } from "../media";
import { tv } from "tailwind-variants";
import { ColorMode } from "../color-mode";

type Picked =
  | "tagline"
  | "heading"
  | "description"
  | "links"
  | "media"
  | "theme";

type Props = Pick<Page["hero"], Picked>;

const hero = tv({
  slots: {
    wrapper: ["bg-primary text-primary-foreground"],
    section: ["layout", "py-16 md:py-20 lg:py-32"],
    content: [
      "col-span-full lg:col-span-6",
      "flex flex-col order-1 mb-4",
      "md:mb-6",
      "lg:justify-center lg:pr-4 lg:order-1 lg:mb-0",
    ],
    contentInner: ["space-y-4"],
    description: ["flex flex-col"],
    tagline: ["mb-6"],
    heading: ["mb-4"],
    navigation: ["flex items-center mt-6 lg:mt-8 gap-4"],
    mediaWrapper: [
      "col-span-full lg:col-span-6",
      "order-1 mb-0 max-w-full max-h-full",
      "lg:flex lg:items-center lg:justify-end lg:order-2 lg:pl-4",
    ],
    media: ["relative w-full h-full"],
    mediaImage: ["w-full h-auto max-w-full"],
  },
  variants: {
    layout: {
      centered: {},
      start: {},
    },
  },
  defaultVariants: {},
});

export const HeroLeftAligned = ({
  tagline,
  heading,
  description,
  links,
  media,
  theme,
}: Props) => {
  const css = hero();

  return (
    <ColorMode
      theme={theme}
      as="section"
      aria-labelledby="hero-heading"
      className={css.wrapper()}
      data-hero="default"
    >
      <div className={css.section()}>
        <div className={css.content()}>
          <div className={css.contentInner()}>
            {tagline && (
              <Paragraph
                level="label"
                className={css.tagline()}
                aria-label="Tagline"
              >
                {tagline}
              </Paragraph>
            )}

            {heading && (
              <Heading as="h1" className={css.heading()} id="hero-heading">
                {heading}
              </Heading>
            )}
          </div>

          <div className={css.description()}>
            {description && <RichText content={description} />}

            {Array.isArray(links) && links.length > 0 && (
              <nav
                className={css.navigation()}
                aria-label="Hero call to action"
              >
                {links.map((link, idx) => (
                  <CMSLink key={`${link.id}-${idx}`} {...link.link} size="lg" />
                ))}
              </nav>
            )}
          </div>
        </div>
        <div className={css.mediaWrapper()}>
          {media && typeof media === "object" && (
            <Media
              className={css.media()}
              imgClassName={css.mediaImage()}
              priority
              resource={media}
            />
          )}
        </div>
      </div>
    </ColorMode>
  );
};
