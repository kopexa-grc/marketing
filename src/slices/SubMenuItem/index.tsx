import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

/**
 * Props for `SubMenuItem`.
 */
export type SubMenuItemProps = SliceComponentProps<Content.SubMenuItemSlice>;

/**
 * Component for "SubMenuItem" Slices.
 */
const SubMenuItem: FC<SubMenuItemProps> = ({ slice }) => {
  switch (slice.variation) {
    case "box": {
      return (
        <PrismicNextLink
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          field={slice.primary.link}
          className={cn(
            "flex justify-between group flex-col px-6 py-3.5 border rounded-lg space-y-1",
            "transition-colors text-foreground border",
            "hover:border-primary hover:bg-primary-50 hover:text-primary-950"
          )}
        >
          <span className="font-bold">{slice.primary.label}</span>
          <span className="font-normal text-sm">
            {slice.primary.description}
          </span>
        </PrismicNextLink>
      );
    }
    default: {
      return (
        <PrismicNextLink
          field={slice.primary.link}
          className="text-foreground font-semibold flex justify-between group leading-6"
        >
          <span className="flex items-center">{slice.primary.label}</span>
          <ArrowRight className="transition-opacity opacity-30 group-hover:opacity-100 size-4" />
        </PrismicNextLink>
      );
    }
  }
};

export default SubMenuItem;
