import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `MenuItem`.
 */
export type MenuItemProps = SliceComponentProps<Content.MenuItemSlice>;

/**
 * Component for "MenuItem" Slices.
 */
const MenuItem: FC<MenuItemProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for menu_item (variation: {slice.variation}) Slices
    </section>
  );
};

export default MenuItem;
