import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { LazyCookieBanner } from "@/components/shared/LazyCookieBanner";
import { LazySearchPanel } from "@/components/search/LazySearchPanel";
import { JsonLd } from "@/components/shared/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/jsonld";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SZZYPack — Custom Flexible Packaging Manufacturer",
    template: "%s",
  },
  description:
    "Factory-direct custom flexible packaging: stand up pouches, flat bottom bags, roll film. ISO/BRC certified, MOQ 500, free samples in 3 days.",
  keywords: [
    "flexible packaging",
    "custom pouches",
    "stand up pouches",
    "food packaging",
    "coffee bags",
    "China manufacturer",
  ],
  authors: [{ name: "SZZYPack" }],
  creator: "SZZYPack",
  metadataBase: new URL("https://www.szzypack.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SZZYPack",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <LazyCookieBanner />
        <LazySearchPanel />
      </body>
    </html>
  );
}
