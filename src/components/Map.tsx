'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FEATURES } from '@src/config/features';

type MapProps = {
  addressQuery: string;
  addressText?: string;
  className?: string;
};

export default function Map({ addressQuery, addressText, className }: MapProps) {
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const alt = addressText
    ? `Static map placeholder for ${addressText}`
    : `Static map placeholder for ${addressQuery}`;
  const containerClass = className ?? 'w-full h-full';

  useEffect(() => {
    if (!FEATURES.googleMaps || shouldLoadIframe) return;
    if (typeof window === 'undefined') return;
    const current = containerRef.current;
    if (!current) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            setShouldLoadIframe(true);
            obs.disconnect();
          }
        },
        { rootMargin: '200px' }
      );
      observer.observe(current);
      return () => observer.disconnect();
    }

    setShouldLoadIframe(true);
  }, [shouldLoadIframe]);

  const renderPlaceholder = () => (
    <div className="relative w-full h-full">
      <img
        src="/images/static-map.svg"
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      {addressText ? (
        <div className="absolute inset-x-0 bottom-0 bg-slate-950/55 text-white px-3 py-2 text-xs font-semibold backdrop-blur-sm">
          {addressText}
        </div>
      ) : null}
    </div>
  );

  if (!FEATURES.googleMaps) {
    return (
      <div className={containerClass} aria-label={alt}>
        {renderPlaceholder()}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={containerClass}
      aria-label={!shouldLoadIframe ? alt : undefined}
    >
      {shouldLoadIframe ? (
        <iframe
          title={`Map showing ${addressQuery}`}
          className="w-full h-full border-0"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(addressQuery)}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        renderPlaceholder()
      )}
    </div>
  );
}
