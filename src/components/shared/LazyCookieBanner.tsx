"use client";

import dynamic from "next/dynamic";

const CookieBanner = dynamic(
  () => import("./CookieBanner").then((mod) => ({ default: mod.CookieBanner })),
  { ssr: false, loading: () => null }
);

export function LazyCookieBanner() {
  return <CookieBanner />;
}
