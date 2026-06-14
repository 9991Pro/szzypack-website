"use client";

import dynamic from "next/dynamic";

const Industries = dynamic(
  () =>
    import("@/components/home/Industries").then((mod) => ({
      default: mod.Industries,
    })),
  { loading: () => <SectionSkeleton /> }
);

export function LazyIndustries() {
  return <Industries />;
}

function SectionSkeleton() {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container-site">
        <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
        <div className="h-5 w-80 bg-gray-100 rounded mx-auto mb-10 animate-pulse" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}
