import { Metadata } from 'next'

interface IGenerateMetadataProps {
  title?: string
  description?: string
  path?: string
}

export const META = {
  title: '새발동 | 새발동 게임 통계',
  siteName: 'saebaldong.kr',
  description:
    '새발동에서 진행한 게임 정보를 제공합니다. 새발동 참여 스트리머 및 통계를 확인하세요.',
  keyword: [
    '새발동',
    '새옵동',
    '발로란트',
    '발로',
    '치지직',
    '유튜브',
    '통계',
    '스트리머',
  ],
  url: 'https://saebaldong.kr',
  googleVerification: '6fc81db361f091c43bd0e96750c8ecd93cd5badf',
  naverVerification: '6fc81db361f091c43bd0e96750c8ecd93cd5badf',
  ogImage: '/opengraph-image.png',
} as const

export const getMetadata = (metadataProps?: IGenerateMetadataProps) => {
  const { title, description, path } = metadataProps || {}

  const TITLE = title ? `새발동 | ${title}` : META.title
  const DESCRIPTION = description || META.description
  const PAGE_URL = path ? path : ''

  const metadata: Metadata = {
    metadataBase: new URL(META.url),
    title: TITLE,
    description: DESCRIPTION,
    keywords: [...META.keyword],

    // og
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      siteName: TITLE,
      locale: 'ko_KR',
      type: 'website',
      url: PAGE_URL,
      images: {
        url: META.ogImage,
      },
    },

    // 트위터
    twitter: {
      title: TITLE,
      description: DESCRIPTION,
      images: {
        url: META.ogImage,
      },
    },

    // 검색 최적화
    verification: {
      google: META.googleVerification,
      other: {
        'naver-site-verification': META.naverVerification,
      },
    },
    icons: {
      shortcut:
        'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎮</text></svg>',
    },
  }

  return metadata
}
