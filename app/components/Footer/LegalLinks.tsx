'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from '../ui/Link';
import { useCookieConsent } from '@src/context/cookieConsent';

const LegalLinks: React.FC = () => {
    const { t } = useTranslation();
    const { openBanner } = useCookieConsent();

    const links = [
        { to: '/accessibility', label: t('footer.accessibility') },
        { to: '/privacy', label: t('footer.privacyPolicy') },
        { to: '/terms', label: t('footer.termsOfService') },
        { to: '/cookie-policy', label: t('footer.cookiePolicy') },
        { to: '/disclaimer', label: t('footer.disclaimer') },
    ];

    const itemClass = "text-white/90 hover:text-secondary transition-colors text-[11px] font-medium tracking-wider";

    return (
        <nav
            className="flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-4"
            aria-label={t('accessibility.aria.footerLegalNav')}
        >
            {links.map((link) => (
                <Link
                    key={link.to}
                    to={link.to}
                    className={itemClass}
                >
                    {link.label}
                </Link>
            ))}
            <button
                type="button"
                onClick={openBanner}
                className={`${itemClass} focus:outline-none focus:ring-2 focus:ring-white/30`}
            >
                {t('footer.cookiePreferences')}
            </button>
            <button
                type="button"
                onClick={openBanner}
                className={`${itemClass} focus:outline-none focus:ring-2 focus:ring-white/30`}
            >
                {t('footer.doNotSell')}
            </button>
        </nav>
    );
};

export default LegalLinks;
