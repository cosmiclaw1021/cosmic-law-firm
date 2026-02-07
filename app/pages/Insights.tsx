"use client";

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import Link from '@/components/ui/Link';
import ButtonLink from '@/components/ui/ButtonLink';
import { SITE } from '@/lib/site';
import { useTranslation } from 'react-i18next';
import SectionWithStars from '@src/components/layout/SectionWithStars';
import { useViewport } from '../hooks/useViewport';
import { useRouter, useParams } from 'next/navigation';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const insightsTableHeadings = ['insight', 'type'];

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
  const { t, i18n } = useTranslation();
  const params = useParams();
  const { isMobile } = useViewport();
  const router = useRouter();
  const currentLng = (params?.lng as string) || i18n.language || 'en';
  const buildPath = (slug: string) => `/${currentLng}/insights/${slug}`;

  const currentFadeInUp = isMobile ? {
    initial: { opacity: 1, y: 0 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0 },
  } : fadeInUp;

  const seoTitles: Record<string, string> = {
    en: `Insights | ${SITE.name}`,
    ko: `인사이트 | ${SITE.name}`,
  };

  const [activeFilter, setActiveFilter] = useState('all');

  const filterOptions = useMemo(() => {
    const options = [
      { value: 'all', label: t('insights.table.filterAll') },
    ];
    const seen = new Set<string>();
    topics.forEach((topic) => {
      if (!seen.has(topic.tag)) {
        seen.add(topic.tag);
        options.push({
          value: topic.tag,
          label: t(`insights.topics.${topic.slug}.tag`),
        });
      }
    });
    return options;
  }, [t]);

  const filteredTopics = activeFilter === 'all'
    ? topics
    : topics.filter((topic) => topic.tag === activeFilter);

  const tableHeaders = (t('insights.table.headers', { returnObjects: true }) as Record<string, string>) || {};
  const filterLabel = t('insights.table.filterLabel');

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
            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/70">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                    {t('insights.table.title')}
                  </p>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    {t('insights.table.description')}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <label htmlFor="insights-filter" className="text-[0.625rem] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                    {filterLabel}
                  </label>
                  <select
                    id="insights-filter"
                    value={activeFilter}
                    onChange={(event) => setActiveFilter(event.target.value)}
                    className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.3em] text-slate-700 transition focus:border-primary focus:ring-2 focus:ring-primary/25 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    {filterOptions.map((option) => (
                      <option key={option.value} value={option.value} className="text-xs font-black uppercase tracking-[0.3em]">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="hidden md:table w-full min-w-[48rem] text-left">
                <thead className="text-xs font-black uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
                  <tr>
                    <th className="px-6 py-4">{tableHeaders.insight || insightsTableHeadings[0]}</th>
                    <th className="px-6 py-4">{tableHeaders.type || insightsTableHeadings[1]}</th>
                    <th className="px-6 py-4" />
                  </tr>
                </thead>
                <tbody>
                {filteredTopics.map((topic) => {
                  const title = t(`insights.topics.${topic.slug}.title`);
                  const summary = t(`insights.topics.${topic.slug}.summary`);
                  const localizedTag = t(`insights.topics.${topic.slug}.tag`);
                  const targetPath = buildPath(topic.slug);
                  const handleRowActivate = () => router.push(targetPath);
                  return (
                    <tr
                      key={topic.slug}
                      role="link"
                      tabIndex={0}
                      className="border-t border-slate-100 dark:border-slate-800 cursor-pointer focus-within:bg-slate-50 dark:focus-within:bg-slate-900/70"
                      onClick={handleRowActivate}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          handleRowActivate();
                        }
                      }}
                    >
                      <td className="px-6 py-5 align-top" style={{ minWidth: '20rem' }}>
                        <Link
                          to={targetPath}
                          className="text-base font-black text-slate-900 dark:text-white tracking-tight transition hover:text-primary"
                        >
                          {title}
                        </Link>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                          {summary}
                        </p>
                      </td>
                      <td className="px-6 py-5 align-top">
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-[0.4em] text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                          {localizedTag}
                        </span>
                      </td>
                      <td className="px-6 py-5 align-top text-right">
                        <ButtonLink
                          href={targetPath}
                          tone="dark"
                          size="sm"
                          className="px-4 py-2"
                          onClick={(event) => event.stopPropagation()}
                        >
                          {t('insights.table.read')}
                        </ButtonLink>
                      </td>
                    </tr>
                  );
                })}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col gap-4 p-6 md:hidden">
              {filteredTopics.map((topic) => {
                const title = t(`insights.topics.${topic.slug}.title`);
                const summary = t(`insights.topics.${topic.slug}.summary`);
                const localizedTag = t(`insights.topics.${topic.slug}.tag`);
                const targetPath = buildPath(topic.slug);
                const handleCardActivate = () => {
                  router.push(targetPath);
                };
                return (
                  <article
                    key={topic.slug}
                    className="rounded-3xl border border-slate-200 bg-white/70 p-5 shadow-sm transition hover:border-primary dark:border-slate-800 dark:bg-slate-900/70 cursor-pointer"
                    role="link"
                    tabIndex={0}
                    onClick={handleCardActivate}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        handleCardActivate();
                      }
                    }}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight transition hover:text-primary">
                          {title}
                        </h3>
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[0.625rem] font-black uppercase tracking-[0.4em] text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                          {localizedTag}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                        {summary}
                      </p>
                      <div className="flex justify-end">
                        <ButtonLink
                          href={targetPath}
                          tone="dark"
                          size="sm"
                          className="whitespace-nowrap px-4 py-2"
                        >
                          {t('insights.table.read')}
                        </ButtonLink>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
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
