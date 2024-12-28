import { linkGroup } from "@/fields/linkGroup";
import type { Block } from "payload";

export const CallToAction: Block = {
  slug: "cta",
  interfaceName: "CallToActionBlock",
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "description",
      type: "richText",
    },
    linkGroup({
      appearances: false,
      overrides: {
        maxRows: 2,
      },
      additionalFields: [
        {
          name: "description",
          type: "text",
        },
      ],
    }),
  ],
  labels: {
    plural: "Calls to Action",
    singular: "Call to Action",
  },
};
