import { themeField } from "@/fields/theme";
import type { Block } from "payload";

export const SolutionShowcase: Block = {
  slug: "solutionShowcase",
  interfaceName: "SolutionShowcaseBlock",
  labels: {
    singular: "Solution Showcase",
    plural: "Solution Showcases",
  },
  fields: [
    themeField(),
    {
      name: "heading",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
        },
        {
          name: "alignment",
          type: "select",
          defaultValue: "center",
          options: [
            { label: "Center", value: "center" },
            { label: "Left", value: "left" },
          ],
        },
      ],
    },
    {
      name: "solutions",
      type: "array",
      required: true,
      minRows: 1,
      admin: {
        description: "Add solutions or use cases to display",
      },
      fields: [
        themeField(),
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },

        {
          name: "media",
          type: "group",
          fields: [
            {
              name: "mediaType",
              type: "radio",
              defaultValue: "image",
              enumName: "enum_solutionshowcase_media_type",
              options: [
                {
                  label: "Image",
                  value: "image",
                },
                {
                  label: "Icon",
                  value: "icon",
                },
              ],
            },
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              required: true,
              admin: {
                condition: (_, { mediaType } = {}) => {
                  return mediaType === "image";
                },
              },
              filterOptions: {
                mimeType: { contains: "image" },
              },
            },
            {
              name: "icon",
              type: "text",
              required: true,
              label: "Icon Name",
              admin: {
                condition: (_, { mediaType } = {}) => mediaType === "icon",
                description: "Name of the Lucide icon to use",
              },
            },
          ],
        },
      ],
    },
  ],
};
