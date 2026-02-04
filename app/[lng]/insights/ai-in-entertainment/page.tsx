import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import InsightClientPage from '@/components/InsightClientPage';

const titles: Record<string, string> = {
  en: 'AI in Entertainment | Insides',
  ko: '엔터테인먼트 AI | 인사이드',
  'zh-Hans': 'AI 与娱乐行业 | 洞见',
};

const descriptions: Record<string, string> = {
  en: 'How AI, digital replicas, and policy shifts are reshaping rights, production, and publicity.',
  ko: 'AI와 디지털 복제, 정책 변화가 권리, 제작, 퍼블리시티를 어떻게 바꾸는지 정리.',
  'zh-Hans': 'AI、数字副本和政策转变如何重塑权利、制作和宣传。',
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
      url: `${SITE.url}/${lng}/insights/ai-in-entertainment`,
    },
  };
}

const references = [
  {
    label: 'SAG-AFTRA digital replica guidelines',
    url: 'https://www.sagaftra.org/contracts/2023-commercials-agreement',
  },
  {
    label: 'SAG-AFTRA interactive media agreement summary',
    url: 'https://www.sagaftra.org/contracts/interactive-media-agreement',
  },
  {
    label: 'IAB AI Accountability for Publishers Act overview',
    url: 'https://www.iab.com/ai-accountability/',
  },
];

export default async function Page({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;
  return (
    <InsightClientPage
      lng={lng}
      pageKey="aiInEntertainment"
      references={references}
      sections={[
        { titleKey: '', itemsKey: 'insights.pages.aiInEntertainment.snapshots', type: 'cards' },
        { titleKey: 'insights.common.riskSnapshot', itemsKey: 'insights.pages.aiInEntertainment.riskPoints', type: 'cards' },
        { titleKey: 'insights.common.actionItems', itemsKey: 'insights.pages.aiInEntertainment.actionItems', type: 'list' },
      ]}
    />
  );
}