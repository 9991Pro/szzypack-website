import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, Palette, Factory, Ship, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "How It Works | SZZYPack",
  description:
    "Our 5-step process from inquiry to delivery. Learn how we make custom flexible packaging simple, fast, and reliable.",
  openGraph: {
    title: "How It Works — Custom Flexible Packaging in 5 Steps | SZZYPack",
    description:
      "From inquiry to delivery in as fast as 3 weeks. Our streamlined 5-step process makes custom packaging simple.",
    url: "https://www.szzypack.com/how-it-works",
  },
  alternates: {
    canonical: "https://www.szzypack.com/how-it-works",
  },
};

const steps = [
  {
    step: "01",
    icon: FileText,
    title: "Tell Us Your Needs",
    desc: "Fill out our inquiry form with your product type, dimensions, material preferences, quantity, and artwork files. The more detail you provide, the more accurate your quote will be.",
    time: "Day 1",
  },
  {
    step: "02",
    icon: Palette,
    title: "Review Quote & Proof",
    desc: "Our team reviews your requirements and sends a detailed quotation within 24 hours. Once approved, our design team prepares a digital proof showing your artwork on the actual pouch structure.",
    time: "Day 1–3",
  },
  {
    step: "03",
    icon: Factory,
    title: "Production",
    desc: "After you approve the proof and pay the deposit, production begins. Our integrated facility handles everything from printing to bag-making in-house. You receive weekly progress updates with photos.",
    time: "10–18 days",
  },
  {
    step: "04",
    icon: CheckCircle,
    title: "Quality Check & Approval",
    desc: "Before shipping, our QC team performs AQL 2.5 sampling, seal strength tests, and dimensional checks. We send photos and test reports for your approval before releasing the shipment.",
    time: "Day 15–20",
  },
  {
    step: "05",
    icon: Ship,
    title: "Shipping & Delivery",
    desc: "We arrange shipping via your preferred method — air freight (5–7 days), sea freight (25–35 days), or express courier (3–5 days). Tracking information is shared immediately.",
    time: "3–35 days",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.szzypack.com" },
          { name: "How It Works", url: "https://www.szzypack.com/how-it-works" },
        ])}
      />
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-16 md:py-20">
        <div className="container-site text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-dark-900">How It Works</h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            From your first inquiry to delivery at your door — our streamlined 5-step process
            makes custom packaging simple.
          </p>
        </div>
      </section>

      <section className="container-site py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          {steps.map((s, i) => (
            <div key={s.step} className="relative flex gap-6 pb-12 last:pb-0">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute left-[27px] top-14 bottom-0 w-px bg-gray-200" />
              )}
              {/* Number circle */}
              <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-700 text-white font-bold text-lg shadow-md">
                {s.step}
              </div>
              {/* Content */}
              <div className="pt-1">
                <div className="flex items-center gap-3 mb-2">
                  <s.icon className="h-5 w-5 text-primary-600" />
                  <h2 className="text-xl font-bold text-dark-900">{s.title}</h2>
                  <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                    {s.time}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-dark-900 py-16">
        <div className="container-site text-center">
          <h2 className="text-2xl font-bold text-white">Total timeline: as fast as 3 weeks</h2>
          <p className="mt-3 text-gray-400 max-w-xl mx-auto">
            From artwork approval to your doorstep. Rush production available for even faster turnaround.
          </p>
          <div className="mt-6">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-md bg-primary-700 px-6 py-3 text-white font-medium hover:bg-primary-800 transition-colors">
              Start Your Project <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
