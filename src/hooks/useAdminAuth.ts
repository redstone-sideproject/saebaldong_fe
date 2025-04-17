import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { requestAuth } from '@/api/admin/loginApi'

export default function useAdminAuth() {
  const router = useRouter()

  const { data, isSuccess, isError, isPending } = useQuery({
    queryKey: ['auth'],
    queryFn: requestAuth,
    retry: false,
    staleTime: 1000 * 60 * 5,
  })

  useEffect(() => {
    if (isError) {
      router.replace('/admin/login')
    }
  }, [isError, router, isPending])

  const isRedirecting = !isPending && !isSuccess

  return { data, isRedirecting, isPending }
}
