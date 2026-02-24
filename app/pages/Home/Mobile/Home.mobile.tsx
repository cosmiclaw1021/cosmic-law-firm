import React from 'react';
import Link from '@/components/ui/Link';
import SEO from '@/components/SEO';
import { SITE } from '@/lib/site';
import { practiceAreas } from '@/lib/practice-areas';
import { useTranslation } from 'react-i18next';
import ButtonLink from '@/components/ui/ButtonLink';
import SectionWithStars from '@src/components/layout/SectionWithStars';
import Icon from '@src/components/Icon';

const HERO_VIDEO = '/media/hero-clip.mp4';
const HERO_POSTER = '/NanoBanana/Background_screens_2.png';

const HomeMobile: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isKo = i18n.language?.startsWith('ko');

  return (
    <>
      <SEO
        title={t('seo.home.title', { defaultValue: `${SITE.name} | ${t('common.companyNameSub')}` })}
        description={t('seo.home.description')}
      />

      <SectionWithStars
        className="hero-header-gap hero-header-gap-tight relative bg-transparent text-black min-h-0 flex flex-col justify-start"
        aria-label={t('accessibility.aria.heroIntro')}
        settings={{ density: 0.5, scrollRange: 720 }}
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
          <div className="absolute left-[10%] top-4 h-[180px] w-[180px] rounded-full bg-primary/25 blur-[90px]" aria-hidden="true" />
          <div className="absolute right-4 bottom-[-40px] h-[160px] w-[160px] rounded-full bg-white/5 blur-[80px]" aria-hidden="true" />
        </div>

        <div className="relative z-20 flex h-[460px] items-center justify-center px-6 pb-4 pt-12 max-w-[1280px] mx-auto sm:px-8 sm:pt-16 md:pt-20">
          {/* Hero copy and video removed per request; this spacing keeps the gradient-only hero height. */}
        </div>
      </SectionWithStars>

      <SectionWithStars className="py-12 bg-background-light dark:bg-background-dark" aria-labelledby="services-heading" settings={{ density: 0.4 }}>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6">
          <div className="max-w-2xl">
            <span className="text-[0.65rem] font-black tracking-[0.45em] uppercase text-slate-500 dark:text-slate-400">
              {t('home.hero.badge')}
            </span>
            <h2 id="services-heading" className="mt-2 text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
              {t('home.services.title')}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t('home.services.description')}
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {practiceAreas.slice(0, 6).map((area) => (
              <Link
                key={area.slug}
                to={`/services/${area.slug}`}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark"
              >
                <article className="flex flex-col gap-3 rounded-[28px] border border-secondary/40 dark:border-white/10 bg-white/70 dark:bg-white/5 shadow">
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div className="size-12 rounded-xl bg-secondary/60 shadow-lg shadow-black/5 flex items-center justify-center text-primary">
                      <Icon name={area.icon} className="size-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-slate-900 dark:text-white text-lg font-black leading-tight tracking-tight">
                        {isKo ? area.shortTitleKo : area.shortTitle}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-[0.75rem] leading-relaxed font-medium mt-1">
                        {isKo ? area.focusKo : area.focus}
                      </p>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="mt-6">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-primary dark:text-primary-light font-black uppercase tracking-widest text-[10px] hover:underline"
            >
              {t('nav.viewAllPracticeAreas')}
              <Icon name="east" className="size-3" />
            </Link>
          </div>
        </div>
      </SectionWithStars>

      <SectionWithStars
        className="py-12 bg-background-light dark:bg-background-dark"
        aria-label={t('accessibility.aria.homeCtaSection')}
        settings={{ density: 0.45, scrollRange: 420 }}
      >
        <div className="relative z-20 max-w-[1280px] mx-auto px-6">
          <div className="rounded-2xl bg-secondary/35 dark:bg-white/5 border border-secondary/40 dark:border-white/10 p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                {t('home.cta.title')}
              </h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('home.cta.description')}
              </p>
            </div>
            <ButtonLink
              href="/contact"
              tone="dark"
              className="h-12 px-8 rounded-xl uppercase tracking-widest text-sm focus:ring-2 focus:ring-secondary/40 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
            >
              {t('home.cta.button')}
            </ButtonLink>
          </div>
        </div>
        </SectionWithStars>
    </>
  );
};

export default HomeMobile;
