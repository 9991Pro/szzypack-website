import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";

interface CaseData {
  slug: string;
  title: string;
  industry: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
}

const casesData: CaseData[] = [
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

export async function generateStaticParams() {
  return casesData.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseItem = casesData.find((c) => c.slug === slug);
  if (!caseItem) return { title: "Case Study Not Found" };
  return {
    title: `${caseItem.title} | SZZYPack`,
    description: caseItem.summary,
    openGraph: {
      title: `${caseItem.title} — SZZYPack Case Study`,
      description: caseItem.summary,
      url: `https://www.szzypack.com/cases/${caseItem.slug}`,
    },
    alternates: {
      canonical: `https://www.szzypack.com/cases/${caseItem.slug}`,
    },
  };
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseItem = casesData.find((c) => c.slug === slug);
  if (!caseItem) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.szzypack.com" },
          { name: "Case Studies", url: "https://www.szzypack.com/cases" },
          { name: caseItem.title, url: `https://www.szzypack.com/cases/${caseItem.slug}` },
        ])}
      />
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-12 md:py-16">
        <div className="container-site">
          <Link href="/cases" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-700 transition-colors mb-4">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Case Studies
          </Link>
          <span className="inline-block text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full mb-3">
            {caseItem.industry}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-dark-900">{caseItem.title}</h1>
          <p className="mt-4 text-gray-500 text-lg max-w-3xl">{caseItem.summary}</p>
        </div>
      </section>

      <section className="container-site py-12 md:py-16">
        <div className="max-w-3xl space-y-10">
          <div>
            <h2 className="text-xl font-bold text-dark-900 mb-3">The Challenge</h2>
            <p className="text-gray-600 leading-relaxed">{caseItem.challenge}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-dark-900 mb-3">Our Solution</h2>
            <p className="text-gray-600 leading-relaxed">{caseItem.solution}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-dark-900 mb-3">Results</h2>
            <ul className="space-y-3">
              {caseItem.results.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-gray-700">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-site pb-16 text-center">
        <h2 className="text-xl font-bold text-dark-900">Want similar results?</h2>
        <p className="mt-2 text-gray-500">
          Contact us to discuss how we can help with your packaging needs.
        </p>
        <div className="mt-4">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-md bg-primary-700 px-6 py-3 text-white font-medium hover:bg-primary-800 transition-colors">
            Get a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
