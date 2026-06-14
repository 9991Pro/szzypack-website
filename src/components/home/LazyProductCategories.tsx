"use client";

import dynamic from "next/dynamic";

const ProductCategories = dynamic(
  () =>
    import("@/components/home/ProductCategories").then((mod) => ({
      default: mod.ProductCategories,
    })),
  { loading: () => <SectionSkeleton /> }
);

export function LazyProductCategories() {
  return <ProductCategories />;
}

function SectionSkeleton() {
  return (
    <section className="py-16 md:py-20">
      <div className="container-site">
        <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
        <div className="h-5 w-96 bg-gray-100 rounded mx-auto mb-10 animate-pulse" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border border-gray-200 p-6 animate-pulse">
              <div className="h-48 bg-gray-100 rounded-lg mb-4" />
              <div className="h-6 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-100 rounded mt-2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
