import { tv } from "tailwind-variants";

export const menuItemRecipe = tv({
  slots: {
    root: [
      "text-start",
      "transition-colors duration-100 text-foreground/80",
      "hover:text-foreground",
      "font-semibold text-sm",
      "flex items-center w-full underline-offset-8 focus:outline-none focus:underline",
    ],
  },
});
