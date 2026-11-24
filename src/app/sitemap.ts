import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { ROUTES } from '@/utils/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: route.path === '/' ? SITE_URL : `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: route.id === 'home' ? 1 : 0.8,
  }));
}
