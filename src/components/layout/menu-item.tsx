import { PrismicNextLink } from "@prismicio/next";
import type { MenuItemSliceDefault } from "../../../prismicio-types";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { menuItemRecipe } from "./recipe";
import { cn } from "@/lib/utils";

type MenuItemProps = {
  slice: MenuItemSliceDefault;
};

export const MenuItem = (props: MenuItemProps) => {
  const { slice } = props;

  const css = menuItemRecipe();

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
