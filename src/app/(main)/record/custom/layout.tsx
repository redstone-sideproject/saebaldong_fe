import type { Metadata } from 'next'

import { getMetadata } from '@/constants/metadata'

export const generateMetadata = async (): Promise<Metadata> => {
  return getMetadata({
    title: '기록실 - 내전',
    description:
      '여러 스트리머들이 참여한 발로란트 내전 기록을 확인 할 수 있어요',
    path: '/record/party',
  })
}

export default function RecordCustomLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div>{children}</div>
}
