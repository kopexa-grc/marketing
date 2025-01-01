"use client";

import { useWindowInfo } from "@faceless-ui/window-info";
import { createContext } from "@/lib/react/create-context";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export type Theme = "light" | "dark";

type HeaderObserverContextValue = {
  theme: Theme | null;
  addObservable: (el: HTMLElement, isAttached: boolean) => void;
};

const [Provider, useHeaderObserver] = createContext<HeaderObserverContextValue>(
  {
    defaultValue: {
      theme: null,
      addObservable: () => {},
    },
  }
);

export { useHeaderObserver };

export type HeaderObserverProps = {
  children?: React.ReactNode;
};

export const HeaderObverser = ({ children }: HeaderObserverProps) => {
  const pathname = usePathname();
  const { height: windowHeight, width: windowWidth } = useWindowInfo();

  const [theme, setTheme] = useState<Theme | null>("light");
  const [observer, setObserver] = useState<IntersectionObserver | undefined>(
    undefined
  );
  const [tick, setTick] = useState<number | undefined>(undefined);

  const addObservable = useCallback(
    (el: HTMLElement) => {
      if (observer) {
        observer.observe(el);
      }
    },
    [observer]
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    let observerRef: IntersectionObserver | undefined;

    const cssHeaderHeight = Number.parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--header-height"
      ),
      10
    );

    let tickTimeout: NodeJS.Timeout | undefined;
    if (!cssHeaderHeight) {
      // workaround for styles not always being loaded in time (oddity with NextJS App folder)
      tickTimeout = setTimeout(() => {
        setTick(tick === undefined ? 1 : tick + 1);
      }, 50);

      // early return to prevent the observer from being set up incorrectly
      return;
    }

    if (windowHeight) {
      const halfHeaderHeight = windowHeight - Math.ceil(cssHeaderHeight / 2);

      observerRef = new IntersectionObserver(
        (entries) => {
          const intersectingElement = entries.find(
            (entry) => entry.isIntersecting
          );

          if (intersectingElement) {
            setTheme(
              intersectingElement.target.getAttribute("data-theme") as Theme
            );
          }
        },
        {
          // intersection area is top of the screen from 0px to 50% of the header height
          // when the sticky element which is offset from the top by 50% of the header height
          // is intersecting the intersection area
          rootMargin: `0px 0px -${halfHeaderHeight}px 0px`,
          threshold: 0,
        }
      );

      setObserver(observerRef);
    }

    return () => {
      if (tickTimeout) {
        clearTimeout(tickTimeout);
      }
      if (observerRef) {
        observerRef.disconnect();
      }
    };
  }, [windowWidth, windowHeight, theme, tick]);

  // reset on route change
  // biome-ignore lint/correctness/useExhaustiveDependencies: should reset on route change
  useEffect(() => {
    setTheme("light");
  }, [pathname]);

  const ctx = useMemo(
    () => ({
      theme,
      addObservable,
    }),
    [theme, addObservable]
  );

  return <Provider value={ctx}>{children}</Provider>;
};
