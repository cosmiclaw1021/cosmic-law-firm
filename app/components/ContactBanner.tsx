"use client";

import React from 'react';
import Link from './ui/Link';
import LanguageToggle from './LanguageToggle';
import { SITE } from '../lib/site';
import Icon from '@src/components/Icon';

interface ContactBannerProps {
  lng?: string;
}

const ContactBanner: React.FC<ContactBannerProps> = ({ lng }) => {
  return (
    <div className="bg-slate-900 dark:bg-[#05080a] text-white py-1.5 sm:py-2 px-6 border-b border-white/5 transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto flex justify-center sm:justify-between items-center gap-x-8 text-[10px] font-bold tracking-[0.05em] uppercase">
        <div className="hidden sm:flex flex-wrap justify-start items-center gap-x-6 gap-y-1.5">
          <Link 
            href={`tel:${SITE.phoneTel}`} 
            className="flex items-center gap-2 hover:text-primary-light transition-colors focus:ring-1 focus:ring-primary/20 rounded shrink-0 group"
          >
            <Icon name="call" className="text-secondary size-[15px] group-hover:scale-110 transition-transform" />
            <span>{SITE.phoneDisplay}</span>
          </Link>
          <div className="hidden sm:block h-3 w-px bg-white/10" aria-hidden="true" />
          <div className="flex items-center gap-2 text-white/80">
            <Icon name="location_on" className="text-secondary size-[15px] shrink-0" />
            <span className="truncate max-w-[240px] sm:max-w-none">{SITE.addressShort}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <Link 
            href={`mailto:${SITE.email}`}
            className="hidden sm:flex items-center gap-2 hover:text-primary-light transition-colors focus:ring-1 focus:ring-primary/20 rounded group"
          >
            <Icon name="mail" className="text-secondary size-[15px] group-hover:scale-110 transition-transform" />
            <span>{SITE.email}</span>
          </Link>
          <div className="hidden sm:block h-3 w-px bg-white/10" aria-hidden="true" />
          <LanguageToggle className="w-fit" />
        </div>
      </div>
    </div>
  );
};

export default ContactBanner;
