import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Factory, BadgeCheck, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "About Us | SZZYPack",
  description:
    "Learn about SZZYPack — an ISO/BRC certified flexible packaging manufacturer with 15+ years of experience serving brands worldwide from our Shenzhen factory.",
  openGraph: {
    title: "About SZZYPack — Factory-Direct Flexible Packaging Manufacturer",
    description:
      "ISO/BRC certified flexible packaging manufacturer with 15+ years of experience serving brands worldwide from our Shenzhen factory.",
    url: "https://www.szzypack.com/about",
  },
  alternates: {
    canonical: "https://www.szzypack.com/about",
  },
};

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "500+", label: "Global Clients" },
  { value: "30+", label: "Export Countries" },
  { value: "50M+", label: "Pouches Produced/Year" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.szzypack.com" },
          { name: "About Us", url: "https://www.szzypack.com/about" },
        ])}
      />
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-16 md:py-20">
        <div className="container-site">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-dark-900">
              Factory-Direct Flexible Packaging
            </h1>
            <p className="mt-4 text-gray-500 text-lg leading-relaxed">
              Since 2010, we have been manufacturing premium flexible packaging for brands in over 30 countries.
              No middlemen, no trading companies — just factory-direct quality, pricing, and service.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-site -mt-8 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-lg border border-gray-100 p-6 text-center shadow-sm">
              <div className="text-2xl md:text-3xl font-bold text-primary-700">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="container-site pb-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-dark-900 mb-4">Our Story</h2>
          <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
            <p>
              SZZYPack was founded in 2010 in Shenzhen, China's manufacturing heartland, with a simple mission:
              make professional-grade flexible packaging accessible to brands of all sizes.
            </p>
            <p>
              What started as a small workshop with two bag-making machines has grown into a 15,000 m² facility
              with 8 production lines covering the full chain — film extrusion, printing, lamination, slitting,
              and bag-making — all under one roof.
            </p>
            <p>
              Today, we produce over 50 million pouches annually for clients ranging from startup coffee roasters
              to multinational food brands. Our ISO 9001 and BRC Grade A certifications reflect our commitment
              to quality, safety, and continuous improvement.
            </p>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-dark-900 py-16">
        <div className="container-site">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Why Choose SZZYPack</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Factory,
                title: "Factory Direct",
                desc: "No middlemen, no markups. You work directly with the manufacturer.",
              },
              {
                icon: BadgeCheck,
                title: "Certified Quality",
                desc: "ISO 9001, BRC Grade A, FDA-compliant materials.",
              },
              {
                icon: Users,
                title: "Dedicated Support",
                desc: "English-speaking project managers from inquiry to delivery.",
              },
              {
                icon: Globe,
                title: "Global Logistics",
                desc: "Air, sea, and DDP door-to-door to 30+ countries.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary-700/20 mb-4">
                  <item.icon className="h-6 w-6 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-site py-16 text-center">
        <h2 className="text-2xl font-bold text-dark-900">Ready to work together?</h2>
        <p className="mt-2 text-gray-500 max-w-xl mx-auto">
          Share your project details and we will get back to you with a quote within 24 hours.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-md bg-primary-700 px-6 py-3 text-white font-medium hover:bg-primary-800 transition-colors">
            Get a Quote <ArrowRight className="h-4 w-4" />
          </Link>
          <Button asChild variant="outline" size="lg">
            <Link href="/how-it-works">How It Works</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
