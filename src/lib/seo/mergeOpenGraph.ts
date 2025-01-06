import type { Metadata } from "next";

const defaultOpenGraph: Metadata["openGraph"] = {
  type: "website",
  description:
    "Kopexa is the next-generation compliance platform that empowers organizations to streamline audits, manage compliance, and reduce risk through intelligent automation.",
  images: [
    {
      url: "/images/og-image.jpg",
    },
  ],
  siteName: "Kopexa",
  title: "Kopexa",
};

export const mergeOpenGraph = (
  og?: Metadata["openGraph"]
): Metadata["openGraph"] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  };
};
