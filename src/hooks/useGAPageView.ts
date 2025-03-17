'use client'

import { sendGAEvent } from '@next/third-parties/google'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function useGAPageView() {
  const pathname = usePathname()

  useEffect(() => {
    sendGAEvent('page_view', { page_path: pathname })
  }, [pathname])

  return null
}

export function GAPageView() {
  useGAPageView()
  return null
}
