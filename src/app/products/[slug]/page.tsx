import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, ArrowLeft } from "lucide-react";
import { getContentFile, getContentFiles } from "@/lib/content";
import type { Product } from "@/lib/products";
import { SpecTable } from "@/components/product/SpecTable";
import { StickyCTA } from "@/components/product/StickyCTA";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/shared/JsonLd";
import { productSchema, breadcrumbSchema } from "@/lib/jsonld";

export async function generateStaticParams() {
  const products = await getContentFiles("products");
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getContentFile<Product>("products", slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.data.title} | SZZYPack`,
    description: product.data.description,
    openGraph: {
      title: `${product.data.title} — SZZYPack`,
      description: product.data.description,
      url: `https://www.szzypack.com/products/${product.slug}`,
    },
    alternates: {
      canonical: `https://www.szzypack.com/products/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getContentFile<Product>("products", slug);

  if (!product) notFound();

  const { data } = product;

  // Parse markdown sections for rendering
  const sections = product.content.split(/\n## /).map((s) => {
    const lines = s.trim().split("\n");
    const heading = lines[0].replace(/^## /, "");
    const body = lines.slice(1).join("\n");
    return { heading, body };
  });

  // First section has no heading (it's before the first ##)
  const firstSection = sections[0];
  const restSections = sections.slice(1);

  return (
    <>
      <JsonLd data={productSchema(product)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.szzypack.com" },
          { name: "Products", url: "https://www.szzypack.com/products" },
          { name: data.title, url: `https://www.szzypack.com/products/${product.slug}` },
        ])}
      />
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-site py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-700 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-primary-700 transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-gray-900">{data.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="container-site py-12 md:py-16">
        <div className="grid lg:grid-cols-7 gap-10">
          {/* Content */}
          <div className="lg:col-span-4">
            <h1 className="text-3xl md:text-4xl font-bold text-dark-900">
              {data.title}
            </h1>
            <p className="mt-4 text-gray-500 text-lg leading-relaxed">
              {data.description}
            </p>

            {/* Features */}
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {data.features.map((f) => (
                <div key={f} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-700">{f}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={`/contact?product=${encodeURIComponent(data.title)}`}>
                <Button variant="primary" size="lg">
                  Request Free Sample / Quote
                </Button>
              </Link>
              <a
                href={`https://wa.me/8613800000000?text=${encodeURIComponent(`Hi, I'd like to know more about ${data.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>

          {/* Sidebar: Specs */}
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <h3 className="text-lg font-semibold text-dark-900 mb-4">Technical Specifications</h3>
              <SpecTable specs={data.specifications} />

              {/* Industries */}
              {data.industries.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Suitable Industries</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.industries.map((ind) => (
                      <Link
                        key={ind}
                        href={`/industries/${ind.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-xs bg-primary-50 text-primary-700 px-3 py-1 rounded-full hover:bg-primary-100 transition-colors"
                      >
                        {ind}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Content */}
      <section className="container-site py-12 md:py-16 border-t border-gray-100">
        <div className="max-w-3xl">
          {/* First section (overview) */}
          {firstSection && firstSection.body && (
            <div className="prose prose-gray max-w-none">
              {renderMarkdownSection(firstSection)}
            </div>
          )}

          {/* Rest sections */}
          {restSections.map((s) => (
            <div key={s.heading} className="mt-12">
              <h2 className="text-2xl font-bold text-dark-900 mb-4">{s.heading}</h2>
              <div className="prose prose-gray max-w-none">
                {renderMarkdownSection(s)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      {data.relatedProducts && data.relatedProducts.length > 0 && (
        <section className="bg-gray-50 py-16 md:py-20 border-t border-gray-100">
          <div className="container-site">
            <h2 className="text-2xl font-bold text-dark-900 text-center mb-10">
              Related Products
            </h2>
            <RelatedProducts slugs={data.relatedProducts} />
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="container-site py-16 md:py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-dark-900">
          Ready to start your {data.title.toLowerCase()} project?
        </h2>
        <p className="mt-3 text-gray-500 max-w-xl mx-auto">
          Free samples in 3 business days, MOQ just 500 pieces. Share your requirements and get a quote within 24 hours.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <Link
            href={`/contact?product=${encodeURIComponent(data.title)}`}
            className="inline-flex items-center gap-2 rounded-md bg-primary-700 px-6 py-3 text-white font-medium hover:bg-primary-800 transition-colors"
          >
            Request Quote <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-6 py-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to All Products
          </Link>
        </div>
      </section>

      <StickyCTA productName={data.title} />
    </>
  );
}

function renderMarkdownSection(section: { heading: string; body: string }) {
  return section.body
    .split("\n")
    .map((line, i) => {
      // Very basic markdown rendering
      if (line.startsWith("### ")) {
        return (
          <h3 key={i} className="text-lg font-semibold text-dark-900 mt-6 mb-2">
            {line.slice(4)}
          </h3>
        );
      }
      if (line.startsWith("- **")) {
        const match = line.match(/^- \*\*(.+?)\*\*[：:]\s*(.+)$/);
        if (match) {
          return (
            <div key={i} className="flex gap-2 text-sm text-gray-700 ml-4">
              <span className="font-semibold text-dark-800">{match[1]}:</span>
              <span>{match[2]}</span>
            </div>
          );
        }
        return (
          <li key={i} className="text-gray-700 ml-4">
            {line.replace(/^\- /, "").replace(/\*\*(.+?)\*\*/g, "$1")}
          </li>
        );
      }
      if (line.startsWith("- ")) {
        return (
          <li key={i} className="text-gray-700 ml-4">
            {line.slice(2)}
          </li>
        );
      }
      if (line.startsWith("| ")) {
        const cells = line.split("|").filter((c) => c.trim());
        if (cells.length >= 3 && cells[0].includes("---")) return null;
        return (
          <div key={i} className="flex gap-4 text-sm">
            {cells.map((cell, j) => (
              <span
                key={j}
                className={j === 0 ? "font-semibold text-dark-800" : "text-gray-700"}
              >
                {cell.trim()}
              </span>
            ))}
          </div>
        );
      }
      if (line.trim() === "") {
        return <div key={i} className="h-3" />;
      }
      return (
        <p key={i} className="text-gray-700 leading-relaxed">
          {line.replace(/\*\*(.+?)\*\*/g, "$1")}
        </p>
      );
    });
}

async function RelatedProducts({ slugs }: { slugs: string[] }) {
  const allProducts = await getContentFiles<Product>("products");
  const related = allProducts
    .filter((p) => slugs.includes(p.slug))
    .sort((a, b) => a.data.order - b.data.order);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {related.map((p) => (
        <Link
          key={p.slug}
          href={`/products/${p.slug}`}
          className="group rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md hover:border-primary-200 transition-all"
        >
          <h3 className="text-lg font-semibold text-dark-900 group-hover:text-primary-700 transition-colors">
            {p.data.title}
          </h3>
          <p className="mt-2 text-sm text-gray-500 line-clamp-2">{p.data.description}</p>
          <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary-700 opacity-0 group-hover:opacity-100 transition-opacity">
            Learn more <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>
      ))}
    </div>
  );
}
