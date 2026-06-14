import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | SZZYPack",
  description:
    "Get a free quote for custom flexible packaging within 24 hours. Upload your artwork, share your specs, or just say hello. We respond to every inquiry.",
  openGraph: {
    title: "Contact SZZYPack — Get a Quote Within 24 Hours",
    description:
      "Get a free quote for custom flexible packaging within 24 hours. Upload your artwork, share your specs, or just say hello.",
    url: "https://www.szzypack.com/contact",
  },
  alternates: {
    canonical: "https://www.szzypack.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
