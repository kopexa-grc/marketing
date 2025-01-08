import type { Field } from "payload";

export const HeadingField = (): Field => ({
  type: "row",
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      localized: true,
      admin: {
        width: "80%",
      },
    },
    {
      name: "headingTag",
      type: "select",
      defaultValue: "h2",
      required: true,
      enumName: "enum_heading_field_tag",
      options: [
        {
          label: "H1",
          value: "h1",
        },
        {
          label: "H2",
          value: "h2",
        },
        {
          label: "H3",
          value: "h3",
        },
        {
          label: "H4",
          value: "h4",
        },
      ],
      admin: {
        width: "10%",
      },
    },
    {
      name: "headingLevel",
      type: "select",
      defaultValue: "2",
      enumName: "enum_heading_field_level",
      required: true,
      options: [
        {
          label: "Level 1",
          value: "1",
        },
        {
          label: "Level 2",
          value: "2",
        },
        {
          label: "Level 3",
          value: "3",
        },
        {
          label: "Level 4",
          value: "4",
        },
      ],
      admin: {
        width: "10%",
      },
    },
  ],
});
