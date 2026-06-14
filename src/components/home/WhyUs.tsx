import { Shield, Truck, Palette, Users, Factory, BadgeCheck } from "lucide-react";

const reasons = [
  {
    icon: Factory,
    title: "Factory Direct",
    desc: "No middlemen. You communicate directly with our engineering team for faster turnaround and lower cost.",
  },
  {
    icon: BadgeCheck,
    title: "Certified Quality",
    desc: "ISO 9001:2015 and BRC certified. Every batch undergoes strict QC with detailed reports.",
  },
  {
    icon: Palette,
    title: "Custom Everything",
    desc: "Size, shape, material, finish, printing — fully customized to your brand and product specs.",
  },
  {
    icon: Truck,
    title: "Free Samples in 3 Days",
    desc: "Request free pre-production samples. We ship within 3 business days so you can test before committing.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    desc: "One-on-one project manager from inquiry to delivery. WhatsApp, email, or video call — your choice.",
  },
  {
    icon: Shield,
    title: "Low MOQ, Fast Lead Time",
    desc: "Start at 500 pieces. Typical production lead time is 15-20 days, with rush options available.",
  },
];

export function WhyUs() {
  return (
    <section className="container-site py-20 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-dark-900">
          Why Work With SZZYPack
        </h2>
        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
          We've spent 15+ years perfecting the flexible packaging supply chain so you don't have to.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {reasons.map((r) => (
          <div key={r.title} className="text-center sm:text-left">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-primary-50 text-primary-700 mb-4">
              <r.icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-dark-900">{r.title}</h3>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">{r.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
