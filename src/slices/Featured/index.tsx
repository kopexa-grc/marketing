import type { Content } from "@prismicio/client";
import {
  PrismicImage,
  PrismicLink,
  type SliceComponentProps,
} from "@prismicio/react";
import { RichText } from "@/components/prismic/rich-text";
import { buttonVariants } from "@/components/ui/button";

/**
 * Props for `Featured`.
 */
export type FeaturedProps = SliceComponentProps<Content.FeaturedSlice>;

/**
 * Component for "Featured" Slices.
 */
const Featured = ({ slice }: FeaturedProps) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full text-foreground py-12 md:py-20 xl:py-24"
      data-theme="light"
    >
      <div className="container">
        <header className="">
          <RichText field={slice.primary.heading} />
          <div className="text-base lg:text-md xl:text-xl font-medium print:text-[14px] print:text-justify mt-6 max-w-[36em]">
            <RichText field={slice.primary.subheading} />
          </div>
        </header>
        {slice.primary.image && (
          <div className="relative p-px mt-12">
            <div className="absolute inset-0 z-10 pointer-events-none rounded-2xl border-2" />
            <div className="overflow-hidden rounded-2xl">
              <PrismicImage field={slice.primary.image} className="w-full" />
            </div>
          </div>
        )}
        {slice.primary.features && slice.primary.features.length > 0 && (
          <div className="mt-8 xl:mt-14 first:mt-0">
            <ul className="flex flex-wrap gap-y-4 xl:gap-y-6 -mx-2 xl:-mx-3">
              {slice.primary.features.map((feature, index) => (
                <li
                  key={`${feature.heading}-${index}`}
                  className="w-full px-2 xl:px-3 md:w-1/2 lg:w-1/3 grow"
                >
                  <div className="p-6 rounded-xl h-full flex flex-col md:p-12 justify-between bg-primary/5 text-foreground">
                    <div className="flex flex-col">
                      <PrismicImage
                        className="size-12 mb-6 rounded-2xl"
                        field={feature.icon}
                      />
                      <RichText field={feature.heading} />
                    </div>
                    <div className="text-base xl:text-md font-medium print:text-xs print:text-justify mt-4 max-w-[46em]">
                      <RichText field={feature.description} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {slice.primary.links && slice.primary.links.length > 0 && (
          <div className="flex items-center flex-wrap gap-4 mt-6 lg:mt-10 first:mt-0">
            {slice.primary.links.map((link, index) => (
              <PrismicLink
                field={link.link}
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={`${index}`}
                className={buttonVariants({
                  variant: link.link.variant,
                })}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Featured;
