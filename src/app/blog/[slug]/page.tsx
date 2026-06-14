import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog";
import { MDXRenderer } from "@/components/blog/MDXRenderer";
import { BlogCard } from "@/components/blog/BlogCard";
import { JsonLd } from "@/components/shared/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/jsonld";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function readingTime(content: string) {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.data.title} | SZZYPack Blog`,
    description: post.data.description,
    openGraph: {
      title: post.data.title,
      description: post.data.description,
      type: "article",
      publishedTime: post.data.date,
      authors: [post.data.author],
      url: `https://www.szzypack.com/blog/${post.slug}`,
    },
    alternates: {
      canonical: `https://www.szzypack.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  const { data, content } = post;
  const related = await getRelatedPosts(post);

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.szzypack.com" },
          { name: "Blog", url: "https://www.szzypack.com/blog" },
          { name: data.title, url: `https://www.szzypack.com/blog/${post.slug}` },
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
            <Link href="/blog" className="hover:text-primary-700 transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-gray-900 truncate max-w-[200px]">{data.title}</span>
          </nav>
        </div>
      </div>

      {/* Article header */}
      <article className="container-site py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-700 transition-colors mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Blog
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {data.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag.toLowerCase()}`}
                className="text-xs font-medium text-primary-600 bg-primary-50 px-2.5 py-0.5 rounded-full hover:bg-primary-100 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-dark-900 leading-tight">
            {data.title}
          </h1>
          <p className="mt-4 text-lg text-gray-500 leading-relaxed">
            {data.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-400 border-b border-gray-100 pb-6">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {data.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(data.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {readingTime(content)} min read
            </span>
          </div>

          {/* Article body */}
          <div className="prose prose-gray max-w-none mt-8">
            <MDXRenderer content={content} />
          </div>

          {/* CTA after article */}
          <div className="mt-12 rounded-xl bg-gradient-to-r from-primary-700 to-primary-800 p-6 md:p-8 text-center text-white">
            <h2 className="text-xl font-bold">Ready to start your packaging project?</h2>
            <p className="mt-2 text-primary-100 max-w-md mx-auto">
              Get free samples in 3 business days and a quote within 24 hours.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-4 rounded-md bg-white px-6 py-2.5 text-sm font-medium text-primary-700 hover:bg-primary-50 transition-colors"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="bg-gray-50 py-12 md:py-16 border-t border-gray-100">
          <div className="container-site">
            <h2 className="text-xl font-bold text-dark-900 mb-6">Related Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

async function getRelatedPosts(
  current: Awaited<ReturnType<typeof getBlogPost>>,
  limit = 3
) {
  if (!current) return [];
  const all = await getAllBlogPosts();
  const currentTags = new Set(current.data.tags.map((t) => t.toLowerCase()));
  return all
    .filter((p) => p.slug !== current.slug)
    .map((p) => ({
      post: p,
      score: p.data.tags.filter((t) => currentTags.has(t.toLowerCase())).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}
