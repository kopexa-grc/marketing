import { link } from "@/fields/link";
import { linkGroup } from "@/fields/linkGroup";
import { isAdmin } from "@/lib/access/is-admin";
import { revalidatePath } from "next/cache";
import type { GlobalConfig } from "payload";

export const MainMenu: GlobalConfig = {
  slug: "main-menu",
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: "tabs",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          type: "row",
          fields: [
            {
              name: "enableDirectLink",
              type: "checkbox",
            },
          ],
        },
        {
          type: "collapsible",
          label: "Direct Link",
          admin: {
            condition: (_, siblingData) => siblingData.enableDirectLink,
          },
          fields: [
            link({
              appearances: false,
              disableLabel: true,
            }),
          ],
        },
        {
          type: "collapsible",
          label: "Dropdown Menu",
          admin: {
            condition: (_, siblingData) => !siblingData.enableDirectLink,
          },
          fields: [
            {
              name: "navItems",
              type: "array",
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                },
                {
                  name: "description",
                  type: "textarea",
                },
                link({
                  appearances: false,
                  disableLabel: true,
                }),
              ],
            },
          ],
        },
      ],
    },
    linkGroup({
      overrides: {
        name: "ctas",
        label: "Call to Actions",
      },
    }),
  ],
  hooks: {
    afterChange: [() => revalidatePath("/", "layout")],
  },
};