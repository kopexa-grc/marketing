import { isAdmin } from "@/lib/access/is-admin";
import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: () => true,
    update: isAdmin,
  },
  defaultPopulate: {
    alt: true,
    url: true,
    width: true,
    height: true,
    mimeType: true,
    filename: true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
};
