'use client'

import { useQueryClient } from '@tanstack/react-query'
import { Calendar, GamepadIcon, Users } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { requestLogout } from '@/api/admin/loginApi'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

function AdminPage() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const handleLogout = async () => {
    await requestLogout()
    queryClient.resetQueries({ queryKey: ['auth'] })
    router.replace('/admin/login')
  }
  return (
    <div className="container mx-auto space-y-6 py-8">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">관리자 대시보드</h1>
          <p className="text-muted-foreground">새발동 게임 통계 사이트 관리</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
          >
            <Link href="/">사이트로 이동</Link>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleLogout}
          >
            로그아웃
          </Button>
        </div>
      </div>

      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 게임 수</CardTitle>
            <GamepadIcon className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventsData.length}개</div>
            <p className="text-muted-foreground text-xs">등록된 게임 수</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">스트리머 수</CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {participantsData.length}명
            </div>
            <p className="text-muted-foreground text-xs">등록된 스트리머 수</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">최근 게임</CardTitle>
            <Calendar className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {recentGames.length > 0
                ? new Date(recentGames[0].date).toLocaleDateString('ko-KR', {
                    month: 'short',
                    day: 'numeric',
                  })
                : '없음'}
            </div>
            <p className="text-muted-foreground text-xs">
              {recentGames.length > 0 ? recentGames[0].title : '최근 게임 없음'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">최근 활동</CardTitle>
            <Clock className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activityData.length > 0
                ? new Date(activityData[0].date).toLocaleDateString('ko-KR', {
                    month: 'short',
                    day: 'numeric',
                  })
                : '없음'}
            </div>
            <p className="text-muted-foreground text-xs">
              {activityData.length > 0
                ? `${activityData[0].action}: ${activityData[0].target}`
                : '최근 활동 없음'}
            </p>
          </CardContent>
        </Card>
      </div> */}

      <Tabs
        defaultValue="manage"
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger
            className="cursor-pointer"
            value="manage"
          >
            관리
          </TabsTrigger>
          <TabsTrigger
            className="cursor-pointer"
            value="new"
          >
            추가
          </TabsTrigger>
        </TabsList>
        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <CardTitle>관리 탭</CardTitle>
              <CardDescription>수정 & 삭제</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  asChild
                >
                  <Link href="/admin/streamers">
                    <Users className="mr-2 h-4 w-4" />
                    스트리머 관리
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  asChild
                >
                  <Link href="/admin/timelines">
                    <GamepadIcon className="mr-2 h-4 w-4" />
                    타임라인 관리
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  asChild
                >
                  <Link href="/admin/games">
                    <GamepadIcon className="mr-2 h-4 w-4" />
                    발로란트 매치 관리
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle>추가 탭</CardTitle>
              <CardDescription>추가</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  asChild
                >
                  <Link href="/admin/streamers/new">
                    <Users className="mr-2 h-4 w-4" />
                    스트리머 등록
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  asChild
                >
                  <Link href="/admin/timelines/new">
                    <Calendar className="mr-2 h-4 w-4" />
                    타임라인 등록
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  asChild
                >
                  <Link href="/admin/games/new">
                    <Calendar className="mr-2 h-4 w-4" />
                    발로란트 매치 등록
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="gap-4"></div>
    </div>
  )
}

export default AdminPage
