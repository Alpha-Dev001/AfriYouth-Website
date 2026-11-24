import type { Metadata } from 'next';
import { ExpertiseSection } from '@/components/ExpertiseSection';
import { buildPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildPageMetadata('services');

export default function Page() {
  return <ExpertiseSection />;
}
