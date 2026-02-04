'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useViewport } from '../hooks/useViewport';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isMobile } = useViewport();

  return (
    <motion.div
      key={pathname}
      initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={isMobile ? { duration: 0 } : {
        duration: 0.3,
        ease: 'easeInOut',
      }}
      className="flex flex-col flex-grow w-full"
    >
      {children}
    </motion.div>
  );
}
