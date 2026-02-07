'use client';

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SkipToContent from './SkipToContent';
import PageTransition from './PageTransition';

interface PageShellProps {
  children: React.ReactNode;
  initialIsMobile?: boolean;
  lng?: string;
}

export default function PageShell({ children, initialIsMobile, lng }: PageShellProps) {
  const localeKey = lng ?? 'default';

  return (
    <div className="relative flex flex-col min-h-screen overflow-x-hidden">
      <SkipToContent />
      <Navbar key={`nav-${localeKey}`} initialIsMobile={initialIsMobile} />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-grow w-full flex flex-col outline-none"
      >
        <PageTransition initialIsMobile={initialIsMobile}>
          {children}
        </PageTransition>
      </main>
      <Footer key={`footer-${localeKey}`} />
    </div>
  );
}
