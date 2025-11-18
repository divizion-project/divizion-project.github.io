import type { NextConfig } from "next";

// Configure static export for static hosting (e.g., GitHub Pages)
const nextConfig: NextConfig = {
  output: "export",
  images: {
    // next/image optimization is not available on static hosts
    unoptimized: true,
  },
};

export default nextConfig;
