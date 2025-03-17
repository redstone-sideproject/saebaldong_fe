'use client'

import { useQuery } from '@tanstack/react-query'
import {
  ArrowLeft,
  GamepadIcon,
  Home,
  LoaderCircle,
  Trophy,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { fetchStreamerProfile } from '@/api/streamer'
import BottomNav from '@/components/global/BottomNav'
import GameListTab from '@/components/streamer/GameListTab'
import GameStatisticsTab from '@/components/streamer/GameStatisticsTab'
import StreamerProfile from '@/components/streamer/StreamerProfile'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { GAPageView } from '@/hooks/useGAPageView'

export default function StreamerDetailPage() {
  const params = useParams()

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['streamerProfile', params.id],
    queryFn: () => fetchStreamerProfile(parseInt(params.id as string)),
    staleTime: 1000 * 5,
    retry: 1,
  })

  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto flex-1 py-8 pb-24">
        <div className="mb-6">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="mb-4"
          >
            <Link href="/streamers">
              <ArrowLeft className="mr-2 h-4 w-4" />
              스트리머 목록으로 돌아가기
            </Link>
          </Button>

          <div className="flex flex-col items-start gap-6 md:flex-row">
            {/* 프로필 */}
            {isSuccess && <StreamerProfile data={data} />}
            {/* 탭리스트 */}
            <div className="w-full flex-1">
              <Tabs
                defaultValue="games"
                className="w-full"
              >
                <TabsList className="mb-4 grid w-full grid-cols-2">
                  <TabsTrigger
                    className="cursor-pointer"
                    value="games"
                  >
                    <GamepadIcon className="mr-2 h-4 w-4" />
                    참여 게임
                  </TabsTrigger>
                  <TabsTrigger
                    className="cursor-pointer"
                    value="stats"
                  >
                    <Trophy className="mr-2 h-4 w-4" />
                    통계
                  </TabsTrigger>
                </TabsList>

                {isLoading && (
                  <div className="flex justify-center">
                    <LoaderCircle className="text-primary mt-10 h-10 w-10 animate-spin" />
                  </div>
                )}

                {isError && (
                  <div className="flex justify-center">
                    <span className="text-primary">
                      데이터를 가져오는데 실패했습니다.
                    </span>
                  </div>
                )}

                <TabsContent value="games">
                  {isSuccess && <GameListTab data={data} />}
                </TabsContent>
                <TabsContent value="stats">
                  {isSuccess && <GameStatisticsTab data={data} />}
                </TabsContent>
              </Tabs>
            </div>
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
            href="/timeline"
            className="flex gap-2"
          >
            <Users className="h-4 w-4" />
            <span className="ml-1 hidden sm:inline">게임 기록</span>
          </Link>
        </Button>
      </BottomNav>
      <GAPageView />
    </div>
  )
}
