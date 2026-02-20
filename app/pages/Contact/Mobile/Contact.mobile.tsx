import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from '../../../components/ui/Link';
import EmailLink from '../../../components/EmailLink';
import { SITE } from '../../../lib/site';
import Icon from '@src/components/Icon';
import Map from '@src/components/Map';
import { FEATURES } from '@src/config/features';
import SectionWithStars from '@src/components/layout/SectionWithStars';

const ContactMobile: React.FC = () => {
  const { t } = useTranslation();
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.addressQuery)}`;

  return (
    <SectionWithStars className="hero-header-gap flex-grow w-full" settings={{ density: 0.47 }}>
      <div className="relative z-10 w-full px-4 py-8 overflow-hidden">
        {/* Page Heading */}
        <div className="flex flex-col gap-3 mb-8 text-center">
          <h1 className="text-text-main dark:text-white text-3xl font-black leading-tight tracking-tight uppercase">{t('contactPage.hero.title')}</h1>
          <p className="text-text-secondary dark:text-slate-400 text-base font-medium leading-relaxed">
            {t('contactPage.hero.description')}
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {/* Contact Form First on Mobile */}
          <section
            className="flex flex-col bg-white/70 dark:bg-white/5 rounded-xl shadow-sm border border-secondary/40 dark:border-white/10 overflow-hidden order-1"
            aria-labelledby="email-cta-title"
          >
            <div className="px-5 py-5 border-b border-slate-100 dark:border-slate-800">
              <h2 id="email-cta-title" className="text-text-main dark:text-white text-xl font-black leading-tight tracking-tight uppercase">{t('contactPage.emailCta.title')}</h2>
              <p className="text-text-secondary dark:text-slate-400 text-xs mt-1 font-medium">{t('contactPage.emailCta.description')}</p>
            </div>
            <div className="p-5 space-y-3">
              <EmailLink
                asButton
                email={SITE.email}
                className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-secondary/20 text-slate-900 dark:text-white font-black uppercase tracking-[0.3em] px-4 py-3 hover:border-secondary hover:bg-secondary/30 transition-all focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
              >
                <Icon name="mail" className="size-4 text-primary" />
                <span>{SITE.email}</span>
              </EmailLink>
              <Link
                href={`tel:${SITE.phoneTel}`}
                className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 text-slate-900 dark:text-white font-black uppercase tracking-[0.3em] px-4 py-3 hover:border-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
              >
                <Icon name="call" className="size-4 text-secondary" />
                <span>{SITE.phoneDisplay}</span>
              </Link>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em]">
                {t('contactPage.details.email.responseTime')}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[9px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {t('contactPage.form.disclaimer')}
                </p>
                <Link to="/disclaimer" className="mt-2 inline-block text-[8px] uppercase tracking-[0.2em] font-bold text-primary/70 hover:text-secondary transition-colors">
                  Professional Relationship Disclaimer
                </Link>
              </div>
            </div>
          </section>

          {/* Location & Details Second */}
          <div className="flex flex-col gap-6 order-2">
            {/* Info Card */}
            <div className="flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-text-main dark:text-white text-xl font-black leading-tight tracking-tight uppercase">{t('contactPage.details.title')}</h2>
              </div>
              <Link
                href={mapHref}
                external
                className="flex gap-4 px-5 py-4 border-b border-slate-100 dark:border-slate-800 transition-colors"
              >
                <div className="text-text-main dark:text-slate-300 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 shrink-0 size-10">
                  <Icon name="location_on" className="size-5" />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="text-text-main dark:text-white text-sm font-bold leading-normal">{t('footer.address')}</p>
                </div>
              </Link>
              <Link
                href={`tel:${SITE.phoneTel}`}
                className="flex gap-4 px-5 py-4 border-b border-slate-100 dark:border-slate-800 transition-colors"
              >
                <div className="text-text-main dark:text-slate-300 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 shrink-0 size-10">
                  <Icon name="call" className="size-5" />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="text-text-main dark:text-white text-sm font-bold leading-normal">{SITE.phoneDisplay}</p>
                  <p className="text-text-secondary dark:text-slate-400 text-xs font-medium leading-normal">{t('contactPage.details.phone.label')}</p>
                </div>
              </Link>
              <EmailLink
                email={SITE.email}
                className="flex gap-4 px-5 py-4 transition-colors"
              >
                <div className="text-text-main dark:text-slate-300 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 shrink-0 size-10">
                  <Icon name="mail" className="size-5" />
                </div>
                <div className="flex flex-1 flex-col justify-center overflow-hidden">
                  <p className="text-text-main dark:text-white text-sm font-bold leading-normal truncate">{SITE.email}</p>
                  <p className="text-text-secondary dark:text-slate-400 text-xs font-medium leading-normal">{t('contactPage.details.email.label')}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-medium">{t('contactPage.details.email.responseTime')}</p>
                </div>
              </EmailLink>
            </div>

            {/* Hours Card */}
            <section
              className="flex flex-col bg-white/70 dark:bg-white/5 rounded-xl shadow-sm border border-secondary/40 dark:border-white/10 overflow-hidden"
              aria-labelledby="hours-title"
            >
              <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                <h2 id="hours-title" className="text-text-main dark:text-white text-xl font-black leading-tight tracking-tight uppercase">{t('contactPage.hours.title')}</h2>
              </div>
              <div className="px-5 py-2">
                <div className="flex flex-col">
                  {[
                    { label: t('contact.hours.monday'), value: '8:30 AM - 5:00 PM' },
                    { label: t('contact.hours.tuesday'), value: '8:30 AM - 5:00 PM' },
                    { label: t('contact.hours.wednesday'), value: '8:30 AM - 5:00 PM' },
                    { label: t('contact.hours.thursday'), value: '8:30 AM - 5:00 PM' },
                    { label: t('contact.hours.friday'), value: '8:30 AM - 5:00 PM' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between border-b border-slate-100 dark:border-slate-800 py-4 last:border-0">
                      <p className="text-text-secondary dark:text-slate-400 text-xs font-medium leading-normal">{item.label}</p>
                      <p className={`text-xs font-bold leading-normal ${item.highlight ? 'text-red-500' : 'text-text-main dark:text-white'}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Map Last */}
            <div className="w-full h-[250px] bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm relative">
              <Map
                addressQuery={SITE.addressQuery}
                addressText={t('footer.address')}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionWithStars>
  );
};

export default ContactMobile;
