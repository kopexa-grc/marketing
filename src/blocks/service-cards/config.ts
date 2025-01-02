import { link } from "@/fields/link";
import type { Block } from "payload";

export const ServiceCards: Block = {
  slug: "serviceCards",
  interfaceName: "ServiceCardsBlock",
  labels: {
    singular: "Service Cards",
    plural: "Service Cards",
  },
  fields: [
    {
      type: "group",
      name: "heading",
      fields: [
        {
          type: "text",
          name: "tagline",
          label: "Tagline",
          required: false,
        },
        {
          type: "text",
          name: "heading",
          label: "Heading",
          required: false,
        },
      ],
    },
    {
      type: "array",
      name: "cards",
      label: "Cards",
      minRows: 1,
      fields: [
        {
          type: "text",
          name: "tag",
          label: "Tag",
          required: false,
        },
        {
          type: "text",
          name: "heading",
          label: "Heading",
          required: false,
        },
        {
          type: "richText",
          name: "description",
          label: "Description",
          required: true,
        },
        {
          type: "checkbox",
          name: "enableLink",
          label: "Enable Link",
          defaultValue: false,
        },
        {
          type: "group",
          name: "link",
          label: "Card Link",
          admin: {
            condition: (_, siblingData) => siblingData.enableLink,
          },
          fields: [
            link({
              appearances: false,
              disableLabel: true,
            }),
          ],
        },
      ],
    },
  ],
};
