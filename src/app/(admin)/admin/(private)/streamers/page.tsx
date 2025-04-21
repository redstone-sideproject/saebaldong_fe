'use client'

import { useQuery } from '@tanstack/react-query'
import {
  ArrowLeft,
  BarChart3,
  Calendar,
  Edit,
  Plus,
  Search,
  Trash2,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { fetchStreamersWithStatus } from '@/api/streamer'
import Loading from '@/components/global/Loading'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import useDebounce from '@/hooks/useDebounce'

function AdminStreamerPage() {
  const router = useRouter()
  const [searchNickname, setSearchNickname] = useState<string>('')
  const debounceValue = useDebounce(searchNickname)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value
    setSearchNickname(nickname)
  }

  console.log('admin stre')

  const {
    data: streamerData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['streamer', { nickname: debounceValue }],
    queryFn: () =>
      fetchStreamersWithStatus({
        nickname: debounceValue,
      }),
    staleTime: 1000 * 5,
    retry: false,
  })

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return (
      <div className="flex justify-center">
        <span className="text-primary">데이터를 가져오는데 실패했습니다.</span>
      </div>
    )
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
        <h1 className="text-3xl font-bold">스트리머 관리</h1>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative max-w-sm flex-1">
            <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="스트리머 검색..."
              className="pl-8"
              value={searchNickname}
              onChange={handleSearch}
            />
          </div>
        </div>
        <Button asChild>
          <Link href="/admin/streamers/new">
            <Plus className="mr-2 h-4 w-4" />새 스트리머 등록
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isSuccess &&
          streamerData.map((streamer) => (
            <Card
              key={streamer.streamerId}
              className="overflow-hidden"
            >
              <CardHeader className="">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="border-border/50 h-12 w-12 border">
                      <AvatarImage
                        src={streamer.profileImageUrl}
                        alt={`${streamer.nickname}`}
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {streamer.nickname}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="text-xl">{streamer.nickname}</div>
                      <div className="text-muted-foreground text-sm font-normal">
                        {streamer.role || '스트리머'}
                      </div>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="space-y-1">
                    <div className="text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>참여 횟수</span>
                    </div>
                    <div className="font-medium">
                      {streamer.totalParticipations}회
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>총 참여 시간</span>
                    </div>
                    <div className="font-medium">
                      {streamer.totalParticipationTime}시간
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground flex items-center gap-1">
                      <BarChart3 className="h-4 w-4" />
                      <span>참여율</span>
                    </div>
                    <div className="font-medium">
                      {(streamer.participationRatio * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <Link href="/admin/streamers/1">
                      <Edit className="mr-2 h-4 w-4" />
                      수정
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1 cursor-pointer"
                    // onClick={() => handleDeleteStreamer(streamer.streamerId)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    삭제
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}

export default AdminStreamerPage
