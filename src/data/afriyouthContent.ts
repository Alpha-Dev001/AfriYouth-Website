export interface PhilosophyStage {
  id: string;
  number: string;
  title: string;
  headline: string;
  summary: string;
  focus: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
}

export interface ExpertisePillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  missionLink: string;
  flagshipProducts: string[];
  services: string[];
  image: string;
  imageAlt: string;
  imagePosition: string;
}

export type AcceleratorPhaseId = 'all' | 'discovery' | 'design-policy' | 'pilot-scale';

export interface AcceleratorStage {
  step: string;
  title: string;
  phase: Exclude<AcceleratorPhaseId, 'all'>;
  summary: string;
  detail: string;
  output: string;
}

export interface AudiencePathway {
  id: 'innovator' | 'institution' | 'partner';
  audience: string;
  kicker: string;
  headline: string;
  description: string;
  engagementPoints: string[];
  ctaLabel: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
}

export const BRAND = {
  name: 'AfriYouth Innovation Labs',
  shortName: 'AfriYouth',
  tagline: 'Fueling Innovators for Sustainable Development',
  colors: {
    blue: '#0301FF',
    steelPink: '#C723DF',
    white: '#FFFFFF',
    dukeBlue: '#0200A7',
    darkPurple: '#0D0624',
  },
  keywords: [
    'Innovation',
    'Youth Empowerment',
    'Sustainability',
    'Global Impact',
    'Human-Centered Design',
    'Leadership Development',
  ],
} as const;

export const MISSION_AND_VISION = {
  organizationSummary:
    'AfriYouth Innovation Labs is a research, innovation and policy consulting firm that identifies, nurtures, and advances promising ideas from Africa’s young innovators to address the Sustainable Development Goals (SDGs).',
  contextStatement:
    'With Africa projected to have the world’s largest workforce by 2030, young people need the capabilities, evidence systems, and institutional pathways to solve complex African challenges—driving self-reliance and sustainable socio-economic transformation.',
  mission:
    'To empower Africa’s youth to generate evidence, shape policy, and develop innovative solutions to Africa’s most pressing socio-economic challenges through research, human-centered design, and entrepreneurship.',
  vision:
    'To build an Africa where empowered young people use evidence, innovation, and entrepreneurship to solve complex challenges, shape policies and drive inclusive and sustainable socio-economic transformation by 2050.',
} as const;

export const PHILOSOPHY_STAGES: PhilosophyStage[] = [
  {
    id: 'think',
    number: '01',
    title: 'Think',
    headline: 'Interrogate complex realities with clarity',
    summary:
      'Question conventional assumptions through critical systems thinking and long-horizon strategic foresight across Africa’s evolving socio-economic landscape.',
    focus: 'Systems Thinking & Strategic Framing',
    image: '/images/vr-innovation.jpg',
    imageAlt: 'African specialist wearing virtual reality hardware while sketching concepts on a digital tablet',
    imagePosition: 'object-[center_22%]',
  },
  {
    id: 'research',
    number: '02',
    title: 'Research',
    headline: 'Ground every idea in rigorous evidence',
    summary:
      'Conduct applied socio-economic studies, youth surveys, and political-economy diagnostics so solutions address verified root causes rather than surface symptoms.',
    focus: 'Applied Evidence & Diagnostics',
    image: '/images/vr-experience.jpg',
    imageAlt: 'Young African researcher in glasses testing laboratory instrumentation with precision probes',
    imagePosition: 'object-[center_25%]',
  },
  {
    id: 'design',
    number: '03',
    title: 'Design',
    headline: 'Co-create human-centered solutions',
    summary:
      'Apply Human-Centered Design and design thinking alongside communities to shape practical products, services, and policy interventions built for real-world context.',
    focus: 'Human-Centered Design',
    image: '/images/team-collaboration.jpg',
    imageAlt: 'Young African innovator wearing a virtual reality headset beside an electronics workbench',
    imagePosition: 'object-[center_18%]',
  },
  {
    id: 'build',
    number: '04',
    title: 'Build',
    headline: 'Prototype, test, and refine ventures',
    summary:
      'Move from concept to working prototype, business-model validation, and institutional readiness inside practical innovation and venture environments.',
    focus: 'Prototyping & Venture Validation',
    image: '/images/youth-prototyping.jpg',
    imageAlt: 'Young engineer carefully soldering and assembling circuit hardware in an innovation studio',
    imagePosition: 'object-[center_30%]',
  },
  {
    id: 'influence',
    number: '05',
    title: 'Influence',
    headline: 'Translate evidence into policy reform',
    summary:
      'Connect youth-generated evidence directly with decision-makers through policy briefs, regulatory dialogues, and the Policy Innovation Challenge.',
    focus: 'Policy Engagement & Governance',
    image: '/images/electronics-innovation.jpg',
    imageAlt: 'African engineers and youth leaders collaborating outdoors beneath clean energy solar panels',
    imagePosition: 'object-[center_25%]',
  },
  {
    id: 'scale',
    number: '06',
    title: 'Scale',
    headline: 'Sustain and expand what works',
    summary:
      'Measure outcomes with disciplined monitoring and evaluation frameworks while preparing validated initiatives for resource mobilization, partnerships, and broader adoption.',
    focus: 'Impact Measurement & Adoption',
    image: '/images/team-startup.jpg',
    imageAlt: 'Young African founder smiling and holding a Start Up notebook with colleagues collaborating behind her',
    imagePosition: 'object-[center_22%]',
  },
];

export const EXPERTISE_PILLARS: ExpertisePillar[] = [
  {
    id: 'research-evidence',
    number: '01',
    title: 'Research & Evidence',
    subtitle: 'Generating rigorous knowledge on Africa’s emerging challenges',
    summary:
      'Helps institutions, partners, and young innovators understand complex socio-economic realities before acting—producing independent applied research and evidence synthesis.',
    missionLink:
      'Anchors AfriYouth’s mission by equipping youth and institutions to generate credible evidence that informs practical solutions.',
    flagshipProducts: ['AfriYouth Evidence Reports'],
    services: [
      'Applied policy research & socio-economic research',
      'Youth research, surveys & evidence synthesis',
      'Baseline and endline studies & impact assessments',
      'Institutional, stakeholder & political-economy analysis',
    ],
    image: '/images/vr-experience.jpg',
    imageAlt: 'Young African researcher testing electronic laboratory instrumentation',
    imagePosition: 'object-[center_20%]',
  },
  {
    id: 'policy-governance',
    number: '02',
    title: 'Policy & Governance',
    subtitle: 'Translating evidence into actionable institutional reforms',
    summary:
      'Bridges youth-led insight and public decision-making through structured policy design, governance diagnostics, and the Policy Innovation Challenge—asking young innovators what pressing problem they can solve with evidence.',
    missionLink:
      'Directly advances youth participation in shaping policies across youth employment, climate, digital transformation, AI, education, and health.',
    flagshipProducts: ['AfriYouth Policy Solutions Series', 'Policy Innovation Challenge'],
    services: [
      'Policy analysis, design, review & regulatory analysis',
      'Governance diagnostics & public-sector innovation',
      'Policy briefs & stakeholder mapping',
      'Policy dialogue facilitation & implementation support',
    ],
    image: '/images/electronics-innovation.jpg',
    imageAlt: 'Young professionals and engineers reviewing field data beneath clean energy solar infrastructure',
    imagePosition: 'object-[center_20%]',
  },
  {
    id: 'innovation-entrepreneurship',
    number: '03',
    title: 'Innovation & Entrepreneurship',
    subtitle: 'Advancing community-driven ideas into viable ventures',
    summary:
      'Combines Human-Centered Design with venture incubation and acceleration inside the Youth Innovation & Venture Lab—guiding solutions from idea discovery through prototyping, market validation, and investor readiness.',
    missionLink:
      'Transforms promising community-driven concepts into practical, scalable solutions contributing to sustainable development.',
    flagshipProducts: ['AfriYouth Innovation Accelerator', 'Youth Innovation & Venture Lab'],
    services: [
      'Idea discovery, Human-Centered Design & design thinking',
      'Business-model & prototype development',
      'Market validation, incubation & acceleration',
      'Pitch preparation & investor readiness',
    ],
    image: '/images/youth-prototyping.jpg',
    imageAlt: 'Hands-on electronics engineering and prototyping in a lab',
    imagePosition: 'object-[center_25%]',
  },
  {
    id: 'foresight-impact',
    number: '04',
    title: 'Strategic Foresight & Impact',
    subtitle: 'Anticipating 2050 horizons while building capable leaders',
    summary:
      'Unites the Strategic Foresight & Futures Lab (2030/2040/2050 scenario planning and horizon scanning) with the Career & Professional Development Academy and Impact & Learning Services to ensure initiatives remain future-ready and measurable.',
    missionLink:
      'Prepares Africa’s emerging leaders and institutions to navigate long-term change and demonstrate real-world outcomes toward 2050.',
    flagshipProducts: [
      'Africa 2050 Futures Series',
      'Career & Professional Development Academy',
      'AfriYouth Impact Dashboard (Concept)',
    ],
    services: [
      'Scenario planning, horizon scanning & PESTLE/STEEPV analysis',
      'Future-of-work & emerging technology analysis',
      'Employability bootcamps & experiential competency simulations',
      'Theory of Change, logical frameworks, M&E systems & KPIs',
    ],
    image: '/images/team-collaboration.jpg',
    imageAlt: 'Young African innovator exploring emerging virtual reality tools alongside lab equipment',
    imagePosition: 'object-[center_18%]',
  },
];

export const CROSS_CUTTING_CAPABILITIES = [
  {
    title: 'Resource Mobilization & Investment Readiness',
    classification: 'Cross-Cutting Advisory Service',
    description:
      'Supports organizations and emerging ventures in becoming funding- and investment-ready—covering grant opportunity intelligence, grant strategy, proposal development, donor mapping, financial modelling, business cases, and due-diligence preparation.',
  },
  {
    title: 'Impact & Learning Services',
    classification: 'Supportive Institutional Service',
    description:
      'Helps partner institutions demonstrate whether initiatives work through Theory of Change design, logical frameworks, M&E systems, outcome measurement, learning reports, and disciplined impact storytelling.',
  },
];

export interface ServiceItem {
  id: string;
  title: string;
  series: string;
  shortDescription: string;
  fullSummary: string;
  deliverables: string[];
  image: string;
  imageAlt: string;
  imagePosition: string;
}

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: 'research-evidence',
    title: 'Research & Evidence',
    series: 'AfriYouth Evidence Reports',
    shortDescription:
      'Independent socio-economic research, youth surveys, and baseline diagnostics grounding action in verified reality.',
    fullSummary:
      'Helps institutions, partners, and young innovators understand complex socio-economic realities before acting—producing independent applied research and evidence synthesis.',
    deliverables: [
      'Applied policy research & socio-economic research',
      'Youth research, surveys & evidence synthesis',
      'Baseline and endline studies & impact assessments',
      'Institutional, stakeholder & political-economy analysis',
    ],
    image: '/images/vr-experience.jpg',
    imageAlt: 'Young African researcher inspecting electronic laboratory instrumentation',
    imagePosition: 'object-[center_20%]',
  },
  {
    id: 'policy-governance',
    title: 'Policy & Governance',
    series: 'AfriYouth Policy Solutions Series',
    shortDescription:
      'Structured policy design, governance diagnostics, and dialogues turning youth-led insights into institutional reform.',
    fullSummary:
      'Bridges youth-led insight and public decision-making through structured policy design, governance diagnostics, and the Policy Innovation Challenge.',
    deliverables: [
      'Policy analysis, design, review & regulatory analysis',
      'Governance diagnostics & public-sector innovation',
      'Policy briefs & stakeholder mapping',
      'Policy dialogue facilitation & implementation support',
    ],
    image: '/images/electronics-innovation.jpg',
    imageAlt: 'African engineers and policy specialists collaborating beneath solar panels',
    imagePosition: 'object-[center_20%]',
  },
  {
    id: 'innovation-entrepreneurship',
    title: 'Innovation & Entrepreneurship',
    series: 'AfriYouth Innovation Accelerator',
    shortDescription:
      'Human-Centered Design, prototyping, and venture validation transforming community ideas into viable enterprises.',
    fullSummary:
      'Combines Human-Centered Design with venture incubation inside the Youth Innovation & Venture Lab—guiding ideas from discovery through market validation and investor readiness.',
    deliverables: [
      'Idea discovery, Human-Centered Design & design thinking',
      'Business-model & prototype development',
      'Market validation, incubation & acceleration',
      'Pitch preparation & investor readiness',
    ],
    image: '/images/youth-prototyping.jpg',
    imageAlt: 'Young innovator assembling hardware prototypes in an electronics workshop',
    imagePosition: 'object-[center_25%]',
  },
  {
    id: 'strategic-foresight',
    title: 'Strategic Foresight',
    series: 'Africa 2050 Futures Series',
    shortDescription:
      'Horizon scanning, 2030–2050 scenario planning, and workforce readiness equipping leaders for long-term change.',
    fullSummary:
      'Connects the Strategic Foresight & Futures Lab with the Career & Professional Development Academy to prepare Africa’s institutions and emerging leaders for 2050 horizons.',
    deliverables: [
      'Scenario planning, horizon scanning & PESTLE/STEEPV analysis',
      'Future-of-work & emerging technology analysis',
      'Employability bootcamps & competency simulations',
      'Long-horizon institutional strategy & preparedness',
    ],
    image: '/images/team-collaboration.jpg',
    imageAlt: 'Young African technologist exploring emerging VR tools alongside hardware systems',
    imagePosition: 'object-[center_18%]',
  },
  {
    id: 'resource-mobilization',
    title: 'Resource Mobilization & Investment',
    series: 'Cross-Cutting Advisory Service',
    shortDescription:
      'Grant strategy, donor mapping, financial modelling, and due-diligence readiness unlocking growth capital.',
    fullSummary:
      'Supports organizations and emerging ventures in becoming funding- and investment-ready across institutional grants, philanthropic capital, and private partnerships.',
    deliverables: [
      'Grant opportunity intelligence & grant strategy',
      'Proposal development & donor mapping',
      'Financial modelling & structured business cases',
      'Partner alignment & due-diligence preparation',
    ],
    image: '/images/team-startup.jpg',
    imageAlt: 'Young African founder smiling with Start Up notebook alongside team collaborators',
    imagePosition: 'object-[center_26%]',
  },
  {
    id: 'impact-learning',
    title: 'Impact & Learning Systems',
    series: 'Monitoring, Evaluation & Learning',
    shortDescription:
      'Theory of Change architecture, KPI frameworks, and outcome evaluations proving measurable real-world results.',
    fullSummary:
      'Helps partner institutions demonstrate whether initiatives work through rigorous evaluation frameworks, outcome measurement, and disciplined impact reporting.',
    deliverables: [
      'Theory of Change & logical framework design',
      'Monitoring & Evaluation (M&E) systems & KPI architecture',
      'Outcome measurement & learning reports',
      'Evidence-backed impact synthesis & reporting',
    ],
    image: '/images/vr-innovation.jpg',
    imageAlt: 'Specialist reviewing digital systems metrics while wearing virtual reality gear',
    imagePosition: 'object-[center_20%]',
  },
];

export const ACCELERATOR_STAGES: AcceleratorStage[] = [
  {
    step: '01',
    title: 'Discover',
    phase: 'discovery',
    summary: 'Identify the problem through community research.',
    detail:
      'Engage directly with communities and young citizens to surface lived socio-economic challenges before framing interventions.',
    output: 'Community Problem Framing',
  },
  {
    step: '02',
    title: 'Diagnose',
    phase: 'discovery',
    summary: 'Understand root causes using systems and political-economy analysis.',
    detail:
      'Map institutional incentives, structural barriers, and systemic dependencies shaping the challenge.',
    output: 'Systems & Root-Cause Map',
  },
  {
    step: '03',
    title: 'Research',
    phase: 'discovery',
    summary: 'Generate and analyse evidence.',
    detail:
      'Conduct baseline studies, youth surveys, and applied socio-economic research to establish a verified evidentiary foundation.',
    output: 'Applied Evidence Synthesis',
  },
  {
    step: '04',
    title: 'Design',
    phase: 'design-policy',
    summary: 'Develop a human-centered solution.',
    detail:
      'Co-design practical interventions, service architectures, or policy mechanisms tailored to real user and institutional needs.',
    output: 'Human-Centered Solution Blueprint',
  },
  {
    step: '05',
    title: 'Prototype',
    phase: 'design-policy',
    summary: 'Build and test the solution.',
    detail:
      'Create tangible prototypes and test core assumptions iteratively with users and stakeholders to refine feasibility.',
    output: 'Validated Working Prototype',
  },
  {
    step: '06',
    title: 'Policy',
    phase: 'design-policy',
    summary: 'Develop policy recommendations and/or business cases.',
    detail:
      'Articulate regulatory pathways, policy briefs, or sustainable venture models required for adoption.',
    output: 'Policy Brief & Business Case',
  },
  {
    step: '07',
    title: 'Finance',
    phase: 'design-policy',
    summary: 'Connect the solution to funders, investors and partners.',
    detail:
      'Prepare investment-ready dossiers, financial models, and grant or partner alignments to unlock implementation capital.',
    output: 'Investment & Resource Readiness',
  },
  {
    step: '08',
    title: 'Implement',
    phase: 'pilot-scale',
    summary: 'Pilot the solution.',
    detail:
      'Deploy structured real-world pilots alongside community, public, or institutional delivery partners.',
    output: 'Structured Field Pilot',
  },
  {
    step: '09',
    title: 'Measure',
    phase: 'pilot-scale',
    summary: 'Evaluate outcomes and impact.',
    detail:
      'Track indicators against Theory of Change and logical frameworks to determine what genuinely works and why.',
    output: 'M&E Outcome Assessment',
  },
  {
    step: '10',
    title: 'Scale',
    phase: 'pilot-scale',
    summary: 'Scale what works.',
    detail:
      'Expand proven models across regions, institutions, and policy frameworks for lasting African transformation.',
    output: 'Institutional & Regional Adoption',
  },
];

export const AUDIENCE_PATHWAYS: AudiencePathway[] = [
  {
    id: 'innovator',
    audience: 'Young Innovators',
    kicker: 'Pathway 01',
    headline: 'Develop evidence-backed ideas and leadership capacity',
    description:
      'For young Africans seeking structured pathways to investigate pressing socio-economic challenges, build human-centered prototypes, strengthen career readiness, and engage in policy innovation.',
    engagementPoints: [
      'Youth Innovation & Venture Lab & AfriYouth Innovation Accelerator',
      'Policy Innovation Challenge & Policy Innovation Demo Day',
      'Career & Professional Development Academy (Bootcamps & Simulations)',
    ],
    ctaLabel: 'Explore Innovator Pathways',
    image: '/images/team-startup.jpg',
    imageAlt: 'Young African innovator smiling and holding a Start Up notebook in a bright collaborative workspace',
    imagePosition: 'object-[center_20%]',
  },
  {
    id: 'institution',
    audience: 'Institutions & Organizations',
    kicker: 'Pathway 02',
    headline: 'Commission applied research, policy, foresight, and M&E',
    description:
      'For government ministries, development agencies, universities, and NGOs seeking rigorous research, governance diagnostics, human-centered program design, strategic foresight, or investment readiness.',
    engagementPoints: [
      'Applied policy research, baseline/endline studies & evaluations',
      'Policy analysis, dialogue facilitation & strategic foresight (2030–2050)',
      'Impact & Learning frameworks & Resource Mobilization support',
    ],
    ctaLabel: 'Request Institutional Briefing',
    image: '/images/vr-innovation.jpg',
    imageAlt: 'Specialist wearing virtual reality hardware and working with digital stylus at an institutional desk',
    imagePosition: 'object-[center_22%]',
  },
  {
    id: 'partner',
    audience: 'Partners & Collaborators',
    kicker: 'Pathway 03',
    headline: 'Co-build ecosystems that advance African youth solutions',
    description:
      'For foundations, research institutions, private-sector leaders, and funding partners interested in advancing shared SDG objectives through the Evidence-to-Impact Accelerator.',
    engagementPoints: [
      'Co-hosting Policy Innovation Challenges & Venture Lab cohorts',
      'Joint research publications & Africa 2050 Futures Series',
      'Funding alignment & scaling validated youth-led solutions',
    ],
    ctaLabel: 'Initiate Partnership Dialogue',
    image: '/images/electronics-innovation.jpg',
    imageAlt: 'Diverse team of professionals collaborating outdoors under clean energy solar panels',
    imagePosition: 'object-[center_25%]',
  },
];
