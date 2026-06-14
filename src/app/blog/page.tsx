import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts, getFeaturedBlogPosts, getAllTags } from "@/lib/blog";
import { BlogCard, BlogCardFeatured } from "@/components/blog/BlogCard";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Blog | SZZYPack",
  description:
    "Expert guides on flexible packaging — bag selection, MOQ tips, artwork preparation, sustainability, and industry trends.",
  openGraph: {
    title: "SZZYPack Blog — Flexible Packaging Guides & Tips",
    description:
      "Expert guides on flexible packaging — bag selection, MOQ tips, artwork preparation, sustainability, and industry trends.",
    url: "https://www.szzypack.com/blog",
  },
  alternates: {
    canonical: "https://www.szzypack.com/blog",
  },
};

export default async function BlogPage() {
  const [featured, all, tags] = await Promise.all([
    getFeaturedBlogPosts(),
    getAllBlogPosts(),
    getAllTags(),
  ]);

  const nonFeatured = all.filter((p) => !featured.some((f) => f.slug === p.slug));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.szzypack.com" },
          { name: "Blog", url: "https://www.szzypack.com/blog" },
        ])}
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-16 md:py-20">
        <div className="container-site text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-dark-900">
            SZZYPack Blog
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Expert guides on flexible packaging — from bag selection and MOQ tips to
            artwork preparation and sustainability.
          </p>
        </div>
      </section>

      <section className="container-site py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Featured */}
            {featured.length > 0 && (
              <div className="space-y-4">
                {featured.map((post) => (
                  <BlogCardFeatured key={post.slug} post={post} />
                ))}
              </div>
            )}

            {/* All posts grid */}
            {nonFeatured.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-dark-900 mb-6">All Articles</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {nonFeatured.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            )}

            {all.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500">No articles yet. Check back soon.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-8">
              {/* Tags */}
              {tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-dark-900 uppercase tracking-wider mb-4">
                    Browse by Topic
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(({ tag, count }) => (
                      <Link
                        key={tag}
                        href={`/blog/tag/${tag}`}
                        className="text-sm px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-colors"
                      >
                        {tag}
                        <span className="ml-1 text-gray-400 text-xs">({count})</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="rounded-xl bg-primary-700 p-6 text-white">
                <h3 className="font-semibold text-lg">Need custom packaging?</h3>
                <p className="mt-2 text-sm text-primary-100 leading-relaxed">
                  Free samples in 3 business days. MOQ from just 500 pieces.
                </p>
                <Link
                  href="/contact"
                  className="inline-block mt-4 rounded-md bg-white px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-50 transition-colors"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
