'use client';

import React from 'react';
import NavbarDesktop from './Navbar/Desktop/Navbar.desktop';
import NavbarMobile from './Navbar/Mobile/Navbar.mobile';
import { useViewport } from '../hooks/useViewport';

const Navbar: React.FC<{ initialIsMobile?: boolean }> = ({ initialIsMobile }) => {
  const { isMobile } = useViewport(initialIsMobile);

  return isMobile ? <NavbarMobile /> : <NavbarDesktop />;
};

export default Navbar;
