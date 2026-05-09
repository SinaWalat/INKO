import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "pub-9346dd0d7d8d4a61bbf08e53903451d4.r2.dev",
      },
    ],
  },
};

export default nextConfig;
