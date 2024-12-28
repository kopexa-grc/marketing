import { isAdmin } from "@/lib/access/is-admin";
import { revalidatePath } from "next/cache";
import type { GlobalConfig } from "payload";

export const PartnerProgram: GlobalConfig = {
  slug: "partner-program",
  access: {
    read: () => true,
    update: isAdmin,
  },
  admin: {
    group: "Partner Program",
  },
  fields: [
    {
      name: "contactForm",
      type: "relationship",
      admin: {
        description:
          "Select the form that should be used for the contact form.",
      },
      relationTo: "forms",
      required: true,
    },
  ],
  hooks: {
    afterChange: [() => revalidatePath("/partners", "layout")],
  },
  label: "Partner Program Directory",
};
