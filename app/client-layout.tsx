'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useViewport } from './hooks/useViewport';
import { MotionConfig } from 'framer-motion';
import { ViewportProvider } from './hooks/ViewportContext';

export default function ClientLayout({ 
  children,
  initialIsMobile 
}: { 
  children: React.ReactNode;
  initialIsMobile?: boolean;
}) {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [announcement, setAnnouncement] = useState('');
  const { isMobile } = useViewport(initialIsMobile);

  useEffect(() => {
    // Move focus to main content on route change for accessibility
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      
      // Announce route change
      const pageTitle = document.title;
      setAnnouncement(t('accessibility.navigatedTo', { title: pageTitle }));
    }
  }, [pathname, t]);

  return (
    <div className={isMobile ? 'disable-animations' : ''}>
      <ViewportProvider value={{ isMobile }}>
        <MotionConfig reducedMotion={isMobile ? 'always' : 'user'} initial={false}>
          {/* Route Announcement Region */}
          <div 
            className="sr-only" 
            role="status" 
            aria-live="polite" 
            aria-atomic="true"
          >
            {announcement}
          </div>
          {children}
        </MotionConfig>
      </ViewportProvider>
    </div>
  );
}
