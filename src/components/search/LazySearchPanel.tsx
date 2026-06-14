"use client";

import dynamic from "next/dynamic";

const SearchPanel = dynamic(
  () => import("./SearchPanel").then((mod) => ({ default: mod.SearchPanel })),
  { ssr: false, loading: () => null }
);

export function LazySearchPanel() {
  return <SearchPanel />;
}
