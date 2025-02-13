import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { asImageSrc, asText, isFilled } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndexTitle } from "./_components/blog-index-title";

type Params = {
  lang: string;
  uid: string;
};

type Props = {
  params: Promise<Params>;
};

export default async function BlogPage(props: Props) {
  const params = await props.params;

  const client = createClient();
  const page = await client
    .getSingle("blog_home", { lang: params.lang })
    .catch(() => notFound());

  return (
    <div className="max-w-full overflow-hidden">
      <BlogIndexTitle
        title={asText(page.data.title)}
        rollingTitles={page.data.rolling_title}
      />
      <SliceZone
        slices={page.data.slices}
        components={components}
        context={{
          theme: "light",
          lang: params.lang,
        }}
      />
    </div>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const client = createClient();
  const page = await client
    .getSingle("blog_home", { lang })
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
  const pages = await client.getAllByType("blog_home", {
    lang: "*",
  });

  return pages.map((page) => {
    return { uid: page.uid, lang: page.lang };
  });
}
