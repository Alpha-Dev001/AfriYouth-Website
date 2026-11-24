import type { Metadata } from 'next';
import { NotFoundPage } from '@/components/NotFoundPage';
import { buildPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildPageMetadata('not-found');

export default function NotFound() {
  return <NotFoundPage />;
}
