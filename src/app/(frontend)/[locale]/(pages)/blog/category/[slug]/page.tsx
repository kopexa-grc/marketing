import { BlogList } from "@/components/cms/blog/blog-list";
import { Separator } from "@/components/ui/separator";
import { Heading, Paragraph } from "@/components/ui/typography";
import { Link, Locales, type TLocale } from "@/i18n/routing";
import { fetchCategories, fetchCategoryBySlug } from "@/lib/data";
import { mergeOpenGraph } from "@/lib/seo/mergeOpenGraph";
import { setRequestLocale } from "next-intl/server";
import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

const getCategory = (slug: string, locale: TLocale, draft?: boolean) =>
  draft
    ? fetchCategoryBySlug(slug, locale)
    : unstable_cache(fetchCategoryBySlug, [
        "category",
        `category-${slug}-${locale}`,
      ])(slug, locale);

export default async function CategoryPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string; locale: TLocale }>;
}>) {
  const [{ slug, locale }, { isEnabled: draft }] = await Promise.all([
    params,
    draftMode(),
  ]);

  const category = await getCategory(slug, locale, draft);
  setRequestLocale(locale);

  if (!category) {
    notFound();
  }

  return (
    <div>
      <section className="layout pb-6 pt-16 lg:pb-8 lg:pt-32">
        <div className="col-span-4 lg:col-span-6 lg:col-start-4">
          <div className="text-center pb-4">
            <Link href="/blog" className="text-primary font-semibold text-lg">
              Blog
            </Link>
          </div>
          <Heading as="h1" level={1} className="text-center">
            {category.title}
          </Heading>
          <Paragraph className="text-center lg:mx-auto lg:w-3/4 mt-4">
            {category.description}
          </Paragraph>
        </div>
      </section>
      <div className="layout">
        <Separator className="col-span-full my-8 lg:my-12" />
      </div>
      <section className="layout">
        <div className="col-span-full lg:col-span-8 lg:col-start-3 text-center pb-10 md:pb-14 lg:pb-8">
          <Heading as="h2" level={2}>
            Browse all {category.title}
          </Heading>
        </div>
      </section>
      <BlogList
        className="pt-10 lg:pt-16"
        category={category.id}
        locale={locale}
        pagination={false}
      />
    </div>
  );
}

export async function generateStaticParams() {
  const getCategories = unstable_cache(fetchCategories, ["categories"]);
  const categories = await getCategories();

  return categories.flatMap(({ slug }) =>
    Locales.map((locale) => ({
      locale,
      slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ slug: string; locale: TLocale }>;
}>) {
  const { isEnabled: draft } = await draftMode();
  const { slug, locale } = await params;
  const category = await getCategory(slug, locale, draft);

  return {
    description: category?.description,
    openGraph: mergeOpenGraph({
      description: category?.description ?? undefined,

      title: category?.title ?? undefined,
      url: `/blog/category/${slug}`,
    }),
    title: category?.title,
  };
}
