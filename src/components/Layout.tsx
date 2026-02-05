'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { FEATURES, GA_MEASUREMENT_ID } from '@src/config/features';
import { useCookieConsent } from '@src/context/cookieConsent';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { hasConsented } = useCookieConsent();
  const [loadGa, setLoadGa] = useState(false);

  const analyticsAllowed =
    FEATURES.googleAnalytics &&
    Boolean(GA_MEASUREMENT_ID) &&
    hasConsented('analytics');

  useEffect(() => {
    if (analyticsAllowed && !loadGa) {
      setLoadGa(true);
    }
  }, [analyticsAllowed, loadGa]);

  return (
    <>
      {loadGa && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}
      {children}
    </>
  );
}
