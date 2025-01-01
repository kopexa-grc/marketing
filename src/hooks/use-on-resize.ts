"use client";

import { canUseDom } from "@/lib/react/dom";
import { useCallback, useState } from "react";
import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect";

interface UseOnResizeOptions {
  // Optional debounce in milliseconds
  debounceMs?: number;
}

export const useOnResize = (
  callback: (width: number, height: number) => void,
  options: UseOnResizeOptions = {}
) => {
  // Initial state is undefined for SSR compatibility
  const [dimensions, setDimensions] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  // Debounced resize handler
  const handleResize = useCallback(() => {
    if (canUseDom) {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setDimensions({ width, height });
      callback(width, height);
    }
  }, [callback]);

  useIsomorphicLayoutEffect(() => {
    if (!canUseDom) return;

    // Create debounced version if needed
    const debouncedHandler = options.debounceMs
      ? debounce(handleResize, options.debounceMs)
      : handleResize;

    handleResize();

    window.addEventListener("resize", debouncedHandler);

    return () => {
      window.removeEventListener("resize", debouncedHandler);
    };
  }, [handleResize, options.debounceMs]);

  return dimensions;
};

function debounce(func: (...args: unknown[]) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: unknown[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
