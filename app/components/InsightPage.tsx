import React from 'react';
import Link from '@/components/ui/Link';
import Icon from '@src/components/Icon';
import ProcessedText from './ProcessedText';
import { getServerTranslation } from '../lib/i18n-server';

interface InsightPageProps {
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

export default function InsightPage({
  lng,
  pageKey,
  references,
  listType = 'disc',
  sections
}: InsightPageProps) {
  const t = getServerTranslation(lng);

  // Default structure if sections not provided
  const items = (t(`insights.pages.${pageKey}.items`, { returnObjects: true, defaultValue: [] }) as Array<{ title: string; body: string }>) || [];
  const actionItems = (t(`insights.pages.${pageKey}.actionItems`, { returnObjects: true, defaultValue: [] }) as string[]) || [];

  return (
    <div className="py-4 lg:py-6 bg-slate-50 dark:bg-slate-900 min-h-viewport text-slate-900 dark:text-white">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-8">
        <div className="space-y-8">
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
        </div>

        {sections ? (
          sections.map((section, sIdx) => (
            <section 
              key={sIdx} 
              className="space-y-5"
            >
              <h3 className="text-xl font-black">{t(section.titleKey)}</h3>
              {section.type === 'cards' ? (
                <div className="space-y-5">
                  {(t(section.itemsKey, { returnObjects: true, defaultValue: [] }) as Array<{ title: string; body: string }>).map((item, idx) => (
                    <article key={idx} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 shadow-sm">
                      <h2 className="text-xl font-black">{item.title}</h2>
                      <div className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                        <ProcessedText text={item.body} />
                      </div>
                    </article>
                  ))}
                </div>
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
            </section>
          ))
        ) : (
          <>
            <section className="space-y-5">
              {items.map((item, idx) => (
                <article key={idx} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 shadow-sm">
                  <h2 className="text-xl font-black">{item.title}</h2>
                  <div className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    <ProcessedText text={item.body} />
                  </div>
                </article>
              ))}
            </section>

            {actionItems.length > 0 && (
              <section className="space-y-3">
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
              </section>
            )}
          </>
        )}

        <section className="space-y-3">
          <h4 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">{t('insights.common.references')}</h4>
          <div className="space-y-2 text-sm text-primary dark:text-primary-light font-bold">
            {references.map((ref) => (
              <Link key={ref.url} to={ref.url} external className="block underline hover:text-secondary transition-colors">
                {ref.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
