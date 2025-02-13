import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { asImageSrc, isFilled } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = {
  lang: string;
  uid: string;
};

type Props = {
  params: Promise<Params>;
};

export default async function LegalPage(props: Props) {
  const params = await props.params;

  const client = createClient();
  const page = await client
    .getByUID("legal", params.uid, { lang: params.lang })
    .catch(() => notFound());

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uid, lang } = await params;

  const client = createClient();
  const page = await client
    .getByUID("legal", uid, { lang })
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
  const pages = await client.getAllByType("legal", {
    lang: "*",
  });

  const result = pages.map((page) => {
    return { uid: page.uid, lang: page.lang };
  });

  return result;
}
