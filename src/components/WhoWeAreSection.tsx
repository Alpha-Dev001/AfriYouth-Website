import { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { MISSION_AND_VISION } from '../data/afriyouthContent';
import type { PageId } from '../utils/routing';
import {
  FRAMER_EASE,
  ImageReveal,
  Reveal,
  RevealItem,
  RevealStagger,
  SlideReveal,
} from './MotionPrimitives';
import { PageBridge, PageHeader } from './PageHeader';
import { ResilientImage } from './ResilientImage';
import SplitText from './SplitText';

interface WhoWeAreSectionProps {
  onNavigate: (page: PageId) => void;
}

type IdentityTabId = 'mission' | 'vision' | 'approach';

const IDENTITY_TABS: Array<{
  id: IdentityTabId;
  label: string;
  heading: string;
  body: string;
  secondary: string;
}> = [
  {
    id: 'mission',
    label: 'Our Mission',
    heading: 'Equipping youth to generate evidence and shape practical solutions.',
    body: MISSION_AND_VISION.mission,
    secondary:
      'We bridge field diagnostics with human-centered prototyping so youth-led initiatives solve verified socio-economic barriers.',
  },
  {
    id: 'vision',
    label: 'Vision 2050',
    heading: 'Inclusive and sustainable transformation led by Africa’s youth.',
    body: MISSION_AND_VISION.vision,
    secondary:
      'With Africa projected to hold the world’s largest workforce by 2030, long-term foresight guides every program we design.',
  },
  {
    id: 'approach',
    label: 'Our Approach',
    heading: 'Think → Research → Design → Build → Influence → Scale.',
    body: 'Rather than treating research, incubation, and policy as isolated tracks, AfriYouth connects critical systems thinking directly to applied design, venture validation, policy engagement, and M&E.',
    secondary:
      'This continuous discipline ensures promising ideas reach institutional adoption and durable social impact.',
  },
];

const CORE_CAPABILITY_HIGHLIGHTS = [
  'Applied socio-economic & youth research',
  'Human-Centered Design & venture validation',
  'Policy briefs & governance diagnostics',
  'Strategic foresight & impact measurement',
];

const INTEGRATED_SEQUENCE = [
  { label: 'Think & Research', detail: 'Systems inquiry and empirical root-cause diagnostics' },
  { label: 'Design & Build', detail: 'Human-centered prototyping and venture readiness' },
  { label: 'Influence Policy', detail: 'Policy briefs, dialogues, and institutional reforms' },
  { label: 'Measure & Scale', detail: 'Disciplined M&E learning and broader adoption' },
];

export function WhoWeAreSection({ onNavigate }: WhoWeAreSectionProps) {
  const [activeTab, setActiveTab] = useState<IdentityTabId>('mission');
  const currentTab = IDENTITY_TABS.find((t) => t.id === activeTab) ?? IDENTITY_TABS[0];

  return (
    <div className="bg-white text-[#0D0624]">
      <PageHeader
        currentLabel="About"
        kicker="About AfriYouth"
        title="Ideas are everywhere. Systems advance them."
        lead="Organization background, mission, vision 2050, and how research, design, and policy converge."
        image="/images/vr-innovation.jpg"
        imageAlt="Young African specialist sketching concepts on a digital tablet while wearing spatial hardware in a studio"
        imagePosition="object-[center_24%]"
        onNavigate={onNavigate}
      />

      {/* Section 1: Layered Overlap Photo Composition + Authoritative Background Split */}
      <section className="py-16 sm:py-24 overflow-x-clip">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            {/* Left Overlapping Photo Composition */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative mx-auto max-w-[520px] pb-10 sm:pb-12">
                <div className="w-[82%] overflow-hidden rounded-[22px] border border-[#0D0624]/10 bg-[#F7F7FA] aspect-[4/4.2]">
                  <ResilientImage
                    src="/images/team-startup.jpg"
                    alt="Smiling young African innovator holding a Start Up notebook with collaborators"
                    className="h-full w-full object-cover object-[center_26%]"
                  />
                </div>

                <div className="absolute right-0 bottom-0 w-[56%] overflow-hidden rounded-[20px] border border-[#0D0624]/10 bg-[#F7F7FA] aspect-[4/3] ring-8 ring-white">
                  <ResilientImage
                    src="/images/vr-experience.jpg"
                    alt="Young African researcher testing electronic laboratory instrumentation"
                    className="h-full w-full object-cover object-[center_22%]"
                  />
                </div>
              </div>
            </div>

            {/* Right Clean Institutional Overview */}
            <SlideReveal direction="right" distance={22} className="lg:col-span-6 order-1 lg:order-2">
              <Reveal y={14}>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#0301FF]">
                  Who We Are
                </p>
              </Reveal>
              <SplitText
                tag="h2"
                text="An innovation and policy consulting firm advancing African youth ideas."
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
                <p className="mt-4 text-base leading-relaxed text-[#0D0624]/75">
                  {MISSION_AND_VISION.organizationSummary}
                </p>
              </Reveal>

              <RevealStagger
                stagger={0.06}
                className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 border-t border-[#0D0624]/10 pt-6"
              >
                {CORE_CAPABILITY_HIGHLIGHTS.map((item) => (
                  <RevealItem key={item} y={14}>
                    <div className="flex items-start gap-2.5 text-sm text-[#0D0624]/82">
                      <CheckCircle2
                        className="h-4 w-4 text-[#0301FF] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </div>
                  </RevealItem>
                ))}
              </RevealStagger>

              <Reveal delay={0.18} className="mt-8">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  onClick={() => onNavigate('services')}
                  className="group inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#0D0624] px-6 py-2.5 font-display text-sm font-semibold text-white hover:bg-[#0301FF] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Explore Our Services</span>
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </motion.button>
              </Reveal>
            </SlideReveal>
          </div>
        </div>
      </section>

      {/* Section 2: Clean Full-Width Deep Indigo Positioning Strip */}
      <section className="bg-[#0D0624] text-white py-12 sm:py-14">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <RevealStagger
            stagger={0.08}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/15"
          >
            {INTEGRATED_SEQUENCE.map((step) => (
              <RevealItem key={step.label} y={16} className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                <p className="font-display text-lg font-bold tracking-tight text-white">
                  {step.label}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">{step.detail}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Section 3: Interactive Mission / Vision / Approach Split */}
      <section className="py-16 sm:py-24 overflow-x-clip">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
            <SlideReveal direction="left" distance={22} className="lg:col-span-6">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#0301FF]">
                  Purpose &amp; Mandate
                </p>
                <h2 className="mt-3 w-full font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.16] tracking-tight text-[#0D0624]">
                  Preparing Africa’s 2030 workforce for lasting transformation.
                </h2>
              </Reveal>

              {/* Clean Segmented Tabs with Framer layoutId Sliding Pill */}
              <Reveal delay={0.08}>
                <div
                  role="tablist"
                  aria-label="Mission, Vision, and Approach"
                  className="mt-7 flex flex-wrap gap-2"
                >
                  {IDENTITY_TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        role="tab"
                        type="button"
                        aria-selected={isActive}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative min-h-[40px] rounded-full px-5 py-2 font-display text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                          isActive
                            ? 'text-white'
                            : 'bg-[#F7F7FA] text-[#0D0624]/75 border border-[#0D0624]/10 hover:text-[#0D0624]'
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="identity-tab-pill"
                            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                            aria-hidden="true"
                            className="absolute inset-0 rounded-full bg-[#0301FF]"
                          />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </Reveal>

              <div role="tabpanel" className="mt-7 border-t border-[#0D0624]/10 pt-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTab.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.24, ease: FRAMER_EASE }}
                    className="space-y-3"
                  >
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#0D0624]">
                      {currentTab.heading}
                    </h3>
                    <p className="text-base leading-relaxed text-[#0D0624]/78">{currentTab.body}</p>
                    <p className="text-sm leading-relaxed text-[#0D0624]/65">
                      {currentTab.secondary}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </SlideReveal>

            <div className="lg:col-span-6">
              <ImageReveal className="mx-auto max-w-[520px] lg:max-w-none overflow-hidden rounded-[22px] border border-[#0D0624]/10 bg-[#F7F7FA] h-[280px] sm:h-[340px] lg:h-[420px]">
                <ResilientImage
                  src="/images/team-collaboration.jpg"
                  alt="Young African innovator testing virtual reality tools inside an innovation studio"
                  className="h-full w-full object-cover object-[center_18%]"
                />
              </ImageReveal>
            </div>
          </div>
        </div>
      </section>

      <PageBridge
        kicker="Next · Services"
        title="Applied research, policy advisory, and venture services."
        description="Explore our consulting practices across Research, Policy, Innovation, Foresight, and M&E."
        actionLabel="Explore Services"
        targetPage="services"
        onNavigate={onNavigate}
      />
    </div>
  );
}
