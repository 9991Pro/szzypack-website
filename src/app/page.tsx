import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { LazyProductCategories } from "@/components/home/LazyProductCategories";
import { LazyIndustries } from "@/components/home/LazyIndustries";
import { LazyWhyUs } from "@/components/home/LazyWhyUs";
import { LazyHowItWorks } from "@/components/home/LazyHowItWorks";
import { LazyTestimonials } from "@/components/home/LazyTestimonials";
import { LazyBottomCTA } from "@/components/home/LazyBottomCTA";

export const metadata: Metadata = {
  title: "SZZYPack — Custom Flexible Packaging Manufacturer | Factory Direct",
  description:
    "ISO/BRC certified flexible packaging factory. Custom stand up pouches, flat bottom bags, roll film. MOQ 500 pcs, free samples in 3 days. Get a quote in 24h.",
  openGraph: {
    title: "SZZYPack — Custom Flexible Packaging Manufacturer",
    description:
      "ISO/BRC certified flexible packaging factory. Custom stand up pouches, flat bottom bags, roll film. MOQ 500 pcs, free samples in 3 days.",
    url: "https://www.szzypack.com",
  },
  alternates: {
    canonical: "https://www.szzypack.com",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <LazyProductCategories />
      <LazyIndustries />
      <LazyWhyUs />
      <LazyHowItWorks />
      <LazyTestimonials />
      <LazyBottomCTA />
    </>
  );
}
