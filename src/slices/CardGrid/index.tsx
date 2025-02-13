import type { FC } from "react";
import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { RichText } from "@/components/prismic/rich-text";
import { PrismicNextLink } from "@prismicio/next";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Props for `CardGrid`.
 */
export type CardGridProps = SliceComponentProps<Content.CardGridSlice>;

/**
 * Component for "CardGrid" Slices.
 */
const CardGrid: FC<CardGridProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full py-12 md:py-12 xl:py-24"
    >
      <div className="container">
        <header className="flex flex-col">
          <RichText field={slice.primary.heading} />
        </header>
        {slice.primary.cards && slice.primary.cards.length > 0 && (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 xl:mt-14">
            {slice.primary.cards.map((card, index) => (
              <PrismicNextLink
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={`card-${index}`}
                field={card.link}
                className="group relative bg-card rounded-xl border-2 overflow-hidden transition-all duration-300 motion-safe:hover:scale-[1.01] motion-safe:hover:shadow-lg hover:border-primary"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex-1">
                    <RichText field={card.heading} />
                    <RichText field={card.subheading} />
                  </div>
                  <footer className="mt-6 flex justify-end">
                    <div
                      className={cn(
                        "h-10 w-10 rounded-full bg-primary-950 flex items-center justify-center",
                        "transition-all duration-300 ease-out",
                        "group-hover:bg-primary-900 motion-safe:group-hover:-translate-y-1"
                      )}
                    >
                      <ArrowRight className="h-4 w-4 text-background transition-colors duration-300 group-hover:text-primary-foreground motion-safe:group-hover:text-primary-foreground" />
                    </div>
                  </footer>
                </div>
              </PrismicNextLink>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CardGrid;
