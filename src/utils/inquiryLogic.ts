export type AudienceType = 'innovator' | 'institution' | 'partner';

export interface InquiryFormValues {
  fullName: string;
  organization: string;
  email: string;
  audience: AudienceType;
  topic: string;
  message: string;
}

export interface InquiryValidationErrors {
  fullName?: string;
  organization?: string;
  email?: string;
  topic?: string;
  message?: string;
}

export const AUDIENCE_TOPICS: Record<AudienceType, string[]> = {
  innovator: [
    'Youth Innovation & Venture Lab',
    'Policy Innovation Challenge',
    'Career & Professional Development Academy',
    'Evidence-to-Impact Accelerator',
  ],
  institution: [
    'Research & Evidence Services',
    'Policy & Governance Consulting',
    'Strategic Foresight & 2050 Scenarios',
    'Impact & Learning / M&E Systems',
    'Resource Mobilization & Investment Readiness',
  ],
  partner: [
    'Evidence-to-Impact Accelerator Co-Design',
    'Research & Policy Collaboration',
    'Ecosystem & Funding Partnership',
    'General Institutional Partnership',
  ],
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateInquiryForm(values: InquiryFormValues): InquiryValidationErrors {
  const errors: InquiryValidationErrors = {};

  const trimmedName = values.fullName.trim();
  if (!trimmedName) {
    errors.fullName = 'Please enter your full name.';
  } else if (trimmedName.length < 2) {
    errors.fullName = 'Name must be at least 2 characters.';
  }

  if (values.audience !== 'innovator' && !values.organization.trim()) {
    errors.organization = 'Please specify your institution or organization name.';
  }

  const trimmedEmail = values.email.trim();
  if (!trimmedEmail) {
    errors.email = 'Please provide an email address.';
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.topic.trim()) {
    errors.topic = 'Please select an area of interest.';
  }

  const trimmedMessage = values.message.trim();
  if (!trimmedMessage) {
    errors.message = 'Please share a brief note about your inquiry.';
  } else if (trimmedMessage.length < 15) {
    errors.message = 'Please provide at least 15 characters describing your inquiry.';
  }

  return errors;
}

export function hasValidationErrors(errors: InquiryValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function clampStageIndex(index: number, total: number): number {
  if (total <= 0) return 0;
  if (index < 0) return 0;
  if (index >= total) return total - 1;
  return index;
}

export function getDefaultTopicForAudience(audience: AudienceType): string {
  return AUDIENCE_TOPICS[audience][0];
}

export type AcceleratorPhaseFilterId = 'all' | 'discovery' | 'design-policy' | 'pilot-scale';
export type AcceleratorPhaseGroupId = Exclude<AcceleratorPhaseFilterId, 'all'>;

export interface AcceleratorPhaseOption {
  id: AcceleratorPhaseFilterId;
  label: string;
}

export interface AcceleratorPhaseMeta {
  id: AcceleratorPhaseGroupId;
  number: string;
  label: string;
  range: string;
  summary: string;
}

export const ACCELERATOR_PHASE_GROUPS: AcceleratorPhaseMeta[] = [
  {
    id: 'discovery',
    number: 'Phase 01',
    label: 'Evidence & Diagnosis',
    range: 'Stages 01–03',
    summary: 'Frame lived community challenges, map root causes, and ground solutions in empirical evidence.',
  },
  {
    id: 'design-policy',
    number: 'Phase 02',
    label: 'Design, Policy & Capital',
    range: 'Stages 04–07',
    summary: 'Co-design human-centered solutions, build prototypes, shape policy briefs, and structure financing.',
  },
  {
    id: 'pilot-scale',
    number: 'Phase 03',
    label: 'Pilot, M&E & Scale',
    range: 'Stages 08–10',
    summary: 'Run real-world field pilots, evaluate measurable impact, and scale proven institutional models.',
  },
];

export const ACCELERATOR_PHASES: AcceleratorPhaseOption[] = [
  { id: 'all', label: 'All 10 Stages' },
  { id: 'discovery', label: 'Evidence & Diagnosis (01–03)' },
  { id: 'design-policy', label: 'Design, Policy & Capital (04–07)' },
  { id: 'pilot-scale', label: 'Pilot, M&E & Scale (08–10)' },
];

export function filterAcceleratorStages<T extends { phase: string }>(
  stages: readonly T[],
  phase: AcceleratorPhaseOption['id']
): T[] {
  if (phase === 'all') return [...stages];
  return stages.filter((stage) => stage.phase === phase);
}

export function getPhaseMetaById(phaseId: AcceleratorPhaseGroupId): AcceleratorPhaseMeta {
  return (
    ACCELERATOR_PHASE_GROUPS.find((group) => group.id === phaseId) ?? ACCELERATOR_PHASE_GROUPS[0]
  );
}

export function getFirstStageIndexForPhase<T extends { phase: string }>(
  stages: readonly T[],
  phaseId: AcceleratorPhaseGroupId
): number {
  const idx = stages.findIndex((stage) => stage.phase === phaseId);
  return idx >= 0 ? idx : 0;
}


