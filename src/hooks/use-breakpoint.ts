import { cssVariables } from "@/css-variables";
import { useMediaQuery } from "./use-media-query";

type ScreenKeys = keyof typeof cssVariables.screens;

/**
 * Hook to check if the current viewport matches a breakpoint
 * @param breakpoint - The breakpoint key from cssVariables.screens
 * @param mode - Whether to match "up" (min-width) or "down" (max-width)
 */
export function useBreakpoint(
  breakpoint: ScreenKeys,
  mode: "up" | "down" = "up"
): boolean {
  const width = cssVariables.screens[breakpoint];
  const query =
    mode === "up" ? `(min-width: ${width}px)` : `(max-width: ${width - 0.1}px)`;

  return useMediaQuery(query);
}
