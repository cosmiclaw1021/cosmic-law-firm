import type { Metadata } from 'next';
import OurPhilosophy from '../../pages/OurPhilosophy';
import { SITE } from '../../lib/site';

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  
  const titles: Record<string, string> = {
    en: `Our Philosophy | ${SITE.name}`,
    ko: `경영 철학 | ${SITE.name}`,
  };
  
  const descriptions: Record<string, string> = {
    en: "Learn about our approach to entertainment law—clarity, courage, and partnership.",
    ko: "명확함, 용기, 그리고 파트너십—Cosmic Law Firm의 엔터테인먼트 법률 자문 철학을 소개합니다.",
  };

  return {
    title: titles[lng] || titles.en,
    description: descriptions[lng] || descriptions.en,
    openGraph: {
      title: titles[lng] || titles.en,
      description: descriptions[lng] || descriptions.en,
      url: `${SITE.url}/${lng}/message`,
    },
    alternates: {
      canonical: `/${lng}/message`,
      languages: {
        'en': '/en/message',
        'ko': '/ko/message',
      },
    },
  };
}

export default async function Page() {
  return <OurPhilosophy />;
}
