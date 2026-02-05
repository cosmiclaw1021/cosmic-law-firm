'use client';

import React, { createContext, useContext } from 'react';

export type ViewportContextValue = {
  isMobile: boolean;
};

const ViewportContext = createContext<ViewportContextValue | null>(null);

export function ViewportProvider({
  value,
  children,
}: {
  value: ViewportContextValue;
  children: React.ReactNode;
}) {
  return <ViewportContext.Provider value={value}>{children}</ViewportContext.Provider>;
}

export function useViewportContext() {
  return useContext(ViewportContext);
}

