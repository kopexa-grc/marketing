import { linkGroup } from "@/fields/linkGroup";
import type { Block } from "payload";

export const CallToAction: Block = {
  slug: "cta",
  interfaceName: "CallToActionBlock",
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
    },
    {
      name: "description",
      type: "richText",
      localized: true,
    },
    linkGroup({
      appearances: false,
      localized: true,
      overrides: {
        maxRows: 2,
      },
      additionalFields: [
        {
          name: "description",
          type: "text",
          localized: true,
        },
      ],
    }),
  ],
  labels: {
    plural: "Calls to Action",
    singular: "Call to Action",
  },
};
