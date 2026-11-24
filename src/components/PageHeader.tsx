'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { getPathForPage, type PageId } from '../utils/routing';
import { FRAMER_EASE, SlideReveal } from './MotionPrimitives';
import { MotionLink } from './MotionLink';
import { ResilientImage } from './ResilientImage';
import SplitText from './SplitText';

interface PageHeaderProps {
  currentLabel: string;
  kicker: string;
  title: string;
  lead: string;
  image?: string | null;
  imageAlt?: string;
  imagePosition?: string;
}

export function PageHeader({
  currentLabel,
  kicker,
  title,
  lead,
  image = '/images/electronics-innovation.jpg',
  imageAlt = 'AfriYouth Innovation Labs research and innovation teams in action',
  imagePosition = 'object-[center_25%]',
}: PageHeaderProps) {
  return (
    <section className="relative flex min-h-[380px] sm:min-h-[450px] lg:min-h-[520px] w-full flex-col justify-end overflow-hidden bg-[#0D0624] text-white">
      {image ? (
        <>
          {/* Painted immediately: no load-time reveal, so the header never flashes the page background. */}
          <div className="pointer-events-none absolute inset-0">
            <ResilientImage
              src={image}
              alt={imageAlt}
              loading="eager"
              preload
              className={`h-full w-full object-cover brightness-[0.88] contrast-[1.04] ${imagePosition}`}
            />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[#0D0624]/35"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-28 sm:h-32 bg-gradient-to-b from-[#0D0624]/75 via-[#0D0624]/30 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0D0624]/84 from-[15%] via-[#0D0624]/48 via-[55%] to-[#0D0624]/20"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-[#0D0624]/75 via-[#0D0624]/35 to-transparent"
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_28%,rgba(3,1,255,0.28),transparent_52%),linear-gradient(135deg,#0D0624_0%,#150C38_60%,#0D0624_100%)]"
        />
      )}

      {/* Full-Width Editorial Sub-Hero Container */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.52, ease: FRAMER_EASE }}
        className="relative z-10 mx-auto w-full max-w-[1320px] px-5 sm:px-8 pt-32 pb-14 sm:pt-36 sm:pb-16 lg:pt-44 lg:pb-20"
      >
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: FRAMER_EASE }}
          className="mb-4 sm:mb-5"
        >
          <ol className="flex items-center gap-2 text-xs font-medium text-white/75">
            <li>
              <Link href={getPathForPage('home')} className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-white font-semibold">
              {currentLabel}
            </li>
          </ol>
        </motion.nav>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.08, ease: FRAMER_EASE }}
              className="text-xs font-semibold uppercase tracking-widest text-white/80"
            >
              {kicker}
            </motion.p>
            <SplitText
              tag="h1"
              text={title}
              className="mt-2.5 w-full font-display text-3xl font-bold leading-[1.14] tracking-tight text-white sm:text-4xl lg:text-[48px]"
              effect="rise"
              splitType="words, chars"
              trigger="load"
              mask
              delay={8}
              duration={0.55}
              textAlign="left"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: FRAMER_EASE }}
            className="lg:col-span-5"
          >
            <p className="text-sm sm:text-base leading-relaxed text-white/90">{lead}</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

interface PageBridgeProps {
  kicker: string;
  title: string;
  description: string;
  actionLabel: string;
  targetPage: PageId;
}

export function PageBridge({
  kicker,
  title,
  description,
  actionLabel,
  targetPage,
}: PageBridgeProps) {
  return (
    <div className="border-t border-[#0D0624]/10 bg-[#F7F7FA] py-12 sm:py-16 text-[#0D0624] overflow-x-clip">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <SlideReveal direction="left" distance={20} className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0301FF]">
            {kicker}
          </p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold leading-[1.16] tracking-tight text-[#0D0624]">
            {title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#0D0624]/72">{description}</p>
        </SlideReveal>

        <SlideReveal direction="right" distance={20} delay={0.08} className="shrink-0">
          <MotionLink
            href={getPathForPage(targetPage)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="group inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#0D0624] px-6 py-3 font-display text-sm font-semibold text-white hover:bg-[#0301FF] transition-colors whitespace-nowrap shrink-0"
          >
            <span>{actionLabel}</span>
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </MotionLink>
        </SlideReveal>
      </div>
    </div>
  );
}
