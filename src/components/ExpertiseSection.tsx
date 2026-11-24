'use client';

import { useEffect, useRef, useState } from 'react';
import { CORE_SERVICES } from '../data/afriyouthContent';
import { optimizedImageUrl } from '../lib/images';
import { BlurReveal, Reveal, SlideReveal } from './MotionPrimitives';
import { PageBridge, PageHeader } from './PageHeader';
import SplitText from './SplitText';

interface NumeralPhotoConfig {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  preserveAspectRatio: string;
}

// Uses distinct AfriYouth asset photos and hardware/lab detail crops across the 6 numerals
// so numeral 04 uses an original asset image not shared with any other service number.
const NUMERAL_PHOTOS: Record<string, NumeralPhotoConfig> = {
  'research-evidence': {
    src: '/images/team-collaboration.jpg',
    x: 0,
    y: -26,
    width: 420,
    height: 390,
    preserveAspectRatio: 'xMidYMin slice',
  },
  'policy-governance': {
    src: '/images/youth-prototyping.jpg',
    x: 0,
    y: 0,
    width: 420,
    height: 250,
    preserveAspectRatio: 'xMidYMid slice',
  },
  'innovation-entrepreneurship': {
    src: '/images/vr-experience.jpg',
    x: 0,
    y: -12,
    width: 420,
    height: 270,
    preserveAspectRatio: 'xMidYMid slice',
  },
  'strategic-foresight': {
    src: '/images/electronics-innovation.jpg',
    x: 0,
    y: -12,
    width: 420,
    height: 280,
    preserveAspectRatio: 'xMidYMid slice',
  },
  'resource-mobilization': {
    src: '/images/youth-prototyping.jpg',
    x: 0,
    y: -145,
    width: 460,
    height: 390,
    preserveAspectRatio: 'xMidYMid slice',
  },
  'impact-learning': {
    src: '/images/vr-experience.jpg',
    x: -215,
    y: -225,
    width: 700,
    height: 467,
    preserveAspectRatio: 'xMidYMid slice',
  },
};

// Numerals never render wider than 430 CSS px, so 828w covers high-density screens.
const NUMERAL_PHOTO_WIDTH = 828;

function MaskedServiceNumeral({
  numeral,
  serviceId,
}: {
  numeral: string;
  serviceId: string;
}) {
  const clipId = `service-numeral-clip-${serviceId}`;
  const photo = NUMERAL_PHOTOS[serviceId] ?? NUMERAL_PHOTOS['research-evidence'];
  const containerRef = useRef<HTMLDivElement>(null);
  const [photoReady, setPhotoReady] = useState(false);

  // SVG <image> has no native lazy loading, so the photo is only requested once
  // the numeral approaches the viewport. Until then the numeral keeps its solid
  // brand-navy fill, which reads as an intentional placeholder.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      const frame = window.requestAnimationFrame(() => setPhotoReady(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setPhotoReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: '240px 0px', threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="w-full max-w-[340px] sm:max-w-[390px] lg:max-w-[430px] select-none"
    >
      <svg
        viewBox="0 0 420 240"
        className="w-full h-auto block overflow-visible"
        role="presentation"
      >
        <defs>
          <clipPath id={clipId}>
            <text
              x="210"
              y="130"
              textAnchor="middle"
              dominantBaseline="central"
              className="font-display"
              fontWeight="800"
              fontSize="246"
              letterSpacing="-14"
            >
              {numeral}
            </text>
          </clipPath>
        </defs>

        <g clipPath={`url(#${clipId})`}>
          <rect x="0" y="0" width="420" height="240" fill="#0D0624" />
          {photoReady && (
            <image
              href={optimizedImageUrl(photo.src, NUMERAL_PHOTO_WIDTH)}
              x={photo.x}
              y={photo.y}
              width={photo.width}
              height={photo.height}
              preserveAspectRatio={photo.preserveAspectRatio}
            />
          )}
          <rect x="0" y="0" width="420" height="240" fill="#0D0624" fillOpacity="0.14" />
        </g>
      </svg>
    </div>
  );
}

export function ExpertiseSection() {
  return (
    <div className="bg-white text-[#0D0624]">
      <PageHeader
        currentLabel="Services"
        kicker="Services & Advisory"
        title="Where research meets innovation and action."
        lead="Applied research, policy design, venture validation, strategic foresight, and impact evaluation."
        image="/images/vr-experience.jpg"
        imageAlt="Young African researcher conducting precision diagnostics and applied research"
        imagePosition="object-[center_20%]"
      />

      {/* Editorial Alternating Numbered Service Rows */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-[1160px] px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center pb-12 sm:pb-16 border-b border-[#0D0624]/10">
            <Reveal y={14}>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0301FF]">
                Our Services
              </p>
            </Reveal>
            <SplitText
              tag="h2"
              text="Integrated capabilities for African transformation."
              className="mt-2.5 w-full font-display text-3xl sm:text-4xl lg:text-[42px] font-bold leading-[1.14] tracking-tight text-[#0D0624]"
              effect="rise"
              splitType="words"
              trigger="view"
              mask
              delay={26}
              duration={0.55}
              threshold={0.05}
              rootMargin="20px"
              textAlign="center"
            />
            <Reveal delay={0.08}>
              <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-[#0D0624]/68">
                Six specialized practice and advisory services helping institutions, funders, and
                emerging enterprises turn evidence into lasting impact.
              </p>
            </Reveal>
          </div>

          <div className="divide-y divide-[#0D0624]/10 overflow-x-clip">
            {CORE_SERVICES.map((service, idx) => {
              const numeral = String(idx + 1).padStart(2, '0');
              const isEvenRow = idx % 2 === 1;

              return (
                <div
                  key={service.id}
                  className="py-12 sm:py-16 lg:py-20"
                >
                  <article className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
                    <SlideReveal
                      direction={isEvenRow ? 'right' : 'left'}
                      distance={24}
                      amount={0.16}
                      className={`md:col-span-6 ${
                        isEvenRow ? 'md:order-2' : 'md:order-1'
                      }`}
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0301FF]">
                        {service.series}
                      </p>

                      <h3 className="mt-2.5 font-display text-2xl sm:text-3xl lg:text-[34px] font-bold leading-[1.16] tracking-tight text-[#0D0624]">
                        {service.title}
                      </h3>

                      <div
                        aria-hidden="true"
                        className="mt-4 h-[2px] w-10 bg-[#0301FF]"
                      />

                      <p className="mt-5 max-w-lg text-sm sm:text-base leading-relaxed text-[#0D0624]/70">
                        {service.fullSummary}
                      </p>
                    </SlideReveal>

                    <BlurReveal
                      delay={0.08}
                      blurPx={8}
                      distance={10}
                      amount={0.16}
                      className={`md:col-span-6 flex justify-center ${
                        isEvenRow ? 'md:order-1 md:justify-start' : 'md:order-2 md:justify-end'
                      }`}
                    >
                      <MaskedServiceNumeral numeral={numeral} serviceId={service.id} />
                    </BlurReveal>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <PageBridge
        kicker="Next · Programs"
        title="Accelerators, initiatives, and youth opportunities."
        description="Explore the AfriYouth Innovation Accelerator, Policy Innovation Challenge, and Career Academy."
        actionLabel="Explore Programs"
        targetPage="programs"
      />
    </div>
  );
}
