import type { Metadata } from 'next';
import Team from '../../../pages/Team';
import { SITE } from '../../../lib/site';

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  
  const titles: Record<string, string> = {
    en: `Our Team | ${SITE.name}`,
    ko: `팀 소개 | ${SITE.name}`,
    'zh-Hans': `团队介绍 | ${SITE.name}`
  };
  
  const descriptions: Record<string, string> = {
    en: "Meet the experienced attorneys at Cosmic Law Firm—experts in entertainment and litigation.",
    ko: "Cosmic Law Firm의 숙련된 변호사들을 만나보세요—엔터테인먼트 및 소송 전문가 그룹입니다.",
    'zh-Hans': "见见 Cosmic Law Firm 经验丰富的律师——娱乐与诉讼领域的专家。"
  };

  return {
    title: titles[lng] || titles.en,
    description: descriptions[lng] || descriptions.en,
    openGraph: {
      title: titles[lng] || titles.en,
      description: descriptions[lng] || descriptions.en,
      url: `${SITE.url}/${lng}/about/team`,
    },
    alternates: {
      canonical: `/${lng}/about/team`,
      languages: {
        'en': '/en/about/team',
        'ko': '/ko/about/team',
        'zh-Hans': '/zh-Hans/about/team',
      },
    },
  };
}

export default async function Page() {
  return <Team />;
}