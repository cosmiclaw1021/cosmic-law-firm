import React from 'react';
import { motion, MotionConfig } from 'framer-motion';
import ButtonLink from '@/components/ui/ButtonLink';
import Link from '@/components/ui/Link';
import SEO from '@/components/SEO';
import { useTranslation } from 'react-i18next';
import Icon from '@src/components/Icon';
import SectionWithStars from '@src/components/layout/SectionWithStars';

const fadeInUp = {
  initial: { opacity: 1 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0 },
};

const AboutMobile: React.FC = () => {
  const { t } = useTranslation();
  return (
    <MotionConfig reducedMotion="always">
      <>
      <SEO title={t('about.hero.title')} description={t('about.hero.description')} />
      <SectionWithStars className="hero-header-gap px-6 py-12 max-w-[960px] mx-auto overflow-hidden" settings={{ density: 0.47 }}>
        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-slate-900 dark:text-primary-light text-[10px] font-black uppercase tracking-widest w-fit">
            <Icon name="verified" className="size-3.5" />
            {t('about.hero.badge')}
          </div>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            {t('about.hero.title')}
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
            {t('about.hero.description')}
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <ButtonLink
              href="/contact"
              tone="dark"
              className="h-12 rounded-xl uppercase tracking-widest text-sm focus:ring-2 focus:ring-secondary/40 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
            >
              {t('about.hero.cta')}
            </ButtonLink>
            <Link
              to="/services"
              className="h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold flex items-center justify-center"
            >
              {t('nav.practiceAreas')}
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="relative z-10 mt-10 rounded-2xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800"
        >
          <div
            className="h-72 bg-center bg-cover bg-no-repeat bg-slate-200 dark:bg-slate-800"
            style={{ backgroundImage: "url('/NanoBanana/Background_screens_4.png')" }}
            role="img"
            aria-label={t('about.hero.imageLabel')}
          />
        </motion.div>

        <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="relative z-10 mt-12 space-y-10">
          <div className="space-y-3">
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {t('about.sections.experience.title')}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
              {t('about.sections.experience.body')}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              {t('about.sections.clientCentered.title')}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm whitespace-pre-line">
              {t('about.sections.clientCentered.body')}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              {t('about.sections.services.title')}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm whitespace-pre-line">
              {t('about.sections.services.body')}
            </p>
          </div>
        </motion.div>
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="relative z-10 mt-12 rounded-3xl bg-primary text-white p-8 text-center space-y-4"
        >
          <h2 className="text-2xl font-black uppercase tracking-tight">{t('about.cta.title')}</h2>
          <p className="text-sm text-white/90">{t('about.cta.description')}</p>
          <ButtonLink
            href="/contact"
            tone="light"
            className="inline-flex items-center justify-center gap-2 rounded-xl uppercase tracking-[0.3em] text-xs px-5 py-3 shadow-lg focus:ring-2 focus:ring-secondary/40 focus:ring-offset-2 focus:ring-offset-primary"
          >
            {t('about.cta.button')}
          </ButtonLink>
        </motion.div>
      </SectionWithStars>
      </>
    </MotionConfig>
  );
};

export default AboutMobile;
