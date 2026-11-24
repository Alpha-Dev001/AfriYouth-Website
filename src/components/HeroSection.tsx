import type { MouseEvent } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { BRAND } from '../data/afriyouthContent';
import { getPathForPage } from '../utils/routing';
import BlurText from './BlurText';
import { BlurReveal, Reveal } from './MotionPrimitives';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onExploreWork: () => void;
  onPartnerClick: () => void;
}

export function HeroSection({ onExploreWork, onPartnerClick }: HeroSectionProps) {
  const handleExploreClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onExploreWork();
  };

  return (
    <section className="bg-[#FFFFFF] h-[100dvh] min-h-[640px] w-full p-2 sm:p-3">
      <div className="relative h-full w-full overflow-hidden rounded-[18px] sm:rounded-[22px] border border-[#0D0624]/10 bg-[#0D0624] flex flex-col justify-end">
        {/* Reduced-Brightness Official AfriYouth Photograph with Subtle Blur-to-Clear Reveal */}
        <BlurReveal
          trigger="load"
          blurPx={7}
          distance={0}
          duration={0.85}
          delay={0}
          className="absolute inset-0"
        >
          <ResilientImage
            src="/images/electronics-innovation.jpg"
            alt="African youth engineers and researchers collaborating outdoors beneath clean energy solar panels"
            loading="eager"
            className="h-full w-full object-cover object-[center_top] sm:object-[64%_18%] brightness-[0.76] contrast-[1.06]"
          />
        </BlurReveal>

        {/* Protective Indigo Tone & Directional Vignette Scrims */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#0D0624]/30"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#0D0624]/82 via-[#0D0624]/38 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D0624] via-[#0D0624]/72 sm:via-[#0D0624]/45 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0D0624]/88 via-[#0D0624]/48 to-transparent"
        />

        {/* Clean Single-Focus Editorial Composition + Quiet Right Scroll Cue */}
        <div className="relative z-10 mx-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-14 pb-8 sm:pb-12 lg:pb-14 pt-24">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[660px]">
              <Reveal trigger="load" y={14} delay={0.04} duration={0.48}>
                <p className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-white/85 drop-shadow-[0_2px_10px_rgba(13,6,36,0.85)]">
                  <span className="h-px w-5 bg-[#0301FF]" aria-hidden="true" />
                  <span>{BRAND.tagline}</span>
                </p>
              </Reveal>

              <BlurText
                tag="h1"
                text="Fueling Africa’s Next Generation of Innovators."
                effect="blur"
                animateBy="words"
                direction="bottom"
                trigger="load"
                delay={65}
                stepDuration={0.42}
                blur={10}
                distance={24}
                className="mt-3 sm:mt-4 font-display text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[56px] drop-shadow-[0_6px_24px_rgba(13,6,36,0.75)]"
              />

              <BlurText
                tag="p"
                text="A research, innovation and policy consulting firm advancing youth-led ideas into evidence-backed solutions for sustainable development."
                effect="focus"
                animateBy="words"
                trigger="load"
                delay={28}
                stepDuration={0.3}
                blur={6}
                distance={0}
                className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-white/88 drop-shadow-[0_3px_14px_rgba(13,6,36,0.85)]"
              />

              <Reveal trigger="load" y={18} delay={0.28} duration={0.55}>
                <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3.5">
                  <a
                    href={getPathForPage('services')}
                    onClick={handleExploreClick}
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#0301FF] px-6 py-3 font-display text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0200A7] whitespace-nowrap shrink-0"
                  >
                    <span>Explore Our Services</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>

                  <button
                    type="button"
                    onClick={onPartnerClick}
                    className="inline-flex min-h-[48px] items-center gap-1.5 rounded-full border border-white/30 bg-[#0D0624]/45 backdrop-blur-md px-5 py-3 font-display text-sm font-semibold text-white hover:bg-white hover:text-[#0D0624] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Partner With Us</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </Reveal>
            </div>

            <Reveal trigger="load" variant="fadeIn" delay={0.36} duration={0.5} className="shrink-0">
              <a
                href="#home-overview"
                aria-label="Scroll to overview"
                className="hidden lg:inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-[#0D0624]/45 backdrop-blur-md text-white/85 hover:bg-white hover:text-[#0D0624] transition-colors shrink-0"
              >
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
