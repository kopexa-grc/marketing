import { canUseDom } from "@/lib/react/dom";
import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  // Initialize matches during SSR
  const [matches, setMatches] = useState<boolean>(() => {
    if (!canUseDom) {
      return false;
    }
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (!canUseDom) {
      return;
    }

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    // Add event listener using the most modern API
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handler);
      } else {
        mediaQuery.removeListener(handler);
      }
    };
  }, [query]);

  return matches;
}
