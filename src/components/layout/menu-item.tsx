import { PrismicNextLink } from "@prismicio/next";
import type { MenuItemSliceDefault } from "../../../prismicio-types";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { type MenuItemRecipe, menuItemRecipe } from "./recipe";
import { cn } from "@/lib/utils";

type MenuItemProps = {
  slice: MenuItemSliceDefault;
} & MenuItemRecipe;

export const MenuItem = (props: MenuItemProps) => {
  const { slice, variant } = props;

  const css = menuItemRecipe({ variant });

  return (
    <NavigationMenu.Item>
      <NavigationMenu.Link asChild>
        <PrismicNextLink
          className={cn(css.root(), "w-full underline-offset-8")}
          field={slice.primary.link}
        />
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
};
