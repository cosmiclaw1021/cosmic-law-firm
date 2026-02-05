'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useViewport } from '../hooks/useViewport';

const NavbarDesktop = dynamic(() => import('./Navbar/Desktop/Navbar.desktop'), { ssr: false });
const NavbarMobile = dynamic(() => import('./Navbar/Mobile/Navbar.mobile'), { ssr: false });

const Navbar: React.FC<{ initialIsMobile?: boolean }> = ({ initialIsMobile }) => {
  const { isMobile } = useViewport(initialIsMobile);

  return isMobile ? <NavbarMobile /> : <NavbarDesktop />;
};

export default Navbar;
