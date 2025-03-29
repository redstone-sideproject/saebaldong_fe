import type { Metadata } from 'next'

import { getMetadata } from '@/constants/metadata'

export const generateMetadata = async (): Promise<Metadata> => {
  return getMetadata({
    title: '기록실',
    description:
      '새발동에서 진행한 5인큐와 여러 스트리머들이 참여한 발로란트 내전 기록을 모두 확인 할 수 있어요',
    path: '/record',
  })
}

export default function RecordLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div>{children}</div>
}
