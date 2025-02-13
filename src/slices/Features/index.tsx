import { RichText } from "@/components/prismic/rich-text";
import { cn } from "@/lib/utils";
import type { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import type { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Features`.
 */
export type FeaturesProps = SliceComponentProps<
  Content.FeaturesSlice,
  {
    theme?: string;
  }
>;

/**
 * Component for "Features" Slices.
 */
const Features = ({ slice }: FeaturesProps) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      data-theme={slice.primary.theme}
      className="w-full py-12 md:py-20 2xl:py-24 bg-background text-foreground"
    >
      <div className="container">
        <header className="flex flex-col gap-2">
          <RichText field={slice.primary.heading} />
          {slice.primary.subheading && (
            <div className="font-semibold">
              <RichText field={slice.primary.subheading} />
            </div>
          )}
        </header>
        <div className="mt-8 2xl:mt-14 first:mt-0">
          <div className="flex flex-wrap gap-y-4 xl:gap-y-6 -mx-2 xl:-mx-3">
            {slice.primary.features.map((feature, index) => (
              <article
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={`feature-${index}`}
                className="w-full px-2 xl:px-3 md:w-1/2 lg:w-1/4 grow"
              >
                <div className="p-6 rounded-xl h-full flex flex-col md:p-12 justify-between bg-muted">
                  <header>
                    <div className="flex flex-col">
                      {feature.icon && (
                        <PrismicNextImage
                          field={feature.icon}
                          className="size-12 mb-6"
                        />
                      )}
                      <RichText field={feature.heading} />
                    </div>
                    <div className="text-base xl:text-lg font-medium print:text-xs print:text-justify mt-4 max-w-[46em] text-muted-foreground">
                      <RichText field={feature.subheading} />
                    </div>
                  </header>
                  <footer className="flex items-center flex-wrap gap-4 mt-10">
                    <PrismicNextLink
                      field={feature.link}
                      className={cn(
                        "rounded-lg font-bold whitespace-nowrap focus:outline-none",
                        "focus:ring-ring disabled:opacity-50 group underline underline-offset-8",
                        "focus:ring-4 hover:underline-offset-4 py-3 text-sm",
                        "leading-5 xl:text-base xl:leading-5 -mx-2.5 px-2.5"
                      )}
                    />
                  </footer>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
