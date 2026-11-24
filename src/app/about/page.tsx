import type { Metadata } from 'next';
import { WhoWeAreSection } from '@/components/WhoWeAreSection';
import { buildPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildPageMetadata('about');

export default function Page() {
  return <WhoWeAreSection />;
}
