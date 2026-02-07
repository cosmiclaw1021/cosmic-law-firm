import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import InsightPage from '@/components/InsightPage';
import { getAlternates } from '@/lib/seo';

const titles: Record<string, string> = {
  en: 'AI Contracts | Insides',
  ko: 'AI 계약 | 인사이드',
};

const descriptions: Record<string, string> = {
  en: 'Clause map for indemnities, data rights, and audit controls when AI vendors touch your IP.',
  ko: 'AI 공급업체가 지식재산에 다가올 때 다뤄야 할 면책, 데이터 권리, 감사 제어에 대한 조항 가이드.',
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
      url: `${SITE.url}/${lng}/insights/ai-contracts`,
    },
    alternates: getAlternates(lng, '/insights/ai-contracts'),
  };
}

const references = [
  { label: 'ACC AI and Emerging Issues initiative', url: 'https://www.acc.com/initiative/ai-emerging-issues' },
  { label: 'Anthropic settlement coverage', url: 'https://apnews.com/article/anthropic-settlement' },
];

export default async function Page({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;
  return (
    <InsightPage
      lng={lng}
      pageKey="aiContracts"
      references={references}
    />
  );
}
