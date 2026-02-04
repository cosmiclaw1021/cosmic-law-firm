import type { Metadata } from 'next';
import PracticeAreaPage from '../../../pages/PracticeArea';
import { getPracticeAreaBySlug, practiceAreas } from '../../../lib/practice-areas';
import { SITE } from '../../../lib/site';

export async function generateStaticParams() {
  return practiceAreas.map((area) => ({ practiceArea: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string; practiceArea: string }>;
}): Promise<Metadata> {
  const { lng, practiceArea } = await params;
  const area = getPracticeAreaBySlug(practiceArea);

  if (!area) {
    return {
      title: `Practice Area | ${SITE.name}`,
      description: 'Practice area not found.',
    };
  }

  const localizedTitle = lng === 'ko' ? area.titleKo : area.title;
  const localizedDescription = lng === 'ko' ? area.summaryKo ?? area.summary : area.summary;

  return {
    title: localizedTitle,
    description: localizedDescription || area.summary,
    openGraph: {
      title: localizedTitle,
      description: localizedDescription || area.summary,
      url: `${SITE.url}/${lng}/services/${area.slug}`,
    },
    alternates: {
      canonical: `/${lng}/services/${area.slug}`,
      languages: {
        'en': `/en/services/${area.slug}`,
        'ko': `/ko/services/${area.slug}`,
      },
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lng: string; practiceArea: string }>;
}) {
  const { lng, practiceArea } = await params;

  return <PracticeAreaPage lng={lng} slug={practiceArea} />;
}
