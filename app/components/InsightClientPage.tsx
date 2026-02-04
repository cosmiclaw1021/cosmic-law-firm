'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from '@/components/ui/Link';
import { useTranslation } from 'react-i18next';
import Icon from '@src/components/Icon';
import ProcessedText from './ProcessedText';
import { useViewport } from '../hooks/useViewport';

const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.05 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, amount: 0.05 },
};

interface InsightClientPageProps {
  lng: string;
  pageKey: string;
  references: Array<{ label: string; url: string }>;
  listType?: 'disc' | 'decimal';
  sections?: Array<{
    titleKey: string;
    itemsKey: string;
    type: 'cards' | 'list';
  }>;
}

export default function InsightClientPage({
  lng,
  pageKey,
  references,
  listType = 'disc',
  sections
}: InsightClientPageProps) {
  const { t, i18n } = useTranslation();
  const { isMobile } = useViewport();

  const currentFadeInUp = isMobile ? {
    initial: { opacity: 1, y: 0 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.05 },
    transition: { duration: 0 },
  } : fadeInUp;

  const currentStagger = isMobile ? {
    initial: {},
    whileInView: { transition: { staggerChildren: 0 } },
    viewport: { once: true, amount: 0.05 },
  } : staggerContainer;

  React.useEffect(() => {
    if (lng && i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]);

  // Default structure if sections not provided (compatible with my first refactor)
  const items = (t(`insights.pages.${pageKey}.items`, { returnObjects: true, defaultValue: [] }) as Array<{ title: string; body: string }>) || [];
  const actionItems = (t(`insights.pages.${pageKey}.actionItems`, { returnObjects: true, defaultValue: [] }) as string[]) || [];

  return (
    <div className="py-4 lg:py-6 bg-slate-50 dark:bg-slate-900 min-h-viewport text-slate-900 dark:text-white">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-8">
        <motion.div 
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={isMobile ? { duration: 0 } : { duration: 0.5 }}
          className="space-y-8"
        >
          <div className="text-sm uppercase tracking-[0.3em] text-primary dark:text-primary-light">
            {t(`insights.pages.${pageKey}.badge`)}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black">{t(`insights.pages.${pageKey}.title`)}</h1>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {t(`insights.pages.${pageKey}.description`)}
            </p>
            <div className="mt-4">
              <Link to="/insights" className="text-sm font-bold uppercase tracking-[0.3em] text-primary dark:text-primary-light inline-flex items-center gap-2">
                <Icon name="west" className="size-4" />
                {t('insights.common.backToInsides')}
              </Link>
            </div>
          </div>
        </motion.div>

        {sections ? (
          sections.map((section, sIdx) => (
            <motion.section 
              key={sIdx} 
              variants={currentFadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="space-y-5"
            >
              <h3 className="text-xl font-black">{t(section.titleKey)}</h3>
              {section.type === 'cards' ? (
                <motion.div variants={currentStagger} className="space-y-5">
                  {(t(section.itemsKey, { returnObjects: true, defaultValue: [] }) as Array<{ title: string; body: string }>).map((item, idx) => (
                    <motion.article key={idx} variants={currentFadeInUp} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 shadow-sm">
                      <h2 className="text-xl font-black">{item.title}</h2>
                      <div className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                        <ProcessedText text={item.body} />
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              ) : (
                <ul className={`space-y-2 ${section.type === 'list' ? (listType === 'disc' ? 'list-disc' : 'list-decimal') : ''} list-inside text-sm text-slate-600 dark:text-slate-300 font-medium`}>
                  {(t(section.itemsKey, { returnObjects: true, defaultValue: [] }) as Array<string | { body?: string }>).map((item, idx) => {
                    const textValue = typeof item === 'string' ? item : (item?.body || '');
                    return (
                      <li key={idx}>
                        <ProcessedText text={textValue} />
                      </li>
                    );
                  })}
                </ul>
              )}
            </motion.section>
          ))
        ) : (
          <>
            <motion.section 
              variants={currentStagger}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="space-y-5"
            >
              {items.map((item, idx) => (
                <motion.article key={idx} variants={currentFadeInUp} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 shadow-sm">
                  <h2 className="text-xl font-black">{item.title}</h2>
                  <div className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    <ProcessedText text={item.body} />
                  </div>
                </motion.article>
              ))}
            </motion.section>

            {actionItems.length > 0 && (
              <motion.section 
                variants={currentFadeInUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="space-y-3"
              >
                <h3 className="text-xl font-black">{t('insights.common.actionItems')}</h3>
                <ul className="space-y-2 list-disc list-inside text-sm text-slate-600 dark:text-slate-300 font-medium">
                  {(actionItems as Array<string | { body?: string }>).map((item, idx) => {
                    const textValue = typeof item === 'string' ? item : (item?.body || '');
                    return (
                      <li key={idx}>
                        <ProcessedText text={textValue} />
                      </li>
                    );
                  })}
                </ul>
              </motion.section>
            )}
          </>
        )}

        <motion.section 
          variants={currentFadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="space-y-3"
        >
          <h4 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">{t('insights.common.references')}</h4>
          <div className="space-y-2 text-sm text-primary dark:text-primary-light font-bold">
            {references.map((ref) => (
              <Link key={ref.url} to={ref.url} external className="block underline hover:text-secondary transition-colors">
                {ref.label}
              </Link>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
