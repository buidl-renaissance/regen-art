import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "nyc3.digitaloceanspaces.com",
        protocol: "https",
        port: '',
        pathname: '**',
      },
      {
        hostname: "dpop.nyc3.digitaloceanspaces.com",
        protocol: "https",
        port: '',
        pathname: '**',
      },
      {
        hostname: "brown-selective-rodent-822.mypinata.cloud",
        protocol: "https",
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
