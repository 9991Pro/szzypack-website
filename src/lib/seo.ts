import type { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
  path?: string;
}

export function constructMetadata({
  title,
  description,
  image,
  noIndex,
  path = "",
}: SEOProps): Metadata {
  const url = `https://www.szzypack.com${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      ...(image && {
        images: [{ url: image, width: 1200, height: 630 }],
      }),
    },
    ...(noIndex && {
      robots: { index: false, follow: false },
    }),
  };
}
