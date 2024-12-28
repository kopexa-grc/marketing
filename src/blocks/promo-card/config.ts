import { iconField } from "@/fields/icon";
import { link } from "@/fields/link";
import type { Block } from "payload";

export const PromoCardBlock: Block = {
  slug: "promo-card",
  interfaceName: "PromoCardBlock",
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
    },
    link(),
    {
      type: "row",
      fields: [
        {
          name: "dark",
          type: "checkbox",
          label: "Is dark?",
          admin: {
            style: {
              alignSelf: "flex-end",
            },
            width: "50%",
          },
        },
        iconField({
          overrides: {
            admin: {
              width: "50%",
            },
          },
        }),
      ],
    },
  ],
};
