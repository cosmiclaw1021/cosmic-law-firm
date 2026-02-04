import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Link from '@/components/ui/Link';
import LanguageToggle from '@/components/LanguageToggle';
import SectionWithStars from '@src/components/layout/SectionWithStars';
import { useNavbarLogic } from '../Shared/navbar.hooks';
import { useNavbarConstants } from '../Shared/navbar.constants';
import { SITE } from '@/lib/site';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '@src/components/Icon';

const NavbarDesktop: React.FC = () => {
  const { t } = useTranslation();
  const { navLinkClass, isActive } = useNavbarLogic();
  const { practiceAreaLinks, aboutLinks, lng } = useNavbarConstants();

  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setIsAboutOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsServicesOpen(false);
        setIsAboutOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <SectionWithStars
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-primary/95 backdrop-blur-md transition-colors duration-300 hidden lg:block text-white"
      aria-label={t('accessibility.aria.desktopNavSection')}
      overflow="visible"
      settings={{ density: 0.5, scrollRange: 520 }}
    >
      <header className="relative z-20">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            <Link to={`/${lng}/`} className="flex items-center gap-3 group shrink-0 focus:ring-offset-4">
              <div className="w-12 h-12 rounded-2xl border border-white/15 bg-white/10 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                <Image
                  src="/Cosmic_Logos-02.png"
                  alt={`${SITE.name} logo`}
                  width={48}
                  height={48}
                  sizes="48px"
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tighter leading-none uppercase text-white">
                  <span className="text-secondary">{SITE.name.split(' ')[0]}</span>{' '}
                  <span>{SITE.name.split(' ').slice(1).join(' ')}</span>
                </span>
                <span className="text-[10px] text-white/90 font-bold uppercase tracking-[0.12em] mt-1 leading-none">
                  {SITE.nameSub}
                </span>
              </div>
            </Link>

            <nav className="flex items-center gap-2" aria-label={t('accessibility.aria.mainNavigation')}>
              <Link to={`/${lng}/`} className={navLinkClass(`/${lng}/`)}>
                {t('nav.home')}
              </Link>

              <div className="relative" ref={servicesRef}>
                <button
                  onClick={() => {
                    setIsServicesOpen(!isServicesOpen);
                    setIsAboutOpen(false);
                  }}
                  aria-haspopup="true"
                  aria-expanded={isServicesOpen}
                  className={`flex items-center gap-1 text-sm font-bold tracking-tight transition-all duration-200 px-3 py-1.5 rounded-lg ${
                    isServicesOpen || isActive(`/${lng}/services`)
                      ? 'text-white bg-white/15'
                      : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`}
                >
                {t('nav.practiceAreas')}
                <Icon
                  name="expand_more"
                  className={`size-[18px] transition-transform duration-300 ${isServicesOpen ? 'rotate-180 text-secondary' : ''}`}
                />
              </button>

                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute top-full left-0 mt-3 w-[520px] bg-background-light border border-secondary/40 rounded-2xl shadow-2xl p-4 z-50 text-slate-900"
                    >
                      <div className="grid grid-cols-2 gap-2">
                      {practiceAreaLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-secondary/35 transition-colors group"
                          onClick={() => setIsServicesOpen(false)}
                        >
                          <Icon name="chevron_right" className="text-primary size-[18px] mt-0.5" />
                          <span className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">
                            {link.name}
                          </span>
                        </Link>
                      ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-secondary/40">
                      <Link
                        to={`/${lng}/services`}
                        className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] hover:underline"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        {t('nav.viewAllServices')}
                        <Icon name="east" className="size-4" />
                      </Link>
                    </div>
                  </motion.div>
                )}
                </AnimatePresence>
              </div>

              <div className="relative" ref={aboutRef}>
                <button
                  onClick={() => {
                    setIsAboutOpen(!isAboutOpen);
                    setIsServicesOpen(false);
                  }}
                  aria-haspopup="true"
                  aria-expanded={isAboutOpen}
                  className={`flex items-center gap-1 text-sm font-bold tracking-tight transition-all duration-200 px-3 py-1.5 rounded-lg ${
                    isAboutOpen || isActive(`/${lng}/about`) || isActive(`/${lng}/message`)
                      ? 'text-white bg-white/15'
                      : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`}
                >
                {t('nav.about')}
                <Icon
                  name="expand_more"
                  className={`size-[18px] transition-transform duration-300 ${isAboutOpen ? 'rotate-180 text-secondary' : ''}`}
                />
              </button>

                <AnimatePresence>
                  {isAboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute top-full left-0 mt-3 w-64 bg-background-light border border-secondary/40 rounded-2xl shadow-2xl p-2 z-50 text-slate-900"
                    >
                    {aboutLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/35 transition-colors"
                        onClick={() => setIsAboutOpen(false)}
                      >
                        <Icon name="chevron_right" className="text-primary size-[18px]" />
                        <span className="text-sm font-bold text-slate-900">{link.name}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
                </AnimatePresence>
              </div>
            </nav>

            <div className="flex items-center gap-4 shrink-0">
              <LanguageToggle />
              <Link
                to={`/${lng}/contact`}
            className="flex items-center justify-center h-11 px-6 rounded-xl bg-secondary hover:bg-secondary/90 text-primary text-sm font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 focus:ring-2 focus:ring-secondary/40 focus:ring-offset-2 focus:ring-offset-primary"
            >
              <Icon name="mail" className="mr-2 size-5" />
              <span>{t('nav.contact')}</span>
            </Link>
          </div>
        </div>
      </div>
      </header>
    </SectionWithStars>
  );
};

export default NavbarDesktop;
