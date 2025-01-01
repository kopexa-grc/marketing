import { link } from "@/fields/link";
import type { Block } from "payload";

export const CardGrid: Block = {
  slug: "cardGrid",
  interfaceName: "CardGridBlock",
  fields: [
    {
      name: "heading",
      type: "text",
      label: "Heading",
      localized: true,
    },
    {
      name: "description",
      type: "text",
      label: "Description",
      localized: true,
    },
    {
      name: "layout",
      type: "select",
      defaultValue: "grid",
      enumName: "enum_card_grid_layout",
      options: [
        {
          label: "Grid",
          value: "grid",
        },
        {
          label: "List",
          value: "list",
        },
        {
          label: "Masonry",
          value: "masonry",
        },
      ],
    },
    {
      name: "cards",
      type: "array",
      label: "Cards",
      minRows: 1,
      maxRows: 12,
      labels: {
        singular: "Card",
        plural: "Cards",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "subtitle",
          type: "text",
          localized: true,
        },
        {
          name: "description",
          type: "textarea",
          localized: true,
        },
        {
          name: "media",
          type: "upload",
          relationTo: "media",
          required: false,
        },
        link({ localized: true }),
        {
          name: "appearance",
          type: "group",
          fields: [
            {
              name: "theme",
              type: "select",
              defaultValue: "default",
              options: [
                {
                  label: "Default",
                  value: "default",
                },
                {
                  label: "Primary",
                  value: "primary",
                },
                {
                  label: "Secondary",
                  value: "secondary",
                },
              ],
            },
            {
              name: "enableHover",
              type: "checkbox",
              label: "Enable Hover Effects",
              defaultValue: true,
            },
            {
              name: "aspectRatio",
              type: "select",
              defaultValue: "16/9",
              options: [
                {
                  label: "16:9",
                  value: "16/9",
                },
                {
                  label: "4:3",
                  value: "4/3",
                },
                {
                  label: "1:1",
                  value: "1/1",
                },
                {
                  label: "Auto",
                  value: "auto",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "settings",
      type: "group",
      fields: [
        {
          name: "columns",
          type: "select",
          defaultValue: "3",
          options: [
            {
              label: "2 Columns",
              value: "2",
            },
            {
              label: "3 Columns",
              value: "3",
            },
            {
              label: "4 Columns",
              value: "4",
            },
          ],
          admin: {
            condition: (_, { layout }) => layout === "grid",
          },
        },
        {
          name: "gap",
          type: "select",
          defaultValue: "medium",
          options: [
            {
              label: "Small",
              value: "small",
            },
            {
              label: "Medium",
              value: "medium",
            },
            {
              label: "Large",
              value: "large",
            },
          ],
        },
      ],
    },
  ],
};
