import type { Metadata } from 'next';
import InsightPage from '@/components/InsightPage';
import { SITE } from '@/lib/site';
import { getAlternates } from '@/lib/seo';

const titles: Record<string, string> = {
  en: 'Global legal architecture | Insights',
  ko: '지정학적 법률 전략 | 인사이트',
};

const descriptions: Record<string, string> = {
  en: 'A board-level playbook for handling sanctions, data traps, export checks, and geopolitical positioning.',
  ko: '제재, 데이터 지역화, 수출 규제, 지정학적 포지셔닝을 관리하는 이사회용 실행 지침입니다.',
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
      url: `${SITE.url}/${lng}/insights/global-legal-architecture`,
    },
    alternates: getAlternates(lng, '/insights/global-legal-architecture'),
  };
}

const references = [
  { label: 'Cosmic Law Firm insights', url: `${SITE.url}/insights` },
];

export default async function Page({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;
  return (
    <InsightPage
      lng={lng}
      pageKey="globalLegalArchitecture"
      references={references}
    />
  );
}
