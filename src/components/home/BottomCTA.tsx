import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export function BottomCTA() {
  return (
    <section className="bg-primary-700 py-20 md:py-24">
      <div className="container-site text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Ready to Start Your Packaging Project?
        </h2>
        <p className="mt-4 text-lg text-primary-100 max-w-2xl mx-auto">
          Free samples in 3 days. Dedicated project manager. Factory-direct pricing with no hidden costs.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-white text-primary-700 font-medium rounded-md hover:bg-primary-50 transition-colors shadow-sm"
          >
            <Mail className="h-4 w-4" />
            Request a Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/how-it-works"
            className="inline-flex items-center justify-center h-12 px-8 border border-primary-300 text-white font-medium rounded-md hover:bg-primary-600 transition-colors"
          >
            See Our Process
          </Link>
        </div>
      </div>
    </section>
  );
}
