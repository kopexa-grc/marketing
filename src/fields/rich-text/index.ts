import type { FeatureProviderServer } from "@payloadcms/richtext-lexical";
import { deepMerge, type RichTextField } from "payload";

type RichText = (
  overrides?: Partial<RichTextField>,
  localized?: boolean,
  additionalFeatures?: FeatureProviderServer[]
) => RichTextField;

export const richText: RichText = (
  overrides = {},
  localized = false
): RichTextField => {
  return deepMerge(
    {
      name: "richText",
      type: "richText",
      required: true,
      localized,
    },
    overrides
  );
};
