import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Stand Up Pouches",
    desc: "Resealable zipper, tear notch, hang hole. Most versatile format for food, coffee, and snacks.",
    href: "/products/stand-up-pouches",
    color: "bg-amber-50",
  },
  {
    title: "Flat Bottom Bags",
    desc: "Shelf-stable design with 5-panel branding surface. Premium look for coffee and specialty foods.",
    href: "/products/flat-bottom-bags",
    color: "bg-blue-50",
  },
  {
    title: "Roll Film",
    desc: "High-barrier laminated films for form-fill-seal lines. Custom printed up to 10 colors.",
    href: "/products/roll-film",
    color: "bg-green-50",
  },
  {
    title: "Spout Pouches",
    desc: "With cap and spout for liquids, sauces, and semi-liquids. Leak-proof seal.",
    href: "/products/spout-pouches",
    color: "bg-orange-50",
  },
  {
    title: "Side Gusset Bags",
    desc: "Block bottom, high-volume capacity. Ideal for coffee beans, pet food, and bulk items.",
    href: "/products/side-gusset-bags",
    color: "bg-purple-50",
  },
  {
    title: "Custom Shapes",
    desc: "Die-cut pouches in any shape. Unique branding with 3D structure design.",
    href: "/products/custom-shapes",
    color: "bg-pink-50",
  },
];

export function ProductCategories() {
  return (
    <section className="container-site py-20 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-dark-900">
          Our Pouch Types
        </h2>
        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
          From stand-up pouches to roll film, we manufacture every format with custom printing,
          sizing, and finishing options.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c) => (
          <Link
            key={c.title}
            href={c.href}
            className={`group rounded-lg border border-gray-100 p-6 hover:shadow-md hover:border-primary-200 transition-all ${c.color}`}
          >
            <h3 className="text-lg font-semibold text-dark-900 group-hover:text-primary-700 transition-colors">
              {c.title}
            </h3>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">{c.desc}</p>
            <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary-700 opacity-0 group-hover:opacity-100 transition-opacity">
              Learn more <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
