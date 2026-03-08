import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.svastiproduction.com',
      },
      {
        protocol: 'https',
        hostname: '**.svastiproduction.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  // Note: i18n config is not compatible with App Router
  // Use next-intl or similar for App Router i18n
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
