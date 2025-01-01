import type { Field } from "payload";
import { linkGroup } from "../linkGroup";
import { themeField } from "../theme";

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
    themeField(),
    {
      name: "layout",
      type: "select",
      label: "Layout",
      enumName: "enum_hero_layout",
      options: [
        {
          label: "Centered",
          value: "centered",
        },
        {
          label: "Start (left)",
          value: "start",
        },
      ],
      admin: {
        condition: (_, { type }) => type === "hero",
      },
    },
    {
      name: "tagline",
      type: "text",
      localized: true,
      admin: {
        condition: (_, { type }) => type === "default" || type === "hero",
      },
    },
    {
      name: "heading",
      type: "text",
      localized: true,
    },
    {
      name: "description",
      type: "richText",
      localized: true,
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
