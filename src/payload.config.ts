// storage-adapter-import-placeholder
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "node:path";
import { buildConfig } from "payload";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { Users } from "./collections/users";
import { Media } from "./collections/Media";
import { Pages } from "./collections/pages";
import { cssVariables } from "./css-variables";
import { Footer } from "./globals/footer";
import { Partners } from "./collections/partners";
import { PartnerProgram } from "./globals/partner-program";
import { MainMenu } from "./globals/main-menu";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: Object.entries(cssVariables.screens).map(([key, value]) => ({
        label: key,
        name: key,
        width: value,
        height: value,
      })),
      collections: ["pages"],
    },
  },
  globals: [MainMenu, Footer, PartnerProgram],
  collections: [Pages, Users, Media, Partners],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    formBuilderPlugin({}),
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
  ],
});
