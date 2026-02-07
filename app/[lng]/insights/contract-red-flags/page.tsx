import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import InsightPage from '@/components/InsightPage';
import { getAlternates } from '@/lib/seo';

const titles: Record<string, string> = {
  en: 'Contract Red Flags | Insides',
  ko: '계약 위험 신호 | 인사이드',
};

const descriptions: Record<string, string> = {
  en: 'Checklist of the clauses and deliverables that typically leave creators out of future revenue or control.',
  ko: '크리에이터가 후속 수익이나 통제를 잃지 않도록 점검해야 할 핵심 조항 목록.',
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
      url: `${SITE.url}/${lng}/insights/contract-red-flags`,
    },
    alternates: getAlternates(lng, '/insights/contract-red-flags'),
  };
}

const references = [
  { label: 'Entertainment Contract Red Flag Checklist', url: 'https://sistagirljd.com/entertainment-contract-red-flag-checklist/' },
  { label: 'Common Entertainment Contract Red Flags', url: 'https://www.creatorcontracts.com/blog/entertainment-contract-red-flags/' },
  { label: 'Contract Decoder Guide to Keeping Control', url: 'https://www.contractdecoder.com/guide/' },
];

export default async function Page({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;
  return (
    <InsightPage
      lng={lng}
      pageKey="contractRedFlags"
      references={references}
      sections={[
        { titleKey: '', itemsKey: 'insights.pages.contractRedFlags.redFlags', type: 'cards' },
        { titleKey: 'insights.topics.contract-red-flags.tag', itemsKey: 'insights.pages.contractRedFlags.checklist', type: 'list' },
      ]}
    />
  );
}
