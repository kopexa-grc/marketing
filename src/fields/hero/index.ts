import type { Field } from "payload";
import { linkGroup } from "../linkGroup";

export const hero: Field = {
  name: "hero",
  type: "group",
  fields: [
    {
      name: "type",
      type: "select",
      defaultValue: "default",
      label: "Type",
      enumName: "enum_hero_type",
      options: [
        {
          label: "Default",
          value: "default",
        },
        {
          label: "Hero",
          value: "hero",
        },
      ],
      required: true,
    },
    {
      name: "tagline",
      type: "text",
      admin: {
        condition: (_, { type }) => type === "default" || type === "hero",
      },
    },
    {
      name: "heading",
      type: "text",
    },
    {
      name: "description",
      type: "richText",
    },
    linkGroup(),
    {
      name: "media",
      type: "upload",
      relationTo: "media",
      required: false,
    },
  ],
};