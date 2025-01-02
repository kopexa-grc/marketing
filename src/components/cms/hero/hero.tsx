import { Heading, Paragraph } from "@/components/ui/typography";
import type { Page } from "@/payload-types";
import { RichText } from "../rich-text";
import { CMSLink } from "../cms-link";
import { Media } from "../media";
import { tv } from "tailwind-variants";
import { useId } from "react";

type Picked =
  | "tagline"
  | "heading"
  | "description"
  | "links"
  | "media"
  | "layout";

type Props = Pick<Page["hero"], Picked>;

const hero = tv({
  slots: {
    wrapper: [
      "relative py-16 md:py-20 lg:py-32 bg-primary text-primary-foreground",
    ],
    container: ["layout"],
    content: ["col-span-4"],
    header: ["space-y-4"],
    tagline: ["text-primary-foreground"],
    heading: ["text-primary-foreground"],
    body: ["flex flex-col"],
    navigation: ["flex items-center mt-6 lg:mt-8 gap-4"],
    mediaWrapper: ["col-span-full"],
    media: ["relative overflow-hidden rounded-2xl"],
    mediaImage: ["w-full h-auto max-w-full"],
  },
  variants: {
    layout: {
      centered: {
        content: ["col-span-4 lg:col-span-8 lg:col-start-3", "items-center"],
        header: ["space-y-4", "text-center"],
        tagline: ["text-center"],
        heading: ["text-center"],
        body: ["flex flex-col items-center", "text-center"],
        navigation: ["justify-center"],
        mediaWrapper: ["col-span-full", "flex justify-center"],
      },
      start: {
        content: ["col-span-full lg:col-span-6", "items-start"],
        header: ["space-y-4", "text-left"],
        tagline: ["text-left"],
        heading: ["text-left"],
        body: ["flex flex-col items-start", "text-left"],
        navigation: ["justify-start"],
        mediaWrapper: ["col-span-full lg:col-span-6", "lg:col-start-7"],
      },
    },
    hasMedia: {
      true: {},
      false: {},
    },
  },
  defaultVariants: {
    hasMedia: false,
    layout: "centered",
  },
  compoundVariants: [
    {
      layout: "start",
      hasMedia: true,
      className: {
        content: "lg:pr-12",
        mediaWrapper: "lg:pl-12",
      },
    },
  ],
});

export const Hero = ({
  tagline,
  heading,
  description,
  links,
  media,
  layout,
}: Props) => {
  const css = hero({
    hasMedia: !!media,
    layout: layout ?? "centered",
  });

  const id = useId();

  const headingId = `${id}-heading`;
  const navigationId = `${id}-navigation`;
  const contentId = `${id}-content`;

  return (
    <div className={css.wrapper()}>
      <section aria-labelledby={headingId} id={id} className={css.container()}>
        <div className={css.content()} role="presentation" id={contentId}>
          <header className={css.header()}>
            {tagline && (
              <Paragraph
                level="label"
                className={css.tagline()}
                aria-label="Tagline"
                aria-describedby={headingId}
              >
                {tagline}
              </Paragraph>
            )}

            {heading && (
              <Heading as="h1" className={css.heading()} id={headingId}>
                {heading}
              </Heading>
            )}
          </header>
          <div className={css.body()}>
            {description && (
              <div aria-label="Description" aria-describedby={headingId}>
                <RichText content={description} />
              </div>
            )}

            {Array.isArray(links) && links.length > 0 && (
              <nav
                className={css.navigation()}
                aria-label="Hero call to action"
                id={navigationId}
              >
                {links.map((link, idx) => (
                  <CMSLink
                    key={`${link.id}-${idx}`}
                    {...link.link}
                    size="lg"
                    aria-label={`${link.link.label} - Call to action ${idx + 1}`}
                    aria-describedby={headingId}
                  />
                ))}
              </nav>
            )}
          </div>
        </div>

        {media && typeof media === "object" && (
          <div
            className={css.mediaWrapper()}
            role="presentation"
            aria-hidden="true"
          >
            <Media
              className="relative overflow-hidden rounded-2xl"
              imgClassName="w-full h-auto max-w-full"
              priority
              resource={media}
              aria-hidden="true"
            />
          </div>
        )}
      </section>
    </div>
  );
};
