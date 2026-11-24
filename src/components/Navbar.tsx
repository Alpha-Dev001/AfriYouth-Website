import { useEffect, useState, type MouseEvent } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BRAND } from '../data/afriyouthContent';
import { getPathForPage, PRIMARY_NAV_ITEMS, ROUTES, type PageId } from '../utils/routing';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onContactClick: () => void;
}

export function Navbar({ currentPage, onNavigate, onContactClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleViewportExpand = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileOpen(false);
    };
    mediaQuery.addEventListener('change', handleViewportExpand);

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      mediaQuery.removeEventListener('change', handleViewportExpand);
    };
  }, [mobileOpen]);

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>, page: PageId) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setMobileOpen(false);
    onNavigate(page);
  };

  const isHeroOverlay = !scrolled;
  const isHomeHero = currentPage === 'home' && isHeroOverlay;

  const drawerLinks = ROUTES.filter((item) => item.id !== 'contact' && item.id !== 'home');

  return (
    <>
      <header
        className={`fixed inset-x-0 z-50 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isHomeHero
            ? 'top-5 sm:top-6 px-5 sm:px-10'
            : isHeroOverlay
              ? 'top-4 sm:top-5 px-5 sm:px-8'
              : 'top-3.5 sm:top-4 px-4 sm:px-8'
        }`}
      >
        <div
          className={`pointer-events-auto mx-auto flex items-center justify-between gap-4 lg:gap-8 rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isHeroOverlay
              ? 'max-w-[1320px] border-transparent bg-transparent px-1 sm:px-2 py-1.5 shadow-none'
              : 'max-w-[1200px] border-white/22 bg-[#0D0624]/68 bg-gradient-to-b from-white/14 to-transparent backdrop-blur-2xl backdrop-saturate-150 px-4 sm:px-6 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_14px_38px_-12px_rgba(13,6,36,0.32)]'
          }`}
        >
          {/* Zone 1: Brand Mark + Title */}
          <a
            href={getPathForPage('home')}
            onClick={(e) => handleLinkClick(e, 'home')}
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-[#0301FF] rounded-full"
            aria-label={`${BRAND.name} — Home`}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full shrink-0 bg-white shadow-sm">
              <img
                src="/brand/afriyouth-mark.svg"
                alt=""
                aria-hidden="true"
                className="h-5 w-auto"
              />
            </span>
            <span className="font-display text-sm sm:text-base font-bold tracking-tight whitespace-nowrap shrink-0 text-white">
              AfriYouth{' '}
              <span className="font-medium text-white/80">
                Innovation Labs
              </span>
            </span>
          </a>

          {/* Zone 2: Clean Desktop Navigation Links (About, Services, Programs) */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-1.5 px-1 py-0.5"
          >
            {PRIMARY_NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <a
                  key={item.id}
                  href={item.path}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative rounded-full px-3.5 py-1.5 text-xs sm:text-sm whitespace-nowrap shrink-0 transition-colors duration-200 ${
                    isActive
                      ? 'text-[#0D0624] font-semibold'
                      : 'text-white/90 font-medium hover:bg-white/15 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-white shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Contact CTA on Desktop (lg+) OR Single Hamburger Toggle Below lg */}
          <div className="flex items-center shrink-0">
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.16 }}
              onClick={() => {
                setMobileOpen(false);
                onContactClick();
              }}
              aria-current={currentPage === 'contact' ? 'page' : undefined}
              className={`hidden lg:inline-flex min-h-[38px] items-center justify-center rounded-full px-5 py-2 font-display text-xs font-semibold transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                currentPage === 'contact'
                  ? 'bg-[#0301FF] text-white'
                  : 'bg-white text-[#0D0624] hover:bg-[#0301FF] hover:text-white shadow-sm'
              }`}
            >
              Contact
            </motion.button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 lg:hidden cursor-pointer border border-white/25 bg-white/12 backdrop-blur-md text-white hover:bg-white/22"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Architectural Mobile & Tablet Navigation Drawer Matching Full Navbar Width */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-[#0D0624]/45 backdrop-blur-md touch-none overscroll-none lg:hidden"
            />

            <motion.div
              id="mobile-navigation-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-4 sm:inset-x-8 top-[76px] z-50 mx-auto max-w-[1200px] rounded-[22px] border border-white/15 bg-[#0D0624]/92 bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-2xl backdrop-saturate-150 p-5 sm:p-6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_28px_64px_-16px_rgba(7,3,22,0.68)] lg:hidden"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                  Navigation
                </span>
                <span className="text-[11px] font-medium text-white/45">{BRAND.name}</span>
              </div>

              <nav aria-label="Mobile pages" className="mt-2.5 flex flex-col gap-1">
                {drawerLinks.map((item) => {
                  const isActive = currentPage === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.path}
                      onClick={(e) => handleLinkClick(e, item.id)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`group flex min-h-[48px] items-center justify-between rounded-xl px-3.5 py-2.5 transition-colors ${
                        isActive
                          ? 'bg-white/12 text-white border border-white/12'
                          : 'text-white/78 hover:bg-white/[0.06] hover:text-white border border-transparent'
                      }`}
                    >
                      <span className="flex items-center gap-2.5 font-display text-base font-semibold tracking-tight">
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-[#4F6BFF]"
                          />
                        )}
                        {item.label}
                      </span>

                      <ArrowUpRight
                        className={`h-4 w-4 transition-colors ${
                          isActive
                            ? 'text-white'
                            : 'text-white/35 group-hover:text-white/85'
                        }`}
                        aria-hidden="true"
                      />
                    </a>
                  );
                })}
              </nav>

              <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-white/50">{BRAND.tagline}</p>

                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onContactClick();
                  }}
                  className="flex min-h-[46px] sm:min-w-[200px] items-center justify-center gap-2 rounded-full bg-[#0301FF] px-6 py-3 font-display text-sm font-semibold text-white hover:bg-[#0200A7] transition-colors shadow-[0_12px_28px_-10px_rgba(3,1,255,0.6)] cursor-pointer whitespace-nowrap"
                >
                  <span>Partner &amp; Contact</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
