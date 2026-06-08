import type { Metadata } from 'next'

import { getMetadata } from '@/constants/metadata'

export const generateMetadata = async (): Promise<Metadata> => {
  return getMetadata({
    title: '기록실 - 내전',
    description:
      '새발동에서 여러 스트리머들이 팀을 나눠 진행한 발로란트 내전 기록을 확인하세요. 새발동 회원 또는 픽셀 소속 스트리머가 3~4명 이상 모인 내전을 기록합니다.',
    path: '/record/custom',
  })
}

export default function RecordCustomLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div>{children}</div>
}
