import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/shared/JsonLd";
import { faqSchema, breadcrumbSchema } from "@/lib/jsonld";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | SZZYPack",
  description:
    "Find answers to common questions about ordering, customization, production, shipping, quality, and partnerships at SZZYPack.",
  openGraph: {
    title: "FAQ — Flexible Packaging Questions Answered | SZZYPack",
    description:
      "Everything you need to know about working with SZZYPack — from samples and MOQs to shipping and certifications.",
    url: "https://www.szzypack.com/faq",
  },
  alternates: {
    canonical: "https://www.szzypack.com/faq",
  },
};

const faqCategories = [
  {
    title: "Ordering & MOQ",
    items: [
      {
        q: "What is your minimum order quantity (MOQ)?",
        a: "Our standard MOQ is 500 pieces per design. For sample orders, we can produce as few as 100 pieces. We understand that startups and small brands need flexibility, so we work with you to find a solution that fits your budget.",
      },
      {
        q: "Can I order samples before placing a bulk order?",
        a: "Yes! We offer free samples of our existing stock. For custom-printed samples, there is a small setup fee (typically $50-150 depending on complexity), which is refunded when you place your first bulk order. Samples ship in 3-5 business days.",
      },
      {
        q: "What are your payment terms?",
        a: "For new customers: 50% deposit with order, 50% before shipment. For repeat customers: we offer net 30 terms after 3 completed orders. We accept T/T bank transfer, Letter of Credit (L/C for orders over $10,000), and PayPal for sample orders.",
      },
      {
        q: "Do you offer volume discounts?",
        a: "Yes. Pricing is tiered by quantity. Typical tiers: 500-1,000 / 1,000-5,000 / 5,000-10,000 / 10,000-50,000 / 50,000+. The larger your order, the lower your per-unit cost. Contact us for a detailed quote.",
      },
    ],
  },
  {
    title: "Customization & Design",
    items: [
      {
        q: "What customization options are available?",
        a: "Virtually everything: size, material structure, thickness, printing (up to 10 colors gravure), closures (zipper, tin tie, slider, valve), finishes (matte, gloss, soft-touch, spot UV, foil stamping), windows, tear notches, hang holes, and custom shapes.",
      },
      {
        q: "Do you provide design services?",
        a: "Yes, our in-house design team can help with artwork adaptation, color proofing, and structural design. If you have print-ready AI/PDF files, we can use them directly. If you need design from scratch, we can recommend trusted designers.",
      },
      {
        q: "What file formats do you accept for artwork?",
        a: "We accept Adobe Illustrator (.ai), PDF, EPS, and high-resolution PSD files. Files should be in CMYK color mode at 300 DPI minimum. Our prepress team will check your files and provide a digital proof before printing.",
      },
      {
        q: "How long does the proofing process take?",
        a: "Digital proofs are provided within 1-2 business days after artwork approval. Physical color proofs (if requested) take 3-5 business days plus shipping. We require your written confirmation on proofs before production begins.",
      },
    ],
  },
  {
    title: "Production & Lead Times",
    items: [
      {
        q: "What are your typical lead times?",
        a: "Standard production: 10-15 business days for most pouch types. Complex orders (custom shapes, special finishes): 15-20 business days. Roll film: 15-20 business days. These timelines start after artwork approval and deposit receipt.",
      },
      {
        q: "Can you handle rush orders?",
        a: "Yes, rush production is available for an additional 20-30% surcharge, reducing lead time to 7-10 business days for standard pouches. Rush availability depends on current production capacity. Contact us to check.",
      },
      {
        q: "Where is your factory located?",
        a: "Our main production facility is in Shenzhen, China, with a satellite facility in Dongguan for high-volume roll film production. Both facilities are ISO 9001:2015 and BRC certified.",
      },
    ],
  },
  {
    title: "Shipping & Delivery",
    items: [
      {
        q: "What shipping methods do you offer?",
        a: "Air freight (5-7 days), sea freight (25-35 days), and express courier (DHL/UPS/FedEx, 3-5 days). We also offer door-to-door DDP (Delivered Duty Paid) service to major ports and addresses in the US and Europe.",
      },
      {
        q: "Do you ship worldwide?",
        a: "Yes, we ship to customers in over 30 countries. Our main markets are North America, Europe, Australia, and Southeast Asia. We have experience with customs documentation for all major markets.",
      },
      {
        q: "How are the products packaged for shipping?",
        a: "Pouches are packed in corrugated export cartons (typically 500-1,000 pcs per carton depending on size). Cartons are palletized and stretch-wrapped. For sea freight, we use moisture-resistant packaging. All shipments include packing lists and commercial invoices.",
      },
    ],
  },
  {
    title: "Quality & Certifications",
    items: [
      {
        q: "Are your materials food-safe?",
        a: "Yes. All our food-contact materials are FDA and EU 10/2011 compliant. We only use raw materials from certified suppliers, and we maintain material traceability throughout production. Certificates of compliance are available upon request.",
      },
      {
        q: "What certifications do you hold?",
        a: "ISO 9001:2015 (Quality Management), BRC Global Standard for Packaging (Grade A), and SEDEX SMETA (Ethical Trade). We also support customers requiring halal, kosher, or organic certification by coordinating with certified material suppliers.",
      },
      {
        q: "What quality control processes do you have?",
        a: "We perform incoming material inspection, in-process QC at each production stage (printing, lamination, slitting, bag-making), and final random sampling per AQL 2.5 standards. Every batch includes seal strength, barrier property, and dimensional testing.",
      },
    ],
  },
  {
    title: "Partnerships",
    items: [
      {
        q: "Do you offer exclusivity or NDA agreements?",
        a: "Yes, we are happy to sign Non-Disclosure Agreements (NDAs) and can offer exclusivity on custom mold investments or proprietary designs. Your intellectual property and brand identity are protected.",
      },
      {
        q: "Do you work with packaging distributors?",
        a: "Absolutely. Many of our clients are packaging distributors who resell our products to end users. We offer white-label shipping (your branding on cartons and documentation) and competitive trade pricing for recurring orders.",
      },
    ],
  },
];

export default function FAQPage() {
  const allItems = faqCategories.flatMap((cat) =>
    cat.items.map((item) => ({ question: item.q, answer: item.a }))
  );

  return (
    <>
      <JsonLd data={faqSchema(allItems)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.szzypack.com" },
          { name: "FAQ", url: "https://www.szzypack.com/faq" },
        ])}
      />
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-16 md:py-20">
        <div className="container-site text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-dark-900">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Everything you need to know about working with SZZYPack — from samples to shipping.
          </p>
        </div>
      </section>

      <section className="container-site py-12 md:py-16">
        <div className="max-w-3xl mx-auto space-y-12">
          {faqCategories.map((cat) => (
            <div key={cat.title}>
              <h2 className="text-xl font-bold text-dark-900 mb-4">{cat.title}</h2>
              <div className="space-y-3">
                {cat.items.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-lg border border-gray-200 bg-white"
                  >
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-gray-900 hover:text-primary-700 transition-colors">
                      {item.q}
                      <span className="ml-2 shrink-0 text-gray-400 group-open:hidden">+</span>
                      <span className="ml-2 shrink-0 text-gray-400 hidden group-open:block">-</span>
                    </summary>
                    <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-site pb-16 text-center">
        <h2 className="text-xl font-bold text-dark-900">Still have questions?</h2>
        <p className="mt-2 text-gray-500">
          Our team is ready to help. Reach out and we will get back to you within 24 hours.
        </p>
        <div className="mt-4">
          <Button asChild size="lg">
            <a href="/contact">Contact Us</a>
          </Button>
        </div>
      </section>
    </>
  );
}
