import React from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import ButtonLink from '@/components/ui/ButtonLink';
import Link from '@/components/ui/Link';
import { motion } from 'framer-motion';
import { practiceAreas } from '@/lib/practice-areas';
import { SITE } from '@/lib/site';
import Icon from '@src/components/Icon';
import SectionWithStars from '@src/components/layout/SectionWithStars';

const fadeInUp = {
  initial: { opacity: 1, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.05 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.06 } },
  viewport: { once: true, amount: 0.05 },
};

const MotionButtonLink = motion(ButtonLink);

const ServicesDesktop: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lng = i18n.language || 'en';
  const isKo = i18n.language?.startsWith('ko');
  const processSteps = ['step1', 'step2', 'step3'] as const;

  return (
    <>
      <SectionWithStars
        className="hero-header-gap w-full bg-background-light dark:bg-background-dark flex justify-center"
        overflow="visible"
        settings={{ density: 0.44 }}
      >
        <div className="relative z-10 w-full max-w-[1280px] px-8 py-4">
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="flex min-h-[320px] flex-col gap-6 rounded-xl items-center justify-center p-8 shadow-sm relative overflow-hidden bg-slate-900"
            role="img"
            aria-label={t('accessibility.alt.contractNotesDesk')}
          >
            <Image
              src="/NanoBanana/Background_screens_3.png"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 to-black/80" />
            <div className="flex flex-col gap-3 text-center max-w-[860px] z-10">
              <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-[11px] font-black uppercase tracking-[0.3em] w-fit mx-auto">
                <Icon name="gavel" className="size-4" />
                {t('servicesPage.hero.badge')}
              </div>
              <h1 className="text-white text-5xl font-black leading-tight tracking-tight drop-shadow-md uppercase">
                {t('servicesPage.hero.title')}
              </h1>
              <p className="text-slate-100 text-lg font-medium leading-relaxed mt-1 drop-shadow-sm">
                {t('servicesPage.hero.subtitle')}
              </p>
            </div>
            <MotionButtonLink
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              href="#practice-areas"
              tone="light"
              className="z-10 flex w-auto min-w-[180px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-secondary hover:bg-secondary/90 transition-colors text-slate-900 text-base font-bold leading-normal tracking-widest uppercase shadow-lg focus:ring-2 focus:ring-secondary/40 focus:ring-offset-2 focus:ring-offset-black"
            >
              <span className="truncate">{t('servicesPage.hero.cta')}</span>
            </MotionButtonLink>
          </motion.div>
        </div>
      </SectionWithStars>

      <SectionWithStars id="practice-areas" className="w-full flex justify-center py-16 overflow-hidden" settings={{ density: 0.5 }}>
        <div className="relative z-10 w-full max-w-[1280px] px-8">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.05 }}
            className="max-w-3xl"
          >
            <h2 className="text-[#0d141b] dark:text-white text-4xl font-black leading-tight uppercase tracking-tight">
              {t('servicesPage.specialties.title')}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-medium mt-4">
              {t('servicesPage.specialties.description')}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-3 gap-6 mt-12"
          >
            {practiceAreas.map((area) => (
              <Link
                key={area.slug}
                to={`/${lng}/services/${area.slug}`}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark"
              >
                <motion.div
                  variants={fadeInUp}
                  className="flex flex-col gap-5 rounded-[28px] border border-slate-100 bg-white/90 dark:border-slate-800 dark:bg-slate-900/70 p-8 hover:shadow-2xl hover:border-primary/20 transition-all duration-500 group cursor-pointer"
                >
                  <div className="size-14 rounded-2xl bg-white/5 shadow-xl shadow-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 dark:bg-white/10 dark:text-white">
                    <Icon name={area.icon} className="size-8" />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="text-[#0d141b] dark:text-white text-xl font-black leading-tight tracking-tight">
                      {isKo ? area.titleKo : area.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                      {isKo ? area.focusKo : area.focus}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-primary transition-colors duration-200 group-hover:text-secondary dark:text-secondary">
                    <span>{t('nav.viewServices')}</span>
                    <Icon name="arrow_forward" className="size-3.5" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </SectionWithStars>

      <SectionWithStars className="w-full flex justify-center py-16 bg-slate-50 dark:bg-background-dark" settings={{ density: 0.41 }}>
        <div className="relative z-10 w-full max-w-[1280px] px-8 flex flex-col">
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.05 }}
            className="text-[#0d141b] dark:text-white text-3xl font-bold leading-tight tracking-tight mb-12 text-center"
          >
            {t('servicesPage.process.title')}
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-3 gap-8 relative"
          >
            <div className="absolute top-6 left-[16%] right-[16%] h-0.5 bg-slate-200 dark:bg-slate-700 z-0"></div>
            {processSteps.map((stepKey, idx) => (
              <motion.div
                key={stepKey}
                variants={fadeInUp}
                className="flex flex-col items-center text-center gap-4"
              >
                <div className="size-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold shadow-lg">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-bold text-[#0d141b] dark:text-white">
                  {t(`servicesPage.process.${stepKey}.title`)}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {t(`servicesPage.process.${stepKey}.desc`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWithStars>

      <SectionWithStars className="w-full flex justify-center py-16 bg-white dark:bg-[#1a2632] border-t border-slate-100 dark:border-slate-800" settings={{ density: 0.47 }}>
        <div className="relative z-10 w-full max-w-[1280px] px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.8 }}
            className="bg-secondary/35 dark:bg-white/5 rounded-2xl p-12 flex flex-row items-center justify-between gap-8 border border-secondary/40 dark:border-white/10"
          >
              <div className="flex flex-col gap-2 text-left">
                <h2 className="text-3xl font-bold text-[#0d141b] dark:text-white">
                  {t('servicesPage.cta.title')}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-base">
                  {t('servicesPage.cta.description')}
                </p>
              </div>
            <div className="flex flex-col gap-4 items-end w-auto">
              <div className="flex items-center gap-2 text-lg font-semibold text-[#0d141b] dark:text-white">
                <Icon name="call" className="text-primary dark:text-primary-light size-6" />
                {SITE.phoneDisplay}
              </div>
              <Link
                to={`/${lng}/contact`}
                className="flex w-auto min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary hover:bg-primary/80 transition-colors text-white text-base font-bold leading-normal tracking-[0.015em] shadow-md focus:ring-2 focus:ring-secondary/40 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
              >
                {t('servicesPage.cta.button')}
              </Link>
            </div>
          </motion.div>
        </div>
      </SectionWithStars>
    </>
  );
};

export default ServicesDesktop;
