"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { SITE } from '@/lib/site';
import { useTranslation } from 'react-i18next';
import { useViewport } from '../hooks/useViewport';

const fadeInUp = {
  initial: { opacity: 1, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const Terms: React.FC = () => {
  const { t } = useTranslation();
  const { isMobile } = useViewport();
  const currentFadeInUp = isMobile
    ? {
      initial: { opacity: 1, y: 0 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0 },
    }
    : fadeInUp;

  return (
    <>
      <SEO
        title={t('seo.terms.title', { siteName: SITE.name })}
        description={t('seo.terms.description', { siteName: SITE.name })}
      />
      <motion.div
        variants={currentFadeInUp}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="non-hero-page-gap max-w-[960px] mx-auto px-6 sm:px-8 pb-16 space-y-10"
      >
        <div className="space-y-3">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
            {t('termsPage.title')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            {t('termsPage.intro')}
          </p>
        </div>

        <article className="space-y-12 border-t border-slate-200 dark:border-slate-800 pt-10 text-sm font-medium text-slate-700 dark:text-slate-200">
          {(['acceptance', 'scope', 'eligibility', 'accounts', 'ownership', 'payments', 'disclaimer', 'indemnification', 'thirdParty', 'intellectualProperty', 'aiFeatures', 'modifications', 'disputeResolution', 'privacyConsistency', 'futureRisk'] as const).map((key) => (
            <section key={key} className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                {t(`termsPage.${key}.heading`)}
              </h2>
              <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                {t(`termsPage.${key}.body`)}
              </p>
            </section>
          ))}
        </article>

        <p className="text-[10px] uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500 pt-8 border-t border-slate-100 dark:border-slate-800/50">
          {t('termsPage.update')}
        </p>
      </motion.div>
    </>
  );
};

export default Terms;
