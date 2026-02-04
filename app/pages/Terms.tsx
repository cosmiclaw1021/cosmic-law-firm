"use client";

import React from 'react';
import SEO from '@/components/SEO';
import { SITE } from '@/lib/site';
import { useTranslation } from 'react-i18next';

const Terms: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t('seo.terms.title', { siteName: SITE.name })}
        description={t('seo.terms.description', { siteName: SITE.name })}
      />
      <div className="max-w-[960px] mx-auto px-6 sm:px-8 py-16 space-y-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            {t('termsPage.title')}
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
            {t('termsPage.placeholder')}
          </p>
        </div>

        <section className="border-t border-slate-200 dark:border-slate-800 pt-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {t('legal.contact.heading')}
          </h2>
          <div className="mt-3 text-slate-600 dark:text-slate-300 space-y-1 text-sm">
            <p>
              {t('legal.contact.phoneLabel')}{' '}
              <a href={`tel:${SITE.phoneTel}`} className="text-primary dark:text-primary-light hover:underline">
                {SITE.phoneDisplay}
              </a>
            </p>
            <p>
              {t('legal.contact.emailLabel')}{' '}
              <a href={`mailto:${SITE.email}`} className="text-primary dark:text-primary-light hover:underline">
                {SITE.email}
              </a>
            </p>
            <p>
              {t('legal.contact.addressLabel')} {SITE.addressShort}
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Terms;
