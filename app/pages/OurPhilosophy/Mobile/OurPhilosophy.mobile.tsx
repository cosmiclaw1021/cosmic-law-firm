import React from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import ButtonLink from '@/components/ui/ButtonLink';
import { useTranslation } from 'react-i18next';
import SectionWithStars from '@src/components/layout/SectionWithStars';

const fadeInUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const OurPhilosophyMobile: React.FC = () => {
  const { t } = useTranslation();
  const stepKeys = ['clarity', 'draft', 'protect'] as const;

  return (
    <>
      <SEO title={t('message.title')} description={t('message.intro')} />
      <SectionWithStars className="hero-header-gap px-6 py-12 bg-background-light dark:bg-background-dark overflow-hidden" settings={{ density: 0.44 }}>
        <div className="relative z-10 space-y-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-slate-900 dark:text-primary-light text-[10px] font-black uppercase tracking-[0.3em]">
              {t('message.badge')}
            </span>
            <h1 className="mt-4 text-3xl font-black text-slate-900 dark:text-white leading-tight uppercase tracking-tight">
              {t('message.title')}
            </h1>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{t('message.intro')}</p>
          </motion.div>

          <div className="space-y-4">
            {stepKeys.map((key) => (
              <motion.div 
                key={key} 
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 p-5 shadow-sm"
              >
                <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-900 dark:text-primary-light">
                  {t(`message.pillars.${key}.title`)}
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 font-medium">{t(`message.pillars.${key}.description`)}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="rounded-3xl bg-primary text-white p-6 text-center space-y-4 shadow-xl"
          >
            <h2 className="text-xl font-black uppercase tracking-tight">{t('message.cta.title')}</h2>
            <p className="text-sm text-white/90 font-medium">{t('message.cta.description')}</p>
            <ButtonLink
              href="/contact"
              tone="light"
              className="inline-flex items-center justify-center gap-2 rounded-xl uppercase tracking-[0.3em] text-xs px-5 py-3 shadow-lg focus:ring-2 focus:ring-secondary/40 focus:ring-offset-2 focus:ring-offset-primary"
            >
              {t('message.cta.button')}
            </ButtonLink>
          </motion.div>
        </div>
      </SectionWithStars>
    </>
  );
};

export default OurPhilosophyMobile;
