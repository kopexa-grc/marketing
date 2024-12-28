import type { Footer, MainMenu, Page } from "@/payload-types";
import { draftMode } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";

export const fetchPage = async (
  incomingSlugSegments: string[]
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

export const fetchGlobals = async (): Promise<{
  footer: Footer;
  mainMenu: MainMenu;
}> => {
  const payload = await getPayload({ config });
  const mainMenu = await payload.findGlobal({
    slug: "main-menu",
    depth: 1,
  });
  const footer = await payload.findGlobal({
    slug: "footer",
    depth: 1,
  });

  return {
    footer,
    mainMenu,
  };
};
