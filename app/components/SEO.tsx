"use client";

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { SITE } from '../lib/site';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
}

const SEO: React.FC<SEOProps> = ({ title, description, image, article }) => {
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  
  const defaultTitle = t('seo.home.title') || `${SITE.name} | ${t('common.companyNameSub')}`;
  const defaultDescription =
    t('seo.home.description') ||
    'Entertainment law for creators, studios, and media companies—contracts, IP, talent deals, distribution, and disputes.';
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : SITE.url;
  const defaultImage = `${siteUrl}/Cosmic_Logos-02.png`;
  
  const companyName = t('common.companyName') || SITE.name;
  
  const seo = {
    title: title ? `${title} | ${companyName}` : defaultTitle,
    description: description || defaultDescription,
    image: image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage,
    url: `${siteUrl}${pathname}`,
  };

  useEffect(() => {
    document.title = seo.title;

    const updateMetaTag = (selector: string, attr: string, value: string) => {
      let element = document.querySelector(selector);
      if (element) {
        element.setAttribute(attr, value);
      } else {
        element = document.createElement('meta');
        const [attrName, attrValue] = selector
          .replace('meta[', '')
          .replace(']', '')
          .split('=');
        element.setAttribute(attrName, attrValue.replace(/"/g, ''));
        element.setAttribute(attr, value);
        document.head.appendChild(element);
      }
    };

    updateMetaTag('meta[name="description"]', 'content', seo.description);
    
    // Open Graph
    updateMetaTag('meta[property="og:title"]', 'content', seo.title);
    updateMetaTag('meta[property="og:description"]', 'content', seo.description);
    updateMetaTag('meta[property="og:image"]', 'content', seo.image);
    updateMetaTag('meta[property="og:url"]', 'content', seo.url);
    updateMetaTag('meta[property="og:type"]', 'content', article ? 'article' : 'website');

    // Twitter
    updateMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', 'content', seo.title);
    updateMetaTag('meta[name="twitter:description"]', 'content', seo.description);
    updateMetaTag('meta[name="twitter:image"]', 'content', seo.image);

  }, [seo.title, seo.description, seo.image, seo.url, article]);

  return null;
};

export default SEO;
