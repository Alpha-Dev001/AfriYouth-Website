'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { getPathForPage, type PageId } from '../utils/routing';
import { HeroSection } from './HeroSection';
import { MotionLink } from './MotionLink';
import {
  ImageReveal,
  Reveal,
  RevealItem,
  RevealStagger,
  SlideReveal,
} from './MotionPrimitives';
import { ResilientImage } from './ResilientImage';
import SplitText from './SplitText';

const CORE_PRACTICE_CARDS = [
  {
    id: 'research-evidence',
    number: '01',
    discipline: 'Evidence & Diagnostics',
    title: 'Research & Evidence',
    summary: 'Applied socio-economic research, youth surveys, and baseline impact studies.',
    image: '/images/vr-experience.jpg',
    imageAlt: 'Young African researcher testing electronic laboratory instrumentation',
    imagePosition: 'object-[center_20%]',
  },
  {
    id: 'policy-governance',
    number: '02',
    discipline: 'Public Decision-Making',
    title: 'Policy & Governance',
    summary: 'Governance diagnostics, policy briefs, and the Policy Innovation Challenge.',
    image: '/images/vr-innovation.jpg',
    imageAlt: 'African specialist wearing virtual reality hardware while drafting on a digital stylus',
    imagePosition: 'object-[center_20%]',
  },
  {
    id: 'innovation-entrepreneurship',
    number: '03',
    discipline: 'Venture Validation',
    title: 'Innovation & Ventures',
    summary: 'Human-centered prototyping, market validation, and venture readiness.',
    image: '/images/youth-prototyping.jpg',
    imageAlt: 'Young engineer soldering and prototyping precision electronics hardware',
    imagePosition: 'object-[center_28%]',
  },
  {
    id: 'foresight-impact',
    number: '04',
    discipline: '2050 Horizons & M&E',
    title: 'Foresight & Impact',
    summary: '2030–2050 scenario planning, career academies, and measurable M&E systems.',
    image: '/images/team-collaboration.jpg',
    imageAlt: 'Young African innovator exploring emerging spatial tools beside a lab workbench',
    imagePosition: 'object-[center_18%]',
  },
];

const EXPLORE_PATHWAYS: Array<{
  number: string;
  page: PageId;
  kicker: string;
  title: string;
  description: string;
  actionLabel: string;
}> = [
  {
    number: '01',
    page: 'about',
    kicker: 'Identity & Approach',
    title: 'About AfriYouth',
    description: 'Organization background, Mission, Vision 2050, and our six-stage operating model.',
    actionLabel: 'Read About Us',
  },
  {
    number: '02',
    page: 'programs',
    kicker: 'Youth & Cohort Tracks',
    title: 'Programs & Accelerator',
    description: 'Three-phase Evidence-to-Impact Accelerator, Policy Challenge, and Career Academy.',
    actionLabel: 'View Programs',
  },
  {
    number: '03',
    page: 'contact',
    kicker: 'Collaboration Desk',
    title: 'Partner & Contact',
    description: 'Direct engagement routes for young innovators, institutions, and funders.',
    actionLabel: 'Get in Touch',
  },
];

export function HomePage() {
  const prefersReducedMotion = useReducedMotion();
  const horizontalTrackRef = useRef<HTMLElement>(null);
  const railViewportRef = useRef<HTMLDivElement>(null);
  const cardsRowRef = useRef<HTMLDivElement>(null);
  const [maxTravel, setMaxTravel] = useState(0);
  const [activeCardIdx, setActiveCardIdx] = useState(0);

  useEffect(() => {
    const measureTravel = () => {
      const viewport = railViewportRef.current;
      const cardsRow = cardsRowRef.current;
      if (!viewport || !cardsRow) return;
      const distance = Math.max(0, cardsRow.scrollWidth - viewport.clientWidth);
      setMaxTravel(distance);
    };

    measureTravel();
    const observer =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measureTravel) : null;
    if (observer) {
      if (railViewportRef.current) observer.observe(railViewportRef.current);
      if (cardsRowRef.current) observer.observe(cardsRowRef.current);
    }
    window.addEventListener('resize', measureTravel);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', measureTravel);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: horizontalTrackRef,
    offset: ['start start', 'end end'],
  });

  const rawTrackX = useTransform(scrollYProgress, [0.06, 0.88], [0, -maxTravel]);
  const smoothTrackX = useSpring(rawTrackX, {
    stiffness: 180,
    damping: 32,
    mass: 0.35,
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const clamped = Math.min(1, Math.max(0, (latest - 0.06) / 0.82));
    const idx = Math.min(
      CORE_PRACTICE_CARDS.length - 1,
      Math.max(0, Math.round(clamped * (CORE_PRACTICE_CARDS.length - 1)))
    );
    setActiveCardIdx(idx);
  });

  const scrollToPracticeCard = (targetIdx: number) => {
    const section = horizontalTrackRef.current;
    if (!section) return;
    const clampedIdx = Math.min(CORE_PRACTICE_CARDS.length - 1, Math.max(0, targetIdx));
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const scrollableDistance = Math.max(1, section.offsetHeight - window.innerHeight);
    const normalizedStep = clampedIdx / (CORE_PRACTICE_CARDS.length - 1);
    const progressTarget = 0.06 + normalizedStep * 0.82;
    window.scrollTo({
      top: Math.round(sectionTop + progressTarget * scrollableDistance),
      behavior: 'smooth',
    });
  };

  return (
    <div className="bg-white">
      <HeroSection />

      {/* Section 2: Clean Editorial Intro Split (Text-First Flow, Side-by-Side From Tablet Up) */}
      <section id="home-overview" className="scroll-mt-20 overflow-x-clip bg-white py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center md:gap-12 lg:gap-16">
            <SlideReveal direction="left" distance={22} className="md:col-span-7">
              <Reveal y={14}>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#0301FF]">
                  About AfriYouth
                </p>
              </Reveal>
              <SplitText
                tag="h2"
                text="Turning youth-led ideas into evidence-backed solutions for Africa."
                className="mt-3 w-full font-display text-2xl sm:text-3xl lg:text-[40px] font-bold leading-[1.16] tracking-tight text-[#0D0624]"
                effect="rise"
                splitType="words"
                trigger="view"
                mask
                delay={28}
                duration={0.55}
                threshold={0.05}
                rootMargin="20px"
                textAlign="left"
              />
              <Reveal delay={0.08}>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-[#0D0624]/72">
                  AfriYouth equips young innovators and institutions with applied research,
                  human-centered design, policy, and venture advisory toward the Sustainable
                  Development Goals.
                </p>
              </Reveal>

              <Reveal delay={0.14}>
                <dl className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 border-t border-[#0D0624]/10 pt-6 max-w-xl">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-[#0D0624]/50">
                      Integrated Mandate
                    </dt>
                    <dd className="mt-1 font-display text-sm font-semibold text-[#0D0624]">
                      Research · Policy · HCD · Ventures
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-[#0D0624]/50">
                      Strategic Horizon
                    </dt>
                    <dd className="mt-1 font-display text-sm font-semibold text-[#0D0624]">
                      SDGs &amp; Africa Vision 2050
                    </dd>
                  </div>
                </dl>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <MotionLink
                    href={getPathForPage('about')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="group inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#0D0624] px-6 py-2.5 font-display text-sm font-semibold text-white hover:bg-[#0301FF] transition-colors whitespace-nowrap"
                  >
                    <span>About AfriYouth</span>
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </MotionLink>
                  <Link
                    href={getPathForPage('services')}
                    className="group inline-flex min-h-[46px] items-center gap-1.5 font-display text-sm font-semibold text-[#0D0624] underline underline-offset-4 decoration-[#0D0624]/25 hover:text-[#0301FF] hover:decoration-[#0301FF] transition-colors whitespace-nowrap"
                  >
                    <span>Our Services</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </Reveal>
            </SlideReveal>

            <div className="md:col-span-5">
              <ImageReveal className="mx-auto max-w-[360px] md:max-w-[440px] overflow-hidden rounded-[22px] border border-[#0D0624]/10 h-[300px] sm:h-[340px] md:h-auto md:aspect-[10/11] bg-[#F7F7FA]">
                <ResilientImage
                  src="/images/team-startup.jpg"
                  alt="Smiling young African innovator holding a Start Up notebook with collaborators in a workspace"
                  sizes="(max-width: 768px) 90vw, (max-width: 1320px) 40vw, 440px"
                  className="h-full w-full object-cover object-[center_26%]"
                />
              </ImageReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Sticky Horizontal Practice Showcase (4 Remaining Authentic Hackathon Photos) */}
      <section
        ref={horizontalTrackRef}
        className={`relative bg-[#F7F7FA] overflow-x-clip ${
          prefersReducedMotion ? 'py-16 sm:py-24' : 'h-[210vh]'
        }`}
      >
        <div
          className={
            prefersReducedMotion
              ? 'w-full'
              : 'sticky top-0 flex h-screen min-h-[560px] w-full flex-col justify-center overflow-hidden bg-[#F7F7FA] pt-24 pb-12 sm:pt-28 sm:pb-16'
          }
        >
          <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 shrink-0">
            <Reveal y={20} className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#0301FF]">
                  Core Practice Areas
                </p>
                <h2 className="mt-1.5 w-full font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.14] tracking-tight text-[#0D0624]">
                  Research, policy, ventures, and strategic foresight.
                </h2>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => scrollToPracticeCard(activeCardIdx - 1)}
                  disabled={activeCardIdx === 0}
                  aria-label="Scroll practice areas left"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#0D0624]/12 bg-white text-[#0D0624] hover:text-[#0301FF] disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToPracticeCard(activeCardIdx + 1)}
                  disabled={activeCardIdx === CORE_PRACTICE_CARDS.length - 1}
                  aria-label="Scroll practice areas right"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#0D0624] text-white hover:bg-[#0301FF] disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </Reveal>
          </div>

          <div ref={railViewportRef} className="mt-6 sm:mt-8 w-full overflow-hidden">
            <motion.div
              ref={cardsRowRef}
              style={prefersReducedMotion ? undefined : { x: smoothTrackX }}
              className={`inline-flex gap-5 px-5 sm:px-8 lg:px-[max(2rem,calc((100vw-1320px)/2+2rem))] will-change-transform ${
                prefersReducedMotion ? 'flex-wrap' : ''
              }`}
            >
              {CORE_PRACTICE_CARDS.map((card) => (
                <Link
                  key={card.id}
                  href={getPathForPage('services')}
                  className="group isolate relative flex h-[300px] sm:h-[335px] lg:h-[min(48vh,385px)] w-[280px] sm:w-[340px] lg:w-[405px] shrink-0 flex-col justify-end overflow-hidden rounded-[22px] border border-[#0D0624]/12 bg-[#0D0624] [transform:translateZ(0)]"
                >
                  <ResilientImage
                    src={card.image}
                    alt={card.imageAlt}
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 405px"
                    className={`absolute inset-0 h-full w-full object-cover brightness-[0.86] transition-[filter] duration-300 group-hover:brightness-[0.94] ${card.imagePosition}`}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#0D0624] via-[#0D0624]/58 to-[#0D0624]/20"
                  />

                  <div className="relative z-10 p-6">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                      {card.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/80 line-clamp-2">
                      {card.summary}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-4">
                      <span className="font-display text-xs font-semibold tracking-wide text-[#F7F7FA]">
                        Explore Service
                      </span>
                      <span
                        aria-hidden="true"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0D0624] transition-colors duration-200 group-hover:bg-white/90"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Architectural Pathway Index (Zero Duplicate Photography, Shadow-Elevated Cards) */}
      <section className="bg-white py-14 sm:py-24">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <Reveal className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0301FF]">
              Explore AfriYouth
            </p>
            <h2 className="mt-2 w-full font-display text-3xl font-bold leading-[1.14] tracking-tight text-[#0D0624] sm:text-4xl">
              Pathways across programs, identity, and partnerships.
            </h2>
          </Reveal>

          <RevealStagger className="mt-8 sm:mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {EXPLORE_PATHWAYS.map((item) => (
              <RevealItem key={item.page} className="flex">
                <Link
                  href={getPathForPage(item.page)}
                  className="group flex w-full flex-col justify-between rounded-[20px] border border-[#0D0624]/10 bg-white p-7 sm:p-8 hover:border-[#0D0624]/28 hover:bg-[#F7F7FA]/65 transition-[border-color,background-color] duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0301FF]"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#0301FF]">
                      {item.kicker}
                    </p>

                    <h3 className="mt-4 font-display text-xl sm:text-2xl font-bold tracking-tight text-[#0D0624]">
                      {item.title}
                    </h3>

                    <p className="mt-2.5 text-sm leading-relaxed text-[#0D0624]/72">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-[#0D0624]/10 pt-5">
                    <span className="font-display text-xs sm:text-sm font-semibold text-[#0D0624]">
                      {item.actionLabel}
                    </span>
                    <span
                      aria-hidden="true"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F7FA] text-[#0D0624] group-hover:bg-[#0D0624] group-hover:text-white transition-colors duration-200"
                    >
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>
    </div>
  );
}
