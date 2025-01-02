import { CMSLink } from "@/components/cms/cms-link";
import { RichText } from "@/components/cms/rich-text";
import { Heading, Paragraph } from "@/components/ui/typography";
import type { ServiceCardsBlock as ServiceCardsBlockProps } from "@/payload-types";
import { tv } from "tailwind-variants";

type Props = ServiceCardsBlockProps;

const styles = tv({
  slots: {
    root: "pt-xhuge layout space-y-8",
    header: "col-span-full lg:col-span-8 space-y-4",
    cardsList:
      "col-span-full grid auto-cols-fr grid-cols-1 lg:grid-cols-3 auto-rows-auto",
    cardRoot: [
      "max-w-full flex transition-colors p-10 w-full h-full group relative",
      "items-start flex-col rounded-2xl bg-transparent cursor-default gap-y-6",
    ],
    cardHeader: ["flex w-full items-center justify-between"],
    tag: ["tracking-wide uppercase text-sm font-medium text-primary"],
  },
  variants: {
    enableLink: {
      true: {
        cardRoot: ["hover:bg-primary/5"],
      },
      false: {},
    },
  },
});

export const ServiceCardsBlock = ({ heading, cards }: Props) => {
  const css = styles();

  return (
    <section className={css.root()}>
      {(heading?.heading || heading?.tagline) && (
        <header className={css.header()}>
          {heading.tagline && <Paragraph>{heading.tagline}</Paragraph>}
          {heading.heading && (
            <Heading as="h2" level={2}>
              {heading.heading}
            </Heading>
          )}
        </header>
      )}

      {Array.isArray(cards) && (
        <div className={css.cardsList()}>
          {cards.map((card) => (
            <article
              key={`${card.id}`}
              className={css.cardRoot({
                enableLink: card.enableLink ?? false,
              })}
            >
              <div className={css.cardHeader()}>
                <div className={css.tag()}>{card.tag}</div>
              </div>
              {card.enableLink ? (
                <CMSLink {...card.link?.link} appearance="none">
                  <span className="absolute inset-0" />
                  <Heading as="h3" level={3}>
                    {card.heading}
                  </Heading>
                </CMSLink>
              ) : (
                <Heading as="h3" level={3}>
                  {card.heading}
                </Heading>
              )}

              <RichText content={card.description} className="lg:!prose-md" />
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
