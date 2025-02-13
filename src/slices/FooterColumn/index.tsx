import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FooterColumn`.
 */
export type FooterColumnProps = SliceComponentProps<Content.FooterColumnSlice>;

/**
 * Component for "FooterColumn" Slices.
 */
const FooterColumn: FC<FooterColumnProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for footer_column (variation: {slice.variation})
      Slices
    </section>
  );
};

export default FooterColumn;
