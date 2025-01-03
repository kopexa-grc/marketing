import { CMSLink } from "@/components/cms/cms-link";
import { Media } from "@/components/cms/media";
import { Heading, Paragraph } from "@/components/ui/typography";
import type {
  CardGridBlock as CardGridBlockProps,
  CMSLinkField,
} from "@/payload-types";
import { ArrowRight } from "lucide-react";
import { tv } from "tailwind-variants";

const styles = tv({
  slots: {
    root: ["relative pt-xhuge", "overflow-hidden"],
    container: ["layout"],
    header: ["col-span-full max-w-2xl", "mb-12"],
    heading: "mb-4",
    description: "",
    grid: ["col-span-full grid gap-6", "grid-cols-1"],
    card: [
      "group relative",
      "bg-card",
      "rounded-xl",
      "border-2",
      "overflow-hidden",
      "transition-all duration-300",
      //"motion-safe:hover:border-primary",
    ],
    content: [
      "p-6",
      "flex flex-col",
      "h-full", // To allow footer to push to bottom
    ],
    contentBody: [
      "flex-1", // Takes available space
    ],
    footer: [
      "mt-6", // Spacing from content
      "flex justify-end", // Align arrow to end
    ],
    arrowWrapper: [
      "h-10 w-10",
      "rounded-full",
      "bg-foreground",
      "flex items-center justify-center",
      "transition-all duration-300 ease-out",
      "group-hover:bg-primary",
    ],
    arrow: [
      "h-4 w-4",
      "text-background",
      "transition-colors duration-300",
      "group-hover:text-primary-foreground",
    ],
    media: ["relative", "w-full", "bg-muted"],
    cardTitle: ["mb-2"],
    cardSubtitle: ["text-sm", "mb-4"],
    cardDescription: ["text-muted-foreground", "line-clamp-3"],
  },
  variants: {
    theme: {
      default: {
        card: ["bg-card", "border-border", "motion-safe:hover:border-primary"],
      },
      primary: {
        card: [
          "bg-primary/5",
          "border-primary/20",
          "motion-safe:hover:bg-primary/10",
          "motion-safe:hover:border-primary",
        ],
      },
      secondary: {
        card: [
          "bg-secondary",
          "border-secondary/20",
          "motion-safe:hover:bg-secondary/80",
          "motion-safe:hover:border-secondary",
        ],
      },
    },
    enableHover: {
      true: {
        card: ["motion-safe:hover:scale-[1.01]", "motion-safe:hover:shadow-lg"],
        arrowWrapper: [
          "motion-safe:group-hover:bg-primary",
          "motion-safe:group-hover:-translate-y-1",
        ],
        arrow: ["motion-safe:group-hover:text-primary-foreground"],
      },
      false: {},
    },
    layout: {
      grid: {
        grid: ["md:grid-cols-2", "lg:grid-cols-3"],
      },
      list: {
        grid: ["grid-cols-1 gap-8"],
        card: ["md:flex md:items-start"],
        media: ["md:w-1/3"],
        content: ["md:flex-1"],
      },
      masonry: {
        grid: ["columns-1 md:columns-2 lg:columns-3", "gap-6"],
        card: ["break-inside-avoid", "mb-6"],
      },
    },
    columns: {
      "2": {
        grid: "lg:grid-cols-2",
      },
      "3": {
        grid: "lg:grid-cols-3",
      },
      "4": {
        grid: "lg:grid-cols-4",
      },
    },
    gap: {
      small: {
        grid: "gap-4",
      },
      medium: {
        grid: "gap-6",
      },
      large: {
        grid: "gap-8",
      },
    },
  },
  compoundVariants: [
    {
      layout: "masonry",
      className: {
        grid: "!columns-1 md:!columns-2 lg:!columns-3",
      },
    },
  ],
});

type Props = CardGridBlockProps;

export const CardGridBlock = ({
  heading,
  description,
  layout,
  cards = [],
  settings,
}: Props) => {
  const css = styles({
    layout: layout ?? "grid",
    columns: settings?.columns ?? "3",
    gap: settings?.gap ?? "medium",
    theme: "default",
    enableHover: true,
  });

  const getCardUrl = (link: CMSLinkField) => {
    if (!link.type) return null;

    const href =
      link.type === "reference" &&
      typeof link.reference?.value === "object" &&
      link.reference.value.slug
        ? `${link.reference?.relationTo !== "pages" ? `/${link.reference?.relationTo}` : ""}/${
            link.reference.value.slug
          }`
        : link.url;

    return href ?? null;
  };

  return (
    <section className={css.root()}>
      <div className={css.container()}>
        {(heading || description) && (
          <header className={css.header()}>
            {heading && (
              <Heading level={2} className={css.heading()}>
                {heading}
              </Heading>
            )}
            {description && (
              <Paragraph className={css.description()}>{description}</Paragraph>
            )}
          </header>
        )}

        <div className={css.grid()}>
          {Array.isArray(cards) &&
            cards.map((card) => {
              const url = card.link ? getCardUrl(card.link) : null;
              const hasLink = Boolean(url);

              const cardStyle = css.card({
                theme: card.appearance?.theme ?? "default",
                enableHover: card.appearance?.enableHover ?? true,
              });

              const CardWrapper = hasLink ? CMSLink : "div";
              const cardProps = hasLink
                ? {
                    ...card.link,
                    className: cardStyle,
                    appearance: "none",
                  }
                : {
                    className: cardStyle,
                  };

              return (
                // @ts-expect-error yep, we slack.
                <CardWrapper key={`${card.id}`} {...cardProps}>
                  {card.media && (
                    <div
                      className={css.media()}
                      style={{
                        aspectRatio: card.appearance?.aspectRatio ?? "16/9",
                      }}
                    >
                      <Media
                        resource={card.media}
                        fill
                        size={
                          layout === "list"
                            ? "(max-width: 768px) 100vw, 33vw"
                            : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        }
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className={css.content()}>
                    <div className={css.contentBody()}>
                      <Heading level={4} as="h3" className={css.cardTitle()}>
                        {card.title}
                      </Heading>

                      {card.subtitle && (
                        <Paragraph color="muted" className={css.cardSubtitle()}>
                          {card.subtitle}
                        </Paragraph>
                      )}

                      {card.description && (
                        <p className={css.cardDescription()}>
                          {card.description}
                        </p>
                      )}
                    </div>

                    {hasLink && (
                      <footer className={css.footer()}>
                        <div className={css.arrowWrapper()}>
                          <ArrowRight className={css.arrow()} />
                        </div>
                      </footer>
                    )}
                  </div>
                </CardWrapper>
              );
            })}
        </div>
      </div>
    </section>
  );
};
