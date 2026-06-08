import type { Metadata } from 'next'

import { getMetadata } from '@/constants/metadata'

export const generateMetadata = async (): Promise<Metadata> => {
  return getMetadata({
    title: '기록실 - 5인큐',
    description:
      '새발동에서 스트리머들이 함께 진행한 발로란트 5인큐(경쟁전) 기록을 확인하세요. 승리·패배·무승부 결과를 한눈에 제공합니다.',
    path: '/record/party',
  })
}

export default function RecordPartyLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div>{children}</div>
}
