import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { AcceleratorSection } from './components/AcceleratorSection';
import { ClosingAndFooter } from './components/ClosingAndFooter';
import { ExpertiseSection } from './components/ExpertiseSection';
import { HomePage } from './components/HomePage';
import { FRAMER_EASE } from './components/MotionPrimitives';
import { Navbar } from './components/Navbar';
import { SiteFooter } from './components/SiteFooter';
import { WhoWeAreSection } from './components/WhoWeAreSection';
import type { AudienceType } from './utils/inquiryLogic';
import {
  getPathForPage,
  getRouteMeta,
  parsePathname,
  type PageId,
} from './utils/routing';

function scrollWindowToTopInstant() {
  if (typeof window === 'undefined') return;
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() =>
    typeof window !== 'undefined' ? parsePathname(window.location.pathname) : 'home'
  );
  const [selectedAudience, setSelectedAudience] = useState<AudienceType>('innovator');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(parsePathname(window.location.pathname));
      scrollWindowToTopInstant();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const meta = getRouteMeta(currentPage);
    document.title = meta.title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', meta.description);
    }
    const ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) {
      ogTitleTag.setAttribute('content', meta.title);
    }
    const ogDescTag = document.querySelector('meta[property="og:description"]');
    if (ogDescTag) {
      ogDescTag.setAttribute('content', meta.description);
    }
  }, [currentPage]);

  const navigate = useCallback(
    (page: PageId, options?: { audience?: AudienceType; replace?: boolean }) => {
      if (options?.audience) {
        setSelectedAudience(options.audience);
      }

      const targetPath = getPathForPage(page);
      if (typeof window !== 'undefined' && window.location.pathname !== targetPath) {
        if (options?.replace) {
          window.history.replaceState({ page }, '', targetPath);
        } else {
          window.history.pushState({ page }, '', targetPath);
        }
      }

      if (page === currentPage) {
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
        return;
      }

      setCurrentPage(page);
    },
    [currentPage]
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <WhoWeAreSection onNavigate={(page) => navigate(page)} />;
      case 'services':
        return <ExpertiseSection onNavigate={(page) => navigate(page)} />;
      case 'programs':
        return (
          <AcceleratorSection
            onNavigate={(page) => navigate(page)}
            onApplyClick={() => navigate('contact', { audience: 'innovator' })}
          />
        );
      case 'contact':
        return (
          <ClosingAndFooter
            selectedAudience={selectedAudience}
            onAudienceChange={setSelectedAudience}
            onNavigate={(page) => navigate(page)}
          />
        );
      case 'home':
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-white text-[#0D0624]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-[#0301FF] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>

        <Navbar
          currentPage={currentPage}
          onNavigate={(page) => navigate(page)}
          onContactClick={() => navigate('contact', { audience: 'partner' })}
        />

        <main id="main-content" className="flex-1">
          <AnimatePresence mode="wait" onExitComplete={scrollWindowToTopInstant}>
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.28, ease: FRAMER_EASE },
              }}
              exit={{
                opacity: 0,
                y: -6,
                transition: { duration: 0.16, ease: FRAMER_EASE },
              }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>

        <SiteFooter currentPage={currentPage} onNavigate={navigate} />
      </div>
    </MotionConfig>
  );
}
