import { Metadata } from 'next';
import { SITE } from './site';

export function getAlternates(lng: string, path: string): Metadata['alternates'] {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const enPath = `/en${cleanPath}`;
  const koPath = `/ko${cleanPath}`;

  return {
    canonical: `/${lng}${cleanPath}`,
    languages: {
      'en': enPath,
      'ko': koPath,
      'x-default': enPath,
    },
  };
}
