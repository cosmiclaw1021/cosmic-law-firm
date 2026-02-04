"use client";

import React, { useEffect } from 'react';
import { useViewport } from '../hooks/useViewport';
import { useTranslation } from 'react-i18next';
import HomeDesktop from './Home/Desktop/Home.desktop';
import HomeMobile from './Home/Mobile/Home.mobile';

const Home: React.FC<{ lng?: string; initialIsMobile?: boolean }> = ({ lng, initialIsMobile }) => {
  const { i18n } = useTranslation();
  const { isMobile } = useViewport(initialIsMobile);

  useEffect(() => {
    if (lng && i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]);

  return isMobile ? <HomeMobile /> : <HomeDesktop />;
};

export default Home;
