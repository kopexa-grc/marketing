import type { FeatureProviderServer } from "@payloadcms/richtext-lexical";
import { deepMerge, type RichTextField } from "payload";

type RichText = (
  overrides?: Partial<RichTextField>,
  additionalFeatures?: FeatureProviderServer[]
) => RichTextField;

export const richText: RichText = (overrides = {}): RichTextField => {
  return deepMerge(
    {
      name: "richText",
      type: "richText",
      required: true,
    },
    overrides
  );
};
