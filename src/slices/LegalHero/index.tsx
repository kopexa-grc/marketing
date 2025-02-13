import type { FC } from "react";
import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { headingRecipe } from "@/components/recipes/heading-recipe";

/**
 * Props for `LegalHero`.
 */
export type LegalHeroProps = SliceComponentProps<Content.LegalHeroSlice>;

/**
 * Component for "LegalHero" Slices.
 */
const LegalHero: FC<LegalHeroProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full py-0 container first:pt-20"
    >
      <div className="max-w-4xl mx-auto text-foreground">
        <h1 className={headingRecipe({ level: "h1" })}>
          {slice.primary.heading}
        </h1>
        <div className="text-base lg:text-md xl:text-xl font-medium print:text-sm print:text-justify mt-6 print:mt-2 text-muted-foreground">
          {slice.primary.subheading}
        </div>
      </div>
    </section>
  );
};

export default LegalHero;
