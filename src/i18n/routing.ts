import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const Locales = ["en-us", "de-de"] as const;
export type TLocale = "en-us" | "de-de";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: Locales,

  // Used when no locale matches
  defaultLocale: "en-us",
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
