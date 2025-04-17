import type { Metadata } from 'next'

import { getMetadata } from '@/constants/metadata'

export const generateMetadata = async (): Promise<Metadata> => {
  return getMetadata({
    title: '날짜별 게임 기록 ',
    description: '새발동에서 진행한 게임 기록을 확인하세요.',
    path: '/timline',
  })
}

export default function TimelineLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div>{children}</div>
}
