'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home } from 'lucide-react';
import { motion } from 'motion/react';
import { getPathForPage } from '../utils/routing';
import { FRAMER_EASE } from './MotionPrimitives';
import { ResilientImage } from './ResilientImage';

export function NotFoundPage() {
  const router = useRouter();

  const handleBackClick = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push(getPathForPage('home'));
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-160px)] overflow-hidden bg-[#0D0624] text-white">
      <div className="absolute inset-0">
        <ResilientImage
          src="/images/team-collaboration.jpg"
          alt="AfriYouth Innovation Labs community collaboration"
          loading="eager"
          className="h-full w-full object-cover opacity-30"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#0D0624]/80 via-[#0D0624]/70 to-[#0D0624]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(3,1,255,0.25),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(199,35,223,0.18),transparent_50%)]"
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-160px)] max-w-[1320px] flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: FRAMER_EASE }}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70"
        >
          Error 404
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: FRAMER_EASE }}
          className="mt-4 font-display text-[96px] font-bold leading-none tracking-tight text-white sm:text-[144px] lg:text-[192px]"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16, ease: FRAMER_EASE }}
          className="mt-2 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl"
        >
          This page could not be found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24, ease: FRAMER_EASE }}
          className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base"
        >
          The link may be broken, or the page may have moved. Return home to continue exploring AfriYouth Innovation
          Labs, or go back to where you were.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32, ease: FRAMER_EASE }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href={getPathForPage('home')}
            className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#0301FF] px-6 py-3 font-display text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#0D0624]"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            <span>Back to home</span>
          </Link>
          <button
            type="button"
            onClick={handleBackClick}
            className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 font-display text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden="true" />
            <span>Go back</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
