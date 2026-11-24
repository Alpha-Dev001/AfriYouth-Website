import type { Metadata } from 'next';
import { ClosingAndFooter } from '@/components/ClosingAndFooter';
import { buildPageMetadata } from '@/lib/metadata';
import type { AudienceType } from '@/utils/inquiryLogic';

export const metadata: Metadata = buildPageMetadata('contact');

type ContactSearchParams = {
  audience?: string | string[];
};

function resolveAudience(value: string | string[] | undefined): AudienceType {
  const first = Array.isArray(value) ? value[0] : value;
  if (first === 'institution' || first === 'partner') return first;
  return 'innovator';
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<ContactSearchParams>;
}) {
  const params = await searchParams;

  const audience = resolveAudience(params.audience);

  // Re-keying guarantees the form resets when the ?audience= deep link changes.
  return <ClosingAndFooter key={audience} initialAudience={audience} />;
}
