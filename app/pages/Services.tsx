"use client";

import React, { useEffect } from 'react';
import { useViewport } from '../hooks/useViewport';
import ServicesDesktop from './Services/Desktop/Services.desktop';
import ServicesMobile from './Services/Mobile/Services.mobile';
import { useTranslation } from 'react-i18next';

const Services: React.FC<{ lng?: string; initialIsMobile?: boolean }> = ({ lng, initialIsMobile }) => {
  const { i18n } = useTranslation();
  const { isMobile } = useViewport(initialIsMobile);

  useEffect(() => {
    if (lng && i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]);

  return isMobile ? <ServicesMobile /> : <ServicesDesktop />;
};

export default Services;
