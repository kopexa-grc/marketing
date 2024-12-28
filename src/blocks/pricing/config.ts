import type { Block } from "payload";

export const Pricing: Block = {
  slug: "pricing",
  interfaceName: "PricingBlock",
  fields: [
    {
      name: "plans",
      type: "array",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "hasPrice",
          type: "checkbox",
        },
        {
          name: "price",
          type: "text",
          admin: {
            condition: (_, { hasPrice }) => Boolean(hasPrice),
          },
          label: "Price per month",
          required: true,
        },
      ],
    },
  ],
};
