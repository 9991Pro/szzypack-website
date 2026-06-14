import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";

const industriesData = [
  {
    slug: "coffee",
    name: "Coffee",
    hero: "Premium flexible packaging for specialty coffee roasters — from whole bean to ground, single-origin to blends.",
    overview:
      "Coffee is one of the most demanding categories for flexible packaging. Oxygen, moisture, light, and aroma loss are constant threats to freshness. Our coffee packaging solutions combine high-barrier materials with one-way degassing valves to keep your roast at peak flavor from our factory to your customer's cup.",
    applications: [
      "Whole bean coffee bags with degassing valves",
      "Ground coffee flat bottom bags with tin-tie closures",
      "Single-serve sample pouches (50g-250g)",
      "Bulk 1kg-5kg bags for wholesale and foodservice",
      "Custom-printed mailer pouches for e-commerce subscriptions",
    ],
    features: [
      "Matte or gloss finish with spot UV for premium shelf appeal",
      "Kraft paper exterior + aluminum foil barrier for natural look with protection",
      "One-way degassing valves to release CO₂ while blocking oxygen",
      "Tin-tie or zipper closures for resealability",
      "Custom window options to showcase your roast",
    ],
    products: [
      { name: "Flat Bottom Bags", slug: "flat-bottom-bags" },
      { name: "Side Gusset Bags", slug: "side-gusset-bags" },
      { name: "Stand Up Pouches", slug: "stand-up-pouches" },
    ],
  },
  {
    slug: "pet-food",
    name: "Pet Food",
    hero: "Heavy-duty, puncture-resistant packaging for kibble, treats, and wet pet food — built to survive the supply chain.",
    overview:
      "Pet food packaging must withstand rough handling, resist punctures from sharp kibble edges, and block odors. Our reinforced laminates and heavy-duty side gusset construction deliver the durability your products need, while custom printing helps your brand stand out on crowded shelves.",
    applications: [
      "Dry kibble bags (1kg–20kg)",
      "Freeze-dried and raw pet food pouches",
      "Treat and snack pouches with resealable zippers",
      "Wet food spout pouches",
      "Supplement and vitamin pouches",
    ],
    features: [
      "Puncture-resistant PET/NY/PE laminates",
      "Odor-barrier films to contain strong smells",
      "Heavy-duty bottom seals rated for 20kg+",
      "Gloss or matte finish with pet-friendly branding",
      "Child-resistant zipper options for supplements",
    ],
    products: [
      { name: "Side Gusset Bags", slug: "side-gusset-bags" },
      { name: "Stand Up Pouches", slug: "stand-up-pouches" },
      { name: "Flat Bottom Bags", slug: "flat-bottom-bags" },
    ],
  },
  {
    slug: "food-snacks",
    name: "Food & Snacks",
    hero: "Eye-catching, high-barrier pouches for chips, nuts, dried fruit, granola, confectionery, and more.",
    overview:
      "The snack aisle is one of the most competitive retail environments. Our stand-up pouches combine vibrant printing (up to 10 colors gravure), premium finishes, and reliable barrier properties to keep products crunchy and fresh. From startup brands to established names, we deliver packaging that sells.",
    applications: [
      "Potato chips and extruded snacks",
      "Nuts, trail mix, and dried fruit",
      "Granola, muesli, and cereal",
      "Chocolate, candy, and confectionery",
      "Jerky and meat snacks",
    ],
    features: [
      "High-barrier OPP/metallized PET/CPP structures",
      "Matte, gloss, or soft-touch finishes",
      "Laser scoring for easy-open tear",
      "Resealable zipper closures",
      "Custom die-cut shapes for brand differentiation",
    ],
    products: [
      { name: "Stand Up Pouches", slug: "stand-up-pouches" },
      { name: "Roll Film", slug: "roll-film" },
      { name: "Spout Pouches", slug: "spout-pouches" },
    ],
  },
  {
    slug: "supplements",
    name: "Supplements",
    hero: "Small-format, high-barrier pouches for protein powders, vitamins, and nutraceuticals — engineered for freshness and compliance.",
    overview:
      "Supplement packaging requires exceptional moisture and oxygen barriers to protect active ingredients. Our small-format pouches are designed for protein powders, vitamins, and nutraceuticals, with options for child-resistant closures and premium finishes that convey quality and trust.",
    applications: [
      "Protein powder stand-up pouches (250g–2kg)",
      "Vitamin and supplement single-dose sachets",
      "Nutraceutical flat bottom bags",
      "Pre-workout and energy powder pouches",
      "Meal replacement shake packaging",
    ],
    features: [
      "FDA-compliant food-contact materials",
      "Oxygen and moisture barrier laminates",
      "Child-resistant press-to-close zippers",
      "Small MOQ for startup brands",
      "Digital or gravure printing for crisp label copy",
    ],
    products: [
      { name: "Stand Up Pouches", slug: "stand-up-pouches" },
      { name: "Flat Bottom Bags", slug: "flat-bottom-bags" },
      { name: "Custom Shapes", slug: "custom-shapes" },
    ],
  },
  {
    slug: "beverages",
    name: "Beverages",
    hero: "Leak-proof spout pouches for juices, energy drinks, liquid concentrates, and cocktail mixers.",
    overview:
      "Spout pouches are rapidly replacing rigid bottles and cartons in the beverage industry — they're lighter, use less material, and offer superior branding real estate. Our spout pouches feature precision-fit caps and retort-capable structures for hot-fill and aseptic applications.",
    applications: [
      "Juice and smoothie pouches (100ml–500ml)",
      "Energy drink and sports drink pouches",
      "Liquid concentrate and syrup pouches",
      "Cocktail mixer and bar syrup pouches",
      "Sauce and dressing pouches",
    ],
    features: [
      "Φ8.6mm and Φ10mm spout options with child-resistant caps",
      "Retort-capable laminates for hot-fill (up to 121°C)",
      "Leak-proof spout seal integrity",
      "Transparent or metallized barrier options",
      "Custom spout colors and cap types",
    ],
    products: [
      { name: "Spout Pouches", slug: "spout-pouches" },
      { name: "Stand Up Pouches", slug: "stand-up-pouches" },
    ],
  },
  {
    slug: "chemicals",
    name: "Chemicals & Industrial",
    hero: "Chemical-resistant bulk packaging for detergents, agrochemicals, and construction materials — certified and compliant.",
    overview:
      "Industrial and chemical packaging must withstand aggressive contents, meet UN certification requirements, and perform reliably in harsh environments. Our chemical-resistant laminates and heavy-duty bulk bags deliver the safety, durability, and compliance your products demand.",
    applications: [
      "Detergent and cleaning product refill pouches",
      "Agrochemical and fertilizer bags",
      "Construction material packaging (cement, grout, adhesives)",
      "Pool chemical and water treatment packaging",
      "Industrial salt and de-icer bags",
    ],
    features: [
      "Chemical-resistant PE and PET/NY/PE laminates",
      "UN-certified for dangerous goods (where required)",
      "Heavy-duty construction for 10kg–25kg loads",
      "Anti-slip surface finishes",
      "Moisture and UV-resistant options",
    ],
    products: [
      { name: "Side Gusset Bags", slug: "side-gusset-bags" },
      { name: "Roll Film", slug: "roll-film" },
    ],
  },
];

export async function generateStaticParams() {
  return industriesData.map((ind) => ({ slug: ind.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = industriesData.find((i) => i.slug === slug);
  if (!industry) return { title: "Industry Not Found" };
  return {
    title: `${industry.name} Packaging Solutions | SZZYPack`,
    description: industry.hero,
    openGraph: {
      title: `${industry.name} Packaging Solutions — SZZYPack`,
      description: industry.hero,
      url: `https://www.szzypack.com/industries/${industry.slug}`,
    },
    alternates: {
      canonical: `https://www.szzypack.com/industries/${industry.slug}`,
    },
  };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = industriesData.find((i) => i.slug === slug);
  if (!industry) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.szzypack.com" },
          { name: "Industries", url: "https://www.szzypack.com/industries" },
          { name: industry.name, url: `https://www.szzypack.com/industries/${industry.slug}` },
        ])}
      />
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-12 md:py-16">
        <div className="container-site">
          <Link
            href="/industries"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-700 transition-colors mb-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All Industries
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-dark-900">{industry.name}</h1>
          <p className="mt-4 text-gray-500 text-lg max-w-3xl">{industry.hero}</p>
        </div>
      </section>

      <section className="container-site py-12 md:py-16">
        <div className="max-w-3xl">
          <h2 className="text-xl font-bold text-dark-900 mb-4">Overview</h2>
          <p className="text-gray-600 leading-relaxed">{industry.overview}</p>
        </div>
      </section>

      <section className="container-site pb-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-bold text-dark-900 mb-4">Applications</h2>
            <ul className="space-y-2">
              {industry.applications.map((a) => (
                <li key={a} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-gray-600">{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-dark-900 mb-4">Key Features</h2>
            <ul className="space-y-2">
              {industry.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-gray-600">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="container-site">
          <h2 className="text-xl font-bold text-dark-900 mb-6">Recommended Products</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {industry.products.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md hover:border-primary-200 transition-all"
              >
                <span className="font-medium text-dark-900 group-hover:text-primary-700 transition-colors">
                  {p.name}
                </span>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-12 text-center">
        <h2 className="text-xl font-bold text-dark-900">Ready to discuss your {industry.name.toLowerCase()} project?</h2>
        <p className="mt-2 text-gray-500">
          Share your requirements and we will get back to you with a quote within 24 hours.
        </p>
        <div className="mt-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-primary-700 px-6 py-3 text-white font-medium hover:bg-primary-800 transition-colors"
          >
            Get a Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
