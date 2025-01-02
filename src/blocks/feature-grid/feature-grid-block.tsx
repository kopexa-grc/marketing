import { ColorMode } from "@/components/cms/color-mode";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Icon, type IconName } from "@/components/ui/icon";
import { PromoCard } from "@/components/ui/promo-card";
import { Heading, Paragraph } from "@/components/ui/typography";
import type { FeatureGridBlock as FeatureGridBlockProps } from "@/payload-types";
import { tv } from "tailwind-variants";

type Props = FeatureGridBlockProps;

const styles = tv({
  slots: {
    root: ["bg-background pt-xhuge space-y-8 lg:space-y-12"],
    container: ["layout"],
    header: ["col-span-full max-w-2xl mb-12"],
    title: ["mb-4"],
    description: "",
    grid: ["col-span-full gap-6"],
    cardWrapper: ["col-span-full md:col-span-1 h-full"],
    card: ["h-full", "hover:border-primary", "transition-all duration-300"],
    iconWrapper: [
      "p-2 bg-primary",
      "grid place-content-center size-12 rounded-lg",
      "text-primary-foreground",
    ],
    cardTitle: ["text-xl font-semibold", "pb-3"],
    cardDescription: ["text-muted-foreground"],
  },
  variants: {
    layout: {
      grid: {
        grid: ["grid md:grid-cols-2 lg:grid-cols-3"],
      },
      list: {
        grid: ["grid-cols-1 gap-8"],
        cardWrapper: ["col-span-full"],
        card: ["md:flex md:items-start"],
      },
      masonry: {
        grid: ["columns-1 md:columns-2 lg:columns-3", "gap-6"],
        cardWrapper: ["break-inside-avoid mb-6"],
      },
    },
    alignment: {
      left: {
        header: "text-left",
        title: "text-left",
        description: "text-left",
      },
      center: {
        header: "text-center mx-auto",
        title: "text-center",
        description: "text-center",
      },
      right: {
        header: "text-right ml-auto",
        title: "text-right",
        description: "text-right",
      },
    },
  },
});

export const FeatureGridBlock = ({
  layout,
  headline,
  cards = [],
  showPromoCard,
  promoCard,
  theme,
}: Props) => {
  const css = styles({
    layout: layout ?? "grid",
    alignment: headline.alignment ?? "center",
  });

  return (
    <ColorMode
      as="section"
      theme={theme}
      className={css.root()}
      data-section="feature-grid"
    >
      <div className={css.container()}>
        {/* Header */}
        {headline && (
          <header className={css.header()}>
            {headline.title && (
              <Heading as="h2" level={2} className={css.title()}>
                {headline.title}
              </Heading>
            )}
            {headline.description && (
              <Paragraph level="large" color="muted">
                {headline.description}
              </Paragraph>
            )}
          </header>
        )}

        {/* Feature Cards Grid */}
        <div className={css.grid()}>
          {Array.isArray(cards) &&
            cards.map((card) => (
              <div key={`${card.id}`} className={css.cardWrapper()}>
                <Card className={css.card()}>
                  <CardHeader>
                    <div className={css.iconWrapper()}>
                      <Icon name={card.icon as IconName} />
                    </div>
                    <h3 className={css.cardTitle()}>{card.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className={css.cardDescription()}>{card.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
        </div>

        {/* Optional Promo Card */}
        {showPromoCard && promoCard?.title && promoCard?.description && (
          <ColorMode className="col-span-full" theme={promoCard.theme}>
            <PromoCard.Root>
              <PromoCard.Content>
                <PromoCard.Text>
                  <p className="text-2xl font-semibold mb-3">
                    {promoCard.title}
                  </p>
                  <p>{promoCard.description}</p>
                </PromoCard.Text>
                {promoCard.link && (
                  <PromoCard.Link {...promoCard.link}>
                    {promoCard.link.label}
                  </PromoCard.Link>
                )}
              </PromoCard.Content>
            </PromoCard.Root>
          </ColorMode>
        )}
      </div>
    </ColorMode>
  );
};
