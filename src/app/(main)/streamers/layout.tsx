import type { Metadata } from 'next'

import { getMetadata } from '@/constants/metadata'

export const generateMetadata = async (): Promise<Metadata> => {
  return getMetadata({
    title: '참여 스트리머 및 통계',
    description:
      '새발동에 참여한 스트리머 및 통계를 확인하세요. 참여횟수, 참여시간, 참여도(%)를 제공합니다.',
    path: '/streamers',
  })
}

export default function StreamersLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div>{children}</div>
}
