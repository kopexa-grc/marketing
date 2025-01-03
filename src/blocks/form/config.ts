import type { Block } from "payload";

export const Form: Block = {
  slug: "form",
  interfaceName: "FormBlock",
  graphQL: {
    singularName: "FormBlock",
  },
  labels: {
    plural: "Form Blocks",
    singular: "Form Block",
  },
  fields: [
    {
      name: "form",
      type: "relationship",
      relationTo: "forms",
      required: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "heading",
          type: "text",
          admin: {
            width: "70%",
          },
        },
        {
          name: "headingTag",
          type: "select",
          defaultValue: "h2",
          options: [
            { label: "H1", value: "h1" },
            { label: "H2", value: "h2" },
            { label: "H3", value: "h3" },
            { label: "H4", value: "h4" },
          ],
          admin: {
            width: "30%",
          },
        },
      ],
    },
    {
      type: "richText",
      name: "description",
    },
    {
      name: "contentLayout",
      type: "select",
      defaultValue: "none",
      enumName: "enum_form_block_content_layout",
      options: [
        { label: "None", value: "none" },
        { label: "Content Left", value: "left" },
        { label: "Content Right", value: "right" },
      ],
    },
  ],
};
