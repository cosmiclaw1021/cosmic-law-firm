'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Link from '@/components/ui/Link';
import ButtonLink from '@/components/ui/ButtonLink';
import LanguageToggle from '@/components/LanguageToggle';
import SectionWithStars from '@src/components/layout/SectionWithStars';
import EmailLink from '@/components/EmailLink';
import { useNavbarLogic } from '../Shared/navbar.hooks';
import { useNavbarConstants } from '../Shared/navbar.constants';
import { SITE } from '@/lib/site';
import { usePathname } from 'next/navigation';
import { useFocusTrap } from '@/lib/accessibility/useFocusManagement';
import Icon from '@src/components/Icon';
import type { SectionStarsSettings } from '@src/config/parallaxStars.config';
import { useIsIosSafari } from '@/hooks/useIsIosSafari';

const MOBILE_NAV_SECTION_SETTINGS: SectionStarsSettings = {
  enabledLayers: ["far"],
  density: 0.2,
  scrollRange: 0,
  staticOnly: true,
  opacityScale: 3,
};

const NavbarMobile: React.FC = () => {
  const { t } = useTranslation();
  const { isActive } = useNavbarLogic();
  const { practiceAreaLinks, aboutLinks, lng } = useNavbarConstants();
  const isIosSafari = useIsIosSafari();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMobileMenuOpen(false);
  const scrollRestoreRef = useRef<{ scrollY: number } | null>(null);

  const menuRef = useFocusTrap(isMobileMenuOpen, { autoFocus: false });
  const pathname = usePathname();

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    if (typeof window === 'undefined') return;

    const scrollY = window.scrollY || 0;
    scrollRestoreRef.current = { scrollY };

    const body = document.body;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';

    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;

      const restore = scrollRestoreRef.current;
      if (restore) {
        window.scrollTo(0, restore.scrollY);
      }
      scrollRestoreRef.current = null;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getMobileNavButtonClass = (path: string, size: 'lg' | 'sm' = 'lg') => {
    const isActivePath = isActive(path);
    const baseStyles =
      'w-full text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-primary';
    const sizeStyles =
      size === 'lg'
        ? 'text-lg font-black px-4 py-3 rounded-2xl'
        : 'text-sm font-bold px-3 py-2 rounded-xl';
    const activeStyles =
      size === 'lg'
        ? 'text-white bg-secondary/30 border border-secondary/40 shadow-[0_8px_20px_rgba(149,160,184,0.35)]'
        : 'text-white bg-secondary/25 border border-secondary/30';
    const inactiveStyles = 'text-white/90 bg-white/5 border border-white/10 hover:bg-white/15';

    return `${baseStyles} ${sizeStyles} ${isActivePath ? activeStyles : inactiveStyles}`;
  };

  const baseNavClass =
      'fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10 bg-primary/95 transition-colors duration-300 lg:hidden text-white pt-safe';
  const navContent = (
    <>
      <div className="relative z-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link to={`/${lng}/`} className="flex items-center gap-2 group shrink-0 focus:ring-offset-4">
              <div className="w-10 h-10 rounded-2xl border border-white/15 bg-white/10 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                <Image
                  src="/Cosmic_Logos-02.png"
                  alt={t('accessibility.aria.logoAlt', { name: t('common.companyName') })}
                  width={40}
                  height={40}
                  sizes="40px"
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-tight text-white leading-none uppercase">
                  <span className="text-secondary">{t('common.companyNamePart1')}</span>{' '}
                  <span>{t('common.companyNamePart2')}</span>
                </span>
                <span className="text-[8px] text-white/90 font-bold uppercase tracking-wider mt-0.5 leading-none">
                  {t('common.companyNameSub')}
                </span>
              </div>
            </Link>

            <div className="flex items-center">
              <button
                className="p-2 text-white/90 hover:text-white focus:ring-2 focus:ring-secondary/40 rounded-lg"
                onClick={toggleMenu}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? t('nav.menuClose') : t('nav.menuOpen')}
              >
                <Icon name={isMobileMenuOpen ? 'close' : 'menu'} className="size-7" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          className="relative z-20 border-t border-white/10 bg-primary overflow-hidden"
        >
          <div className="p-6 mobile-menu-scroll pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
            <nav className="flex flex-col space-y-6" aria-label={t('accessibility.aria.mobileNavigation')}>
              <div className="pb-2">
                <LanguageToggle variant="segmented" className="w-full" />
              </div>

              <Link to={`/${lng}/`} onClick={closeMenu} prefetch={false} className={getMobileNavButtonClass(`/${lng}/`, 'lg')}>
                {t('nav.home')}
              </Link>

              <div className="flex flex-col space-y-3">
                <p className="text-xs font-black text-secondary uppercase tracking-[0.2em]">{t('nav.practiceAreas')}</p>
                <div className="flex flex-col space-y-3 pl-4 border-l-2 border-white/15">
                  <Link
                    to={`/${lng}/services`}
                    onClick={closeMenu}
                    prefetch={false}
                    className={getMobileNavButtonClass(`/${lng}/services`, 'sm')}
                  >
                    {t('nav.viewAllServices')}
                  </Link>
                  {practiceAreaLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={closeMenu}
                      prefetch={false}
                      className={getMobileNavButtonClass(link.path, 'sm')}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <p className="text-xs font-black text-secondary uppercase tracking-[0.2em]">{t('nav.about')}</p>
                <div className="flex flex-col space-y-3 pl-4 border-l-2 border-white/15">
                  {aboutLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={closeMenu}
                      prefetch={false}
                      className={getMobileNavButtonClass(link.path, 'sm')}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <EmailLink
                    email={SITE.email}
                    onClick={closeMenu}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/10 text-white font-bold text-sm"
                  >
                    <Icon name="mail" className="text-secondary size-5" />
                    <span className="truncate">{SITE.email}</span>
                  </EmailLink>
                  <Link
                    href={`tel:${SITE.phoneTel}`}
                    onClick={closeMenu}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/10 text-white font-bold text-sm"
                  >
                    <Icon name="call" className="text-secondary size-5" />
                    <span>{SITE.phoneDisplay}</span>
                  </Link>
                </div>

                <ButtonLink
                  href={`/${lng}/contact`}
                  tone="light"
                  size="lg"
                  className="w-full rounded-2xl h-14 text-base capitalize tracking-tight shadow-xl shadow-black/10 active:scale-[0.98] transition-transform focus:ring-offset-2 focus:ring-offset-primary"
                  onClick={closeMenu}
                >
                  <Icon name="mail" className="mr-2 size-5" />
                  {t('nav.contact')}
                </ButtonLink>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );

  if (isIosSafari) {
    return (
      <div className={baseNavClass} aria-label={t('accessibility.aria.mobileNavSection')}>
        {navContent}
      </div>
    );
  }

  return (
    <SectionWithStars
      // iOS Safari + fixed + backdrop-filter tends to flicker/jank during scroll.
      className={baseNavClass}
      aria-label={t('accessibility.aria.mobileNavSection')}
      overflow="visible"
      // Keep the nav lightweight on mobile: no star layers or scroll motion.
      settings={MOBILE_NAV_SECTION_SETTINGS}
    >
      {navContent}
    </SectionWithStars>
  );
};

export default NavbarMobile;
