import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { asImageSrc, isFilled } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = {
  lang: string;
};

type Props = {
  params: Promise<Params>;
};

export default async function PrismigPage(props: Props) {
  const { lang } = await props.params;

  const client = createClient();

  const page = await client
    .getSingle("home_page", { lang })
    .catch(() => notFound());

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { lang } = await props.params;

  const client = createClient();
  const page = await client
    .getSingle("home_page", { lang })
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
  const pages = await client.getAllByType("home_page", {
    lang: "*",
  });

  return pages.map((page) => {
    return { uid: page.uid, lang: page.lang };
  });
}
