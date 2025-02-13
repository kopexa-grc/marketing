import type { FC } from "react";
import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { RichText } from "@/components/prismic/rich-text";

/**
 * Props for `LegalText`.
 */
export type LegalTextProps = SliceComponentProps<Content.LegalTextSlice>;

/**
 * Component for "LegalText" Slices.
 */
const LegalText: FC<LegalTextProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full py-12"
    >
      <div className="container">
        <div className="max-w-4xl mx-auto text-foreground">
          <div className="text-base xl:text-lg font-normal print:text-xs print:text-justify">
            <RichText field={slice.primary.content} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalText;
