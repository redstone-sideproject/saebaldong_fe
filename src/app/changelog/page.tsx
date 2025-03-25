'use client'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Clock } from 'lucide-react'
import Link from 'next/link'

import { fetchAllChangelog } from '@/api/changelog'
import Loading from '@/components/global/Loading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChangelogTypeUnion } from '@/types/changelog'
function ChangelogPage() {
  const {
    data: changelogData,
    isSuccess,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['allChangeLog'],
    queryFn: () => fetchAllChangelog(),
  })

  const changelogTypes: ChangelogTypeUnion[] = ['ADD', 'FIX']

  return (
    <div className="container mx-auto max-w-4xl space-y-6 py-8">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          asChild
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">뒤로 가기</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">변경 내역</h1>
      </div>

      <p className="text-muted-foreground">
        새발동 게임 통계 사이트의 모든 업데이트 및 변경 내역을 확인하세요.
      </p>

      {isLoading && <Loading />}
      {isError && (
        <div className="text-primary text-center">
          <span>최근 업데이트 내역을 가져오는데 실패했어요.</span>
        </div>
      )}

      {isSuccess && (
        <div className="space-y-8">
          {changelogData.map((changelog) => (
            <Card
              key={changelog.date}
              className="border-border/50"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{changelog.date}</span>
                    </CardTitle>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2"></div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {changelogTypes.map((type) => {
                    const changes = changelog.changes.filter(
                      (change) => change.type === type,
                    )
                    if (changes.length === 0) return null

                    return (
                      <div
                        key={type}
                        className="space-y-2"
                      >
                        <h3 className="flex items-center gap-2 text-sm font-medium">
                          <Badge variant={type}>
                            {type === 'ADD' && '추가'}
                            {type === 'FIX' && '수정'}
                          </Badge>
                        </h3>
                        <ul className="space-y-1 text-sm">
                          {changes.map((change, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2"
                            >
                              <span className="text-muted-foreground">•</span>
                              <span>{change.description}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default ChangelogPage
