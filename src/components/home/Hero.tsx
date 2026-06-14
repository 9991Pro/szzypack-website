import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/50 to-white">
      <div className="container-site py-20 md:py-28 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-medium mb-6">
            <CheckCircle className="h-3.5 w-3.5" />
            ISO/BRC Certified Manufacturer
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-dark-900 leading-tight">
            Custom Flexible Packaging{" "}
            <span className="text-primary-700">Factory Direct</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Stand-up pouches, flat bottom bags, spout pouches, and roll film — custom printed,
            ISO/BRC certified, MOQ from 500 pcs, free samples in 3 days.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-primary-700 text-white font-medium rounded-md hover:bg-primary-800 transition-colors shadow-sm"
            >
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center h-12 px-8 border border-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
            >
              How It Works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
