import { RenderBlocks } from "@/blocks/render-blocks";
import { HeroBlock } from "@/components/cms/hero";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/header/header";
import { fetchGlobals, fetchPage, fetchPages } from "@/lib/data";
import { mergeOpenGraph } from "@/lib/seo/mergeOpenGraph";
import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

const getPage = async (slug: string[], draft?: boolean) =>
  draft ? fetchPage(slug) : unstable_cache(fetchPage, [`page-${slug}`])(slug);

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string[];
  }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { isEnabled: draft } = await draftMode();
  const page = await getPage(slug, draft);

  const ogImage =
    typeof page?.meta?.image === "object" &&
    page?.meta?.image !== null &&
    page?.meta?.image &&
    "url" in page.meta.image &&
    `${page.meta.image.url}`;

  // check if noIndex is true
  const noIndexMeta = page?.noindex ? { robots: "noindex" } : {};

  return {
    description: page?.meta?.description,
    openGraph: mergeOpenGraph({
      description: page?.meta?.description ?? undefined,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title: page?.meta?.title || "Payload",
      url: Array.isArray(slug) ? slug.join("/") : "/",
    }),
    title: page?.meta?.title || "Payload",
    ...noIndexMeta, // Add noindex meta tag if noindex is true
  };
}

const Page = async ({
  params,
}: {
  params: Promise<{
    slug: string[];
  }>;
}) => {
  const { isEnabled: draft } = await draftMode();
  const { slug } = await params;
  //   const url = `/${Array.isArray(slug) ? slug.join("/") : slug}`;

  const getGlobals = draft
    ? fetchGlobals
    : unstable_cache(fetchGlobals, ["footer"]);

  const [page, { footer, mainMenu }] = await Promise.all([
    getPage(slug, draft),
    getGlobals(),
  ]);

  if (!page) {
    notFound();
  }

  return (
    <>
      <Header mainMenu={mainMenu} theme={page.hero.theme} />
      <main>
        <HeroBlock page={page} />
        <RenderBlocks blocks={page.layout} />
      </main>
      <Footer footer={footer} />
    </>
  );
};

export default Page;

export async function generateStaticParams() {
  const getPages = unstable_cache(fetchPages, ["pages"]);
  const pages = await getPages();

  return pages.map(({ breadcrumbs }) => ({
    slug: breadcrumbs?.[breadcrumbs.length - 1]?.url
      ?.replace(/^\/|\/$/g, "")
      .split("/"),
  }));
}
