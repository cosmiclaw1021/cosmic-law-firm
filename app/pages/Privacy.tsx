"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { SITE } from '@/lib/site';
import EmailLink from '@/components/EmailLink';
import { useTranslation } from 'react-i18next';
import { useViewport } from '../hooks/useViewport';
import Link from '@/components/ui/Link';

const fadeInUp = {
  initial: { opacity: 1, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const Privacy: React.FC = () => {
  const { t } = useTranslation();
  const { isMobile } = useViewport();
  const collectionList = t('privacyPage.collectionList', { returnObjects: true }) as string[];
  const thirdPartyList = t('privacyPage.thirdPartyList', { returnObjects: true }) as string[];

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
        <div className="space-y-3">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
            {t('privacyPage.title')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            {t('privacyPage.intro')}
          </p>
        </div>

        <section className="space-y-6 border-t border-slate-200 dark:border-slate-800 pt-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
              {t('privacyPage.collectionHeading')}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm font-medium">
              {t('privacyPage.collectionBody')}
            </p>
            <ul className="mt-4 space-y-2 text-slate-700 dark:text-slate-200 text-sm list-disc list-inside">
              {collectionList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
              {t('privacyPage.useHeading')}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm font-medium">
              {t('privacyPage.useBody')}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
              {t('privacyPage.thirdPartyHeading')}
            </h2>
            <ul className="mt-3 space-y-2 text-slate-700 dark:text-slate-200 text-sm list-disc list-inside">
              {thirdPartyList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
              {t('privacyPage.rightsHeading')}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm font-medium">
              {t('privacyPage.rightsBody')}
            </p>
            <div className="mt-2 text-sm font-semibold text-primary flex flex-col gap-1">
              <span>
                <EmailLink email={SITE.email} className="hover:underline">
                  {SITE.email}
                </EmailLink>
              </span>
              <a href={`tel:${SITE.phoneTel}`} className="hover:underline">
                {t('legal.contact.phoneLabel')} {SITE.phoneDisplay}
              </a>
              <Link
                to="/cookie-policy"
                className="inline-flex text-xs uppercase tracking-[0.4em] text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                {t('footer.cookiePolicy')}
              </Link>
            </div>
          </div>
        </section>

        <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          {t('privacyPage.update')}
        </p>
      </motion.div>
    </>
  );
};

export default Privacy;
