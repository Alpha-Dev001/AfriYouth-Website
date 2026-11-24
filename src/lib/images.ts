/**
 * Builds a `next/image` optimizer URL for images that cannot be rendered with
 * the <Image /> component (for example SVG <image> elements used as clip masks).
 *
 * `width` must be one of the `deviceSizes` declared in next.config.ts. The
 * optimizer returns an AVIF/WebP variant when the browser supports it and the
 * response inherits the configured long-lived image cache.
 */
export function optimizedImageUrl(src: string, width: number, quality = 75): string {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}
