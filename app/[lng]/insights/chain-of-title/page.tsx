import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import InsightPage from '@/components/InsightPage';
import { getAlternates } from '@/lib/seo';

const titles: Record<string, string> = {
  en: 'Chain of Title | Insides',
  ko: '체인오브타이틀 | 인사이드',
};

const descriptions: Record<string, string> = {
  en: 'Clean paper trails, option letters, and releases that let investors and distributors say yes.',
  ko: '투자자와 배급사가 승인할 수 있도록 모든 계약과 양도, 릴리스 증빙을 정리하는 요약.',
};

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  const title = titles[lng] || titles.en;
  const description = descriptions[lng] || descriptions.en;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE.url}/${lng}/insights/chain-of-title`,
    },
    alternates: getAlternates(lng, '/insights/chain-of-title'),
  };
}

const references = [
  {
    label: 'Chain of Title definition (Investopedia)',
    url: 'https://www.investopedia.com/terms/c/chain-of-title.asp',
  },
];

export default async function Page({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;
  return (
    <InsightPage
      lng={lng}
      pageKey="chainOfTitle"
      references={references}
      listType="decimal"
      sections={[
        { titleKey: '', itemsKey: 'insights.pages.chainOfTitle.highlights', type: 'cards' },
        { titleKey: 'insights.pages.chainOfTitle.badge', itemsKey: 'insights.pages.chainOfTitle.docs', type: 'list' },
        { titleKey: 'insights.common.processNotes', itemsKey: 'insights.pages.chainOfTitle.diligenceSteps', type: 'list' },
      ]}
    />
  );
}
