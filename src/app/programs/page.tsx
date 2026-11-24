import type { Metadata } from 'next';
import { AcceleratorSection } from '@/components/AcceleratorSection';
import { buildPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildPageMetadata('programs');

export default function Page() {
  return <AcceleratorSection />;
}
