import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getBlogPostsByTag, getAllTags } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map(({ tag }) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const displayTag = tag.charAt(0).toUpperCase() + tag.slice(1);
  return {
    title: `"${displayTag}" Articles | SZZYPack Blog`,
    description: `Browse all SZZYPack blog articles tagged with "${displayTag}" — expert guides on flexible packaging.`,
    openGraph: {
      title: `"${displayTag}" Articles — SZZYPack Blog`,
      description: `Browse flexible packaging guides and tips tagged "${displayTag}" — from SZZYPack's packaging experts.`,
      url: `https://www.szzypack.com/blog/tag/${tag}`,
    },
    alternates: {
      canonical: `https://www.szzypack.com/blog/tag/${tag}`,
    },
  };
}

export default async function BlogTagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = await getBlogPostsByTag(tag);

  if (posts.length === 0) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.szzypack.com" },
          { name: "Blog", url: "https://www.szzypack.com/blog" },
          { name: `Tag: ${tag}`, url: `https://www.szzypack.com/blog/tag/${tag}` },
        ])}
      />
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-12 md:py-16">
        <div className="container-site">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-700 transition-colors mb-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Blog
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-dark-900">
            Tag: <span className="text-primary-700">{tag}</span>
          </h1>
          <p className="mt-2 text-gray-500">
            {posts.length} article{posts.length > 1 ? "s" : ""} tagged with &ldquo;{tag}&rdquo;
          </p>
        </div>
      </section>

      <section className="container-site py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
