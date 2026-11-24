'use client';

import Image from 'next/image';
import { useState } from 'react';

/**
 * Intrinsic dimensions for the brand photography in /public/images.
 * next/image needs width/height (or fill) for layout stability; the CSS classes
 * applied by callers still control the rendered size, exactly as before.
 */
const IMAGE_DIMENSIONS: Record<string, { width: number; height: number }> = {
  '/images/electronics-innovation.jpg': { width: 1500, height: 998 },
  '/images/team-collaboration.jpg': { width: 1333, height: 2000 },
  '/images/team-startup.jpg': { width: 1333, height: 2000 },
  '/images/vr-experience.jpg': { width: 2000, height: 1334 },
  '/images/vr-innovation.jpg': { width: 1335, height: 2000 },
  '/images/youth-prototyping.jpg': { width: 2000, height: 1143 },
};

const FALLBACK_DIMENSIONS = { width: 1600, height: 1067 };

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  sizes?: string;
  /** Preload above-the-fold images (LCP) instead of relying on discovery. */
  preload?: boolean;
  fallbackLabel?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  sizes = '100vw',
  preload = false,
  fallbackLabel = 'AfriYouth Innovation Labs',
}: ResilientImageProps) {
  const [failed, setFailed] = useState(false);
  const dimensions = IMAGE_DIMENSIONS[src] ?? FALLBACK_DIMENSIONS;

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-[#0200A7] via-[#0301FF] to-[#0D0624] p-6 text-center text-white ${className}`}
      >
        <div className="space-y-2">
          <Image
            src="/brand/afriyouth-mark.svg"
            alt=""
            aria-hidden="true"
            width={40}
            height={40}
            unoptimized
            className="mx-auto h-10 w-10 brightness-0 invert opacity-90"
          />
          <p className="font-display text-sm font-semibold tracking-tight">{fallbackLabel}</p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      sizes={sizes}
      loading={loading}
      preload={preload}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
