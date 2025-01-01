import { link } from "@/fields/link";
import { isAdmin } from "@/lib/access/is-admin";
import { revalidatePath } from "next/cache";
import type { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: "columns",
      type: "array",
      label: "Navigation Columns",
      interfaceName: "FooterColumn",
      admin: {
        description: "Configure the footer navigation columns",
      },
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
          admin: {
            description: "Section heading",
          },
          localized: true,
        },
        {
          name: "navItems",
          type: "array",
          label: "Navigation Items",
          admin: {
            description: "Links in this section",
          },
          fields: [
            link({
              appearances: false,
              overrides: {
                localized: true,
              },
            }),
          ],
        },
      ],
      minRows: 1,
      maxRows: 5,
    },
    {
      name: "social",
      type: "group",
      fields: [
        {
          name: "links",
          type: "array",
          label: "Social Links",
          interfaceName: "FooterSocialMediaLink",
          admin: {
            description: "Add social media links",
          },
          fields: [
            {
              name: "platform",
              type: "select",
              required: true,
              options: [
                { label: "Twitter", value: "twitter" },
                { label: "LinkedIn", value: "linkedin" },
                { label: "GitHub", value: "github" },
                { label: "Instagram", value: "instagram" },
              ],
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
      name: "legal",
      type: "group",
      fields: [
        {
          name: "links",
          type: "array",
          label: "Legal Links",
          interfaceName: "FooterLegalLink",
          admin: {
            description: "Add legal/policy links",
          },
          fields: [
            link({
              appearances: false,
              disableLabel: false,
            }),
          ],
        },
        {
          name: "copyrightText",
          type: "text",
          label: "Copyright Text",
          admin: {
            description: "Custom copyright text (optional)",
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [() => revalidatePath("/", "layout")],
  },
};
