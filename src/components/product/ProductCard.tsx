"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

const colorMap: Record<string, string> = {
  "stand-up-pouches": "bg-amber-50 border-amber-100 hover:border-amber-300",
  "flat-bottom-bags": "bg-blue-50 border-blue-100 hover:border-blue-300",
  "roll-film": "bg-green-50 border-green-100 hover:border-green-300",
  "spout-pouches": "bg-orange-50 border-orange-100 hover:border-orange-300",
  "side-gusset-bags": "bg-purple-50 border-purple-100 hover:border-purple-300",
  "custom-shapes": "bg-pink-50 border-pink-100 hover:border-pink-300",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        "group rounded-lg border p-6 transition-all hover:shadow-md",
        colorMap[product.slug] || "bg-gray-50 border-gray-100",
      )}
    >
      <h3 className="text-lg font-semibold text-dark-900 group-hover:text-primary-700 transition-colors">
        {product.title}
      </h3>
      <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-2">
        {product.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {product.features.slice(0, 3).map((f) => (
          <span key={f} className="text-xs bg-white/70 px-2 py-0.5 rounded-full text-gray-600">
            {f}
          </span>
        ))}
      </div>
      <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary-700 opacity-0 group-hover:opacity-100 transition-opacity">
        View details <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
