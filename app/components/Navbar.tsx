'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useViewport } from '../hooks/useViewport';

const NavbarDesktop = dynamic(() => import('./Navbar/Desktop/Navbar.desktop'));
const NavbarMobile = dynamic(() => import('./Navbar/Mobile/Navbar.mobile'));

const Navbar: React.FC<{ initialIsMobile?: boolean }> = ({ initialIsMobile }) => {
  const { isMobile } = useViewport(initialIsMobile);

  useEffect(() => {
    // Warm the chunk ASAP for the active variant to reduce first-interaction delay on slow devices.
    if (isMobile) {
      void import('./Navbar/Mobile/Navbar.mobile');
    } else {
      void import('./Navbar/Desktop/Navbar.desktop');
    }
  }, [isMobile]);

  return isMobile ? <NavbarMobile /> : <NavbarDesktop />;
};

export default Navbar;
