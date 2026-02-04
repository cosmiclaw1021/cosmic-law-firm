import type { Metadata } from 'next';
import Link from '@/components/ui/Link';
import { SITE } from '@/lib/site';
import Icon from '@src/components/Icon';

const titles: Record<string, string> = {
  en: 'Rights & Publicity Basics | Insides',
  ko: '퍼블리시티 권리 기초 | 인사이드',
  'zh-Hans': '公开权基础 | 洞见',
};

const descriptions: Record<string, string> = {
  en: 'Rights of publicity, NIL, and how AI deepfakes are tightening the scrutiny around likeness.',
  ko: '퍼블리시티 권리, NIL, 인공지능 딥페이크가 초상 사용을 어떻게 재정의하는지 정리.',
  'zh-Hans': '管理姓名、影像和肖像权的基础法律知识。',
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
    alternates: {
      canonical: `/${lng}/insights/publicity-basics`,
      languages: {
        'en': '/en/insights/publicity-basics',
        'ko': '/ko/insights/publicity-basics',
        'zh-Hans': '/zh-Hans/insights/publicity-basics',
      },
    },
  };
}

const definitions = [
  {
    title: 'Rights of publicity 101',
    body:
      'The right of publicity lets individuals control commercial use of their name, image, voice, or likeness, and the doctrine is state-based so obligations, damages, and permissible uses vary significantly. citeturn0search3',
  },
  {
    title: 'NIL and publicity overlap',
    body:
      'NIL programs and publicity rights intersect because athletes are selling their name, image, or likeness; a clean release must outline the level of control the school or brand retains, and the school must keep the disclosures ready for NCAA review. citeturn1news49',
  },
];

const aiRisks = [
  {
    title: 'Deepfake litigation is global',
    body:
      'Courts in India and other jurisdictions are already ordering takedowns of unauthorized AI films, while Denmark and other nations are crafting laws that explicitly shield individuals from synthetic likenesses. citeturn3news46turn3news51',
  },
  {
    title: 'Federal bills raise the stakes',
    body:
      'The NO FAKES Act and Take It Down Act would force platforms to accept takedown notices for synthetic content that violates publicity rights, and content owners can use the same takedown language in their commercial agreements. citeturn3search47turn3news49',
  },
];

const reminders = [
  'Document exactly which rights are licensed (name, voice, live performances, avatar, AI replicas) and the permitted use cases. citeturn0search3',
  'Link NIL deal terms to the publicity release so you can audit for NCAA headlines and avoid unauthorized derivative content. citeturn1news49',
  'Add a takedown promise that mirrors state/federal law, covering AI-generated content and deepfakes beyond the contract term. citeturn3news49turn3search47',
];

const references = [
  { label: 'Right of Publicity (Cornell Law)', url: 'https://www.law.cornell.edu/wex/right_of_publicity' },
  { label: 'NO FAKES Act summary', url: 'https://www.congress.gov/bill/118th-congress/house-bill/1940' },
];

export default async function Page({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;
  const isKo = lng === 'ko';

  return (
    <div className="py-12 bg-white dark:bg-[#020712] min-h-viewport">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-8">
        <div className="text-sm uppercase tracking-[0.3em] text-primary dark:text-primary-light">
          {isKo ? '인사이드 · 퍼블리시티' : 'Insides · Rights & Publicity'}
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
            {isKo ? '퍼블리시티 권리 기초' : 'Rights & Publicity Basics'}
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {isKo
              ? '이름, 이미지, 퍼블리시티 권리는 AI 시대에 더 엄격해졌습니다. 계약과 정책에서 어떤 항목을 점검해야 하는지 소개합니다.'
              : 'Name, image, and likeness rights are under greater scrutiny as AI can reproduce likenesses instantly. Keep this short guide handy when drafting releases and NIL deals.'}
          </p>
          <div className="mt-4">
            <Link to="/insights" className="text-sm font-bold uppercase tracking-[0.3em] text-primary dark:text-primary-light inline-flex items-center gap-2">
              {isKo ? '인사이드로 돌아가기' : 'Back to Insides'}
              <Icon name="west" className="size-4" />
            </Link>
          </div>
        </div>

        <section className="space-y-6">
          {definitions.map((item) => (
            <article key={item.title} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-6">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">{item.title}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">{isKo ? 'AI 관련 리스크' : 'AI risk snapshot'}</h3>
          <div className="space-y-4">
            {aiRisks.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h4>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">{isKo ? '기억할 점' : 'Friendly reminders'}</h3>
          <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 space-y-2">
            {reminders.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h4 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">{isKo ? '참고자료' : 'References'}</h4>
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
