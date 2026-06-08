import type { MetadataRoute } from 'next'

import { META } from '@/constants/metadata'

interface ISitemapRoute {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

// 색인 대상 공개 페이지 목록 (상세 동적 라우트는 별도 생성 필요)
const ROUTES: ISitemapRoute[] = [
  { path: '', changeFrequency: 'daily', priority: 1 },
  { path: '/timeline', changeFrequency: 'daily', priority: 0.9 },
  { path: '/streamers', changeFrequency: 'daily', priority: 0.9 },
  { path: '/record/custom', changeFrequency: 'daily', priority: 0.8 },
  { path: '/record/party', changeFrequency: 'daily', priority: 0.8 },
  { path: '/changelog', changeFrequency: 'monthly', priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${META.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
