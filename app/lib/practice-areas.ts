import type { IconName } from '@src/components/Icon';

export type PracticeArea = {
  slug: string;
  title: string;
  titleKo: string;
  titleZh: string;
  shortTitle: string;
  shortTitleKo: string;
  shortTitleZh: string;
  focus: string;
  focusKo: string;
  focusZh: string;
  summary: string;
  summaryKo?: string;
  summaryZh?: string;
  icon: IconName;
  overview?: string[];
  overviewKo?: string[];
  overviewZh?: string[];
  services: string[];
  servicesKo?: string[];
  servicesZh?: string[];
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: 'entertainment-media-law',
    title: 'Entertainment & Media Law',
    titleKo: '엔터테인먼트 & 미디어 법률',
    titleZh: '娱乐与媒体法',
    shortTitle: 'Entertainment',
    shortTitleKo: '엔터테인먼트',
    shortTitleZh: '娱乐',
    focus: 'Transactional and litigation counsel for the entertainment industry.',
    focusKo: '엔터테인먼트 업계를 위한 트랜잭션 및 소송 자문',
    focusZh: '娱乐行业的交易与诉讼法律顾问。',
    summary:
      'Full-spectrum entertainment counsel—from contracts and negotiations to disputes—built for creators, studios, and media businesses.',
    summaryKo:
      '계약·협상부터 분쟁까지, 크리에이터·스튜디오·미디어 비즈니스를 위한 엔터테인먼트 전 영역 법률 자문을 제공합니다.',
    summaryZh:
      '面向创作者、制片方与媒体企业的全流程娱乐法律服务——从合同谈判到争议处理。',
    icon: 'theaters',
    overview: [
      'Cosmic Law Firm’s entertainment and media law practice covers both transactional and litigation matters for clients.',
      'We support clients across film, television, music, theatre, video games, and new media with dealmaking, rights management, and dispute strategy.',
    ],
    overviewKo: [
      'Cosmic Law Firm은 엔터테인먼트 및 미디어 분야에서 트랜잭션과 소송을 모두 아우르는 서비스를 제공합니다.',
      '영화, TV, 음악, 공연, 게임, 뉴미디어 전반에 걸쳐 계약·권리·분쟁 전략을 지원합니다.',
    ],
    overviewZh: [
      'Cosmic Law Firm 的娱乐与媒体法律实践涵盖客户的交易与诉讼事务。',
      '我们支持电影、电视、音乐、戏剧、视频游戏和新媒体领域的客户，提供交易、权利管理和纠纷策略支持。',
    ],
    services: [
      'Intellectual Property Litigation',
      'Defamation and Right of Privacy Litigation',
      'Financing, Profit Participation and Accounting-Related Litigation',
      'Independent Film & Television Alliance (IFTA) Arbitrations',
      'California Labor Commission Proceedings',
      'Contracts and Negotiations',
      'Intellectual Property Licensing and Consulting',
      'Film and Television Production',
      'Film Financing',
      'Talent Representation',
      'Music',
      'Theatre',
      'Video Games and New Media',
    ],
    servicesKo: [
      '지식재산권 소송',
      '명예훼손 및 사생활(프라이버시)권 소송',
      '자금조달·수익분배·회계 관련 소송',
      '독립영화·TV 연맹(IFTA) 중재',
      '캘리포니아 노동위원회 절차',
      '계약 작성 및 협상',
      '지식재산권 라이선스 및 자문',
      '영화·TV 제작',
      '영화 투자·자금조달',
      '아티스트(탤런트) 대리',
      '음악',
      '공연·연극',
      '게임 및 뉴미디어',
    ],
    servicesZh: [
      '知识产权诉讼',
      '名誉侵权与隐私权诉讼',
      '融资、分成与会计相关诉讼',
      '独立电影与电视联盟（IFTA）仲裁',
      '加州劳动委员会程序',
      '合同起草与谈判',
      '知识产权许可与咨询',
      '电影与电视制作',
      '电影融资',
      '艺人/人才代理',
      '音乐',
      '戏剧与舞台',
      '电子游戏与新媒体',
    ],
  },
  {
    slug: 'copyright-infringement',
    title: 'Copyright Infringement',
    titleKo: '저작권 침해',
    titleZh: '著作权侵权',
    shortTitle: 'Copyright',
    shortTitleKo: '저작권',
    shortTitleZh: '著作权',
    focus: 'Enforcement, defense, counseling, and licensing disputes.',
    focusKo: '권리 행사·방어·자문·라이선스 분쟁',
    focusZh: '权利主张、防御、咨询与许可争议。',
    summary:
      'We help clients protect creative works, enforce rights against infringement, and reduce risk through clear guidance and strategic action.',
    summaryKo:
      '창작물을 보호하고 침해에 대응하며, 명확한 자문과 전략적 실행으로 리스크를 줄입니다.',
    summaryZh:
      '我们帮助客户保护作品、对侵权采取行动，并通过清晰指引与策略降低风险。',
    icon: 'copyright',
    overview: [
      'Copyright safeguards a wide range of creative expressions, including visual arts, music, architectural designs, source code, software, literary works, and sculptures.',
      'Our copyright lawyers focus on two main objectives: pursuing legal action against those who infringe on our clients’ copyrights and assisting clients in avoiding copyright infringement.',
      'In the digital age, we counsel on DMCA issues, fair use, licensing, and disputes so clients can move quickly while staying protected.',
    ],
    overviewKo: [
      '저작권은 미술, 음악, 건축, 소프트웨어, 문학 등 다양한 창작물을 보호합니다.',
      '저희는 권리 침해에 대한 적극적 대응과, 침해 위험을 줄이기 위한 사전 자문에 집중합니다.',
      '디지털 시대의 DMCA, 공정이용, 라이선스, 분쟁을 실무 중심으로 지원합니다.',
    ],
    overviewZh: [
      '版权保护广泛的创意表达，包括视觉艺术、音乐、建筑设计、源代码、软件、文学作品和雕塑。',
      '我们的版权律师专注于两个主要目标：对侵犯客户版权的行为采取法律行动，并协助客户避免侵犯他人版权。',
      '在数字时代，我们就 DMCA 问题、合理使用、许可和争议提供建议，以便客户在保持受保护的同时快速行动。',
    ],
    services: [
      'Copyright registration strategy and filings',
      'Infringement enforcement and defense',
      'Licensing and contract disputes',
      'DMCA takedown and counter-notice strategy',
      'Fair use and clearance guidance',
      'Chain-of-title and ownership analysis',
      'Remedies strategy (injunctions, damages, fees)',
      'Portfolio counseling for creators and businesses',
    ],
    servicesKo: [
      '저작권 등록 전략 및 신청',
      '침해 대응(권리 행사) 및 방어',
      '라이선스 및 계약 분쟁',
      'DMCA 삭제요청 및 이의제기(반박 통지) 전략',
      '공정이용 및 클리어런스(사용 허가) 자문',
      '권리 연쇄(체인 오브 타이틀) 및 소유권 분석',
      '구제수단 전략(가처분, 손해배상, 비용)',
      '크리에이터·기업을 위한 포트폴리오 자문',
    ],
    servicesZh: [
      '著作权登记/注册策略与申请',
      '侵权维权与抗辩',
      '许可与合同争议',
      'DMCA 下架与反通知策略',
      '合理使用与清权/授权审查建议',
      '权属链与所有权分析',
      '救济策略（禁令、损害赔偿、费用）',
      '面向创作者与企业的作品/资产组合咨询',
    ],
  },
  {
    slug: 'trademark-law',
    title: 'Trademark Law',
    titleKo: '상표법',
    titleZh: '商标法',
    shortTitle: 'Trademark',
    shortTitleKo: '상표',
    shortTitleZh: '商标',
    focus: 'Brand protection for names, titles, and logos.',
    focusKo: '이름·타이틀·로고 등 브랜드 보호',
    focusZh: '名称、标题和徽标的品牌保护。',
    summary:
      'We help clients clear, register, license, and enforce trademarks so brands can grow with confidence.',
    summaryKo:
      '상표 검색부터 등록·라이선스·권리행사까지 지원해 브랜드가 안심하고 성장하도록 돕습니다.',
    summaryZh:
      '我们协助客户进行商标检索、注册、许可与维权，让品牌更安心地成长。',
    icon: 'verified',
    overview: [
      'Trademarks protect the brands audiences recognize—names, titles, logos, and other identifiers used in commerce.',
      'We guide clients through clearance, registration, and enforcement so brand investments remain protectable and enforceable.',
    ],
    overviewKo: [
      '상표는 이름, 타이틀, 로고 등 시장에서 식별되는 브랜드 요소를 보호합니다.',
      '저희는 검색·출원·등록·라이선스·분쟁 대응까지 브랜드 보호 전 과정을 지원합니다.',
    ],
    overviewZh: [
      '商标保护观众认可的品牌——名称、标题、徽标和商业中使用的其他标识。',
      '我们指导客户进行查询、注册和主张权利，确保品牌投资保持受保护且可执行。',
    ],
    services: [
      'Trademark clearance searches and risk counseling',
      'Trademark applications and prosecution',
      'Portfolio strategy and renewals',
      'Licensing and brand deal terms',
      'Oppositions, cancellations, and enforcement',
      'Infringement and unfair competition disputes',
      'Online enforcement and takedown strategy',
    ],
    servicesKo: [
      '상표 선행조사 및 리스크 자문',
      '상표 출원 및 심사 대응',
      '포트폴리오 전략 및 갱신',
      '라이선스 및 브랜드 딜 조건',
      '이의신청·취소심판·권리행사',
      '침해 및 부정경쟁 분쟁',
      '온라인 권리행사 및 삭제요청 전략',
    ],
    servicesZh: [
      '商标检索与风险评估咨询',
      '商标申请与审查答复',
      '组合策略与续展',
      '许可与品牌合作条款',
      '异议、无效/撤销与维权',
      '侵权与不正当竞争纠纷',
      '线上维权与下架策略',
    ],
  },
  {
    slug: 'personal-injury-law',
    title: 'Personal Injury Law',
    titleKo: '개인상해법',
    titleZh: '人身伤害法',
    shortTitle: 'Injury',
    shortTitleKo: '상해',
    shortTitleZh: '伤害',
    focus: 'Recovery-focused counsel for victims of accidents, negligence, and unsafe conditions.',
    focusKo: '사고, 과실, 위험한 환경으로 다친 고객을 위한 회복 중심의 자문',
    focusZh: '为事故、过失和不安全条件的受害者提供以康复为中心的咨询。',
    summary:
      'We represent individuals who suffered physical or emotional harm, securing compensation for medical care, lost income, and future needs after crashes, defective products, medical errors, and other preventable incidents.',
    summaryKo:
      '교통사고, 제품 결함, 의료 과실 등 예방 가능한 사건으로 신체·정신적 피해를 입은 분들을 대리해 치료비, 소득 손실, 향후 필요 비용에 대한 보상을 확보합니다.',
    summaryZh:
      '我们代理因交通事故、缺陷产品、医疗失误等可预防事件遭受身心伤害的当事人，争取医疗费用、误工损失及未来需求的赔偿。',
    icon: 'medical_services',
    overview: [
      'Personal injury law covers a wide spectrum of accidents, from vehicle collisions and wrongful death matters to product defects, premises liability, and medical malpractice.',
      'We build each claim around careful investigations, medical experts, and strategic negotiations so clients are not left managing insurance games while still recovering from trauma.',
    ],
    overviewKo: [
      '개인상해법은 차량 충돌, 사망 사건, 제품 결함, 부동산 책임, 의료 과실 등 다양한 사고를 포괄합니다.',
      '저희는 의료 전문가와 조사를 연계해 전략적으로 협상하며, 트라우마 회복에 집중할 수 있도록 보험 게임에 고객이 휘둘리지 않도록 조력합니다.',
    ],
    overviewZh: [
      '人身伤害法涵盖广泛的事故，从车辆碰撞和非正常死亡事项到产品缺陷、场所责任和医疗事故。',
      '我们围绕仔细的调查、医学专家和战略谈判建立每项索赔，以便客户在从创伤中恢复时不必处理保险游戏。',
    ],
    services: [
      'Automobile and motorcycle accident litigation',
      'Catastrophic injury claims (brain, spinal, burn, amputation)',
      'Premises liability (slips, falls, negligent security, swimming pools)',
      'Product liability and defective equipment recalls',
      'Medical malpractice and delayed diagnosis cases',
      'Workplace third-party claims and construction-site incidents',
      'Wrongful death and family support settlements',
      'Insurance bad-faith, underpayment, and settlement negotiation',
    ],
    servicesKo: [
      '자동차·오토바이 사고 소송',
      '중대 상해 청구(뇌, 척수, 화상, 절단)',
      '시설/장소 책임(미끄럼·낙상, 보안 과실, 수영장 등)',
      '제조물책임 및 결함 장비/리콜',
      '의료 과실 및 진단 지연 사건',
      '직장 제3자 청구 및 건설현장 사고',
      '사망(불법행위) 및 유족 부양 합의',
      '보험사의 악의적 처리, 과소지급 및 합의 협상',
    ],
    servicesZh: [
      '汽车与摩托车事故诉讼',
      '严重伤害索赔（脑、脊髓、烧伤、截肢）',
      '场所责任（滑倒摔倒、安保过失、泳池等）',
      '产品责任与缺陷设备/召回',
      '医疗过失与延误诊断',
      '职场第三方索赔与工地事故',
      '非正常死亡与家属扶养/抚慰金和解',
      '保险恶意、少赔/拒赔与和解谈判',
    ],
  },
];

export const getPracticeAreaBySlug = (slug: string) =>
  practiceAreas.find((area) => area.slug === slug);
