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

const Disclaimer: React.FC = () => {
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
        title={t('disclaimerPage.title') + ' | ' + SITE.name}
        description={t('disclaimerPage.intro')}
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
            {t('disclaimerPage.title')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            {t('disclaimerPage.intro')}
          </p>
        </div>

        <section className="space-y-8 border-t border-slate-200 dark:border-slate-800 pt-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
              {t('disclaimerPage.noRelationshipHeading')}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed">
              {t('disclaimerPage.noRelationshipBody')}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
              {t('disclaimerPage.notAdviceHeading')}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed">
              {t('disclaimerPage.notAdviceBody')}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
              {t('disclaimerPage.noGuaranteesHeading')}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed">
              {t('disclaimerPage.noGuaranteesBody')}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
              {t('disclaimerPage.confidentialityHeading')}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed">
              {t('disclaimerPage.confidentialityBody')}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
              {t('disclaimerPage.jurisdictionHeading')}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed">
              {t('disclaimerPage.jurisdictionBody')}
            </p>
          </div>
        </section>

        <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          {t('disclaimerPage.update')}
        </p>
      </motion.div>
    </>
  );
};

export default Disclaimer;
