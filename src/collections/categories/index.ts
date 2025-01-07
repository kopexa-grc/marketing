import { slugField } from "@/fields/slug";
import { anyone } from "@/lib/access/authenticatedOrPublished";
import { isAdmin } from "@/lib/access/is-admin";
import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "title",
    group: "Content Hub",
  },
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: anyone,
    update: isAdmin,
  },
  defaultPopulate: {
    slug: true,
    title: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    ...slugField(),
    {
      name: "description",
      type: "textarea",
      localized: true,
    },
  ],
};
