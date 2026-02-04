import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/ui/Button';
import FormField from '../../../components/ui/FormField';
import Link from '../../../components/ui/Link';
import { useContactForm } from '../Shared/contact.hooks';
import { motion, MotionConfig } from 'framer-motion';
import { SITE } from '../../../lib/site';
import Icon from '@src/components/Icon';
import Map from '@src/components/Map';
import { FEATURES } from '@src/config/features';
import SectionWithStars from '@src/components/layout/SectionWithStars';

const fadeInUp = {
  initial: { opacity: 1 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0 }
};

const ContactMobile: React.FC = () => {
  const { t } = useTranslation();
  const { isSubmitted, isLoading, error, handleSubmit, resetForm } = useContactForm();
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.addressQuery)}`;

  return (
    <MotionConfig reducedMotion="always">
      <SectionWithStars className="hero-header-gap flex-grow w-full" settings={{ density: 0.47 }}>
      <div className="relative z-10 w-full px-4 py-8 overflow-hidden">
        {/* Page Heading */}
        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0 }}
          className="flex flex-col gap-3 mb-8 text-center"
        >
          <h1 className="text-text-main dark:text-white text-3xl font-black leading-tight tracking-tight uppercase">{t('contactPage.hero.title')}</h1>
          <p className="text-text-secondary dark:text-slate-400 text-base font-medium leading-relaxed">
            {t('contactPage.hero.description')}
          </p>
        </motion.div>

        <div className="flex flex-col gap-8">
          {/* Contact Form First on Mobile */}
          <motion.section 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="flex flex-col bg-white/70 dark:bg-white/5 rounded-xl shadow-sm border border-secondary/40 dark:border-white/10 overflow-hidden order-1"
            aria-labelledby="form-title"
          >
            <div className="px-5 py-5 border-b border-slate-100 dark:border-slate-800">
              <h2 id="form-title" className="text-text-main dark:text-white text-xl font-black leading-tight tracking-tight uppercase">{t('contactPage.form.title')}</h2>
              <p className="text-text-secondary dark:text-slate-400 text-xs mt-1 font-medium">{t('contactPage.form.description')}</p>
            </div>
            <div className="p-5">
              {isSubmitted ? (
                <div 
                  className="flex flex-col items-center justify-center min-h-[250px] text-center gap-4 animate-in fade-in duration-500"
                  role="status"
                >
                  <div className="size-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-2">
                    <Icon name="check" className="size-8" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase">{t('contactPage.form.success.title')}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs font-medium">
                    {t('contactPage.form.success.message')}
                  </p>
                  <Button 
                    variant="ghost"
                    onClick={resetForm}
                    className="mt-4"
                  >
                    {t('contactPage.form.success.button')}
                  </Button>
                </div>
              ) : (
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm font-bold">
                      {error}
                    </div>
                  )}
                  <FormField 
                    label={t('contactPage.form.labels.name')} 
                    name="name" 
                    required
                  >
                    <input 
                      className="w-full h-11 rounded-lg border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-slate-800 px-4 text-sm text-text-main dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400" 
                      placeholder={t('contactPage.form.placeholders.name')} 
                      type="text" 
                      required
                    />
                  </FormField>
                  <FormField 
                    label={t('contactPage.form.labels.email')} 
                    name="email" 
                    required
                  >
                    <input 
                      className="w-full h-11 rounded-lg border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-slate-800 px-4 text-sm text-text-main dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400" 
                      placeholder="email@example.com" 
                      type="email" 
                      required
                    />
                  </FormField>
                  <FormField 
                    label={t('contactPage.form.labels.phone')} 
                    name="phone"
                  >
                    <input 
                      className="w-full h-11 rounded-lg border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-slate-800 px-4 text-sm text-text-main dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400" 
                      placeholder={t('contactPage.form.placeholders.phone')} 
                      type="tel" 
                    />
                  </FormField>
                  <FormField 
                    label={t('contactPage.form.labels.message')} 
                    name="message" 
                    required
                  >
                    <textarea 
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-slate-800 p-4 text-sm text-text-main dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none placeholder:text-slate-400" 
                      placeholder={t('contactPage.form.placeholders.message')} 
                      rows={4}
                    ></textarea>
                  </FormField>
                  <Button 
                    type="submit" 
                    isLoading={isLoading}
                    className="w-full shadow-md h-11 uppercase tracking-widest font-black"
                  >
                    {t('contactPage.form.submit')}
                  </Button>
                </form>
              )}
            </div>
          </motion.section>

          {/* Location & Details Second */}
          <div className="flex flex-col gap-6 order-2">
            {/* Info Card */}
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-text-main dark:text-white text-xl font-black leading-tight tracking-tight uppercase">{t('contactPage.details.title')}</h2>
              </div>
              {FEATURES.googleMaps ? (
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
              ) : (
                <div className="flex gap-4 px-5 py-4 border-b border-slate-100 dark:border-slate-800 transition-colors">
                  <div className="text-text-main dark:text-slate-300 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 shrink-0 size-10">
                    <Icon name="location_on" className="size-5" />
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <p className="text-text-main dark:text-white text-sm font-bold leading-normal">{t('footer.address')}</p>
                  </div>
                </div>
              )}
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
              <Link 
                href={`mailto:${SITE.email}`}
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
              </Link>
            </motion.div>

            {/* Hours Card */}
            <motion.section 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="flex flex-col bg-white/70 dark:bg-white/5 rounded-xl shadow-sm border border-secondary/40 dark:border-white/10 overflow-hidden"
              aria-labelledby="hours-title"
            >
              <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                <h2 id="hours-title" className="text-text-main dark:text-white text-xl font-black leading-tight tracking-tight uppercase">{t('contactPage.hours.title')}</h2>
              </div>
              <div className="px-5 py-2">
                <div className="flex flex-col">
                  {[
                    { label: t('contact.hours.weekdays'), value: '9:00 AM - 6:00 PM' },
                    { label: t('contact.hours.thursday'), value: '2:00 PM - 6:00 PM' },
                    { label: t('contact.hours.saturday'), value: '9:00 AM - 1:00 PM' },
                    { label: t('contact.hours.sunday'), value: t('contact.hours.closed'), highlight: true },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between border-b border-slate-100 dark:border-slate-800 py-4 last:border-0">
                      <p className="text-text-secondary dark:text-slate-400 text-xs font-medium leading-normal">{item.label}</p>
                      <p className={`text-xs font-bold leading-normal ${item.highlight ? 'text-red-500' : 'text-text-main dark:text-white'}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Map Last */}
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="w-full h-[250px] bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm relative"
            >
              <Map
                addressQuery={SITE.addressQuery}
                addressText={t('footer.address')}
                className="w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWithStars>
    </MotionConfig>
  );
};

export default ContactMobile;
