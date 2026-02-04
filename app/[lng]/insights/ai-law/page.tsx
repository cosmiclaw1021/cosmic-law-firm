import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import InsightClientPage from '@/components/InsightClientPage';

const titles: Record<string, string> = {
  en: 'What’s in AI Law | Insides',
  ko: 'AI 법률 현황 | 인사이드',
  'zh-Hans': 'AI 法律最新动态 | 洞见',
};

const descriptions: Record<string, string> = {
  en: 'Federal executive orders, state bills, and the EU AI Act that are shaping the legal landscape.',
  ko: '연방 행정명령, 주 법안, EU AI 법안이 법적 환경을 어떻게 구성하는지 정리.',
  'zh-Hans': '正在塑造法律格局的联邦行政命令、州法案和欧盟 AI 法案。',
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
      url: `${SITE.url}/${lng}/insights/ai-law`,
    },
  };
}

const references = [
  { label: 'White House AI initiative', url: 'https://www.whitehouse.gov/ostp/ai/' },
  { label: 'EU AI Act policy page', url: 'https://digital-strategy.ec.europa.eu/en/policies/european-ai-act' },
];

export default async function Page({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;
  return (
    <InsightClientPage
      lng={lng}
      pageKey="aiLaw"
      references={references}
      sections={[
        { titleKey: '', itemsKey: 'insights.pages.aiLaw.timeline', type: 'cards' },
        { titleKey: 'insights.common.actionItems', itemsKey: 'insights.pages.aiLaw.actionItems', type: 'list' },
      ]}
    />
  );
}