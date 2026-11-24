'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react';
import {
  APPLE_EASE,
  FRAMER_EASE,
  MOTION_CONFIG,
  blurReveal,
  createBlurRevealVariant,
  createFadeInVariant,
  createFadeUpVariant,
  createSlideVariant,
  createStaggerContainerVariant,
  createStaggerItemVariant,
  fadeIn,
  fadeUp,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
  staggerItem,
} from '../utils/motionConfig';

export {
  APPLE_EASE,
  FRAMER_EASE,
  MOTION_CONFIG,
  blurReveal,
  fadeIn,
  fadeUp,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
  staggerItem,
};

export type RevealVariantKind = 'fadeUp' | 'fadeIn' | 'blur' | 'slideLeft' | 'slideRight';

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  variant?: RevealVariantKind;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  blurPx?: number;
  amount?: number;
  trigger?: 'view' | 'load';
  className?: string;
}

export function Reveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration,
  y,
  x,
  blurPx,
  amount = MOTION_CONFIG.viewport.amount,
  trigger = 'view',
  className = '',
  ...rest
}: RevealProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());

  const resolvedVariant = (() => {
    if (variant === 'fadeIn') {
      return createFadeInVariant({ delay, duration, reducedMotion: prefersReducedMotion });
    }
    if (variant === 'blur') {
      return createBlurRevealVariant({
        delay,
        duration,
        distance: y,
        blurPx,
        reducedMotion: prefersReducedMotion,
      });
    }
    if (variant === 'slideLeft') {
      return createSlideVariant('left', {
        delay,
        duration,
        distance: x ? Math.abs(x) : undefined,
        reducedMotion: prefersReducedMotion,
      });
    }
    if (variant === 'slideRight') {
      return createSlideVariant('right', {
        delay,
        duration,
        distance: x ? Math.abs(x) : undefined,
        reducedMotion: prefersReducedMotion,
      });
    }
    if (x && !y) {
      return createSlideVariant(x < 0 ? 'left' : 'right', {
        delay,
        duration,
        distance: Math.abs(x),
        reducedMotion: prefersReducedMotion,
      });
    }
    return createFadeUpVariant({
      delay,
      duration,
      distance: y,
      reducedMotion: prefersReducedMotion,
    });
  })();

  if (trigger === 'load') {
    return (
      <motion.div
        initial={prefersReducedMotion ? false : 'hidden'}
        animate="visible"
        variants={resolvedVariant}
        className={className}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={prefersReducedMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={resolvedVariant}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface BlurRevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  blurPx?: number;
  distance?: number;
  amount?: number;
  trigger?: 'view' | 'load';
  className?: string;
}

export function BlurReveal({
  children,
  delay = 0.04,
  duration = MOTION_CONFIG.duration.slow,
  blurPx = MOTION_CONFIG.blurPx,
  distance = MOTION_CONFIG.distance.blurY,
  amount = MOTION_CONFIG.viewport.amount,
  trigger = 'view',
  className = '',
  ...rest
}: BlurRevealProps) {
  return (
    <Reveal
      variant="blur"
      delay={delay}
      duration={duration}
      blurPx={blurPx}
      y={distance}
      amount={amount}
      trigger={trigger}
      className={className}
      {...rest}
    >
      {children}
    </Reveal>
  );
}

interface SlideRevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  direction?: 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
  amount?: number;
  className?: string;
}

export function SlideReveal({
  children,
  direction = 'left',
  delay = 0,
  duration = MOTION_CONFIG.duration.base,
  distance = MOTION_CONFIG.distance.x,
  amount = MOTION_CONFIG.viewport.amount,
  className = '',
  ...rest
}: SlideRevealProps) {
  return (
    <Reveal
      variant={direction === 'left' ? 'slideLeft' : 'slideRight'}
      delay={delay}
      duration={duration}
      x={distance}
      amount={amount}
      className={className}
      {...rest}
    >
      {children}
    </Reveal>
  );
}

interface RevealStaggerProps {
  children: ReactNode;
  stagger?: number;
  delayChildren?: number;
  amount?: number;
  className?: string;
}

export function RevealStagger({
  children,
  stagger = MOTION_CONFIG.stagger.children,
  delayChildren = MOTION_CONFIG.stagger.delayChildren,
  amount = MOTION_CONFIG.viewport.amount,
  className = '',
}: RevealStaggerProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const containerVariants = createStaggerContainerVariant({
    stagger,
    delayChildren,
    reducedMotion: prefersReducedMotion,
  });

  return (
    <motion.div
      initial={prefersReducedMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RevealItemProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  y?: number;
  duration?: number;
  className?: string;
}

export function RevealItem({
  children,
  y = MOTION_CONFIG.distance.staggerItemY,
  duration = MOTION_CONFIG.duration.base,
  className = '',
  ...rest
}: RevealItemProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const itemVariants = createStaggerItemVariant({
    distance: y,
    duration,
    reducedMotion: prefersReducedMotion,
  });

  return (
    <motion.div variants={itemVariants} className={className} {...rest}>
      {children}
    </motion.div>
  );
}

interface ImageRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  blurPx?: number;
  amount?: number;
  className?: string;
}

export function ImageReveal({
  children,
  delay = 0.06,
  duration = MOTION_CONFIG.duration.slow,
  blurPx = MOTION_CONFIG.blurPx,
  amount = 0.14,
  className = '',
}: ImageRevealProps) {
  return (
    <BlurReveal
      delay={delay}
      duration={duration}
      blurPx={blurPx}
      distance={14}
      amount={amount}
      className={className}
    >
      {children}
    </BlurReveal>
  );
}
