import { RichText } from "@/components/prismic/rich-text";
import { getBlogAuthorByUID } from "@/data/get-author";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { asImageSrc, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { SliceZone } from "@prismicio/react";
import type { Metadata } from "next";
import * as prismicR from "@prismicio/richtext";
import { notFound } from "next/navigation";
import { headingRecipe } from "@/components/recipes/heading-recipe";
import { buttonVariants } from "@/components/ui/button";
import {
  type DataSlice,
  TableOfContents,
} from "@/components/prismic/table-of-contents";
import { BlogCategoryLink } from "../_components/blog-category-link";
import { AuthorBadge } from "../_components/author-badge";

type Params = {
  lang: string;
  uid: string;
};

type Props = {
  params: Promise<Params>;
};

export default async function PrismigPage(props: Props) {
  const params = await props.params;

  const client = createClient();
  const page = await client
    .getByUID("blog", params.uid, { lang: params.lang })
    .catch(() => notFound());

  const author = isFilled.contentRelationship(page.data.author)
    ? await getBlogAuthorByUID(page.data.author.uid)
    : null;

  const date = isFilled.date(page.data.date)
    ? new Intl.DateTimeFormat("de-DE", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(page.data.date))
    : null;

  return (
    <article className="text-lg">
      <header className="container grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12 lg:mb-20 items-center">
        <div className="flex flex-col md:pr-12 gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-muted-foreground text-base">
            {/** category with image */}
            {isFilled.contentRelationship(page.data.category) && (
              <BlogCategoryLink uid={page.data.category.uid} />
            )}
            <div className="flex gap-2">
              {isFilled.date(page.data.date) && (
                <time dateTime={String(page.data.date)}>{date}</time>
              )}
              {/** date and read */}
            </div>
          </div>
          <div className="max-w-lg lg:max-w-none break-words">
            <RichText field={page.data.title} />
          </div>
          <div className="flex items-center text-muted-foreground text-base gap-4">
            {/** author zone */}
            {isFilled.contentRelationship(page.data.author) && (
              <AuthorBadge uid={page.data.author.uid} lang={params.lang} />
            )}
          </div>
        </div>
        <div className="relative">
          {isFilled.image(page.data.image) && (
            <div className="rounded-2xl border-2 overflow-hidden">
              <div className="-m-px">
                <PrismicNextImage className="w-full" field={page.data.image} />
              </div>
            </div>
          )}
        </div>
      </header>
      <div className="container flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-6 pt-10">
        <div className="lg:col-span-8 pb-12 xl:pl-11 xl:pr-16 order-2 group/blog">
          <SliceZone slices={page.data.slices} components={components} />
          <footer>
            {author && (
              <div className="bg-muted rounded-xl p-8 my-12">
                <div className="flex gap-4">
                  <div className="grow">
                    <span className="text-base/none">Article written by</span>
                    <h3
                      className={headingRecipe({
                        level: "h3",
                        className: "mt-0",
                      })}
                    >
                      {prismicR.asText(author.data.name)}
                    </h3>
                    <div className="text-base print:text-xs print:text-justify mt-4">
                      <RichText field={author.data.description} />
                    </div>
                    <PrismicNextLink
                      document={author}
                      className={buttonVariants({
                        variant: "link",
                        size: "lg",
                        className: "text-base",
                      })}
                    >
                      More posts
                    </PrismicNextLink>
                  </div>
                  {isFilled.image(author.data.image) && (
                    <PrismicNextImage
                      field={author.data.image}
                      className="size-20 rounded-full"
                    />
                  )}
                </div>
              </div>
            )}
          </footer>
        </div>
        <aside className="lg:col-span-4 order-1">
          <div className="sticky pb-6 top-[120px]">
            <TableOfContents
              className="bg-background border-2 rounded-xl"
              tocTitle="Table of contents"
              slices={
                page.data.slices.filter(
                  (slice) => slice.slice_type === "text_content"
                ) as DataSlice[]
              }
            />
          </div>
        </aside>
      </div>
    </article>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uid, lang } = await params;
  const client = createClient();
  const page = await client
    .getByUID("blog", uid, { lang })
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      title: isFilled.keyText(page.data.meta_title)
        ? page.data.meta_title
        : undefined,
      description: isFilled.keyText(page.data.meta_description)
        ? page.data.meta_description
        : undefined,
      images: isFilled.image(page.data.meta_image)
        ? [asImageSrc(page.data.meta_image)]
        : undefined,
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("blog", {
    lang: "*",
  });

  return pages.map((page) => {
    return { uid: page.uid, lang: page.lang };
  });
}
