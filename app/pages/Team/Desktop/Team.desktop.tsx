import React from 'react';
import ButtonLink from '@/components/ui/ButtonLink';
import Link from '@/components/ui/Link';
import SEO from '@/components/SEO';
import { useTranslation } from 'react-i18next';
import { teamMembers } from '../team.constants';
import Image from 'next/image';
import Icon from '@src/components/Icon';
import SectionWithStars from '@src/components/layout/SectionWithStars';

const TeamDesktop: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO title={t('team.hero.title')} description={t('team.hero.description')} />

      <SectionWithStars className="w-full bg-background-light dark:bg-background-dark overflow-hidden" settings={{ density: 0.47 }}>
        <div className="relative z-10 max-w-[1280px] mx-auto px-10 py-20">
          <div className="flex flex-col gap-6 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-slate-900 dark:text-primary-light text-[11px] font-black uppercase tracking-[0.3em] w-fit">
              {t('team.hero.badge')}
            </span>
            <h1 className="text-5xl font-black text-slate-900 dark:text-white leading-tight uppercase tracking-tight">
              {t('team.hero.title')}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {t('team.hero.description')}
            </p>
            <ButtonLink
              href="/contact"
              tone="dark"
              className="w-fit inline-flex items-center gap-2 rounded-xl uppercase tracking-widest text-xs px-6 py-3 shadow-lg focus:ring-2 focus:ring-secondary/40 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark font-black"
            >
              {t('team.hero.cta')}
              <Icon name="mail" className="size-4" />
            </ButtonLink>
          </div>
        </div>
      </SectionWithStars>

      <SectionWithStars className="w-full bg-background-light dark:bg-background-dark py-20" settings={{ density: 0.5 }}>
        <div className="relative z-10 max-w-[960px] mx-auto px-6 space-y-6">
          {teamMembers.map((member) => (
            <Link
              key={member.id}
              href={`/about/team/${member.slug}`}
              className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label={t('team.links.profileAria', { name: member.name })}
            >
              <article className="flex flex-row flex-wrap items-start gap-6 rounded-[28px] border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-6 sm:p-8 shadow-sm transition-shadow hover:shadow-xl">
                <div className="flex-1 min-w-0 space-y-3">
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
                <div className="relative shrink-0 w-[150px] h-[260px] rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
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
          ))}
        </div>
      </SectionWithStars>

      <SectionWithStars className="w-full bg-primary text-white py-16" settings={{ density: 0.47 }}>
        <div className="relative z-10 max-w-[960px] mx-auto px-10 text-center">
          <h2 className="text-3xl font-black tracking-tight uppercase tracking-tight">{t('team.cta.title')}</h2>
          <p className="mt-4 text-lg text-white/90 leading-relaxed font-medium">{t('team.cta.description')}</p>
          <ButtonLink
            href="/contact"
            tone="light"
            className="mt-6 inline-flex items-center justify-center rounded-xl uppercase tracking-[0.3em] text-xs px-10 py-3 shadow-xl focus:ring-2 focus:ring-secondary/40 focus:ring-offset-2 focus:ring-offset-primary"
          >
            {t('team.cta.button')}
          </ButtonLink>
        </div>
      </SectionWithStars>
    </>
  );
};

export default TeamDesktop;
