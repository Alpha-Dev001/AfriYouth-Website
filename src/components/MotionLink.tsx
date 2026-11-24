'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

/**
 * next/link with Motion props, replacing the plain `<motion.a>` elements
 * so client-side navigation is preserved while animations stay intact.
 */
export const MotionLink = motion.create(Link);
