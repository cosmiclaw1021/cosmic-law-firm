'use client';

import React, { useEffect } from 'react';
import i18n from '../i18n';

export default function I18nProvider({ 
  children, 
  lng 
}: { 
  children: React.ReactNode;
  lng: string;
}) {
  // Sync language on server or during first render if possible
  if (typeof window === 'undefined' && lng && i18n.language !== lng) {
    i18n.changeLanguage(lng);
  }

  useEffect(() => {
    if (lng && i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng]);

  return <>{children}</>;
}
