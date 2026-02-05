'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useViewport } from '../hooks/useViewport';

const PageTransitionMotion = dynamic(() => import('./PageTransition.motion'));

export default function PageTransition({
  children,
  initialIsMobile,
}: {
  children: React.ReactNode;
  initialIsMobile?: boolean;
}) {
  const { isMobile } = useViewport(initialIsMobile);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (isMobile) {
    return <div className="flex flex-col flex-grow w-full">{children}</div>;
  }

  // Avoid rendering the motion wrapper until after mount to prevent hydration inconsistencies.
  if (!hasMounted) {
    return <div className="flex flex-col flex-grow w-full">{children}</div>;
  }

  return <PageTransitionMotion>{children}</PageTransitionMotion>;
}

