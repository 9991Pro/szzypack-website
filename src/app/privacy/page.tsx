import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SZZYPack",
  description: "SZZYPack Privacy Policy — how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-16 md:py-20">
        <div className="container-site text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-dark-900">Privacy Policy</h1>
          <p className="mt-2 text-gray-500">Last updated: June 2026</p>
        </div>
      </section>

      <section className="container-site py-12">
        <div className="max-w-3xl mx-auto prose prose-gray max-w-none space-y-8">
          <div>
            <h2 className="text-xl font-bold text-dark-900 mb-3">1. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed">
              When you submit an inquiry, subscribe to our newsletter, or contact us through our website,
              we may collect the following information: name, company name, email address, phone number,
              WhatsApp number, industry, product preferences, and any other information you voluntarily provide.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-dark-900 mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed">
              We use your information to: respond to your inquiries and provide quotes; process and fulfill
              orders; send newsletters and marketing communications (with your consent); improve our website
              and services; comply with legal obligations.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-dark-900 mb-3">3. Data Storage & Security</h2>
            <p className="text-gray-600 leading-relaxed">
              Your data is stored on secure servers with encryption at rest and in transit. We implement
              industry-standard security measures to protect against unauthorized access, alteration,
              disclosure, or destruction of your personal information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-dark-900 mb-3">4. Data Sharing</h2>
            <p className="text-gray-600 leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share
              data with trusted service providers (email delivery, hosting, analytics) who assist in
              operating our website, subject to confidentiality agreements.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-dark-900 mb-3">5. Cookies</h2>
            <p className="text-gray-600 leading-relaxed">
              Our website uses essential cookies for functionality and analytics cookies to understand
              how visitors use our site. You can control cookie preferences through your browser settings.
              We use Plausible Analytics (privacy-friendly, no personal data collection) for website analytics.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-dark-900 mb-3">6. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed">
              You have the right to: access your personal data; request correction of inaccurate data;
              request deletion of your data; withdraw consent for marketing communications; unsubscribe
              from our newsletter at any time via the unsubscribe link in every email.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-dark-900 mb-3">7. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have questions about this Privacy Policy or wish to exercise your data rights,
              please contact us at{" "}
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
