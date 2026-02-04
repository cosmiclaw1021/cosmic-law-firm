import type { Metadata } from 'next';
import Reviews from '../../pages/Reviews';
import { SITE } from '../../lib/site';

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  
  const titles: Record<string, string> = {
    en: `Client Reviews | ${SITE.name}`,
    ko: `고객 후기 | ${SITE.name}`,
  };
  
  const descriptions: Record<string, string> = {
    en: "What our clients say about Cosmic Law Firm's entertainment and litigation services.",
    ko: "Cosmic Law Firm의 엔터테인먼트 및 소송 서비스에 대한 고객들의 평가를 확인하세요.",
  };

  return {
    title: titles[lng] || titles.en,
    description: descriptions[lng] || descriptions.en,
    openGraph: {
      title: titles[lng] || titles.en,
      description: descriptions[lng] || descriptions.en,
      url: `${SITE.url}/${lng}/reviews`,
    },
    alternates: {
      canonical: `/${lng}/reviews`,
      languages: {
        'en': '/en/reviews',
        'ko': '/ko/reviews',
      },
    },
  };
}

export default async function Page() {
  return <Reviews />;
}
