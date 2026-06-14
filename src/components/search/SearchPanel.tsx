"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { SearchDocument } from "@/lib/search";
import { searchEvents } from "@/lib/search-events";

export function SearchPanel() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Listen for open events from Header button
  useEffect(() => {
    return searchEvents.subscribe(() => setOpen(true));
  }, []);

  // Cmd+K or Ctrl+K to open
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Body scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const doSearch = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
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
    const timer = setTimeout(() => doSearch(query), 200);
    return () => clearTimeout(timer);
  }, [query, doSearch]);

  function handleSelect(href: string) {
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  const typeLabel: Record<string, string> = {
    product: "Product",
    blog: "Blog",
    case: "Case Study",
    page: "Page",
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" />
      <div
        ref={panelRef}
        className="relative mx-auto mt-[15vh] max-w-lg bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
      >
        <div className="flex items-center gap-3 px-4 border-b border-gray-100">
          <Search className="h-4 w-4 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, guides, case studies..."
            className="flex-1 py-3 text-sm outline-none text-gray-900 placeholder:text-gray-400"
          />
          {loading && <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />}
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close search"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {query.length < 2 ? (
            <div className="px-4 py-8 text-center text-sm text-gray-400">
              Type at least 2 characters to search
            </div>
          ) : results.length === 0 && !loading ? (
            <div className="px-4 py-8 text-center text-sm text-gray-400">
              No results found for &quot;{query}&quot;
            </div>
          ) : (
            results.map((r) => (
              <button
                key={r.id}
                onClick={() => handleSelect(r.href)}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                    {typeLabel[r.type] || r.type}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{r.title}</span>
                </div>
                {r.description && (
                  <p className="mt-1 text-xs text-gray-500 line-clamp-1">{r.description}</p>
                )}
              </button>
            ))
          )}
        </div>

        <div className="px-4 py-2 border-t border-gray-100 text-xs text-gray-400 flex items-center justify-between">
          <span>Press ESC to close</span>
          <span>↑↓ to navigate</span>
        </div>
      </div>
    </div>
  );
}
