import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { RichText } from "@/components/prismic/rich-text";
import { cn } from "@/lib/utils";
import { tv } from "tailwind-variants";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { buttonVariants } from "@/components/ui/button";
import type {
  HeroSliceCentered,
  HeroSliceCenteredBackground,
  HeroSliceDefault,
} from "../../../prismicio-types";
import { match } from "ts-pattern";

const heroSlotRecipe = tv({
  slots: {
    root: "w-full py-12 md:py-20 xl:py-24",
    container: "",
    eyebrow: "block font-bold text-base md:text-md text-primary-950 mb-4",
    ctaContainer: "flex items-center flex-wrap gap-4 mt-6 lg:mt-8",
  },
  variants: {
    variant: {
      default: {
        root: "",
        container: "container grid-wrapper",
      },
      centeredBackground: {
        root: "relative overflow-hidden",
        container:
          "container items-center relative z-10 md:py-[5vh] xl:py-[9vh]",
      },
      centered: {
        container: "container",
      },
    },
  },
});

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps) => {
  const recipe = heroSlotRecipe({
    variant: slice.variation,
  });

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={recipe.root()}
    >
      {match(slice)
        .with({ variation: "default" }, (slice) => (
          <HeroDefault slice={slice} />
        ))
        .with({ variation: "centeredBackground" }, (slice) => (
          <HeroCenteredBackground slice={slice} />
        ))
        .with({ variation: "centered" }, (slice) => (
          <HeroCentered slice={slice} />
        ))
        .exhaustive()}
    </section>
  );
};

export default Hero;

const HeroCentered = ({ slice }: { slice: HeroSliceCentered }) => {
  const recipe = heroSlotRecipe({
    variant: slice.variation,
  });

  return (
    <>
      <div className={recipe.container()}>
        <div className="mx-auto text-center flex flex-col items-center relative z-10 max-w-4xl">
          <div className="max-w-4xl">
            {slice.primary.eyebrow && (
              <div className="text-primary-950 text-base/7 font-semibold">
                {slice.primary.eyebrow}
              </div>
            )}
            <RichText field={slice.primary.heading} />
          </div>
          <div className="max-w-3xl text-base lg:text-lg xl:text-xl font-medium print:text-sm print:text-justify mt-4 lg:mt-6">
            <RichText field={slice.primary.subheading} />
          </div>
          <div className="flex items-center flex-wrap gap-4 mt-6 lg:mt-10">
            {slice.primary.calltoactions.map((cta, index) => (
              <PrismicNextLink
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                field={cta.link}
                className={buttonVariants({
                  variant: cta.link.variant,
                })}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const HeroCenteredBackground = ({
  slice,
}: {
  slice: HeroSliceCenteredBackground;
}) => {
  const recipe = heroSlotRecipe({
    variant: slice.variation,
  });

  return (
    <>
      <div className={recipe.container()}>
        <div className="mx-auto text-center flex flex-col items-center relative z-10 max-w-4xl">
          {slice.primary.eyebrow && (
            <span className={recipe.eyebrow()}>{slice.primary.eyebrow}</span>
          )}
          <RichText field={slice.primary.heading} />
          <div
            className={cn(
              "text-base lg:text-md xl:text-xl",
              "font-medium print:text-sm print:text-justify mt-4 lg:mt-6 max-w-lg"
            )}
          >
            <RichText field={slice.primary.subheading} />
          </div>
          <div className={recipe.ctaContainer()}>
            {slice.primary.calltoactions.map((cta, index) => (
              <PrismicNextLink
                field={cta.link}
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={`cta-${index}`}
                className={buttonVariants({
                  variant: cta.link.variant,
                })}
              />
            ))}
          </div>
        </div>
      </div>
      {slice.variation === "centeredBackground" && slice.primary.image && (
        <PrismicNextImage
          field={slice.primary.image}
          className={cn(
            "max-w-[calc(100vw_-_2*3.2rem)] mx-[3.2rem] overflow-hidden rounded-2xl",
            "absolute inset-0 h-full w-full object-cover",
            "hidden sm:block "
          )}
        />
      )}
    </>
  );
};

const HeroDefault = ({ slice }: { slice: HeroSliceDefault }) => {
  const recipe = heroSlotRecipe({
    variant: slice.variation,
  });

  return (
    <div className={recipe.container()}>
      <div className="col-span-6 md:grid md:grid-cols-6 relative z-10">
        <div className="md:col-span-6 md:pr-4 flex flex-col">
          <div className="flex flex-col">
            <RichText field={slice.primary.heading} />
            <div
              className={cn(
                "text-base lg:text-md xl:text-xl",
                "font-medium print:text-sm print:text-justify mt-4 lg:mt-6 max-w-lg"
              )}
            >
              <RichText field={slice.primary.subheading} />
            </div>
            <div className={recipe.ctaContainer()}>
              {slice.primary.calltoactions.map((cta, index) => (
                <PrismicNextLink
                  field={cta.link}
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={`cta-${index}`}
                  className={buttonVariants({
                    variant: cta.link.variant,
                  })}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-6 mt-6 sm:mt-0">
        <div className="relative p-px">
          <div className="absolute inset-0 z-10 pointer-events-none rounded-2xl border-2" />
          <div className="overflow-hidden rounded-2xl aspect-[4/3] relative">
            <PrismicNextImage
              className="w-full h-full absolute inset-0 object-cover"
              field={slice.primary.image}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
