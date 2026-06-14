import { ClipboardList, PenTool, Cog, Truck, BarChart3 } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Submit Your Specs", desc: "Send us your design files, dimensions, material requirements, and target quantity." },
  { icon: PenTool, title: "Design & Sampling", desc: "Our team creates digital proofs then ships free physical samples within 3 days." },
  { icon: Cog, title: "Production", desc: "Once approved, we manufacture your order with full QC at every stage. Typical lead time: 15-20 days." },
  { icon: Truck, title: "Logistics", desc: "We handle FOB/CIF shipping by sea or air. Door-to-door delivery available to major ports worldwide." },
  { icon: BarChart3, title: "Ongoing Support", desc: "Re-order with one email. We keep your specs and plates on file for consistent quality every run." },
];

export function HowItWorks() {
  return (
    <section className="bg-gray-50 py-20 md:py-24">
      <div className="container-site">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-900">
            How It Works
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            From first inquiry to delivery at your doorstep — a simple 5-step process.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="relative text-center">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary-700 text-white mb-4">
                <s.icon className="h-6 w-6" />
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-[60%] w-[calc(100%-2rem)] h-0.5 bg-primary-200" />
              )}
              <h3 className="font-semibold text-dark-900">
                {i + 1}. {s.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
