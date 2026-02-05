'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

type ConsentCategory = 'analytics' | 'marketing' | 'essential';

const COOKIE_CONSENT_KEY = 'cosmicCookieConsent';

type ConsentPreferences = {
  analytics: boolean;
  marketing: boolean;
};

type ContextValue = {
  preferences: ConsentPreferences | null;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  hasConsented: (category: ConsentCategory) => boolean;
  showBanner: boolean;
  openBanner: () => void;
  closeBanner: () => void;
};

const CookieConsentContext = createContext<ContextValue | undefined>(undefined);

const defaultPreferences: ConsentPreferences = {
  analytics: false,
  marketing: false,
};

export const CookieConsentProvider = ({ children }: { children: React.ReactNode }) => {
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(null);
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ConsentPreferences;
        setPreferences({ ...defaultPreferences, ...parsed });
        return;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Unable to read cookie consent', error);
    }
    setPreferences(null);
  }, []);

  useEffect(() => {
    if (preferences === null) {
      setIsBannerVisible(true);
    }
  }, [preferences]);

  const persist = useCallback((next: ConsentPreferences) => {
    setPreferences(next);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(next));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('Unable to persist cookie consent', error);
      }
    }
  }, []);

  const acceptAll = useCallback(() => {
    persist({ analytics: true, marketing: true });
    setIsBannerVisible(false);
  }, [persist]);

  const rejectNonEssential = useCallback(() => {
    persist({ analytics: false, marketing: false });
    setIsBannerVisible(false);
  }, [persist]);

  const hasConsented = useCallback(
    (category: ConsentCategory) => {
      if (category === 'essential') return true;
      return preferences ? preferences[category] : false;
    },
    [preferences]
  );

  const openBanner = useCallback(() => {
    setIsBannerVisible(true);
  }, []);

  const closeBanner = useCallback(() => {
    setIsBannerVisible(false);
  }, []);

  const value = useMemo(
    () => ({
      preferences,
      acceptAll,
      rejectNonEssential,
      hasConsented,
      showBanner: isBannerVisible,
      openBanner,
      closeBanner,
    }),
    [preferences, acceptAll, rejectNonEssential, hasConsented, isBannerVisible, openBanner, closeBanner]
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
