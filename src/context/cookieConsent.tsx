'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { 
  getStoredConsent, 
  setConsent, 
  getDefaultConsent, 
  type CookieConsent,
  shouldShowBanner as checkShouldShowBanner
} from '@/utils/cookie-consent';

type ConsentCategory = 'analytics' | 'marketing' | 'location' | 'essential';

type ContextValue = {
  preferences: CookieConsent | null;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  updatePreferences: (update: Partial<CookieConsent>) => void;
  hasConsented: (category: ConsentCategory) => boolean;
  showBanner: boolean;
  openBanner: () => void;
  closeBanner: () => void;
};

const CookieConsentContext = createContext<ContextValue | undefined>(undefined);

export const CookieConsentProvider = ({ children }: { children: React.ReactNode }) => {
  const [preferences, setPreferences] = useState<CookieConsent | null>(null);
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  // Sync state with storage on mount and when external changes occur
  const syncConsent = useCallback(() => {
    const stored = getStoredConsent();
    setPreferences(stored);
    if (stored === null) {
      setIsBannerVisible(true);
    }
  }, []);

  useEffect(() => {
    syncConsent();

    const handleConsentChange = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      setPreferences(detail);
      if (detail === null) {
        setIsBannerVisible(true);
      }
    };

    window.addEventListener('cookie-consent-changed', handleConsentChange);
    return () => {
      window.removeEventListener('cookie-consent-changed', handleConsentChange);
    };
  }, [syncConsent]);

  const acceptAll = useCallback(() => {
    const next = setConsent({ analytics: true, marketing: true, location: true });
    setPreferences(next);
    setIsBannerVisible(false);
  }, []);

  const rejectNonEssential = useCallback(() => {
    const next = setConsent({ analytics: false, marketing: false, location: false });
    setPreferences(next);
    setIsBannerVisible(false);
  }, []);

  const updatePreferences = useCallback((update: Partial<CookieConsent>) => {
    const next = setConsent(update);
    setPreferences(next);
  }, []);

  const hasConsented = useCallback(
    (category: ConsentCategory) => {
      if (category === 'essential') return true;
      if (!preferences) return false;
      return preferences[category as keyof CookieConsent] ?? false;
    },
    [preferences]
  );

  const openBanner = useCallback(() => {
    setIsBannerVisible(true);
    window.dispatchEvent(new CustomEvent('cookie-consent-open-expanded'));
  }, []);

  const closeBanner = useCallback(() => {
    setIsBannerVisible(false);
  }, []);

  const value = useMemo(
    () => ({
      preferences,
      acceptAll,
      rejectNonEssential,
      updatePreferences,
      hasConsented,
      showBanner: isBannerVisible,
      openBanner,
      closeBanner,
    }),
    [preferences, acceptAll, rejectNonEssential, updatePreferences, hasConsented, isBannerVisible, openBanner, closeBanner]
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
};
