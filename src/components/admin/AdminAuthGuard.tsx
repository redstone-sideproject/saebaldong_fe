'use client'

import useAdminAuth from '@/hooks/useAdminAuth'
export default function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode
}) {
  const { isPending, isRedirecting } = useAdminAuth()

  if (isPending || isRedirecting) {
    return (
      <div className="text-muted-foreground p-10 text-center text-sm">
        관리자 인증 확인 중...
      </div>
    )
  }

  return <>{children}</>
}
