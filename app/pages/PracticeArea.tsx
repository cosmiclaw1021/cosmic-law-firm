"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Link from '@/components/ui/Link';
import SEO from '@/components/SEO';
import { getPracticeAreaBySlug } from '@/lib/practice-areas';
import { SITE } from '@/lib/site';
import Icon from '@src/components/Icon';
import SectionWithStars from '@src/components/layout/SectionWithStars';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.05 } },
  viewport: { once: true },
};

type PracticeAreaPageProps = {
  lng?: string;
  slug: string;
};

const PracticeAreaPage: React.FC<PracticeAreaPageProps> = ({ lng, slug }) => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (lng && i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]);

  const area = getPracticeAreaBySlug(slug);

  if (!area) {
    return (
      <SectionWithStars className="max-w-[960px] mx-auto px-6 sm:px-8 py-16" settings={{ density: 0.44 }}>
        <SEO title={t('seo.practiceAreaNotFound.title')} description={t('seo.practiceAreaNotFound.description')} />
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
            {t('notFound.title')}
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            {t('notFound.description')}
          </p>
          <div className="mt-8">
            <Link
              to={lng ? `/${lng}/services` : '/services'}
              className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-primary hover:bg-primary/80 text-white font-bold transition-colors focus:ring-2 focus:ring-secondary/40 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
            >
              {t('notFound.cta')}
            </Link>
          </div>
        </motion.div>
      </SectionWithStars>
    );
  }

  const currentLang = i18n.language || lng || 'en';
  const isKo = currentLang.startsWith('ko');
  const isZh = currentLang.startsWith('zh');

  const title = isKo ? area.titleKo : isZh ? area.titleZh : area.title;
  const focus = isKo ? area.focusKo : isZh ? area.focusZh : area.focus;
  const overview = isKo ? area.overviewKo : isZh ? area.overviewZh : area.overview;
  const summary = isKo ? area.summaryKo ?? area.summary : isZh ? area.summaryZh ?? area.summary : area.summary;
  const services = isKo ? area.servicesKo ?? area.services : isZh ? area.servicesZh ?? area.services : area.services;

  return (
    <>
      <SEO title={title} description={summary} />

      {/* Hero */}
      <SectionWithStars className="hero-header-gap w-full bg-background-light dark:bg-background-dark border-b border-secondary/40 dark:border-white/10" settings={{ density: 0.47 }}>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10 py-12">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="flex flex-col gap-4 max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-slate-900 dark:text-primary-light text-xs font-black uppercase tracking-widest w-fit">
              <Icon name={area.icon} className="size-4" />
              {t('common.practiceAreaLabel')}
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              {title}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {focus}
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {summary}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to={lng ? `/${lng}/contact` : '/contact'}
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-primary hover:bg-primary/80 text-white font-bold transition-colors shadow-md focus:ring-2 focus:ring-secondary/40 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
              >
                {t('contactPage.form.title')}
              </Link>
              <Link
                to={lng ? `/${lng}/services` : '/services'}
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                {t('nav.viewAllPracticeAreas')}
              </Link>
            </div>
          </motion.div>
        </div>
      </SectionWithStars>

      {/* Services list */}
      <SectionWithStars className="w-full" settings={{ density: 0.5 }}>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10 py-12">
          {overview?.length ? (
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                {t('common.overview')}
              </h2>
              <div className="mt-3 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                {overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          ) : null}

          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="flex flex-col gap-2 max-w-3xl mt-12"
          >
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {t('common.whatWeHandle')}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {t('common.typicalMatters', { title: title.toLowerCase() })}
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
          >
            {services.map((service) => (
              <motion.div
                key={service}
                variants={fadeInUp}
                className="flex gap-3 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
              >
                <Icon name="check_circle" className="text-slate-900 dark:text-primary-light size-5 shrink-0" />
                <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  {service}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="mt-12 rounded-2xl border border-secondary/40 dark:border-white/10 bg-secondary/25 dark:bg-white/5 p-6 sm:p-8"
          >
            <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
              {t('common.nextStep')}
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('common.nextStepDescription')}
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <Link
                to={lng ? `/${lng}/contact` : '/contact'}
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-primary hover:bg-primary/80 text-white font-bold transition-colors shadow-md focus:ring-2 focus:ring-secondary/40 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
              >
                {t('common.contactCompany', { name: SITE.name.split(' ')[0] })}
              </Link>
              <a
                href={`mailto:${SITE.email}?subject=${encodeURIComponent(t('practiceArea.emailSubject', { title }))}`}
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                {t('contact.labels.email')}
              </a>
            </div>
          </motion.div>
        </div>
      </SectionWithStars>
    </>
  );
};

export default PracticeAreaPage;
