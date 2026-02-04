import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import InsightClientPage from '@/components/InsightClientPage';

const titles: Record<string, string> = {
  en: 'NIL Basics | Insides',
  ko: 'NIL 기초 | 인사이드',
  'zh-Hans': 'NIL 基础知识 | 洞见',
};

const descriptions: Record<string, string> = {
  en: 'Quick recap of the NCAA changes, the House settlement, and the new clearinghouse.',
  ko: 'NIL 정착을 위한 NCAA 변경사항, 하원 합의, 클리어링하우스 개요.',
  'zh-Hans': 'NCAA 变化、众议院合解案以及新清算中心的快速简报。',
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
      url: `${SITE.url}/${lng}/insights/nil-basics`,
    },
    alternates: {
      canonical: `/${lng}/insights/nil-basics`,
      languages: {
        'en': '/en/insights/nil-basics',
        'ko': '/ko/insights/nil-basics',
        'zh-Hans': '/zh-Hans/insights/nil-basics',
      },
    },
  };
}

const references = [
  { label: 'NCAA NIL overview', url: 'https://www.ncaa.org/sports/2024/3/21/abi' },
  { label: 'NIL Go clearinghouse concept', url: 'https://nil-go.gov' },
];

export default async function Page({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;
  return (
    <InsightClientPage
      lng={lng}
      pageKey="nilBasics"
      references={references}
      sections={[
        { titleKey: '', itemsKey: 'insights.pages.nilBasics.updates', type: 'cards' },
        { titleKey: 'insights.common.processNotes', itemsKey: 'insights.pages.nilBasics.processItems', type: 'list' },
        { titleKey: 'insights.common.actionItems', itemsKey: 'insights.pages.nilBasics.actionItems', type: 'list' },
      ]}
    />
  );
}