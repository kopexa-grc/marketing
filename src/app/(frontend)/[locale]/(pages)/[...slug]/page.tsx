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
import { Locales } from "@/i18n/routing";

const getPage = async (slug: string[], locale: "en" | "de", draft?: boolean) =>
  draft
    ? fetchPage(slug, locale)
    : unstable_cache(fetchPage, [`page-${slug}`])(slug, locale);

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string[];
    locale: "en" | "de";
  }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const { isEnabled: draft } = await draftMode();
  const page = await getPage(slug, locale, draft);

  // Construct the URL path
  const path = Array.isArray(slug) ? slug.join("/") : "/";
  const url = `/${locale}/${path}`;

  const ogImage =
    typeof page?.meta?.image === "object" &&
    page?.meta?.image !== null &&
    page?.meta?.image &&
    "url" in page.meta.image &&
    `${page.meta.image.url}`;

  // Create language alternatives directly from i18n config
  const languages: Record<string, string> = {
    en: `/en/${path}`,
    de: `/de/${path}`,
  };

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
      url,
    }),
    title: page?.meta?.title || "Payload",
    alternates: {
      canonical: url,
      languages,
    },
    ...noIndexMeta, // Add noindex meta tag if noindex is true
  };
}

const Page = async ({
  params,
}: {
  params: Promise<{
    slug: string[];
    locale: "en" | "de";
  }>;
}) => {
  const { isEnabled: draft } = await draftMode();
  const { slug, locale } = await params;
  //   const url = `/${Array.isArray(slug) ? slug.join("/") : slug}`;

  const getGlobals = draft
    ? fetchGlobals
    : unstable_cache(fetchGlobals, ["footer"]);

  const [page, { footer, mainMenu }] = await Promise.all([
    getPage(slug, locale, draft),
    getGlobals(locale),
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

  return pages.flatMap(({ breadcrumbs }) =>
    Locales.map((locale) => ({
      locale,
      slug: breadcrumbs?.[breadcrumbs.length - 1]?.url
        ?.replace(/^\/|\/$/g, "")
        .split("/"),
    }))
  );
}
