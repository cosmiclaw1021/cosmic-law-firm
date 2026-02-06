import React from 'react';
import { motion } from 'framer-motion';
import ButtonLink from '@/components/ui/ButtonLink';
import Link from '@/components/ui/Link';
import SEO from '@/components/SEO';
import { useTranslation } from 'react-i18next';
import { teamMembers } from '../team.constants';
import Image from 'next/image';
import Icon from '@src/components/Icon';
import SectionWithStars from '@src/components/layout/SectionWithStars';

const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.05 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, amount: 0.05 },
};

const TeamDesktop: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO title={t('team.hero.title')} description={t('team.hero.description')} />

      <SectionWithStars className="w-full bg-background-light dark:bg-background-dark overflow-hidden" settings={{ density: 0.47 }}>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 py-10 md:px-10 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5 max-w-3xl"
          >
            <div className="md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-8">
              <div className="space-y-3 md:space-y-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-slate-900 dark:text-primary-light text-[11px] font-black uppercase tracking-[0.3em] w-fit">
                  {t('team.hero.badge')}
                </span>
                <h1 className="text-5xl font-black text-slate-900 dark:text-white leading-tight uppercase tracking-tight">
                  {t('team.hero.title')}
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {t('team.hero.description')}
                </p>
              </div>
              <ButtonLink
                href="/contact"
                tone="dark"
                className="self-start w-fit inline-flex items-center gap-2 rounded-xl uppercase tracking-widest text-xs px-6 py-3 shadow-lg focus:ring-2 focus:ring-secondary/40 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark font-black"
              >
                {t('team.hero.cta')}
                <Icon name="mail" className="size-4" />
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </SectionWithStars>

      <SectionWithStars className="w-full bg-background-light dark:bg-background-dark py-12" settings={{ density: 0.5 }}>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.05 }}
          className="relative z-10 max-w-[960px] mx-auto px-4 space-y-4"
        >
          {teamMembers.map((member) => (
            <motion.div key={member.id} variants={fadeInUp}>
              <Link
                href={`/about/team/${member.slug}`}
                className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label={t('team.links.profileAria', { name: member.name })}
              >
                <article className="flex flex-col gap-4 rounded-[28px] border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-4 sm:p-5 shadow-sm transition-shadow hover:shadow-xl sm:flex-row sm:items-center sm:gap-5">
                  <div className="flex-1 min-w-0 space-y-2">
                    <p className="text-[0.6rem] uppercase tracking-[0.4em] text-slate-400 dark:text-slate-300">
                      {t(member.locationKey)}
                    </p>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{member.name}</h3>
                    <p className="text-sm font-black text-slate-900 dark:text-primary-light uppercase tracking-[0.3em]">
                      {t(member.titleKey)}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      {t(member.specialtyKey)}
                    </p>
                  </div>
                  <div className="relative shrink-0 w-[135px] h-[180px] rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                    <Image
                      src={member.imageSrc}
                      alt={t(member.imageAltKey)}
                      fill
                      sizes="(max-width: 768px) 130px, 170px"
                      className="object-cover"
                    />
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </SectionWithStars>

      <SectionWithStars className="w-full bg-primary text-white py-12" settings={{ density: 0.47 }}>
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.05 }}
          className="relative z-10 max-w-[960px] mx-auto px-6 text-center"
        >
          <h2 className="text-3xl font-black tracking-tight uppercase tracking-tight">{t('team.cta.title')}</h2>
          <p className="mt-3 text-lg text-white/90 leading-relaxed font-medium">{t('team.cta.description')}</p>
          <ButtonLink
            href="/contact"
            tone="light"
            className="mt-5 inline-flex items-center justify-center rounded-xl uppercase tracking-[0.3em] text-xs px-10 py-3 shadow-xl focus:ring-2 focus:ring-secondary/40 focus:ring-offset-2 focus:ring-offset-primary"
          >
            {t('team.cta.button')}
          </ButtonLink>
        </motion.div>
      </SectionWithStars>
    </>
  );
};

export default TeamDesktop;
