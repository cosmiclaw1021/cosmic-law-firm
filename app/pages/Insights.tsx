"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import Link from '@/components/ui/Link';
import ButtonLink from '@/components/ui/ButtonLink';
import { SITE } from '@/lib/site';
import { useTranslation } from 'react-i18next';
import Icon from '@src/components/Icon';
import SectionWithStars from '@src/components/layout/SectionWithStars';
import { useViewport } from '../hooks/useViewport';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

const topics = [
  { slug: 'contract-red-flags', tag: 'Checklist', status: 'Live' },
  { slug: 'chain-of-title', tag: 'Due diligence', status: 'Live' },
  { slug: 'ai-in-entertainment', tag: 'Trends', status: 'Live' },
  { slug: 'ai-contracts', tag: 'Best practices', status: 'Live' },
  { slug: 'ai-law', tag: 'Policy', status: 'Live' },
  { slug: 'nil-basics', tag: 'Sports', status: 'Live' },
  { slug: 'publicity-basics', tag: 'Rights', status: 'Live' },
];

const Insights: React.FC<{ lng: string }> = ({ lng }) => {
  const { t } = useTranslation();
  const { isMobile } = useViewport();

  const currentFadeInUp = isMobile ? {
    initial: { opacity: 1, y: 0 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0 },
  } : fadeInUp;

  const currentStagger = isMobile ? {
    initial: {},
    whileInView: { transition: { staggerChildren: 0 } },
    viewport: { once: true },
  } : staggerContainer;
  
  const seoTitles: Record<string, string> = {
    en: `Insights | ${SITE.name}`,
    ko: `인사이트 | ${SITE.name}`,
  };

  return (
    <div className="pt-4 lg:pt-6">
      <SEO title={seoTitles[lng] || seoTitles.en} description={t('insights.hero.description')} />

      <SectionWithStars className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800" settings={{ density: 0.44 }}>
        <motion.div 
          variants={currentFadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 py-8"
        >
          <div className="space-y-3 text-center">
            <span className="text-xs font-black tracking-[0.4em] uppercase text-primary dark:text-primary-light">{t('insights.hero.badge')}</span>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight uppercase tracking-tight">
              {t('insights.hero.title')}
            </h1>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium">
              {t('insights.hero.description')}
            </p>
          </div>
        </motion.div>
      </SectionWithStars>

      <SectionWithStars className="py-12 bg-white dark:bg-[#020712]" settings={{ density: 0.5 }}>
        <motion.div 
          variants={currentFadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8"
        >
          <div className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 overflow-hidden shadow-sm">
            <motion.ol 
              variants={currentStagger}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              role="list" 
              className="divide-y divide-slate-200 dark:divide-slate-800"
            >
              {topics.map((topic) => {
                const title = t(`insights.topics.${topic.slug}.title`);
                const summary = t(`insights.topics.${topic.slug}.summary`);
                const localizedTag = t(`insights.topics.${topic.slug}.tag`);
                return (
                  <motion.li key={topic.slug} variants={currentFadeInUp}>
                    <Link
                      to={`/insights/${topic.slug}`}
                      className="group block px-6 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
                    >
                      <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-slate-400">
                        <span>{localizedTag}</span>
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight uppercase tracking-tight">{title}</h2>
                        <Icon name="east" className="size-4 text-slate-400 transition group-hover:text-primary" />
                      </div>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{summary}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-[0.3em] text-slate-900 dark:text-primary-light">
                        {t('insights.cta.linkText')}
                        <Icon name="east" className="size-4" />
                      </span>
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ol>
          </div>
        </motion.div>
      </SectionWithStars>

      <SectionWithStars className="py-12 bg-white dark:bg-[#020712]" settings={{ density: 0.47 }}>
        <motion.div 
          variants={currentFadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8"
        >
          <div className="rounded-3xl bg-primary text-white p-8 text-center space-y-3 shadow-xl">
            <h2 className="text-3xl font-black uppercase tracking-tight">{t('insights.cta.title')}</h2>
            <p className="text-sm text-white/90 font-medium">{t('insights.cta.description')}</p>
              <ButtonLink
                href="/contact"
                tone="light"
                className="inline-flex items-center justify-center gap-2 rounded-xl uppercase tracking-[0.3em] text-xs px-5 py-3 shadow-lg focus:ring-2 focus:ring-secondary/40 focus:ring-offset-2 focus:ring-offset-primary"
              >
                {t('insights.cta.button')}
              </ButtonLink>
          </div>
        </motion.div>
      </SectionWithStars>
    </div>
  );
};

export default Insights;
