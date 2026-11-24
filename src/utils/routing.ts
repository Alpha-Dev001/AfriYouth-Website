export type PageId = 'home' | 'about' | 'services' | 'programs' | 'contact';

export interface RouteMeta {
  id: PageId;
  path: string;
  label: string;
  title: string;
  description: string;
}

export const ROUTES: RouteMeta[] = [
  {
    id: 'home',
    path: '/',
    label: 'Home',
    title: 'AfriYouth Innovation Labs — Fueling Innovators for Sustainable Development',
    description:
      'A research, innovation and policy consulting firm identifying, nurturing, and advancing promising ideas from Africa’s young innovators toward the Sustainable Development Goals.',
  },
  {
    id: 'about',
    path: '/about',
    label: 'About',
    title: 'About AfriYouth Innovation Labs — Background, Mission, Vision & Identity',
    description:
      'Organization background, 2030 workforce mandate, Mission, Vision 2050, and AfriYouth’s six-discipline evidence-to-impact identity.',
  },
  {
    id: 'services',
    path: '/services',
    label: 'Services',
    title: 'Services — Research, Policy, Innovation, Foresight & Advisory | AfriYouth',
    description:
      'Applied socio-economic research, policy and governance consulting, innovation and entrepreneurship, strategic foresight, resource mobilization, and M&E.',
  },
  {
    id: 'programs',
    path: '/programs',
    label: 'Programs',
    title: 'Programs — Accelerators, Initiatives & Youth Opportunities | AfriYouth',
    description:
      'Explore the 10-stage Evidence-to-Impact Accelerator, AfriYouth Innovation Accelerator, Policy Innovation Challenge, and Career Development Academy.',
  },
  {
    id: 'contact',
    path: '/contact',
    label: 'Contact',
    title: 'Contact — Inquiries, Partnerships & Collaboration | AfriYouth Innovation Labs',
    description:
      'Official engagement portal, organizational contact information, institutional inquiries, and partnership opportunities with AfriYouth Innovation Labs.',
  },
];

export const PRIMARY_NAV_ITEMS: Array<{ id: PageId; label: string; path: string }> = [
  { id: 'about', label: 'About', path: '/about' },
  { id: 'services', label: 'Services', path: '/services' },
  { id: 'programs', label: 'Programs', path: '/programs' },
];

const ROUTE_ALIASES: Record<string, PageId> = {
  '/approach': 'about',
  '/work': 'services',
  '/accelerator': 'programs',
  '/partner': 'contact',
  '/connect': 'contact',
};

export function normalizePathname(pathname: string): string {
  const clean = pathname.split('?')[0].split('#')[0].trim().toLowerCase();
  if (!clean || clean === '/') return '/';
  return clean.endsWith('/') ? clean.slice(0, -1) : clean;
}

export function parsePathname(pathname: string): PageId {
  const normalized = normalizePathname(pathname);
  const matched = ROUTES.find((route) => route.path === normalized);
  if (matched) return matched.id;
  if (normalized in ROUTE_ALIASES) return ROUTE_ALIASES[normalized];
  return 'home';
}

export function getPathForPage(pageId: PageId): string {
  const matched = ROUTES.find((route) => route.id === pageId);
  return matched ? matched.path : '/';
}

export function getRouteMeta(pageId: PageId): RouteMeta {
  return ROUTES.find((route) => route.id === pageId) ?? ROUTES[0];
}
