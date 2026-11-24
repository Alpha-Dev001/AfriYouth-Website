import type { AudienceType } from './inquiryLogic';

export type PageId = 'home' | 'about' | 'services' | 'programs' | 'contact' | 'not-found';

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
  return 'not-found';
}

export function getPathForPage(pageId: PageId): string {
  if (pageId === 'not-found') return '/';
  const matched = ROUTES.find((route) => route.id === pageId);
  return matched ? matched.path : '/';
}

/**
 * href for a route, optionally pre-selecting the contact desk audience.
 * Keeps deep links such as /contact?audience=partner in one place.
 */
export function getHrefForPage(pageId: PageId, audience?: AudienceType): string {
  const path = getPathForPage(pageId);
  return audience ? `${path}?audience=${audience}` : path;
}

export function getRouteMeta(pageId: PageId): RouteMeta {
  if (pageId === 'not-found') {
    return {
      id: 'not-found',
      path: '/',
      label: 'Not Found',
      title: 'Page Not Found — AfriYouth Innovation Labs',
      description: 'The page you are looking for could not be found.',
    };
  }
  return ROUTES.find((route) => route.id === pageId) ?? ROUTES[0];
}
