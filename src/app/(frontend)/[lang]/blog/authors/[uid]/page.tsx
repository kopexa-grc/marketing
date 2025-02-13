import { RichText } from "@/components/prismic/rich-text";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { asImageSrc, filter, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceZone } from "@prismicio/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogCardLarge } from "../../_components/blog-card-large";

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
    .getByUID("blog_author", params.uid, { lang: params.lang })
    .catch(() => notFound());

  const blogs = await client.getAllByType("blog", {
    lang: params.lang,
    filters: [filter.any("my.blog.author", [page.id])],
    orderings: [
      {
        field: "my.blog.date",
        direction: "desc",
      },
    ],
  });

  const featuredBlogs = blogs.slice(0, 2); // first 2
  const otherBlogs = blogs.slice(2); // remaining

  return (
    <>
      <section className="py-14 bg-primary-50 dark:bg-primary-950">
        <div className="container">
          <PrismicNextImage
            field={page.data.image}
            className="rounded-full w-32 h-32 mx-auto border-2 border-primary-950"
          />
          <div className="text-center max-w-4xl mx-auto">
            <RichText field={page.data.name} />
            <div className="text-base xl:text-lg font-medium print:text-xs print:text-justify">
              <RichText field={page.data.description} />
            </div>
          </div>
        </div>
      </section>
      <div className="container my-12">
        {featuredBlogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/** only show the first 2 blog posts here */}
            {featuredBlogs.map((post) => (
              <BlogCardLarge
                key={post.id}
                post={post}
                authorUid={page.uid}
                lang={params.lang}
              />
            ))}
          </div>
        )}
        {otherBlogs.length > 0 && (
          <div className="col-span-12 md:col-span-10 md:col-start-2 grid grid-cols-1 gap-6 mt-12">
            {otherBlogs.map((post) => (
              <BlogCardLarge
                variant="list"
                key={post.id}
                post={post}
                authorUid={page.uid}
                lang={params.lang}
              />
            ))}
          </div>
        )}
      </div>
      <SliceZone slices={page.data.slices} components={components} />
    </>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uid, lang } = await params;
  const client = createClient();
  const page = await client
    .getByUID("blog_author", uid, { lang })
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
  const pages = await client.getAllByType("blog_author", {
    lang: "*",
  });

  return pages.map((page) => {
    return { uid: page.uid, lang: page.lang };
  });
}
