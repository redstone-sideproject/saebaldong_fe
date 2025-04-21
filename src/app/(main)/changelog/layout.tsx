import type { Metadata } from 'next'

import { getMetadata } from '@/constants/metadata'

export const generateMetadata = async (): Promise<Metadata> => {
  return getMetadata({
    title: '업데이트 내역',
    description: '새발동 사이트의 모든 업데이트 및 변경 내역을 확인하세요.',
    path: '/changelog',
  })
}

export default function ChangelogLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div>{children}</div>
}
