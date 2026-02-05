'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function PageTransitionMotion({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return (
    <motion.div
      key={pathname}
      initial={hasHydrated ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={hasHydrated ? { duration: 0.3, ease: 'easeInOut' } : { duration: 0 }}
      className="flex flex-col flex-grow w-full"
    >
      {children}
    </motion.div>
  );
}

