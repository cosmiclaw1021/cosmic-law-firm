import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Link from '../../../components/ui/Link';
import EmailLink from '../../../components/EmailLink';
import { SITE } from '../../../lib/site';
import Icon from '@src/components/Icon';
import Map from '@src/components/Map';
import { FEATURES } from '@src/config/features';
import SectionWithStars from '@src/components/layout/SectionWithStars';

const fadeInUp = {
  initial: { opacity: 1, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const ContactDesktop: React.FC = () => {
  const { t } = useTranslation();
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.addressQuery)}`;

  return (
    <SectionWithStars className="flex-grow w-full flex justify-center" settings={{ density: 0.5 }}>
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-8 py-12 overflow-hidden">
        {/* Page Heading */}
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="flex flex-col gap-3 mb-10"
        >
          <h1 className="text-text-main dark:text-white text-5xl font-black leading-tight tracking-tight uppercase">
            {t('contactPage.hero.title')}
          </h1>
          <p className="text-text-secondary dark:text-slate-400 text-lg font-medium leading-relaxed max-w-2xl">
            {t('contactPage.hero.description')}
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-12">
          {/* Left Column: Details */}
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="col-span-5 flex flex-col gap-8"
          >
            {/* Location & Contact Info */}
            <div className="flex flex-col bg-white/70 dark:bg-white/5 rounded-xl shadow-sm border border-secondary/40 dark:border-white/10 overflow-hidden backdrop-blur">
              <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-text-main dark:text-white text-[22px] font-black leading-tight tracking-tight uppercase">{t('contactPage.details.title')}</h2>
              </div>
              {/* Address Item */}
              <Link 
                href={mapHref}
                external
                className="flex gap-4 px-6 py-5 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
              >
                <div className="text-text-main dark:text-slate-300 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 shrink-0 size-12 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon name="location_on" className="size-6" />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="text-text-main dark:text-white text-base font-bold leading-normal group-hover:text-primary transition-colors">{t('footer.address')}</p>
                </div>
              </Link>
              {/* Phone Item */}
              <Link 
                href={`tel:${SITE.phoneTel}`}
                className="flex gap-4 px-6 py-5 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
              >
                <div className="text-text-main dark:text-slate-300 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 shrink-0 size-12 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon name="call" className="size-6" />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="text-text-main dark:text-white text-base font-bold leading-normal group-hover:text-primary transition-colors">
                    {SITE.phoneDisplay}
                  </p>
                  <p className="text-text-secondary dark:text-slate-400 text-sm font-medium leading-normal">{t('contactPage.details.phone.label')}</p>
                </div>
              </Link>
              {/* Email Item */}
              <EmailLink 
                email={SITE.email}
                className="flex gap-4 px-6 py-5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
              >
                <div className="text-text-main dark:text-slate-300 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 shrink-0 size-12 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon name="mail" className="size-6" />
                </div>
              <div className="flex flex-1 flex-col justify-center overflow-hidden">
                <p className="text-text-main dark:text-white text-base font-bold leading-normal group-hover:text-primary transition-colors truncate">
                  {SITE.email}
                </p>
                <p className="text-text-secondary dark:text-slate-400 text-sm font-medium leading-normal">{t('contactPage.details.email.label')}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal font-medium">{t('contactPage.details.email.responseTime')}</p>
              </div>
            </EmailLink>
            </div>

            {/* Hours */}
            <section 
              className="flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden"
              aria-labelledby="hours-title"
            >
              <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                <h2 id="hours-title" className="text-text-main dark:text-white text-[22px] font-black leading-tight tracking-tight uppercase">{t('contactPage.hours.title')}</h2>
              </div>
              <div className="px-6 py-2">
                <div className="flex flex-col">
                  {[
                    { label: t('contact.hours.weekdays'), value: '9:00 AM - 6:00 PM' },
                    { label: t('contact.hours.thursday'), value: '2:00 PM - 6:00 PM' },
                    { label: t('contact.hours.saturday'), value: '9:00 AM - 1:00 PM' },
                    { label: t('contact.hours.sunday'), value: t('contact.hours.closed'), highlight: true },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between border-b border-slate-100 dark:border-slate-800 py-4 last:border-0">
                      <p className="text-text-secondary dark:text-slate-400 text-sm font-medium leading-normal">{item.label}</p>
                      <p className={`text-sm font-bold leading-normal ${item.highlight ? 'text-red-500' : 'text-text-main dark:text-white'}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>

          {/* Right Column: Map & Form */}
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="col-span-7 flex flex-col gap-8 h-full"
          >
            {/* Map Embed */}
            <div className="w-full h-[400px] bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm relative">
              <Map
                addressQuery={SITE.addressQuery}
                addressText={t('footer.address')}
                className="w-full h-full"
              />
            </div>

            {/* Email CTA */}
            <section 
              className="flex flex-col bg-white/70 dark:bg-white/5 rounded-xl shadow-sm border border-secondary/40 dark:border-white/10 overflow-hidden flex-1 backdrop-blur"
              aria-labelledby="email-cta-title"
            >
              <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800">
                <h2 id="email-cta-title" className="text-text-main dark:text-white text-[22px] font-black leading-tight tracking-tight uppercase">
                  {t('contactPage.emailCta.title')}
                </h2>
                <p className="text-text-secondary dark:text-slate-400 text-sm mt-1 font-medium">
                  {t('contactPage.emailCta.description')}
                </p>
              </div>
              <div className="p-8 space-y-4 text-sm text-slate-600 dark:text-slate-300 font-medium">
                <EmailLink
                  asButton
                  email={SITE.email}
                  className="w-full inline-flex items-center justify-center gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-secondary/20 dark:bg-slate-900/30 text-slate-900 dark:text-white font-black uppercase tracking-[0.3em] px-4 py-3 hover:border-secondary hover:bg-secondary/30 transition-all focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
                >
                  <Icon name="mail" className="size-4 text-primary" />
                  <span>{SITE.email}</span>
                </EmailLink>
                <Link
                  href={`tel:${SITE.phoneTel}`}
                  className="w-full inline-flex items-center justify-center gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 text-slate-900 dark:text-white font-black uppercase tracking-[0.3em] px-4 py-3 hover:border-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                >
                  <Icon name="call" className="size-4 text-secondary" />
                  <span>{SITE.phoneDisplay}</span>
                </Link>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em]">
                  {t('contactPage.details.email.responseTime')}
                </p>
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </SectionWithStars>
  );
};

export default ContactDesktop;
