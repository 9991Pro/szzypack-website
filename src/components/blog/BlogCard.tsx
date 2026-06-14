import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPostWithContent } from "@/lib/blog";

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

export function BlogCard({ post }: { post: BlogPostWithContent }) {
  return (
    <article className="group rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg hover:border-primary-200 transition-all">
      <Link href={`/blog/${post.slug}`} className="block p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.data.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-lg font-semibold text-dark-900 group-hover:text-primary-700 transition-colors leading-snug">
          {post.data.title}
        </h2>
        <p className="mt-2 text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {post.data.description}
        </p>
        <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.data.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {readingTime(post.content)} min read
          </span>
        </div>
        <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-700 opacity-0 group-hover:opacity-100 transition-opacity">
          Read more <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </Link>
    </article>
  );
}

export function BlogCardFeatured({ post }: { post: BlogPostWithContent }) {
  return (
    <article className="group rounded-xl border-2 border-primary-100 bg-gradient-to-br from-primary-50/50 to-white overflow-hidden hover:shadow-lg hover:border-primary-300 transition-all">
      <Link href={`/blog/${post.slug}`} className="block p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-xs font-semibold text-primary-700 bg-primary-100 px-2.5 py-1 rounded-full">
            Featured
          </span>
          {post.data.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-dark-900 group-hover:text-primary-700 transition-colors">
          {post.data.title}
        </h2>
        <p className="mt-3 text-gray-500 leading-relaxed">
          {post.data.description}
        </p>
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formatDate(post.data.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {readingTime(post.content)} min read
          </span>
        </div>
        <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary-700 opacity-0 group-hover:opacity-100 transition-opacity">
          Read full article <ArrowRight className="h-4 w-4" />
        </div>
      </Link>
    </article>
  );
}
