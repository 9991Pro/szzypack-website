"use client";

import dynamic from "next/dynamic";

const WhyUs = dynamic(
  () =>
    import("@/components/home/WhyUs").then((mod) => ({
      default: mod.WhyUs,
    })),
  { loading: () => <SectionSkeleton /> }
);

export function LazyWhyUs() {
  return <WhyUs />;
}

function SectionSkeleton() {
  return (
    <section className="py-16 md:py-20">
      <div className="container-site">
        <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
        <div className="h-5 w-80 bg-gray-100 rounded mx-auto mb-10 animate-pulse" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}
