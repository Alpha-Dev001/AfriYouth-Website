import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MOTION_CONFIG,
  blurReveal,
  createBlurRevealVariant,
  createFadeUpVariant,
  createSlideVariant,
  createStaggerContainerVariant,
  fadeIn,
  fadeUp,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
  staggerItem,
} from './motionConfig.ts';

test('centralized default variants encode smooth Apple-style distances and opacity', () => {
  assert.deepEqual(fadeUp.hidden, { opacity: 0, y: MOTION_CONFIG.distance.y });
  assert.equal((fadeUp.visible as { opacity: number; y: number }).opacity, 1);
  assert.equal((fadeUp.visible as { opacity: number; y: number }).y, 0);

  assert.deepEqual(fadeIn.hidden, { opacity: 0 });
  assert.equal((fadeIn.visible as { opacity: number }).opacity, 1);

  assert.equal((blurReveal.hidden as { filter: string }).filter, `blur(${MOTION_CONFIG.blurPx}px)`);
  assert.equal((blurReveal.visible as { filter: string }).filter, 'blur(0px)');

  assert.equal((slideFromLeft.hidden as { x: number }).x, -MOTION_CONFIG.distance.x);
  assert.equal((slideFromRight.hidden as { x: number }).x, MOTION_CONFIG.distance.x);
  assert.ok((staggerContainer.visible as { transition: { staggerChildren: number } }).transition.staggerChildren > 0);
  assert.equal((staggerItem.hidden as { y: number }).y, MOTION_CONFIG.distance.staggerItemY);
});

test('reducedMotion mode eliminates offsets, blur filters, and stagger delays', () => {
  const reducedFade = createFadeUpVariant({ reducedMotion: true });
  const reducedBlur = createBlurRevealVariant({ reducedMotion: true });
  const reducedSlide = createSlideVariant('left', { reducedMotion: true });
  const reducedStagger = createStaggerContainerVariant({ reducedMotion: true });

  assert.equal((reducedFade.hidden as { opacity: number; y: number }).opacity, 1);
  assert.equal((reducedFade.hidden as { opacity: number; y: number }).y, 0);
  assert.equal((reducedBlur.hidden as { filter: string }).filter, 'blur(0px)');
  assert.equal((reducedSlide.hidden as { x: number }).x, 0);
  assert.equal(
    (reducedStagger.visible as { transition: { staggerChildren: number } }).transition.staggerChildren,
    0
  );
});
