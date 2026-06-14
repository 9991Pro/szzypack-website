"use client";

import dynamic from "next/dynamic";

const HowItWorks = dynamic(
  () =>
    import("@/components/home/HowItWorks").then((mod) => ({
      default: mod.HowItWorks,
    })),
  { loading: () => <SectionSkeleton /> }
);

export function LazyHowItWorks() {
  return <HowItWorks />;
}

function SectionSkeleton() {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container-site">
        <div className="h-8 w-56 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
        <div className="h-5 w-96 bg-gray-100 rounded mx-auto mb-10 animate-pulse" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}
