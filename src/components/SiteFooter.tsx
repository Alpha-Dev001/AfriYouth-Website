import type { MouseEvent } from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { BRAND } from '../data/afriyouthContent';
import type { AudienceType } from '../utils/inquiryLogic';
import { getPathForPage, type PageId } from '../utils/routing';
import { BlurReveal, Reveal, RevealItem, RevealStagger } from './MotionPrimitives';

interface SiteFooterProps {
  currentPage: PageId;
  onNavigate: (page: PageId, options?: { audience?: AudienceType }) => void;
}

interface FooterLinkItem {
  label: string;
  page: PageId;
  audience?: AudienceType;
}

const FOOTER_COLUMNS: Array<{ heading: string; links: FooterLinkItem[] }> = [
  {
    heading: 'Organization',
    links: [
      { label: 'Home', page: 'home' },
      { label: 'About Us', page: 'about' },
      { label: 'Vision 2050', page: 'about' },
      { label: 'Our Philosophy', page: 'about' },
    ],
  },
  {
    heading: 'Practices',
    links: [
      { label: 'Research & Evidence', page: 'services' },
      { label: 'Policy & Governance', page: 'services' },
      { label: 'Innovation & Ventures', page: 'services' },
      { label: 'Foresight & Impact', page: 'services' },
    ],
  },
  {
    heading: 'Programs',
    links: [
      { label: 'Evidence-to-Impact', page: 'programs' },
      { label: 'Innovation Accelerator', page: 'programs' },
      { label: 'Policy Challenge', page: 'programs' },
      { label: 'Career Academy', page: 'programs' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'Contact Us', page: 'contact' },
      { label: 'Young Innovators', page: 'contact', audience: 'innovator' },
      { label: 'Institutional Desk', page: 'contact', audience: 'institution' },
      { label: 'Partner With Us', page: 'contact', audience: 'partner' },
    ],
  },
];

export function SiteFooter({ currentPage, onNavigate }: SiteFooterProps) {
  const handleLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    page: PageId,
    audience?: AudienceType
  ) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(page, audience ? { audience } : undefined);
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative overflow-hidden bg-[#0D0624] text-white pt-16 sm:pt-20">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        {/* Top Row: Vertical Stacked Logo First in Top-Left Corner + 4 Structured Link Columns */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 pb-12 sm:pb-14">
          <Reveal y={18} className="lg:col-span-4 flex flex-col items-start">
            <a
              href={getPathForPage('home')}
              onClick={(e) => handleLinkClick(e, 'home')}
              aria-label={`${BRAND.name} — Home`}
              className="group inline-flex flex-col items-start focus-visible:outline-white"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/15 transition-colors duration-200 group-hover:bg-white/15">
                <img
                  src="/brand/afriyouth-mark.svg"
                  alt=""
                  aria-hidden="true"
                  className="h-7 w-auto brightness-0 invert"
                />
              </span>
              <span className="mt-4 font-display text-lg font-bold tracking-tight text-white">
                AfriYouth
                <span className="block text-sm font-medium text-white/75">
                  Innovation Labs
                </span>
              </span>
            </a>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/68">
              Advancing youth-generated evidence, human-centered solutions, and policy reform
              toward sustainable development in Africa.
            </p>
          </Reveal>

          <RevealStagger
            stagger={0.06}
            amount={0.1}
            className="lg:col-span-8 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4"
          >
            {FOOTER_COLUMNS.map((column) => (
              <RevealItem key={column.heading} y={18}>
                <p className="font-display text-sm font-semibold tracking-tight text-white">
                  {column.heading}
                </p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {column.links.map((item) => {
                    const isCurrentRoute =
                      (item.label === 'Home' && currentPage === 'home') ||
                      (item.label === 'About Us' && currentPage === 'about') ||
                      (item.label === 'Contact Us' && currentPage === 'contact');
                    return (
                      <li key={item.label}>
                        <a
                          href={getPathForPage(item.page)}
                          onClick={(e) => handleLinkClick(e, item.page, item.audience)}
                          aria-current={isCurrentRoute ? 'page' : undefined}
                          className={`inline-block transition-[color,transform] duration-150 hover:translate-x-0.5 ${
                            isCurrentRoute ? 'text-white font-semibold' : 'text-white/70 hover:text-white'
                          }`}
                        >
                          {item.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>

        {/* Hairline Divider & Legal / Action Row */}
        <Reveal
          variant="fadeIn"
          delay={0.06}
          className="border-t border-white/15 py-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="space-y-1">
            <p className="text-xs text-white/75">
              © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
            </p>
            <p className="text-xs text-white/55">{BRAND.tagline}</p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <motion.a
              href={getPathForPage('contact')}
              onClick={(e) => handleLinkClick(e, 'contact', 'partner')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="group inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 font-display text-xs font-semibold text-[#0D0624] hover:bg-[#0301FF] hover:text-white transition-colors whitespace-nowrap"
            >
              <span>Partner With Us</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </motion.a>
            <motion.button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0D0624] hover:bg-[#0301FF] hover:text-white transition-colors cursor-pointer"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </motion.button>
          </div>
        </Reveal>
      </div>

      {/* Bottom Edge-to-Edge Brand Wordmark — Unclipped Top Ascenders & Dot on i, Bottom Dissolving Into Deep Shadow */}
      <BlurReveal
        blurPx={6}
        distance={14}
        delay={0.08}
        amount={0.08}
        aria-hidden="true"
        className="relative mx-auto max-w-[1320px] px-5 sm:px-8 pt-6 pb-2 sm:pt-8 sm:pb-3 select-none"
      >
        <p className="font-display font-bold tracking-[-0.03em] text-center bg-gradient-to-b from-white/40 via-white/18 via-[55%] to-transparent bg-clip-text text-transparent leading-[1.08] text-[clamp(3.25rem,15vw,13rem)] whitespace-nowrap">
          AfriYouth
        </p>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#0D0624] via-[#0D0624]/82 to-transparent" />
      </BlurReveal>
    </footer>
  );
}
