import type { Block } from "payload";

export const Metrics: Block = {
  slug: "metrics",
  interfaceName: "MetricsBlock",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "richText",
    },
    {
      type: "array",
      name: "metrics",
      fields: [
        {
          type: "text",
          name: "label",
        },
        {
          type: "text",
          name: "value",
        },
      ],
    },
  ],
};
