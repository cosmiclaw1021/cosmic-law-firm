"use client";

import React, { useEffect } from 'react';
import { useViewport } from '../hooks/useViewport';
import { useTranslation } from 'react-i18next';
import TeamDesktop from './Team/Desktop/Team.desktop';
import TeamMobile from './Team/Mobile/Team.mobile';

const Team: React.FC<{ lng?: string; initialIsMobile?: boolean }> = ({ lng, initialIsMobile }) => {
  const { i18n } = useTranslation();
  const { isMobile } = useViewport(initialIsMobile);

  useEffect(() => {
    if (lng && i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]);

  return (
    <>
      {isMobile ? <TeamMobile /> : <TeamDesktop />}
    </>
  );
};

export default Team;