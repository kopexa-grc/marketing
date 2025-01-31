import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "node:path";
import { buildConfig } from "payload";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { Users } from "./collections/users";
import { Media } from "./collections/Media";
import { Pages } from "./collections/pages";
import { cssVariables } from "./css-variables";
import { Footer } from "./globals/footer";
import { Partners } from "./collections/partners";
import { PartnerProgram } from "./globals/partner-program";
import { MainMenu } from "./globals/main-menu";
import { plugins } from "./lib/plugins";
import { Posts } from "./collections/posts";
import { Categories } from "./collections/categories";

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
  localization: {
    locales: [
      {
        label: "English",
        code: "en",
      },
      {
        label: "Deutsch",
        code: "de",
      },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  globals: [MainMenu, Footer, PartnerProgram],
  collections: [Pages, Users, Media, Partners, Posts, Categories],
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
    ...plugins,
    // storage-adapter-import-placeholder
  ],
});
