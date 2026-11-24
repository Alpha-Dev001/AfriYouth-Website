import type { Metadata } from 'next';
import { HomePage } from '@/components/HomePage';
import { buildPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildPageMetadata('home');

export default function Page() {
  return <HomePage />;
}
