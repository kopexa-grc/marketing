"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { useMediaQuery } from "@/hooks/use-media-query";
import { createContext } from "@/lib/react/create-context";
import { canUseDom } from "@/lib/react/dom";
import { useCallback, useEffect } from "react";

const STORAGE_KEY = "a11y-preference" as const;

const MotionPreference = {
  FULL: "full-motion",
  REDUCED: "reduced-motion",
  NONE: "no-motion",
} as const;

const ContrastPreference = {
  HIGH: "high",
  NORMAL: "normal",
} as const;

const MediaQueries = {
  REDUCED_MOTION: "(prefers-reduced-motion: reduce)",
  HIGH_CONTRAST: "(prefers-contrast: more)",
} as const;

const DataAttributes = {
  MOTION: "data-motion",
  CONTRAST: "data-contrast",
} as const;

type MotionPreference =
  (typeof MotionPreference)[keyof typeof MotionPreference];
type ContrastPreference =
  (typeof ContrastPreference)[keyof typeof ContrastPreference];

interface A11yPreference {
  motion: MotionPreference;
  contrast: ContrastPreference;
}

type AccessibilityContextType = {
  motionPreference: MotionPreference;
  setMotionPreference: (pref: MotionPreference) => void;
  prefersReducedMotion: boolean;
};

const [Provider, useAccessibilityContext] =
  createContext<AccessibilityContextType>();

const DEFAULT_PREFERENCES: A11yPreference = {
  motion: MotionPreference.FULL,
  contrast: ContrastPreference.NORMAL,
};

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [preferences, setPreferences] = useLocalStorage<A11yPreference>(
    STORAGE_KEY,
    DEFAULT_PREFERENCES,
    { syncTabs: true }
  );

  const prefersReducedMotion = useMediaQuery(MediaQueries.REDUCED_MOTION);
  const prefersHighContrast = useMediaQuery(MediaQueries.HIGH_CONTRAST);

  // Sync with system motion preference changes
  useEffect(() => {
    const shouldUpdate =
      (prefersReducedMotion && preferences.motion !== MotionPreference.NONE) ||
      (!prefersReducedMotion &&
        preferences.motion === MotionPreference.REDUCED);

    if (!shouldUpdate) return;

    setPreferences((prev) => ({
      ...prev,
      motion: prefersReducedMotion
        ? MotionPreference.REDUCED
        : MotionPreference.FULL,
    }));
  }, [prefersReducedMotion, preferences.motion, setPreferences]);

  // Sync with system contrast preference changes
  useEffect(() => {
    const shouldUpdate =
      (prefersHighContrast &&
        preferences.contrast !== ContrastPreference.HIGH) ||
      (!prefersHighContrast &&
        preferences.contrast === ContrastPreference.HIGH);

    if (!shouldUpdate) return;

    setPreferences((prev) => ({
      ...prev,
      contrast: prefersHighContrast
        ? ContrastPreference.HIGH
        : ContrastPreference.NORMAL,
    }));
  }, [prefersHighContrast, preferences.contrast, setPreferences]);

  // Handle manual motion preference changes
  const setMotionPreference = useCallback(
    (motion: MotionPreference) => {
      setPreferences((prev) => ({ ...prev, motion }));
    },
    [setPreferences]
  );

  useEffect(() => {
    if (!canUseDom) return;

    // Add data attributes to the document element for CSS targeting
    document.documentElement.setAttribute(
      DataAttributes.MOTION,
      preferences.motion
    );
    document.documentElement.setAttribute(
      DataAttributes.CONTRAST,
      preferences.contrast
    );
  }, [preferences.motion, preferences.contrast]);

  const value = {
    motionPreference: preferences.motion,
    setMotionPreference,
    prefersReducedMotion,
  };

  return <Provider value={value}>{children}</Provider>;
}

export { useAccessibilityContext };
