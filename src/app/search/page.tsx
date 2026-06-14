import type { Metadata } from "next";
import { SearchPageClient } from "./SearchPageClient";

export const metadata: Metadata = {
  title: "Search | SZZYPack",
  description: "Search SZZYPack products, guides, and case studies.",
};

export default function SearchPage() {
  return <SearchPageClient />;
}
