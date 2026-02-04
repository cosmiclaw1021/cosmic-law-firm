import type { Metadata } from 'next';
import Link from '@/components/ui/Link';
import { SITE } from '@/lib/site';
import Icon from '@src/components/Icon';

const titles: Record<string, string> = {
  en: 'NIL Basics | Insides',
  ko: 'NIL 기초 | 인사이드',
  'zh-Hans': 'NIL 基础 | 洞见',
};

const descriptions: Record<string, string> = {
  en: 'Quick recap of the NCAA changes, the House settlement, and the new clearinghouse.',
  ko: 'NIL 정착을 위한 NCAA 변경사항, 하원 합의, 클리어링하우스 개요.',
  'zh-Hans': '了解运动员姓名、影像和肖像权（NIL）法律。',
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

const updates = [
  {
    title: 'House settlement clears the clouds',
    body:
      'The House settlement with NIL companies and athletes over $20.5 million of deferred compensation requires a neutral clearinghouse and clearer disclosures before deals over $600 can be booked, making NIL deals easier to audit. citeturn1news50',
  },
  {
    title: 'NCAA pairs back recruiting limits',
    body:
      'NCAA policy now lets schools encourage recruits to pursue NIL deals earlier, while still requiring schools to monitor the deals for academic impacts and conflicts. citeturn1news49',
  },
];

const processItems = [
  'Register every deal, endorsement, or appearance with NIL Go so the clearinghouse can confirm compliance and the 1099 thresholds. citeturn1search2',
  'Keep a central file on each athlete’s adviser and contracts so that schools can prove compliance and allow quick pause if a misstep is flagged. citeturn1search0',
  'Watch the high school and junior college rules that now require disclosure of prominent NIL deals before a player transfers. citeturn1search1',
];

const actionItems = [
  'Have marketing and compliance teams coordinate documents to keep the deal, payment schedule, and deliverables aligned with NCAA guidance. citeturn1search3',
  'Stipulate financial reporting requirements (e.g., $600 threshold) for every athlete so the school can file accurate 1099s. citeturn1search2',
];

const references = [
  { label: 'NCAA NIL overview', url: 'https://www.ncaa.org/sports/2024/3/21/abi' },
  { label: 'NIL Go clearinghouse concept', url: 'https://nil-go.gov' },
];

export default async function Page({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;
  const isKo = lng === 'ko';

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-900 min-h-viewport">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-8">
        <div className="text-sm uppercase tracking-[0.3em] text-primary dark:text-primary-light">{isKo ? '인사이드 · NIL' : 'Insides · NIL'}</div>
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">{isKo ? 'NIL 기초' : 'NIL Basics'}</h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {isKo
              ? '최근 하원 합의와 NCAA 정책 변화는 NIL 계약을 어떻게 기록하고 공개해야 하는지를 다시 정의했습니다.'
              : 'The House settlement, NCAA policy tweaks, and the new clearinghouse are rewriting how deals are filed, disclosed, and taxed.'}
          </p>
          <div className="mt-4">
            <Link to="/insights" className="text-sm font-bold uppercase tracking-[0.3em] text-primary dark:text-primary-light inline-flex items-center gap-2">
              {isKo ? '인사이드로 돌아가기' : 'Back to Insides'}
              <Icon name="west" className="size-4" />
            </Link>
          </div>
        </div>

        <section className="space-y-5">
          {updates.map((update) => (
            <article key={update.title} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">{update.title}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{update.body}</p>
            </article>
          ))}
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">{isKo ? '실무 절차' : 'Process notes'}</h3>
          <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 space-y-2">
            {processItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">{isKo ? '즉시 실행' : 'Action items'}</h3>
          <ul className="list-decimal list-inside text-sm text-slate-600 dark:text-slate-300 space-y-2">
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
