'use client'

import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { Home, Users, LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import { useState } from 'react'

import { fetchTimelineByDate, fetchTimelines } from '@/api/timeline'
import BottomNav from '@/components/global/BottomNav'
import CustomCalendar from '@/components/timeline/CustomCalendar'
import GameTimeline from '@/components/timeline/GameTimeline'
import { Button } from '@/components/ui/button'
import { GAPageView } from '@/hooks/useGAPageView'
import { useObserver } from '@/hooks/useObserver'

export default function TimeLinePage() {
  const bottom = useRef(null)

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const onIntersect = ([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting && hasNextPage) {
      fetchNextPage()
    }
  }

  useObserver({
    target: bottom,
    onIntersect,
  })

  const {
    data: timelineData,
    isSuccess: isTimelineDataSuccess,
    isLoading: isTimelineDataLoading,
  } = useQuery({
    queryKey: ['timeline', selectedDate],
    queryFn: () => (selectedDate ? fetchTimelineByDate(selectedDate) : null),
    enabled: !!selectedDate,
    staleTime: 1000 * 10,
  })

  const {
    data: timelineDatas,
    hasNextPage,
    fetchNextPage,
    isSuccess: isTimelineDatasSuccess,
    isLoading: isTimelineDatasLoading,
  } = useInfiniteQuery({
    queryKey: ['timelines'],
    queryFn: ({ pageParam = 1 }) => fetchTimelines({ page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.totalPage === lastPage.currentPage || lastPage.totalPage === 1
        ? undefined
        : lastPage.currentPage + 1,
    initialPageParam: 1,
    staleTime: 1000 * 5,
  })

  const handleDateChage = (date: Date | null) => {
    setSelectedDate(date)
  }

  const renderGameTimeline = () => {
    if (isTimelineDataLoading || isTimelineDatasLoading) {
      return (
        <div className="flex justify-center">
          <LoaderCircle className="w text-primary mt-10 h-10 w-10 animate-spin" />
        </div>
      )
    }

    if (isTimelineDataSuccess && timelineData) {
      return timelineData.map((data, index) => (
        <GameTimeline
          key={index}
          data={data}
        />
      ))
    }

    if (isTimelineDatasSuccess && timelineDatas) {
      return timelineDatas.pages.map((page, index) =>
        page.data.map((data, subIndex) => (
          <GameTimeline
            key={`${index}-${subIndex}`}
            data={data}
          />
        )),
      )
    }

    return <div className="text-center">데이터가 없습니다.</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto flex-1 px-4 py-8 pb-24">
        {/* 정보와 달력 세션 구분 */}
        <div className="mb-8 flex flex-col-reverse gap-6 md:flex-row">
          <div className="flex-1">
            {/* 타이틀 */}
            <div className="mb-6 flex flex-col items-start justify-between space-y-4">
              <h1 className="text-3xl font-bold tracking-tight">게임 기록</h1>
              <p className="text-muted-foreground mt-1">
                모든 게임 기록을 최근순으로 보여줍니다. 달력에서 날짜를 선택하면
                해당 날짜의 기록만 볼 수 있습니다.
              </p>
            </div>
            {/* 기록 카드 */}
            {renderGameTimeline()}
            <div ref={bottom} />
          </div>

          {/* 달력 */}
          <div className="shrink-0">
            <CustomCalendar onDateSelect={handleDateChage} />
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
