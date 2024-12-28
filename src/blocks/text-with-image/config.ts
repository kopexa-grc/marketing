import type { Block } from "payload";

export const TextWithImage: Block = {
  slug: "text-with-image",
  interfaceName: "TextWithImageBlock",
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
      name: "media",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
};
