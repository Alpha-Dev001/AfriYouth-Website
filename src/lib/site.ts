export const SITE_NAME = 'AfriYouth Innovation Labs';

/**
 * Canonical origin for metadata, sitemap and robots.txt.
 * Override with NEXT_PUBLIC_SITE_URL when deploying to a different domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://afriyouth-website.vercel.app'
).replace(/\/+$/, '');

export const SITE_OG_DESCRIPTION =
  'Advancing ideas, research and innovation into practical solutions that shape policy and drive sustainable development across Africa.';

export const OG_IMAGE = {
  url: '/images/electronics-innovation.jpg',
  width: 1500,
  height: 998,
  alt: 'African youth engineers and researchers collaborating outdoors beneath clean energy solar panels',
} as const;
