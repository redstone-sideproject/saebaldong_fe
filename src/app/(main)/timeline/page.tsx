'use client'

import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { Home, Users } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import { useState } from 'react'

import { fetchTimelineByDate, fetchTimelines } from '@/api/timeline'
import BottomNav from '@/components/global/BottomNav'
import Loading from '@/components/global/Loading'
import CustomCalendar from '@/components/timeline/CustomCalendar'
import GameTimeline from '@/components/timeline/GameTimeline'
import { Button } from '@/components/ui/button'
import { GAPageView } from '@/hooks/useGAPageView'
import { useObserver } from '@/hooks/useObserver'

export default function TimeLinePage() {
  const bottom = useRef(null)

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isDate, setIsDate] = useState<boolean>(true)
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
    retry: 1,
  })

  const handleDateChage = (date: Date | null) => {
    setSelectedDate(date)
  }

  const renderGameTimeline = () => {
    if (isTimelineDataLoading || isTimelineDatasLoading) {
      return <Loading />
    }

    if (!isDate) {
      return (
        <div className="text-primary my-20 text-center">
          해당 날짜엔 기록이 없어요.
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

    return (
      <div className="text-destructive text-center">
        데이터를 불러오는 중 문제가 발생했어요.
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto flex-1 px-4 py-8 pb-24">
        {/* 정보와 달력 세션 구분 */}
        <div className="mb-8 flex flex-col-reverse gap-6 lg:flex-row">
          <div className="flex-1">
            {/* 타이틀 */}
            <div className="mb-6 flex flex-col items-start justify-between space-y-4">
              <h1 className="text-3xl font-bold tracking-tight">타임라인</h1>
              <p className="text-muted-foreground mt-1">
                최근 타임라인 보여드려요. 날짜를 고르면 해당 기록만 확인할 수
                있어요.
              </p>
            </div>
            {/* 기록 카드 */}
            {renderGameTimeline()}
            <div ref={bottom} />
          </div>

          {/* 달력 */}
          <div className="shrink-0">
            <CustomCalendar
              onDateSelect={handleDateChage}
              onIsDate={setIsDate}
            />
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
