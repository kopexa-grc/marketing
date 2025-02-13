"use client";

import { cn } from "@/lib/utils";
import { tv, type VariantProps } from "tailwind-variants";
import { Logo } from "../ui/logo";
import { MainNavigation } from "./main-navigation";
import type { LayoutDocument } from "../../../prismicio-types";
import { PrismicLink } from "@prismicio/react";
import { MobileNavigation } from "./mobile-navigation";
import { useResizeObserver } from "usehooks-ts";
import { useRef } from "react";

const siteHeaderSlotRecipe = tv({
  slots: {
    root: "top-0 z-40 py-6 lg:py-0 print:hidden sticky transition-colors duration-100",
    border: "z-20 w-full absolute bottom-0 left-0",
    container: "container flex items-center justify-between",
  },
  variants: {
    variant: {
      brand: {
        root: "bg-primary-950 text-primary-50",
      },
      default: {
        root: "bg-background text-foreground",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type SiteHeaderSlotRecipe = VariantProps<typeof siteHeaderSlotRecipe>;

type SiteHeaderProps = {
  layout: LayoutDocument;
} & SiteHeaderSlotRecipe;

export const SiteHeader = (props: SiteHeaderProps) => {
  const { layout, variant } = props;

  const headerRef = useRef<HTMLDivElement>(null);

  const { height = 0 } = useResizeObserver<HTMLDivElement>({
    // @ts-expect-error yay typing!
    ref: headerRef,
    box: "border-box",
  });
  const css = siteHeaderSlotRecipe({ variant });

  return (
    <div className={cn(css.root())} ref={headerRef}>
      <span className={css.border()} />
      <div className={css.container()}>
        <div className="relative flex items-center z-10 bg-transparent self-stretch lg:pr-8">
          <PrismicLink href={`/${layout.lang}`} className="lg:py-6">
            <Logo />
          </PrismicLink>
        </div>
        <MainNavigation layout={layout} variant={variant} />
        <MobileNavigation layout={layout} offset={height} />
      </div>
    </div>
  );
};
