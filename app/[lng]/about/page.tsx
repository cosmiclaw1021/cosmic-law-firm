import type { Metadata } from 'next';
import About from '../../pages/About';
import { getInitialIsMobileFromHeaders } from '../../lib/get-initial-is-mobile';
import { SITE } from '../../lib/site';
import { getAlternates } from '../../lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  
  const titles: Record<string, string> = {
    en: `About Us | ${SITE.name}`,
    ko: `본소 소개 | ${SITE.name}`,
  };
  
  const descriptions: Record<string, string> = {
    en: "Learn about Cosmic Law Firm—entertainment and media legal counsel for creators, studios, and businesses.",
    ko: "크리에이터, 스튜디오, 기업을 위한 엔터테인먼트 및 미디어 전문 로펌, Cosmic Law Firm을 소개합니다.",
  };

  return {
    title: titles[lng] || titles.en,
    description: descriptions[lng] || descriptions.en,
    openGraph: {
      title: titles[lng] || titles.en,
      description: descriptions[lng] || descriptions.en,
      url: `${SITE.url}/${lng}/about`,
    },
    alternates: getAlternates(lng, '/about'),
  };
}

export default async function Page() {
  const initialIsMobile = await getInitialIsMobileFromHeaders();

  return <About initialIsMobile={initialIsMobile} />;
}
