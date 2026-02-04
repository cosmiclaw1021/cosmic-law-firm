"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';
import { normalizeLanguage, type SupportedLanguage } from '@src/i18n';
import Icon from '@src/components/Icon';

type LanguageOption = { code: SupportedLanguage; label: string; fullLabel: string };

const OPTIONS: readonly LanguageOption[] = [
  { code: 'en', label: 'EN', fullLabel: 'English' },
  { code: 'ko', label: '한국어', fullLabel: '한국어' },
  { code: 'zh-Hans', label: '中文', fullLabel: '中文' },
];

interface LanguageSwitcherProps {
  variant?: 'segmented' | 'dropdown';
  className?: string;
}

export default function LanguageSwitcher({ variant = 'segmented', className = '' }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = normalizeLanguage(i18n.language);
  const currentOption = OPTIONS.find(opt => opt.code === currentLanguage) || OPTIONS[0];

  const handleLanguageChange = (lng: SupportedLanguage) => {
    if (!pathname) return;

    const segments = pathname.split('/');
    if (segments.length > 1) segments[1] = lng;
    const newPath = segments.join('/');

    i18n.changeLanguage(lng);
    router.push(newPath);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 h-10 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-all focus:ring-2 focus:ring-secondary/40"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label="Select Language"
        >
          <span className="text-[11px] font-black tracking-widest">{currentOption.label}</span>
          <Icon name="expand_more" className={`size-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <ul 
            className="absolute right-0 mt-2 py-2 w-32 bg-primary border border-white/15 rounded-xl shadow-2xl z-[60] animate-in fade-in zoom-in-95 duration-200"
            role="listbox"
          >
            {OPTIONS.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`
                    w-full text-left px-4 py-2 text-xs font-bold transition-colors
                    ${currentLanguage === lang.code 
                      ? 'text-secondary bg-white/10' 
                      : 'text-white/80 hover:text-white hover:bg-white/5'}
                  `}
                  role="option"
                  aria-selected={currentLanguage === lang.code}
                >
                  {lang.fullLabel}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center p-1 rounded-full bg-white/10 border border-white/15 ${className}`}>
      {OPTIONS.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`
            flex-1 px-4 h-10 rounded-full text-[10px] font-black tracking-widest transition-all duration-300 min-w-[60px] sm:min-w-[70px]
            ${currentLanguage === lang.code 
              ? 'bg-secondary text-primary shadow-md shadow-black/10'
              : 'text-white/85 hover:text-white hover:bg-white/10'}
          `}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}

