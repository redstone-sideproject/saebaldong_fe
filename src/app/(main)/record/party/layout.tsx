import type { Metadata } from 'next'

import { getMetadata } from '@/constants/metadata'

export const generateMetadata = async (): Promise<Metadata> => {
  return getMetadata({
    title: '기록실 - 5인큐',
    description: '새발동에서 진행한 5인큐 기록을 확인 할 수 있어요',
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
