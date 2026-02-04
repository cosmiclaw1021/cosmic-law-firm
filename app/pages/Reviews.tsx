"use client";

import React, { useEffect } from 'react';
import { useViewport } from '../hooks/useViewport';
import ReviewsDesktop from './Reviews/Desktop/Reviews.desktop';
import ReviewsMobile from './Reviews/Mobile/Reviews.mobile';
import { reviewMetadata } from './Reviews/Shared/reviews.constants';
import { useTranslation } from 'react-i18next';
import { SITE } from '../lib/site';

const Reviews: React.FC<{ lng?: string; initialIsMobile?: boolean }> = ({ lng, initialIsMobile }) => {
  const { isMobile } = useViewport(initialIsMobile);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lng && i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]);

  // Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": SITE.name,
    "url": SITE.url,
    "image": `${SITE.url}/Cosmic_Logos-02.png`,
    "telephone": SITE.phoneTel ? `+1-${SITE.phoneTel}` : undefined,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": reviewMetadata.length.toString()
    },
    "review": reviewMetadata.slice(0, 10).map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.name
      },
      "datePublished": review.date ? new Date(review.date).toISOString().split('T')[0] : "2016-02-20",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating.toString(),
        "bestRating": "5"
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {isMobile ? <ReviewsMobile /> : <ReviewsDesktop />}
    </>
  );
};

export default Reviews;
