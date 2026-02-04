import React from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import ButtonLink from '@/components/ui/ButtonLink';
import { useTranslation } from 'react-i18next';
import SectionWithStars from '@src/components/layout/SectionWithStars';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

const OurPhilosophyDesktop: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO title={t('message.title')} description={t('message.intro')} />
      <SectionWithStars className="py-20 px-10 bg-background-light dark:bg-background-dark" settings={{ density: 0.47 }}>
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-slate-900 dark:text-primary-light text-xs font-black uppercase tracking-widest mb-4">
              {t('message.badge')}
            </div>
            <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-8 leading-tight uppercase tracking-tight">
              {t('message.title')}
            </h1>

            <p className="text-xl font-medium text-slate-800 dark:text-slate-200 mb-12 leading-relaxed">
              {t('message.intro')}
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {['clarity', 'draft', 'protect'].map((key) => (
              <motion.article 
                key={key} 
                variants={fadeInUp}
                className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-3">
                  {t(`message.pillars.${key}.title`)}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {t(`message.pillars.${key}.description`)}
                </p>
              </motion.article>
            ))}
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{t('message.cta.title')}</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{t('message.cta.description')}</p>
            <ButtonLink
              href="/contact"
              tone="dark"
              className="mt-6 inline-flex items-center justify-center h-12 px-8 rounded-lg uppercase tracking-widest text-sm shadow-lg focus:ring-2 focus:ring-secondary/40 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark font-black"
            >
              {t('message.cta.button')}
            </ButtonLink>
          </motion.div>
        </div>
      </SectionWithStars>
    </>
  );
};

export default OurPhilosophyDesktop;
