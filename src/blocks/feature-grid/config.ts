import { link } from "@/fields/link";
import { themeField } from "@/fields/theme";
import type { Block } from "payload";

export const FeatureGrid: Block = {
  slug: "featureGrid",
  interfaceName: "FeatureGridBlock",
  labels: {
    singular: "Feature Grid",
    plural: "Feature Grids",
  },
  fields: [
    themeField(),
    {
      name: "layout",
      type: "select",
      defaultValue: "grid",
      options: [
        { label: "Grid", value: "grid" },
        { label: "List", value: "list" },
        { label: "Masonry", value: "masonry" },
      ],
    },
    {
      name: "headline",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          label: "Title",
          localized: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
          label: "Description",
          localized: true,
        },
        {
          name: "alignment",
          type: "select",
          defaultValue: "center",
          options: [
            { label: "Center", value: "center" },
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
          ],
        },
      ],
    },
    {
      name: "cards",
      type: "array",
      label: "Feature Cards",
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: "icon",
          type: "text",
          required: true,
          label: "Icon Name",
          admin: {
            description: "Name of the Lucide icon to use",
          },
        },
        {
          name: "title",
          type: "text",
          required: true,
          label: "Title",
          localized: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
          label: "Description",
          localized: true,
        },
      ],
    },
    {
      name: "showPromoCard",
      type: "checkbox",
      label: "Show Promo Card",
      defaultValue: false,
    },
    {
      name: "promoCard",
      type: "group",
      label: "Promo Card",
      admin: {
        description: "Optional promotional card at the bottom",
        condition: (_, siblingData) => siblingData?.showPromoCard,
      },
      fields: [
        themeField(),
        {
          name: "title",
          type: "text",
          localized: true,
        },
        {
          name: "description",
          type: "textarea",
          localized: true,
        },
        {
          name: "label",
          type: "text",
          localized: true,
        },
        link({
          appearances: false,
          disableLabel: true,
        }),
      ],
    },
  ],
};
