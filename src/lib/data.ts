import type { Category, Footer, MainMenu, Page, Post } from "@/payload-types";
import { draftMode } from "next/headers";
import { getPayload, type Where } from "payload";
import config from "@payload-config";
import type { TLocale } from "@/i18n/routing";

export const fetchPage = async (
  incomingSlugSegments: string[],
  locale: TLocale
): Promise<null | Page> => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config });
  const slugSegments = incomingSlugSegments || ["home"];
  const slug = slugSegments.at(-1);

  const data = await payload.find({
    collection: "pages",
    depth: 2,
    draft,
    limit: 1,
    locale,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        ...(draft
          ? []
          : [
              {
                _status: {
                  equals: "published",
                },
              },
            ]),
      ],
    },
  });

  const pagePath = `/${slugSegments.join("/")}`;

  const page = data.docs.find(({ breadcrumbs }: Page) => {
    if (!breadcrumbs) {
      return false;
    }
    const { url } = breadcrumbs[breadcrumbs.length - 1];
    return url === pagePath;
  });

  if (page) {
    return page;
  }

  return null;
};

export const fetchPages = async (): Promise<Partial<Page>[]> => {
  const payload = await getPayload({ config });
  const data = await payload.find({
    collection: "pages",
    depth: 0,
    limit: 300,
    select: {
      breadcrumbs: true,
    },
    where: {
      and: [
        {
          slug: {
            not_equals: "cloud",
          },
        },
        {
          _status: {
            equals: "published",
          },
        },
      ],
    },
  });

  return data.docs;
};

export const payloadToken = "payload-token";

export const fetchGlobals = async (
  locale: "en" | "de"
): Promise<{
  footer: Footer;
  mainMenu: MainMenu;
}> => {
  const payload = await getPayload({ config });
  const mainMenu = await payload.findGlobal({
    slug: "main-menu",
    locale,
    depth: 1,
  });
  const footer = await payload.findGlobal({
    slug: "footer",
    locale,
    depth: 1,
  });

  return {
    footer,
    mainMenu,
  };
};

type FetchBlogPostsOptions = {
  category?: number;
  limit?: number;
  locale?: TLocale;
  authorSlug?: string;
  pagination?: boolean;
};

export const fetchBlogPosts = async (
  options: FetchBlogPostsOptions = {}
): Promise<Partial<Post>[]> => {
  const {
    category,
    limit = 12,
    locale,
    pagination = true,
    authorSlug,
  } = options || {};

  const currentDate = new Date();
  const payload = await getPayload({ config });

  const whereConditions: Where[] = [
    { publishedOn: { less_than_equal: currentDate } },
    { _status: { equals: "published" } },
  ];

  if (category) {
    whereConditions.push({ category: { equals: category } });
  }

  if (authorSlug) {
    whereConditions.push({ "authors.slug": { equals: authorSlug } });
  }

  const data = await payload.find({
    collection: "posts",
    depth: 1,
    limit: pagination ? limit : undefined,
    locale,
    select: {
      slug: true,
      authors: true,
      featuredImage: true,
      publishedOn: true,
      title: true,
      category: true,
    },
    sort: "-publishedOn",
    where: {
      and: whereConditions,
    },
  });

  return data.docs;
};

export const fetchBlogPost = async (slug: string, locale: TLocale) => {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config });

  const data = await payload.find({
    collection: "posts",
    depth: 2,
    draft,
    limit: 1,
    locale,
    showHiddenFields: true, // this is required, as we are using a hidden toc field
    where: {
      and: [
        { slug: { equals: slug } },
        ...(draft
          ? []
          : [
              {
                _status: {
                  equals: "published",
                },
              },
            ]),
      ],
    },
  });

  return data.docs[0];
};

export const fetchCategoryBySlug = async (
  slug: string,
  locale: TLocale
): Promise<Category | null> => {
  const payload = await getPayload({ config });
  const data = await payload.find({
    collection: "categories",
    depth: 1,
    limit: 1,
    locale,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return data.docs?.[0] ?? null;
};

export const fetchCategory = async (id: number): Promise<Category | null> => {
  const payload = await getPayload({ config });
  const data = await payload.find({
    collection: "categories",
    depth: 1,
    limit: 1,
    where: {
      id: {
        equals: id,
      },
    },
  });

  return data.docs?.[0] ?? null;
};

export const fetchCategories = async () => {
  const payload = await getPayload({ config });

  const data = await payload.find({
    collection: "categories",
    depth: 1,
  });

  return data.docs;
};

export const fetchAuthor = async (slug: string) => {
  const payload = await getPayload({ config });

  const data = await payload.find({
    collection: "users",
    depth: 1,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return data.docs?.[0] ?? null;
};

export const fetchUsers = async () => {
  const payload = await getPayload({ config });

  const data = await payload.find({
    collection: "users",
    depth: 1,
  });

  return data.docs;
};
