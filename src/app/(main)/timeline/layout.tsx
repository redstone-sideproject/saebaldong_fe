import type { Metadata } from 'next'

import { getMetadata } from '@/constants/metadata'

export const generateMetadata = async (): Promise<Metadata> => {
  return getMetadata({
    title: '날짜별 게임 기록',
    description:
      '새발동에서 진행한 발로란트 게임 기록을 날짜별 타임라인으로 확인하세요. 내전과 5인큐 진행 기록을 날짜별로 정리해 제공합니다.',
    path: '/timeline',
  })
}

export default function TimelineLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div>{children}</div>
}
