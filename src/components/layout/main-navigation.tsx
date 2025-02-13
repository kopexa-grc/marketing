"use client";

import { tv, type VariantProps } from "tailwind-variants";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import type { LayoutDocument } from "../../../prismicio-types";
import { MenuItemWithSubMenu } from "./menu-item-with-submenu";
import { MenuItem } from "./menu-item";
import { usePathname } from "next/navigation";
import { PrismicNextLink } from "@prismicio/next";
import { buttonVariants } from "../ui/button";

const mainNavigationSlotRecipe = tv({
  slots: {
    root: "text-sm xl:text-base grow items-center space-x-8 h-full hidden lg:flex",
    ctaContainer: [
      "container lg:mx-0 lg:w-auto lg:max-w-none",
      "justify-end order-1 lg:order-2",
      "flex flex-col sm:flex-row sm:items-center sm:gap-x-4 p-6 lg:p-0",
      "relative z-10",
    ],
    navContainer: "grow order-2 lg:order-1",
    viewportContainer: "absolute left-0 top-full flex justify-center border-t",
    viewport: [
      "border-b origin-top relative transition-all",
      "h-[var(--radix-navigation-menu-viewport-height)] w-screen overflow-hidden",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90",
    ],
  },
  variants: {
    variant: {
      default: {
        root: "bg-transparent",
        ctaContainer: "bg-transparent",
        viewport: "bg-background",
      },
      brand: {},
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type MainNavigationSlotRecipe = VariantProps<
  typeof mainNavigationSlotRecipe
>;

type MainNavigationProps = {
  layout: LayoutDocument;
} & MainNavigationSlotRecipe;

export const MainNavigation = (props: MainNavigationProps) => {
  const { layout, variant } = props;

  const pathname = usePathname();
  const css = mainNavigationSlotRecipe({ variant });

  return (
    <nav aria-label="Main Navigation" className={css.root()}>
      <div className={css.navContainer()}>
        <NavigationMenu.Root aria-label="Desktop" key={pathname}>
          <NavigationMenu.List asChild>
            <ul className="group flex gap-x-4 items-center justify-start relative z-10">
              {layout.data.slices.map((item) => {
                if (item.variation === "default") {
                  return (
                    <MenuItem key={item.id} slice={item} variant={variant} />
                  );
                }

                return (
                  <MenuItemWithSubMenu
                    key={item.id}
                    variant={variant}
                    slice={item}
                  />
                );
              })}
            </ul>
          </NavigationMenu.List>
          <div className={css.viewportContainer()}>
            <NavigationMenu.Viewport className={css.viewport()} />
          </div>
        </NavigationMenu.Root>
      </div>
      <div
        className={css.ctaContainer()}
        data-theme={variant === "brand" ? "dark" : "light"}
      >
        {layout.data.cta && (
          <PrismicNextLink
            field={layout.data.cta}
            className={buttonVariants({ variant: "outline" })}
          />
        )}
      </div>
    </nav>
  );
};
