import { tv, type VariantProps } from "tailwind-variants";

export const menuItemRecipe = tv({
  slots: {
    root: [
      "text-start",
      "transition-colors duration-100 ",
      "font-semibold text-sm",
      "flex items-center w-full underline-offset-8 focus:outline-none focus:underline",
    ],
  },
  variants: {
    variant: {
      default: {
        root: "text-foreground/80 hover:text-foreground",
      },
      brand: {
        root: "text-white/80 hover:text-white",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type MenuItemRecipe = VariantProps<typeof menuItemRecipe>;
