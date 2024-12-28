import { authenticated } from "@/lib/access/authenticated";
import {
  isAdmin,
  isAdminFieldLevel,
  isAdminOrSelf,
  isAdminOrSelfFieldLevel,
} from "@/lib/access/is-admin";
import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    create: isAdmin,
    delete: isAdminOrSelf,
    read: () => true,
    update: isAdminOrSelf,
  },
  admin: {
    defaultColumns: ["name", "email"],
    useAsTitle: "name",
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "roles",
      type: "select",
      enumName: "enum_user_role",
      access: {
        create: isAdminFieldLevel,
        read: isAdminOrSelfFieldLevel,
        update: isAdminFieldLevel,
      },
      defaultValue: ["public"],
      options: ["admin", "public"],
      hasMany: true,
      required: true,
    },
  ],
  timestamps: true,
};
