import type { Metadata } from 'next';
import Link from '@/components/ui/Link';
import { SITE } from '@/lib/site';
import Icon from '@src/components/Icon';

const titles: Record<string, string> = {
  en: 'AI in Entertainment | Insides',
  ko: '엔터테인먼트 AI | 인사이드',
  'zh-Hans': '娱乐行业的 AI | 洞见',
};

const descriptions: Record<string, string> = {
  en: 'How AI, digital replicas, and policy shifts are reshaping rights, production, and publicity.',
  ko: 'AI와 디지털 복제, 정책 변화가 권리, 제작, 퍼블리시티를 어떻게 바꾸는지 정리.',
  'zh-Hans': 'AI 正在重塑权利边界、安全和制作流程。',
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
    alternates: {
      canonical: `/${lng}/insights/ai-in-entertainment`,
      languages: {
        'en': '/en/insights/ai-in-entertainment',
        'ko': '/ko/insights/ai-in-entertainment',
        'zh-Hans': '/zh-Hans/insights/ai-in-entertainment',
      },
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

const snapshots = [
  {
    title: 'Digital replica consent is now non-negotiable',
    body:
      'Most new SAG-AFTRA agreements require companies to get clear consent and compensation for digital replicas, commercials, and interactive characters before using AI avatars or likenesses, so talent teams lock in the scope of use up front. citeturn5search0turn5search2',
  },
  {
    title: 'Interactive media and games have AI guardrails',
    body:
      'The 2023 interactive media addendum projects into episodic series and games, requiring disclosure when synthetic voices or faces replace an actor and ensuring performers can audit how the material is generated. citeturn5search1',
  },
  {
    title: 'Studios are investing heavily in AI tooling',
    body:
      'Deals like the recent Disney-AI investment show studios are adopting generative systems for everything from storyboarding to casting data, which increases the appetite for clear data rights and compliance. citeturn5news43',
  },
];

const riskPoints = [
  {
    title: 'Deepfakes are crossing national lines',
    body:
      'Courts in India and bills such as the Virginia “Take It Down Act” are reacting to unauthorized deepfakes of public figures, so entertainment teams should create a robust takedown and litigation strategy before AI usage spikes. citeturn3news46turn3news49',
  },
  {
    title: 'Politicians keep updating publicity laws',
    body:
      'As states pass new publicity legislation and Congress debates national guardrails, brands must treat name/image/likeness as a moving target, especially when AI can reproduce famous voices or avatars without permission. citeturn3news48turn3news51',
  },
];

const actionItems = [
  'Label every deliverable that uses AI-generated visuals or audio so the creative team can track inputs and rights holders. citeturn5news48',
  'Include a procedural review section that requires the vendor to document datasets, human oversight, and mitigation plans. citeturn5news48',
  'Draft a fallback clause requiring the vendor to pull down any unauthorized synthetic likeness upon notice. citeturn3news49',
];

export default async function Page({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;
  const isKo = lng === 'ko';

  return (
    <div className="py-12 bg-white dark:bg-[#020712] min-h-viewport">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-8">
        <div className="text-sm uppercase tracking-[0.3em] text-primary dark:text-primary-light">{isKo ? '인사이드 · AI' : 'Insides · AI'}</div>
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">{isKo ? 'AI와 엔터테인먼트' : 'AI in Entertainment'}</h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {isKo
              ? 'AI가 제작, 촬영, 퍼블리시티를 바꾸고 있습니다. 중요한 사례를 빠르게 보고 계약과 정책 검토에 집중하세요.'
              : 'AI is already reshaping production, publicity, and talent rights. Here is a quick look at where the technology is live, how regulators and unions are responding, and what you should lock into your process.'}
          </p>
          <div className="mt-4">
            <Link to="/insights" className="text-sm font-bold uppercase tracking-[0.3em] text-primary dark:text-primary-light inline-flex items-center gap-2">
              {isKo ? '인사이드로 돌아가기' : 'Back to Insides'}
              <Icon name="west" className="size-4" />
            </Link>
          </div>
        </div>

        <section className="space-y-6">
          {snapshots.map((snapshot) => (
            <article key={snapshot.title} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-6">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">{snapshot.title}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{snapshot.body}</p>
            </article>
          ))}
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">{isKo ? '리스크 요약' : 'Risk snapshot'}</h3>
          <div className="space-y-4">
            {riskPoints.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h4>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">{isKo ? '우선 실행 항목' : 'Action items'}</h3>
          <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 space-y-2">
            {actionItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h4 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">{isKo ? '자료 출처' : 'References'}</h4>
          <div className="space-y-2 text-sm text-primary dark:text-primary-light">
            {references.map((ref) => (
              <Link key={ref.url} to={ref.url} external className="block underline">
                {ref.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
