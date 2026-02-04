import type { Metadata } from 'next';
import Contact from '../../pages/Contact';
import { getInitialIsMobileFromHeaders } from '../../lib/get-initial-is-mobile';
import { SITE } from '../../lib/site';

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  
  const titles: Record<string, string> = {
    en: `Contact Us | ${SITE.name}`,
    ko: `문의하기 | ${SITE.name}`,
  };
  
  const descriptions: Record<string, string> = {
    en: "Contact Cosmic Law Firm in Los Angeles for entertainment, media, and personal injury legal services.",
    ko: "로스앤젤레스에 위치한 Cosmic Law Firm에 엔터테인먼트, 미디어, 개인상해 법률 서비스를 문의하세요.",
  };

  return {
    title: titles[lng] || titles.en,
    description: descriptions[lng] || descriptions.en,
    openGraph: {
      title: titles[lng] || titles.en,
      description: descriptions[lng] || descriptions.en,
      url: `${SITE.url}/${lng}/contact`,
    },
    alternates: {
      canonical: `/${lng}/contact`,
      languages: {
        'en': '/en/contact',
        'ko': '/ko/contact',
      },
    },
  };
}

export default async function Page() {
  const initialIsMobile = await getInitialIsMobileFromHeaders();

  return <Contact initialIsMobile={initialIsMobile} />;
}
