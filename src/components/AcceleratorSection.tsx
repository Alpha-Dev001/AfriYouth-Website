import {
  ArrowUpRight,
  BriefcaseBusiness,
  Compass,
  GraduationCap,
  Landmark,
  Lightbulb,
  Microscope,
} from 'lucide-react';
import { getHrefForPage } from '../utils/routing';
import {
  ImageReveal,
  Reveal,
  RevealItem,
  RevealStagger,
  SlideReveal,
} from './MotionPrimitives';
import { MotionLink } from './MotionLink';
import { PageBridge, PageHeader } from './PageHeader';
import { ResilientImage } from './ResilientImage';
import SplitText from './SplitText';

interface FlagshipProgram {
  id: string;
  kicker: string;
  title: string;
  summary: string;
  overview: string;
  audience: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  imagePosition: string;
}

const PROGRAM_ADVANTAGES = [
  {
    icon: Microscope,
    title: 'Community-Rooted Evidence',
    detail: 'Empirical socio-economic diagnostics grounded in real community needs.',
  },
  {
    icon: Lightbulb,
    title: 'Human-Centered Prototyping',
    detail: 'Practical solutions co-designed and tested alongside target users.',
  },
  {
    icon: Landmark,
    title: 'Policy & Regulatory Readiness',
    detail: 'Actionable briefs connecting youth innovations to decision-makers.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Venture & Investor Alignment',
    detail: 'Financial models, governance, and capital pathways built for scale.',
  },
] as const;

const FLAGSHIP_PROGRAMS: FlagshipProgram[] = [
  {
    id: 'innovation-accelerator',
    kicker: 'Venture Incubation',
    title: 'AfriYouth Innovation Accelerator',
    summary:
      'Supports youth-founded ventures from problem discovery through prototyping, validation, and investor readiness.',
    overview:
      'Hosted within the Youth Innovation & Venture Lab, this flagship cohort equips emerging founders with structured mentorship, Human-Centered Design sprints, and venture validation frameworks.',
    audience: 'Early-stage youth founders & community innovators',
    highlights: [
      'Structured Human-Centered Design & problem validation',
      'Working prototype & business-model development',
      'Financial modelling & investor due-diligence prep',
      'Demo pitch opportunities with ecosystem partners',
    ],
    image: '/images/team-startup.jpg',
    imageAlt: 'Smiling young African founder holding a Start Up notebook with collaborators',
    imagePosition: 'object-[center_36%]',
  },
  {
    id: 'policy-challenge',
    kicker: 'Public Reform',
    title: 'Policy Innovation Challenge',
    summary:
      'Invites young innovators to pair empirical evidence with actionable reform proposals presented at Policy Demo Day.',
    overview:
      'Bridges youth-generated research and public decision-making across youth employment, climate resilience, digital transformation, education, and health governance.',
    audience: 'Youth policy fellows, researchers & civic leaders',
    highlights: [
      'Applied policy research & political-economy framing',
      'Policy brief authorship & stakeholder mapping',
      'Direct mentorship from governance & public-sector advisors',
      'Policy Innovation Demo Day presentations to decision-makers',
    ],
    image: '/images/electronics-innovation.jpg',
    imageAlt: 'African engineers and policy collaborators outdoors beneath clean energy solar panels',
    imagePosition: 'object-[center_20%]',
  },
  {
    id: 'career-academy',
    kicker: 'Workforce Readiness',
    title: 'Career & Leadership Academy',
    summary:
      'Experiential bootcamps, applied simulations, and professional readiness preparing Africa’s 2030 workforce.',
    overview:
      'Builds practical analytical, leadership, and problem-solving competencies aligned with emerging technology shifts and institutional career pathways across Africa.',
    audience: 'Graduates, rising professionals & future leaders',
    highlights: [
      'Experiential competency simulations & leadership labs',
      'Applied research, foresight & strategic communication training',
      'Future-of-work & emerging digital capability tracks',
      'Mentorship connecting talent to institutions and ventures',
    ],
    image: '/images/vr-innovation.jpg',
    imageAlt: 'Young African specialist testing immersive digital tools with a stylus at a workstation',
    imagePosition: 'object-[center_26%]',
  },
];

const PROGRAM_ICONS = [Compass, Landmark, GraduationCap] as const;

export function AcceleratorSection() {
  return (
    <div className="bg-white text-[#0D0624]">
      <PageHeader
        currentLabel="Programs"
        kicker="Programs & Opportunities"
        title="Accelerators and youth innovation initiatives."
        lead="Structured venture incubation, policy challenges, and leadership readiness for Africa’s young innovators."
        image="/images/team-collaboration.jpg"
        imageAlt="Young African innovator collaborating inside an experimental studio"
        imagePosition="object-[center_18%]"
      />

      {/* Section 1: Program Architecture Split */}
      <section className="py-16 sm:py-24 bg-white overflow-x-clip">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-12 lg:items-center lg:gap-16 xl:gap-20">
            <SlideReveal direction="left" distance={22} className="lg:col-span-6 flex flex-col justify-center">
              <Reveal y={14}>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#0301FF]">
                  Program Advantages
                </p>
              </Reveal>
              <SplitText
                tag="h2"
                text="Structured pathways from idea discovery to systemic scale."
                className="mt-3 w-full font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.16] tracking-tight text-[#0D0624]"
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
                <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-[#0D0624]/68">
                  Every AfriYouth cohort pairs empirical field insight with iterative design and
                  institutional access so young builders launch solutions built to endure.
                </p>
              </Reveal>

              <RevealStagger
                stagger={0.07}
                amount={0.08}
                className="mt-8 border-y border-[#0D0624]/10 divide-y divide-[#0D0624]/10"
              >
                {PROGRAM_ADVANTAGES.map((item) => {
                  const Icon = item.icon;
                  return (
                    <RevealItem key={item.title} y={16}>
                      <div className="flex items-start gap-4 py-4">
                        <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#0D0624]/10 bg-[#F7F7FA] text-[#0D0624]">
                          <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                        </span>
                        <div>
                          <h3 className="font-display text-sm sm:text-base font-bold text-[#0D0624]">
                            {item.title}
                          </h3>
                          <p className="mt-0.5 text-sm leading-relaxed text-[#0D0624]/68">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </RevealItem>
                  );
                })}
              </RevealStagger>

              <Reveal delay={0.14} className="mt-8">
                <MotionLink
                  href={getHrefForPage('contact', 'innovator')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="group inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#0301FF] px-6 py-3 font-display text-sm font-semibold text-white hover:bg-[#0200A7] transition-colors cursor-pointer"
                >
                  <span>Apply or Partner on a Cohort</span>
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </MotionLink>
              </Reveal>
            </SlideReveal>

            <div className="lg:col-span-6">
              <ImageReveal className="mx-auto w-full max-w-[600px] lg:max-w-none overflow-hidden rounded-[22px] border border-[#0D0624]/10 bg-[#F7F7FA] aspect-[4/3] sm:aspect-[16/10] lg:aspect-[5/4] lg:max-h-[520px]">
                <ResilientImage
                  src="/images/youth-prototyping.jpg"
                  alt="Young African engineer assembling precision electronics prototypes in a studio"
                  sizes="(max-width: 1024px) 92vw, 600px"
                  className="h-full w-full object-cover object-[center_20%] sm:object-[center_24%] lg:object-[center_26%]"
                />
              </ImageReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Flagship Programs Showcase */}
      <section className="bg-[#F7F7FA] py-16 sm:py-24">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal y={14}>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0301FF]">
                Flagship Programs
              </p>
            </Reveal>
            <SplitText
              tag="h2"
              text="Three initiatives powering Africa’s young innovators."
              className="mt-2.5 w-full font-display text-3xl sm:text-4xl font-bold leading-[1.14] tracking-tight text-[#0D0624]"
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
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#0D0624]/68">
                Focused tracks connecting venture building, public policy innovation, and executive
                workforce leadership.
              </p>
            </Reveal>
          </div>

          <RevealStagger
            stagger={0.09}
            amount={0.06}
            className="mx-auto mt-10 sm:mt-12 grid max-w-[540px] grid-cols-1 gap-6 sm:gap-7 md:max-w-none md:grid-cols-2 lg:grid-cols-3"
          >
            {FLAGSHIP_PROGRAMS.map((program, idx) => {
              const Icon = PROGRAM_ICONS[idx % PROGRAM_ICONS.length];
              const isThirdCard = idx === 2;

              return (
                <RevealItem
                  key={program.id}
                  y={24}
                  className={`flex min-w-0 ${isThirdCard ? 'md:col-span-2 lg:col-span-1' : ''}`}
                >
                  <article
                    className={`flex w-full min-w-0 flex-col overflow-hidden rounded-[20px] border border-[#0D0624]/10 bg-white ${
                      isThirdCard ? 'md:grid md:grid-cols-12 lg:flex lg:flex-col' : ''
                    }`}
                  >
                    <div
                      className={`relative w-full shrink-0 overflow-hidden bg-[#F7F7FA] aspect-[4/3] lg:aspect-[5/4] ${
                        isThirdCard
                          ? 'md:col-span-5 md:aspect-auto md:min-h-[260px] lg:aspect-[5/4] lg:min-h-0'
                          : ''
                      }`}
                    >
                      <ResilientImage
                        src={program.image}
                        alt={program.imageAlt}
                        sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 405px"
                        className={`h-full w-full object-cover ${program.imagePosition} ${
                          isThirdCard ? 'md:absolute md:inset-0 lg:static' : ''
                        }`}
                      />
                    </div>

                    <div
                      className={`flex flex-1 min-w-0 flex-col justify-between p-5 sm:p-6 ${
                        isThirdCard ? 'md:col-span-7 md:p-7 lg:p-6' : ''
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2 text-[#0301FF]">
                          <span
                            aria-hidden="true"
                            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F7F7FA] text-[#0301FF]"
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0301FF]">
                            {program.kicker}
                          </span>
                        </div>

                        <h3 className="mt-3.5 font-display text-lg sm:text-xl font-bold leading-snug tracking-tight text-[#0D0624]">
                          {program.title}
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed text-[#0D0624]/68">
                          {program.summary}
                        </p>
                      </div>

                      <p className="mt-5 border-t border-[#0D0624]/10 pt-3.5 text-xs font-medium text-[#0D0624]/60">
                        For {program.audience}
                      </p>
                    </div>
                  </article>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </div>
      </section>

      <PageBridge
        kicker="Next · Contact & Partnerships"
        title="Ready to collaborate or apply?"
        description="Connect with AfriYouth regarding cohorts, research fellowships, or ecosystem partnerships."
        actionLabel="Contact AfriYouth"
        targetPage="contact"
      />
    </div>
  );
}
