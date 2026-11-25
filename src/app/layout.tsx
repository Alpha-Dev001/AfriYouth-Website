import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Plus_Jakarta_Sans, Poppins } from 'next/font/google';
import './globals.css';
import { MotionProvider } from '@/components/MotionProvider';
import { Navbar } from '@/components/Navbar';
import { ScrollToTop } from '@/components/ScrollToTop';
import { SiteFooter } from '@/components/SiteFooter';
import { OG_IMAGE, SITE_NAME, SITE_OG_DESCRIPTION, SITE_URL } from '@/lib/site';
import { getRouteMeta } from '@/utils/routing';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-jakarta-sans',
  display: 'swap',
});

const homeMeta = getRouteMeta('home');

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: homeMeta.title,
  description: homeMeta.description,
  applicationName: SITE_NAME,
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [{ url: '/brand/afriyouth-mark.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: homeMeta.title,
    description: SITE_OG_DESCRIPTION,
    url: '/',
    images: [{ ...OG_IMAGE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: homeMeta.title,
    description: SITE_OG_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0D0624',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`scroll-smooth ${poppins.variable} ${plusJakartaSans.variable}`}
    >
      <body className="bg-white text-[#0D0624] antialiased selection:bg-[#0301FF] selection:text-white">
        <MotionProvider>
          <ScrollToTop />
          <div className="flex min-h-screen flex-col bg-white text-[#0D0624]">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-[#0301FF] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
            >
              Skip to main content
            </a>

            <Navbar />

            <main id="main-content" className="flex-1">
              {children}
            </main>

            <SiteFooter />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
