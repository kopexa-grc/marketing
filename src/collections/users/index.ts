import { slugField } from "@/fields/slug";
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
    group: "System",
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
      label: { en: "Name", de: "Name" },
      admin: {
        description: {
          en: "Enter the full name of the user.",
          de: "Geben Sie den vollständigen Namen des Benutzers ein.",
        },
      },
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
      label: { en: "Roles", de: "Rollen" },
      admin: {
        description: {
          en: "Select one or more roles for the user.",
          de: "Wählen Sie eine oder mehrere Rollen für den Benutzer aus.",
        },
      },
    },
    {
      name: "bio",
      type: "textarea",
      label: { en: "Bio", de: "Biografie" },
      admin: {
        description: {
          en: "A short biography of the user. Max 300 characters.",
          de: "Eine kurze Biografie des Benutzers. Maximal 300 Zeichen.",
        },
      },
    },
    {
      name: "headline",
      type: "text",
      label: { en: "Headline", de: "Überschrift" },
      admin: {
        description: {
          en: "A short headline that describes the user's role.",
          de: "Eine kurze Überschrift, die die Rolle des Benutzers beschreibt.",
        },
      },
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      label: { en: "Avatar", de: "Profilbild" },
      admin: {
        description: {
          en: "Upload a profile picture for the user.",
          de: "Laden Sie ein Profilbild für den Benutzer hoch.",
        },
      },
    },
    {
      name: "socialLinks",
      type: "group",
      label: { en: "Social Links & Website", de: "Soziale Links & Webseite" },
      admin: {
        description: {
          en: "Add links to the user's social media profiles.",
          de: "Fügen Sie Links zu den sozialen Medienprofilen des Benutzers hinzu.",
        },
      },
      fields: [
        {
          name: "website",
          type: "text",
          label: { en: "Website URL", de: "Website-URL" },
          admin: {
            description: {
              en: "Enter the URL of the personal or business website.",
              de: "Geben Sie die URL der persönlichen oder geschäftlichen Website ein.",
            },
          },
        },
        {
          name: "twitter",
          type: "text",
          label: { en: "Twitter Handle", de: "Twitter-Handle" },
          admin: {
            description: {
              en: "Enter the Twitter handle (without @).",
              de: "Geben Sie den Twitter-Benutzernamen ein (ohne @).",
            },
          },
        },
        {
          name: "linkedin",
          type: "text",
          label: { en: "LinkedIn Profile", de: "LinkedIn-Profil" },
          admin: {
            description: {
              en: "Enter the LinkedIn profile URL of the user.",
              de: "Geben Sie die LinkedIn-Profil-URL des Benutzers ein.",
            },
          },
        },
        {
          name: "github",
          type: "text",
          label: { en: "GitHub Profile", de: "GitHub-Profil" },
          admin: {
            description: {
              en: "Enter the GitHub profile URL of the user.",
              de: "Geben Sie die GitHub-Profil-URL des Benutzers ein.",
            },
          },
        },
      ],
    },
    ...slugField("name"),
  ],
  timestamps: true,
};
