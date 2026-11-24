# AfriYouth Innovation Labs

A research, innovation, and policy consulting platform that identifies, nurtures, and advances promising ideas from Africa's young innovators toward the Sustainable Development Goals.

Live site: <https://afriyouth-website.vercel.app>

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Server Components by default)
- React 19 + TypeScript
- Tailwind CSS 4 (via `@tailwindcss/postcss`)
- Motion (Framer Motion) for UI animation, GSAP + ScrollTrigger for split-text effects
- `next/font` for Poppins (display) and Plus Jakarta Sans (body)

## Features

- Five routes — `/`, `/about`, `/services`, `/programs`, `/contact` — plus a branded 404 page
- Legacy aliases that redirect to their new home: `/approach`, `/work`, `/accelerator`, `/partner`, `/connect`
- Pinned sticky-scroll practice showcase, staggered scroll reveals, split-text headings, blur text hero
- Audience-aware contact desk (`/contact?audience=innovator|institution|partner`) with client-side validation
- Per-page metadata, canonical URLs, Open Graph/Twitter cards, `robots.txt` and `sitemap.xml`
- Optimized responsive images (AVIF/WebP, responsive `sizes`, lazy loading, year-long cache headers), accessible mobile drawer, reduced-motion support

## Project structure

```
.
├── public/                 Static assets (brand marks, photography)
├── src/
│   ├── app/                App Router: layouts, routes, metadata routes
│   │   ├── layout.tsx      Root layout: fonts, metadata, navbar, footer
│   │   ├── template.tsx    Per-route enter transition
│   │   ├── globals.css     Tailwind entry and design tokens
│   │   ├── page.tsx        /            (home)
│   │   ├── about/          /about
│   │   ├── services/       /services
│   │   ├── programs/       /programs
│   │   ├── contact/        /contact
│   │   ├── not-found.tsx   Branded 404
│   │   ├── robots.ts       /robots.txt
│   │   └── sitemap.ts      /sitemap.xml
│   ├── components/         Page sections and shared UI (client islands where needed)
│   ├── data/               Content and copy data
│   ├── lib/                Site constants and metadata helpers
│   └── utils/              Routing, inquiry logic, motion config (+ node tests)
├── next.config.ts          Legacy redirects
├── postcss.config.mjs      Tailwind CSS 4 PostCSS plugin
├── eslint.config.mjs       Next.js flat ESLint config
├── tsconfig.json
└── package.json
```

## Prerequisites

- Node.js 20.9 or newer (built and verified on Node 25)
- npm 10+

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The site is served at <http://localhost:3000>.

## Build and run in production

```bash
npm run build
npm start
```

## Quality checks

```bash
npm run lint       # ESLint (next/core-web-vitals + TypeScript)
npm run typecheck  # tsc --noEmit
npm test           # node --test on src/utils/*.test.ts
```

## Environment variables

| Variable | Required | Default | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No | `https://afriyouth-website.vercel.app` | Canonical origin used for `metadataBase`, canonical links, Open Graph URLs, `robots.txt` and `sitemap.xml`. Set it when deploying to another domain. |

No other environment variables or secrets are required; the contact form is validated in the browser.

## Deployment

The project deploys as a standard Next.js app on Vercel:

1. Import the repository and keep the detected framework preset (Next.js).
2. Build command `npm run build`, output handled by the framework.
3. Optionally set `NEXT_PUBLIC_SITE_URL` to the production domain.
4. Deploy — no rewrite/fallback configuration is needed (`vercel.json` from the Vite build was removed).

Legacy URLs are handled by `redirects()` in `next.config.ts`, so `/approach`, `/work`, `/accelerator`, `/partner` and `/connect` keep working after the migration.

## Design

The deployed site is the reference implementation: <https://afriyouth-website.vercel.app>.
The Figma source file is not stored in this repository; add its share link here if it should be published alongside the code.

## License

All rights reserved. © AfriYouth Innovation Labs.
