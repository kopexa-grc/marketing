import type { Page } from "@/payload-types";
import { HeroLeftAligned } from "./hero-left-aligned";
import { Hero } from "./hero";

export type HeroBlockProps = {
  page: Page;
};

export const HeroBlock = ({ page }: HeroBlockProps) => {
  const { hero } = page;

  switch (hero.type) {
    case "default": {
      return <HeroLeftAligned {...hero} />;
    }
    case "hero": {
      return <Hero {...hero} />;
    }
    default:
      return null;
  }
};
