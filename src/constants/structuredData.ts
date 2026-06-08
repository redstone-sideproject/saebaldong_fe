import { META } from './metadata'

/**
 * 사이트 전역 WebSite Schema (JSON-LD)
 * GEO 신뢰도 및 검색 SearchAction 노출에 사용
 */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '새발동 게임 통계',
  url: META.url,
  description:
    '새발동은 발로란트 스트리머 새옵동이 주최하는 내전 시리즈입니다. 치지직·유튜브 소속 스트리머들의 게임 참여 통계와 기록을 제공합니다.',
  inLanguage: 'ko-KR',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${META.url}/streamers?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
} as const

interface IFaqItem {
  question: string
  answer: string
}

/**
 * 메인 페이지 FAQ 콘텐츠 (AEO 핵심 — AI 인용 소스)
 */
export const faqList: IFaqItem[] = [
  {
    question: '새발동이란 무엇인가요?',
    answer:
      '"새벽 발로란트 동아리"의 줄임말로 늦은 밤부터 시작하여 아침까지 발로란트 경쟁전을 돌리는 치지직의 스트리머 크루입니다.',
  },
  {
    question: '새발동에 참여한 스트리머는 누구인가요?',
    answer:
      '새발동에 참여한 스트리머 목록과 참여 횟수, 참여 시간, 참여도(%) 통계는 saebaldong.kr/streamers 에서 확인할 수 있습니다.',
  },
  {
    question: '새발동 내전 기록은 어디서 볼 수 있나요?',
    answer:
      '내전 기록은 saebaldong.kr/record/custom, 5인큐 기록은 saebaldong.kr/record/party 에서 확인할 수 있습니다.',
  },
  {
    question: '새발동 타임라인은 무엇인가요?',
    answer:
      '타임라인은 날짜별로 새발동 게임 진행 기록을 정리한 페이지입니다. saebaldong.kr/timeline 에서 확인할 수 있습니다.',
  },
]

/**
 * 메인 페이지 FAQ Schema (JSON-LD)
 */
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqList.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
} as const
