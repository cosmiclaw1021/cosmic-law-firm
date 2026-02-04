import type { Metadata } from 'next';
import Link from '@/components/ui/Link';
import { SITE } from '@/lib/site';
import Icon from '@src/components/Icon';

const titles: Record<string, string> = {
  en: 'Contract Red Flags | Insides',
  ko: '계약 위험 신호 | 인사이드',
  'zh-Hans': '合同红旗条款 | 洞见',
};

const descriptions: Record<string, string> = {
  en: 'Checklist of the clauses and deliverables that typically leave creators out of future revenue or control.',
  ko: '크리에이터가 후속 수익이나 통제를 잃지 않도록 점검해야 할 핵심 조항 목록.',
  'zh-Hans': '在签字前识别隐藏的权利转让和风险条款。',
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
    alternates: {
      canonical: `/${lng}/insights/contract-red-flags`,
      languages: {
        'en': '/en/insights/contract-red-flags',
        'ko': '/ko/insights/contract-red-flags',
        'zh-Hans': '/zh-Hans/insights/contract-red-flags',
      },
    },
  };
}

const redFlags = [
  {
    title: 'Perpetual, worldwide grants',
    detail:
      'Clauses that assign or license rights “in perpetuity,” “worldwide,” or “in all media now known or hereafter devised” leave creators without room to re-license or renegotiate future formats, so push for narrowing the term and territory. citeturn0search5',
  },
  {
    title: 'Work-for-hire without clarity',
    detail:
      'When the contract recites a work-for-hire or assignment but the project elements are undefined, confirm the expressed consideration, whether residuals are owed, and the treatment of future derivatives. citeturn0search5',
  },
  {
    title: 'Undefined deliverables and payment',
    detail:
      'Vague statements about “content” or deliverables that omit payment timing invite scope creep; insist on concrete milestones, payment dates, and a revision budget. citeturn0search4',
  },
  {
    title: 'No audit or termination protections',
    detail:
      'Agreements that deny audit or terminate only “for cause” trap creators even when the company sits on inaccurate accounting; ask for audit access and a defined cure period. citeturn0search4',
  },
  {
    title: 'Blanket exclusivity or warranty promises',
    detail:
      'Broad warranties about infringement or exclusivity should be scoped to the creator’s actual control and limited to the agreed deliverables so the artist is not on the hook for unknown third-party rights. citeturn0search5',
  },
];

const checklist = [
  'Get all underlying assignments or licenses in writing so the lead contract can cite clean chain-of-title pages. citeturn0search6',
  'Demand a defined audit clause with a reasonable notice period and caps on audit burdens. citeturn0search6',
  'Clarify exit rights: at a minimum, negotiate a short cure period and a termination-for-convenience fall-back. citeturn0search6',
  'Make sure all territories, media, and timeframes are enumerated; if not, treat them as limited to the initial campaign. citeturn0search6',
];

const references = [
  { label: 'Entertainment Contract Red Flag Checklist', url: 'https://sistagirljd.com/entertainment-contract-red-flag-checklist/' },
  { label: 'Common Entertainment Contract Red Flags', url: 'https://www.creatorcontracts.com/blog/entertainment-contract-red-flags/' },
  { label: 'Contract Decoder Guide to Keeping Control', url: 'https://www.contractdecoder.com/guide/' },
];

export default async function Page({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;
  const isKo = lng === 'ko';

  return (
    <div className="py-12 bg-white dark:bg-[#020712] min-h-viewport">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-8">
        <div className="text-sm uppercase tracking-[0.3em] text-primary dark:text-primary-light">
          {isKo ? '인사이드 · 계약' : 'Insides · Contracts'}
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
            {isKo ? '계약 리스크 레드 플래그' : 'Contract Red Flags'}
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {isKo
              ? '계약 문구 하나가 수익, 저작권, 재협상 기회를 봉쇄할 수 있습니다. 아래 체크리스트로 최소 검토 포인트를 빠르게 확인하세요.'
              : 'A single clause can lock away royalties, rights, or future leverage. Use the snapshots below to flag the terms that need fixing before you sign.'}
          </p>
          <div className="mt-4">
            <Link
              to="/insights"
              className="text-sm font-bold uppercase tracking-[0.3em] text-primary dark:text-primary-light inline-flex items-center gap-2"
            >
              {isKo ? '인사이드로 돌아가기' : 'Back to Insides'}
              <Icon name="west" className="size-4" />
            </Link>
          </div>
        </div>

        <section className="space-y-5">
          {redFlags.map((flag) => (
            <article key={flag.title} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-6">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">{flag.title}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{flag.detail}</p>
            </article>
          ))}
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">{isKo ? '가상 체크리스트' : 'Checklist before you initial'}</h3>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300 list-disc list-inside">
            {checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
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
