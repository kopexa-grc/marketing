import type { Page } from "@/payload-types";
import { HeroLeftAligned } from "./hero-left-aligned";

export type HeroBlockProps = {
  page: Page;
};

export const HeroBlock = ({ page }: HeroBlockProps) => {
  const { hero } = page;

  switch (hero.type) {
    case "default": {
      return <HeroLeftAligned {...hero} />;
    }
    default:
      return null;
  }
};
