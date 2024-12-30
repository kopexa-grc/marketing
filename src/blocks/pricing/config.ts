import type { Block } from "payload";

export const Pricing: Block = {
  slug: "pricing",
  interfaceName: "PricingBlock",
  fields: [
    {
      name: "plans",
      type: "array",
      required: true,
      fields: [
        {
          name: "planName",
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
