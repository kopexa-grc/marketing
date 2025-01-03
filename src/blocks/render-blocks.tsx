import type { Page } from "@/payload-types";
import { CallToActionBlock } from "./call-to-action/call-to-action-block";
import { PromoCardBlock } from "./promo-card/promo-card-block";
import { TextWithImageBlock } from "./text-with-image/text-with-image-block";
import { DividerBlock } from "./divider/divider-block";
import { MetricsBlock } from "./metrics/metrics-block";
import { ContentBlock } from "./content/content-block";
import { CardGridBlock } from "./card-grid/card-grid-block";
import { FeatureGridBlock } from "./feature-grid/feature-grid-block";
import { SolutionShowcaseBlock } from "./solution-showcase/solution-showcase-block";
import { ServiceCardsBlock } from "./service-cards/service-cards-block";
import { FormBlock } from "./form/form-block";
import { FAQBlock } from "./faq/faq-block";

type Block = Page["layout"][0];

export type RenderBlocksProps = {
  blocks: Block[];
};

export const RenderBlocks = ({ blocks }: RenderBlocksProps) => {
  const content = (block: Block) => {
    const { blockType } = block;

    switch (blockType) {
      case "cta": {
        return <CallToActionBlock key={`${block.id}`} {...block} />;
      }
      case "promo-card": {
        return <PromoCardBlock key={`${block.id}`} {...block} />;
      }
      case "text-with-image": {
        return <TextWithImageBlock key={`${block.id}`} {...block} />;
      }
      case "divider": {
        return <DividerBlock key={`${block.id}`} {...block} />;
      }
      case "metrics": {
        return <MetricsBlock key={`${block.id}`} {...block} />;
      }
      case "content": {
        return <ContentBlock key={`${block.id}`} {...block} />;
      }
      case "cardGrid": {
        return <CardGridBlock key={`${block.id}`} {...block} />;
      }
      case "featureGrid": {
        return <FeatureGridBlock key={`${block.id}`} {...block} />;
      }
      case "solutionShowcase": {
        return <SolutionShowcaseBlock key={`${block.id}`} {...block} />;
      }
      case "serviceCards": {
        return <ServiceCardsBlock key={`${block.id}`} {...block} />;
      }
      case "form": {
        return <FormBlock key={`${block.id}`} {...block} />;
      }
      case "faq-section": {
        return <FAQBlock key={`${block.id}`} {...block} />;
      }
      default: {
        return null;
      }
    }
  };

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (!hasBlocks) return null;

  return <>{blocks.map((block) => content(block))}</>;
};
