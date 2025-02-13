import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { RichText } from "@/components/prismic/rich-text";

/**
 * Props for `TextContent`.
 */
export type TextContentProps = SliceComponentProps<Content.TextContentSlice>;

/**
 * Component for "TextContent" Slices.
 */
const TextContent = ({ slice }: TextContentProps) => {
  return (
    <div
      className="my-12 first:mt-0 last:mb-0"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <RichText field={slice.primary.content} />
    </div>
  );
};

export default TextContent;
