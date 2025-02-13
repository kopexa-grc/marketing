import { isFilled, type Content } from "@prismicio/client";
import { PrismicLink, type SliceComponentProps } from "@prismicio/react";
import { RichText } from "@/components/prismic/rich-text";
import { buttonVariants } from "@/components/ui/button";
import type {
  CallToActionSliceDefault,
  CallToActionSliceIllustrated,
  CallToActionSliceSlim,
} from "../../../prismicio-types";
import { match } from "ts-pattern";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { cn } from "@/lib/utils";
import { resolveSliceThemeAttr } from "@/data/slice-theme-attr";

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction = ({ slice }: CallToActionProps) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full py-12 md:py-12 xl:py-24"
      data-theme={resolveSliceThemeAttr(slice.primary.theme)}
    >
      {match(slice)
        .with({ variation: "default" }, (slice) => (
          <CallToActionDefault slice={slice} />
        ))
        .with({ variation: "illustrated" }, (slice) => (
          <CallToActionIllustrated slice={slice} />
        ))
        .with({ variation: "slim" }, (slice) => (
          <CallToActionSlim slice={slice} />
        ))
        .exhaustive()}
    </section>
  );
};

export default CallToAction;

const CallToActionSlim = ({ slice }: { slice: CallToActionSliceSlim }) => {
  return (
    <div className="container">
      <div
        className={cn(
          "w-full h-full p-10 lg:p-12 rounded-2xl md:flex md:justify-between md:items-center",
          "bg-primary-50 dark:bg-primary-950 dark:text-primary-50"
        )}
      >
        {isFilled.image(slice.primary.image) && (
          <div className="rounded-2xl mb-6 lg:shrink-0 lg:order-2 lg:mb-0 lg:mr-6 xl:order-1 xl:mr-6 xl:ml-0 xl:h-20 xl:w-20 size-20">
            <PrismicNextImage field={slice.primary.image} />
          </div>
        )}
        <div className="flex flex-col lg:flex-row lg:w-full lg:items-center lg:justify-between lg:order-2 gap-12">
          <div className="max-w-2xl">
            <RichText field={slice.primary.title} />
            {slice.primary.subheading && (
              <RichText field={slice.primary.subheading} />
            )}
          </div>
          {slice.primary.link && (
            <PrismicNextLink
              field={slice.primary.link}
              className={buttonVariants({
                variant: slice.primary.link.variant,
              })}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const CallToActionIllustrated = ({
  slice,
}: {
  slice: CallToActionSliceIllustrated;
}) => {
  return (
    <div className="container">
      <div className="relative px-12 rounded-xl overflow-hidden bg-primary-50  py-12">
        <div className="relative z-10">
          <div className="w-full max-w-xl sm:w-[80%] md:w-1/2">
            <RichText field={slice.primary.title} />
            <div className="flex items-center flex-wrap gap-4 mt-6">
              <PrismicNextLink
                field={slice.primary.link}
                className={cn(
                  "rounded-lg font-bold whitespace-nowrap focus:outline-none",
                  "focus:ring-ring disabled:opacity-50 group underline underline-offset-8",
                  "focus:ring-4 hover:underline-offset-4 py-3 text-sm",
                  "leading-5 xl:text-base xl:leading-5 -mx-2.5 px-2.5"
                )}
              />
            </div>
          </div>
        </div>
        <div
          className={cn(
            "hidden md:block h-[300px] relative -mr-12 ml-12 -mb-12 -mt-24",
            "sm:m-0 sm:h-auto sm:absolute sm:top-0 sm:bottom-0 sm:-right-[10%] sm:left-[60%]",
            "lg:left-[40%]"
          )}
        >
          <PrismicNextImage
            className="object-cover object-left w-full h-full"
            field={slice.primary.image}
          />
        </div>
      </div>
    </div>
  );
};

const CallToActionDefault = ({
  slice,
}: {
  slice: CallToActionSliceDefault;
}) => {
  return (
    <div className="container">
      <div className="relative px-12 rounded-xl bg-primary-50 text-primary-950 py-16 lg:py-20 xl:py-32">
        <div className="relative z-10 grid">
          <RichText field={slice.primary.title} />
          <div className="text-base lg:text-md xl:text-xl font-medium print:text-sm print:text-justify mt-6 max-w-md">
            <RichText field={slice.primary.description} />
          </div>
          <div className="flex items-center flex-wrap gap-4 mt-6 lg:mt-10">
            {slice.primary.links.map((link, index) => (
              <PrismicLink
                // biome-ignore lint/suspicious/noArrayIndexKey: cms
                key={index}
                className={buttonVariants({
                  variant: link.link.variant,
                })}
                field={link.link}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
