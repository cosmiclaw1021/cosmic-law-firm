import type { Metadata } from 'next';
import Privacy from '../../pages/Privacy';
import { SITE } from '../../lib/site';

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  
  const titles: Record<string, string> = {
    en: `Privacy Policy | ${SITE.name}`,
    ko: `개인정보 처리방침 | ${SITE.name}`,
    'zh-Hans': `隐私政策 | ${SITE.name}`
  };

  return {
    title: titles[lng] || titles.en,
    openGraph: {
      title: titles[lng] || titles.en,
      url: `${SITE.url}/${lng}/privacy`,
    },
    alternates: {
      canonical: `/${lng}/privacy`,
      languages: {
        'en': '/en/privacy',
        'ko': '/ko/privacy',
        'zh-Hans': '/zh-Hans/privacy',
      },
    },
  };
}

export default async function Page() {
  return <Privacy />;
}