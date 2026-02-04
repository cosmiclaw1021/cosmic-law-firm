import type { Metadata } from 'next';
import Insights from '../../pages/Insights';
import { SITE } from '../../lib/site';

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  
  const titles: Record<string, string> = {
    en: `Insights | ${SITE.name}`,
    ko: `인사이트 | ${SITE.name}`,
    'zh-Hans': `洞见 | ${SITE.name}`
  };
  
  const descriptions: Record<string, string> = {
    en: "Practical notes on contracts, IP, and deal-making for creators and entertainment companies.",
    ko: "계약, 지식재산권, 딜 구조에 대한 실무 중심 가이드.",
    'zh-Hans': "关于合同、知识产权和交易达成的实务指南，面向创作者和娱乐公司。"
  };

  return {
    title: titles[lng] || titles.en,
    description: descriptions[lng] || descriptions.en,
    keywords: ['entertainment law', 'contracts', 'copyright', 'trademark', 'NIL', 'right of publicity', 'distribution'],
    openGraph: {
      title: titles[lng] || titles.en,
      description: descriptions[lng] || descriptions.en,
      url: `${SITE.url}/${lng}/insights`,
    },
    alternates: {
      canonical: `/${lng}/insights`,
      languages: {
        'en': '/en/insights',
        'ko': '/ko/insights',
        'zh-Hans': '/zh-Hans/insights',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;
  return <Insights lng={lng} />;
}
