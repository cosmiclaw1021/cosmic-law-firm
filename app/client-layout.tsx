'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useViewport } from './hooks/useViewport';
import { MotionConfig } from 'framer-motion';

export default function ClientLayout({ 
  children,
  initialIsMobile 
}: { 
  children: React.ReactNode;
  initialIsMobile?: boolean;
}) {
  const mainRef = useRef<HTMLElement>(null);
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
      <MotionConfig reducedMotion={isMobile ? 'always' : 'user'}>
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
    </div>
  );
}
