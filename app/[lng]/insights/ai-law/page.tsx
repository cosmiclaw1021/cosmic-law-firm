import type { Metadata } from 'next';
import Link from '@/components/ui/Link';
import { SITE } from '@/lib/site';
import Icon from '@src/components/Icon';
import ProcessedText from '@/components/ProcessedText';

const titles: Record<string, string> = {
  en: 'What’s in AI Law | Insides',
  ko: 'AI 법률 현황 | 인사이드',
  'zh-Hans': 'AI 监管 | 洞见',
};

const descriptions: Record<string, string> = {
  en: 'Federal executive orders, state bills, and the EU AI Act that are shaping the legal landscape.',
  ko: '연방 행정명령, 주 법안, EU AI 법안이 법적 환경을 어떻게 구성하는지 정리.',
  'zh-Hans': '联邦行政命令、州法案和欧盟 AI 法案正在重塑法律格局。',
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
    alternates: {
      canonical: `/${lng}/insights/ai-law`,
      languages: {
        'en': '/en/insights/ai-law',
        'ko': '/ko/insights/ai-law',
        'zh-Hans': '/zh-Hans/insights/ai-law',
      },
    },
  };
}

const timeline = [
  {
    title: 'Federal AI blueprint',
    body:
      'The White House issued a new executive order aligning AI oversight across agencies, tied to the national AI R&D roadmap and giving NIST more weight for risk-based standards while urging the Commerce and Justice departments to curb conflicting state laws. citeturn2search0turn2news52turn3search2',
  },
  {
    title: 'EU AI Act enforcement',
    body:
      'The EU AI Act will begin supervision in 2026 with fines up to 7% of worldwide turnover for prohibited systems, and it forces providers to document training data, maintain technical documentation, and run post-launch monitoring. citeturn2search1turn2search4',
  },
  {
    title: 'State and publicity laws',
    body:
      'California’s SB-53 (AI transparency for biometrics) and Texas’ SB-20 (generative AI protections for kids) join proposed federal NO FAKES/Take It Down bills that all require prompt notice and takedowns when likeness or deepfakes stray outside the licensed use. citeturn3search58turn3search57turn3search47turn3news49',
  },
  {
    title: 'Congressional disclosure pushes',
    body:
      'The Generative AI Copyright Disclosure Act would require creators to label AI-assisted works and detail the datasets used, while similar proposals add transparency requirements for training data provenance. citeturn5search58',
  },
];

const actionItems = [
  'Create an AI policy map that documents which federal/state laws apply to each deliverable, so you can coordinate compliance and reduce contradictory notice obligations. citeturn2search0turn3search58',
  'Update talent releases to anticipate wider jurisdictional requirements (e.g., California biometrics law, Texas protection for children). citeturn3search58turn3search57',
  'Include a procedural review section that requires the vendor to document datasets, human oversight, and mitigation plans. citeturn5news48',
  'Draft a fallback clause requiring the vendor to pull down any unauthorized synthetic likeness upon notice. citeturn3news49',
  'Track EU and federal reporting duties so you can file systematic risk assessments before deployment. citeturn2search1turn2search4',
];

const references = [
  { label: 'White House AI initiative', url: 'https://www.whitehouse.gov/ostp/ai/' },
  { label: 'EU AI Act policy page', url: 'https://digital-strategy.ec.europa.eu/en/policies/european-ai-act' },
];

export default async function Page({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;
  const isKo = lng === 'ko';

  return (
    <div className="py-12 bg-white dark:bg-[#020712] min-h-viewport">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-8">
        <div className="text-sm uppercase tracking-[0.3em] text-primary dark:text-primary-light">{isKo ? '인사이드 · AI 법률' : 'Insides · AI Law'}</div>
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">{isKo ? 'AI 법률 최신' : 'What’s in AI Law'}</h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {isKo
              ? '연방, 주, 국제 차원의 AI 입법에 대비해야 합니다. 새로운 명령과 법안이 어떤 의무를 만들고 있는지 빠르게 훑고, 체크리스트를 정리하세요.'
              : 'Stay on top of the executive orders, state bills, and EU directives that are redefining accountability, transparency, and takedowns for AI-driven creative work.'}
          </p>
          <div className="mt-4">
            <Link to="/insights" className="text-sm font-bold uppercase tracking-[0.3em] text-primary dark:text-primary-light inline-flex items-center gap-2">
              {isKo ? '인사이드로 돌아가기' : 'Back to Insides'}
              <Icon name="west" className="size-4" />
            </Link>
          </div>
        </div>

        <section className="space-y-5">
          {timeline.map((item) => (
            <article key={item.title} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-6">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">{item.title}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">{isKo ? '실무 체크리스트' : 'Action items'}</h3>
          <ul className="space-y-2 list-disc list-inside text-sm text-slate-600 dark:text-slate-300">
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
