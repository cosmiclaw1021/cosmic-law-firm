import type { Metadata } from 'next';
import Home from '../pages/Home';
import { getInitialIsMobileFromHeaders } from '../lib/get-initial-is-mobile';
import { SITE } from '../lib/site';

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  
  const titles: Record<string, string> = {
    en: `Entertainment Law | ${SITE.name}`,
    ko: `${SITE.name} | 엔터테인먼트 로펌`,
    'zh-Hans': `${SITE.name} | 娱乐法律服务`
  };
  
  const descriptions: Record<string, string> = {
    en: "Entertainment law for creators, studios, and media companies—contracts, IP, talent deals, distribution, and disputes.",
    ko: "크리에이터와 미디어 기업을 위한 엔터테인먼트 법률 서비스—계약, 지식재산권, 탤런트 딜, 배급, 분쟁.",
    'zh-Hans': "为创作者、制片方与媒体公司提供娱乐法律服务——合同、知识产权、艺人交易、发行与争议解决。"
  };

  return {
    title: titles[lng] || titles.en,
    description: descriptions[lng] || descriptions.en,
    keywords: [
      "entertainment lawyer",
      "entertainment law",
      "intellectual property",
      "copyright",
      "trademark",
      "music law",
      "film distribution",
      "contracts",
      "name image likeness",
      "right of publicity"
    ],
    openGraph: {
      title: titles[lng] || titles.en,
      description: descriptions[lng] || descriptions.en,
      url: `${SITE.url}/${lng}`,
    },
    alternates: {
      canonical: `/${lng}`,
      languages: {
        'en': '/en',
        'ko': '/ko',
        'zh-Hans': '/zh-Hans',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;
  const initialIsMobile = await getInitialIsMobileFromHeaders();

  return <Home lng={lng} initialIsMobile={initialIsMobile} />;
}
