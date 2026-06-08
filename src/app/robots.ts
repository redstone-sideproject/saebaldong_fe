import type { MetadataRoute } from 'next'

import { META } from '@/constants/metadata'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // 어드민 페이지는 색인 제외 (/admin 하위 전체)
      disallow: '/admin',
    },
    sitemap: `${META.url}/sitemap.xml`,
    host: META.url,
  }
}
