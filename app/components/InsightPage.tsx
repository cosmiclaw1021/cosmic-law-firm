import Link from '@/components/ui/Link';
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

  const badge = t(`insights.pages.${pageKey}.badge`);
  const title = t(`insights.pages.${pageKey}.title`);
  const description = t(`insights.pages.${pageKey}.description`);
  const publishedDate = t(`insights.pages.${pageKey}.date`, { defaultValue: '' });

  const items = (t(`insights.pages.${pageKey}.items`, { returnObjects: true, defaultValue: [] }) as Array<{ title: string; body: string }>) || [];
  const actionItems = (t(`insights.pages.${pageKey}.actionItems`, { returnObjects: true, defaultValue: [] }) as string[]) || [];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
      <section className="hero-header-gap border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 py-10 space-y-3">
          <div className="text-sm uppercase tracking-[0.3em] text-primary dark:text-primary-light">
            {badge}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black">{title}</h1>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{description}</p>
            {publishedDate && (
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 font-semibold">
                {publishedDate}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 py-10 pb-16 space-y-10">
          {sections ? (
            sections.map((section, sIdx) => {
              const sectionTitle = section.titleKey ? t(section.titleKey) : '';
              return (
                <section key={section.titleKey || sIdx} className="space-y-5">
                  {sectionTitle && <h3 className="text-xl font-black">{sectionTitle}</h3>}
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
              );
            })
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

          <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium italic">
                <strong>Disclaimer:</strong> {t('disclaimerPage.notAdviceBody')}
              </p>
              <Link to="/disclaimer" className="mt-3 inline-block text-[10px] uppercase tracking-[0.2em] font-black text-primary hover:text-secondary transition-colors">
                View Full Professional Services Disclaimer
              </Link>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
