import { authenticated } from "@/lib/access/authenticated";
import { authenticatedOrPublished } from "@/lib/access/authenticatedOrPublished";
import { slugField } from "@/fields/slug";
import { generatePreviewPath } from "@/lib/generatePreviewPath";
import type { CollectionConfig } from "payload";
import { fullTitle } from "@/fields/fullTitle";
import { hero } from "@/fields/hero";
import { revalidatePath } from "next/cache";
import { CallToAction } from "@/blocks/call-to-action/config";
import { PromoCardBlock } from "@/blocks/promo-card/config";
import { TextWithImage } from "@/blocks/text-with-image/config";
import { Divider } from "@/blocks/divider/config";
import { Metrics } from "@/blocks/metrics/config";
import { Content } from "@/blocks/content/config";
import { CardGrid } from "@/blocks/card-grid/config";
import { FeatureGrid } from "@/blocks/feature-grid/config";
import { SolutionShowcase } from "@/blocks/solution-showcase/config";
import { Locales } from "@/i18n/routing";
import { ServiceCards } from "@/blocks/service-cards/config";

export const Pages: CollectionConfig<"pages"> = {
  slug: "pages",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    breadcrumbs: true,
  },
  admin: {
    defaultColumns: ["fullTitle", "slug", "createdAt", "updatedAt"],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === "string" ? data.slug : "",
          collection: "pages",
          req,
        });

        return path;
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === "string" ? data.slug : "",
        collection: "pages",
        req,
      }),
    useAsTitle: "fullTitle",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    fullTitle,
    {
      name: "noindex",
      type: "checkbox",
      admin: {
        position: "sidebar",
      },
      label: "No Index",
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [hero],
          label: "Hero",
        },
        {
          label: "Content",
          fields: [
            {
              name: "layout",
              type: "blocks",
              blocks: [
                CallToAction,
                PromoCardBlock,
                TextWithImage,
                Divider,
                Metrics,
                Content,
                CardGrid,
                FeatureGrid,
                SolutionShowcase,
                ServiceCards,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [
      ({ doc, previousDoc }) => {
        if (
          doc._status === "published" ||
          doc._status !== previousDoc._status
        ) {
          const pathsToRevalidate = [];

          if (doc.breadcrumbs && doc.breadcrumbs.length > 0) {
            const path = doc.breadcrumbs[doc.breadcrumbs.length - 1].url;
            for (const locale of Locales) {
              pathsToRevalidate.push(`/${locale}${path}`);
            }

            if (doc.breadcrumbs[0].url === "/home") {
              for (const locale of Locales) {
                pathsToRevalidate.push(`/${locale}/`);
              }
            }
          } else {
            const slugPath = `/${doc.slug}`;

            for (const locale of Locales) {
              pathsToRevalidate.push(`/${locale}${slugPath}`);
            }

            if (doc.slug === "home") {
              for (const locale of Locales) {
                pathsToRevalidate.push(`/${locale}/`);
              }
            }
          }

          for (const path of pathsToRevalidate) {
            revalidatePath(path);
            console.log(`Revalidated: ${path}`);
          }
        }
      },
    ],
  },
  versions: {
    drafts: true,
  },
};
