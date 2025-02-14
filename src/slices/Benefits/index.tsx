import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import type {
  BenefitsSliceImageTextListLeft,
  BenefitsSliceImageTextListRight,
  BenefitsSliceTextIllustration,
} from "../../../prismicio-types";
import { match } from "ts-pattern";
import { RichText } from "@/components/prismic/rich-text";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `Benefits`.
 */
export type BenefitsProps = SliceComponentProps<
  Content.BenefitsSlice,
  {
    theme?: string;
  }
>;

/**
 * Component for "Benefits" Slices.
 */
const Benefits = ({ slice, context }: BenefitsProps) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      data-theme={context.theme}
      className="w-full py-12 md:py-20 2xl:py-24"
    >
      {match(slice)
        .with({ variation: "textIllustration" }, (slice) => (
          <BenefitTextIllustration slice={slice} />
        ))
        .with({ variation: "imageTextListLeft" }, (slice) => (
          <BenefitImageTextListLeft slice={slice} />
        ))
        .with({ variation: "imageTextListRight" }, (slice) => (
          <BenefitImageTextListRight slice={slice} />
        ))
        .exhaustive()}
    </section>
  );
};

export default Benefits;

const BenefitImageTextListRight = ({
  slice,
}: {
  slice: BenefitsSliceImageTextListRight;
}) => {
  return (
    <div className="container flex flex-col md:flex-row gap-6 md:items-stretch">
      <div className="md:w-1/2 order-2 flex flex-col justify-between md:order-first md:pr-14">
        <div>
          <RichText field={slice.primary.heading} />
          <div className="text-base xl:text-lg font-medium print:text-xs print:text-justify mt-6 max-w-lg">
            <RichText field={slice.primary.subheading} />
          </div>
        </div>
      </div>
      <figure className="md:w-1/2">
        <div className="relative p-px">
          {!slice.primary.disable_image_border && (
            <div className="absolute inset-0 z-10 pointer-events-none rounded-2xl border-2" />
          )}
          <div className="overflow-hidden rounded-2xl relative">
            <PrismicNextImage field={slice.primary.image} className="w-full" />
          </div>
        </div>
      </figure>
    </div>
  );
};

const BenefitImageTextListLeft = ({
  slice,
}: {
  slice: BenefitsSliceImageTextListLeft;
}) => {
  return (
    <div className="container flex flex-col md:flex-row gap-6 md:items-stretch">
      <div className="md:w-1/2 order-2 flex flex-col justify-between md:order-last md:pl-14">
        <div>
          <RichText field={slice.primary.heading} />
          <div className="text-base xl:text-lg font-medium print:text-xs print:text-justify mt-6 max-w-lg">
            <RichText field={slice.primary.subheading} />
          </div>
        </div>
      </div>
      <figure className="md:w-1/2">
        <div className="relative p-px">
          {!slice.primary.disable_image_border && (
            <div className="absolute inset-0 z-10 pointer-events-none rounded-2xl border-2" />
          )}
          <div className="overflow-hidden rounded-2xl relative">
            <PrismicNextImage field={slice.primary.image} className="w-full" />
          </div>
        </div>
      </figure>
    </div>
  );
};

const BenefitTextIllustration = ({
  slice,
}: {
  slice: BenefitsSliceTextIllustration;
}) => {
  return (
    <div className="container grid grid-cols-12 gap-x-6">
      <div className="col-span-12 xl:col-span-7 xl:col-start-3">
        <RichText field={slice.primary.heading} />
      </div>
      <div className="grid col-span-full grid-cols-12 mt-8 xl:mt-20">
        <PrismicNextImage
          field={slice.primary.image}
          className="col-span-10 col-start-2 -ml-4 md:col-span-6 md:-ml-16 xl:col-span-4 xl:col-start-3 rounded-2xl"
        />
        <div className="text-base xl:text-lg font-medium print:text-sm print:text-justify mt-8 col-span-12 md:col-span-6 xl:col-span-4 xl:col-start-8">
          <RichText field={slice.primary.second_column} />
        </div>
      </div>
    </div>
  );
};
