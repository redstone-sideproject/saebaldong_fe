'use client'

import { useQuery } from '@tanstack/react-query'
import { Home, Users } from 'lucide-react'
import Link from 'next/link'
import { use } from 'react'

import { fetchValorantMatchByQuery } from '@/api/valorant'
import BottomNav from '@/components/global/BottomNav'
import Loading from '@/components/global/Loading'
import PaginationControls from '@/components/record/PaginationControls'
import RecordList from '@/components/record/RecordList'
import { Button } from '@/components/ui/button'
import { GAPageView } from '@/hooks/useGAPageView'

type SearchParams = Promise<{ [key: string]: string }>

function RecordCustomPage(props: { searchParams: SearchParams }) {
  const searchParams = use(props.searchParams)
  const page = parseInt(searchParams.page) || 1

  const {
    data: matchData,
    isSuccess,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['valorantMatch', page, 'CUSTOM'],
    queryFn: () =>
      fetchValorantMatchByQuery({
        page: page,
        matchType: 'CUSTOM',
      }),
  })

  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto flex-1 px-4 py-8 pb-24">
        <div className="mb-8 flex flex-col-reverse gap-6 lg:flex-row">
          <div className="flex-1">
            {/* 타이틀 */}
            <div className="mb-6 flex flex-col items-start justify-between space-y-4">
              <h1 className="text-3xl font-bold tracking-tight">
                기록실 - 발로란트 내전
              </h1>
              <p className="text-muted-foreground mt-1">
                여러 스트리머들이 참여한 발로란트 내전 기록을 확인 할 수 있어요
              </p>
              <p className="text-muted-foreground">
                새발동 회원 또는 픽셀 소속 스트리머가 3 ~ 4명 이상 모인 내전만
                기록돼요.
              </p>
              <div className="flex gap-x-4">
                {/* 커스텀 */}
                <div className="flex items-center gap-x-1">
                  <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                  <span>내전</span>
                </div>
              </div>
            </div>
            {/* 기록 카드 */}
            {isLoading && <Loading />}
            {isError && (
              <span className="text-destructive">
                데이터를 불러오는 중 문제가 발생했어요
              </span>
            )}
            {isSuccess && (
              <div className="space-y-4">
                {matchData.data.length === 0 ? (
                  <div className="flex w-full justify-center">
                    <span className="text-primary text-center">
                      매치 기록이 없어요
                    </span>
                  </div>
                ) : (
                  <RecordList data={matchData.data} />
                )}
                <PaginationControls
                  currentPage={matchData.currentPage}
                  totalPages={matchData.totalPage}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 하단 고정 nav */}
      <BottomNav>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="gap-1"
          aria-label="Move home page"
        >
          <Link
            href="/"
            className="flex gap-2"
          >
            <Home className="h-4 w-4" />
            <span className="ml-1 hidden sm:inline">홈으로</span>
          </Link>
        </Button>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="gap-1"
          aria-label="Move streamer page"
        >
          <Link
            href="/streamers"
            className="flex gap-2"
          >
            <Users className="h-4 w-4" />
            <span className="ml-1 hidden sm:inline">스트리머</span>
          </Link>
        </Button>
      </BottomNav>
      <GAPageView />
    </div>
  )
}

export default RecordCustomPage
