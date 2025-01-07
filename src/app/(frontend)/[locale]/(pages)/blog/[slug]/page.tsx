import { RenderBlocks } from "@/blocks/render-blocks";
import { Media } from "@/components/cms/media";
import { RichText } from "@/components/cms/rich-text";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/typography";
import { Link, Locales, type TLocale } from "@/i18n/routing";
import { fetchBlogPost, fetchBlogPosts } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { getFormatter } from "next-intl/server";
import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { TableOfContents } from "./table-of-contents";
import { AuthorsList } from "./authors";
import { APP_URL } from "@/lib/config";
import { mergeOpenGraph } from "@/lib/seo/mergeOpenGraph";

const getPost = (slug: string, locale: TLocale, draft?: boolean) =>
  draft
    ? fetchBlogPost(slug, locale)
    : unstable_cache(fetchBlogPost, ["blogPost", `post-${slug}-${locale}`])(
        slug,
        locale
      );

export default async function BlogPost({
  params,
}: Readonly<{
  params: Promise<{ slug: string; locale: TLocale }>;
}>) {
  const format = await getFormatter();
  const { isEnabled: draft } = await draftMode();
  const { slug, locale } = await params;

  const article = await getPost(slug, locale, draft);

  if (!article) {
    notFound();
  }

  // Prepare breadcrumb items
  const breadcrumbItems = [
    { label: "Blog", href: "/blog" },
    ...(typeof article.category !== "number"
      ? [
          {
            label: article.category.title,
            href: `/blog/category/${article.category.slug}`,
          },
        ]
      : []),
    {
      label: article.title,
      href: `/blog/${article.slug}`,
      current: true,
    },
  ];

  return (
    <>
      <article itemScope itemType="https://schema.org/BlogPosting">
        <div className="relative bg-accent overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background/5 to-background/0" />
          <div className="layout min-h-[50vh] lg:min-h-[60vh] relative">
            <div className="col-span-full lg:col-span-6 flex flex-col py-20 lg:py-huge">
              <div className="flex-1 flex flex-col">
                <Breadcrumb items={breadcrumbItems} />

                <Heading
                  as="h1"
                  level={2}
                  className="max-w-[720px] leading-tight"
                  itemProp="headline"
                >
                  {article.title}
                </Heading>

                {article.excerpt && (
                  <p
                    className="mt-6 text-lg text-muted-foreground max-w-[640px]"
                    itemProp="description"
                  >
                    {article.excerpt}
                  </p>
                )}
              </div>

              {/* Optional metadata */}
              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {article.publishedOn && (
                  <time dateTime={article.publishedOn} itemProp="datePublished">
                    {format.dateTime(new Date(article.publishedOn), {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                )}
                {/* Add other metadata like reading time, author, etc. */}
              </div>
            </div>

            {article.featuredImage && (
              <Media
                resource={article.featuredImage}
                className="col-span-full lg:col-start-7 relative"
                imgClassName="w-full h-full lg:object-cover lg:w-[50vw] max-lg:rounded-2xl lg:max-w-screen-lg"
                priority
                itemProp="image"
              />
            )}
          </div>
        </div>
        <div className="layout mt-10 lg:mt-16 relative">
          <aside className="col-span-full lg:col-span-3">
            {/** authors sidebar  */}
            <AuthorsList authors={article.authors} />

            {Array.isArray(article.tableOfContents) &&
              article.tableOfContents.length > 0 && (
                <>
                  <Separator className="my-4" aria-hidden="true" />
                  <TableOfContents items={article.tableOfContents} />
                </>
              )}
          </aside>
          <div
            className="col-span-full md:col-span-full lg:col-span-9"
            itemProp="articleBody"
          >
            {article.lexicalContent && (
              <RichText className="md:px-8" content={article.lexicalContent} />
            )}
          </div>
          {/* <footer className="col-span-full lg:col-span-9 lg:col-start-4">
            authors
          </footer> */}
        </div>
      </article>
      <div className="py-xhuge layout">
        <Separator className="col-span-full" />
      </div>
      <RenderBlocks
        blocks={[
          {
            blockType: "relatedPosts",
            blockName: "Related Posts",
            relatedPosts: article.relatedPosts ?? [],
          },
        ]}
      />
    </>
  );
}

function Breadcrumb({
  items,
}: {
  items: Array<{ label: string; href: string; current?: boolean }>;
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            <Link
              href={item.href}
              className={cn(
                "text-sm transition-colors hover:text-primary",
                item.current ? "font-medium" : "text-muted-foreground"
              )}
              aria-current={item.current ? "page" : undefined}
            >
              {item.label}
            </Link>
            {index < items.length - 1 && (
              <ChevronRight
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export async function generateStaticParams() {
  const getPosts = unstable_cache(fetchBlogPosts, ["blogPosts"]);
  const posts = await getPosts();

  return posts.flatMap(({ slug }) =>
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
  const post = await getPost(slug, locale, draft);

  const ogImage =
    typeof post?.meta?.image === "object" &&
    post?.meta?.image !== null &&
    // biome-ignore lint/correctness/noUnsafeOptionalChaining: <explanation>
    "url" in post?.meta?.image &&
    `${APP_URL}${post.meta.image.url}`;

  return {
    description: post?.meta?.description,
    openGraph: mergeOpenGraph({
      description: post?.meta?.description ?? undefined,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title: post?.meta?.title ?? undefined,
      url: `/blog/${slug}`,
    }),
    title: post?.meta?.title,
  };
}
