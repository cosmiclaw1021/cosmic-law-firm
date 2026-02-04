import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import InsightClientPage from '@/components/InsightClientPage';

const titles: Record<string, string> = {
  en: 'Rights & Publicity Basics | Insides',
  ko: '퍼블리시티 권리 기초 | 인사이드',
};

const descriptions: Record<string, string> = {
  en: 'Rights of publicity, NIL, and how AI deepfakes are tightening the scrutiny around likeness.',
  ko: '퍼블리시티 권리, NIL, 인공지능 딥페이크가 초상 사용을 어떻게 재정의하는지 정리.',
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
      url: `${SITE.url}/${lng}/insights/publicity-basics`,
    },
  };
}

const references = [
  { label: 'Right of Publicity (Cornell Law)', url: 'https://www.law.cornell.edu/wex/right_of_publicity' },
  { label: 'NO FAKES Act summary', url: 'https://www.congress.gov/bill/118th-congress/house-bill/1940' },
];

export default async function Page({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;
  return (
    <InsightClientPage
      lng={lng}
      pageKey="publicityBasics"
      references={references}
      sections={[
        { titleKey: '', itemsKey: 'insights.pages.publicityBasics.definitions', type: 'cards' },
        { titleKey: 'insights.common.riskSnapshot', itemsKey: 'insights.pages.publicityBasics.aiRisks', type: 'cards' },
        { titleKey: 'insights.topics.publicity-basics.tag', itemsKey: 'insights.pages.publicityBasics.reminders', type: 'list' },
      ]}
    />
  );
}
