'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ButtonLink from '@/components/ui/ButtonLink';
import Link from '@/components/ui/Link';
import { TeamMember } from './team.constants';
import Icon from '@src/components/Icon';
import SectionWithStars from '@src/components/layout/SectionWithStars';
import { useViewport } from '../hooks/useViewport';

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

type TeamMemberDetailProps = {
  member: TeamMember;
  lng?: string;
};

const TeamMemberDetail: React.FC<TeamMemberDetailProps> = ({ member, lng }) => {
  const { t, i18n } = useTranslation();
  const { isMobile } = useViewport();

  const currentFadeInUp = isMobile ? {
    initial: { opacity: 1, y: 0 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0 },
  } : fadeInUp;

  const currentStagger = isMobile ? {
    initial: {},
    whileInView: { transition: { staggerChildren: 0 } },
    viewport: { once: true },
  } : staggerContainer;

  React.useEffect(() => {
    if (lng && i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]);

  const detailKey = member.detailKey;
  
  // Use the correct keys from team.details (which we just moved)
  const biography = (t(`${detailKey}.biography`, {
    returnObjects: true,
    defaultValue: [],
  }) as string[]) ?? [];
  const memberships = (t(`${detailKey}.memberships`, {
    returnObjects: true,
    defaultValue: [],
  }) as string[]) ?? [];
  const practiceAreas = (t(`${detailKey}.practiceAreas`, {
    returnObjects: true,
    defaultValue: [],
  }) as string[]) ?? [];
  const creative = t(`${detailKey}.creative`, { defaultValue: '' });
  const education = (t(member.educationKey, {
    returnObjects: true,
    defaultValue: [],
  }) as string[]) ?? [];
  const tagline = t(`${detailKey}.tagline`, { defaultValue: '' });

  return (
    <SectionWithStars className="w-full bg-background-light dark:bg-background-dark min-h-viewport" settings={{ density: 0.5 }}>
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-6 pb-12 sm:px-6 lg:px-8 lg:pt-10 lg:pb-20">
        
        {/* Header - Always on top */}
        <motion.div 
          variants={currentFadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="mb-8 space-y-2 lg:mb-12"
        >
          {tagline && (
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400 font-semibold">
              {tagline}
            </p>
          )}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            {member.name}
          </h1>
          <p className="text-sm sm:text-base font-black uppercase tracking-[0.3em] text-primary dark:text-primary-light">
            {t(member.titleKey)}
          </p>
        </motion.div>

        {/* Layout Container */}
        <div className="relative">
          <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
            {/* Main Content Area */}
            <motion.div 
              variants={currentFadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="flex-1"
            >
              {/* Mobile Profile Image - Floated for wrap-around effect */}
              <div className="lg:hidden float-right ml-6 mb-4 w-[45%] max-w-[200px] aspect-[3/4] relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 z-10">
                <Image
                  src={member.imageSrc}
                  alt={t(member.imageAltKey)}
                  fill
                  sizes="200px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="space-y-8">
                {/* Short Description */}
                <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-200 font-medium">
                  {t(member.descriptionKey)}
                </p>

                {/* Biography Paragraphs */}
                <div className="space-y-6">
                  {biography.map((paragraph, index) => (
                    <p
                      key={`${member.id}-bio-${index}`}
                      className="text-base leading-relaxed text-slate-600 dark:text-slate-300"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-6 pt-8 clear-both lg:clear-none">
                  <ButtonLink
                    href="/contact"
                    tone="dark"
                    size="md"
                    className="uppercase tracking-[0.2em] text-xs px-8"
                  >
                    {t('team.hero.cta')}
                  </ButtonLink>
                  <Link
                    href="/about/team"
                    className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors"
                  >
                    <Icon name="arrow_back" className="size-4 transition-transform group-hover:-translate-x-1" />
                    {t('team.links.backToTeam')}
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Sidebar / Desktop Image & Details */}
            <div className="w-full lg:w-80 shrink-0 space-y-8">
              {/* Desktop Image */}
              <motion.div 
                variants={currentFadeInUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="hidden lg:block relative aspect-[3/4] w-full overflow-hidden rounded-[32px] shadow-2xl border border-slate-200 dark:border-slate-800"
              >
                <Image
                  src={member.imageSrc}
                  alt={t(member.imageAltKey)}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </motion.div>

              {/* Structured Info Cards */}
              <motion.div 
                variants={currentStagger}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1"
              >
                {/* Education */}
                <motion.div variants={currentFadeInUp} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 p-8 backdrop-blur-sm">
                  <p className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-4">
                    {t('team.detail.educationHeading')}
                  </p>
                  <ul className="space-y-3 text-sm leading-snug text-slate-700 dark:text-slate-200">
                    {education.map((item, idx) => (
                      <li key={`${member.id}-edu-${idx}`} className="flex gap-2">
                        <span className="text-primary dark:text-primary-light mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Practice Areas */}
                {practiceAreas.length > 0 && (
                  <motion.div variants={currentFadeInUp} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 p-8 backdrop-blur-sm">
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-4">
                      {t('team.detail.expertiseHeading')}
                    </p>
                    <ul className="space-y-3 text-sm leading-snug text-slate-700 dark:text-slate-200">
                      {practiceAreas.map((area, idx) => (
                        <li key={`${member.id}-practice-${idx}`} className="flex gap-2">
                          <span className="text-primary dark:text-primary-light mt-1">•</span>
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Memberships */}
                {memberships.length > 0 && (
                  <motion.div variants={currentFadeInUp} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 p-8 backdrop-blur-sm">
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-4">
                      {t('team.detail.affiliationsHeading')}
                    </p>
                    <ul className="space-y-3 text-sm leading-snug text-slate-700 dark:text-slate-200">
                      {memberships.map((item, idx) => (
                        <li key={`${member.id}-membership-${idx}`} className="flex gap-2">
                          <span className="text-primary dark:text-primary-light mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Creative Focus */}
                {creative && (
                  <motion.div variants={currentFadeInUp} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 p-8 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-4">
                      {t('team.detail.creativeFocusHeading')}
                    </p>
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200 italic font-medium">
                      "{creative}"
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </SectionWithStars>
  );
};

export default TeamMemberDetail;
