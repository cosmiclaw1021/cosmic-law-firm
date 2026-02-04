import React from 'react';
import { motion } from 'framer-motion';
import ButtonLink from '@/components/ui/ButtonLink';
import Link from '@/components/ui/Link';
import SEO from '@/components/SEO';
import { useTranslation } from 'react-i18next';
import Icon from '@src/components/Icon';
import SectionWithStars from '@src/components/layout/SectionWithStars';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const AboutDesktop: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO title={t('about.hero.title')} description={t('about.hero.description')} />

      <SectionWithStars className="w-full px-10 py-20 max-w-[1280px] mx-auto overflow-hidden" aria-labelledby="about-hero-title" settings={{ density: 0.5 }}>
        <div className="relative z-10 flex flex-col gap-16 lg:flex-row lg:items-center">
          <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="flex flex-col gap-6 lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-slate-900 dark:text-primary-light text-xs font-black uppercase tracking-widest w-fit">
              <Icon name="verified" className="size-4" />
              {t('about.hero.badge')}
            </div>
            <h1 id="about-hero-title" className="text-slate-900 dark:text-white text-6xl font-black leading-tight tracking-tight">
              {t('about.hero.title')}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-xl">
              {t('about.hero.description')}
            </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <ButtonLink
                  href="/contact"
                  tone="dark"
                  className="h-11 px-6 text-base font-bold uppercase tracking-widest focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
                >
                  {t('about.hero.cta')}
                </ButtonLink>
                <Link
                  to="/services"
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-base font-bold h-11 px-6 rounded-lg transition-colors flex items-center justify-center min-w-[160px] hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  {t('nav.practiceAreas')}
                </Link>
              </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            className="lg:w-1/2 flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <div
                className="w-full h-full bg-center bg-cover bg-no-repeat bg-slate-200 dark:bg-slate-800"
                style={{ backgroundImage: "url('/NanoBanana/korean-lawyer-artist-no-icon.png')" }}
                role="img"
                aria-label={t('about.hero.imageLabel')}
              />
              <div className="absolute bottom-6 left-6 z-20 text-white">
                <p className="font-bold text-lg leading-tight">{t('team.members.jean.title')}</p>
                <p className="text-sm opacity-90">{t('team.members.jean.location')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWithStars>

      <SectionWithStars className="w-full bg-background-light dark:bg-background-dark py-20 border-y border-secondary/40 dark:border-white/10" settings={{ density: 0.42 }}>
        <div className="relative z-10 max-w-4xl mx-auto px-10">
          <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                {t('about.sections.experience.title')}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg whitespace-pre-line">
                {t('about.sections.experience.body')}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                {t('about.sections.clientCentered.title')}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {t('about.sections.clientCentered.body')}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                {t('about.sections.services.title')}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {t('about.sections.services.body')}
              </p>
            </div>
          </motion.div>
        </div>
      </SectionWithStars>

      <SectionWithStars className="w-full bg-primary text-white py-16 px-10 overflow-hidden" settings={{ density: 0.47 }}>
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6"
        >
          <h2 className="text-4xl font-black uppercase tracking-tight">{t('about.cta.title')}</h2>
          <p className="text-white/90 text-lg max-w-2xl">
            {t('about.cta.description')}
          </p>
              <ButtonLink
                href="/contact"
                tone="light"
                className="bg-secondary text-slate-900 hover:bg-secondary/90 font-bold h-12 px-8 rounded-lg shadow-lg transition-colors mt-2 flex items-center justify-center w-fit focus:ring-2 focus:ring-secondary/40 focus:ring-offset-2 focus:ring-offset-primary"
              >
                {t('about.cta.button')}
              </ButtonLink>
        </motion.div>
      </SectionWithStars>
    </>
  );
};

export default AboutDesktop;
