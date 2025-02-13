import { tv } from "tailwind-variants";

export const headingRecipe = tv({
  base: [
    "font-heading tracking-tight scroll-mt-[120px] wrap-balance",
    "mt-12 mb-6 last:mb-0 first:mt-0",
  ],
  variants: {
    level: {
      h1: "font-bold text-5xl lg:text-6xl xl:text-7xl",
      h2: "tracking-tight text-2xl lg:text-3xl xl:text-4xl font-bold",
      h3: "text-xl/tight xl:text-2xl/tight font-semibold",
      h5: "text-xl/tight xl:text-2xl/tight font-medium",
    },
  },
});
