import type { Metadata } from 'next';
import Terms from '../../pages/Terms';
import { SITE } from '../../lib/site';

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  
  const titles: Record<string, string> = {
    en: `Terms of Service | ${SITE.name}`,
    ko: `이용약관 | ${SITE.name}`,
    'zh-Hans': `服务条款 | ${SITE.name}`
  };

  return {
    title: titles[lng] || titles.en,
    openGraph: {
      title: titles[lng] || titles.en,
      url: `${SITE.url}/${lng}/terms`,
    },
    alternates: {
      canonical: `/${lng}/terms`,
      languages: {
        'en': '/en/terms',
        'ko': '/ko/terms',
        'zh-Hans': '/zh-Hans/terms',
      },
    },
  };
}

export default async function Page() {
  return <Terms />;
}