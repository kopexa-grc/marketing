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
      interfaceName: "MainMenuPanels",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
          localized: true,
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
              interfaceName: "MainMenuSections",
              fields: [
                {
                  type: "text",
                  name: "title",
                  label: "Title",
                  localized: true,
                  admin: {
                    description: "The title of the dropdown section",
                  },
                },
                {
                  type: "text",
                  name: "description",
                  label: "Description",
                  localized: true,
                  admin: {
                    description: "The description of the dropdown section",
                  },
                  required: false,
                },
                {
                  name: "links",
                  type: "array",
                  interfaceName: "MainMenuSectionLinks",
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      required: true,
                      localized: true,
                    },
                    {
                      name: "description",
                      type: "textarea",
                      localized: true,
                    },
                    link({
                      appearances: false,
                      disableLabel: true,
                    }),
                  ],
                },
              ],
            },
            {
              name: "lowerLinks",
              type: "array",
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                  localized: true,
                },
                {
                  name: "icon",
                  type: "upload",
                  relationTo: "media",
                  required: false,
                  filterOptions: {
                    mimeType: { contains: "image" },
                  },
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
