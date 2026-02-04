import type { Metadata, Viewport } from "next";
import "../index.css";
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SkipToContent from '../components/SkipToContent';
import ClientLayout from '../client-layout';
import PageTransition from '../components/PageTransition';
import I18nProvider from '../components/I18nProvider';
import { SITE } from '../lib/site';
import RegionLayout from '@src/components/Layout';
import { geistSans, geistMono } from '../fonts';
import { getInitialIsMobileFromHeaders } from '../lib/get-initial-is-mobile';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  const baseUrl = SITE.url;

  const subNames: Record<string, string> = {
    en: 'Entertainment, Media & Personal Injury Law',
    ko: '엔터테인먼트, 미디어 & 개인상해법',
    'zh-Hans': '娱乐、媒体与人身伤害法律'
  };
  const nameSub = subNames[lng] || subNames.en;

  return {
    title: {
      template: `%s | ${SITE.name}`,
      default: `${SITE.name} | ${nameSub}`,
    },
    description: "Entertainment law for creators, studios, and media companies—contracts, IP, talent deals, distribution, and disputes.",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${lng}`,
      languages: {
        'en': '/en',
        'ko': '/ko',
        'zh-Hans': '/zh-Hans',
        'x-default': '/en',
      },
    },
    openGraph: {
      type: "website",
      url: `${baseUrl}/${lng}`,
      title: `${SITE.name} | ${nameSub}`,
      description: "Entertainment law for creators, studios, and media companies—contracts, IP, talent deals, distribution, and disputes.",
      images: ["/Cosmic_Logos-02.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE.name} | ${nameSub}`,
      description: "Entertainment law for creators, studios, and media companies—contracts, IP, talent deals, distribution, and disputes.",
      images: ["/Cosmic_Logos-02.png"],
    },
    icons: {
      icon: '/Cosmic_Logos-02.png',
    },
  };
}

export async function generateStaticParams() {
  return [{ lng: 'en' }, { lng: 'ko' }, { lng: 'zh-Hans' }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  const initialIsMobile = await getInitialIsMobileFromHeaders();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${SITE.url}/#organization`,
    "name": SITE.name,
    "url": SITE.url,
    "logo": `${SITE.url}/Cosmic_Logos-02.png`,
    "image": `${SITE.url}/Cosmic_Logos-02.png`,
    "description":
      lng === 'ko'
        ? "크리에이터와 미디어 기업을 위한 엔터테인먼트 로펌—계약, 지식재산권, 탤런트 딜, 배급, 분쟁."
        : lng === 'zh-Hans'
          ? "为创作者、制片方与媒体公司提供娱乐法律服务——合同、知识产权、艺人交易、发行与争议解决。"
          : "Entertainment law for creators, studios, and media companies—contracts, IP, talent deals, distribution, and disputes.",
    "telephone": SITE.phoneTel ? `+1-${SITE.phoneTel}` : undefined,
    "email": SITE.email,
  };

  return (
    <html 
      lang={lng} 
      className={`scroll-pt-[104px] ${geistSans.variable} ${geistMono.variable}`} 
      suppressHydrationWarning
    >
      <head>
        {/* Prevent iOS Safari from auto-linking phone numbers/emails and mutating the DOM pre-hydration. */}
        <meta name="format-detection" content="telephone=no,date=no,address=no,email=no" />
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            const saved = localStorage.getItem('theme') || 'system';
            const root = document.documentElement;
            if (saved === 'dark' || (saved === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              root.classList.add('dark');
            } else {
              root.classList.add('light');
            }
          })();
        ` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display antialiased">
        <RegionLayout>
          <I18nProvider lng={lng}>
            <div className="relative flex flex-col min-h-screen overflow-x-hidden">
              <ClientLayout initialIsMobile={initialIsMobile}>
                <SkipToContent />
                <Navbar key={`nav-${lng}`} initialIsMobile={initialIsMobile} />
                <main 
                  id="main-content" 
                  tabIndex={-1} 
                  className="flex-grow w-full flex flex-col outline-none"
                >
                  <PageTransition>
                    {children}
                  </PageTransition>
                </main>
                <Footer key={`footer-${lng}`} />
              </ClientLayout>
            </div>
          </I18nProvider>
        </RegionLayout>
      </body>
    </html>
  );
}
