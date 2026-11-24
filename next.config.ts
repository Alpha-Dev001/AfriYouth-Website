import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Serve AVIF/WebP to browsers that accept them (smaller payloads than JPEG).
    formats: ['image/avif', 'image/webp'],
    // Optimized images are immutable for a given url/width/quality triple,
    // so let browsers and CDNs reuse them for a year instead of one minute.
    minimumCacheTTL: 31536000,
    // 828 is also used by the SVG service numerals (see src/lib/images.ts).
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  async headers() {
    return [
      {
        // Brand photography. Filenames are not content-hashed, so keep the year-long
        // cache revalidating in the background; replace assets with new filenames.
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        // Brand marks (SVG) — shorter TTL so a refreshed mark propagates quickly.
        source: '/brand/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Legacy single-page-app aliases kept alive for existing inbound links.
      { source: '/approach', destination: '/about', permanent: false },
      { source: '/work', destination: '/services', permanent: false },
      { source: '/accelerator', destination: '/programs', permanent: false },
      { source: '/partner', destination: '/contact', permanent: false },
      { source: '/connect', destination: '/contact', permanent: false },
    ];
  },
};

export default nextConfig;
