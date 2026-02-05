'use client';

import React from 'react';
import Button from './ui/Button';
import Link from './ui/Link';
import { useCookieConsent } from '@src/context/cookieConsent';

export default function CookieConsentBanner() {
  const { showBanner, acceptAll, rejectNonEssential } = useCookieConsent();

  if (!showBanner) return null;

  return (
    <div className="fixed inset-x-4 bottom-8 z-50 rounded-2xl border border-slate-900/10 bg-white/95 p-6 shadow-xl shadow-slate-900/10 backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/90">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2 text-sm font-medium text-slate-900 dark:text-slate-100">
          <p className="text-base font-bold tracking-[0.3em] uppercase text-slate-500 dark:text-slate-400">
            Cookie notice
          </p>
          <p>
            We only load essential functionality automatically. Analytics and marketing tools (Google Analytics, Google Maps) remain blocked until you choose how we may use your browsing data.
          </p>
          <p>
            You can change your choices any time via the cookie policy link below.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button tone="dark" size="sm" onClick={acceptAll}>
            Accept all
          </Button>
          <Button variant="outline" tone="light" size="sm" onClick={rejectNonEssential}>
            Reject non-essential
          </Button>
          <Link to="/cookie-policy" className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
            Cookie policy
          </Link>
        </div>
      </div>
    </div>
  );
}
