import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import config from "../slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || config.repositoryName;

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
// TODO: Update the routes array to match your project's route structure.
const routes: prismic.ClientConfig["routes"] = [
  // Examples:
  // {
  // 	type: "homepage",
  // 	path: "/",
  // },
  {
    type: "page",
    path: "/:lang/platform/:uid",
  },
  {
    type: "legal_home",
    path: "/:lang/legal",
  },
  {
    type: "legal",
    path: "/:lang/legal/:uid",
  },
  {
    type: "contact_home",
    path: "/:lang/contact/:uid",
  },
  {
    type: "contact",
    path: "/:lang/contact/:uid",
  },
  {
    type: "services",
    path: "/:lang/services/:uid",
  },
  {
    type: "support_home",
    path: "/:lang/support",
  },
  {
    type: "enterprise_home",
    path: "/:lang/enterprise",
  },
  {
    type: "marketing",
    path: "/:lang/:uid",
  },
  {
    type: "blog_home",
    path: "/:lang/blog",
  },
  {
    type: "blog",
    path: "/:lang/blog/:uid",
  },
  {
    type: "blog_author",
    path: "/:lang/blog/authors/:uid",
  },
  {
    type: "blog_category",
    path: "/:lang/blog/category/:uid",
  },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
    ...config,
  });

  prismicNext.enableAutoPreviews({
    client,
    // @ts-expect-error generated
    previewData: config.previewData,
    // @ts-expect-error generated
    req: config.req,
  });

  return client;
};
