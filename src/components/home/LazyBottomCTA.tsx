"use client";

import dynamic from "next/dynamic";

const BottomCTA = dynamic(
  () =>
    import("@/components/home/BottomCTA").then((mod) => ({
      default: mod.BottomCTA,
    })),
  { loading: () => <SectionSkeleton /> }
);

export function LazyBottomCTA() {
  return <BottomCTA />;
}

function SectionSkeleton() {
  return (
    <section className="py-16 md:py-20 bg-primary-50">
      <div className="container-site text-center">
        <div className="h-8 w-64 bg-primary-100 rounded mx-auto mb-4 animate-pulse" />
        <div className="h-5 w-96 bg-primary-100 rounded mx-auto mb-8 animate-pulse" />
        <div className="h-12 w-48 bg-primary-200 rounded mx-auto animate-pulse" />
      </div>
    </section>
  );
}
