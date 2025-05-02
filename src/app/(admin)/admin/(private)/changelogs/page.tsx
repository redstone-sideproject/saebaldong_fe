'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, Edit, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

import { fetchAllchangelogForAdmin, deleteChangelog } from '@/api/changelog'
import Loading from '@/components/global/Loading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function AdminChangelogPage() {
  const queryClient = useQueryClient()

  const {
    data: changelogData,
    isSuccess,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['changelog', { type: 'admin' }],
    queryFn: fetchAllchangelogForAdmin,
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteChangelog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['changelog'] })
    },
  })

  const handleDeleteStreamer = (changelogId: number) => {
    toast.warning(`변경사항을 삭제하시겠습니까?`, {
      action: {
        label: '삭제',
        onClick: () => mutateAsync(changelogId),
      },
    })
  }

  return (
    <div className="container mx-auto space-y-6 py-8">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          asChild
        >
          <Link href="/admin">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">뒤로 가기</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">변경사항 관리</h1>
      </div>

      <div className="flex items-center justify-between">
        <Button asChild>
          <Link href="/admin/changelogs/new">
            <Plus className="mr-2 h-4 w-4" />새 변경사항을 등록
          </Link>
        </Button>
      </div>

      {isLoading && <Loading />}
      {isError && (
        <span className="text-destructive">
          데이터를 불러오는 중 문제가 발생했어요
        </span>
      )}

      <div className="space-y-4">
        {isSuccess &&
          changelogData.map((changelog) => (
            <Card
              key={changelog.changelogId}
              className="overflow-hidden"
            >
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={changelog.type}
                      className="mt-0.5"
                    >
                      {changelog.type}
                    </Badge>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        asChild
                      >
                        <Link
                          href={`/admin/changelogs/${changelog.changelogId}`}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          수정
                        </Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex-1 cursor-pointer"
                        disabled={isPending}
                        onClick={() =>
                          handleDeleteStreamer(changelog.changelogId)
                        }
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        삭제
                      </Button>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>{changelog.description.replace(/\\n/g, '\n')}</div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}

export default AdminChangelogPage
