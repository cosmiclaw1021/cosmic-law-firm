import type { Metadata } from 'next';
import Accessibility from '../../pages/Accessibility';
import { SITE } from '../../lib/site';

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  
  const titles: Record<string, string> = {
    en: `Accessibility Statement | ${SITE.name}`,
    ko: `웹 접근성 선언 | ${SITE.name}`,
  };

  return {
    title: titles[lng] || titles.en,
    openGraph: {
      title: titles[lng] || titles.en,
      url: `${SITE.url}/${lng}/accessibility`,
    },
    alternates: {
      canonical: `/${lng}/accessibility`,
      languages: {
        'en': '/en/accessibility',
        'ko': '/ko/accessibility',
      },
    },
  };
}

export default async function Page() {
  return <Accessibility />;
}
