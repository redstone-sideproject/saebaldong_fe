'use client'

import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Plus } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { fetchTimelines } from '@/api/timeline'
import Loading from '@/components/global/Loading'
import PaginationControls from '@/components/record/PaginationControls'
import AdminTimelineCard from '@/components/timeline/AdminTimelineCard'
import { Button } from '@/components/ui/button'

export default function AdminTimelinePage() {
  const sp = useSearchParams()
  const search = sp.get('page') || '1'
  const page = parseInt(search)

  const {
    data: timelineData,
    isSuccess,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['timeline', { page: page }],
    queryFn: () =>
      fetchTimelines({
        page: page,
      }),
  })

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
        <h1 className="text-3xl font-bold">타임라인 관리</h1>
      </div>

      <div className="flex">
        <Button asChild>
          <Link href="/admin/timelines/new">
            <Plus className="mr-2 h-4 w-4" />
            새로운 타임라인 등록
          </Link>
        </Button>
      </div>

      {isLoading && <Loading />}
      {isError && (
        <span className="text-destructive">
          데이터를 불러오는 중 문제가 발생했어요
        </span>
      )}

      <div className="grid gap-4">
        {isSuccess && (
          <div className="space-y-4">
            {timelineData.data.length === 0 ? (
              <div className="flex w-full justify-center">
                <span className="text-primary text-center">
                  타임라인 기록이 없어요
                </span>
              </div>
            ) : (
              timelineData.data.map((timeline) => (
                <AdminTimelineCard
                  key={timeline.timelineId}
                  data={timeline}
                />
              ))
            )}
            <PaginationControls
              currentPage={timelineData.currentPage}
              totalPages={timelineData.totalPage}
            />
          </div>
        )}
      </div>
    </div>
  )
}
