import type { FC } from "react";
import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Heading`.
 */
export type HeadingProps = SliceComponentProps<Content.HeadingSlice>;

/**
 * Component for "Heading" Slices.
 */
const Heading: FC<HeadingProps> = ({ slice }) => {
  return (
    <span
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="text-foreground font-sans tracking-tight text-lg font-semibold mb-3 mt-9 first:m-0"
    >
      {slice.primary.label}
    </span>
  );
};

export default Heading;
