'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Link from './ui/Link';
import EmailLink from './EmailLink';
import ButtonLink from './ui/ButtonLink';
import SectionWithStars from '@src/components/layout/SectionWithStars';
import ThemeToggle from './ui/ThemeToggle';
import { SITE } from '../lib/site';
import { practiceAreas } from '../lib/practice-areas';
import Icon, { type IconName } from '@src/components/Icon';
import { FEATURES } from '@src/config/features';
import { useViewport } from '../hooks/useViewport';
import { useCookieConsent } from '@src/context/cookieConsent';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isMobile } = useViewport();
  const isKo = i18n.language?.startsWith('ko');
  const { openBanner } = useCookieConsent();
  
  const currentFadeInUp = isMobile ? {
    initial: { opacity: 1, y: 0 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0 },
  } : fadeInUp;

  const quickLinks = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.servicesLabel'), href: '/services' },
    { label: t('nav.insights'), href: '/insights' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.ourApproach'), href: '/message' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  const contactActions = [
    {
      href: `tel:${SITE.phoneTel}`,
      label: SITE.phoneDisplay,
      icon: 'call',
      className: 'text-base font-black',
    },
    {
      href: `mailto:${SITE.email}`,
      label: SITE.email,
      icon: 'mail',
      className: 'text-sm font-bold',
    },
  ] satisfies ReadonlyArray<{ href: string; label: string; icon: IconName; className: string }>;

  return (
    <SectionWithStars
      className="bg-primary text-white border-t border-white/10 pt-16 pb-40 w-full transition-colors duration-300 pb-safe"
      aria-label={t('accessibility.aria.siteFooter')}
      settings={{ density: 0.55, scrollRange: 520 }}
    >
      <motion.footer 
        variants={currentFadeInUp}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="relative z-20 w-full mb-12" >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-12 lg:gap-16">
            {/* Header Section: Logo and Taglines in a stacked layout */}
            <div className="flex flex-col items-start gap-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl border border-white/15 bg-white/10 flex items-center justify-center overflow-hidden shrink-0">
                  <Image
                    src="/Cosmic_Logos-02.png"
                    alt={t('accessibility.aria.logoAlt', { name: t('common.companyName') })}
                    width={56}
                    height={56}
                    sizes="56px"
                    className="aspect-square w-full h-full object-cover"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl font-black tracking-tight text-white uppercase leading-none text-left">
                    <span className="text-secondary">{t('common.companyNamePart1')}</span>{' '}
                    <span>{t('common.companyNamePart2')}</span>
                  </p>
                  <p className="text-[10px] font-bold text-white/90 uppercase tracking-[0.18em] mt-1.5 text-left">
                    {t('common.companyNameSub')}
                  </p>
                </div>
              </div>

              <div className="max-w-3xl">
                <p className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-white/90 leading-relaxed text-left">
                  {t('footer.tagline')}
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-white/10" />

            {/* Links and Contact Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-10">
              <nav aria-label={t('accessibility.aria.footerQuickLinks')}>
                <h4 className="text-sm font-bold uppercase tracking-widest text-secondary mb-6 text-center sm:text-left">
                  {t('footer.quickLinks')}
                </h4>
                <div className="grid gap-2.5">
                  {quickLinks.map((quickLink) => (
                    <ButtonLink
                      key={quickLink.label}
                      href={quickLink.href}
                      tone="light"
                      size="sm"
                      className="w-full justify-center sm:justify-start gap-3 px-4 py-2.5 text-xs font-semibold text-center sm:text-left"
                    >
                      {quickLink.label}
                    </ButtonLink>
                  ))}
                </div>
              </nav>

              <nav aria-label={t('accessibility.aria.footerPracticeAreas')}>
                <h4 className="text-sm font-bold uppercase tracking-widest text-secondary mb-6 text-center sm:text-left">
                  {t('nav.practiceAreas')}
                </h4>
                <div className="grid gap-2.5">
                  {practiceAreas.map((area) => (
                    <ButtonLink
                      key={area.slug}
                      href={`/services/${area.slug}`}
                      tone="light"
                      size="sm"
                      className="w-full justify-center sm:justify-start gap-3 px-4 py-2.5 text-xs font-semibold text-center sm:text-left"
                    >
                      {isKo ? area.shortTitleKo : area.shortTitle}
                    </ButtonLink>
                  ))}
                </div>
              </nav>

              <div className="space-y-6">
                <h4 className="text-sm font-bold uppercase tracking-widest text-secondary mb-6 text-center sm:text-left">
                  {t('footer.contactInfo')}
                </h4>
                <div className="grid gap-3">
                  {contactActions.map((action) => {
                    if (action.href.startsWith('mailto:')) {
                      return (
                        <EmailLink
                          key={action.label}
                          email={SITE.email}
                          className={`w-full inline-flex items-center justify-center sm:justify-start gap-3 px-4 py-3 rounded-lg bg-secondary text-primary shadow-sm border border-secondary/60 transition-all hover:bg-secondary/80 text-center sm:text-left ${action.className}`}
                        >
                          <Icon name={action.icon} className="text-primary size-5 flex-shrink-0" />
                          <span className="whitespace-normal break-all">{action.label}</span>
                        </EmailLink>
                      );
                    }
                    return (
                      <ButtonLink
                        key={action.label}
                        href={action.href}
                        tone="light"
                        size="md"
                        className={`w-full justify-center sm:justify-start gap-3 px-4 py-3 text-center sm:text-left ${action.className}`}
                      >
                        <Icon name={action.icon} className="text-primary size-5 flex-shrink-0" />
                        <span className="whitespace-normal break-all">{action.label}</span>
                      </ButtonLink>
                    );
                  })}
                  {FEATURES.googleMaps ? (
                    <ButtonLink
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.addressQuery)}`}
                      tone="light"
                      size="md"
                      className="w-full justify-center sm:justify-start gap-3 px-4 py-3 text-center sm:text-left text-[11px] font-bold uppercase tracking-tight"
                    >
                      <Icon name="location_on" className="text-primary size-5 flex-shrink-0" />
                      <span className="whitespace-normal">{SITE.addressShort}</span>
                    </ButtonLink>
                  ) : (
                    <div className="w-full inline-flex items-center justify-center sm:justify-start gap-3 px-4 py-3 rounded-lg bg-secondary text-primary shadow-sm border border-secondary/60 text-[11px] font-bold uppercase tracking-tight">
                      <Icon name="location_on" className="text-primary size-5 flex-shrink-0" />
                      <span className="whitespace-normal">{SITE.addressShort}</span>
                    </div>
                  )}
                  <ButtonLink
                    href="/contact"
                    tone="dark"
                    size="md"
                    className="w-full justify-center sm:justify-start gap-3 px-4 py-3 uppercase tracking-[0.2em] mt-2"
                  >
                    <Icon name="chat" className="size-[18px]" />
                    {t('nav.contact')}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col items-center gap-8 text-[11px] font-medium text-white/80 tracking-wider uppercase md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col items-center md:items-start space-y-6">
              <nav
                className="flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-4"
                aria-label={t('accessibility.aria.footerLegalNav')}
              >
                <Link to="/accessibility" className="text-white/90 hover:text-secondary">{t('footer.accessibility')}</Link>
                <Link to="/privacy" className="text-white/90 hover:text-secondary">{t('footer.privacyPolicy')}</Link>
                <Link to="/terms" className="text-white/90 hover:text-secondary">{t('footer.termsOfService')}</Link>
                <Link to="/cookie-policy" className="text-white/90 hover:text-secondary">{t('footer.cookiePolicy')}</Link>
                <button
                  type="button"
                  onClick={openBanner}
                  className="text-white/90 hover:text-secondary uppercase tracking-[0.3em] text-[11px] font-semibold focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  {t('footer.cookiePreferences')}
                </button>
             </nav>
              <div className="flex flex-col items-center md:items-start space-y-2">
                <p className="text-center md:text-left">
                  © 2026 {t('common.companyName')}. {t('footer.rights')}
                </p>
                <p className="text-center md:text-left text-[10px] opacity-60 normal-case tracking-normal">
                  web services by{' '}
                  <Link 
                    href="https://studio.filmclusive.com" 
                    external 
                    className="hover:text-secondary underline underline-offset-4"
                  >
                    Filmclusive Studio
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <div className="overflow-hidden rounded-full">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </SectionWithStars>
  );
};

export default Footer;
