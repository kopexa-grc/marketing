import { richText } from "@/fields/rich-text";
import type { Block } from "payload";

export const Content: Block = {
  slug: "content",
  interfaceName: "ContentBlock",
  fields: [
    {
      name: "layout",
      type: "select",
      defaultValue: "oneColumn",
      enumName: "enum_content_layout",
      options: [
        {
          label: "One Column",
          value: "oneColumn",
        },
        {
          label: "Two Columns",
          value: "twoColumns",
        },
        {
          label: "Three Columns",
          value: "threeColumns",
        },
      ],
    },
    richText({
      name: "columnOne",
    }),
    richText({
      name: "columnTwo",
      admin: {
        condition: (_, siblingData) =>
          [
            "halfAndHalf",
            "threeColumns",
            "twoColumns",
            "twoThirdsOneThird",
          ].includes(siblingData.layout),
      },
    }),
    richText({
      name: "columnThree",
      admin: {
        condition: (_, siblingData) => siblingData.layout === "threeColumns",
      },
    }),
  ],
};
