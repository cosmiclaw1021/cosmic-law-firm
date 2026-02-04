import type { Metadata } from 'next';
import Link from '@/components/ui/Link';
import { SITE } from '@/lib/site';
import Icon from '@src/components/Icon';

const titles: Record<string, string> = {
  en: 'Chain of Title | Insides',
  ko: '체인오브타이틀 | 인사이드',
  'zh-Hans': '权利链 | 洞见',
};

const descriptions: Record<string, string> = {
  en: 'Clean paper trails, option letters, and releases that let investors and distributors say yes.',
  ko: '투자자와 배급사가 승인할 수 있도록 모든 계약과 양도, 릴리스 증빙을 정리하는 요약.',
  'zh-Hans': '如何通过清晰的权利链确保持续的项目开发与发行。',
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
      url: `${SITE.url}/${lng}/insights/chain-of-title`,
    },
    alternates: {
      canonical: `/${lng}/insights/chain-of-title`,
      languages: {
        'en': '/en/insights/chain-of-title',
        'ko': '/ko/insights/chain-of-title',
        'zh-Hans': '/zh-Hans/insights/chain-of-title',
      },
    },
  };
}

const highlights = [
  {
    title: 'Why chain of title matters',
    detail:
      'Distributors, financiers, and insurers look for an unbroken trail from the underlying writer, creator, or rights holder through every option, assignment, and release before funding a project. citeturn1search14',
  },
  {
    title: 'Option and assignment clarity',
    detail:
      'A stack of option letters or assignments that lack release language or are not properly dated can derail the chain; during diligence you need to confirm each has been properly exercised and expressly assigned. citeturn1search16',
  },
];

const docs = [
  'Original writer and director agreements with express ownership and deliverable descriptions. citeturn1search14',
  'Option or first-look letters attached with evidence of exercise, notice, and payment. citeturn1search16',
  'Any joint-venture or co-production agreements that allocate IP ownership. citeturn1search14',
  'Releases from third parties whose contributions touch the final product (e.g., stock footage, likenesses). citeturn1search12',
];

const diligenceSteps = [
  'Map all prior rights holders, even if the agreement has not yet closed, and confirm releases before calling the project “cleared.” citeturn1search12',
  'Match every payment or notice in the stack with the paperwork; missing invoices or unsigned releases are red flags. citeturn1search12',
  'Track the territory and media rights on each document; lenders will only finance the media they can insure or distribute. citeturn1search14',
  'Document each transfer in a title memorandum so future deals can be closed without re-walking the same chain. citeturn1search16',
];

const references = [
  {
    label: 'Chain of Title definition (Investopedia)',
    url: 'https://www.investopedia.com/terms/c/chain-of-title.asp',
  },
];

export default async function Page({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;
  const isKo = lng === 'ko';

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-900 min-h-viewport">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-8">
        <div className="text-sm uppercase tracking-[0.3em] text-primary dark:text-primary-light">{isKo ? '인사이드 · 체인오브타이틀' : 'Insides · Chain of Title'}</div>
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">{isKo ? '체인오브타이틀 정리' : 'Chain of Title'}</h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {isKo
              ? '투자가, 보험사, 배급사가 계약서를 검토할 때 가장 먼저 보는 게 체인입니다. 오류가 있으면 딜이 빠르게 지연될 수 있으니 이 페이지에서 빠른 정리 포인트를 확인하세요.'
              : 'Financiers, insurers, and distributors won’t underwrite a deal until they see a clean chain of title from creator to release. Use this digest to keep the paperwork straight and avoid last-minute surprises.'}
          </p>
          <div className="mt-4">
            <Link to="/insights" className="text-sm font-bold uppercase tracking-[0.3em] text-primary dark:text-primary-light inline-flex items-center gap-2">
              {isKo ? '인사이드로 돌아가기' : 'Back to Insides'}
              <Icon name="west" className="size-4" />
            </Link>
          </div>
        </div>

        <section className="space-y-6">
          {highlights.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">{item.title}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.detail}</p>
            </article>
          ))}
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">{isKo ? '중요 문서 리스트' : 'Core documents to track'}</h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 list-disc list-inside">
            {docs.map((doc) => (
              <li key={doc}>{doc}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">{isKo ? '실무 체크' : 'Due diligence steps'}</h3>
          <ol className="space-y-3 list-decimal list-inside text-sm text-slate-600 dark:text-slate-300">
            {diligenceSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="space-y-3">
          <h4 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">{isKo ? '자료 출처' : 'Further reading'}</h4>
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
