import { forwardRef } from "react";
import { Box, type BoxProps } from "../box";

import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

export const paragraphVariants = tv({
  base: "font-normal m-0",
  variants: {
    level: {
      default: "text-base",
      label: "font-semibold md:text-lg",
      small: "text-sm",
      large: "text-lg",
    },
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: {
    level: "default",
    color: "default",
  },
});

type ParagraphProps = BoxProps<"p" | "span"> &
  VariantProps<typeof paragraphVariants>;

export const Paragraph = forwardRef<HTMLHeadingElement, ParagraphProps>(
  (props, ref) => {
    const { as = "p", children, className, level, color, ...restProps } = props;

    return (
      <Box
        as={as}
        ref={ref}
        className={cn(paragraphVariants({ level, color }), className)}
        {...restProps}
      >
        {children}
      </Box>
    );
  }
);

Paragraph.displayName = "Paragraph";
