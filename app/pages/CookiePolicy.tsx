"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { useTranslation } from 'react-i18next';
import { useViewport } from '../hooks/useViewport';
import EmailLink from '@/components/EmailLink';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const CookiePolicy: React.FC = () => {
  const { t } = useTranslation();
  const { isMobile } = useViewport();
  const categories = t('cookiePolicyPage.categories', { returnObjects: true }) as { name: string; description: string }[];
  const retentionList = t('cookiePolicyPage.retentionList', { returnObjects: true }) as string[];
  const thirdPartyList = t('cookiePolicyPage.thirdPartyList', { returnObjects: true }) as string[];

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
        title={t('seo.cookiePolicy.title', { siteName: t('common.companyName') })}
        description={t('cookiePolicyPage.intro')}
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
            {t('cookiePolicyPage.title')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            {t('cookiePolicyPage.intro')}
          </p>
        </div>

        <section className="space-y-6 border-t border-slate-200 dark:border-slate-800 pt-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
              {t('cookiePolicyPage.categoriesHeading')}
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {categories.map((category) => (
                <article
                  key={category.name}
                  className="rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm dark:border-slate-800 dark:bg-slate-900/60"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                    {category.name}
                  </p>
                  <p className="mt-2 text-slate-700 dark:text-slate-200 leading-relaxed">{category.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
              {t('cookiePolicyPage.consentHeading')}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm font-medium">
              {t('cookiePolicyPage.consentBody')}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
              {t('cookiePolicyPage.retentionHeading')}
            </h2>
            <ul className="mt-3 space-y-2 text-slate-700 dark:text-slate-200 text-sm list-disc list-inside">
              {retentionList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
              {t('cookiePolicyPage.thirdPartyHeading')}
            </h2>
            <ul className="mt-3 space-y-2 text-slate-700 dark:text-slate-200 text-sm list-disc list-inside">
              {thirdPartyList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <p className="text-sm font-medium text-slate-600 dark:text-slate-300 uppercase tracking-[0.3em]">
            {t('cookiePolicyPage.contactHeading')}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {t('cookiePolicyPage.contactBody')}
          </p>
          <EmailLink
            email={SITE.email}
            className="text-primary hover:underline font-semibold text-sm"
          >
            {SITE.email}
          </EmailLink>
        </section>
      </motion.div>
    </>
  );
};

export default CookiePolicy;
