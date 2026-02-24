import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ButtonLink from '@/components/ui/ButtonLink';
import Link from '@/components/ui/Link';
import SectionWithStars from '@src/components/layout/SectionWithStars';
import SEO from '@/components/SEO';
import { SITE } from '@/lib/site';
import { practiceAreas } from '@/lib/practice-areas';
import { useTranslation } from 'react-i18next';
import Icon from '@src/components/Icon';

const fadeInUp = {
  initial: { opacity: 1, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const HERO_VIDEO = '/media/hero-clip.mp4';
const HERO_POSTER = '/NanoBanana/Background_screens_2.png';
const SERVICES_IMAGE = '/NanoBanana/Background_screens_3.png';

const HomeDesktop: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isKo = i18n.language?.startsWith('ko');

  return (
    <>
      <SEO
        title={t('seo.home.title', { defaultValue: `${SITE.name} | ${t('common.companyNameSub')}` })}
        description={t('seo.home.description')}
      />

      <SectionWithStars
        className="hero-header-gap hero-header-gap-tight relative overflow-hidden bg-transparent text-black"
        aria-label={t('accessibility.aria.heroIntro')}
        settings={{ density: 0.52, scrollRange: 920 }}
      >
        <div className="absolute inset-0 z-10">
          <video
            src={HERO_VIDEO}
            poster={HERO_POSTER}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            role="img"
            aria-label={t('accessibility.aria.homeHeroBackground')}
            className="absolute inset-0 h-full w-full object-cover"
          >
            {t('accessibility.aria.homeHeroBackground')}
          </video>
          <div className="absolute -left-32 top-8 h-[420px] w-[420px] rounded-full bg-primary/30 blur-[180px]" aria-hidden="true" />
          <div className="absolute right-0 bottom-0 h-[360px] w-[360px] translate-y-10 translate-x-1/4 rounded-full bg-white/5 blur-[160px]" aria-hidden="true" />
        </div>

        <div className="relative z-20 flex h-[520px] sm:h-[560px] items-center justify-center px-6 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
          {/* Hero copy removed; keep spacing for the gradient-only experience. */}
        </div>
      </SectionWithStars>

      <SectionWithStars className="py-16 bg-background-light dark:bg-background-dark" aria-labelledby="services-heading" settings={{ density: 0.4 }}>
        <div className="max-w-[1280px] mx-auto px-10">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] items-start"
          >
            <div className="relative z-10">
              <span className="text-xs font-black tracking-[0.4em] uppercase text-slate-500 dark:text-slate-400">
                {t('home.hero.badge')}
              </span>
              <h2 id="services-heading" className="mt-3 text-4xl font-black tracking-tight uppercase text-slate-900 dark:text-white">
                {t('home.services.title')}
              </h2>
              <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('home.services.description')}
              </p>

              <div className="mt-8 space-y-5">
                {practiceAreas.slice(0, 6).map((area) => (
                  <article key={area.slug} className="flex gap-4">
                    <div className="size-12 rounded-xl bg-secondary/60 shadow-lg shadow-black/5 flex items-center justify-center text-primary">
                      <Icon name={area.icon} className="size-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                        {isKo ? area.titleKo : area.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                        {isKo ? area.focusKo : area.focus}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-primary dark:text-primary-light font-black uppercase tracking-widest text-xs hover:underline"
                >
                  {t('nav.viewAllPracticeAreas')}
                  <Icon name="arrow_forward" className="size-4" />
                </Link>
              </div>
            </div>

            <div className="relative z-10 hidden w-full max-w-[360px] rounded-[32px] border border-secondary/40 bg-secondary/30 dark:border-white/10 dark:bg-white/5 shadow-lg overflow-hidden lg:block">
              <div className="relative h-full w-full">
                <Image
                  src={SERVICES_IMAGE}
                  alt={t('accessibility.alt.contractNotesDesk')}
                  width={360}
                  height={540}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWithStars>

      <SectionWithStars
        className="py-16 bg-background-light dark:bg-background-dark border-t border-secondary/40 dark:border-white/10"
        settings={{ density: 0.45, scrollRange: 480 }}
      >
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="relative z-20 max-w-[1280px] mx-auto px-10"
        >
          <div className="rounded-2xl bg-secondary/35 dark:bg-white/5 border border-secondary/40 dark:border-white/10 p-12 flex items-center justify-between gap-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">{t('home.cta.title')}</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('home.cta.description')}
              </p>
            </div>
            <Link
              to="/contact"
              className="flex shrink-0 items-center justify-center h-12 px-8 rounded-xl bg-primary hover:bg-primary/80 text-white font-bold transition-colors shadow-md focus:ring-2 focus:ring-secondary/40 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
            >
              {t('home.cta.button')}
            </Link>
          </div>
        </motion.div>
      </SectionWithStars>
    </>
  );
};

export default HomeDesktop;
