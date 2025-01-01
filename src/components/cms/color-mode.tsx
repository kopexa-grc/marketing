"use client";

import { forwardRef, useEffect, useRef } from "react";
import { Box, type BoxProps } from "../ui/box";
import type { ThemeField } from "@/payload-types";
import { cn } from "@/lib/utils";
import { mergeRefs } from "@/lib/react/merge-refs";
import { useHeaderObserver } from "@/providers/header-observer";

export type ColorModeProps = BoxProps<"div" | "section"> & {
  theme: ThemeField;
};

export const ColorMode = forwardRef<HTMLDivElement, ColorModeProps>(
  (props, ref) => {
    const { children, theme, className, ...restProps } = props;
    const { colorMode } = theme ?? {};

    const { addObservable } = useHeaderObserver();
    const observableRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observableElement = observableRef?.current;
      if (observableElement) {
        addObservable(observableElement, true);
      }
    }, [addObservable]);

    return (
      <Box
        {...restProps}
        className={cn("text-foreground", className)}
        ref={mergeRefs(ref, observableRef)}
        data-theme={colorMode ?? "light"}
      >
        {children}
      </Box>
    );
  }
);

ColorMode.displayName = "ColorMode";
