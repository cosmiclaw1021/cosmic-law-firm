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

        <article className="space-y-6 border-t border-slate-200 dark:border-slate-800 pt-8 text-sm font-medium text-slate-700 dark:text-slate-200">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
              {t('termsPage.scopeHeading')}
            </h2>
            <p className="mt-3">{t('termsPage.scopeBody')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
              {t('termsPage.contentHeading')}
            </h2>
            <p className="mt-3">{t('termsPage.contentBody')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
              {t('termsPage.disclaimerHeading')}
            </h2>
            <p className="mt-3">{t('termsPage.disclaimerBody')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
              {t('termsPage.cookiesHeading')}
            </h2>
            <p className="mt-3">{t('termsPage.cookiesBody')}</p>
          </section>
        </article>

        <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          {t('termsPage.update')}
        </p>
      </motion.div>
    </>
  );
};

export default Terms;
