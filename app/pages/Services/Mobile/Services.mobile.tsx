import React from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import ButtonLink from '@/components/ui/ButtonLink';
import Link from '@/components/ui/Link';
import { practiceAreas } from '@/lib/practice-areas';
import { SITE } from '@/lib/site';
import Icon from '@src/components/Icon';
import SectionWithStars from '@src/components/layout/SectionWithStars';

const ServicesMobile: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lng = i18n.language || 'en';
  const isKo = i18n.language?.startsWith('ko');
  const processSteps = ['step1', 'step2', 'step3'] as const;

  return (
    <>
      <SectionWithStars className="hero-header-gap w-full bg-background-light dark:bg-background-dark flex justify-center overflow-hidden" settings={{ density: 0.44 }}>
        <div className="relative z-10 w-full px-0 py-0">
          <div
            className="flex min-h-[260px] sm:min-h-[300px] flex-col gap-3 items-center justify-start p-4 pt-6 pb-6 sm:py-8 shadow-sm relative overflow-hidden bg-slate-900"
            role="img"
            aria-label={t('accessibility.alt.contractNotesDesk')}
          >
            <Image
              src="/NanoBanana/Background_screens_3.png"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 to-black/80" />
            <div className="flex flex-col gap-3 text-center z-10">
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-[10px] font-black uppercase tracking-[0.3em] w-fit mx-auto">
              <Icon name="gavel" className="size-3.5" />
              {t('servicesPage.hero.badge')}
            </div>
            <h1 className="text-white text-3xl font-black leading-tight tracking-tight drop-shadow-md uppercase">
              {t('servicesPage.hero.title')}
            </h1>
            <p className="text-slate-100 text-sm font-medium leading-relaxed mt-1 drop-shadow-sm">
                {t('servicesPage.hero.subtitle')}
            </p>
            </div>
              <ButtonLink
                href="#practice-areas"
                tone="light"
                className="z-10 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-secondary hover:bg-secondary/90 transition-colors text-slate-900 text-base font-bold shadow-lg uppercase tracking-widest focus:ring-2 focus:ring-secondary/40 focus:ring-offset-2 focus:ring-offset-black"
              >
                <span className="truncate">{t('servicesPage.hero.cta')}</span>
              </ButtonLink>
          </div>
        </div>
      </SectionWithStars>

      <SectionWithStars id="practice-areas" className="w-full flex justify-center py-10 overflow-hidden" settings={{ density: 0.5 }}>
        <div className="relative z-10 w-full px-4">
          <div>
            <h2 className="text-[#0d141b] dark:text-white text-2xl font-black leading-tight uppercase">
              {t('servicesPage.specialties.title')}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-medium mt-3">
              {t('servicesPage.specialties.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-8">
            {practiceAreas.map((area) => (
              <div
                key={area.slug}
                className="flex flex-col gap-4 rounded-[24px] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 active:scale-[0.98] transition-transform"
              >
                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-xl bg-primary/10 shadow-lg shadow-primary/5 flex items-center justify-center text-primary dark:text-primary-light">
                    <Icon name={area.icon} className="size-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[#0d141b] dark:text-white text-lg font-black leading-tight tracking-tight">
                      {isKo ? area.shortTitleKo : area.shortTitle}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-medium mt-1">
                      {isKo ? area.focusKo : area.focus}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/${lng}/services/${area.slug}`}
                  className="inline-flex items-center gap-2 text-primary dark:text-primary-light font-black uppercase tracking-widest text-[10px] active:underline"
                >
                  {t('nav.viewServices')}
                  <Icon name="arrow_forward" className="size-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </SectionWithStars>

      <SectionWithStars className="w-full flex justify-center py-12 bg-slate-50 dark:bg-background-dark" settings={{ density: 0.41 }}>
        <div className="relative z-10 w-full px-4 flex flex-col">
          <h2 className="text-[#0d141b] dark:text-white text-2xl font-bold leading-tight tracking-tight mb-10 text-center">
            {t('servicesPage.process.title')}
          </h2>
          <div className="grid grid-cols-1 gap-8">
            {processSteps.map((stepKey, idx) => (
              <div
                key={stepKey}
                className="flex flex-col items-center text-center gap-4"
              >
                <div className="size-10 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold shadow-lg">
                  {idx + 1}
                </div>
                <h3 className="text-base font-bold text-[#0d141b] dark:text-white">
                  {t(`servicesPage.process.${stepKey}.title`)}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  {t(`servicesPage.process.${stepKey}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionWithStars>

      <SectionWithStars className="w-full flex justify-center py-12 bg-background-light dark:bg-background-dark border-t border-secondary/40 dark:border-white/10" settings={{ density: 0.47 }}>
        <div className="relative z-10 w-full px-4">
          <div className="bg-secondary/35 dark:bg-white/5 rounded-2xl p-6 flex flex-col items-center justify-between gap-8 border border-secondary/40 dark:border-white/10">
            <div className="flex flex-col gap-2 text-center">
              <h2 className="text-xl font-bold text-[#0d141b] dark:text-white">{t('servicesPage.cta.title')}</h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                {t('servicesPage.cta.description')}
              </p>
            </div>
            <div className="flex flex-col gap-4 items-center w-full">
              <div className="flex items-center gap-2 text-base font-semibold text-[#0d141b] dark:text-white">
                <Icon name="call" className="text-primary dark:text-primary-light size-5" />
                {SITE.phoneDisplay}
              </div>
              <Link
                to={`/${lng}/contact`}
                className="flex w-full min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary hover:bg-primary/80 transition-colors text-white text-base font-bold shadow-md focus:ring-2 focus:ring-secondary/40 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
              >
                {t('servicesPage.cta.button')}
              </Link>
            </div>
          </div>
        </div>
      </SectionWithStars>
    </>
  );
};

export default ServicesMobile;
