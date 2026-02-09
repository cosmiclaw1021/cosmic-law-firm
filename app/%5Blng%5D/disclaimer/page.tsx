import type { Metadata } from 'next';
import Disclaimer from '../../pages/Disclaimer';
import { SITE } from '../../lib/site';

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
    const { lng } = await params;

    const titles: Record<string, string> = {
        en: `Professional Services Disclaimer | ${SITE.name}`,
        ko: `법적 면책 고지 | ${SITE.name}`,
    };

    const descriptions: Record<string, string> = {
        en: "Important legal disclaimer regarding the information on this website and professional relationship formation.",
        ko: "이 웹사이트의 정보 및 전문적 관계 형성에 관한 중요한 법적 면책 고지입니다.",
    };

    return {
        title: titles[lng] || titles.en,
        description: descriptions[lng] || descriptions.en,
        openGraph: {
            title: titles[lng] || titles.en,
            description: descriptions[lng] || descriptions.en,
            url: `${SITE.url}/${lng}/disclaimer`,
        },
        alternates: {
            canonical: `/${lng}/disclaimer`,
            languages: {
                'en': '/en/disclaimer',
                'ko': '/ko/disclaimer',
            },
        },
    };
}

export default async function Page() {
    return <Disclaimer />;
}
