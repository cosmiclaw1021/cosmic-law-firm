import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import { SITE } from '../../../lib/site';
import { FEATURES } from '@src/config/features';
import EmailLink from '@/components/EmailLink';

const AccessibilityMobile: React.FC = () => {
  const { t } = useTranslation();
  const contactDetails = [
    {
      label: t('accessibilityPage.contact.phoneLabel'),
      value: SITE.phoneDisplay,
      href: `tel:${SITE.phoneTel}`,
    },
    {
      label: t('accessibilityPage.contact.emailLabel'),
      value: SITE.email,
      href: `mailto:${SITE.email}`,
    },
    {
      label: t('accessibilityPage.contact.addressLabel'),
      value: SITE.addressShort,
      href: FEATURES.googleMaps
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.addressQuery)}`
        : undefined,
    },
  ];

  return (
    <div className="non-hero-page-gap bg-white dark:bg-[#0f172a] px-6 pb-12 min-h-viewport">
      <SEO 
        title={t('footer.accessibility')}
        description={t('accessibilityPage.intro')}
      />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 uppercase tracking-tight">
          {t('accessibilityPage.title')}
        </h1>
        
        <div className="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 space-y-6">
          <p className="font-medium leading-relaxed">{t('accessibilityPage.intro')}</p>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-3 uppercase tracking-tight">{t('accessibilityPage.conformance.title')}</h2>
            <p className="font-medium leading-relaxed">{t('accessibilityPage.conformance.body')}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-3 uppercase tracking-tight">{t('accessibilityPage.feedback.title')}</h2>
            <p className="mb-3 font-medium leading-relaxed">{t('accessibilityPage.feedback.body')}</p>
            <ul className="list-disc pl-5 space-y-2 text-xs font-medium">
              <li>{t('accessibilityPage.feedback.phone')}</li>
              <li>{t('accessibilityPage.feedback.email')}</li>
              <li>{t('accessibilityPage.feedback.address')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-3 uppercase tracking-tight">{t('accessibilityPage.technical.title')}</h2>
            <p className="mb-3 font-medium leading-relaxed">{t('accessibilityPage.technical.body')}</p>
            <ul className="list-disc pl-5 space-y-2 text-xs font-medium">
              <li>{t('accessibilityPage.technical.items.html')}</li>
              <li>{t('accessibilityPage.technical.items.aria')}</li>
              <li>{t('accessibilityPage.technical.items.css')}</li>
              <li>{t('accessibilityPage.technical.items.js')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-3 uppercase tracking-tight">{t('accessibilityPage.assessment.title')}</h2>
            <p className="mb-3 font-medium leading-relaxed">{t('accessibilityPage.assessment.body')}</p>
            <ul className="list-disc pl-5 space-y-2 text-xs font-medium">
              <li>{t('accessibilityPage.assessment.items.self')}</li>
              <li>{t('accessibilityPage.assessment.items.automated')}</li>
            </ul>
          </section>

          <section className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-tight">{t('accessibilityPage.approval.title')}</h2>
            <p className="font-medium leading-relaxed">{t('accessibilityPage.approval.body')}</p>
            <p className="font-bold mt-2 text-sm uppercase tracking-wide">{t('accessibilityPage.approval.date')}</p>
          </section>
          <section className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-tight">{t('accessibilityPage.contact.heading')}</h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{t('accessibilityPage.contact.description')}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-medium">{t('accessibilityPage.contact.responseTime')}</p>
            </div>
            <div className="space-y-2">
              {contactDetails.map((detail) => {
                if (detail.href?.startsWith('mailto:')) {
                  return (
                    <EmailLink
                      key={detail.label}
                      email={SITE.email}
                      className="flex flex-col rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-white/5 px-3 py-3 text-xs font-semibold leading-tight tracking-wide text-slate-900 dark:text-white hover:border-primary transition-colors"
                    >
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                        {detail.label}
                      </span>
                      <span className="mt-1 text-sm font-bold">{detail.value}</span>
                    </EmailLink>
                  );
                }
                return detail.href ? (
                  <a
                    key={detail.label}
                    href={detail.href}
                    className="flex flex-col rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-white/5 px-3 py-3 text-xs font-semibold leading-tight tracking-wide text-slate-900 dark:text-white hover:border-primary transition-colors"
                  >
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                      {detail.label}
                    </span>
                    <span className="mt-1 text-sm font-bold">{detail.value}</span>
                  </a>
                ) : (
                  <div
                    key={detail.label}
                    className="flex flex-col rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-white/5 px-3 py-3 text-xs font-semibold leading-tight tracking-wide text-slate-900 dark:text-white"
                  >
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                      {detail.label}
                    </span>
                    <span className="mt-1 text-sm font-bold">{detail.value}</span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityMobile;
