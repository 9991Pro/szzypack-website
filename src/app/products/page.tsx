import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { getContentFiles } from "@/lib/content";
import type { Product } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Products | SZZYPack",
  description:
    "Custom flexible packaging solutions: stand-up pouches, flat bottom bags, roll film, spout pouches, side gusset bags & custom shapes. MOQ 500, free samples.",
  openGraph: {
    title: "Custom Flexible Packaging Products — 6 Pouch Formats | SZZYPack",
    description:
      "Stand-up pouches, flat bottom bags, side gusset bags, spout pouches, roll film & custom shapes. MOQ 500, free samples, factory-direct pricing.",
    url: "https://www.szzypack.com/products",
  },
  alternates: {
    canonical: "https://www.szzypack.com/products",
  },
};

const industryCategories = [
  {
    name: "Coffee",
    desc: "Degassing valves, tin-tie closures, and high-barrier laminates for fresh coffee packaging.",
    href: "/industries/coffee",
  },
  {
    name: "Pet Food",
    desc: "Heavy-duty side gusset bags and resealable pouches for kibble, treats, and wet food.",
    href: "/industries/pet-food",
  },
  {
    name: "Food & Snacks",
    desc: "High-barrier stand-up pouches with zipper closures for chips, nuts, dried fruit, and more.",
    href: "/industries/food-snacks",
  },
  {
    name: "Supplements",
    desc: "Small-format pouches with child-resistant options and oxygen barriers for powders and capsules.",
    href: "/industries/supplements",
  },
  {
    name: "Beverages",
    desc: "Spout pouches for juices, energy drinks, liquid concentrates, and cocktail mixers.",
    href: "/industries/beverages",
  },
  {
    name: "Chemicals & Industrial",
    desc: "Chemical-resistant laminates and heavy-duty bulk bags for non-food applications.",
    href: "/industries/chemicals",
  },
];

export default async function ProductsPage() {
  const products = await getContentFiles<Product>("products");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.szzypack.com" },
          { name: "Products", url: "https://www.szzypack.com/products" },
        ])}
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-16 md:py-20">
        <div className="container-site text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-dark-900">
            Our Products
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Six pouch formats, endless customization. Browse by pouch type or find the right
            packaging for your industry.
          </p>
        </div>
      </section>

      {/* By Pouch Type */}
      <section className="container-site py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-dark-900 text-center">By Pouch Type</h2>
        <p className="mt-2 text-gray-500 text-center max-w-xl mx-auto">
          Explore our full range of flexible packaging formats, each with custom sizing, printing, and finishing options.
        </p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products
            .sort((a, b) => a.data.order - b.data.order)
            .map((p) => (
              <ProductCard
                key={p.slug}
                product={{ ...p.data, slug: p.slug, content: p.content }}
              />
            ))}
        </div>
      </section>

      {/* By Industry */}
      <section className="bg-dark-900 py-16 md:py-20">
        <div className="container-site">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
            By Industry
          </h2>
          <p className="mt-2 text-gray-400 text-center max-w-xl mx-auto">
            Every industry has unique packaging requirements. We have the material science and production expertise to match.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industryCategories.map((ind) => (
              <Link
                key={ind.name}
                href={ind.href}
                className="group rounded-lg border border-gray-700 bg-dark-800/50 p-6 hover:border-primary-500/50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors">
                  {ind.name}
                </h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{ind.desc}</p>
                <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary-400">
                  View packaging <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container-site py-16 md:py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-dark-900">
          Not sure which format you need?
        </h2>
        <p className="mt-3 text-gray-500 max-w-xl mx-auto">
          Our packaging engineers can recommend the best format, material, and closure for your product. Free consultation.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-primary-700 px-6 py-3 text-white font-medium hover:bg-primary-800 transition-colors"
          >
            Get Free Recommendation <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-6 py-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            How It Works
          </Link>
        </div>
      </section>
    </>
  );
}
