import { forwardRef } from "react";
import { Box, type BoxProps } from "../box";

import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

export const headingVariants = tv({
  base: "font-semibold m-0 text-foreground",
  variants: {
    level: {
      1: "text-4xl md:text-5xl lg:text-7xl",
      2: "text-3xl md:text-4xl lg:text-5xl",
      3: "text-2xl md:text-3xl",
      4: "text-xl md:text-2xl",
      5: "text-lg md:text-xl",
      6: "text-base md:text-lg",
    },
  },
  defaultVariants: {
    level: 1,
  },
});

type HeadingProps = BoxProps<"h1" | "h2" | "h3" | "h4" | "h5" | "p"> &
  VariantProps<typeof headingVariants>;

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => {
    const { as = "h2", children, className, level, ...restProps } = props;

    return (
      <Box
        as={as}
        ref={ref}
        className={cn(headingVariants({ level }), className)}
        {...restProps}
      >
        {children}
      </Box>
    );
  }
);

Heading.displayName = "Heading";
