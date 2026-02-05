import type { Metadata } from 'next';
import CookiePolicy from '../../pages/CookiePolicy';
import { SITE } from '../../lib/site';

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;

  const titles: Record<string, string> = {
    en: `Cookie Policy | ${SITE.name}`,
    ko: `쿠키 정책 | ${SITE.name}`,
  };

  return {
    title: titles[lng] || titles.en,
    openGraph: {
      title: titles[lng] || titles.en,
      url: `${SITE.url}/${lng}/cookie-policy`,
    },
    alternates: {
      canonical: `/${lng}/cookie-policy`,
      languages: {
        en: '/en/cookie-policy',
        ko: '/ko/cookie-policy',
      },
    },
  };
}

export default async function Page() {
  return <CookiePolicy />;
}
