import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'export',
  images: {
    domains: ['images.microcms-assets.io'], // 許可するホスト名を追加
    unoptimized: true, // 必要に応じて
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      }
    ]
  }
};

export default nextConfig;
