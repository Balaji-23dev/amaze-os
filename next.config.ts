import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/amaze-os",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
