import { ChevronDown } from "lucide-react";
import type { MenuItemSliceWithSubMenu } from "../../../prismicio-types";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";
import { type MenuItemRecipe, menuItemRecipe } from "./recipe";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";

type MenuItemWithSubMenuProps = {
  slice: MenuItemSliceWithSubMenu;
} & MenuItemRecipe;

export const MenuItemWithSubMenu = (props: MenuItemWithSubMenuProps) => {
  const { slice, variant } = props;

  const css = menuItemRecipe({ variant });

  return (
    <NavigationMenu.Item>
      <NavigationMenu.Trigger className={cn(css.root(), "group py-8")}>
        {slice.primary.label}

        <ChevronDown
          className="relative ml-1 size-4 transition duration-300 group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </NavigationMenu.Trigger>
      <NavigationMenu.Content className="absolute left-0 top-0 w-screen bg-background">
        <div className="container px-8 flex">
          <div className="flex flex-col lg:w-[26.6666666667%] lg:py-12 gap-3 my-6 lg:my-0">
            <SliceZone
              // @ts-expect-error prismic typing
              slices={slice.primary.subMenu.data?.slices}
              components={components}
            />
          </div>
          <div className="w-[10%] shrink-0 justify-center hidden lg:flex">
            <div className="h-full w-px bg-border" />
          </div>
          <div className="flex flex-col lg:w-[26.6666666667%] lg:py-12 gap-3 my-6 lg:my-0">
            <SliceZone
              // @ts-expect-error prismic typing
              slices={slice.primary.subMenu.data?.slices1}
              components={components}
            />
          </div>
        </div>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
};
