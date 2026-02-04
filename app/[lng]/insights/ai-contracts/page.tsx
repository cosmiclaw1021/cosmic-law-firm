import type { Metadata } from 'next';
import Link from '@/components/ui/Link';
import { SITE } from '@/lib/site';
import Icon from '@src/components/Icon';
import ProcessedText from '@/components/ProcessedText';

const titles: Record<string, string> = {
  en: 'AI Contracts | Insides',
  ko: 'AI 계약 | 인사이드',
  'zh-Hans': 'AI 合同 | 洞见',
};

const descriptions: Record<string, string> = {
  en: 'Clause map for indemnities, data rights, and audit controls when AI vendors touch your IP.',
  ko: 'AI 공급업체가 지식재산에 다가올 때 다뤄야 할 면책, 데이터 권리, 감사 제어에 대한 조항 가이드.',
  'zh-Hans': '当 AI 供应商触及您的知识产权时，关于补偿、数据权利和审计控制的条款指南。',
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
      url: `${SITE.url}/${lng}/insights/ai-contracts`,
    },
    alternates: {
      canonical: `/${lng}/insights/ai-contracts`,
      languages: {
        'en': '/en/insights/ai-contracts',
        'ko': '/ko/insights/ai-contracts',
        'zh-Hans': '/zh-Hans/insights/ai-contracts',
      },
    },
  };
}

const items = [
  {
    title: 'Data sourcing & training rights',
    body:
      'Given the recent Anthropic settlement over training data, it is essential to require vendors to warrant that no unauthorized proprietary or personal data is in the models and that they will document every dataset used for your deliverables. citeturn4search5turn4search4',
  },
  {
    title: 'Indemnity & liability',
    body:
      'Insist on indemnities that cover IP infringement, regulatory fines, and misuse of likeness; cap liabilities only when the counterparty can prove a robust risk transfer strategy. citeturn4search0',
  },
  {
    title: 'Transparency & audit',
    body:
      'Ask for audit rights over training data, red-teaming outputs, and the logs showing when human review kicked in—without this you can never prove compliance or fulfill disclosure obligations to talent unions. citeturn4search4',
  },
  {
    title: 'Operational guardrails',
    body:
      'Include a mitigation plan that flags misuses (e.g., recreated likenesses, biased outputs) and anchors the vendor’s obligation to pause deployment until humans clear the content. citeturn4news48',
  },
];

const actionItems = [
  'Publish a vendor questionnaire that tracks datasets, red-team findings, and usage history for each piece of work. citeturn4search0',
  'Document human-in-the-loop checkpoints in the contract so the developer cannot claim the model is fully autonomous during audits. citeturn4search4',
  'Include a procedural review section that requires the vendor to document datasets, human oversight, and mitigation plans. citeturn5news48',
  'Draft a fallback clause requiring the vendor to pull down any unauthorized synthetic likeness upon notice. citeturn3news49',
  'Build a takedown remedy tied to the general AI policy (white paper) so you can quickly remove unauthorized synthetic likeness. citeturn3news49',
];

const references = [
  { label: 'ACC AI and Emerging Issues initiative', url: 'https://www.acc.com/initiative/ai-emerging-issues' },
  { label: 'Anthropic settlement coverage', url: 'https://apnews.com/article/anthropic-settlement' },
];

export default async function Page({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;
  const isKo = lng === 'ko';

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-900 min-h-viewport">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-8">
        <div className="text-sm uppercase tracking-[0.3em] text-primary dark:text-primary-light">{isKo ? '인사이드 · AI 계약' : 'Insides · AI Contracts'}</div>
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">{isKo ? 'AI 계약 점검표' : 'AI Contracts'}</h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {isKo
              ? '모델, API, 알고리즘과 관련된 조항들이 전통적인 계약과는 다른 이슈를 띄고 있습니다. 여기서는 꼭 넣어야 할 보증, 면책, 감사 약속을 정리합니다.'
              : 'AI vendors blur data rights, indemnity, and compliance, so the contracts need explicit clauses for training materials, discovery, and human oversight before you deploy the output.'}
          </p>
          <div className="mt-4">
            <Link to="/insights" className="text-sm font-bold uppercase tracking-[0.3em] text-primary dark:text-primary-light inline-flex items-center gap-2">
              {isKo ? '인사이드로 돌아가기' : 'Back to Insides'}
              <Icon name="west" className="size-4" />
            </Link>
          </div>
        </div>

        <section className="space-y-5">
          {items.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">{item.title}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <ProcessedText text={item.body} />
              </p>
            </article>
          ))}
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">{isKo ? '즉시 실행 항목' : 'Action items'}</h3>
          <ul className="space-y-2 list-disc list-inside text-sm text-slate-600 dark:text-slate-300">
            {actionItems.map((item) => (
              <li key={item}>
                <ProcessedText text={item} />
              </li>
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
