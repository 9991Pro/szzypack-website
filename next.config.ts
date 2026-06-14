import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [375, 640, 768, 1024, 1280, 1536],
  },
  experimental: {
    mdxRs: true,
  },
};

export default withMDX(nextConfig);
