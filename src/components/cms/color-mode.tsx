import { forwardRef } from "react";
import { Box, type BoxProps } from "../ui/box";
import type { ThemeField } from "@/payload-types";
import { cn } from "@/lib/utils";

export type ColorModeProps = BoxProps<"div" | "section"> & {
  theme: ThemeField;
};

export const ColorMode = forwardRef<HTMLDivElement, ColorModeProps>(
  (props, ref) => {
    const { children, theme, className, ...restProps } = props;
    const { colorMode } = theme ?? {};

    return (
      <Box
        {...restProps}
        className={cn("text-foreground", className)}
        ref={ref}
        data-theme={colorMode ?? "light"}
      >
        {children}
      </Box>
    );
  }
);

ColorMode.displayName = "ColorMode";
