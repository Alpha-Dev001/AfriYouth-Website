import type { Variants } from 'motion/react';

export const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
export const FRAMER_EASE = APPLE_EASE;

export const MOTION_CONFIG = {
  ease: APPLE_EASE,
  duration: {
    fast: 0.42,
    base: 0.62,
    slow: 0.78,
  },
  distance: {
    y: 24,
    x: 24,
    staggerItemY: 22,
    blurY: 12,
  },
  blurPx: 8,
  stagger: {
    children: 0.08,
    delayChildren: 0.04,
  },
  viewport: {
    once: true,
    amount: 0.12,
  },
} as const;

export interface MotionVariantOptions {
  delay?: number;
  duration?: number;
  distance?: number;
  blurPx?: number;
  reducedMotion?: boolean;
}

export interface StaggerVariantOptions {
  stagger?: number;
  delayChildren?: number;
  reducedMotion?: boolean;
}

const REDUCED_MOTION_VISIBLE: Variants = {
  hidden: { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0 },
  },
};

export function createFadeUpVariant(options: MotionVariantOptions = {}): Variants {
  if (options.reducedMotion) return REDUCED_MOTION_VISIBLE;
  const distance = options.distance ?? MOTION_CONFIG.distance.y;
  const duration = options.duration ?? MOTION_CONFIG.duration.base;
  const delay = options.delay ?? 0;

  return {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, delay, ease: MOTION_CONFIG.ease },
    },
  };
}

export function createFadeInVariant(options: MotionVariantOptions = {}): Variants {
  if (options.reducedMotion) return REDUCED_MOTION_VISIBLE;
  const duration = options.duration ?? MOTION_CONFIG.duration.base;
  const delay = options.delay ?? 0;

  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration, delay, ease: MOTION_CONFIG.ease },
    },
  };
}

export function createBlurRevealVariant(options: MotionVariantOptions = {}): Variants {
  if (options.reducedMotion) return REDUCED_MOTION_VISIBLE;
  const blurPx = Math.min(12, Math.max(0, options.blurPx ?? MOTION_CONFIG.blurPx));
  const distance = options.distance ?? MOTION_CONFIG.distance.blurY;
  const duration = options.duration ?? MOTION_CONFIG.duration.slow;
  const delay = options.delay ?? 0;

  return {
    hidden: { opacity: 0, y: distance, filter: `blur(${blurPx}px)` },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration, delay, ease: MOTION_CONFIG.ease },
    },
  };
}

export function createSlideVariant(
  direction: 'left' | 'right',
  options: MotionVariantOptions = {}
): Variants {
  if (options.reducedMotion) return REDUCED_MOTION_VISIBLE;
  const offset = options.distance ?? MOTION_CONFIG.distance.x;
  const x = direction === 'left' ? -Math.abs(offset) : Math.abs(offset);
  const duration = options.duration ?? MOTION_CONFIG.duration.base;
  const delay = options.delay ?? 0;

  return {
    hidden: { opacity: 0, x },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration, delay, ease: MOTION_CONFIG.ease },
    },
  };
}

export function createStaggerContainerVariant(options: StaggerVariantOptions = {}): Variants {
  if (options.reducedMotion) {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1, transition: { staggerChildren: 0, delayChildren: 0 } },
    };
  }

  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: options.stagger ?? MOTION_CONFIG.stagger.children,
        delayChildren: options.delayChildren ?? MOTION_CONFIG.stagger.delayChildren,
      },
    },
  };
}

export function createStaggerItemVariant(options: MotionVariantOptions = {}): Variants {
  if (options.reducedMotion) return REDUCED_MOTION_VISIBLE;
  const distance = options.distance ?? MOTION_CONFIG.distance.staggerItemY;
  const duration = options.duration ?? MOTION_CONFIG.duration.base;

  return {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: MOTION_CONFIG.ease },
    },
  };
}

export const fadeUp: Variants = createFadeUpVariant();
export const fadeIn: Variants = createFadeInVariant();
export const blurReveal: Variants = createBlurRevealVariant();
export const slideFromLeft: Variants = createSlideVariant('left');
export const slideFromRight: Variants = createSlideVariant('right');
export const staggerContainer: Variants = createStaggerContainerVariant();
export const staggerItem: Variants = createStaggerItemVariant();
