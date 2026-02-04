"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { SITE } from '@/lib/site';
import { useTranslation } from 'react-i18next';
import { useViewport } from '../hooks/useViewport';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const Privacy: React.FC = () => {
  const { t } = useTranslation();
  const { isMobile } = useViewport();

  const currentFadeInUp = isMobile ? {
    initial: { opacity: 1, y: 0 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0 },
  } : fadeInUp;

  return (
    <>
      <SEO
        title={t('seo.privacy.title', { siteName: SITE.name })}
        description={t('seo.privacy.description', { siteName: SITE.name })}
      />
      <motion.div 
        variants={currentFadeInUp}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="non-hero-page-gap max-w-[960px] mx-auto px-6 sm:px-8 pb-16 space-y-10"
      >
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase tracking-tight">
            {t('privacyPage.title')}
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            {t('privacyPage.placeholder')}
          </p>
        </div>

        <section className="border-t border-slate-200 dark:border-slate-800 pt-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
            {t('legal.contact.heading')}
          </h2>
          <div className="mt-3 text-slate-600 dark:text-slate-300 space-y-1 text-sm font-medium">
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
      </motion.div>
    </>
  );
};

export default Privacy;
