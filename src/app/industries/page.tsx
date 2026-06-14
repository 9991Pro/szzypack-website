import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Industries | SZZYPack",
  description:
    "Flexible packaging solutions for coffee, pet food, snacks, supplements, beverages, and industrial products. Certified food-safe materials.",
  openGraph: {
    title: "Industries We Serve — Flexible Packaging by Sector | SZZYPack",
    description:
      "Custom flexible packaging for coffee, pet food, food & snacks, supplements, beverages, and chemicals. Industry-specific materials and certifications.",
    url: "https://www.szzypack.com/industries",
  },
  alternates: {
    canonical: "https://www.szzypack.com/industries",
  },
};

const industries = [
  {
    name: "Coffee",
    slug: "coffee",
    desc: "Degassing valves, tin-tie closures, and high-barrier flat bottom bags for whole bean and ground coffee. Keep your roast fresh from roastery to cup.",
    products: ["Flat Bottom Bags", "Side Gusset Bags", "Stand Up Pouches"],
  },
  {
    name: "Pet Food",
    slug: "pet-food",
    desc: "Heavy-duty side gusset bags and resealable pouches for kibble, treats, wet food, and supplements. Puncture-resistant and odor-barrier materials.",
    products: ["Side Gusset Bags", "Stand Up Pouches", "Flat Bottom Bags"],
  },
  {
    name: "Food & Snacks",
    slug: "food-snacks",
    desc: "High-barrier stand-up pouches with zipper closures for chips, nuts, dried fruit, granola, and confectionery. Custom windows for product visibility.",
    products: ["Stand Up Pouches", "Roll Film", "Spout Pouches"],
  },
  {
    name: "Supplements",
    slug: "supplements",
    desc: "Small-format pouches with child-resistant closures and oxygen/moisture barriers for protein powders, vitamins, and nutraceuticals.",
    products: ["Stand Up Pouches", "Flat Bottom Bags", "Custom Shapes"],
  },
  {
    name: "Beverages",
    slug: "beverages",
    desc: "Spout pouches for juices, energy drinks, liquid concentrates, and cocktail mixers. Leak-proof seals and retort-capable for hot-fill products.",
    products: ["Spout Pouches", "Stand Up Pouches"],
  },
  {
    name: "Chemicals & Industrial",
    slug: "chemicals",
    desc: "Chemical-resistant laminates, heavy-duty bulk bags, and UN-certified packaging for detergents, agrochemicals, and construction materials.",
    products: ["Side Gusset Bags", "Roll Film"],
  },
];

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.szzypack.com" },
          { name: "Industries", url: "https://www.szzypack.com/industries" },
        ])}
      />
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-16 md:py-20">
        <div className="container-site text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-dark-900">Industries We Serve</h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Every industry has unique packaging requirements. We bring the material science,
            engineering, and certification expertise to meet them all.
          </p>
        </div>
      </section>

      <section className="container-site py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind) => (
            <Link
              key={ind.slug}
              href={`/industries/${ind.slug}`}
              className="group rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-primary-200 transition-all"
            >
              <h2 className="text-xl font-semibold text-dark-900 group-hover:text-primary-700 transition-colors">
                {ind.name}
              </h2>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{ind.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {ind.products.map((p) => (
                  <span key={p} className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full">
                    {p}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary-700 opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-site pb-16 text-center">
        <h2 className="text-2xl font-bold text-dark-900">Don't see your industry?</h2>
        <p className="mt-2 text-gray-500 max-w-xl mx-auto">
          We have experience across many more sectors. Contact us to discuss your specific requirements.
        </p>
        <div className="mt-4">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-md bg-primary-700 px-6 py-3 text-white font-medium hover:bg-primary-800 transition-colors">
            Contact Us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
