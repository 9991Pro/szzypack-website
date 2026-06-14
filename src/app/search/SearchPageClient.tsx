"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Loader2 } from "lucide-react";
import Link from "next/link";
import type { SearchDocument } from "@/lib/search";

const typeLabel: Record<string, string> = {
  product: "Product",
  blog: "Blog",
  case: "Case Study",
  page: "Page",
};

export function SearchPageClient() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const doSearch = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.results || []);
      }
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) {
      setQuery(q);
      doSearch(q);
    }
  }, [doSearch]);

  useEffect(() => {
    const timer = setTimeout(() => doSearch(query), 300);
    return () => clearTimeout(timer);
  }, [query, doSearch]);

  return (
    <div className="min-h-[60vh]">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-16 md:py-20">
        <div className="container-site">
          <h1 className="text-3xl md:text-4xl font-bold text-dark-900 text-center">
            Search
          </h1>
          <div className="mt-6 max-w-lg mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, guides, case studies..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-shadow"
              autoFocus
            />
            {loading && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 animate-spin" />
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="container-site py-12">
        {searched && results.length === 0 && !loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No results found for &quot;{query}&quot;</p>
            <p className="mt-2 text-sm text-gray-400">
              Try a different search term or{" "}
              <Link href="/contact" className="text-primary-600 hover:underline">
                contact us
              </Link>{" "}
              directly.
            </p>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-4">
            {results.map((r) => (
              <Link
                key={r.id}
                href={r.href}
                className="block rounded-lg border border-gray-100 p-4 hover:shadow-sm hover:border-primary-200 transition-all group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                    {typeLabel[r.type] || r.type}
                  </span>
                  <span className="text-sm font-medium text-gray-900 group-hover:text-primary-700 transition-colors">
                    {r.title}
                  </span>
                </div>
                {r.description && (
                  <p className="text-sm text-gray-500 line-clamp-2">{r.description}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
