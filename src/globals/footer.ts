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
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "navItems",
          type: "array",
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
      ],
      minRows: 1,
      maxRows: 5,
    },
  ],
  hooks: {
    afterChange: [() => revalidatePath("/", "layout")],
  },
};
