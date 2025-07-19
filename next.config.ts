import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_DOMAIN: process.env.API_DOMAIN,
  },
};

export default nextConfig;
