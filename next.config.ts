import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.resolve.alias['leaflet'] = 'leaflet/dist/leaflet.js';
    return config;
  },
};

export default nextConfig;
