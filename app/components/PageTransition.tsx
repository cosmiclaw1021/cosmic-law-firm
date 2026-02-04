'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useViewport } from '../hooks/useViewport';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isMobile } = useViewport();
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return (
    <motion.div
      key={pathname}
      initial={
        hasHydrated
          ? (isMobile ? { opacity: 1 } : { opacity: 0 })
          : false
      }
      animate={{ opacity: 1 }}
      transition={
        hasHydrated
          ? (isMobile ? { duration: 0 } : { duration: 0.3, ease: 'easeInOut' })
          : { duration: 0 }
      }
      className="flex flex-col flex-grow w-full"
    >
      {children}
    </motion.div>
  );
}
