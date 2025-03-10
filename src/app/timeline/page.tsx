import { Home, Users } from 'lucide-react'
import Link from 'next/link'

import BottomNav from '@/components/global/BottomNav'
import CustomCalendar from '@/components/timeline/CustomCalendar'
import GameTimeline from '@/components/timeline/GameTimeline'
import { Button } from '@/components/ui/button'

export default function TimeLinePage() {
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
            <GameTimeline />
          </div>

          {/* 달력 */}
          <div className="shrink-0">
            <CustomCalendar />
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
            href="/participants"
            className="flex gap-2"
          >
            <Users className="h-4 w-4" />
            <span className="ml-1 hidden sm:inline">스트리머</span>
          </Link>
        </Button>
      </BottomNav>
    </div>
  )
}
