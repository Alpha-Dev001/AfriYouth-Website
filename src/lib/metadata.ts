import type { Metadata } from 'next';
import { getRouteMeta, type PageId } from '@/utils/routing';
import { OG_IMAGE, SITE_NAME } from './site';

/**
 * Builds per-route metadata from the single route registry in src/utils/routing.ts,
 * so titles, descriptions and canonical URLs stay aligned with the navigation model.
 */
export function buildPageMetadata(pageId: PageId): Metadata {
  const meta = getRouteMeta(pageId);
  const isNotFound = meta.id === 'not-found';

  return {
    title: meta.title,
    description: meta.description,
    alternates: isNotFound ? undefined : { canonical: meta.path },
    robots: isNotFound ? { index: false, follow: false } : undefined,
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: meta.title,
      description: meta.description,
      url: isNotFound ? undefined : meta.path,
      images: [{ ...OG_IMAGE }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [OG_IMAGE.url],
    },
  };
}
