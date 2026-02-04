import type { Metadata } from 'next';
import Services from '../../pages/Services';
import { SITE } from '../../lib/site';

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  
  const titles: Record<string, string> = {
    en: `Our Services | ${SITE.name}`,
    ko: `전문 분야 | ${SITE.name}`,
    'zh-Hans': `我们的服务 | ${SITE.name}`
  };
  
  const descriptions: Record<string, string> = {
    en: "Full-spectrum entertainment, media, and personal injury legal services.",
    ko: "엔터테인먼트, 미디어, 개인상해 법률 서비스 전 영역을 아우르는 전문 자문을 제공합니다.",
    'zh-Hans': "提供全方位的娱乐、媒体和人身伤害法律服务。"
  };

  return {
    title: titles[lng] || titles.en,
    description: descriptions[lng] || descriptions.en,
    openGraph: {
      title: titles[lng] || titles.en,
      description: descriptions[lng] || descriptions.en,
      url: `${SITE.url}/${lng}/services`,
    },
    alternates: {
      canonical: `/${lng}/services`,
      languages: {
        'en': '/en/services',
        'ko': '/ko/services',
        'zh-Hans': '/zh-Hans/services',
      },
    },
  };
}

export default async function Page() {
  return <Services />;
}