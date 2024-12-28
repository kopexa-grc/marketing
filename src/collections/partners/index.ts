import { slugField } from "@/fields/slug";
import { isAdmin } from "@/lib/access/is-admin";
import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload";

export const Partners: CollectionConfig = {
  slug: "partners",
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: () => true,
    update: isAdmin,
  },
  admin: {
    group: "Partner Program",
    useAsTitle: "name",
  },
  defaultPopulate: {
    name: true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Agency Name",
      required: true,
    },
    {
      name: "website",
      type: "text",
      label: "Website URL",
      required: true,
    },
    {
      name: "email",
      type: "email",
      label: "Contact Email",
      required: true,
    },
    ...slugField("name", {
      slugOverrides: {
        required: true,
      },
    }),
    {
      name: "agency_status",
      type: "select",
      admin: {
        description: "Set to inactive to hide this partner from the directory.",
        position: "sidebar",
      },
      defaultValue: "active",
      enumName: "enum_agency_status",
      options: [
        {
          label: "Active",
          value: "active",
        },
        {
          label: "Inactive",
          value: "inactive",
        },
      ],
    },
    {
      name: "logo",
      type: "upload",
      admin: {
        position: "sidebar",
      },
      relationTo: "media",
      required: true,
    },
    {
      name: "featured",
      type: "checkbox",
      admin: {
        description:
          "This field is managed by the Featured Partners field in the Partner Program collection",
        position: "sidebar",
        readOnly: true,
      },
      label: "Featured",
    },
  ],
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidatePath(`/partners/${doc.slug}`);
        revalidatePath("/partners", "page");
        console.log(`Revalidated: /partners/${doc.slug}`);
      },
    ],
  },
  labels: {
    plural: "Partners",
    singular: "Partner",
  },
  versions: {
    drafts: true,
  },
};
