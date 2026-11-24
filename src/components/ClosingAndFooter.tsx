import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AUDIENCE_TOPICS,
  getDefaultTopicForAudience,
  hasValidationErrors,
  validateInquiryForm,
  type AudienceType,
  type InquiryFormValues,
  type InquiryValidationErrors,
} from '../utils/inquiryLogic';
import type { PageId } from '../utils/routing';
import {
  FRAMER_EASE,
  Reveal,
  RevealItem,
  RevealStagger,
  SlideReveal,
} from './MotionPrimitives';
import { PageHeader } from './PageHeader';
import SplitText from './SplitText';

interface ClosingAndFooterProps {
  selectedAudience: AudienceType;
  onAudienceChange: (audience: AudienceType) => void;
  onNavigate: (page: PageId) => void;
}

const AUDIENCE_LABELS: Record<AudienceType, string> = {
  innovator: 'Young Innovator',
  institution: 'Institution / Organization',
  partner: 'Partner / Collaborator',
};

const ENGAGEMENT_ROUTES: Array<{
  id: AudienceType;
  title: string;
  summary: string;
}> = [
  {
    id: 'innovator',
    title: 'Young Innovators',
    summary: 'Explore venture labs, the Policy Innovation Challenge, and employability bootcamps.',
  },
  {
    id: 'institution',
    title: 'Institutions & Organizations',
    summary: 'Commission applied research, policy advisory, 2050 foresight, or M&E frameworks.',
  },
  {
    id: 'partner',
    title: 'Partners & Funders',
    summary: 'Co-design cohorts, align capital, and scale validated youth innovations across Africa.',
  },
];

export function ClosingAndFooter({
  selectedAudience,
  onAudienceChange,
  onNavigate,
}: ClosingAndFooterProps) {
  const [values, setValues] = useState<InquiryFormValues>({
    fullName: '',
    organization: '',
    email: '',
    audience: selectedAudience,
    topic: getDefaultTopicForAudience(selectedAudience),
    message: '',
  });
  const [errors, setErrors] = useState<InquiryValidationErrors>({});
  const [submittedRecord, setSubmittedRecord] = useState<InquiryFormValues | null>(null);

  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      audience: selectedAudience,
      topic: getDefaultTopicForAudience(selectedAudience),
    }));
    setErrors({});
    setSubmittedRecord(null);
  }, [selectedAudience]);

  const handleAudienceSwitch = (nextAudience: AudienceType) => {
    onAudienceChange(nextAudience);
    setValues((prev) => ({
      ...prev,
      audience: nextAudience,
      topic: getDefaultTopicForAudience(nextAudience),
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateInquiryForm(values);
    setErrors(validation);
    if (hasValidationErrors(validation)) {
      return;
    }
    setSubmittedRecord(values);
  };

  const handleReset = () => {
    setSubmittedRecord(null);
    setErrors({});
    setValues({
      fullName: '',
      organization: '',
      email: '',
      audience: selectedAudience,
      topic: getDefaultTopicForAudience(selectedAudience),
      message: '',
    });
  };

  const topics = AUDIENCE_TOPICS[values.audience];

  return (
    <div id="contact" className="bg-white text-[#0D0624]">
      <PageHeader
        currentLabel="Contact"
        kicker="Contact & Partnerships"
        title="Connect with AfriYouth Innovation Labs."
        lead="Direct inquiry desk for young innovators, institutions commissioning advisory work, and strategic partners."
        image="/images/youth-prototyping.jpg"
        imageAlt="Young African engineer soldering and testing electronics prototypes in a studio"
        imagePosition="object-[center_26%]"
        onNavigate={onNavigate}
      />

      {/* Executive Two-Column Contact Desk */}
      <section id="inquiry-desk" className="py-16 sm:py-24 overflow-x-clip">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
            {/* Left Column: Editorial Headline + Clickable Engagement Routes */}
            <SlideReveal direction="left" distance={22} className="lg:col-span-5">
              <Reveal y={14}>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#0301FF]">
                  Get in Touch
                </p>
              </Reveal>
              <SplitText
                tag="h2"
                text="Let’s work together for lasting youth impact."
                className="mt-3 w-full font-display text-3xl sm:text-4xl font-bold leading-[1.14] tracking-tight text-[#0D0624]"
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
                <p className="mt-4 text-base leading-relaxed text-[#0D0624]/72">
                  Select how you are engaging with AfriYouth below or share your inquiry directly. Our
                  team supports youth cohorts, institutional advisory mandates, and ecosystem alliances.
                </p>
              </Reveal>

              {/* Quiet Interactive Pathway Directory */}
              <RevealStagger
                stagger={0.07}
                amount={0.08}
                className="mt-8 border-t border-[#0D0624]/10 divide-y divide-[#0D0624]/10"
              >
                {ENGAGEMENT_ROUTES.map((route) => {
                  const isActive = values.audience === route.id;
                  return (
                    <RevealItem key={route.id} y={14}>
                      <button
                        type="button"
                        onClick={() => handleAudienceSwitch(route.id)}
                        className="group w-full py-5 text-left flex items-start justify-between gap-4 cursor-pointer"
                      >
                        <div>
                          <p
                            className={`font-display text-base font-bold transition-colors ${
                              isActive
                                ? 'text-[#0301FF]'
                                : 'text-[#0D0624] group-hover:text-[#0301FF]'
                            }`}
                          >
                            {route.title}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-[#0D0624]/68">
                            {route.summary}
                          </p>
                        </div>
                        <ArrowRight
                          className={`h-4 w-4 shrink-0 mt-1 transition-[color,transform] duration-200 ${
                            isActive
                              ? 'text-[#0301FF] translate-x-0.5'
                              : 'text-[#0D0624]/30 group-hover:text-[#0301FF] group-hover:translate-x-0.5'
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </RevealItem>
                  );
                })}
              </RevealStagger>

              <p className="mt-6 text-xs leading-relaxed text-[#0D0624]/55">
                Official email addresses and regional communication channels are published upon formal
                institutional release by AfriYouth Innovation Labs.
              </p>
            </SlideReveal>

            {/* Right Column: Clean Bordered Engagement Form */}
            <div className="lg:col-span-7">
              <SlideReveal
                direction="right"
                distance={22}
                delay={0.06}
                className="rounded-[24px] border border-[#0D0624]/10 bg-[#F7F7FA] p-7 sm:p-10 text-[#0D0624]"
              >
                <div className="border-b border-[#0D0624]/10 pb-5 mb-7">
                  <h3 className="font-display text-2xl font-bold tracking-tight text-[#0D0624]">
                    Send an inquiry
                  </h3>
                  <p className="mt-1.5 text-sm text-[#0D0624]/65">
                    Complete the brief below to route your message to the relevant AfriYouth team.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {submittedRecord ? (
                    <motion.div
                      key="submitted"
                      role="status"
                      aria-live="polite"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: FRAMER_EASE }}
                      className="rounded-2xl border border-[#0301FF]/20 bg-white p-7"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2
                          className="h-6 w-6 text-[#0301FF] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <div>
                          <h4 className="font-display text-lg font-bold text-[#0D0624]">
                            Inquiry Received
                          </h4>
                          <p className="mt-1 text-sm text-[#0D0624]/75">
                            Thank you, {submittedRecord.fullName}. Your{' '}
                            {AUDIENCE_LABELS[submittedRecord.audience].toLowerCase()} inquiry regarding{' '}
                            <span className="font-semibold text-[#0D0624]">
                              {submittedRecord.topic}
                            </span>{' '}
                            has been validated.
                          </p>
                          <dl className="mt-4 space-y-1.5 border-t border-[#0D0624]/10 pt-4 text-xs text-[#0D0624]/75">
                            <div className="flex justify-between gap-4">
                              <dt className="font-semibold text-[#0D0624]">Email</dt>
                              <dd>{submittedRecord.email}</dd>
                            </div>
                            {submittedRecord.organization && (
                              <div className="flex justify-between gap-4">
                                <dt className="font-semibold text-[#0D0624]">Organization</dt>
                                <dd>{submittedRecord.organization}</dd>
                              </div>
                            )}
                          </dl>
                          <motion.button
                            type="button"
                            onClick={handleReset}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.18 }}
                            className="mt-5 inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#0D0624] px-5 py-2 font-display text-xs font-semibold text-white hover:bg-[#0301FF] transition-colors cursor-pointer"
                          >
                            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Send Another Inquiry</span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: FRAMER_EASE }}
                      onSubmit={handleSubmit}
                      noValidate
                      className="space-y-5"
                    >
                      <div>
                        <span className="block text-xs font-semibold text-[#0D0624] mb-2">
                          Pathway
                        </span>
                        <div
                          role="group"
                          aria-label="Engagement pathway"
                          className="grid grid-cols-1 sm:grid-cols-3 gap-2"
                        >
                          {(['innovator', 'institution', 'partner'] as AudienceType[]).map((type) => {
                            const active = values.audience === type;
                            return (
                              <button
                                key={type}
                                type="button"
                                onClick={() => handleAudienceSwitch(type)}
                                aria-pressed={active}
                                className={`min-h-[42px] rounded-full px-3 py-2 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                                  active
                                    ? 'bg-[#0D0624] text-white'
                                    : 'border border-[#0D0624]/10 bg-white text-[#0D0624]/75 hover:text-[#0D0624]'
                                }`}
                              >
                                {AUDIENCE_LABELS[type]}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="inquiry-name"
                            className="block text-xs font-semibold text-[#0D0624] mb-1.5"
                          >
                            Full Name <span className="text-[#C723DF]">*</span>
                          </label>
                          <input
                            id="inquiry-name"
                            type="text"
                            value={values.fullName}
                            onChange={(e) => setValues({ ...values, fullName: e.target.value })}
                            aria-invalid={Boolean(errors.fullName)}
                            placeholder="Your full name"
                            className="w-full rounded-xl border border-[#0D0624]/15 bg-white px-4 py-3 text-sm text-[#0D0624] placeholder:text-[#0D0624]/40 focus:border-[#0301FF] focus:outline-none"
                          />
                          {errors.fullName && (
                            <p role="alert" className="mt-1 text-xs font-medium text-[#C723DF]">
                              {errors.fullName}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="inquiry-email"
                            className="block text-xs font-semibold text-[#0D0624] mb-1.5"
                          >
                            Email Address <span className="text-[#C723DF]">*</span>
                          </label>
                          <input
                            id="inquiry-email"
                            type="email"
                            value={values.email}
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                            aria-invalid={Boolean(errors.email)}
                            placeholder="name@organization.org"
                            className="w-full rounded-xl border border-[#0D0624]/15 bg-white px-4 py-3 text-sm text-[#0D0624] placeholder:text-[#0D0624]/40 focus:border-[#0301FF] focus:outline-none"
                          />
                          {errors.email && (
                            <p role="alert" className="mt-1 text-xs font-medium text-[#C723DF]">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="inquiry-org"
                            className="block text-xs font-semibold text-[#0D0624] mb-1.5"
                          >
                            Organization / Institution{' '}
                            {values.audience !== 'innovator' && (
                              <span className="text-[#C723DF]">*</span>
                            )}
                          </label>
                          <input
                            id="inquiry-org"
                            type="text"
                            value={values.organization}
                            onChange={(e) => setValues({ ...values, organization: e.target.value })}
                            aria-invalid={Boolean(errors.organization)}
                            placeholder={
                              values.audience === 'innovator'
                                ? 'University, venture, or independent'
                                : 'Organization name'
                            }
                            className="w-full rounded-xl border border-[#0D0624]/15 bg-white px-4 py-3 text-sm text-[#0D0624] placeholder:text-[#0D0624]/40 focus:border-[#0301FF] focus:outline-none"
                          />
                          {errors.organization && (
                            <p role="alert" className="mt-1 text-xs font-medium text-[#C723DF]">
                              {errors.organization}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="inquiry-topic"
                            className="block text-xs font-semibold text-[#0D0624] mb-1.5"
                          >
                            Area of Interest <span className="text-[#C723DF]">*</span>
                          </label>
                          <select
                            id="inquiry-topic"
                            value={values.topic}
                            onChange={(e) => setValues({ ...values, topic: e.target.value })}
                            aria-invalid={Boolean(errors.topic)}
                            className="w-full rounded-xl border border-[#0D0624]/15 bg-white px-4 py-3 text-sm text-[#0D0624] focus:border-[#0301FF] focus:outline-none"
                          >
                            {topics.map((topic) => (
                              <option key={topic} value={topic}>
                                {topic}
                              </option>
                            ))}
                          </select>
                          {errors.topic && (
                            <p role="alert" className="mt-1 text-xs font-medium text-[#C723DF]">
                              {errors.topic}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="inquiry-message"
                          className="block text-xs font-semibold text-[#0D0624] mb-1.5"
                        >
                          Message <span className="text-[#C723DF]">*</span>
                        </label>
                        <textarea
                          id="inquiry-message"
                          rows={4}
                          value={values.message}
                          onChange={(e) => setValues({ ...values, message: e.target.value })}
                          aria-invalid={Boolean(errors.message)}
                          placeholder="Describe your idea, institutional mandate, or collaboration focus..."
                          className="w-full rounded-xl border border-[#0D0624]/15 bg-white px-4 py-3 text-sm text-[#0D0624] placeholder:text-[#0D0624]/40 focus:border-[#0301FF] focus:outline-none"
                        />
                        {errors.message && (
                          <p role="alert" className="mt-1 text-xs font-medium text-[#C723DF]">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.18 }}
                        className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center rounded-full bg-[#0301FF] px-8 py-3 font-display text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0200A7] cursor-pointer"
                      >
                        Send Message
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </SlideReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
