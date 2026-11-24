import { useState } from 'react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  fallbackLabel?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fallbackLabel = 'AfriYouth Innovation Labs',
}: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-[#0200A7] via-[#0301FF] to-[#0D0624] p-6 text-center text-white ${className}`}
      >
        <div className="space-y-2">
          <img
            src="/brand/afriyouth-mark.svg"
            alt=""
            aria-hidden="true"
            className="mx-auto h-10 w-10 brightness-0 invert opacity-90"
          />
          <p className="font-display text-sm font-semibold tracking-tight">{fallbackLabel}</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
