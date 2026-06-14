import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | SZZYPack",
  description: "SZZYPack Terms of Service — conditions governing the use of our website and services.",
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-16 md:py-20">
        <div className="container-site text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-dark-900">Terms of Service</h1>
          <p className="mt-2 text-gray-500">Last updated: June 2026</p>
        </div>
      </section>

      <section className="container-site py-12">
        <div className="max-w-3xl mx-auto prose prose-gray max-w-none space-y-8">
          <div>
            <h2 className="text-xl font-bold text-dark-900 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing and using the SZZYPack website (szzypack.com), you agree to be bound by
              these Terms of Service. If you do not agree, please do not use our website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-dark-900 mb-3">2. Services Description</h2>
            <p className="text-gray-600 leading-relaxed">
              SZZYPack provides custom flexible packaging manufacturing services. All product
              specifications, pricing, and lead times provided through our website or communications
              are estimates and subject to confirmation upon formal quotation.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-dark-900 mb-3">3. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed">
              All content on this website — including text, images, logos, and design — is the property
              of SZZYPack and protected by applicable copyright and trademark laws. Client artwork and
              designs remain the intellectual property of the respective clients.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-dark-900 mb-3">4. Orders & Payment</h2>
            <p className="text-gray-600 leading-relaxed">
              Orders are confirmed upon receipt of deposit payment and artwork approval. Final payment
              is due before shipment unless otherwise agreed in writing. All prices are in USD unless
              otherwise stated. Prices are subject to change without notice; confirmed quotations are
              valid for 30 days.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-dark-900 mb-3">5. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              SZZYPack shall not be liable for any indirect, incidental, or consequential damages arising
              from the use of our website or services. Our liability for any claim related to product
              defects is limited to the replacement of the defective products or refund of the purchase price.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-dark-900 mb-3">6. Governing Law</h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the People's
              Republic of China. Any disputes shall be resolved through negotiation in good faith, and
              if unresolved, through arbitration in Shenzhen, China.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-dark-900 mb-3">7. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              For questions about these Terms, please contact us at{" "}
              <a href="mailto:info@szzypack.com" className="text-primary-600 hover:underline">
                info@szzypack.com
              </a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
