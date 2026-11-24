'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/**
 * Resets the window to the top of the document on every route change.
 *
 * The document sets `scroll-behavior: smooth` globally, so the router's own
 * scroll reset can be animated and end up cancelled while the incoming page is
 * still growing — leaving the user part-way down (or at the bottom) of the new
 * page. Resetting with behavior: 'instant' after the route commits guarantees
 * each page starts at the top, matching the previous SPA behaviour.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}
