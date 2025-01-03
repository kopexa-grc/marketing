import type { Plugin } from "payload";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

export const plugins: Plugin[] = [
  payloadCloudPlugin(),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
  }),
  seoPlugin({
    collections: ["pages"],
    uploadsCollection: "media",
  }),
  nestedDocsPlugin({
    collections: ["pages"],
    generateLabel: (_, doc) => doc.title as string,
    generateURL: (docs) =>
      docs.reduce((url, doc) => `${url}/${doc.slug as string}`, ""),
  }),
  vercelBlobStorage({
    cacheControlMaxAge: 60 * 60 * 24 * 365, // 1 year
    collections: {
      media: true,
      // {
      //   generateFileURL: ({ filename }) =>
      //     `https://${process.env.BLOB_STORE_ID}/${filename}`,
      // },
    },
    enabled: Boolean(process.env.BLOB_STORAGE_ENABLED) || false,
    token: process.env.BLOB_READ_WRITE_TOKEN || "",
  }),
];
