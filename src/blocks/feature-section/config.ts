import { HeadingField } from "@/fields/heading";
import { linkGroup } from "@/fields/linkGroup";
import type { Block } from "payload";

export const FeatureSection: Block = {
  slug: "featureSection",
  interfaceName: "featureSectionBlock",
  labels: {
    singular: "Feature Section",
    plural: "Feature Sections",
  },
  fields: [
    {
      name: "variant",
      type: "select",
      defaultValue: "variantOne",
      enumName: "enum_feature_section_variants",
      required: true,
      options: [
        {
          label: "Variant One",
          value: "variantOne",
        },
      ],
    },
    {
      name: "eyebrow",
      type: "text",
      required: false,
      localized: true,
    },
    HeadingField(),
    {
      name: "description",
      type: "richText",
      admin: {
        condition: (_, siblingData) => siblingData?.variant === "variantOne",
      },
    },
    {
      name: "media",
      type: "upload",
      relationTo: "media",
      admin: {
        condition: (_, siblingData) => siblingData?.variant === "variantOne",
      },
    },
    {
      name: "features",
      type: "array",
      fields: [
        {
          name: "headline",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
          localized: true,
        },
        {
          name: "mediaType",
          type: "select",
          defaultValue: "none",
          enumName: "enum_feature_section_feature_mediatype",
          options: [
            {
              label: "None",
              value: "none",
            },
            {
              label: "Icon",
              value: "icon",
            },
            {
              label: "Media",
              value: "media",
            },
          ],
        },
        {
          name: "icon",
          type: "text",
          admin: {
            description: "Enter icon name (e.g., 'CloudUpload', 'Lock')",
            condition: (_, siblingData) => siblingData?.mediaType === "icon",
          },
        },
        {
          name: "media",
          type: "upload",
          relationTo: "media",
          admin: {
            condition: (data, siblingData) =>
              siblingData?.mediaType === "media",
          },
        },
      ],
    },
    linkGroup({
      localized: true,
      overrides: {
        admin: {
          condition: (_, siblingData) => siblingData?.variant === "variantOne",
        },
      },
    }),
  ],
};
