import { HeadingField } from "@/fields/heading";
import type { Block } from "payload";

export const ContentGrid: Block = {
  slug: "contentGrid",
  interfaceName: "ContentGridBlock",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "variant",
          type: "select",
          defaultValue: "sideBySide",
          enumName: "enum_content_grid_variant",
          label: {
            en: "Variant",
            de: "Variante",
          },
          options: [
            {
              label: "Side by Side",
              value: "sideBySide",
            },
          ],
        },
      ],
    },
    HeadingField(),
    {
      name: "content",
      type: "richText",
      required: true,
      localized: true,
    },
    {
      name: "cells",
      type: "array",
      fields: [
        {
          name: "heading",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "description",
          type: "textarea",
          required: false,
          localized: true,
        },
      ],
      minRows: 1,
      maxRows: 8,
    },
  ],
};
