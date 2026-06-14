import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";

const casesData = [
  {
    slug: "coffee-roaster-packaging-upgrade",
    title: "Coffee Roaster Packaging Upgrade",
    industry: "Coffee",
    summary: "How a US-based specialty coffee roaster switched from imported pre-made bags to custom-printed flat bottom bags, reducing costs by 35% and increasing shelf appeal.",
    challenge: "A growing specialty coffee roaster in Portland, Oregon was sourcing pre-made kraft bags from a US distributor at high per-unit costs. They needed custom branding but were told MOQs of 10,000+ by local suppliers.",
    solution: "We manufactured custom-printed flat bottom bags with kraft exterior, aluminum barrier, one-way degassing valve, and tin-tie closure. MOQ 5,000 pieces at 60% lower unit cost than their previous supplier.",
    results: ["35% reduction in packaging costs", "80% increase in retail placement within 6 months", "Zero quality issues over 12 months of deliveries", "Now ordering 50,000+ bags quarterly"],
  },
  {
    slug: "pet-food-brand-side-gusset-switch",
    title: "Pet Food Brand's Side Gusset Switch",
    industry: "Pet Food",
    summary: "An Australian pet food company needed heavy-duty side gusset bags for their 5kg and 10kg kibble lines. They needed puncture-resistant material and a reliable supply chain.",
    challenge: "The client's previous supplier had inconsistent quality — bags would occasionally tear during filling, causing production line stoppages. They also needed faster lead times to manage seasonal demand spikes.",
    solution: "We developed a reinforced PET/NY/PE laminate structure with double-sealed bottom for extra strength. Custom printing in 8 colors. Established a 3-month rolling forecast system to ensure stock availability during peak seasons.",
    results: ["Zero bag failures in 18 months of production", "25% faster lead times vs previous supplier", "42% cost reduction on 10kg bag size", "Now their exclusive packaging supplier"],
  },
  {
    slug: "snack-brand-launch-with-stand-up-pouches",
    title: "Startup Snack Brand Launch",
    industry: "Food & Snacks",
    summary: "A California-based startup launching a new line of organic dried fruit snacks needed premium packaging with low MOQ to test the market before scaling.",
    challenge: "As a new brand, they needed: small initial quantity to test 3 SKUs, premium look to stand out on shelf, fast turnaround for their launch event, and flexibility to iterate on design.",
    solution: "We produced 5,000 stand-up pouches with MATT OPP/CPP structure, matte finish with spot UV logo highlight, resealable zipper, and tear notch. Turnaround from artwork to delivery: 18 days.",
    results: ["Successful launch — all 3 SKUs sold through initial run in 6 weeks", "Reordered 20,000 units within 2 months", "Won best packaging award at a regional food expo", "Now a long-term client with 12 SKUs"],
  },
];

export const metadata: Metadata = {
  title: "Case Studies | SZZYPack",
  description:
    "Real results from real clients. See how SZZYPack helped brands reduce costs, improve quality, and scale their packaging operations.",
  openGraph: {
    title: "Case Studies — Real Results from SZZYPack Clients",
    description:
      "See how brands reduced costs by up to 42% with SZZYPack's factory-direct flexible packaging. Real case studies from coffee, pet food, and snack brands.",
    url: "https://www.szzypack.com/cases",
  },
  alternates: {
    canonical: "https://www.szzypack.com/cases",
  },
};

export default function CasesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.szzypack.com" },
          { name: "Case Studies", url: "https://www.szzypack.com/cases" },
        ])}
      />
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-16 md:py-20">
        <div className="container-site text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-dark-900">Case Studies</h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Real results from real clients. See how brands use our packaging to reduce costs, improve
            quality, and scale their operations.
          </p>
        </div>
      </section>

      <section className="container-site py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {casesData.map((c) => (
            <Link
              key={c.slug}
              href={`/cases/${c.slug}`}
              className="group rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-primary-200 transition-all"
            >
              <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                {c.industry}
              </span>
              <h2 className="mt-3 text-lg font-semibold text-dark-900 group-hover:text-primary-700 transition-colors">
                {c.title}
              </h2>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-3">{c.summary}</p>
              <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary-700 opacity-0 group-hover:opacity-100 transition-opacity">
                Read case study <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-site pb-16 text-center">
        <h2 className="text-xl font-bold text-dark-900">Want to be our next case study?</h2>
        <p className="mt-2 text-gray-500">
          Contact us to discuss your project. We would love to help you achieve similar results.
        </p>
        <div className="mt-4">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-md bg-primary-700 px-6 py-3 text-white font-medium hover:bg-primary-800 transition-colors">
            Start Your Project <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
